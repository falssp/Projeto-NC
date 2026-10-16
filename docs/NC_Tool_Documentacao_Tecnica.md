# 🔧 Documentação Técnica — NC Tool | Unilever BR x Grasp  
> Versão 2.0 · Referência para desenvolvimento e manutenção · F1 + F2 + F3 + F4  

---  

## Stack e Arquitetura  

| Camada | Tecnologia |  
|--------|-----------|  
| Backend | Google Apps Script (GAS) — V8 runtime |  
| Frontend | HTML + CSS + JS (sidebar / modal / web app) |  
| Dados | Google Sheets (Spreadsheets) |  
| Dicionário | Google Sheets externo compartilhado |  
| Trigger | GAS Installable Triggers (onEdit, time-based) |  
| Cache | PropertiesService (F3 MergeDict) |  

### Princípios arquiteturais  

- **Separação principal/backup:** o projeto principal tem zero referência ao backup.  
- **Sem `getActive()` em triggers:** triggers time-based usam sempre `SpreadsheetApp.openById(ID)`.  
- **Triggers instaláveis obrigatórios para hide/show de abas.**  
- **`onOpen` leve:** não roda funções pesadas para evitar timeout.  
- **Funções em ordem alfabética** dentro de cada bloco de seção.  
- **Menu:** itens em ordem alfabética.  
- **Freeze:** somente linha 1, sem freeze de colunas.  
