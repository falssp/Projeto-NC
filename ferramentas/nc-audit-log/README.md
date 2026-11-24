# NC Audit Log

Timeline de ciclo de vida de NCs — registra criação, modificações, deprecações e revisões.

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/nc-audit-log/

## Funcionalidades

- 6 tipos de ação: Criar · Modificar · Deprecar · Restaurar · Review · Nota
- Campos por entrada: ação, NC (nova), NC anterior (para modificações), autor, motivo e tags
- Timeline reversa agrupada por data com separadores
- Cor e ícone distintos por tipo de ação
- KPIs: total de entradas, criadas, modificadas, deprecadas, restauradas
- Lembra o último autor usado
- Filtros por tipo de ação + busca em tempo real
- Delete individual, cópia e export CSV
- Dados persistidos em localStorage

## Arquivos

```
ferramentas/nc-audit-log/
├── index.html   ← Ferramenta completa (HTML + CSS + JS em arquivo único)
└── README.md
```

## Stack

Vanilla JS + CSS — offline, sem dependências externas.
