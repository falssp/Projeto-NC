# Projeto-NC · NC Tool Unilever BR

Sistema de naming conventions e gestão de campanhas para Unilever BR.
Desenvolvido pela StormX em parceria com a Grasp.

## Ambientes

| Ambiente | Conta | Descricao |
|----------|-------|-----------|
| **Corp** | felipe.lima@stormx.com.br | Ambiente original (producao) |
| **Pessoal** | falssp@gmail.com | Ambiente backup — isolado do Corp |

> Corp e Pessoal sao completamente isolados. Corp nunca referencia Pessoal e vice-versa.

## Portal

**https://falssp.github.io/nc-tool/**
Hub de navegacao com status em tempo real de cada fase (via Cloudflare Workers proxy).

## Modulos

| Fase | Nome | Status |
|------|------|--------|
| F1 | IDs AdServer | Implantado |
| F2 | Gerador NC | Implantado |
| F3 | Validador | Implantado |
| F4 | Acessorios | Implantado |
| F5 | FT Flashtalking Validator | Implantado |
| Super App | Hub central | Implantado |

## Ferramentas standalone

Ferramentas HTML interativas hospedadas no GitHub Pages — sem build, sem backend.

| Ferramenta | Descrição | Link |
|---|---|---|
| **Creative Taxonomy** | Gera taxonomia de criativos por asset | [Abrir](https://falssp.github.io/Projeto-NC/ferramentas/creative-taxonomy/creative-taxonomy.html) |
| **Galileo IDs** | Consulta IDs e abreviações do sistema Galileo | [Abrir](https://falssp.github.io/Projeto-NC/ferramentas/galileo-ids/) |
| **Grasp Naming** | Estrutura de naming por plataforma | [Abrir](https://falssp.github.io/Projeto-NC/ferramentas/grasp-naming/grasp-naming.html) |
| **Location** | Gera o campo Location do naming | [Abrir](https://falssp.github.io/Projeto-NC/ferramentas/location/) |
| **Dicionário de Taxonomias UL** | Parâmetros Galileo e Freetext com siglas | [Abrir](https://falssp.github.io/Projeto-NC/ferramentas/ul-taxonomias/taxonomias-ul.html) |
| **Extractor de Fórmulas** | Extrai e deduplica fórmulas de .xlsx/.xlsm por aba | [Abrir](https://falssp.github.io/Projeto-NC/ferramentas/extractor-formulas/) |

## Estrutura do repositorio

```
Projeto-NC/
├── F1-IDs-AdServer/corp/ e pessoal/
├── F2-Gerador/corp/ e pessoal/
├── F3-Validador/corp/ e pessoal/
├── F4-Acessorios/corp/ e pessoal/
├── F5-Flashtalking/corp/ e pessoal/
├── SuperApp/corp/ e pessoal/
├── ferramentas/
│   ├── creative-taxonomy/
│   ├── galileo-ids/
│   ├── grasp-naming/
│   ├── location/
│   ├── ul-taxonomias/
│   ├── extractor-formulas/   ← novo
│   └── dashboard-jira/
├── Arquivos/
│   ├── 2025/ADP/
│   └── 2026/ADP/ e RM/
├── Treinamentos/
│   └── RM_STORMX_ADP/
├── workers/
│   └── worker.js (Cloudflare Workers proxy CORS)
└── docs/
    ├── links.md
    ├── overview.md
    └── NC_Tool_*.md
```

## Stack
- Google Apps Script (GAS)
- Google Sheets
- HTML/CSS/JS vanilla
- GitHub Pages (frontend portal)
- Cloudflare Workers (proxy CORS)
- Jira REST API v3
