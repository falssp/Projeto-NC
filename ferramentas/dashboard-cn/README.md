# Dashboard Campaign Local (CN Code)

Dashboard para visualizar e monitorar os dados da planilha **[UL] Inclusão Campaign Local**.

## Funcionalidades

- **KPIs**: total de entradas, CN Codes OK, entradas com "Verificar Campanha", possíveis duplicatas
- **Avisos em destaque**: lista de campaigns com "Verificar Campanha" + grupos de entradas duplicadas
- **Filtros**: Brand Name, Agência, Responsável, Ano, Novo Campaign, status do CN Code, duplicatas, busca livre
- **Tabela completa** com todas as colunas da planilha

## Como configurar (sem criar nada extra)

### 1. Compartilhar a planilha

A planilha **[UL] Inclusão Campaign Local** precisa estar compartilhada como **"qualquer pessoa com o link pode visualizar"** (ou acesso mais amplo).

### 2. Pegar o ID da planilha

Abra a planilha no Google Sheets. O ID está na URL:

```
https://docs.google.com/spreadsheets/d/ESTE_TRECHO_É_O_ID/edit
```

### 3. Colar o ID no dashboard

Abra `index.html` e substitua na linha:

```js
var SHEET_ID = 'COLE_AQUI_O_ID_DA_PLANILHA';
```

pelo ID copiado acima.

### 4. Fazer commit e push

O dashboard estará disponível em:
`https://falssp.github.io/Projeto-NC/ferramentas/dashboard-cn/`

## Como funciona (sem Web App)

O dashboard usa o endpoint **Google Visualization API (gviz)** embutido em toda planilha do Google Sheets — sem precisar de API key, OAuth ou Apps Script. Ele lê as abas de ano (2026, 2027…) diretamente via JSONP.

## Lógica de duplicatas

Uma entrada é considerada possível duplicata quando outra linha tem **exatamente os mesmos valores** em todos os campos, **exceto**:

- CN Code (coluna H) — preenchido automaticamente
- Campaign Name (coluna G) — identificador interno
- EXTRA (coluna D) — campo complementar

A comparação usa: Data de Inclusão, Novo Campaign Local, DE/PARA Campaign Local, DE/PARA EXTRA, Brand Name, Responsável, Agência e Obs.
