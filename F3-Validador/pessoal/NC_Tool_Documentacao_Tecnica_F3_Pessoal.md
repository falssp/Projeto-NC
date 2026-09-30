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
| `NotificacaoDicionario.gs` | Alerta diário por e-mail se dicionário estiver desatualizado |  
| `Setup.gs` | Criação e padronização de todas as abas (incl. Usuarios) |  

### IDs hardcoded — Pessoal  

| Variável | ID |  
|---|---|  
| `LOG_SHEET_ID` / `NC_SHEET_ID` | `1Dthsg7TWuYfQi-QU1yCkRJEhFdXKQ3I1wNO5Y90CCEQ` |  
| `DICT_ID` / `DICT_ID_MERGE` / `SETUP_DICT_ID` | `17vc4UfMz-o2Oz0unAnJlErhHd_2n34tvlFxFnPgTIok` |  
| `RM_ID` | `144h_vGX9vBnxf1vENnsoseGGqt0pqxITuGuh72XbS-w` |  

> Todos os IDs de dicionário apontam para o **Dicionário Merged** (fonte única). O ID antigo `1EpIBzL99_...` foi descontinuado.  

### E-mails configurados — Pessoal  

| Variável | Valor |  
|---|---|  
| `EXC_EMAIL_DESTINO` | `falssp@gmail.com` |  
| `ND_EMAIL_DESTINO` | `falssp@gmail.com` |  
| Usuário padrão Jira | `falssp@gmail.com` |  

### Triggers  

| Função | Agendamento | Arquivo |  
|---|---|---|  
| `mergeDict` | Todo domingo às 3h | `MergeDict.gs` — instalar com `instalarTriggerMerge()` |  
| `verificarDicionarioDesatualizado` | Diário às 9h | `NotificacaoDicionario.gs` — instalar com `instalarTriggerNotificacaoDicionario()` |  

> ⚠️ Triggers de tempo **não podem chamar funções que usam `getUi()`**. O trigger aponta diretamente para `mergeDict()` (worker limpo), não para `menuMergeDict()`.  

### Aba Usuarios  

Criada automaticamente por `setupPlanilha()` → `_criarUsuarios()`. Colunas: ID, Nome, Sobrenome, Email, Perfil, Notas. Usuário padrão: `falssp@gmail.com` / Perfil `Dev`.  
