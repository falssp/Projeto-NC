// ============================================================
// NC Tool | F3 — Validator  ·  Jira.gs
// Integração com Jira (Atlassian Cloud) via API REST v3
// ============================================================
//
// SETUP (fazer uma vez):
//   1. Acesse id.atlassian.com/manage-profile/security/api-tokens
//   2. Crie um token clássico com nome F3_Validator_NC_Tool
//   3. No menu NC Tool → Configurar Token Jira → cole o token e o e-mail
//
// O token fica salvo em PropertiesService — nunca exposto no código.
// ============================================================

var JIRA_BASE = 'https://storm-x.atlassian.net';

var PROP_JIRA_TOKEN = 'JIRA_API_TOKEN';
var PROP_JIRA_EMAIL = 'JIRA_EMAIL';

// ── Menu: configurar credenciais ─────────────────────────────
function configurarTokenJira() {
  var ui    = SpreadsheetApp.getUi();
  var props = PropertiesService.getScriptProperties();

  var emailAtual = props.getProperty(PROP_JIRA_EMAIL) || 'felipe.lima@stormx.com.br';
  var respEmail  = ui.prompt(
    'Configurar Jira — Passo 1/2',
    'E-mail da conta Atlassian (Jira):\n\n' +
    'Deve ser o mesmo e-mail usado em\nhttps://storm-x.atlassian.net',
    ui.ButtonSet.OK_CANCEL
  );
  if (respEmail.getSelectedButton() !== ui.Button.OK) return;
  var email = respEmail.getResponseText().trim();
  if (!email) { ui.alert('E-mail não pode ser vazio.'); return; }

  var respToken = ui.prompt(
    'Configurar Jira — Passo 2/2',
    'Cole o API Token do Jira:\n\n' +
    'Para gerar:\n' +
    '1. Acesse: id.atlassian.com/manage-profile/security/api-tokens\n' +
    '2. Clique em "Criar um token de API"\n' +
    '3. Nome sugerido: F3_Validator_NC_Tool\n' +
    '4. Copie o token gerado (aparece só uma vez)',
    ui.ButtonSet.OK_CANCEL
  );
  if (respToken.getSelectedButton() !== ui.Button.OK) return;
  var token = respToken.getResponseText().trim();
  if (!token) { ui.alert('Token não pode ser vazio.'); return; }

  props.setProperty(PROP_JIRA_EMAIL, email);
  props.setProperty(PROP_JIRA_TOKEN, token);

  // Testa a conexão imediatamente
  var teste = _jiraTestarConexao(email, token);
  if (teste.ok) {
    ui.alert(
      '✅ Jira configurado com sucesso!\n\n' +
      'Conectado como: ' + teste.displayName + '\n' +
      'Conta: ' + email
    );
  } else {
    ui.alert(
      '⚠️ Token salvo, mas a conexão falhou:\n\n' +
      teste.erro + '\n\n' +
      'Verifique o e-mail e o token e tente novamente.'
    );
  }
}

function _jiraTestarConexao(email, token) {
  try {
    var resp = UrlFetchApp.fetch(JIRA_BASE + '/rest/api/3/myself', {
      headers: _jiraHeaders(email, token),
      muteHttpExceptions: true
    });
    if (resp.getResponseCode() !== 200) {
      return { ok: false, erro: 'HTTP ' + resp.getResponseCode() + ': ' + resp.getContentText().slice(0, 200) };
    }
    var data = JSON.parse(resp.getContentText());
    return { ok: true, displayName: data.displayName };
  } catch(e) {
    return { ok: false, erro: e.message };
  }
}

// ── Testar conexão via menu ───────────────────────────────────
function testarConexaoJira() {
  var ui    = SpreadsheetApp.getUi();
  var props = PropertiesService.getScriptProperties();
  var token = props.getProperty(PROP_JIRA_TOKEN);
  var email = props.getProperty(PROP_JIRA_EMAIL);

  if (!token || !email) {
    ui.alert('⚠️ Jira não configurado\n\nUse NC Tool Admin → ⚙️ Configurar Token Jira.');
    return;
  }

  var r = _jiraTestarConexao(email, token);
  if (r.ok) {
    ui.alert('✅ Conexão Jira OK\n\nConectado como: ' + r.displayName + '\nConta: ' + email);
  } else {
    ui.alert('❌ Falha na conexão Jira\n\n' + r.erro + '\n\nVerifique o token em NC Tool Admin → ⚙️ Configurar Token Jira.');
  }
}

