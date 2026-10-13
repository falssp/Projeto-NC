# Dashboard Campaign Local (CN Code)

Dashboard para visualizar e monitorar os dados da planilha **[UL] Inclusão Campaign Local**.

## Funcionalidades

- **KPIs**: total de entradas, CN Codes OK, entradas com "Verificar Campanha", possíveis duplicatas
- **Avisos em destaque**: lista de campaigns sem CN Code mapeado + grupos de entradas duplicadas
- **Filtros**: Brand Name, Agência, Responsável, Ano, status do CN Code, busca livre
- **Tabela completa** com todas as colunas da planilha

## Como configurar

### 1. Adicionar o Web App à planilha

1. Abra a planilha **[UL] Inclusão Campaign Local**
2. Acesse **Extensões → Apps Script**
3. Crie um novo arquivo chamado `WEBAPP_CN` e cole o conteúdo de `WEBAPP_CN.gs`
4. **Publicar → Implantar como Web App**
   - Executar como: **Minha conta**
   - Quem tem acesso: **Qualquer pessoa com o link** (ou "Qualquer pessoa")
5. Copie a URL gerada (ex.: `https://script.google.com/macros/s/ABC123.../exec`)

### 2. Colar a URL no dashboard

Abra `index.html` e substitua na linha:
```js
var WEBAPP_URL = 'COLE_AQUI_A_URL_DO_WEB_APP';
```
pela URL copiada no passo anterior.

### 3. Fazer commit e push

O dashboard estará disponível em:
`https://falssp.github.io/Projeto-NC/ferramentas/dashboard-cn/`

## Lógica de duplicatas

Uma entrada é considerada possível duplicata quando outra linha tem **exatamente os mesmos valores** em todos os campos, **exceto**:
- CN Code (coluna H) — preenchido automaticamente
- Campaign Name (coluna G) — identificador interno
- EXTRA (coluna D) — campo complementar

A comparação usa: Data de Inclusão, Novo Campaign Local, DE/PARA Campaign Local, DE/PARA EXTRA, Brand Name, Responsável, Agência e Obs.
