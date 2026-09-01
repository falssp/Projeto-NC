# NC Tool | F3 — Validator
## Manual do Usuario · Corp

## Modos de validacao

| Modo | Como usar |
|---|---|
| ADP Excel | Upload do arquivo .xlsx — sistema detecta abas automaticamente |
| Dash / QA Painel | Upload .csv/.xlsx, colar tabela ou link Google Sheets |
| Manual / Colar | Selecione a plataforma e cole os strings |
| Modo Ticket | Compara dois ADPs (Antes x Depois) e valida o delta |

## Resultados

| Status | Significado |
|---|---|
| ✅ Valido | Ad name correto |
| ❌ Invalido | Um ou mais erros |
| ⚠️ Excecao | Aprovado como excecao pelo time |

Score: verde ≥ 95%, amarelo ≥ 70%, vermelho < 70%.

## Integracao Jira

Menu NC Tool → **Configurar Token Jira** → informe e-mail e API Token.
Token salvo em PropertiesService.
