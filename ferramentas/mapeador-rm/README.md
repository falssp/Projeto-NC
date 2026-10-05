# Mapeador RM → ADP · NC Tools

> 🔗 **[Abrir ferramenta](https://falssp.github.io/Projeto-NC/ferramentas/mapeador-rm/)**

Ferramenta HTML standalone offline para copiar valores de colunas do RM para o ADP, usando mapeamento configurável por aba. Funciona 100% no browser — nenhum arquivo sai do computador.

---

## Arquivos

```
ferramentas/mapeador-rm/
├── index.html   ← Ferramenta completa (HTML + CSS + JS em arquivo único)
└── README.md
```

---

## Como usar

1. **RM** — carregue o arquivo RM (.xlsx) via drag-and-drop; a ferramenta detecta automaticamente as abas ADP presentes
2. **Mapeamento** — para cada aba detectada, configure os pares de colunas: qual coluna do RM será copiada para qual coluna do ADP (ex: `A` → `BF`)
3. **ADP** — carregue o arquivo ADP (.xlsx) que receberá os valores
4. **Resultado** — processe e baixe o ADP atualizado

---

## Funcionalidades

| Funcionalidade | Detalhe |
|---|---|
| Upload RM/ADP | Drag-and-drop de arquivos .xlsx |
| Detecção automática de abas | Reconhece Google, Programmatic, Youtube, Meta e Tiktok, Pinterest Snapchat e Twitter, Flashtalking |
| Mapeamento configurável | N pares RM col → ADP col por aba; adicione quantos pares precisar |
| Correspondência por chave | Linhas são correspondidas pelo valor da primeira coluna-chave configurada |
| Patch ZIP-level | Preserva estilos e formatação do Excel original — apenas os dados são alterados |
| 100% offline | Nenhum dado sai do browser; sem dependências de rede além dos CDNs de carregamento |

---

## Mapeamento de nomes de abas

O RM usa nomes de aba diferentes do ADP em dois casos:

| Nome no RM | Nome no ADP |
|---|---|
| YouTube | Youtube |
| Pinterest, Snapchat e X | Pinterest Snapchat e Twitter |

A ferramenta converte automaticamente.

---

## Stack

- **SheetJS** `xlsx.full.min.js` v0.18.5 — leitura de `.xlsx` (via CDN cdnjs)
- **JSZip** v3.10.1 — patch ZIP-level preservando formatação (via CDN cdnjs)
- HTML + CSS + JS vanilla (sem frameworks)
