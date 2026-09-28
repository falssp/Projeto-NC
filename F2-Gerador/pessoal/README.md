# F2 — Gerador NC · Pessoal

Gerador de Naming Conventions — ambiente Pessoal (Backup).
14 plataformas com cores oficiais de marca.

## Spreadsheet

| Campo | Valor |
|-------|-------|
| ID | `1fOPF6JLH29rY15Obb-QC88jVGuR1t0c4wuB4SyDmqyc` |
| Link | [Abrir planilha](https://docs.google.com/spreadsheets/d/1fOPF6JLH29rY15Obb-QC88jVGuR1t0c4wuB4SyDmqyc/edit) |

## Script ID (clasp)

`1b3ErH_OD3Gn1wElCuW-VPe0soE15PP_0dOvbZvbrEg-N6DpDgqVDyMMQ`

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
cd F2-Gerador/pessoal
clasp login   # conta: falssp@gmail.com
clasp push
```

## Deploy como Web App (Apps Script UI)

1. Abrir o script: [Apps Script](https://script.google.com/home/projects/1b3ErH_OD3Gn1wElCuW-VPe0soE15PP_0dOvbZvbrEg-N6DpDgqVDyMMQ/edit)
2. **Deploy → Novo deployment**
3. Tipo: **Web App**
4. Executar como: **Eu (falssp@gmail.com)**
5. Quem tem acesso: **Qualquer pessoa, mesmo anônima**
6. Copiar a URL gerada → adicionar como `F2_PES` nas variáveis do Worker

## Diferenças em relacao ao Corp

- `Core.gs`: `SPREADSHEET_ID` aponta para planilha Pessoal (`1fOPF6JLH29rY15Obb-QC88jVGuR1t0c4wuB4SyDmqyc`)
- `WebApp.gs`: responde com `env: "pes"`
- `Tabs1.gs` e `Tabs2.gs`: idênticos ao Corp
