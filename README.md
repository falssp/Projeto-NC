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
Ver lista completa em [`ferramentas/README.md`](ferramentas/README.md).

### Offline (sem dependências)

| Ferramenta | Descrição | Link |
|---|---|---|
| **AI Detector** | Detecta conteúdo gerado por IA via APIs configuráveis | [Abrir](https://falssp.github.io/Projeto-NC/ferramentas/ai-detector/) |
| **Comparador ADP** | Compara tokens entre duas strings posição a posição | [Abrir](https://falssp.github.io/Projeto-NC/ferramentas/comparador-adp/) |
| **Contador ADP** | Conta linhas válidas por aba em arquivos ADP | [Abrir](https://falssp.github.io/Projeto-NC/ferramentas/contador-adp/) |
| **Creative Taxonomy** | Gera taxonomia de criativos por asset | [Abrir](https://falssp.github.io/Projeto-NC/ferramentas/creative-taxonomy/creative-taxonomy.html) |
| **Cruzador de IDs** | Cruza IDs ADP × RM e aponta divergências | [Abrir](https://falssp.github.io/Projeto-NC/ferramentas/cruzador-ids/) |
| **Extractor de Fórmulas** | Extrai e deduplica fórmulas de .xlsx/.xlsm por aba | [Abrir](https://falssp.github.io/Projeto-NC/ferramentas/extractor-formulas/) |
| **Extrator de Links** | Extrai handles de influencers de URLs (19 redes) | [Abrir](https://falssp.github.io/Projeto-NC/ferramentas/link-extrator/) |
| **Galileo IDs** | Browser interativo de IDs e abreviações do Galileo | [Abrir](https://falssp.github.io/Projeto-NC/ferramentas/galileo-ids/) |
| **Grasp Naming** | Estrutura de naming por plataforma | [Abrir](https://falssp.github.io/Projeto-NC/ferramentas/grasp-naming/grasp-naming.html) |
| **Location** | Gera o campo Location do naming | [Abrir](https://falssp.github.io/Projeto-NC/ferramentas/location/) |
| **Mapeador RM→ADP** | Copia valores de colunas do RM para o ADP via ZIP patch | [Abrir](https://falssp.github.io/Projeto-NC/ferramentas/mapeador-rm/) |
| **Merge RM→ADP** | Mescla dados do RM na estrutura ADP preservando formatação | [Abrir](https://falssp.github.io/Projeto-NC/ferramentas/merge-rm-adp/) |
| **Removedor de Caracteres** | Remove/substitui caracteres especiais de textos de campanha | [Abrir](https://falssp.github.io/Projeto-NC/ferramentas/char-cleaner/) |

### GAS (requerem Web App Google Apps Script)

| Ferramenta | Descrição | Link |
|---|---|---|
| **Ad Name Sync** | Sincroniza Ad Names entre planilhas RM e ADP | [Abrir](https://falssp.github.io/Projeto-NC/ferramentas/ad-name-sync/) |
| **Dashboard Jira** | Sincroniza subtasks do Jira com Google Sheets | [Abrir](https://falssp.github.io/Projeto-NC/ferramentas/dashboard-jira/) |
| **Extrator de Campaign Local** | Extrai dados de Campaign Local dos ADPs | [Abrir](https://falssp.github.io/Projeto-NC/ferramentas/extrator-campanha/) |
| **Extrator de Influs** | Extrai influs do RM/ADP e valida duplicatas no dicionário | [Abrir](https://falssp.github.io/Projeto-NC/ferramentas/extrator-influs/) |
| **Gerador de IDs UL** | Gera e registra IDs SX/AMZ nas planilhas | [Abrir](https://falssp.github.io/Projeto-NC/ferramentas/gerador-ids-ul/) |

### Offline + Cloud Run

| Ferramenta | Descrição | Link |
|---|---|---|
| **Influencer Name** | Padroniza nomes e extrai handles/seguidores (scraping TikTok/IG/YT opcional) | [Abrir](https://falssp.github.io/Projeto-NC/ferramentas/influ-name/) |

### Offline + GAS

| Ferramenta | Descrição | Link |
|---|---|---|
| **Dicionário de Taxonomias UL** | Parâmetros Galileo e Freetext com siglas | [Abrir](https://falssp.github.io/Projeto-NC/ferramentas/ul-taxonomias/taxonomias-ul.html) |
| **Dashboard Campaign Local** | Visualiza e filtra dados do Campaign Local | [Abrir](https://falssp.github.io/Projeto-NC/ferramentas/dashboard-cn/) |

## Treinamentos

Materiais de treinamento interativos em [`Treinamentos/`](Treinamentos/).
Ver lista completa em [`Treinamentos/README.md`](Treinamentos/README.md) ou no [portal de treinamentos](https://falssp.github.io/Projeto-NC/Treinamentos/).

## Estrutura do repositorio

```
Projeto-NC/
├── F1-IDs-AdServer/corp/ e pessoal/
├── F2-Gerador/corp/ e pessoal/
├── F3-Validador/corp/ e pessoal/
├── F4-Acessorios/corp/ e pessoal/
├── F5-Flashtalking/corp/ e pessoal/
├── SuperApp/corp/ e pessoal/
├── ferramentas/          ← 18 ferramentas standalone + GAS
├── Treinamentos/         ← 12 treinamentos/guias interativos
├── Arquivos/
│   ├── 2025/ADP/
│   └── 2026/ADP/ e RM/
├── workers/
│   └── worker.js         ← Cloudflare Workers proxy CORS
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
