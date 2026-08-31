# Overview · NC Tool Unilever BR

## Contexto

NC Tool e um sistema interno da StormX para Unilever BR (parceria Grasp).
Centraliza criacao, validacao e gestao de naming conventions para campanhas digitais.

## Fases

### F1 — IDs AdServer
Gestao de IDs SX/AMZ via Google Sheets. Painel executivo e sincronizacao automatica via Apps Script.

### F2 — Gerador (NC Generator)
Gerador de naming conventions. 14 abas de plataforma com cores oficiais de marca.
Logica Format Size vs Seconds via Tipo de Tag.

### F3 — Validador
Validador de NCs com integracao Jira REST API v3, HealthCheck, StatusAmbiente e NotificacaoDicionario.

### F4 — Acessorios
Suite HTML com modulos: Gerador de IDs, ANS, Campaign Local, Dicionario de Influs,
Extrator de Influencer, Merge/Mapeador RM→ADP, Influencer Name Tool,
Extrator de Formulas, Comparador, Contador ADP, Removedor de Caracteres.

### F5 — FT Flashtalking Validator
Validador de naming para Flashtalking. GAS + Sheets.

### Super App
Hub central card-based consolidando acesso a F3, F4 e F5.
Vive dentro da Capa de cada planilha.

## Regra de ouro
Corp e Pessoal sao ambientes completamente isolados.
Nenhum arquivo Corp referencia IDs ou URLs do Pessoal e vice-versa.
