/**
 * EXTRAÇÃO DE ISSUES DO JIRA -> formato do rollup
 * Gera [{ key, parentKey, unidades }] para calcularUnidadesComRollup()
 * (ver ROLLUP_UNIDADES_PAI_FILHO.gs).
 *
 * ATENÇÃO: NÃO foi testado contra o Jira real. Antes de usar, ajustar:
 *  - DOMINIO, JQL e CAMPO_UNIDADES (ID do campo customizado "unidades")
 *  - conferir o endpoint de busca na documentação atual da API do Jira Cloud
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
      saida.push({
        key: i.key,
        parentKey: i.fields.parent ? i.fields.parent.key : null,
        unidades: (u === null || u === undefined || u === '') ? null : Number(u)
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
