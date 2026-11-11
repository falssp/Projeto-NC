# Contador ADP · NC Tools

> 🔗 **[Abrir ferramenta](https://falssp.github.io/Projeto-NC/ferramentas/contador-adp/)**

Ferramenta HTML standalone para contar linhas válidas por aba em arquivos ADP (Ad Placement) — exclui automaticamente as linhas de exemplo fixas do topo de cada aba.

Funciona 100% offline — nenhum dado sai do browser. Requer arquivos `.xlsx` locais.

---

## Arquivos

```
ferramentas/contador-adp/
├── index.html   ← Ferramenta completa (HTML + CSS + JS em arquivo único)
└── README.md
```

---

## Como usar

1. Arraste ou clique para carregar um ou mais arquivos ADP (`.xlsx`)
2. A ferramenta detecta automaticamente as abas reconhecidas (Google, Programmatic, Youtube, Meta e Tiktok, Pinterest Snapchat e Twitter, Flashtalking)
3. O resultado mostra:
   - **Total de abas lidas** e **total de linhas válidas** (cards no topo)
   - **Tabela por aba** com nome da aba, contagem de linhas válidas e nome do arquivo de origem
4. Clique em **Limpar** para resetar a ferramenta

---

## Funcionalidades

| Funcionalidade | Detalhe |
|---|---|
| Múltiplos arquivos | Processa vários ADPs de uma vez na mesma tabela |
| Detecção automática de abas | Reconhece as 6 abas de mídia pelo nome (tolera variações) |
| Exclusão de linhas de exemplo | Cada aba tem um `dataStart` configurado para pular as linhas fixas do topo |
| Validação por coluna D | Considera a linha válida se a coluna D (Ad Name) tiver conteúdo |
| Totais consolidados | Soma de todas as abas de todos os arquivos |
| Sem dependências externas | Carrega SheetJS via CDN (cdnjs); sem servidor ou backend |

---

## Critério de contagem

| Aba | Linhas de exemplo (excluídas) | Primeira linha válida |
|---|---|---|
| Google | 15–16 | 17 |
| Programmatic | 15–16 | 17 |
| Youtube | 15–16 | 17 |
| Meta e Tiktok | 15–18 | 19 |
| Pinterest, Snapchat e Twitter | 15–17 | 18 |
| Flashtalking | 15 | 16 |

---

## Stack

- **SheetJS** `xlsx.full.min.js` v0.18.5 — leitura de `.xlsx`
- HTML + CSS + JS vanilla (sem frameworks)

---

## Também disponível no F4

Esta ferramenta existe de forma integrada no **F4 Acessórios** (módulo "Contador ADP"). A versão standalone aqui é idêntica em funcionalidade.
