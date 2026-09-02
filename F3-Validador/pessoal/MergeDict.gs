// ============================================================
// NC Tool | F3 — Validator  ·  MergeDict.gs
// Merge semanal: RM Template + Dicionário → PropertiesService
// Roda todo domingo às 3h via trigger instalado por
// instalarTriggerMerge()  |  pode ser forçado via menu:
// NC Tool > Atualizar Dicionário Agora
// ============================================================

var RM_ID         = '144h_vGX9vBnxf1vENnsoseGGqt0pqxITuGuh72XbS-w';
var DICT_ID_MERGE = '1EpIBzL99_Dh03MySNE-hHiToeN4HiN5yeHSf6XLEEBw';

var RM_COL_CAMPAIGN_NAME = 87;
var RM_COL_CAMPAIGN_ID   = 88;

var PROP_CAMPAIGNS  = 'DICT_CAMPAIGNS';
var PROP_LAST_MERGE = 'DICT_LAST_MERGE';

// Abas que não entram na análise (controle interno)
var ABAS_IGNORADAS = ['MONITORAMENTO'];

function mergeDict() {
  try {
    var campaigns = {};
    _lerRMTemplate(campaigns);
    _lerDicionario(campaigns);
    _salvarCampaigns(campaigns);
    var ts = new Date().toISOString();
    PropertiesService.getScriptProperties().setProperty(PROP_LAST_MERGE, ts);
    Logger.log('mergeDict OK: ' + Object.keys(campaigns).length + ' slugs em ' + ts);
    return {ok: true, total: Object.keys(campaigns).length, ts: ts};
  } catch(e) {
    Logger.log('mergeDict ERRO: ' + e.message);
    return {ok: false, erro: e.message};
  }
}

function menuMergeDict() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ui = SpreadsheetApp.getUi();

  ss.toast('Iniciando merge do dicionário...', 'NC Tool', 3);
  SpreadsheetApp.flush();

  try {
    ss.toast('Lendo RM Template e Dicionário (pode demorar ~20s)...', 'NC Tool · Passo 1/3', 15);
    SpreadsheetApp.flush();

    var r = mergeDict();

    if (r.ok) {
      ss.toast('Dicionário atualizado! ' + r.total + ' slugs carregados.', 'NC Tool · Concluído', 6);
      ui.alert('Dicionário atualizado!\n' + r.total + ' slugs de campanha carregados.\n' + r.ts);
    } else {
      ui.alert('Erro ao atualizar:\n' + r.erro);
    }
  } catch(e) {
    ui.alert('Erro inesperado:\n' + e.message);
  }
}

function _lerRMTemplate(campaigns) {
  var ss   = SpreadsheetApp.openById(RM_ID);
  var abas = ss.getSheets();
  abas.forEach(function(aba) {
    // Aba de controle — não entra na análise
    if (ABAS_IGNORADAS.indexOf(aba.getName()) !== -1) return;
    var lastRow = aba.getLastRow();
    var lastCol = aba.getLastColumn();
    if (lastRow < 2 || lastCol < RM_COL_CAMPAIGN_ID) return;
    var hdr     = aba.getRange(1, RM_COL_CAMPAIGN_NAME, 1, 2).getValues()[0];
    var hdrName = String(hdr[0]).toLowerCase();
    if (hdrName.indexOf('campaign') === -1 && hdrName.indexOf('name') === -1) {
      var cols = _acharColunasCampaign(aba);
      if (!cols) return;
      _extrairCampaigns(aba, cols.name, cols.id, lastRow, campaigns);
      return;
    }
    _extrairCampaigns(aba, RM_COL_CAMPAIGN_NAME, RM_COL_CAMPAIGN_ID, lastRow, campaigns);
  });
}

function _lerDicionario(campaigns) {
  var ss   = SpreadsheetApp.openById(DICT_ID_MERGE);
  var abas = ss.getSheets();
  abas.forEach(function(aba) {
    // Aba de controle — não entra na análise
    if (ABAS_IGNORADAS.indexOf(aba.getName()) !== -1) return;
    var lastRow = aba.getLastRow();
    var lastCol = aba.getLastColumn();
    if (lastRow < 2 || lastCol < 2) return;
    var cols = _acharColunasCampaign(aba);
    if (!cols) return;
    _extrairCampaigns(aba, cols.name, cols.id, lastRow, campaigns);
  });
}

