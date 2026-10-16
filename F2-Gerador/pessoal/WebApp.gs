// ============================================================
// NC Tool | Unilever BR x Grasp — F2 v4 — Web App
// Ambiente: PESSOAL (falssp@gmail.com)
//
// Endpoints (GET ?action=...):
//   ping          → { ok: true, ts }
//   stats         → { version, lastSync, plataformas[], nrows, ts }
//   listarOpcoes  → { [campo]: [valores...], ts }
// ============================================================

var _F2_VERSION = 'F2-v4';

// ============================================================
// doGet — ponto de entrada da Web App
// ============================================================
function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) || 'ping';
  var campo  = (e && e.parameter && e.parameter.campo)  || null;

  try {
    var result;
    if      (action === 'ping')         result = _f2Ping();
    else if (action === 'stats')        result = _f2Stats();
    else if (action === 'listarOpcoes') result = _f2ListarOpcoes(campo);
    else result = { error: 'action desconhecida: ' + action };

    return _f2Json(result);
  } catch (ex) {
    return _f2Json({ error: ex.message });
  }
}

// ============================================================
// ping — health check
// ============================================================
function _f2Ping() {
  return { ok: true, env: 'pes', version: _F2_VERSION, ts: new Date().toISOString() };
}

// ============================================================
// stats — métricas da planilha
// ============================================================
function _f2Stats() {
  var ss        = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheets    = ss.getSheets();
  var plats     = [];
  var skipNames = [LISTAS, LOG, INICIO, '📋 Índice'];
  sheets.forEach(function(s) {
    var n = s.getName();
    if (skipNames.indexOf(n) < 0 && n.indexOf('📋') < 0) plats.push(n);
  });

  var lastSync = _f2UltimoSync();

  return {
    ok:          true,
    env:         'pes',
    version:     _F2_VERSION,
    spreadsheet: SPREADSHEET_ID,
    plataformas: plats,
    nrows:       NROWS,
    lastSync:    lastSync,
    ts:          new Date().toISOString()
  };
}

// ============================================================
// listarOpcoes — retorna os valores de um campo do Dados
// Se campo for null, retorna todos os campos disponíveis
// ============================================================
function _f2ListarOpcoes(campo) {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var ls = ss.getSheetByName(LISTAS);
  if (!ls) return { error: 'Aba "' + LISTAS + '" nao encontrada' };

  var lr = ls.getLastRow();
  var lc = ls.getLastColumn();
  if (lr < 1 || lc < 1) return { ok: true, campos: {}, ts: new Date().toISOString() };

  var data = ls.getRange(1, 1, lr, lc).getValues();

  // Linha 1 = cabeçalhos (nome do campo), linhas 2+ = valores
  var headers = data[0];
  var campos  = {};
  for (var c = 0; c < headers.length; c++) {
    var h = (headers[c] || '').toString().trim();
    if (!h) continue;
    var vals = [];
    for (var r = 1; r < data.length; r++) {
      var v = (data[r][c] || '').toString().trim();
      if (v) vals.push(v);
    }
    campos[h] = vals;
  }

  if (campo) {
    if (!campos[campo]) return { error: 'Campo nao encontrado: ' + campo };
    var out = {}; out[campo] = campos[campo];
    return { ok: true, env: 'pes', campo: campo, valores: campos[campo], ts: new Date().toISOString() };
  }

  return { ok: true, env: 'pes', campos: campos, ts: new Date().toISOString() };
}

// ============================================================
// Helpers
// ============================================================
function _f2UltimoSync() {
  try {
    var props = PropertiesService.getScriptProperties();
    return props.getProperty('LAST_SYNC') || null;
  } catch (e) { return null; }
}

function _f2Json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
