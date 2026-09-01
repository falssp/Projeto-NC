# NC Tool | F3 — Validator  
## Documentação Técnica · Ambiente Pessoal (Backup)  

---  

### Visão geral  

Web App GAS. Interface HTML comunica com backend via `google.script.run`.  

**Planilha Pessoal:** `1Dthsg7TWuYfQi-QU1yCkRJEhFdXKQ3I1wNO5Y90CCEQ`  
**Web App Pessoal:** `AKfycbw7QryYGzik1bbT0Mf4N5JcpuuNVoHAudTAbrT2jfzzXnz0wkuJfBFLIeMNViDO4SE2/exec`  

> ⚠️ Este documento cobre exclusivamente o ambiente Pessoal.  

---  

### Arquivos GAS  

| Arquivo | Responsabilidade |  
|---|---|  
| `Code.gs` | doGet, onOpen, menu, getDicionario, fetchSheet, salvarLog, getHistorico |  
| `Excecoes.gs` | CRUD de exceções, aprovação, listagem, e-mails |  
| `Jira.gs` | Integração REST API v3 Jira |  
| `MergeDict.gs` | Merge semanal RM Template + Dicionário → PropertiesService |  
| `Setup.gs` | Criação e padronização de todas as abas |  

### IDs hardcoded — Pessoal  

| Variável | ID |  
|---|---|  
| `LOG_SHEET_ID` | `1Dthsg7TWuYfQi-QU1yCkRJEhFdXKQ3I1wNO5Y90CCEQ` |  
| `NC_SHEET_ID` | `1vGM_se-b1rechwv91WnSw-SW2XQFJ4DN4FPWqrEMkq8` |  
| `DICT_ID` | `1EpIBzL99_Dh03MySNE-hHiToeN4HiN5yeHSf6XLEEBw` |  
| `RM_ID` | `144h_vGX9vBnxf1vENnsoseGGqt0pqxITuGuh72XbS-w` |  
