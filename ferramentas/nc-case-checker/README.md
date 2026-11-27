# NC Case Checker

Valida o case (lowercase / UPPERCASE / TitleCase) de cada segmento da NC por posição configurável.

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/nc-case-checker/

## Funcionalidades

- Regras de case por posição (1-based): lowercase, UPPERCASE, TitleCase ou qualquer
- Adicione e remova posições individualmente; regras salvas em localStorage
- Tokens coloridos por posição: verde = ok, vermelho = violação
- Filtro por status: todas / OK / Erro
- KPIs: total de NCs, OK e erros
- Export CSV: nc, status, erros (pipe-separados)

## Arquivos

```
ferramentas/nc-case-checker/
├── index.html   ← Ferramenta completa (HTML + CSS + JS em arquivo único)
└── README.md
```

## Stack

Vanilla JS + CSS — offline, sem dependências externas.
