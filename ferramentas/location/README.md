# Location Taxonomy · Unilever BR

Ferramenta de consulta e geração de valores do campo **Location** para campanhas Unilever BR.

Gera valores no formato `cid-sao-rio`, `est-sp`, `reg-ne`, `nac` — prontos para usar no NC Tool.

---

## Versões

| Versão | Pasta | Link | Descrição |
|--------|-------|------|-----------|
| **v1** | [`v1/`](./v1/) | [Abrir](https://falssp.github.io/Projeto-NC/ferramentas/location/v1/) | Base JSON estática · municipios.json · script Python para reprocessamento |
| **v2** | [`v2/`](./v2/) | [Abrir](https://falssp.github.io/Projeto-NC/ferramentas/location/v2/) | Integração Google Sheets + GAS · sync diário via GitHub Actions · ambientes Corp e Pessoal |

---

## Hierarquia de valores

| Nível | Formato | Exemplo | Máx. combinações |
|-------|---------|---------|-----------------|
| Nacional | `nac` | `nac` | 1 |
| Região | `reg-xx` | `reg-se`, `reg-se-co` | 3 |
| Estado | `est-xx` | `est-sp`, `est-sp-rj` | 3 |
| Cidade | `cid-xxx` | `cid-sao`, `cid-sao-rec` | 3 |

Regras de combinação: múltiplos valores do mesmo nível separados por `-` após o prefixo. Não é possível misturar níveis (ex: região + estado).

---

## v1 — Base estática

**Arquivos:**
```
v1/
├── index.html              ← Interface web
├── municipios.json         ← Base de municípios BR (5.499 cidades, IBGE 2024)
├── UL_Location_Taxonomy.xlsx ← Referência de valores + fluxo de alterações
├── reprocessar_location.py ← Script de atualização da base
├── CORP_location.gs        ← Apps Script (ambiente Corp)
├── PESSOAL_location.gs     ← Apps Script (ambiente Pessoal / dev)
└── faq.html
```

**Como usar:**
1. Selecione o Tipo (Nacional / Região / Estado / Cidade)
2. Filtre e clique no valor desejado
3. Clique em **Copiar** e cole no NC Tool

**Atualizar a base:**
```bash
# Coloque o Excel e o municipios.json na mesma pasta:
python reprocessar_location.py
# Revise o municipios_updated.json gerado
# Renomeie para municipios.json e suba no GitHub
```

**Deploy GAS (opcional):**
1. [script.google.com](https://script.google.com) → Novo projeto
2. Cole `CORP_location.gs` (ou `PESSOAL_location.gs`)
3. Substitua o `SHEET_ID` pelo ID da planilha correta
4. Adicione arquivo HTML com o conteúdo de `index.html`
5. Implantar → App da Web → Executar como: Eu · Acesso: Organização

---

## v2 — Integração Sheets + GitHub Actions

**Arquivos:**
```
v2/
├── index.html              ← Interface web (alias: location-ul.html no gh-pages)
├── UL_Location_Corp.gs     ← Apps Script — backend corporativo
├── UL_Location_Corp.html   ← Interface corporativa
├── UL_Location_Pessoal.gs  ← Apps Script — backend pessoal
├── UL_Location_Pessoal.html ← Interface pessoal
├── ABAS_CONTEUDO.md        ← Estrutura das abas do Sheets
└── .github/workflows/
    └── sync-location.yml   ← Sync automático diário (06h UTC)
```

**Ambientes:**

| Ambiente | Planilha | Acesso |
|----------|----------|--------|
| Corp | `[UL] Taxonomia_Location` | Unilever / StormX |
| Pessoal | `[Felipe] Taxonomia_Location` | Apenas Felipe (fallback via IMPORTRANGE) |

**Deploy Corp:**
1. Criar Sheets `[UL] Taxonomia_Location` com abas do `ABAS_CONTEUDO.md`
2. Apps Script → colar `UL_Location_Corp.gs` + `UL_Location_Corp.html`
3. Publicar → Web App → Executar como: **Eu** · Acesso: **Organização**
4. Guardar URL como secret `CORP_WEBAPP_URL` no GitHub

**Deploy Pessoal:**
1. Criar Sheets `[Felipe] Taxonomia_Location`
2. Colar `UL_Location_Pessoal.gs` + `UL_Location_Pessoal.html`
3. Menu 📍 UL Location → **Configurar espelho da Corp** → colar URL da Corp
4. Aceitar IMPORTRANGE em cada aba
5. Publicar → Web App → Acesso: **Somente eu**
6. Guardar URL como secret `PESSOAL_WEBAPP_URL` no GitHub

**GitHub Secret necessário:**

| Secret | Valor |
|--------|-------|
| `LOCATION_WEBAPP_URL` | URL do Web App GAS (conta pessoal) |

**Adicionar nova cidade (v2):**
1. Sheets Corp → aba **Inclusão** → nova linha: `sigla | label | TRUE | UF`
2. GitHub Actions sincroniza no dia seguinte (ou dispare manualmente)

---

## Branches

| Branch | Conteúdo |
|--------|----------|
| `main` | Código-fonte (`.gs`, `.html`, docs) |
| `gh-pages` | Arquivos publicados (`location.json`, páginas HTML) |

> ⚠️ Sempre sincronize `main` → `gh-pages` após alterações manuais.
