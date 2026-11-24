# NC Length Enforcer

Visualiza o comprimento de cada NC e aplica limites de aviso e erro configuráveis.

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/nc-length-enforcer/

## Funcionalidades

- Barra de comprimento por NC com marcadores visuais dos limites de aviso e erro
- Histograma de distribuição de comprimento (buckets de 5 chars) com codificação de cor (ok / aviso / erro)
- KPIs: total, NCs dentro do limite, em aviso e em erro
- Limites configuráveis: aviso acima de N chars, erro acima de M chars
- Filtro por status (todas, erro, aviso, ok)
- Export CSV com nc, comprimento e status

## Arquivos

```
ferramentas/nc-length-enforcer/
├── index.html   ← Ferramenta completa (HTML + CSS + JS em arquivo único)
└── README.md
```

## Stack

Vanilla JS + CSS — offline, sem dependências externas.
