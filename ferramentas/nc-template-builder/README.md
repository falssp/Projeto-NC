# NC Template Builder

Cria templates de NC com slots fixos e variáveis e gera o produto cartesiano de combinações.

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/nc-template-builder/

## Funcionalidades

- Adicione/remova segmentos e alterne entre **FIXO** (valor único) e **VAR** (lista de valores)
- Segmentos FIXO: valor digitado diretamente na linha do segmento
- Segmentos VAR: um valor por linha em campo expansível
- Preview ao vivo com chips coloridos (roxo = fixo · âmbar = var)
- Estimativa de combinações calculada em tempo real antes de gerar
- Geração do produto cartesiano completo (limite: 5.000 NCs)
- Cópia individual por NC · Copiar tudo · Export .txt
- Template salvo automaticamente em localStorage

## Arquivos

```
ferramentas/nc-template-builder/
├── index.html   ← Ferramenta completa (HTML + CSS + JS em arquivo único)
└── README.md
```

## Stack

Vanilla JS + CSS — offline, sem dependências externas.
