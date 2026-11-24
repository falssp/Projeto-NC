# NC Rulebook

Editor de documentação de Naming Convention — registra regras, segmentos e exemplos.

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/nc-rulebook/

## Funcionalidades

- Campos de configuração: nome, versão, responsável, separador, case, mín/máx segmentos, comprimento máximo, regex, termos proibidos e obrigatórios
- Lista de segmentos ordenados com nome e obrigatoriedade (obrigatório / opcional)
- Preview ao vivo com chips coloridos por posição
- Listas de exemplos bons (✓ OK) e ruins (✗ RUIM)
- Export **JSON** (configuração completa) e **Markdown** (documentação formatada com tabela de segmentos)
- Barra de save sticky com indicação de alterações não salvas
- Dados persistidos em localStorage

## Arquivos

```
ferramentas/nc-rulebook/
├── index.html   ← Ferramenta completa (HTML + CSS + JS em arquivo único)
└── README.md
```

## Stack

Vanilla JS + CSS — offline, sem dependências externas.
