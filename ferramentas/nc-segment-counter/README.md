# NC Segment Counter

Agrupa NCs pela quantidade de segmentos e exibe a distribuição em gráfico de donut SVG interativo.

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/nc-segment-counter/

## Funcionalidades

- Donut chart SVG com fatia colorida por quantidade de segmentos
- Legenda clicável que rola até o grupo correspondente
- Configuração do número esperado de segmentos — NCs fora do padrão são destacadas
- KPIs: total de NCs, tamanhos distintos encontrados, NCs com o número esperado, fora do padrão
- Chips clicáveis por grupo (copiam a NC ao clicar)
- Export CSV com nc, num_segmentos e status (ok / fora_padrao)

## Arquivos

```
ferramentas/nc-segment-counter/
├── index.html   ← Ferramenta completa (HTML + CSS + JS em arquivo único)
└── README.md
```

## Stack

Vanilla JS + CSS + SVG inline — offline, sem dependências externas.
