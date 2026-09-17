# UL · Taxonomia Location

Ferramenta para geração de valores de taxonomia do campo **Location** — conta Unilever.

## Arquivos

| Arquivo | Ambiente | Onde colar |
|---|---|---|
| `UL_Location_Corp.gs` | Corporativo | Apps Script do Sheets Corp |
| `UL_Location_Corp.html` | Corporativo | Apps Script do Sheets Corp |
| `UL_Location_Pessoal.gs` | Pessoal | Apps Script do Sheets Pessoal |
| `UL_Location_Pessoal.html` | Pessoal | Apps Script do Sheets Pessoal |
| `ABAS_CONTEUDO.md` | — | Referência para montar as abas do Sheets |
| `.github/workflows/sync-location.yml` | — | GitHub Actions (sync diário) |

## Hierarquia de seleção

```
Nacional (independente)
    ↓
Região  →  filtra Estados
    ↓
Estado  →  filtra Cidades
    ↓
Cidade  (até 3)
```

## Deploy Corp

1. Crie o Sheets `[UL] Taxonomia_Location` com as abas do `ABAS_CONTEUDO.md`
2. Extensões → Apps Script → cole `UL_Location_Corp.gs` + `UL_Location_Corp.html`
3. Publicar → Implantar como app da Web
   - Executar como: **Eu**
   - Acesso: **Qualquer pessoa da organização**
4. Copie a URL e guarde como secret `CORP_WEBAPP_URL` no GitHub

## Deploy Pessoal

1. Crie o Sheets `[Felipe] Taxonomia_Location`
2. Extensões → Apps Script → cole `UL_Location_Pessoal.gs` + `UL_Location_Pessoal.html`
3. No menu do Sheets: 📍 UL Location → **Configurar espelho da Corp**
4. Cole a URL do Sheets Corp → aceite o IMPORTRANGE em cada aba
5. Publicar → Implantar como app da Web
   - Executar como: **Eu**
   - Acesso: **Somente eu**
6. Guarde a URL como secret `PESSOAL_WEBAPP_URL` no GitHub

## GitHub Secrets necessários

| Secret | Valor |
|---|---|
| `CORP_WEBAPP_URL` | URL do Web App Corp |
| `PESSOAL_WEBAPP_URL` | URL do Web App Pessoal |

## Endpoint JSON

```
GET {URL_WEBAPP}?action=json
```

Retorna `location.json` com estrutura:
```json
{
  "geradoEm": "...",
  "fonte": "corp",
  "nacional": [{"sigla":"nac","label":"Nacional"}],
  "região":   [...],
  "estado":   [...],
  "cidade":   [{"sigla":"sao","label":"São Paulo","uf":"SP"}]
}
```

## Adicionar nova cidade

1. Sheets Corp → aba **Inclusão**
2. Nova linha: `sigla | label | TRUE | UF`
3. GitHub Actions roda no dia seguinte (ou dispare manualmente)