// ── Remover credenciais ──────────────────────────────────────
function removerTokenJira() {
  var ui = SpreadsheetApp.getUi();
  var resp = ui.alert(
    'Remover credenciais Jira',
    'Isso apagará o token e o e-mail salvos.\nTem certeza?',
    ui.ButtonSet.OK_CANCEL
  );
  if (resp !== ui.Button.OK) return;
  var props = PropertiesService.getScriptProperties();
  props.deleteProperty(PROP_JIRA_TOKEN);
  props.deleteProperty(PROP_JIRA_EMAIL);
  ui.alert('✅ Credenciais removidas.');
}

// ── API pública chamada pelo HTML via google.script.run ──────

// Busca um ticket e retorna dados estruturados
// Aceita: "UL-4614" ou link completo do Jira
function jiraGetTicket(input) {
  try {
    var creds = _jiraGetCreds();
    if (!creds) return { ok: false, erro: 'Token Jira não configurado. Use o menu NC Tool → Configurar Token Jira.' };

    var key = _jiraExtrairKey(input);
    if (!key) return { ok: false, erro: 'Formato inválido. Use: UL-4614 ou o link completo do Jira.' };

    var resp = UrlFetchApp.fetch(
      JIRA_BASE + '/rest/api/3/issue/' + key + '?fields=summary,status,assignee,parent,issuetype,priority,labels,components',
      {
        headers: _jiraHeaders(creds.email, creds.token),
        muteHttpExceptions: true
      }
    );

    var code = resp.getResponseCode();
    if (code === 404) return { ok: false, erro: 'Ticket ' + key + ' não encontrado.' };
    if (code === 403) return { ok: false, erro: 'Sem permissão para acessar ' + key + '. Verifique se o token tem acesso ao projeto.' };
    if (code !== 200) return { ok: false, erro: 'Erro HTTP ' + code + ' ao buscar ' + key + '.' };

    var data = JSON.parse(resp.getContentText());
    var f    = data.fields;

    var resultado = {
      ok:         true,
      key:        data.key,
      titulo:     f.summary       || '',
      status:     f.status        ? f.status.name        : '',
      tipo:       f.issuetype     ? f.issuetype.name     : '',
      prioridade: f.priority      ? f.priority.name      : '',
      assignee:   f.assignee      ? f.assignee.displayName : '',
      pai:        f.parent        ? { key: f.parent.key, titulo: f.parent.fields ? f.parent.fields.summary : '' } : null,
      labels:     f.labels        || [],
      url:        JIRA_BASE + '/browse/' + data.key
    };

    return resultado;

  } catch(e) {
    Logger.log('jiraGetTicket ERRO: ' + e.message);
    return { ok: false, erro: 'Erro inesperado: ' + e.message };
  }
}

// Busca pai automaticamente se vier de um sub-ticket
function jiraGetPai(input) {
  try {
    var ticket = jiraGetTicket(input);
    if (!ticket.ok) return ticket;
    if (!ticket.pai) return { ok: false, erro: 'Ticket ' + ticket.key + ' não tem ticket pai.' };
    return jiraGetTicket(ticket.pai.key);
  } catch(e) {
    return { ok: false, erro: e.message };
  }
}

// ── Helpers internos ─────────────────────────────────────────

function _jiraGetCreds() {
  var props = PropertiesService.getScriptProperties();
  var token = props.getProperty(PROP_JIRA_TOKEN);
  var email = props.getProperty(PROP_JIRA_EMAIL);
  if (!token || !email) return null;
  return { token: token, email: email };
}

function _jiraHeaders(email, token) {
  return {
    'Authorization': 'Basic ' + Utilities.base64Encode(email + ':' + token),
    'Accept':        'application/json',
    'Content-Type':  'application/json'
  };
}

// Extrai a chave do ticket de uma string (key direto ou URL completa)
function _jiraExtrairKey(input) {
  if (!input) return null;
  input = input.trim();

  // Já é uma key: UL-4614, AB-123, etc.
  var mKey = input.match(/^([A-Z][A-Z0-9]+-\d+)$/i);
  if (mKey) return mKey[1].toUpperCase();

  // É uma URL: .../browse/UL-4614 ou .../issues/UL-4614
  var mUrl = input.match(/\/(?:browse|issues)\/([A-Z][A-Z0-9]+-\d+)/i);
  if (mUrl) return mUrl[1].toUpperCase();

  // URL com query param selectedIssue=UL-4614
  var mQuery = input.match(/[?&]selectedIssue=([A-Z][A-Z0-9]+-\d+)/i);
  if (mQuery) return mQuery[1].toUpperCase();

  return null;
}

// ── Status da configuração (chamado pelo HTML no init) ────────
function jiraGetStatus() {
  var props  = PropertiesService.getScriptProperties();
  var token  = props.getProperty(PROP_JIRA_TOKEN);
  var email  = props.getProperty(PROP_JIRA_EMAIL);
  return {
    configurado: !!(token && email),
    email:       email || ''
  };
}