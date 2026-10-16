# NC Tool | F3 — Validator
## Documentacao Tecnica · Corp (Original)

**Planilha Corp:** `1fAQfNJ-UkDfhCHZ2GYcxDWpsAojg7z0VglQHeXtAfSo`
**Web App Corp:** `AKfycby9YQftWg586o1m1gPEaMyHMMYzyYUJ8MRWY0WRSv67kGAkeEX4TVPXeLbB4_I6Wv7neA/exec`

> Este documento cobre exclusivamente o ambiente Corp. O ambiente Pessoal e documentado separadamente.

## IDs hardcoded

| Variavel | ID |
|---|---|
| `LOG_SHEET_ID` | `1fAQfNJ-UkDfhCHZ2GYcxDWpsAojg7z0VglQHeXtAfSo` |
| `NC_SHEET_ID` | `1VBaExPGHOVYxpTyzJymrb8RuWWe34_9WBE0aC3slETU` |
| `DICT_ID` | `17vc4UfMz-o2Oz0unAnJlErhHd_2n34tvlFxFnPgTIok` |
| `RM_ID` | `144h_vGX9vBnxf1vENnsoseGGqt0pqxITuGuh72XbS-w` |
| `SETUP_SHEET_ID` | `1fAQfNJ-UkDfhCHZ2GYcxDWpsAojg7z0VglQHeXtAfSo` |

## Arquivos GAS

| Arquivo | Responsabilidade |
|---|---|
| `Code.gs` | doGet, onOpen, menu, getDicionario, fetchSheet, salvarLog, getHistorico |
| `Excecoes.gs` | CRUD de excecoes, aprovacao, listagem, e-mails |
| `Jira.gs` | Integracao REST API v3 Jira |
| `MergeDict.gs` | Merge semanal RM Template + Dicionario → PropertiesService |
| `Setup.gs` | Criacao e padronizacao de todas as abas |

## Triggers

| Funcao | Frequencia |
|---|---|
| `mergeDict` | Todo domingo as 3h |
| `arquivarLogsAntigos` | Dia 1 de cada mes as 3h |

## Perfis

| Perfil | Pode validar | Pode solicitar excecao | Pode aprovar/rejeitar |
|---|---|---|---|
| Operador | ✅ | ✅ | ❌ |
| Gerente | ✅ | ✅ | ✅ |
| Admin | ✅ | ✅ | ✅ |
| Dev | ✅ | ✅ | ✅ |
