/**
 * EXTRAÇÃO DE ISSUES DO JIRA -> formato do rollup
 * Gera [{ key, parentKey, unidades }] para calcularUnidadesComRollup()
 * (ver ROLLUP_UNIDADES_PAI_FILHO.gs).
 *
 * ATENÇÃO: as chamadas ao Jira e a escrita na planilha NÃO foram testadas em ambiente
 * real (só a montagem das linhas foi testada, em Node). Antes de usar, ajustar:
 *  - DOMINIO, JQL e CAMPO_UNIDADES (ID do campo customizado "unidades")
 *  - conferir o endpoint de busca na documentação atual da API do Jira Cloud
 *
 * Este arquivo depende de ROLLUP_UNIDADES_PAI_FILHO.gs no MESMO projeto do Apps Script.
 * Passo a passo completo: passo-a-passo-jira-sheets.md
 *
 * REGRA IMPORTANTE: o JQL precisa trazer a hierarquia INTEIRA (pais e filhos).
 * Se o pai ficar de fora, o filho vira "órfão" e é tratado como valor próprio.
 * Filtre no Looker, não na carga.
 *
 * Credenciais: nunca no código. Usar PropertiesService (JIRA_EMAIL / JIRA_TOKEN),
 * da mesma forma que o armazenamento por usuário do dashboard.
 */
var JIRA_CFG = {
  DOMINIO: 'SEU-DOMINIO.atlassian.net',
  JQL: 'project = UL ORDER BY key ASC',
  CAMPO_UNIDADES: 'customfield_XXXXX'
};

function jiraAuth_() {
  var p = PropertiesService.getUserProperties();
  var email = p.getProperty('JIRA_EMAIL');
  var token = p.getProperty('JIRA_TOKEN');
  if (!email || !token) throw new Error('Defina JIRA_EMAIL e JIRA_TOKEN nas propriedades do usuário.');
  return 'Basic ' + Utilities.base64Encode(email + ':' + token);
}

function buscarIssuesJira() {
  var auth = jiraAuth_();
  var campos = ['parent', JIRA_CFG.CAMPO_UNIDADES].join(',');
  var saida = [];
  var proxima = null;

  do {
    var url = 'https://' + JIRA_CFG.DOMINIO + '/rest/api/3/search/jql'
      + '?jql=' + encodeURIComponent(JIRA_CFG.JQL)
      + '&fields=' + encodeURIComponent(campos)
      + '&maxResults=100'
      + (proxima ? '&nextPageToken=' + encodeURIComponent(proxima) : '');

    var resp = UrlFetchApp.fetch(url, {
      headers: { Authorization: auth, Accept: 'application/json' },
      muteHttpExceptions: true
    });
    if (resp.getResponseCode() !== 200) {
      throw new Error('Jira HTTP ' + resp.getResponseCode() + ': ' + resp.getContentText().slice(0, 300));
    }

    var data = JSON.parse(resp.getContentText());
    (data.issues || []).forEach(function (i) {
      var u = i.fields[JIRA_CFG.CAMPO_UNIDADES];
      var n = (u === null || u === undefined || u === '') ? null : Number(u);
      if (n !== null && isNaN(n)) {
        Logger.log('Aviso: valor não numérico em ' + i.key + ' (' + JSON.stringify(u) + '); tratado como vazio.');
        n = null;
      }
      saida.push({
        key: i.key,
        parentKey: i.fields.parent ? i.fields.parent.key : null,
        unidades: n
      });
    });
    proxima = data.nextPageToken || null;
  } while (proxima);

  return saida;
}

function exemploJiraParaRollup() {
  var r = calcularUnidadesComRollup(buscarIssuesJira());
  Logger.log('Issues: ' + r.issues.length + ' | Total geral: ' + r.totalGeral);
}

/* ------------------------------------------------------------------
 * FUNÇÕES AUXILIARES E SINCRONIZAÇÃO COM A PLANILHA
 * ------------------------------------------------------------------ */

var ABA_SAIDA = 'Jira_Unidades';