function _acharColunasCampaign(aba) {
  var lastCol = aba.getLastColumn();
  if (lastCol < 1) return null;
  for (var row = 1; row <= Math.min(5, aba.getLastRow()); row++) {
    var hdr    = aba.getRange(row, 1, 1, lastCol).getValues()[0];
    var colName = -1, colId = -1;
    for (var c = 0; c < hdr.length; c++) {
      var h = String(hdr[c]).toLowerCase().replace(/[^a-z0-9]/g, '');
      if (h === 'campaignname' || h === 'campaignlocal') colName = c + 1;
      if (h === 'campaignid')                            colId   = c + 1;
    }
    if (colName > 0 && colId > 0) return {name: colName, id: colId, headerRow: row};
  }
  return null;
}

function _extrairCampaigns(aba, colName, colId, lastRow, campaigns) {
  if (lastRow < 2) return;
  var batchSize = 200;
  for (var startRow = 2; startRow <= lastRow; startRow += batchSize) {
    var endRow = Math.min(startRow + batchSize - 1, lastRow);
    var nRows  = endRow - startRow + 1;
    var maxCol = Math.max(colName, colId);
    var data   = aba.getRange(startRow, 1, nRows, maxCol).getValues();
    data.forEach(function(row) {
      var rawName = String(row[colName - 1] || '').trim();
      var rawId   = String(row[colId - 1]   || '').trim().toLowerCase();
      if (!rawName || !rawId) return;
      if (rawName.toLowerCase() === 'campaign-name' || rawName.toLowerCase() === 'campaign name') return;
      var slug = rawName.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-\(\)]/g, '');
      if (slug && rawId) {
        campaigns[slug] = rawId;
        var clean = slug.replace(/-?\([^)]+\)$/, '').replace(/-+$/, '');
        if (clean && clean !== slug) campaigns[clean] = rawId;
      }
    });
  }
}

function _salvarCampaigns(campaigns) {
  var props = PropertiesService.getScriptProperties();
  var allKeys = props.getKeys();
  allKeys.forEach(function(k) {
    if (k.indexOf('DICT_CAMPAIGNS') === 0) props.deleteProperty(k);
  });
  var json   = JSON.stringify(campaigns);
  var maxLen = 8000;
  if (json.length <= maxLen) {
    props.setProperty(PROP_CAMPAIGNS, json);
    props.setProperty(PROP_CAMPAIGNS + '_CHUNKS', '1');
  } else {
    var chunks = Math.ceil(json.length / maxLen);
    for (var i = 0; i < chunks; i++) {
      props.setProperty(PROP_CAMPAIGNS + '_' + i, json.slice(i * maxLen, (i + 1) * maxLen));
    }
    props.setProperty(PROP_CAMPAIGNS + '_CHUNKS', String(chunks));
  }
}

function getCampaignsFromCache() {
  var props  = PropertiesService.getScriptProperties();
  var chunks = parseInt(props.getProperty(PROP_CAMPAIGNS + '_CHUNKS') || '0');
  if (chunks === 0) return null;
  var json = '';
  if (chunks === 1) {
    json = props.getProperty(PROP_CAMPAIGNS) || '';
  } else {
    for (var i = 0; i < chunks; i++) {
      json += (props.getProperty(PROP_CAMPAIGNS + '_' + i) || '');
    }
  }
  if (!json) return null;
  try {
    return JSON.parse(json);
  } catch(e) {
    Logger.log('getCampaignsFromCache parse ERRO: ' + e.message);
    return null;
  }
}

function getMergeDictStatus() {
  var props  = PropertiesService.getScriptProperties();
  var ts     = props.getProperty(PROP_LAST_MERGE) || '';
  var chunks = parseInt(props.getProperty(PROP_CAMPAIGNS + '_CHUNKS') || '0');
  var total  = 0;
  if (chunks > 0) {
    var cache = getCampaignsFromCache();
    if (cache) total = Object.keys(cache).length;
  }
  return {lastMerge: ts, totalSlugs: total, cacheOk: chunks > 0};
}

function instalarTriggerMerge() {
  ScriptApp.getProjectTriggers().forEach(function(t) {
    if (t.getHandlerFunction() === 'mergeDict') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('mergeDict')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.SUNDAY)
    .atHour(3)
    .create();
  SpreadsheetApp.getUi().alert(
    'Trigger instalado!\n' +
    'mergeDict() roda todo domingo às 3h.\n' +
    'Use "NC Tool > Atualizar Dicionário Agora" para forçar.'
  );
}
