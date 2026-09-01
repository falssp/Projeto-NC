# F3 — Validator · Pessoal

Validador de Naming Conventions — ambiente Pessoal (Backup).
Integração Jira REST API v3, HealthCheck, StatusAmbiente, NotificacaoDicionario.

## Spreadsheet

| Campo | Valor |
|-------|-------|
| ID | `1Dthsg7TWuYfQi-QU1yCkRJEhFdXKQ3I1wNO5Y90CCEQ` |
| Link | [Abrir planilha](https://docs.google.com/spreadsheets/d/1Dthsg7TWuYfQi-QU1yCkRJEhFdXKQ3I1wNO5Y90CCEQ/edit?gid=122289793#gid=122289793) |

## Web App

| Ambiente | URL |
|----------|-----|
| Pessoal | https://script.google.com/macros/s/AKfycbw7QryYGzik1bbT0Mf4N5JcpuuNVoHAudTAbrT2jfzzXnz0wkuJfBFLIeMNViDO4SE2/exec |

## Arquivos

| Arquivo | Tipo | Descricao |
|---------|------|-----------|
| `index.html` | HTML | Interface principal (com backend: saveLog, loadHist, LOG_SHEET) |
| `F3_validator.html` | HTML | Interface standalone (sem extras de backend) |
| `StatusAmbiente.html` | HTML | Painel de status do ambiente |
| `Code.gs` | GAS | Backend principal |
| `Excecoes.gs` | GAS | Gestao de excecoes |
| `Setup.gs` | GAS | Configuracao e triggers |
| `AmbienteStatus.gs` | GAS | Status do ambiente |
| `MergeDict.gs` | GAS | Merge e cache do dicionario |
| `NotificacaoDicionario.gs` | GAS | Notificacao de dicionario desatualizado |
| `Jira.gs` | GAS | Integracao Jira REST API v3 |
| `HealthCheck.gs` | GAS | Healthcheck do sistema |

## Deploy

1. Abrir a planilha
2. Extensoes → Apps Script
3. Criar os arquivos listados acima
4. Colar o conteudo de cada arquivo
5. Rodar setup como Admin
6. Publicar como Web App
