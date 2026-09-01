# F2 — Gerador NC · Pessoal

Gerador de Naming Conventions — ambiente Pessoal (Backup).
14 plataformas com cores oficiais de marca, Age Lower/Upper dropdowns (13–99+),
Format Size vs Seconds via Tipo de Tag.

## Spreadsheet

| Campo | Valor |
|-------|-------|
| ID | `1fOPF6JLH29rY15Obb-QC88jVGuR1t0c4wuB4SyDmqyc` |
| Link | [Abrir planilha](https://docs.google.com/spreadsheets/d/1fOPF6JLH29rY15Obb-QC88jVGuR1t0c4wuB4SyDmqyc/edit?gid=1581699926#gid=1581699926) |

## Arquivos GAS

| Arquivo | Descricao |
|---------|-----------|
| `Core.gs` | Config central, setup, menu, sync listas/CN Code, onEdit, log, util |
| `Tabs1.gs` | Amazon DSP, Compra Direta, DV360 Prog/TD/YT Auction/YT Reserva, Flashtalking |
| `Tabs2.gs` | Google Others/Search/Video, Meta, Pinterest, TikTok, Twitter |

## Plataformas

Amazon DSP · Compra Direta · DV360 Programatica · DV360 TradeDesk ·
DV360 YT Auction · DV360 YT Reserva · Flashtalking · Google Others ·
Google Search · Google Video · Meta · Pinterest · TikTok · Twitter

## Diferencas em relacao ao Corp

- `Core.gs`: `SPREADSHEET_ID` aponta para planilha Pessoal
- `Core.gs`: `ADMINS` inclui `falssp@gmail.com`
- `Core.gs`: `SOURCE_ID` e `CN_SOURCE_ID` podem diferir
- `Tabs1.gs` e `Tabs2.gs`: identicos ao Corp

## Deploy

1. Abrir a planilha
2. Extensoes → Apps Script
3. Criar 3 arquivos `.gs`: `Core.gs`, `Tabs1.gs`, `Tabs2.gs`
4. Colar o conteudo de cada arquivo
5. Rodar `setupAll()` como Admin
