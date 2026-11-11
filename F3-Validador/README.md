# NC Tool · F3 — Validator

> **Projeto:** NC Tool | Unilever BR × Grasp  
> **Módulo:** F3 — Validador de Naming Convention  
> **Stack:** Google Apps Script (API) + GitHub Pages (Frontend)  
> **Ambientes:** Corp (Original) · Pessoal (Backup)

---

## URLs

| Ambiente | GitHub Pages | GAS (API) |
|---|---|---|
| Corp | `https://falssp.github.io/nc-tool/f3-corp/` | `https://script.google.com/macros/s/AKfycbzKKuKhr111DFtk5jAhx3ofQzZL78sQvliDKtxDj_FlBZmbPaLuufd6-oHxq7Tsr9sp_w/exec` |
| Pessoal | `https://falssp.github.io/nc-tool/f3-pessoal/` | `https://script.google.com/macros/s/AKfycby6uFxVBlvGx2bC93m1NK9ixTG8Oa61CA2qeKCEc8FR9JnGJCv5m1AlOgoq4kmzbpS3/exec` |

---

## Arquitetura

```
GitHub Pages (Frontend)
  └── fetch() → GAS Web App (API)
                  └── Google Sheets (Dados)
```

O frontend roda 100% no browser. O GAS funciona como API REST, respondendo JSON via `doGet(?action=xxx)` e `doPost({action, ...})`.

---

## Estrutura de Arquivos

```
F3-Validador/
├── corp/
│   ├── Code.gs               ← Menu, API doGet/doPost, salvarLog, getHistorico
│   ├── Excecoes.gs           ← CRUD de exceções + e-mail
│   ├── Jira.gs               ← Integração Jira REST API v3
│   ├── MergeDict.gs          ← Merge semanal dicionário → PropertiesService
│   ├── Setup.gs              ← Setup e padronização das abas
│   ├── HealthCheck.gs        ← Verificação completa do ambiente
│   ├── NotificacaoDicionario.gs ← Alerta diário se dicionário desatualizado
│   ├── StatusAmbiente.gs     ← Dados para o painel de status
│   ├── StatusAmbiente.html   ← Painel visual de status (dialog GAS)
│   ├── index.html            ← Frontend ON (com Histórico)
│   └── F3validator.html      ← Frontend OFF (sem backend de log)
└── pessoal/
    └── (mesma estrutura, IDs diferentes)
```

---

## Diferenças Corp × Pessoal

| | Corp | Pessoal |
|---|---|---|
| `LOG_SHEET_ID` | `1fAQfNJ-...AfSo` | `1Dthsg7T-...CCEQ` |
| `SETUP_DICT_ID` | `17vc4UfMz-...TIok` | `1EpIBzL99-...Ebw` |
| `GAS_URL` (frontend) | `AKfycbzKKuKhr111...` | `AKfycby6uFxVBlvG...` |
| `Code.gs` contexto Web App | `openById(LOG_SHEET_ID)` | `getActiveSpreadsheet()` |
| `MergeDict.gs` | — | `ABAS_IGNORADAS = ['MONITORAMENTO']` |

---

## API — Actions disponíveis

### GET `?action=xxx`

| Action | Parâmetros | Retorno |
|---|---|---|
| `ping` | — | `{ok, ts}` |
| `getDicionario` | `tipo` (CampaignLocal, Market...) | `{ok, vals[]}` |
| `getExcecoes` | — | `{ok, lista[]}` |
| `getPerfilUsuario` | — | `{ok, perfil}` |
| `getHistorico` | `limite` (default 30) | `{ok, rows[]}` |
| `jiraGetStatus` | — | `{configurado, email}` |
| `jiraGetTicket` | `input` (key ou URL) | `{ok, key, titulo, status, ...}` |
| `getLogPorHash` | `hash` | `{ok, rows[]}` |
| `getDictStatus` | — | `{ok, status}` |

### POST `{action, ...}`

| Action | Body | Retorno |
|---|---|---|
| `salvarLog` | `{payload}` | `{ok, logId}` |
| `solicitarExcecao` | `{dados}` | `{ok, txKey}` |
| `resolverExcecao` | `{linha, decisao, obs}` | `{ok, status}` |
| `desbloquearExcecao` | `{adName, plataforma}` | `{ok, deletadas}` |

---

## Planilha de Log — Abas

