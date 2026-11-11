# F3 — Validator · Corp

Validador de Naming Conventions — ambiente Corp (Original).
Integracao Jira REST API v3, HealthCheck, StatusAmbiente, NotificacaoDicionario.

## Spreadsheet

| Campo | Valor |
|-------|-------|
| ID | `1fAQfNJ-UkDfhCHZ2GYcxDWpsAojg7z0VglQHeXtAfSo` |
| Link | [Abrir](https://docs.google.com/spreadsheets/d/1fAQfNJ-UkDfhCHZ2GYcxDWpsAojg7z0VglQHeXtAfSo) |

## Web App

| Ambiente | URL |
|----------|-----|
| Corp | https://script.google.com/macros/s/AKfycbzKKuKhr111DFtk5jAhx3ofQzZL78sQvliDKtxDj_FlBZmbPaLuufd6-oHxq7Tsr9sp_w/exec |

## Endpoints (doGet)

| action | Descricao |
|--------|-----------|
| `ping` | Status do sistema |
| `stats` | ultimaValidacao, totalMes, totalStrings, totalErros, saude dicionario |

## Arquivos

| Arquivo | Tipo | Descricao |
|---------|------|-----------|
| `index.html` | HTML | Interface principal |
| `F3_validator.html` | HTML | Interface standalone |
| `StatusAmbiente.html` | HTML | Painel de status |
| `Code.gs` | GAS | Backend principal (Corp) |
| `Excecoes.gs` | GAS | Gestao de excecoes |
| `Setup.gs` | GAS | Configuracao e triggers |
| `AmbienteStatus.gs` | GAS | Status do ambiente Corp |
| `MergeDict.gs` | GAS | Merge e cache do dicionario |
| `NotificacaoDicionario.gs` | GAS | Notificacao dicionario desatualizado |
| `Jira.gs` | GAS | Integracao Jira REST API v3 |
| `HealthCheck.gs` | GAS | Healthcheck Corp |
