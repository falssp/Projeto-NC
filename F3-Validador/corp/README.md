# F3 — Validator · Corp

Validador de Naming Conventions — ambiente Corp (Original).
Integracao Jira REST API v3, HealthCheck, StatusAmbiente, NotificacaoDicionario.

## Spreadsheet

| Campo | Valor |
|-------|-------|
| ID | `1fAQfNJ-UkDfhCHZ2GYcxDWpsAojg7z0VglQHeXtAfSo` |
| Link | [Abrir planilha](https://docs.google.com/spreadsheets/d/1fAQfNJ-UkDfhCHZ2GYcxDWpsAojg7z0VglQHeXtAfSo/edit?gid=492647762#gid=492647762) |

## Web App

| Ambiente | URL |
|----------|-----|
| Corp | https://script.google.com/macros/s/AKfycby9YQftWg586o1m1gPEaMyHMMYzyYUJ8MRWY0WRSv67kGAkeEX4TVPXeLbB4_I6Wv7neA/exec |

## Arquivos

| Arquivo | Tipo | Descricao |
|---------|------|-----------|
| `index.html` | HTML | Interface principal |
| `F3_validator.html` | HTML | Interface standalone |
| `StatusAmbiente.html` | HTML | Painel de status do ambiente |
| `Code.gs` | GAS | Backend principal (Original) |
| `Excecoes.gs` | GAS | Gestao de excecoes |
| `Setup.gs` | GAS | Configuracao e triggers |
| `AmbienteStatus.gs` | GAS | Status do ambiente (Corp) |
| `MergeDict.gs` | GAS | Merge e cache do dicionario |
| `NotificacaoDicionario.gs` | GAS | Notificacao de dicionario desatualizado (Corp) |
| `Jira.gs` | GAS | Integracao Jira REST API v3 |
| `HealthCheck.gs` | GAS | Healthcheck do sistema (Corp) |

## Diferencas em relacao ao Pessoal

- `Code.gs`: versao Original (AfSo) — mais completa que o Pessoal
- `Setup.gs`: configuracoes especificas do Corp
- `AmbienteStatus.gs`: referencia ambiente Corp
- `HealthCheck.gs`: referencia ambiente Corp
- `NotificacaoDicionario.gs`: e-mail destino Corp

## Deploy

1. Abrir a planilha
2. Extensoes → Apps Script
3. Criar os arquivos listados acima
4. Colar o conteudo de cada arquivo
5. Rodar setup como Admin
6. Publicar como Web App
