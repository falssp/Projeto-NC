# Location Taxonomy · Unilever BR

Ferramenta web para geração do campo **Location** em campanhas Unilever BR.

🔗 **[Abrir ferramenta](https://falssp.github.io/Projeto-NC/ferramentas/location/)**

---

## Valores gerados

| Nível | Formato | Exemplo | Máx. |
|-------|---------|---------|------|
| Nacional | `nac` | `nac` | 1 |
| Região | `reg-xx` | `reg-se`, `reg-se-co` | 3 |
| Estado | `est-xx` | `est-sp`, `est-sp-rj` | 3 |
| Cidade | `cid-xxx` | `cid-sao`, `cid-sao-rec` | 3 |

Múltiplos valores do mesmo nível separados por `-`. Níveis não se misturam.

---

## Arquivos

```
location/
├── index.html                  ← Interface web (URL canônica)
├── location.json               ← Base de dados (Nacional, Região, Estado, Cidade)
├── municipios.json             ← Base de municípios BR (IBGE 2024, 5.499 cidades)
├── UL_Location_Taxonomy.xlsx   ← Referência de valores + fluxo de alterações
│
├── UL_Location.gs              ← Apps Script principal
├── UL_Location_Corp.gs         ← Apps Script — backend corporativo
├── UL_Location_Corp.html       ← Interface — ambiente Corp
├── UL_Location_Pessoal.gs      ← Apps Script — backend pessoal
├── UL_Location_Pessoal.html    ← Interface — ambiente Pessoal
├── v1_CORP_location.gs         ← Apps Script legado (Corp)
├── v1_PESSOAL_location.gs      ← Apps Script legado (Pessoal)
│
├── reprocessar_location.py     ← Script para atualizar a base a partir do Excel
├── ABAS_CONTEUDO.md            ← Estrutura das abas do Sheets
└── faq.html                    ← Perguntas frequentes
```

---

## Como usar (ferramenta web)

1. Acesse o link acima
2. Clique em **Acesso rápido** para valores frequentes, ou navegue pelas tabs
3. Clique em **Copiar** (ou `Ctrl+Enter`) e cole no NC Tool
4. Valores recentes ficam salvos como chips no topo

---

## Atualizar a base

```bash
# Coloque o Excel e o municipios.json na mesma pasta e execute:
python reprocessar_location.py
# Revise municipios_updated.json gerado
# Renomeie para municipios.json e suba no GitHub
```

---

## Deploy GAS (opcional)

**Corp:**
1. Criar Sheets `[UL] Taxonomia_Location` com abas do `ABAS_CONTEUDO.md`
2. Apps Script → colar `UL_Location_Corp.gs` + `UL_Location_Corp.html`
3. Publicar → Web App → Executar como: **Eu** · Acesso: **Organização**

**Pessoal:**
1. Criar Sheets `[Felipe] Taxonomia_Location`
2. Colar `UL_Location_Pessoal.gs` + `UL_Location_Pessoal.html`
3. Menu 📍 UL Location → **Configurar espelho da Corp** → colar URL da Corp
4. Publicar → Web App → Acesso: **Somente eu**
