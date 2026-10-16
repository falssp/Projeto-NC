# Overview · NC Tool Unilever BR

## Contexto

NC Tool e um sistema interno desenvolvido pela StormX para a Unilever BR, com apoio da Grasp.
Centraliza a criacao, validacao e gestao de naming conventions para campanhas digitais.

## Fases

### F1 — IDs AdServer
Gestao de IDs SX/AMZ via Google Sheets. Painel executivo, controles de usuario
e sincronizacao automatica via Apps Script.

### F2 — Gerador (NC Generator)
Gerador de naming conventions. 14 abas de plataforma com cores oficiais de marca.
Logica Format Size vs Seconds via Tipo de Tag.

### F3 — Validador
Validador de naming conventions com integracao Jira REST API v3, HealthCheck,
StatusAmbiente, NotificacaoDicionario e menus estruturados por perfil.
Endpoints: ping e stats (ultimaValidacao, totalMes, totalStrings, totalErros, saude dicionario).

### F4 — Acessorios
Suite de ferramentas HTML/GAS com 12 modulos:
Gerador de IDs, ANS, Campaign Local, Dicionario de Influs, Extrator de Influencer,
Merge/Mapeador RM→ADP, Influencer Name Tool, Extrator de Formulas,
Comparador, Contador ADP, Removedor de Caracteres.
Endpoints: ping e stats (ultimaOperacao, totalMes).

### F5 — FT Flashtalking Validator
Validador de naming para Flashtalking. GAS + Sheets.
Endpoints: ping e stats (ultimaValidacao, totalMes, totalStrings, totalErros).

### Super App
Hub central card-based consolidando acesso a F3, F4 e F5.
Vive dentro da Capa de cada planilha.

## Portal (nc-tool)

GitHub Pages em https://falssp.github.io/nc-tool/ com status em tempo real.
Cloudflare Workers (nc-proxy.falssp.workers.dev) resolve CORS entre Pages e GAS.
Toggle Corp/Pessoal — cada ambiente tem suas proprias URLs.

## Arquivos

Historico de arquivos RM e ADP organizados por ano em `Arquivos/`.
Versoes do RM STORMX 2026 (v1 a v5.8) e ADPs v13.7 a v4.6 (2025-2026).

## Treinamentos

Materiais de treinamento em `Treinamentos/`.
RM STORMX ADP — versoes de 23-07-26 (v1/v2/v3) e 24-08-26.
Cada treinamento: HTML interativo, PPT e roteiro Word.

## Regra de ouro
Corp e Pessoal sao ambientes completamente isolados.
Nenhum arquivo Corp referencia IDs ou URLs do Pessoal e vice-versa.
