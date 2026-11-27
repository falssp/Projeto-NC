// ============================================================
// NC Tool | F3 — Validator  ·  AmbienteStatus.gs  (Backup)
// Health check completo do ambiente — nunca referencia o backup
// ============================================================

var SD_SHEET_ID = '1Dthsg7TWuYfQi-QU1yCkRJEhFdXKQ3I1wNO5Y90CCEQ';

// ── Função principal chamada pelo HTML via google.script.run ─
function getStatusAmbiente() {
  var resultado = {
    ambiente:    'Pessoal (Backup)',
    timestamp:   new Date().toISOString(),
    jira:        _sdJira(),
    dicionario:  _sdDicionario(),
    planilha:    _sdPlanilha(),
    ultimoLog:   _sdUltimoLog(),
    config:      _sdConfig(),
    triggers:    _sdTriggers()
  };
  return resultado;
}

// ── Jira ─────────────────────────────────────────────────────
function _sdJira() {
  try {
    var props = PropertiesService.getScriptProperties();
    var token = props.getProperty('JIRA_API_TOKEN');
    var email = props.getProperty('JIRA_EMAIL');
    if (!token || !email) return { ok: false, msg: 'Não configurado', email: '' };
    return { ok: true, msg: 'Configurado', email: email };
  } catch(e) {
    return { ok: false, msg: 'Erro: ' + e.message, email: '' };
  }
}

// ── Dicionário ───────────────────────────────────────────────
function _sdDicionario() {
  try {
    var status = getMergeDictStatus();
    if (!status.cacheOk) return { ok: false, msg: 'Cache vazio — rode Atualizar Dicionário Agora', total: 0, lastMerge: '' };
    var ts = status.lastMerge ? new Date(status.lastMerge) : null;
    var diasAtras = ts ? Math.floor((new Date() - ts) / 86400000) : null;
    var aviso = diasAtras !== null && diasAtras > 8;
    return {
      ok:        !aviso,
      msg:       ts ? (diasAtras === 0 ? 'Atualizado hoje' : 'Há ' + diasAtras + ' dia(s)') : 'Data desconhecida',
      total:     status.totalSlugs,
      lastMerge: status.lastMerge,
      aviso:     aviso
    };
  } catch(e) {
    return { ok: false, msg: 'Erro: ' + e.message, total: 0, lastMerge: '' };
  }
}

// ── Saúde das abas ───────────────────────────────────────────
function _sdPlanilha() {
  try {
    var ss = SpreadsheetApp.openById(SD_SHEET_ID);
    var esperadas = {
      'Dashboard': ['NC Tool'],
      'Log':       ['ID','Timestamp','Usuário','Cliente','Fonte','Arquivo','Plataforma','Total','Corretos','Erros','Score%'],
      'Erros':     ['LogID','Timestamp','Cliente','Plataforma','Nível','String','Regra','Campo','Valor','Mensagem','Sugestão'],
      'Exceções':  ['TX Key','Ad Name','Plataforma','Estrutura','Motivo'],
      'Arquivo':   ['ID','Timestamp','Usuário'],
      'Config':    ['NC Tool'],
      'Clientes':  ['Cliente','ID_Dicionario']
    };
    var abas = [];
    Object.keys(esperadas).forEach(function(nome) {
      var aba = ss.getSheetByName(nome);
      if (!aba) {
        abas.push({ nome: nome, ok: false, msg: 'Aba não encontrada', linhas: 0 });
        return;
      }
      var linhas = aba.getLastRow();
      var hdrs   = esperadas[nome];
      var header = linhas > 0 ? aba.getRange(1, 1, 1, Math.min(hdrs.length, aba.getLastColumn())).getValues()[0] : [];
      var hdrOk  = hdrs.every(function(h, i) { return String(header[i] || '').indexOf(h) !== -1; });
      abas.push({
        nome:   nome,
        ok:     hdrOk,
        msg:    hdrOk ? 'OK' : 'Header incorreto',
        linhas: Math.max(0, linhas - 1)
      });
    });
    // Checar aba Excecoes sem acento (duplicada)
    var dupl = ss.getSheetByName('Excecoes');
    if (dupl) abas.push({ nome: 'Excecoes (duplicada!)', ok: false, msg: 'Renomear para Exceções', linhas: 0 });
    return abas;
  } catch(e) {
    return [{ nome: 'Erro', ok: false, msg: e.message, linhas: 0 }];
  }
}

// ── Último log ───────────────────────────────────────────────
function _sdUltimoLog() {
  try {
    var ss  = SpreadsheetApp.openById(SD_SHEET_ID);
    var log = ss.getSheetByName('Log');
    if (!log || log.getLastRow() < 2) return { ok: false, msg: 'Nenhum log encontrado' };
    var lastRow = log.getLastRow();
    var row     = log.getRange(lastRow, 1, 1, 11).getValues()[0];
    return {
      ok:        true,
      id:        row[0],
      timestamp: row[1] ? String(row[1]).slice(0, 16).replace('T', ' ') : '',
      usuario:   row[2],
      fonte:     row[4],
      total:     row[7],
      score:     row[10],
      totalLogs: lastRow - 1
    };
  } catch(e) {
    return { ok: false, msg: 'Erro: ' + e.message };
  }
}

// ── Config ───────────────────────────────────────────────────
function _sdConfig() {
  try {
    var ss  = SpreadsheetApp.openById(SD_SHEET_ID);
    var aba = ss.getSheetByName('Config');
    if (!aba) return { ok: false, msg: 'Aba Config não encontrada', regras: [] };
    var data   = aba.getDataRange().getValues();
    var regras = [];
    data.forEach(function(row) {
      var key = String(row[0]).trim();
      var val = row[1];
      if (key.match(/^VAL-|^WARN-|^REL/)) {
        regras.push({ key: key, ativa: val === true, nota: String(row[2] || '') });
      }
    });
    return { ok: true, regras: regras };
  } catch(e) {
    return { ok: false, msg: 'Erro: ' + e.message, regras: [] };
  }
}

// ── Triggers ─────────────────────────────────────────────────
function _sdTriggers() {
  try {
    var triggers = ScriptApp.getProjectTriggers();
    var merge    = triggers.filter(function(t) { return t.getHandlerFunction() === 'mergeDict' || t.getHandlerFunction() === 'menuMergeDict'; });
    var arquivo  = triggers.filter(function(t) { return t.getHandlerFunction() === 'arquivarLogsAntigos'; });
    return {
      ok: merge.length > 0 && arquivo.length > 0,
      merge:   { instalado: merge.length > 0,   qtd: merge.length },
      arquivo: { instalado: arquivo.length > 0, qtd: arquivo.length }
    };
  } catch(e) {
    return { ok: false, msg: 'Erro: ' + e.message };
  }
}