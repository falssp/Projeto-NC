# NC Migration Planner

Planeja migrações de Naming Convention com dois modos e gera pares find-replace automáticos.

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/nc-migration-planner/

## Funcionalidades

**Dois modos de migração:**
- **Lista direta** — cole NCs antigas e novas na mesma ordem; correspondência linha a linha
- **Mapa de-para** — deixe a coluna nova vazia e preencha a tabela `valor antigo → valor novo`; a ferramenta substitui em cada segmento automaticamente

**Resultado:**
- Migradas ✅ / Sem mudança ⚠️ / Sem match ❌ — com badge por NC
- KPIs: migradas, sem mudança, sem match, pares find-replace gerados

**Export:**
- CSV com nc_antiga, nc_nova, status e nota
- Find-replace em formato TSV (cola direto no Sheets/Excel)

**Mapa de-para** salvo automaticamente em localStorage.

## Arquivos

```
ferramentas/nc-migration-planner/
├── index.html   ← Ferramenta completa (HTML + CSS + JS em arquivo único)
└── README.md
```

## Stack

Vanilla JS + CSS — offline, sem dependências externas.
