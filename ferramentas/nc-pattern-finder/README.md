# NC Pattern Finder

Descobre padrões e estruturas recorrentes em listas de NCs.

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/nc-pattern-finder/

## Funcionalidades

- **Frequência por posição** — top-N valores por segmento com barra de % e contagem
- **Templates recorrentes** — agrupa NCs por estrutura (nº de segmentos × tamanho de cada um) com chips coloridos
- **Distribuição de segmentos** — histograma de quantas NCs têm 2, 3, 4… segmentos
- **Distribuição de comprimento** — histograma de chars com média, P25 e P75
- **Matriz de co-ocorrência** — tabela posição 1 × posição 2 (top 8 cada) com intensidade de cor
- Configuração: separador, top N por posição, mínimo de aparições para template
- Export CSV com frequência por posição

## Arquivos

```
ferramentas/nc-pattern-finder/
├── index.html   ← Ferramenta completa (HTML + CSS + JS em arquivo único)
└── README.md
```

## Stack

Vanilla JS + CSS — offline, sem dependências externas.
