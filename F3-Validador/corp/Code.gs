// ============================================================
// NC Tool | F3 — Validator  ·  Code.gs  (Original — AfSo)
// ============================================================

var LOG_SHEET_ID = '1fAQfNJ-UkDfhCHZ2GYcxDWpsAojg7z0VglQHeXtAfSo';
var DICT_ID      = '1EpIBzL99_Dh03MySNE-hHiToeN4HiN5yeHSf6XLEEBw';
var NC_SHEET_ID  = '1vGM_se-b1rechwv91WnSw-SW2XQFJ4DN4FPWqrEMkq8';

var DICT_COLS = {
  'CampaignLocal': 7,
  'Market':        11,
  'BrandName':     5,
  'CampaignID':    8,
};

// ── WEB APP ──────────────────────────────────────────────────
function doGet(e) {
  var action = e && e.parameter && e.parameter.action;

  // Sem action → entrega o HTML (acesso direto pelo link GAS)
  if (!action) {
    return HtmlService
      .createHtmlOutputFromFile('index')
      .setTitle('F3 Validator · NC Tool Unilever BR')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  }

  // Com action → responde JSON (chamado pelo GitHub Pages)
  var result;
  try {
    if      (action === 'ping')           result = { ok: true, status: 'online', fase: 'F3', env: 'corp', ts: new Date().toISOString() };
    else if (action === 'stats')          result = _getStats();
    else if (action === 'getDicionario')  result = getDicionario(e.parameter.tipo || 'CampaignLocal');
    else if (action === 'getExcecoes')    result = getExcecoes();
    else if (action === 'getPerfilUsuario') result = getPerfilUsuario();
    else if (action === 'getHistorico')   result = getHistorico(parseInt(e.parameter.limite) || 30);
    else if (action === 'getLogPorHash')  result = getLogPorHash(e.parameter.hash || '');
    else if (action === 'jiraGetStatus')  result = jiraGetStatus();
    else if (action === 'jiraGetTicket')  result = jiraGetTicket(e.parameter.input || '');
    else if (action === 'fetchSheet')     result = { data: fetchSheet(e.parameter.url || '') };
    else if (action === 'getSheetTabs')   result = getSheetTabs(e.parameter.url || '');
    else if (action === 'fetchSheetByGid') result = { data: fetchSheetByGid(e.parameter.url || '', parseInt(e.parameter.gid)) };
    else if (action === 'getDictStatus')  result = getDictStatus();
    else                                  result = { ok: false, erro: 'Action desconhecida: ' + action };
  } catch(err) {
    result = { ok: false, erro: err.message };
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var result;
  try {
    var body = JSON.parse(e.postData.contents);
    var action = body.action;

    if      (action === 'salvarLog')        result = salvarLog(body.payload);
    else if (action === 'solicitarExcecao') result = solicitarExcecao(body.dados);
    else if (action === 'resolverExcecao')  result = resolverExcecao(body.linha, body.decisao, body.observacao);
    else if (action === 'desbloquearExcecao') result = desbloquearExcecao(body.adName, body.plataforma);
    else                                    result = { ok: false, erro: 'Action desconhecida: ' + action };
  } catch(err) {
    result = { ok: false, erro: err.message };
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}


// ── MENU ─────────────────────────────────────────────────────
function onOpen() {
  var perfil = _getPerfilParaMenu();
  var ui     = SpreadsheetApp.getUi();
  var isAdmin = perfil === 'Admin' || perfil === 'Dev';
  var isDev   = perfil === 'Dev';

  // Menu principal — todos os perfis com acesso veem
  var menu = ui.createMenu('NC Tool');
  if (perfil) {
    menu.addItem('📖 Atualizar Dicionário Agora', 'menuMergeDict');
  }
  menu.addToUi();

  // Menu Admin — só Admin e Dev
  if (isAdmin) {
    var menuAdmin = ui.createMenu('NC Tool Admin')
        .addItem('⚙️ Configurar Token Jira', 'configurarTokenJira')
        .addItem('🔍 Testar Conexão Jira', 'testarConexaoJira')
        .addItem('🔑 Remover Token Jira', 'removerTokenJira')
        .addItem('🔄 Setup Completo', 'setupCompleto')
        .addSeparator()
        .addItem('🩺 Health Check', 'runHealthCheck')
        .addItem('📡 Status do Ambiente', 'abrirAmbienteStatus');

    // Itens exclusivos Dev
    if (isDev) {
      menuAdmin
        .addSeparator()
        .addItem('👥 Atualizar Cache de Perfis', 'atualizarCachePerfis')
        .addItem('✨ Inicializar Aba Exceções', 'inicializarExcecoes')
        .addSeparator()
        .addItem('🗑️ Limpar Aba Arquivo', 'limparArquivo')
        .addItem('🗑️ Limpar Aba Erros', 'limparErros')
        .addItem('🗑️ Limpar Aba Exceções', 'limparExcecoes')
        .addItem('🗑️ Limpar Aba Log', 'limparLog')
        .addItem('🔧 Repadronizar Abas', 'fixTodasAbas')
        .addSeparator()
        .addItem('⏰ Instalar Trigger Arquivamento (Dia 1 do Mês)', 'instalarTriggerArquivamento')
        .addItem('⏰ Instalar Trigger Semanal (Domingo 3h)', 'instalarTriggerMerge')
        .addItem('🔔 Instalar Notificação Dicionário', 'instalarTriggerNotificacaoDicionario')
        .addItem('🔕 Remover Notificação Dicionário', 'removerTriggerNotificacaoDicionario');
    }

    menuAdmin.addToUi();
  }

  // Rename silencioso: Excecoes → Exceções na primeira abertura
  try { _renomearExcecoesSeNecessario(SpreadsheetApp.getActiveSpreadsheet()); } catch(e) {}

  // Health check leve em background — avisa se algo crítico está fora
  try { _onOpenHealthAlert(); } catch(e) {}
}

function _getPerfilParaMenu() {
  try {
    var email = Session.getActiveUser().getEmail();
    if (!email) return '';
    var cacheKey = 'PERFIL_' + email.replace(/[^a-zA-Z0-9]/g, '_');
    return PropertiesService.getScriptProperties().getProperty(cacheKey) || '';
  } catch(e) {
    return '';
  }
}

function atualizarCachePerfis() {
  try {
    var ss   = SpreadsheetApp.openById(NC_SHEET_ID);
    var aba  = ss.getSheetByName('Usuarios');
    if (!aba) { SpreadsheetApp.getUi().alert('Aba Usuários não encontrada.'); return; }
    var data  = aba.getDataRange().getValues();
    var props = PropertiesService.getScriptProperties();
    var count = 0;
    for (var i = 1; i < data.length; i++) {
      var email  = String(data[i][3] || '').trim().toLowerCase();
      var perfil = String(data[i][4] || '').trim();
      if (!email || !perfil) continue;
      var cacheKey = 'PERFIL_' + email.replace(/[^a-zA-Z0-9]/g, '_');
      props.setProperty(cacheKey, perfil);
      count++;
    }
    SpreadsheetApp.getActiveSpreadsheet()
      .toast(count + ' perfis em cache. Feche e reabra a planilha para ver o menu.', 'NC Tool', 5);
  } catch(e) {
    SpreadsheetApp.getUi().alert('Erro: ' + e.message);
  }
}

function limparCachePerfil() {
  var props = PropertiesService.getScriptProperties();
  var keys  = props.getKeys();
  keys.forEach(function(k) {
    if (k.indexOf('PERFIL_') === 0) props.deleteProperty(k);
  });
  SpreadsheetApp.getActiveSpreadsheet().toast('Cache de perfis limpo.', 'NC Tool', 3);
}

function diagnosticarMenu() {
  var email  = Session.getActiveUser().getEmail();
  var perfil = _getPerfilParaMenu();
  SpreadsheetApp.getUi().alert(
    'Diagnóstico do Menu\n\n' +
    'E-mail: ' + (email || '(vazio)') + '\n' +
    'Perfil encontrado: ' + (perfil || '(nenhum)') + '\n\n' +
    (perfil
      ? 'Menu deve aparecer para perfil: ' + perfil
      : 'Perfil não encontrado na aba Usuários — verifique o e-mail cadastrado.')
  );
}

// ── SETUP COMPLETO ───────────────────────────────────────────
function setupCompleto() {
  var ss      = SpreadsheetApp.getActiveSpreadsheet();
  var feitos  = [];
  var erros   = [];

  // 1. Dicionário — atualizar se cache vazio ou > 8 dias
  try {
    var dictStatus = getMergeDictStatus();
    var diasAtras  = dictStatus.lastMerge
      ? Math.floor((new Date() - new Date(dictStatus.lastMerge)) / 86400000)
      : 999;
    if (!dictStatus.cacheOk || diasAtras > 8) {
      ss.toast('Atualizando dicionário...', 'NC Tool · Setup', 5);
      var r = mergeDict();
      if (r.ok) feitos.push('📖 Dicionário atualizado (' + r.total + ' slugs)');
      else       erros.push('📖 Dicionário: ' + r.erro);
    } else {
      feitos.push('📖 Dicionário OK (atualizado há ' + diasAtras + ' dia(s))');
    }
  } catch(e) { erros.push('📖 Dicionário: ' + e.message); }

  // 2. Trigger mergeDict
  try {
    var triggers = ScriptApp.getProjectTriggers().map(function(t){ return t.getHandlerFunction(); });
    // Aceita tanto mergeDict quanto menuMergeDict
    var temMerge = triggers.indexOf('mergeDict') !== -1 || triggers.indexOf('menuMergeDict') !== -1;
    if (!temMerge) {
      ScriptApp.newTrigger('mergeDict').timeBased().onWeekDay(ScriptApp.WeekDay.SUNDAY).atHour(3).create();
      feitos.push('⏰ Trigger semanal (mergeDict) instalado');
    } else {
      feitos.push('⏰ Trigger semanal já instalado');
    }
  } catch(e) { erros.push('⏰ Trigger mergeDict: ' + e.message); }

  // 3. Trigger arquivarLogsAntigos
  try {
    var triggers2 = ScriptApp.getProjectTriggers().map(function(t){ return t.getHandlerFunction(); });
    if (triggers2.indexOf('arquivarLogsAntigos') === -1) {
      ScriptApp.newTrigger('arquivarLogsAntigos').timeBased().onMonthDay(1).atHour(3).create();
      feitos.push('⏰ Trigger arquivamento instalado');
    } else {
      feitos.push('⏰ Trigger arquivamento já instalado');
    }
  } catch(e) { erros.push('⏰ Trigger arquivamento: ' + e.message); }

  // 4. Rename Excecoes → Exceções
  try {
    _renomearExcecoesSeNecessario(SpreadsheetApp.openById(LOG_SHEET_ID));
    feitos.push('✅ Aba Exceções verificada');
  } catch(e) {}

  // Resumo
  var linhas = ['NC Tool | F3 Validator — Setup Completo', ''];
  if (feitos.length) { linhas.push('✅ Concluído (' + feitos.length + '):'); feitos.forEach(function(f){ linhas.push('  ' + f); }); }
  if (erros.length)  { linhas.push(''); linhas.push('❌ Erros (' + erros.length + '):'); erros.forEach(function(e){ linhas.push('  ' + e); }); }
  SpreadsheetApp.getUi().alert(linhas.join(String.fromCharCode(10)));
}

// ── HEALTH ALERT NO onOpen ────────────────────────────────────
// Verificação leve — sem alert, só toast se algo crítico
function _onOpenHealthAlert() {
  var problemas = [];
  try {
    var dict = getMergeDictStatus();
    var dias = dict.lastMerge ? Math.floor((new Date() - new Date(dict.lastMerge)) / 86400000) : 999;
    if (!dict.cacheOk || dias > 8) problemas.push('dicionário desatualizado (' + dias + 'd)');
  } catch(e) {}
  try {
    var fns = ScriptApp.getProjectTriggers().map(function(t){ return t.getHandlerFunction(); });
    if (fns.indexOf('mergeDict') === -1)           problemas.push('trigger semanal ausente');
    if (fns.indexOf('arquivarLogsAntigos') === -1) problemas.push('trigger arquivamento ausente');
  } catch(e) {}
  if (problemas.length) {
    SpreadsheetApp.getActiveSpreadsheet().toast(
      '⚠️ ' + problemas.join(' · ') + ' — use NC Tool Admin → 🔄 Setup Completo',
      'NC Tool', 10
    );
  }
}


// ── DICIONARIO ───────────────────────────────────────────────
function getDicionario(tipo) {
  try {
    if (tipo === 'CampaignLocal') return _getCampaignLocalSlugs();
    var ss  = SpreadsheetApp.openById(DICT_ID);
    var aba = ss.getSheets()[0];
    if (!aba) return [];
    var col     = DICT_COLS[tipo] || 7;
    var lastRow = aba.getLastRow();
    if (lastRow < 9) return [];
    var vals = aba.getRange(9, col, lastRow - 8, 1).getValues();
    return vals.map(function(r) { return r[0].toString().trim().toLowerCase(); }).filter(Boolean);
  } catch(e) {
    Logger.log('getDicionario ERRO [' + tipo + ']: ' + e.message);
    return [];
  }
}

function _getCampaignLocalSlugs() {
  var cache = getCampaignsFromCache();
  if (cache && Object.keys(cache).length > 0) return Object.keys(cache);
  try {
    var ss  = SpreadsheetApp.openById(DICT_ID);
    var aba = ss.getSheets()[0];
    if (!aba) return [];
    var col     = DICT_COLS['CampaignLocal'];
    var lastRow = aba.getLastRow();
    if (lastRow < 9) return [];
    var vals   = aba.getRange(9, col, lastRow - 8, 1).getValues();
    var result = [];
    vals.forEach(function(r) {
      var raw = r[0].toString().trim().toLowerCase();
      if (!raw) return;
      result.push(raw);
      var clean = raw.replace(/-?\([^)]+\)$/, '').replace(/-+$/, '');
      if (clean && clean !== raw) result.push(clean);
    });
    return result.filter(Boolean);
  } catch(e) {
    Logger.log('_getCampaignLocalSlugs ERRO: ' + e.message);
    return [];
  }
}

// ── FETCH SHEET ───────────────────────────────────────────────
function fetchSheet(url) {
  try {
    var m = url.match(/\/spreadsheets\/d\/([^\/\?#]+)/);
    if (!m) throw new Error('URL inválida');
    var ss  = SpreadsheetApp.openById(m[1]);
    var aba;
    var gidMatch = url.match(/[#&?]gid=(\d+)/);
    if (gidMatch) {
      var gid = parseInt(gidMatch[1]);
      var sheets = ss.getSheets();
      for (var i = 0; i < sheets.length; i++) {
        if (sheets[i].getSheetId() === gid) { aba = sheets[i]; break; }
      }
    }
    if (!aba) aba = ss.getActiveSheet();
    var lastRow = aba.getLastRow();
    var lastCol = aba.getLastColumn();
    if (lastRow < 1 || lastCol < 1) return '';
    return _toCSV(aba.getRange(1, 1, lastRow, lastCol).getValues());
  } catch(e) {
    Logger.log('fetchSheet ERRO: ' + e.message);
    throw new Error(e.message);
  }
}

function getSheetTabs(url) {
  try {
    var m = url.match(/\/spreadsheets\/d\/([^\/\?#]+)/);
    if (!m) throw new Error('URL inválida');
    var ss = SpreadsheetApp.openById(m[1]);
    return ss.getSheets().map(function(aba) {
      return { name: aba.getName(), gid: aba.getSheetId() };
    });
  } catch(e) {
    Logger.log('getSheetTabs ERRO: ' + e.message);
    throw new Error(e.message);
  }
}

function fetchSheetByGid(url, gid) {
  try {
    var m = url.match(/\/spreadsheets\/d\/([^\/\?#]+)/);
    if (!m) throw new Error('URL inválida');
    var ss     = SpreadsheetApp.openById(m[1]);
    var aba    = null;
    var sheets = ss.getSheets();
    for (var i = 0; i < sheets.length; i++) {
      if (sheets[i].getSheetId() === gid) { aba = sheets[i]; break; }
    }
    if (!aba) aba = ss.getActiveSheet();
    var lastRow = aba.getLastRow();
    var lastCol = aba.getLastColumn();
    if (lastRow < 1 || lastCol < 1) return '';
    return _toCSV(aba.getRange(1, 1, lastRow, lastCol).getValues());
  } catch(e) {
    Logger.log('fetchSheetByGid ERRO: ' + e.message);
    throw new Error(e.message);
  }
}

// ── STATUS DO DICIONÁRIO ──────────────────────────────────────
function getDictStatus() {
  try {
    return getMergeDictStatus();
  } catch(e) {
    return { lastMerge: '', totalSlugs: 0, cacheOk: false };
  }
}

// ── AUTO-RENAME EXCECOES ─────────────────────────────────────
// Renomeia "Excecoes" → "Exceções" silenciosamente na primeira execução
function _renomearExcecoesSeNecessario(ss) {
  try {
    var aba = ss.getSheetByName('Excecoes');
    if (aba) aba.setName('Exceções');
  } catch(e) { /* silencioso */ }
}

// ── SALVAR LOG ────────────────────────────────────────────────
// Usa openById — getActiveSpreadsheet() não funciona em contexto Web App
function salvarLog(payload) {
  try {
    var ss  = SpreadsheetApp.openById(LOG_SHEET_ID);
    _renomearExcecoesSeNecessario(ss);
    var log = ss.getSheetByName('Log');
    var det = ss.getSheetByName('Erros');
    if (!log) {
      log = ss.insertSheet('Log');
      log.appendRow(['ID','Timestamp','Usuario','Cliente','Fonte','Arquivo','Plataforma','Total','Corretos','Erros','Score%']);
      log.getRange(1,1,1,11).setFontWeight('bold').setBackground('#0F1B6E').setFontColor('#ffffff');
    }
    if (!det) {
      det = ss.insertSheet('Erros');
      det.appendRow(['LogID','Timestamp','Cliente','Plataforma','Nivel','String','Regra','Campo','Valor','Mensagem','Sugestao']);
      det.getRange(1,1,1,11).setFontWeight('bold').setBackground('#0F1B6E').setFontColor('#ffffff');
    }
    var logId = 'LOG-' + new Date().getTime();
    var ts    = payload.timestamp || new Date().toISOString();
    log.appendRow([
      logId, ts,
      Session.getActiveUser().getEmail() || 'anon',
      'Unilever BR',
      payload.fonte || '', payload.arquivo || '', payload.plataforma || 'Todas',
      payload.total || 0, payload.corretos || 0, payload.erros || 0, payload.score || '0%'
    ]);
    var detalhes = payload.detalhes || [];
    if (detalhes.length) {
      var rows = detalhes.map(function(d) {
        return [logId, ts, 'Unilever BR', d.plataforma||'', d.nivel||'', d.string||'',
                d.regra||'', d.campo||'', d.valor||'', d.mensagem||'', d.sugestao||''];
      });
      det.getRange(det.getLastRow() + 1, 1, rows.length, 11).setValues(rows);
    }
    return { ok: true, logId: logId };
  } catch(e) {
    Logger.log('salvarLog ERRO: ' + e.message);
    return { ok: false, erro: e.message };
  }
}

// ── HISTÓRICO ─────────────────────────────────────────────────
// Usa openById — getActiveSpreadsheet() não funciona em contexto Web App
function getHistorico(limite) {
  try {
    var ss      = SpreadsheetApp.openById(LOG_SHEET_ID);
    var log     = ss.getSheetByName('Log');
    var lastRow = log ? log.getLastRow() : 0;
    if (!log || lastRow < 2) return [];
    var n    = Math.min(limite || 30, lastRow - 1);
    var data = log.getRange(lastRow - n + 1, 1, n, 11).getValues();
    return data.map(function(r) {
      return { id:r[0], timestamp:r[1], usuario:r[2], cliente:r[3],
               fonte:r[4], arquivo:r[5], plataforma:r[6],
               total:r[7], corretos:r[8], erros:r[9], score:r[10] };
    }).reverse();
  } catch(e) {
    Logger.log('getHistorico ERRO: ' + e.message);
    return [];
  }
}

// ── getLogPorHash ─────────────────────────────────────────────
// Usa openById — getActiveSpreadsheet() não funciona em contexto Web App
function getLogPorHash(hash) {
  try {
    var ss  = SpreadsheetApp.openById(LOG_SHEET_ID);
    var log = ss.getSheetByName('Log');
    if (!log || log.getLastRow() < 2) return [];
    var data = log.getDataRange().getValues();
    var hdr  = data[0];
    var hashCol = hdr.indexOf('Hash');
    if (hashCol === -1) return [];
    var results = [];
    for (var i = 1; i < data.length; i++) {
      if (String(data[i][hashCol]).indexOf(hash) !== -1) {
        var obj = {};
        hdr.forEach(function(h, j) { obj[h] = data[i][j]; });
        results.push(obj);
      }
    }
    return results;
  } catch(e) {
    Logger.log('getLogPorHash ERRO: ' + e.message);
    return [];
  }
}

// ── CONFIG ────────────────────────────────────────────────────
// Usa openById — getActiveSpreadsheet() não funciona em contexto Web App
function getConfig() {
  try {
    var ss  = SpreadsheetApp.openById(LOG_SHEET_ID);
    var aba = ss.getSheetByName('Config');
    if (!aba) return {};
    var data   = aba.getDataRange().getValues();
    var config = {};
    data.forEach(function(row) {
      var key = String(row[0]).trim();
      var val = row[1];
      if (key && typeof val === 'boolean') config[key] = val;
      if (key && typeof val === 'number')  config[key] = val;
    });
    return config;
  } catch(e) {
    Logger.log('getConfig ERRO: ' + e.message);
    return {};
  }
}

// ── CLIENTES ──────────────────────────────────────────────────
// Usa openById — getActiveSpreadsheet() não funciona em contexto Web App
function getClientes() {
  try {
    var ss  = SpreadsheetApp.openById(LOG_SHEET_ID);
    var aba = ss.getSheetByName('Clientes');
    if (!aba || aba.getLastRow() < 2) return [];
    var data = aba.getRange(2, 1, aba.getLastRow() - 1, 6).getValues();
    return data
      .filter(function(r) { return r[4] === true; })
      .map(function(r) {
        return { nome:r[0], dictId:r[1], rmId:r[2], plataformas:r[3], notas:r[5] };
      });
  } catch(e) {
    Logger.log('getClientes ERRO: ' + e.message);
    return [];
  }
}

// ── LIMPAR ABAS ───────────────────────────────────────────────
// Estratégia segura: clearContent nas linhas de dados (evita erro de deleteRows
// quando a aba tem apenas 1 linha não congelada restante)
// Estas funções rodam no contexto da planilha (menu), não do Web App —
// getActiveSpreadsheet() é correto aqui.

function _limparDados(nomeAba) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var aba   = ss.getSheetByName(nomeAba);
  if (!aba) return { ok: false, msg: 'Aba "' + nomeAba + '" não encontrada.' };
  var ultima = aba.getLastRow();
  if (ultima <= 1) return { ok: true, msg: 'ja_vazia' };
  // clearContent é mais seguro que deleteRows — não estoura com linhas congeladas
  aba.getRange(2, 1, ultima - 1, aba.getMaxColumns()).clearContent();
  // Compacta linhas vazias ao final
  var maxRow = aba.getMaxRows();
  if (maxRow > 2) {
    try { aba.deleteRows(2, maxRow - 1); } catch(e) { /* ignora se falhar */ }
  }
  return { ok: true, msg: 'ok' };
}

function limparArquivo() {
  var ui    = SpreadsheetApp.getUi();
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var aba   = ss.getSheetByName('Arquivo');
  if (!aba) { ui.alert('Aba Arquivo não encontrada.'); return; }
  if (aba.getLastRow() <= 1) { ss.toast('Aba Arquivo já está vazia.', 'NC Tool', 3); return; }
  var resp = ui.alert('Limpar Arquivo',
    'Apagar ' + (aba.getLastRow() - 1) + ' linha(s) da aba Arquivo?\nEsta ação não pode ser desfeita.',
    ui.ButtonSet.OK_CANCEL);
  if (resp !== ui.Button.OK) return;
  var r = _limparDados('Arquivo');
  ss.toast(r.ok ? '✅ Aba Arquivo limpa.' : '❌ Erro: ' + r.msg, 'NC Tool', 4);
}

function limparLog() {
  var ui  = SpreadsheetApp.getUi();
  var ss  = SpreadsheetApp.getActiveSpreadsheet();
  var aba = ss.getSheetByName('Log');
  if (!aba) { ui.alert('Aba Log não encontrada.'); return; }
  if (aba.getLastRow() <= 1) { ss.toast('Aba Log já está vazia.', 'NC Tool', 3); return; }
  var resp = ui.alert('Limpar Log',
    'Apagar ' + (aba.getLastRow() - 1) + ' linha(s) da aba Log?\nEsta ação não pode ser desfeita.',
    ui.ButtonSet.OK_CANCEL);
  if (resp !== ui.Button.OK) return;
  var r = _limparDados('Log');
  ss.toast(r.ok ? '✅ Aba Log limpa.' : '❌ Erro: ' + r.msg, 'NC Tool', 4);
}

function limparErros() {
  var ui  = SpreadsheetApp.getUi();
  var ss  = SpreadsheetApp.getActiveSpreadsheet();
  var aba = ss.getSheetByName('Erros');
  if (!aba) { ui.alert('Aba Erros não encontrada.'); return; }
  if (aba.getLastRow() <= 1) { ss.toast('Aba Erros já está vazia.', 'NC Tool', 3); return; }
  var resp = ui.alert('Limpar Erros',
    'Apagar ' + (aba.getLastRow() - 1) + ' linha(s) da aba Erros?\nEsta ação não pode ser desfeita.',
    ui.ButtonSet.OK_CANCEL);
  if (resp !== ui.Button.OK) return;
  var r = _limparDados('Erros');
  ss.toast(r.ok ? '✅ Aba Erros limpa.' : '❌ Erro: ' + r.msg, 'NC Tool', 4);
}

function limparExcecoes() {
  var ui  = SpreadsheetApp.getUi();
  var ss  = SpreadsheetApp.getActiveSpreadsheet();
  // Aceita tanto "Excecoes" quanto "Exceções"
  var aba = ss.getSheetByName('Exceções') || ss.getSheetByName('Excecoes');
  if (!aba) { ui.alert('Aba Exceções não encontrada.'); return; }
  if (aba.getLastRow() <= 1) { ss.toast('Aba Exceções já está vazia.', 'NC Tool', 3); return; }
  var resp = ui.alert('Limpar Exceções',
    'Apagar ' + (aba.getLastRow() - 1) + ' linha(s) da aba Exceções?\nEsta ação não pode ser desfeita.',
    ui.ButtonSet.OK_CANCEL);
  if (resp !== ui.Button.OK) return;
  var r = _limparDados(aba.getName());
  ss.toast(r.ok ? '✅ Aba Exceções limpa.' : '❌ Erro: ' + r.msg, 'NC Tool', 4);
}

// ── INICIALIZAR EXCECOES ──────────────────────────────────────
function inicializarExcecoes() {
  var ss  = SpreadsheetApp.getActiveSpreadsheet();
  // Aceita tanto "Excecoes" quanto "Exceções" — cria se não existir
  var aba = ss.getSheetByName('Exceções') || ss.getSheetByName('Excecoes');
  if (!aba) {
    aba = ss.insertSheet('Exceções');
  }
  var hdr = ['TX Key','Ad Name','Plataforma','Estrutura','Motivo',
             'Data E-mail','Assunto E-mail','Remetente',
             'Solicitado Por','Data Solicitação','Aprovado Por','Data Aprovação','Status'];
  aba.getRange(1, 1, 1, hdr.length).setValues([hdr]);
  aba.getRange(1, 1, 1, hdr.length)
     .setFontWeight('bold').setBackground('#0F1B6E').setFontColor('#ffffff')
     .setHorizontalAlignment('center').setVerticalAlignment('middle');
  aba.setRowHeight(1, 34);
  aba.setFrozenRows(1);
  SpreadsheetApp.getActiveSpreadsheet().toast('✅ Aba Exceções inicializada.', 'NC Tool', 4);
}

// ── Status Dashboard ─────────────────────────────────────────
function abrirAmbienteStatus() {
  var html = HtmlService.createHtmlOutputFromFile('StatusAmbiente')
    .setWidth(1050).setHeight(720);
  SpreadsheetApp.getUi().showModalDialog(html, '📡 Status do Ambiente');
}

// ── STATS para portal ────────────────────────────────────────
function _getStats() {
  try {
    var ss  = SpreadsheetApp.openById(LOG_SHEET_ID);
    var log = ss.getSheetByName('Log');

    // Saúde do dicionário
    var dictStatus = getDictStatus();
    var diasSemMerge = 0;
    var totalSlugs   = dictStatus.totalSlugs || 0;
    var saudeStatus  = 'critico';
    if (dictStatus.lastMerge) {
      diasSemMerge = Math.floor((new Date() - new Date(dictStatus.lastMerge)) / 86400000);
      saudeStatus  = diasSemMerge <= 3 ? 'ok' : diasSemMerge <= 8 ? 'aviso' : 'critico';
    }

    if (!log || log.getLastRow() < 2) {
      return {
        ok: true,
        ultimaValidacao: null,
        totalMes: 0,
        totalStrings: 0,
        totalErros: 0,
        saude: { diasSemMerge: diasSemMerge, totalSlugs: totalSlugs, status: saudeStatus }
      };
    }

    var lastRow = log.getLastRow();
    var data    = log.getRange(2, 1, lastRow - 1, 11).getValues();

    // Mês corrente
    var agora = new Date();
    var mesAtual = agora.getFullYear() + '-' + ('0' + (agora.getMonth() + 1)).slice(-2);

    var totalMes     = 0;
    var totalStrings = 0;
    var totalErros   = 0;
    var ultimaLinha  = null;

    for (var i = data.length - 1; i >= 0; i--) {
      var row = data[i];
      var ts  = row[1] ? String(row[1]).slice(0, 7) : '';
      if (ts === mesAtual) {
        totalMes++;
        totalStrings += parseInt(row[7]) || 0;
        totalErros   += parseInt(row[9]) || 0;
      }
      if (!ultimaLinha && row[0]) ultimaLinha = row;
    }

    var ultimaValidacao = null;
    if (ultimaLinha) {
      var tsRaw = ultimaLinha[1] ? String(ultimaLinha[1]) : '';
      ultimaValidacao = {
        data:    tsRaw.slice(0, 10),
        hora:    tsRaw.slice(11, 16),
        usuario: String(ultimaLinha[2] || '')
      };
    }

    return {
      ok:             true,
      ultimaValidacao: ultimaValidacao,
      totalMes:       totalMes,
      totalStrings:   totalStrings,
      totalErros:     totalErros,
      saude:          { diasSemMerge: diasSemMerge, totalSlugs: totalSlugs, status: saudeStatus }
    };
  } catch(e) {
    Logger.log('_getStats ERRO: ' + e.message);
    return { ok: false, erro: e.message };
  }
}

// ── HELPER ────────────────────────────────────────────────────
function _toCSV(data) {
  return data.map(function(row) {
    return row.map(function(cell) {
      var s = String(cell instanceof Date ? cell.toISOString() : cell);
      return (s.indexOf(',') >= 0 || s.indexOf('"') >= 0 || s.indexOf('\n') >= 0)
        ? '"' + s.replace(/"/g, '""') + '"' : s;
    }).join(',');
  }).join('\n');
}
