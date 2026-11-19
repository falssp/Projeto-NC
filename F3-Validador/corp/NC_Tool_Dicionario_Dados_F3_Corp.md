# NC Tool | F3 — Validator
## Dicionario de Dados · Corp

## Aba Log

| Campo | Coluna | Tipo | Descricao |
|---|---|---|---|
| ID | A | String | `LOG-{timestamp_ms}` |
| Timestamp | B | ISO 8601 | Data e hora da validacao |
| Usuario | C | String | E-mail do usuario |
| Cliente | D | String | Sempre `Unilever BR` |
| Fonte | E | String | `ADP Excel`, `Dash/QA Painel` ou `Manual` |
| Arquivo | F | String | Nome do arquivo ADP |
| Plataforma | G | String | Plataformas validadas |
| Total | H | Numero | Total de strings validadas |
| Corretos | I | Numero | Strings sem nenhum erro |
| Erros | J | Numero | Strings com pelo menos um erro |
| Score% | K | String | Percentual de acerto |

## Aba Excecoes

| Campo | Coluna | Tipo | Descricao |
|---|---|---|---|
| TX Key | A | String | `EX-{hash_hex_8}` |
| Ad Name | B | String | String solicitando excecao |
| Plataforma | C | String | Plataforma da string |
| Estrutura | D | String | Nivel NC |
| Motivo | E | String | Motivo selecionado |
| Status | M | String | `Em Analise`, `Aprovado` ou `Rejeitado` |

## Regras de validacao

| Codigo | Campo | Logica |
|---|---|---|
| REL0 | Campaign Code | Deve iniciar com `cn` + 4-10 digitos |
| VAL-CL | CampaignLocal | Slug deve estar no dicionario |
| VAL-MKT | Market (PCAT) | Deve estar no dicionario ou ser `br`/`na` |
| VAL-BUY | Buy Model | Deve estar na lista permitida |
| VAL-OBJ | Objetivo | Deve estar na lista permitida |
| WARN-PLAT | Plataforma | String parece ser de outra plataforma |
