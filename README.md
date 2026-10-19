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

**https://falssp.github.io/Projeto-NC/**  
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
Hub: **[falssp.github.io/Projeto-NC/ferramentas/](https://falssp.github.io/Projeto-NC/ferramentas/)**

### Offline

| Ferramenta | Descrição |
|---|---|
| **AI Detector** | Detecta conteúdo gerado por IA em vídeo, imagem, áudio e texto |
| **Comparador ADP** | Compara estrutura de duas abas ADP e aponta divergências |
| **Contador ADP** | Conta linhas por aba e plataforma em planilhas ADP |
| **Creative Taxonomy** | Gera taxonomia de criativos por asset (Plataforma + Brainsuite) |
| **Cruzador de IDs** | Cruza IDs ADP × RM e aponta divergências |
| **Excel Reference** | Referência trilíngue de fórmulas Excel/Sheets com assistente IA |
| **Extractor de Fórmulas** | Extrai e deduplica fórmulas de .xlsx/.xlsm por aba |
| **Extrator de Links** | Extrai links de perfil de influencers de planilhas RM/ADP |
| **Galileo IDs** | Browser interativo de IDs e abreviações do sistema Galileo |
| **Grasp Naming** | Referência de estrutura de naming por plataforma (Grasp 2026) |
| **Mapeador RM→ADP** | Aplica mapeamento de nomes RM→ADP direto no .xlsx via ZIP patch |
| **Merge RM→ADP** | Mescla dados do RM na estrutura ADP por plataforma |
| **Removedor de Caracteres** | Remove/substitui caracteres especiais de textos de campanha |

### GAS (Google Apps Script)

| Ferramenta | Descrição |
|---|---|
| **Ad Name Sync** | Sincroniza Ad Names entre planilhas RM e ADP |
| **Dashboard Jira** | Sincroniza subtasks do Jira com Google Sheets |
| **Extrator de Campaign Local** | Extrai dados de Campaign Local das planilhas |
| **Extrator de Influs** | Extrai influencers do RM/ADP e valida duplicatas no dicionário |
| **Gerador de IDs UL** | Gera e registra IDs SX/AMZ nas planilhas em uma operação |

### Offline + Cloud Run

| Ferramenta | Descrição |
|---|---|
| **Influencer Name** | Padroniza nomes de influencers e extrai handles/seguidores |

### Offline + GAS

| Ferramenta | Descrição |
|---|---|
| **Dicionário de Taxonomias UL** | Dicionário interativo de todos os parâmetros Galileo e Freetext |
| **Location** | Gera o campo Location do naming (cidade, estado, região, nacional) |
| **Location 2** | Versão atualizada da taxonomia Location |

## Estrutura do repositório

```
Projeto-NC/
├── index.html               ← Portal (GitHub Pages)
├── ferramentas/             ← Hub + 23 ferramentas standalone
│   ├── index.html           ← Hub de ferramentas
│   ├── ad-name-sync/
│   ├── ai-detector/
│   ├── char-cleaner/
│   ├── comparador-adp/
│   ├── contador-adp/
│   ├── creative-taxonomy/
│   ├── cruzador-ids/
│   ├── dashboard-jira/
│   ├── excel-reference/
│   ├── extractor-formulas/
│   ├── extrator-campanha/
│   ├── extrator-influs/
│   ├── galileo-ids/
│   ├── gerador-ids-ul/
│   ├── grasp-naming/
│   ├── influ-name/
│   ├── link-extrator/
│   ├── location/
│   ├── location-2/
│   ├── mapeador-rm/
│   ├── merge-rm-adp/
│   └── ul-taxonomias/
├── Treinamentos/
│   └── RM_STORMX_ADP/
├── dashboard/
├── Arquivos/
│   ├── 2025/ADP/
│   └── 2026/ADP/ e RM/
├── workers/
│   └── worker.js            ← Cloudflare Workers proxy CORS
└── docs/
    ├── overview.md
    └── links.md
```

## Stack

- Google Apps Script (GAS)
- Google Sheets
- HTML/CSS/JS vanilla
- GitHub Pages (frontend portal)
- Cloudflare Workers (proxy CORS)
- Jira REST API v3
