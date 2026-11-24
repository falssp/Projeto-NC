# NC Segment Normalizer

Padroniza e limpa valores de segmento em lotes de NCs com pipeline de regras configurável.

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/nc-segment-normalizer/

## Funcionalidades

**Regras de normalização (ativáveis individualmente):**
- Converter para minúsculas ou maiúsculas
- Trim de espaços em cada segmento
- Normalizar separadores alternativos (`-`, `/`, `|`) para o separador padrão
- Remover acentos (á→a, ç→c, etc.)
- Remover caracteres especiais
- Deduplicar segmentos consecutivos idênticos
- Remover segmentos vazios

**Substituições personalizadas** — tabela de-para com valores exatos por segmento

**Resultado:**
- Tabela comparativa original → normalizada com marcação das modificações
- KPIs: total processadas, modificadas, sem alteração
- Copiar todas as NCs normalizadas
- Copiar apenas as modificadas
- Export CSV comparativo (original, normalizada, modificada)

## Arquivos

```
ferramentas/nc-segment-normalizer/
├── index.html   ← Ferramenta completa (HTML + CSS + JS em arquivo único)
└── README.md
```

## Stack

Vanilla JS + CSS — offline, sem dependências externas.
