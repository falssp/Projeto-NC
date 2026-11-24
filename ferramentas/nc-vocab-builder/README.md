# NC Vocab Builder

Dicionário de valores permitidos por posição — define, importa de NCs existentes e verifica cobertura.

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/nc-vocab-builder/

## Funcionalidades

- Editor de vocabulário por posição: adicione termos e descrições para cada slot da NC
- Importação automática de valores a partir de uma lista de NCs existentes
- Verificação de cobertura: quais valores encontrados estão fora do vocab, por posição
- Barra de cobertura (%) por posição com chips clicáveis dos valores desconhecidos
- Clique em um chip desconhecido para adicioná-lo ao vocab com um clique
- Persist via localStorage — vocab salvo entre sessões

## Arquivos

```
ferramentas/nc-vocab-builder/
├── index.html   ← Ferramenta completa (HTML + CSS + JS em arquivo único)
└── README.md
```

## Stack

Vanilla JS + CSS — offline, sem dependências externas.
