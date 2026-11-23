#!/usr/bin/env python3
"""
sync-audit.py — Verifica se os configs do F2 estão em sync com o GAS.

Lógica:
  1. Lê todos os platform JSONs do F2 e coleta as list-keys referenciadas
  2. Chama o GAS listarOpcoes (mesma URL que o F2 usa em produção)
  3. Compara: chave referenciada pelo F2 mas ausente no GAS = drift
  4. Também verifica se o número de plataformas no engine.js bate com os JSONs

Sem dependências externas — stdlib Python pura.
Usa a URL GAS que já existe em env.corp.json (mesmo padrão do sync-location.yml).
"""

import json, sys, urllib.request, urllib.error, re
from pathlib import Path

ROOT    = Path(__file__).parent.parent
CFG_DIR = ROOT / 'F2-Gerador' / 'web' / 'config'
ENGINE  = ROOT / 'F2-Gerador' / 'web' / 'js' / 'engine.js'
REPORT  = Path('/tmp/sync-drift-report.md')

# ── 1. Ler env.corp.json para pegar a URL do GAS ─────────────────────────────
env = json.loads((CFG_DIR / 'env.corp.json').read_text())
GAS_URL = env['gasUrl'] + '?action=listarOpcoes'

# ── 2. Coletar list-keys referenciadas pelos platform JSONs ───────────────────
platform_files = sorted(
    p for p in CFG_DIR.glob('*.json')
    if not p.stem.startswith('env') and p.stem != 'lists'
)

f2_platforms   = [p.stem for p in platform_files]
f2_list_keys   = set()
platform_keys  = {}  # plataforma → set de chaves

for pf in platform_files:
    d    = json.loads(pf.read_text())
    keys = {col['list'] for col in d.get('columns', []) if col.get('list')}
    platform_keys[pf.stem] = keys
    f2_list_keys |= keys

# ── 3. Verificar PLATFORM_IDS no engine.js ───────────────────────────────────
engine_src = ENGINE.read_text()
match = re.search(r'const PLATFORM_IDS\s*=\s*\[(.*?)\]', engine_src, re.DOTALL)
engine_ids = []
if match:
    engine_ids = re.findall(r"'([^']+)'", match.group(1))

# ── 4. Chamar GAS listarOpcoes ────────────────────────────────────────────────
print(f'🔍 Chamando GAS: {GAS_URL}')
try:
    req  = urllib.request.urlopen(GAS_URL, timeout=20)
    gas_data = json.loads(req.read().decode('utf-8'))
    gas_keys = set(gas_data.keys())
    print(f'   GAS retornou {len(gas_keys)} chaves, {sum(len(v) for v in gas_data.values())} opções no total')
except urllib.error.URLError as e:
    print(f'❌ ERRO ao chamar o GAS: {e}')
    sys.exit(2)
except json.JSONDecodeError as e:
    print(f'❌ GAS retornou JSON inválido: {e}')
    sys.exit(2)

# ── 5. Comparações ────────────────────────────────────────────────────────────
drifts = []

## 5a. Chaves referenciadas no F2 mas ausentes no GAS
missing_in_gas = sorted(f2_list_keys - gas_keys)
if missing_in_gas:
    por_plataforma = {}
    for pid, keys in platform_keys.items():
        faltam = sorted(keys & set(missing_in_gas))
        if faltam:
            por_plataforma[pid] = faltam
    linhas = [f'- `{k}` → usado em: {", ".join(pid for pid, keys in por_plataforma.items() if k in keys)}'
              for k in missing_in_gas]
    drifts.append(
        '### 🔴 Chaves referenciadas pelo F2 que o GAS não está retornando\n' +
        '\n'.join(linhas) +
        '\n\n> O F2 pode estar renderizando dropdowns vazios. Verificar se o GAS está atualizado.'
    )

## 5b. Chaves no GAS não referenciadas por nenhum JSON do F2 (informativo)
extra_in_gas = sorted(gas_keys - f2_list_keys)
if extra_in_gas:
    drifts.append(
        '### 🟡 Chaves no GAS não usadas por nenhuma plataforma do F2 (informativo)\n' +
        '\n'.join(f'- `{k}`' for k in extra_in_gas) +
        '\n\n> Podem ser listas de plataformas futuras ou listas legadas. Sem ação urgente.'
    )

## 5c. Platform JSONs vs PLATFORM_IDS no engine.js
json_ids    = set(f2_platforms)
engine_set  = set(engine_ids)
only_in_json   = sorted(json_ids - engine_set)
only_in_engine = sorted(engine_set - json_ids)

if only_in_json:
    drifts.append(
        '### 🔴 JSONs sem entrada em PLATFORM_IDS (engine.js)\n' +
        '\n'.join(f'- `{p}`' for p in only_in_json) +
        '\n\n> Adicionar ao array PLATFORM_IDS em `F2-Gerador/web/js/engine.js`.'
    )
if only_in_engine:
    drifts.append(
        '### 🔴 IDs em PLATFORM_IDS sem JSON correspondente\n' +
        '\n'.join(f'- `{p}`' for p in only_in_engine) +
        '\n\n> Criar `F2-Gerador/web/config/{id}.json` ou remover do PLATFORM_IDS.'
    )

# ── 6. Resultado ──────────────────────────────────────────────────────────────

# Resumo de tamanho das listas (sempre imprime, útil para acompanhar crescimento)
print('\n📊 Tamanho atual das listas no GAS:')
for k in sorted(gas_keys):
    n = len(gas_data[k]) if isinstance(gas_data[k], list) else '?'
    marker = ' ⚠️ (não usado pelo F2)' if k in extra_in_gas else ''
    print(f'   {k}: {n} opções{marker}')

if not drifts:
    print('\n✅ Nenhum drift crítico. F2 e GAS estão em sync.')
    sys.exit(0)

from datetime import date
report = '\n\n---\n\n'.join([
    f'## ⚠️ Sync Audit — Drift F2 ↔ GAS\n**Data:** {date.today()}  |  **Itens:** {len(drifts)}',
    *drifts,
    f'**GAS:** `{env["gasUrl"]}`\n**F2 configs:** `F2-Gerador/web/config/`'
])
REPORT.write_text(report)
print(f'\n{report}')
sys.exit(1)
