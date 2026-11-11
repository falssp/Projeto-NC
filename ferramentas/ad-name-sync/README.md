# Ad Name Sync · NC Tools

> 🔗 **[Abrir ferramenta](https://falssp.github.io/Projeto-NC/ferramentas/ad-name-sync/)**

Ferramenta HTML standalone para comparar Ad Names entre um arquivo Excel ADP e a planilha de IDs da Unilever (Google Sheets), atualizando apenas as linhas já existentes na planilha.

Requer conexão com o Google Apps Script (GAS) Ad Name Sync. Nenhum dado do Excel sai do browser — apenas os deltas (IDs e novos Ad Names) são enviados ao GAS para escrita no Sheets.

---

## Arquivos

```
ferramentas/ad-name-sync/
├── index.html   ← Ferramenta completa (HTML + CSS + JS em arquivo único)
└── README.md
```

---

## Configuração

Edite a constante no topo do bloco `<script>` em `index.html`:

```javascript
var ANS_PROXY = 'https://script.google.com/macros/s/...';  // URL do GAS Ad Name Sync
```

O valor padrão aponta para o ambiente **corp**. Para outros ambientes, substitua pela URL correspondente.

---

## Como usar

1. **Entrada** — carregue um ou mais arquivos ADP via drag-and-drop ou clique, ou cole manualmente os pares `ID | Ad Name` por plataforma
2. **Google Sheets** — selecione a aba da planilha de IDs que deseja comparar (a ferramenta lista as abas disponíveis automaticamente)
3. **Resultado** — veja as divergências encontradas, filtre por plataforma ou busque por ID/Ad Name, e clique em **Atualizar Sheets** para aplicar as correções

---

## Funcionalidades

| Funcionalidade | Detalhe |
|---|---|
| Upload Excel | Drag-and-drop de múltiplos arquivos ADP simultaneamente |
| Cola manual | Entrada direta de pares `ID \| Ad Name` por plataforma |
| Detecção automática de abas | Reconhece Google, YouTube, Meta e Tiktok, Programmatic, Pinterest Snapchat e Twitter, Flashtalking |
| Detecção de colunas | Busca "Placement ID" e "Ad Name" no header da linha 14; fallback para mapeamento fixo por aba |
| Filtro por plataforma | Tabs de filtragem no resultado para navegar por plataforma |
| Busca | Filtragem em tempo real por Placement ID ou Ad Name |
| Dois status de divergência | `desatualizado` (Ad Name diferente) · `vazio` (coluna D sem valor) |
| Exportação | CSV completo · Copiar para Sheets (formato linha \| ID \| Ad Name, pronto para colar) |
| Confirmação antes de gravar | Modal de confirmação com contagem de linhas antes de atualizar |
| Progress bar | Acompanhamento visual durante a atualização no Sheets |
| Sem dependências de leitura | Parsing do Excel 100% local via SheetJS |

---

## Mapeamento de colunas por aba

| Aba ADP | Coluna Placement ID | Coluna Ad Name |
|---|---|---|
| Google | BG | BF |
| Programmatic | BJ | BI |
| YouTube | BH | BG |
| Meta e Tiktok | BI | BH |
| Pinterest, Snapchat e Twitter | BE | BD |
| Flashtalking | BB | AY |

---

## Stack

- **SheetJS** `xlsx.full.min.js` v0.18.5 — leitura de `.xlsx` (via CDN cdnjs)
- **GAS Web App** — `doGet`/`doPost` no Google Apps Script (Ad Name Sync Proxy)
- HTML + CSS + JS vanilla (sem frameworks)

---

## Também disponível no F4

Esta ferramenta existe de forma integrada no **F4 Acessórios** (módulo "Ad Name Sync"). A versão standalone aqui é idêntica em funcionalidade.
