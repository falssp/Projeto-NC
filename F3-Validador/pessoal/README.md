# F3 — Validator · Pessoal

Validador de Naming Conventions — ambiente Pessoal (Backup).

## Spreadsheet

| Campo | Valor |
|-------|-------|
| ID | `1Dthsg7TWuYfQi-QU1yCkRJEhFdXKQ3I1wNO5Y90CCEQ` |
| Link | [Abrir](https://docs.google.com/spreadsheets/d/1Dthsg7TWuYfQi-QU1yCkRJEhFdXKQ3I1wNO5Y90CCEQ) |

## Web App

| Ambiente | URL |
|----------|-----|
| Pessoal | https://script.google.com/macros/s/AKfycby6uFxVBlvGx2bC93m1NK9ixTG8Oa61CA2qeKCEc8FR9JnGJCv5m1AlOgoq4kmzbpS3/exec |

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
| `Code.gs` | GAS | Backend principal (Pessoal) |
| `Excecoes.gs` | GAS | Gestao de excecoes |
| `Setup.gs` | GAS | Configuracao e triggers |
| `AmbienteStatus.gs` | GAS | Status do ambiente Pessoal |
| `MergeDict.gs` | GAS | Merge e cache do dicionario |
| `NotificacaoDicionario.gs` | GAS | Notificacao dicionario desatualizado |
| `Jira.gs` | GAS | Integracao Jira REST API v3 |
| `HealthCheck.gs` | GAS | Healthcheck Pessoal |