/** Rode UMA vez: pede e-mail e API token e guarda nas propriedades do usuário (não ficam no código). */
function configurarCredenciaisJira() {
  var ui = SpreadsheetApp.getUi();
  var email = ui.prompt('Jira', 'E-mail da conta Atlassian:', ui.ButtonSet.OK_CANCEL);
  if (email.getSelectedButton() !== ui.Button.OK) return;
  var token = ui.prompt('Jira', 'API token (id.atlassian.com > Segurança > Tokens de API):', ui.ButtonSet.OK_CANCEL);
  if (token.getSelectedButton() !== ui.Button.OK) return;
  PropertiesService.getUserProperties().setProperties({
    JIRA_EMAIL: email.getResponseText().trim(),
    JIRA_TOKEN: token.getResponseText().trim()
  });
  ui.alert('Credenciais salvas para o seu usuário.');
}

/** Teste 1: confirma domínio + credenciais. Deve logar o seu nome no Jira. */
function testarConexaoJira() {
  var resp = UrlFetchApp.fetch('https://' + JIRA_CFG.DOMINIO + '/rest/api/3/myself', {
    headers: { Authorization: jiraAuth_(), Accept: 'application/json' },
    muteHttpExceptions: true
  });
  if (resp.getResponseCode() !== 200) {
    throw new Error('Jira HTTP ' + resp.getResponseCode() + ': ' + resp.getContentText().slice(0, 300));
  }
  Logger.log('Conectado como: ' + JSON.parse(resp.getContentText()).displayName);
}

/** Teste 2: lista campos cujo nome contém "unidade" (ou o texto em `filtro`) para você copiar o ID. */
function listarCamposJira(filtro) {
  var termo = String(filtro || 'unidade').toLowerCase();
  var resp = UrlFetchApp.fetch('https://' + JIRA_CFG.DOMINIO + '/rest/api/3/field', {
    headers: { Authorization: jiraAuth_(), Accept: 'application/json' },
    muteHttpExceptions: true
  });
  if (resp.getResponseCode() !== 200) {
    throw new Error('Jira HTTP ' + resp.getResponseCode() + ': ' + resp.getContentText().slice(0, 300));
  }
  var achados = JSON.parse(resp.getContentText()).filter(function (f) {
    return String(f.name).toLowerCase().indexOf(termo) !== -1;
  });
  if (!achados.length) Logger.log('Nenhum campo com "' + termo + '" no nome.');
  achados.forEach(function (f) { Logger.log(f.id + '  |  ' + f.name + (f.custom ? '  (custom)' : '')); });
}

/**
 * Monta a matriz [cabeçalho + linhas] que vai para a planilha.
 * Função pura (sem SpreadsheetApp), por isso é testável em Node.
 * Colunas: issue_key | parent_key | unidades | unidades_exibicao | unidades_total
 * unidades e unidades_total ficam vazias quando a issue não tem valor próprio.
 */
function montarLinhasPlanilha_(issues) {
  var r = calcularUnidadesComRollup(issues);
  var linhas = [['issue_key', 'parent_key', 'unidades', 'unidades_exibicao', 'unidades_total']];
  r.issues.forEach(function (i) {
    var proprio = (i.unidades !== null && i.unidades !== undefined && i.unidades !== '') ? Number(i.unidades) : '';
    linhas.push([i.key, i.parentKey || '', proprio, i.unidadesExibicao, proprio]);
  });
  return { linhas: linhas, totalGeral: r.totalGeral };
}

/** Função principal: busca no Jira, calcula o rollup e grava na aba "Jira_Unidades" (substitui o conteúdo). */
function sincronizarUnidadesParaPlanilha() {
  var res = montarLinhasPlanilha_(buscarIssuesJira());
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var aba = ss.getSheetByName(ABA_SAIDA) || ss.insertSheet(ABA_SAIDA);
  aba.clearContents();
  aba.getRange(1, 1, res.linhas.length, res.linhas[0].length).setValues(res.linhas);
  aba.setFrozenRows(1);
  Logger.log('Issues gravadas: ' + (res.linhas.length - 1) + ' | Total geral (unidades_total): ' + res.totalGeral);
}
