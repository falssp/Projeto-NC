# NC Convention Tester

Valida NCs contra regras de convenção customizáveis definidas posição por posição.

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/nc-convention-tester/

## Funcionalidades

**Regras configuráveis por posição:**
- Valores permitidos (lista separada por vírgula)
- Case obrigatório: minúsculas, maiúsculas ou qualquer
- Comprimento mínimo e máximo do segmento
- Regex de validação opcional

**Configuração global:**
- Separador personalizado
- Número mínimo e máximo de segmentos

**Resultado por NC:**
- Status: ✅ válida / ❌ com erros / ⚠️ avisos
- Detalhamento de cada violação com posição e regra responsável
- Filtro por status (todas, erros, avisos, válidas)
- KPIs: total, válidas, com erros, avisos
- Regras salvas automaticamente em localStorage
- Export CSV com nc, status, erros e avisos

## Arquivos

```
ferramentas/nc-convention-tester/
├── index.html   ← Ferramenta completa (HTML + CSS + JS em arquivo único)
└── README.md
```

## Stack

Vanilla JS + CSS — offline, sem dependências externas.
