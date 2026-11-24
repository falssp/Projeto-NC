# NC Segment Stats

Estatísticas detalhadas de cada posição de segmento em uma lista de NCs.

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/nc-segment-stats/

## Funcionalidades

- Frequência de cada valor por posição com barra proporcional, contagem e percentual
- Estatísticas de comprimento por posição: média, P25, mediana, P75, mínimo e máximo
- Entropia de Shannon por posição (indica diversidade: baixa → poucas opções, alta → muitos valores distintos)
- Expandir posições com mais valores do que o top N configurado
- Configuração: separador e top N valores exibidos (3–50)
- Export CSV com posição, valor, contagem, percentual e todas as estatísticas de comprimento

## Arquivos

```
ferramentas/nc-segment-stats/
├── index.html   ← Ferramenta completa (HTML + CSS + JS em arquivo único)
└── README.md
```

## Stack

Vanilla JS + CSS — offline, sem dependências externas.
