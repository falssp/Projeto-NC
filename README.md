# Projeto-NC · NC Tool Unilever BR

Sistema de naming conventions e gestão de campanhas para Unilever BR.
Desenvolvido pela StormX em parceria com a Grasp.

## Ambientes

| Ambiente | Descricao |
|----------|-----------|
| **Corp** | Ambiente original (producao) |
| **Pessoal** | Ambiente backup — isolado do Corp |

> Corp e Pessoal sao completamente isolados. Corp nunca referencia Pessoal e vice-versa.

## Modulos

| Fase | Nome | Status |
|------|------|--------|
| F1 | IDs AdServer | Implantado |
| F2 | Gerador NC | Implantado |
| F3 | Validador | Implantado |
| F4 | Acessorios | Implantado |
| F5 | FT Flashtalking Validator | Implantado |
| Super App | Hub central | Implantado |

## Stack
- Google Apps Script (GAS)
- Google Sheets
- HTML/CSS/JS vanilla
- Jira REST API v3, Google Drive API
