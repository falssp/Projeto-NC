#!/usr/bin/env python3
"""
reprocessar_location.py
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Lê o Excel UL_Location_Taxonomy.xlsx, aplica as alterações
marcadas na coluna Status e gera um novo municipios.json.

USO:
  python reprocessar_location.py

  O script lê o Excel e o JSON da mesma pasta.
  Gera municipios_updated.json (não sobrescreve o original).
  Revise o resultado antes de subir no GitHub.

COLUNA STATUS (nas abas Cidades, Estados, Regiões):
  ALTERAR   → atualiza o valor/label daquela linha
  ADICIONAR → insere novo item
  REMOVER   → exclui o item da base
  (vazio)   → sem alteração
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"""

import json, re, unicodedata, sys
from pathlib import Path
import openpyxl

# ── CONFIG ───────────────────────────────────────────────
XLSX = Path("UL_Location_Taxonomy.xlsx")
JSON_IN  = Path("municipios.json")
JSON_OUT = Path("municipios_updated.json")

# Colunas das abas (0-based index após Status ser col 8/7/5/4)
# Aba Cidades:      A=valor, B=cidade, C=uf, D=estado, E=regiao, F=iata?, G=sigla_iata, H=Status
# Aba Cidades IATA: A=valor, B=sigla,  C=cidade, D=uf, E=estado, F=regiao, G=Status
# Aba Estados:      A=valor, B=uf,     C=estado, D=regiao, E=Status
# Aba Regiões:      A=valor, B=regiao, C=exemplo, D=Status

def slug(name):
    n = unicodedata.normalize('NFD', name.lower())
    n = ''.join(c for c in n if unicodedata.category(c) != 'Mn')
    n = re.sub(r'[^a-z0-9]+', '-', n).strip('-')
    return n

def row_values(row):
    return [c.value for c in row]

def status_col(row, idx):
    v = row[idx].value
    return str(v).strip().upper() if v else ""

def log(msg):
    print(f"  {msg}")

# ── CARREGA JSON BASE ─────────────────────────────────────
if not JSON_IN.exists():
    print(f"✘ Arquivo {JSON_IN} não encontrado na pasta atual.")
    sys.exit(1)

with open(JSON_IN, encoding='utf-8') as f:
    DB = json.load(f)

print(f"✔ Base carregada: {JSON_IN}")

# ── CARREGA EXCEL ─────────────────────────────────────────
if not XLSX.exists():
    print(f"✘ Arquivo {XLSX} não encontrado na pasta atual.")
    sys.exit(1)

wb = openpyxl.load_workbook(XLSX)
print(f"✔ Excel carregado: {XLSX}")

alteracoes = 0

# ═══════════════════════════════════════════════════════
# CIDADES
# ═══════════════════════════════════════════════════════
ws = wb["Cidades"]
rows = list(ws.iter_rows(min_row=2))
print(f"\n── Cidades ({len(rows)} linhas) ──")

for row in rows:
    st = status_col(row, 7)  # col H (índice 7)
    if not st:
        continue

    valor     = str(row[0].value or '').strip()   # cid-xxx
    cidade    = str(row[1].value or '').strip()
    uf        = str(row[2].value or '').strip().upper()
    iata_flag = str(row[5].value or '').strip()
    sigla     = str(row[6].value or '').strip().lower() if row[6].value else None

    if not uf or uf not in DB['er']:
        log(f"⚠ UF inválida '{uf}' — linha ignorada")
        continue

    reg = DB['er'][uf]
    if reg not in DB['d']:
        DB['d'][reg] = {}
    if uf not in DB['d'][reg]:
        DB['d'][reg][uf] = []

    arr = DB['d'][reg][uf]

    # Determina sigla final
    if sigla and iata_flag == 'Sim':
        s = sigla
        i = True
    else:
        s = slug(cidade)
        i = False

    if st == "ALTERAR":
        # Encontra pelo valor original e atualiza
        found = False
        for item in arr:
            if f"cid-{item['s']}" == valor or item['l'].lower() == cidade.lower():
                item['s'] = s
                item['l'] = cidade
                item['i'] = i
                log(f"ALTERAR  {valor} → cid-{s} ({cidade})")
                found = True
                alteracoes += 1
                break
        if not found:
            log(f"⚠ ALTERAR: '{valor}' não encontrado em {uf}")

    elif st == "ADICIONAR":
        if not any(item['s'] == s for item in arr):
            arr.append({'s': s, 'l': cidade, 'i': i})
            arr.sort(key=lambda x: x['l'].casefold())
            log(f"ADICIONAR cid-{s} ({cidade}, {uf})")
            alteracoes += 1
        else:
            log(f"⚠ ADICIONAR: cid-{s} já existe em {uf} — ignorado")

    elif st == "REMOVER":
        antes = len(arr)
        DB['d'][reg][uf] = [x for x in arr if f"cid-{x['s']}" != valor]
        if len(DB['d'][reg][uf]) < antes:
            log(f"REMOVER  {valor} ({cidade})")
            alteracoes += 1
        else:
            log(f"⚠ REMOVER: '{valor}' não encontrado em {uf}")

