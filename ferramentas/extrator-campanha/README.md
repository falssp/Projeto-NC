# Extrator de Campaign Local · NC Tools

> 🔗 **[Abrir ferramenta](https://falssp.github.io/Projeto-NC/ferramentas/extrator-campanha/)**

Ferramenta HTML standalone para extrair dados de Campaign Local de arquivos ADP da Unilever e gravá-los na planilha via GAS.

Requer conexão com o Google Apps Script (GAS) principal. O parsing do ADP é 100% local via SheetJS — apenas os dados extraídos são enviados ao GAS para gravação.

---

## Arquivos

```
ferramentas/extrator-campanha/
├── index.html   ← Ferramenta completa (HTML + CSS + JS em arquivo único)
└── README.md
```

---

## Configuração

Edite as constantes no topo do bloco `<script>` em `index.html`:

```javascript
var F4_PROXY = 'https://script.google.com/macros/s/...';  // URL do GAS principal
var NC_TOKEN  = 'seu-token-aqui';                          // Token de acesso
```

Os valores padrão apontam para o ambiente **corp**. Para outros ambientes, substitua pelos valores correspondentes.

---

## Como usar

1. **Entrada** — carregue um ou mais arquivos ADP via drag-and-drop, ou use a entrada manual com seleção de plataforma e agência
2. **Resultado** — revise os dados extraídos (Aba, Data, Campaign Local, Extra, Brand, Campaign Name, Responsável, Agência)
3. **Duplicatas** — a ferramenta verifica automaticamente quais entradas já existem na planilha
4. **Salvar** — selecione a aba (ano) e confirme a gravação
5. **Concluído** — resumo de linhas inseridas vs. já existentes

---

## Funcionalidades

| Funcionalidade | Detalhe |
|---|---|
| Upload ADP | Drag-and-drop de múltiplos arquivos ADP simultaneamente |
| Entrada manual | Formulário com placeholders dinâmicos por plataforma |
| Detecção automática de abas | Reconhece Google, Programmatic, Youtube, Meta e Tiktok, Pinterest Snapchat e Twitter, Flashtalking |
| Detecção de agência | Extrai agência do nome do arquivo (`_INI_` → Initiative · `_CAD_` → Cadastra) |
| Deduplicação local | Evita linhas duplicadas dentro do mesmo arquivo (chave: aba + Campaign Local + Extra) |
| Verificação de duplicatas | Consulta o GAS antes de salvar para identificar entradas já existentes |
| Seleção de aba | Lista as abas disponíveis na planilha; pré-seleciona o ano corrente |
| Copiar resultado | Copia todas as linhas em formato TSV pronto para colar em Sheets |
| Parsing 100% local | Leitura do ADP via SheetJS — nenhum arquivo sai do browser |

---

## Mapeamento de colunas por aba

| Aba | B — Campaign Local | D — Extra | F — Brand | G — Campaign Name | Placement ID |
|---|---|---|---|---|---|
| Google | AG | AH | F | H | BG |
| Programmatic | AF | AG | G | I | BJ |
| Youtube | AE | AF | G | I | BH |
| Meta e Tiktok | AJ | AK | F | H | BI |
| Pinterest, Snapchat e Twitter | AG | AH | F | H | BE |
| Flashtalking | Z | AA | G | I | BB |

---

## Formato da linha gravada

Cada linha é gravada com os seguintes campos na planilha:

```
[Aba, Data (DD/MM), Campaign Local, "", Extra, "", Brand, Campaign Name, "", "Felipe", Agência]
```

---

## Stack

- **SheetJS** `xlsx.full.min.js` v0.18.5 — leitura de `.xlsx` (via CDN cdnjs)
- **GAS Web App** — actions `checkDuplicatas`, `getCLSheets`, `saveCampaignLocal`
- HTML + CSS + JS vanilla (sem frameworks)

---

## Também disponível no F4

Esta ferramenta existe de forma integrada no **F4 Acessórios** (módulo "Campaign Local"). A versão standalone aqui é idêntica em funcionalidade.
