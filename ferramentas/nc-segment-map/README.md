# NC Segment Map

Mapa visual de valores únicos por posição × grupo — grade interativa de quem usa o quê em cada slot da NC.

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/nc-segment-map/

## Funcionalidades

- Grade grupo (eixo Y) × posição (eixo X) com valores únicos por célula
- Configuração da posição de agrupamento e das colunas a exibir
- Células com valor único mostram o valor; múltiplos valores mostram contagem clicável
- Painel de detalhes por célula: lista todos os valores com chips copiáveis
- KPIs: total de NCs, grupos e colunas mapeadas
- Export CSV: grupo, P1..Pn (valores pipe-separados), total de valores

## Arquivos

```
ferramentas/nc-segment-map/
├── index.html   ← Ferramenta completa (HTML + CSS + JS em arquivo único)
└── README.md
```

## Stack

Vanilla JS + CSS — offline, sem dependências externas.
