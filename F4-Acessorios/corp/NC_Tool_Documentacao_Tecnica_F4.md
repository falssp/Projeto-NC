# 🔧 Documentação Técnica — F4 Acessórios | NC Tool  
> Versão 2.0 · Referência para desenvolvimento e manutenção  

---  

## Visão Geral  

| Item | Valor |  
|---|---|  
| Planilha Corp | `1K3wO3b8BOOQldtHv7pBtOubmhoidoZBI0Y8yk4_UnmI` |  
| Planilha Pessoal | `16OdPmc-SeqXn1VefT0xRsIQJ-LdICRfUZnahsARuw4w` |  
| Tipo | GAS Web App (doGet + doPost) + HTML client-side |  

## IDs hardcoded em Code.gs  

```js
var MINHA_SHEET_ID = '...'; // IDs da Unilever sem Ad Server
var CHEFE_SHEET_ID = '...'; // IDs da Unilever
var CL_SHEET_ID    = '...'; // Inclusão Campaign Local
var DIC_SHEET_ID   = '...'; // Dicionário_InfluencerName
```

> ℹ️ No backup, apenas esses 4 IDs são trocados.  

## Módulos  

| Módulo | ID página |  
|---|---|  
| Ad Name Sync | `ans` |  
| Campaign Local | `cl` |  
| Comparador | `comparador` |  
| Contador ADP | `contador` |  
| Dicionário de Influs | `dic` |  
| Extrator de Fórmulas | `formulas` |  
| Extrator de Influencer | `extrator` |  
| Gerador de IDs | `gerador` |  
| Influencer Name Tool | `influ` |  
| Mapeador RM→ADP | `mapeador` |  
| Merge RM→ADP | `merge` |  