# ═══════════════════════════════════════════════════════
# ESTADOS
# ═══════════════════════════════════════════════════════
ws = wb["Estados"]
rows = list(ws.iter_rows(min_row=2))
print(f"\n── Estados ({len(rows)} linhas) ──")

for row in rows:
    st = status_col(row, 4)  # col E
    if not st:
        continue

    valor  = str(row[0].value or '').strip()   # est-sp
    uf     = str(row[1].value or '').strip().upper()
    label  = str(row[2].value or '').strip()
    regiao = str(row[3].value or '').strip()

    if st == "ALTERAR":
        if uf in DB['est']:
            DB['est'][uf] = label
            log(f"ALTERAR  {uf} → '{label}'")
            alteracoes += 1
        else:
            log(f"⚠ ALTERAR: UF '{uf}' não encontrada")

    elif st == "ADICIONAR":
        DB['est'][uf] = label
        # Mapeia região
        reg_map = {v: k for k, v in DB['reg'].items()}
        DB['er'][uf] = reg_map.get(regiao, regiao.lower()[:2])
        log(f"ADICIONAR {uf} — {label} ({regiao})")
        alteracoes += 1

    elif st == "REMOVER":
        if uf in DB['est']:
            del DB['est'][uf]
            DB['er'].pop(uf, None)
            log(f"REMOVER  {uf}")
            alteracoes += 1

# ═══════════════════════════════════════════════════════
# REGIÕES
# ═══════════════════════════════════════════════════════
ws = wb["Regiões"]
rows = list(ws.iter_rows(min_row=2))
print(f"\n── Regiões ({len(rows)} linhas) ──")

for row in rows:
    st = status_col(row, 3)  # col D
    if not st:
        continue

    valor  = str(row[0].value or '').strip()   # reg-se
    label  = str(row[1].value or '').strip()
    key    = valor.replace('reg-', '')

    if st == "ALTERAR":
        if key in DB['reg']:
            DB['reg'][key] = label
            log(f"ALTERAR  {valor} → '{label}'")
            alteracoes += 1

    elif st == "ADICIONAR":
        DB['reg'][key] = label
        log(f"ADICIONAR {valor} — {label}")
        alteracoes += 1

    elif st == "REMOVER":
        if key in DB['reg']:
            del DB['reg'][key]
            log(f"REMOVER  {valor}")
            alteracoes += 1

# ── SALVA ────────────────────────────────────────────────
print(f"\n── Resultado ──")
print(f"  Alterações aplicadas: {alteracoes}")

if alteracoes == 0:
    print("  Nenhuma alteração encontrada. JSON não foi gerado.")
    sys.exit(0)

with open(JSON_OUT, 'w', encoding='utf-8') as f:
    json.dump(DB, f, ensure_ascii=False, separators=(',', ':'))

total = sum(len(c) for r in DB['d'].values() for c in r.values())
print(f"  Total de municípios no JSON: {total}")
print(f"\n✔ Salvo em: {JSON_OUT}")
print("""
Próximos passos:
  1. Revise o municipios_updated.json se quiser
  2. Renomeie para municipios.json
  3. Suba no GitHub em ferramentas/location/
     → ferramenta atualizada em ~1 min
""")
