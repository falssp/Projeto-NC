# NC Duplicate Finder

Detecta NCs duplicadas exatas e similares em uma lista usando distância de Levenshtein.

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/nc-duplicate-finder/

## Funcionalidades

- **Duplicatas exatas** — agrupa NCs 100% idênticas com contagem de ocorrências e linha de cada uma
- **Duplicatas fuzzy** — clusteriza NCs similares via distância de Levenshtein com limiar de similaridade configurável (padrão 80%)
- Tabs separadas para grupos exatos e fuzzy
- Badge de tipo (Exata / Fuzzy) e score médio de similaridade por grupo
- Configuração: separador, similaridade mínima (%), máximo de NCs exibidas por grupo
- Cópia individual por NC
- Export CSV com nc, tipo, grupo âncora, similaridade e linha de origem

## Arquivos

```
ferramentas/nc-duplicate-finder/
├── index.html   ← Ferramenta completa (HTML + CSS + JS em arquivo único)
└── README.md
```

## Stack

Vanilla JS + CSS — offline, sem dependências externas.