| Aba | Descrição |
|---|---|
| `Dashboard` | Painel com totais, última validação e regra mais frequente |
| `Log` | Registro de cada sessão de validação |
| `Erros` | Detalhamento por string e por regra |
| `Exceções` | Exceções aprovadas (integradas ao validador) |
| `Arquivo` | Logs arquivados automaticamente após 6 meses |
| `Config` | Regras ativas, score mínimo, configurações de histórico |
| `Clientes` | Cadastro de clientes e IDs de dicionário/RM Template |

---

## Menu NC Tool

### NC Tool (todos os perfis)
- `📖 Atualizar Dicionário Agora`

### NC Tool Admin (Admin + Dev)
- `⚙️ Configurar Token Jira`
- `🔍 Testar Conexão Jira`
- `🔑 Remover Token Jira`
- `🔄 Setup Completo`
- `🩺 Health Check`
- `📡 Status do Ambiente`

### NC Tool Admin — Dev apenas
- `👥 Atualizar Cache de Perfis`
- `✨ Inicializar Aba Exceções`
- `🗑️ Limpar Aba Arquivo / Erros / Exceções / Log`
- `🔧 Repadronizar Abas`
- `⏰ Instalar Trigger Arquivamento (Dia 1 do Mês)`
- `⏰ Instalar Trigger Semanal (Domingo 3h)`
- `🔔 Instalar Notificação Dicionário`
- `🔕 Remover Notificação Dicionário`

---

## Fontes de Dados (Frontend)

| Fonte | Descrição |
|---|---|
| ADP Excel | Upload de .xlsx — valida strings por aba |
| Dash / QA Painel | URL de planilha Google Sheets |
| Manual / Colar | Input direto de strings |
| Modo Ticket | Upload antes + depois com detecção de delta |
| Ticket Pai | Consolidado de múltiplos sub-tickets |
| Verificador de Hash | Confirma integridade do print vs log |
| Histórico | Últimas validações salvas (versão ON) |

---

## Regras de Validação

| Código | Descrição | Configurável |
|---|---|---|
| `VAL-CL` | CampaignLocal contra dicionário | ✅ |
| `VAL-MKT` | Market (PCAT) contra dicionário | ✅ |
| `VAL-BUY` | Buy Model contra lista permitida | ✅ |
| `VAL-OBJ` | Objetivo contra lista permitida | ✅ |
| `REL0` | Campaign Name começa com `cnXXXXXX` | ✅ |
| `WARN-PLAT` | Plataforma do string difere da selecionada | ✅ |

---

## Integração Jira

Campos de ticket no Modo Ticket fazem busca automática via API REST:
- Aceita `UL-4614` ou URL completa
- Preenche título, status e assignee automaticamente
- Se sub-ticket tiver pai, preenche campo pai automaticamente

**Setup:** NC Tool Admin → `⚙️ Configurar Token Jira` → email + token  
**Token:** `id.atlassian.com/manage-profile/security/api-tokens`

---

## Triggers Automáticos

| Trigger | Função | Frequência |
|---|---|---|
| Merge do Dicionário | `mergeDict()` | Domingo 3h |
| Arquivamento de Log | `arquivarLogsAntigos()` | Dia 1 do mês, 3h |
| Notificação Dicionário | `verificarDicionarioDesatualizado()` | Diário 9h |

---

## Setup Inicial (ambiente novo)

1. Criar planilha Google Sheets
2. Abrir Apps Script → criar os arquivos `.gs` e `.html`
3. Editar `appsscript.json`:
   ```json
   {
     "timeZone": "America/Sao_Paulo",
     "webapp": {
       "executeAs": "USER_DEPLOYING",
       "access": "ANYONE_ANONYMOUS"
     }
   }
   ```
4. Deploy → App da Web → Qualquer pessoa → Implantar
5. Atualizar `GAS_URL` no `index.html` e `F3validator.html`
6. Push para `nc-tool/f3-corp/` ou `nc-tool/f3-pessoal/`
7. NC Tool Admin → `🔄 Setup Completo`
8. NC Tool Admin → `⚙️ Configurar Token Jira`

---

## Observações Técnicas

- `getActiveSpreadsheet()` **não funciona** em contexto Web App — usar `openById()`
- Corp e Pessoal são **completamente isolados** — nenhum arquivo referencia IDs do outro
- `ANYONE_ANONYMOUS` no `appsscript.json` é obrigatório para CORS funcionar no GitHub Pages
- A aba `Exceções` deve ter nome com acento — `_getExcecoesSheet()` renomeia automaticamente
- Frontend usa `fetch()` com `Content-Type: text/plain` no POST para evitar preflight CORS
