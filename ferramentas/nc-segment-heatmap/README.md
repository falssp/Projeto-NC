# NC Segment Heatmap

Heatmap interativo de co-ocorrências entre dois segmentos de NCs.

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/nc-segment-heatmap/

## Funcionalidades

- Escolha quais duas posições comparar (eixo X e Y)
- Heatmap com 6 níveis de intensidade (branco → azul escuro) por frequência de co-ocorrência
- KPIs: total de NCs, valores únicos por eixo, co-ocorrência máxima
- Top 15 combinações com barra de proporção
- Tooltip em cada célula com o par de valores e a contagem exata
- Configuração: separador, posições X/Y, top N por eixo (3–30)
- Export CSV com todos os pares e contagens

## Arquivos

```
ferramentas/nc-segment-heatmap/
├── index.html   ← Ferramenta completa (HTML + CSS + JS em arquivo único)
└── README.md
```

## Stack

Vanilla JS + CSS — offline, sem dependências externas.
