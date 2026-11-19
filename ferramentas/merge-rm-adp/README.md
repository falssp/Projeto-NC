# Merge RM→ADP · NC Tools

> 🔗 **[Abrir ferramenta](https://falssp.github.io/Projeto-NC/ferramentas/merge-rm-adp/)**

Ferramenta HTML standalone para mesclar dados de um arquivo RM (relatório de mídia) em um arquivo ADP (Ad Placement), preservando toda a formatação original do ADP — estilos, cores, dropdowns e fórmulas intactos.

Funciona 100% offline — nenhum dado sai do browser. Requer arquivos `.xlsx` locais.

---

## Arquivos

```
ferramentas/merge-rm-adp/
├── index.html   ← Ferramenta completa (HTML + CSS + JS em arquivo único)
└── README.md
```

---

## Como usar

1. **Carregar arquivos** — arraste ou clique para carregar o ADP (`UNCC*.xlsx`) e o RM (`RM*.xlsx`)
   - A ferramenta detecta automaticamente qual arquivo é qual pelo nome
   - Se os arquivos estiverem invertidos, um prompt de troca aparece automaticamente
2. **Selecionar abas e faixas** — escolha quais abas do ADP processar e ajuste o intervalo de linhas de cada aba (ou use "Todas" para aplicar o mesmo intervalo a todas)
3. **Executar merge** — clique em **Executar Merge** e aguarde o processamento
4. **Baixar resultados** — dois botões aparecem no resultado:
   - **⬇ Baixar ADP** — arquivo ADP com os dados mesclados (`_MERGED.xlsx`)
   - **⬇ Baixar RM** — arquivo RM com linhas de revisão marcadas (`_ATUALIZADO.xlsx`)

---

## Funcionalidades

| Funcionalidade | Detalhe |
|---|---|
| Detecção automática de arquivos | Identifica ADP (`UNCC*`) e RM (`RM*`) pelo nome; sugere troca se invertidos |
| 6 abas suportadas | Google, Programmatic, Youtube, Meta e Tiktok, Pinterest Snapchat e Twitter, Flashtalking |
| Matching por chave | Cada aba tem colunas-chave específicas para associar linhas RM↔ADP |
| Cópia de campos | Copia campos de veiculação, compra, placement, formato, targeting e outros conforme mapeamento |
| Marcação de revisão | Linhas sem correspondência no RM são destacadas em amarelo (revisão) |
| Novas linhas | Linhas do RM sem par no ADP são adicionadas com fundo verde |
| Linhas canceladas | Linhas do ADP ausentes no RM são marcadas em cinza (canceladas) |
| Preservação de formatação | Usa patch direto no ZIP do `.xlsx` — estilos, bordas, dropdowns e fórmulas intactos |
| Seleção de faixa de linhas | Configura linha de início e fim por aba individualmente |
| Chip "Todas" | Aplica o mesmo intervalo global a todas as abas de uma vez |
| Sem dependências externas | Carrega SheetJS e JSZip via CDN (jsdelivr); sem servidor ou backend |

---

## Planilhas suportadas

| Aba ADP | Aba RM equivalente | Coluna-chave ADP | Coluna-chave RM |
|---|---|---|---|
| Google | Google | C (Ad Name) | C (Ad Name) |
| Programmatic | Programmatic | C (Ad Name) | C (Ad Name) |
| Youtube | YouTube | C (Ad Name) | C (Ad Name) |
| Meta e Tiktok | Meta e Tiktok | C (Ad Name) | C (Ad Name) |
| Pinterest Snapchat e Twitter | Pinterest, Snapchat e X | C (Ad Name) | C (Ad Name) |
| Flashtalking | Flashtalking | C (Ad Name) | C (Ad Name) |

---

## Stack

- **SheetJS** `xlsx.full.min.js` v0.18.5 — leitura de `.xlsx`
- **JSZip** v3.10.1 — patch direto no ZIP do `.xlsx` para preservar formatação
- HTML + CSS + JS vanilla (sem frameworks)

---

## Também disponível no F4

Esta ferramenta existe de forma integrada no **F4 Acessórios** (módulo "Merge RM→ADP"). A versão standalone aqui é idêntica em funcionalidade.
