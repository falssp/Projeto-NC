# NC Bulk Validator

Valida centenas de NCs de uma vez com score e grade por NC.

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/nc-bulk-validator/

## Funcionalidades

- Cole qualquer quantidade de NCs (uma por linha) para validação em lote
- Configuração: separador, contagem mín/máx de segmentos, comprimento máximo, uppercase, caracteres especiais, duplicatas
- Score 0–100 por NC com dedução por erro (25 pts) e aviso (10 pts)
- Grade por NC: **pass** (verde) · **warn** (âmbar) · **fail** (vermelho)
- KPIs: total, pass, warn, fail, score médio
- Gauge bar com gradiente de cor
- Filtros por grade
- 3 exports: lista de NCs OK (.txt) · lista de NCs com erro (.txt) · relatório completo (CSV)
- Contador de linhas ao vivo no textarea

## Arquivos

```
ferramentas/nc-bulk-validator/
├── index.html   ← Ferramenta completa (HTML + CSS + JS em arquivo único)
└── README.md
```

## Stack

Vanilla JS + CSS — offline, sem dependências externas.
