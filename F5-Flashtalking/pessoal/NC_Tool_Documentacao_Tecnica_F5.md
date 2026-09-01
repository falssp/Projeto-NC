# 🔧 Documentação Técnica — F5 FT Flashtalking Validator | NC Tool  
> Versão 1.0 · Referência para desenvolvimento e manutenção  

---  

## Visão Geral  

| Item | Valor |  
|---|---|  
| Planilha Corp | `1Y7_1NL7Uo9HgHn7bTIqnnVZhJCogCbXI3tgasxOTN_0` |  
| Planilha Pessoal | `1YZ3tFDlt3yP5xtNVpSMhyS-cxG3QHBlN5nr_z-yJi2s` |  
| Tipo | GAS Web App + HTML (modeless dialog) |  
| URL Corp | https://script.google.com/macros/s/AKfycbwKsOut5TyYLf1pW_xm1He-zBvzZGYFM4KAEE5C6hssNZHsg9fL_QBXWjfF-zzIDxfXNQ/exec |  
| URL Pessoal | https://script.google.com/macros/s/AKfycbym0772425DQEUrNQn9TZc6C-wdRuqU1_erQVSoWzV-MEBbyCN4DOfJkaSd90cdVZHjSA/exec |  

> ⚠️ NUNCA usar sidebar — apenas modeless dialog.  

## Arquivos HTML  

| Arquivo | Tipo |  
|---|---|  
| `index.html` | ON — sem DOCTYPE (servido via doGet) |  
| `F5_Flashtalking.html` | OFF — com DOCTYPE (standalone) |  

## Regras inegociáveis  

- Nunca usar sidebar — apenas modeless dialog  
- Backup não referencia o original e vice-versa  
- Nunca usar `getActiveSpreadsheet()` em Web App — sempre `openById(SHEET_ID)`  
