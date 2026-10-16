# F2 — Gerador NC · Corp

Gerador de Naming Conventions — ambiente Corp (Original).
14 plataformas com cores oficiais de marca.

## Spreadsheet

| Campo | Valor |
|-------|-------|
| ID | `1_6SEjmDdYvSkxoLwLLpqORitM-QxX5flBpF8LoSX8Lc` |
| Link | [Abrir planilha](https://docs.google.com/spreadsheets/d/1_6SEjmDdYvSkxoLwLLpqORitM-QxX5flBpF8LoSX8Lc/edit) |

## Script ID (clasp)

`1ZgzaZej05txoNZ1-36NqpusrnRo4eFBgehWaN27MPfqmJbRA2nF3USA2`

## Arquivos GAS

| Arquivo | Descricao |
|---------|-----------|
| `Core.gs` | Config central, setup, menu, sync listas/CN Code, onEdit, log, util |
| `Tabs1.gs` | Amazon DSP, Compra Direta, DV360 Prog/TD/YT Auction/YT Reserva, Flashtalking |
| `Tabs2.gs` | Google Others/Search/Video, Meta, Pinterest, TikTok, Twitter |
| `WebApp.gs` | Web App — endpoints: ping, stats, listarOpcoes |
| `appsscript.json` | Manifest — habilita Web App anonima, V8, fuso SP |

## Endpoints da Web App

| Action | Parametros | Retorno |
|--------|-----------|---------|
| `ping` | — | `{ ok, env, version, ts }` |
| `stats` | — | `{ plataformas[], nrows, lastSync, spreadsheet, ts }` |
| `listarOpcoes` | `campo` (opcional) | Todos os campos da aba Dados, ou só o campo solicitado |

## Deploy via clasp

```bash
cd F2-Gerador/corp
clasp login --creds ~/.config/clasp/corp-creds.json
clasp push
```

## Deploy como Web App (Apps Script UI)

1. Abrir o script: [Apps Script](https://script.google.com/home/projects/1ZgzaZej05txoNZ1-36NqpusrnRo4eFBgehWaN27MPfqmJbRA2nF3USA2/edit)
2. **Deploy → Novo deployment**
3. Tipo: **Web App**
4. Executar como: **Eu (felipe.lima@stormx.com.br)**
5. Quem tem acesso: **Qualquer pessoa, mesmo anônima**
6. Copiar a URL gerada → adicionar como `F2_CORP` nas variáveis do Worker

## Diferenças em relacao ao Pessoal

- `Core.gs`: `SPREADSHEET_ID` aponta para planilha Corp (`1_6SEjmDdYvSkxoLwLLpqORitM-QxX5flBpF8LoSX8Lc`)
- `WebApp.gs`: responde com `env: "corp"`
- `Tabs1.gs` e `Tabs2.gs`: idênticos ao Pessoal
