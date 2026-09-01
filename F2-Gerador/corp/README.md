# F2 — Gerador NC · Corp

Gerador de Naming Conventions — ambiente Corp (Original).
14 plataformas com cores oficiais de marca.

## Spreadsheet

| Campo | Valor |
|-------|-------|
| ID | `1_6SEjmDdYvSkxoLwLLpqORitM-QxX5flBpF8LoSX8Lc` |
| Link | [Abrir planilha](https://docs.google.com/spreadsheets/d/1_6SEjmDdYvSkxoLwLLpqORitM-QxX5flBpF8LoSX8Lc/edit?gid=60594252#gid=60594252) |

## Arquivos GAS

| Arquivo | Descricao |
|---------|-----------|
| `Core.gs` | Config central, setup, menu, sync listas/CN Code, onEdit, log, util |
| `Tabs1.gs` | Amazon DSP, Compra Direta, DV360 Prog/TD/YT Auction/YT Reserva, Flashtalking |
| `Tabs2.gs` | Google Others/Search/Video, Meta, Pinterest, TikTok, Twitter |

## Diferencas em relacao ao Pessoal

- `Core.gs`: `SPREADSHEET_ID` aponta para planilha Corp
- `Tabs1.gs` e `Tabs2.gs`: identicos ao Pessoal

## Deploy

1. Abrir a planilha
2. Extensoes → Apps Script
3. Criar 3 arquivos `.gs`: `Core.gs`, `Tabs1.gs`, `Tabs2.gs`
4. Colar o conteudo de cada arquivo
5. Rodar `setupAll()` como Admin
