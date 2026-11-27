# NC Timeline

Mapeia NCs em uma grade período × grupo, extraindo o segmento de data/fase e montando uma linha do tempo visual.

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/nc-timeline/

## Funcionalidades

- Grid período × grupo: cada célula mostra quantas NCs existem naquela combinação
- Configuração de qual posição contém o período, o grupo (linha) e o tipo (cor das bolhas)
- Reordenação manual dos períodos pelo eixo X (↑ ↓ por posição)
- Clique em uma célula para ver todas as NCs daquele cruzamento
- Clique em um chip de NC para copiar o valor
- KPIs: total de NCs, períodos detectados, grupos distintos
- Export CSV: nc, grupo, periodo, num_segmentos

## Arquivos

```
ferramentas/nc-timeline/
├── index.html   ← Ferramenta completa (HTML + CSS + JS em arquivo único)
└── README.md
```

## Stack

Vanilla JS + CSS — offline, sem dependências externas.
