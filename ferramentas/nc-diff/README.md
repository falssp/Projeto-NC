# NC Diff

Compara duas listas de NCs (antes × depois de migração) e exibe as diferenças.

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/nc-diff/

## Funcionalidades

- Dois modos de comparação: **Exato** (lookup por chave) e **Fuzzy** (Levenshtein ≤3)
- 4 tipos de resultado: adicionada (verde), removida (vermelho), modificada (âmbar), igual (cinza)
- Diff por segmento nas NCs modificadas — chips mostrando o que mudou
- KPIs: adicionadas / removidas / modificadas / sem mudança
- Filtros por tipo + busca em tempo real
- Cópia individual e export CSV

## Arquivos

```
ferramentas/nc-diff/
├── index.html   ← Ferramenta completa (HTML + CSS + JS em arquivo único)
└── README.md
```

## Stack

Vanilla JS + CSS — algoritmo Levenshtein e LCS inline. Offline, sem dependências.
