# Extractor de Fórmulas · Planilhas

> 🔗 **[Abrir ferramenta](https://falssp.github.io/Projeto-NC/ferramentas/extractor-formulas/)**

Ferramenta HTML standalone para extrair e deduplicar fórmulas de planilhas Excel.  
Carregue um `.xlsx` ou `.xlsm`, selecione as abas desejadas e exporte o resultado — tudo processado localmente no browser, sem envio de dados.

---

## Arquivos

```
ferramentas/extractor-formulas/
├── index.html   ← Ferramenta completa (HTML + CSS + JS em arquivo único)
└── README.md
```

---

## Como usar

1. Acesse a ferramenta pelo link acima
2. Arraste o arquivo `.xlsx` / `.xlsm` para a área de drop (ou clique para selecionar)
3. Selecione as abas desejadas pelos chips (filtrável por "Só com fórmulas")
4. Ajuste as opções de extração:
   - **Deduplicar fórmulas repetidas por linha** — agrupa fórmulas "arrastadas" que mudam só o número da linha
   - **Truncar fórmulas longas (>200 chars) na tela** — corta a exibição sem afetar o export
5. Clique em **Extrair**
6. Use **📋 Copiar** em qualquer linha para copiar a fórmula direto para o clipboard
7. Use **Exportar** para baixar os resultados em HTML navegável ou JSON estruturado

---

## Funcionalidades

| Funcionalidade | Detalhe |
|---|---|
| Formatos suportados | `.xlsx`, `.xlsm`, `.xls` |
| Deduplicação | Fórmulas idênticas em colunas da mesma linha são agrupadas por padrão |
| Busca | Campo de busca filtra por aba, coluna ou conteúdo da fórmula |
| Exportar HTML | Arquivo navegável com busca embutida, fórmulas completas |
| Exportar JSON | Estrutura por aba e coluna, pronta para integração |
| Copiar fórmula | Botão por linha, com feedback visual de confirmação |
| 100% local | Nenhum dado sai do browser — SheetJS processa tudo client-side |

---

## Privacidade

Todo o processamento ocorre inteiramente no navegador via [SheetJS](https://sheetjs.com/).  
O arquivo carregado **não é enviado a nenhum servidor**.

---

## Stack

- HTML + CSS + JS vanilla (arquivo único, sem build)
- [SheetJS `xlsx.full.min.js`](https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js) via CDN (cdnjs)
- [DM Sans + DM Mono](https://fonts.google.com/) via Google Fonts
- GitHub Pages (hospedagem)
