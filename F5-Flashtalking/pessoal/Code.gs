/* ═══════════════════════════════════════════════════════════════════
   NC Tool | Unilever BR x Grasp [F5 — FT Flashtalking Validator]
   Code.gs — Script BACKUP · NC Tool | Unilever BR x Grasp — Script F5
   Planilha : 1YZ3tFDlt3yP5xtNVpSMhyS-cxG3QHBlN5nr_z-yJi2s
   ⚠️  Este script NÃO replica para ninguém.
   ═══════════════════════════════════════════════════════════════════ */

/* ─── IDs ─── */
const SPREADSHEET_ID  = '1YZ3tFDlt3yP5xtNVpSMhyS-cxG3QHBlN5nr_z-yJi2s';

/* ─── ABAS ─── */
const ABA_DASH        = 'DASH';
const ABA_CONSOLIDADO = 'CONSOLIDADO';
const ABA_AUDIO       = 'AUDIO';
const ABA_DISPLAY     = 'DISPLAY';
const ABA_VIDEO       = 'VIDEO';
const ABA_EXCECOES    = 'EXCECOES';
const ABA_EQUIPE      = 'EQUIPE';

/* ─── CABEÇALHOS ─── */
const HDR_VIDEO = [
  'ID','Timestamp','Usuário','Arquivo','Status','Erros','Avisos',
  'Formato','Tamanho (MB)','Duração (s)','Aspect Ratio','Codec','Bitrate','Subtipo','Observações'
];
const HDR_DISPLAY = [
  'ID','Timestamp','Usuário','Arquivo','Status','Erros','Avisos',
  'Nome HTML','Tamanho (MB)','Largura × Altura','manifest.js','ClickTagCount','Variáveis','Tipo de Ad','Observações'
];
const HDR_AUDIO = [
  'ID','Timestamp','Usuário','Arquivo','Status','Erros','Avisos',
  'Formato','Tamanho (MB)','Duração (s)','Bitrate (Kbps)','Sample Rate (kHz)','LUFS','TPL (dB)','VAST','Observações'
];
const HDR_CONSOLIDADO = [
  'ID','Timestamp','Usuário','Arquivo','Status','Erros','Avisos',
  'Tipo','Detalhes','Observações'
];

/* ─── ADMINS ─── */
const ADMIN_EMAILS = [
  'falssp@gmail.com'
];

/* ─── VISUAL ─── */
const COR_HEADER = '#1a237e';
const COR_ZEBRA  = '#f0f4ff';

/* ════════════════════════════════════════
   doGet
   ════════════════════════════════════════ */
function doGet(e) {
  const action = e && e.parameter && e.parameter.action;
  if (action === 'ping')           return jsonResponse(handlePing());
  if (action === 'stats')          return jsonResponse(handleStats());
  if (action === 'loadHist')       return jsonResponse(loadHist(e));
  if (action === 'loadUserPerfil') return jsonResponse(loadUserPerfil());
  if (action === 'loadExcecoes')   return jsonResponse(loadExcecoes());
  return HtmlService
    .createHtmlOutputFromFile('index')
    .setTitle('NC Tool | Unilever BR x Grasp [F5 — FT Flashtalking Validator]')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/* ════════════════════════════════════════
   doPost
   ════════════════════════════════════════ */
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const action  = payload.action;
    if (action === 'saveLog')     return jsonResponse(saveLog(payload));
    if (action === 'saveExcecao') return jsonResponse(saveExcecao(payload));
    return jsonResponse({ ok: false, error: 'Ação desconhecida: ' + action });
  } catch (err) {
    return jsonResponse({ ok: false, error: err.message });
  }
}

/* ════════════════════════════════════════
   ping / stats
   ════════════════════════════════════════ */
function handlePing() {
  return {
    status: 'ok',
    fase:   'F5',
    env:    ADMIN_EMAILS[0].includes('falssp') ? 'pessoal' : 'corp',
    ts:     new Date().toISOString()
  };
}

function handleStats() {
  const ss   = SpreadsheetApp.openById(SPREADSHEET_ID);
  const abaC = ss.getSheetByName(ABA_CONSOLIDADO);

  // totals
  const totalOp = abaC && abaC.getLastRow() > 1 ? abaC.getLastRow() - 1 : 0;

  // total do mês atual
  const agora = new Date();
  const anoMes = agora.getFullYear() * 100 + (agora.getMonth() + 1);
  let totalMes = 0, totalErros = 0;
  let ultimaData = null, ultimaHora = null, ultimoUsuario = null;

  if (abaC && abaC.getLastRow() > 1) {
    const dados = abaC.getRange(2, 1, abaC.getLastRow() - 1, HDR_CONSOLIDADO.length).getValues();
    dados.forEach(r => {
      const ts = r[1] ? new Date(r[1]) : null;
      if (ts) {
        const am = ts.getFullYear() * 100 + (ts.getMonth() + 1);
        if (am === anoMes) totalMes++;
        // ultima validação = última linha (mais recente)
        if (!ultimaData || ts > new Date(ultimaData + 'T' + (ultimaHora||'00:00'))) {
          ultimaData    = Utilities.formatDate(ts, Session.getScriptTimeZone(), 'dd/MM/yyyy');
          ultimaHora    = Utilities.formatDate(ts, Session.getScriptTimeZone(), 'HH:mm');
          ultimoUsuario = r[2] || '—';
        }
      }
      totalErros += Number(r[5]) || 0;
    });
  }

  return {
    ultimaValidacao: { data: ultimaData || '—', hora: ultimaHora || '—', usuario: ultimoUsuario || '—' },
    totalMes:        totalMes,
    totalOperacoes:  totalOp,
    totalErros:      totalErros
  };
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ════════════════════════════════════════
   saveLog
   ════════════════════════════════════════ */
function saveLog(payload) {
  const ss   = SpreadsheetApp.openById(SPREADSHEET_ID);
  const data = payload.payload || payload.dados || payload || {};
  const tipo = (data.tipo || '').toLowerCase();

  const id        = gerarId(ss, tipo);
  const timestamp = data.timestamp || new Date().toISOString();
  const usuario   = data.usuario   || '—';
  const status    = (data.status   || '—').toUpperCase();
  const erros     = data.erros     || 0;
  const avisos    = data.avisos    || 0;
  const obs       = data.obs       || '—';
  const d         = _parseDados(data.dados);
  const arquivo   = d.arquivo || d.f || d.n || d.nome || '—';

  let abaName, rowTipo;

  if (tipo === 'video') {
    abaName = ABA_VIDEO;
    rowTipo = [
      id, timestamp, usuario, arquivo, status, erros, avisos,
      d.f||'—', d.t||'—', d.d||'—', d.r||'—', d.c||'—',
      d.bk||d.bm||'—', d.st||'—', obs
    ];
  } else if (tipo === 'display') {
    abaName = ABA_DISPLAY;
    const dim = (d.w && d.h) ? d.w+'×'+d.h : '—';
    rowTipo = [
      id, timestamp, usuario, arquivo, status, erros, avisos,
      d.n||'—', d.t||'—', dim, d.mn||'—',
      d.ct||'—', d.v||'—', d.tp||'—', obs
    ];
  } else if (tipo === 'audio') {
    abaName = ABA_AUDIO;
    rowTipo = [
      id, timestamp, usuario, arquivo, status, erros, avisos,
      d.f||'—', d.t||'—', d.d||'—', d.b||'—',
      d.sr||'—', d.lf||'—', d.tp||'—', d.vs||'—', obs
    ];
  }

  if (abaName && rowTipo) {
    const aba = getOrCreateSheet(ss, abaName);
    const hdr = tipo === 'video' ? HDR_VIDEO : tipo === 'display' ? HDR_DISPLAY : HDR_AUDIO;
    inicializarAba(aba, hdr);
    aba.appendRow(rowTipo);
    aplicarZebra(aba);
    colorirStatus(aba, aba.getLastRow(), 5);
    aba.autoResizeColumns(1, aba.getLastColumn());
  }

  const abaC = getOrCreateSheet(ss, ABA_CONSOLIDADO);
  inicializarAba(abaC, HDR_CONSOLIDADO);
  abaC.appendRow([
    id, timestamp, usuario, arquivo, status, erros, avisos,
    tipo.toUpperCase(), data.dados || '—', obs
  ]);
  aplicarZebra(abaC);
  colorirStatus(abaC, abaC.getLastRow(), 5);
  abaC.autoResizeColumns(1, abaC.getLastColumn());

  return { ok: true, id: id };
}

/* ════════════════════════════════════════
   loadHist
   ════════════════════════════════════════ */
function loadHist(e) {
  const ss  = SpreadsheetApp.openById(SPREADSHEET_ID);
  const aba = ss.getSheetByName(ABA_CONSOLIDADO);
  if (!aba || aba.getLastRow() <= 1) return { logs: [] };
  const dados = aba.getRange(2, 1, aba.getLastRow() - 1, HDR_CONSOLIDADO.length).getValues();
  const logs  = dados.map(r => ({
    id: r[0], timestamp: r[1] ? new Date(r[1]).toISOString() : '',
    usuario: r[2], arquivo: r[3], status: r[4],
    erros: r[5], avisos: r[6], tipo: r[7], dados: r[8], obs: r[9]
  }));
  return { logs: logs };
}

/* ════════════════════════════════════════
   loadUserPerfil
   ════════════════════════════════════════ */
function loadUserPerfil() {
  const email = Session.getActiveUser().getEmail();
  const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
  const aba   = ss.getSheetByName(ABA_EQUIPE);
  let nome = email, perfil = 'Operador';
  if (aba) {
    const dados = aba.getDataRange().getValues();
    for (let i = 1; i < dados.length; i++) {
      if ((dados[i][2] || '').toLowerCase() === email.toLowerCase()) {
        nome = dados[i][0] || email;
        perfil = dados[i][1] || 'Operador';
        break;
      }
    }
  }
  if (ADMIN_EMAILS.map(e => e.toLowerCase()).includes(email.toLowerCase())) perfil = 'Admin';
  return { email: email, nome: nome, perfil: perfil };
}

/* ════════════════════════════════════════
   loadExcecoes
   ════════════════════════════════════════ */
function loadExcecoes() {
  const ss  = SpreadsheetApp.openById(SPREADSHEET_ID);
  const aba = ss.getSheetByName(ABA_EXCECOES);
  if (!aba || aba.getLastRow() <= 1) return { excecoes: [] };
  const dados = aba.getRange(2, 1, aba.getLastRow() - 1, 6).getValues();
  const excecoes = dados.map(r => ({
    timestamp: r[0], tipo: r[1], justificativa: r[2],
    status: r[3], usuario: r[4], dados: r[5]
  }));
  return { excecoes: excecoes };
}

/* ════════════════════════════════════════
   saveExcecao
   ════════════════════════════════════════ */
function saveExcecao(payload) {
  const ss  = SpreadsheetApp.openById(SPREADSHEET_ID);
  const aba = getOrCreateSheet(ss, ABA_EXCECOES);
  const data = payload.payload || {};
  inicializarAba(aba, ['Timestamp','Tipo','Justificativa','Status','Usuário','Dados']);
  aba.appendRow([
    data.timestamp || new Date().toISOString(),
    data.tipo || '', data.justificativa || '',
    data.status || 'pendente', data.usuario || '', data.dados || ''
  ]);
  try { notificarAdminsExcecao(data); } catch (e) {}
  return { ok: true };
}

function notificarAdminsExcecao(data) {
  const assunto = '[F5 FT Validator] Nova exceção — ' + (data.tipo || '');
  const corpo   = 'Nova solicitação de exceção enviada.\n\n'
    + 'Tipo: ' + data.tipo + '\nUsuário: ' + data.usuario
    + '\nJustificativa: ' + data.justificativa + '\nData/Hora: ' + data.timestamp + '\n';
  ADMIN_EMAILS.forEach(email => MailApp.sendEmail({ to: email, subject: assunto, body: corpo }));
}

/* ════════════════════════════════════════
   onOpen — menus
   ════════════════════════════════════════ */
function onOpen() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  _garantirAbas(ss);
  const ui    = SpreadsheetApp.getUi();
  const email = Session.getActiveUser().getEmail();
  const isAdm = ADMIN_EMAILS.map(e => e.toLowerCase()).includes(email.toLowerCase());

  /* ── FT Validator ── */
  const menu = ui.createMenu('🎯 FT Validator');
  menu.addItem('🌐 Abrir Validador', 'abrirValidador');
  menu.addSeparator();
  menu.addItem('📋 Consolidado', 'irParaConsolidado');
  menu.addItem('📊 Dashboard',   'irParaDash');
  menu.addSeparator();
  menu.addItem('🎵 Log Audio',   'irParaAudio');
  menu.addItem('🖥️ Log Display', 'irParaDisplay');
  menu.addItem('🎬 Log Video',   'irParaVideo');
  menu.addToUi();

  /* ── Limpar ── */
  const menuLimpar = ui.createMenu('🗑️ Limpar');
  menuLimpar.addItem('🎵 Limpar Audio',      'limparAudio');
  menuLimpar.addItem('🖥️ Limpar Display',    'limparDisplay');
  menuLimpar.addItem('🎬 Limpar Video',       'limparVideo');
  menuLimpar.addSeparator();
  menuLimpar.addItem('📋 Limpar Consolidado', 'limparConsolidado');
  menuLimpar.addSeparator();
  menuLimpar.addItem('🗑️ Limpar Tudo',       'limparTudo');
  menuLimpar.addToUi();

  /* ── Admin ── */
  if (isAdm) {
    const menuAdmin = ui.createMenu('⚙️ Admin');
    menuAdmin.addItem('🔄 Atualizar Tudo',     'atualizarTudo');
    menuAdmin.addSeparator();
    menuAdmin.addItem('⚠️  Exceções Pendentes', 'irParaExcecoes');
    menuAdmin.addSeparator();
    menuAdmin.addItem('🔧 Recriar Abas',        'recriarAbas');
    menuAdmin.addItem('🎨 Reformatar Abas',      'reformatarAbas');
    menuAdmin.addItem('📊 Reformatar Dashboard', 'reformatarDash');
    menuAdmin.addToUi();
  }
}

/* ════════════════════════════════════════
   Funções de menu — navegação
   ════════════════════════════════════════ */
function abrirValidador() {
  const url = 'https://script.google.com/macros/s/AKfycbym0772425DQEUrNQn9TZc6C-wdRuqU1_erQVSoWzV-MEBbyCN4DOfJkaSd90cdVZHjSA/exec';
  const html = HtmlService.createHtmlOutput(
    '<style>*{margin:0;padding:0;box-sizing:border-box}' +
    'body{font-family:sans-serif;padding:16px 14px}' +
    'p{font-size:12px;color:#555;margin-bottom:12px}' +
    'a{display:block;padding:12px;background:#1F36C7;color:#fff;border-radius:8px;' +
    'text-decoration:none;font-size:13px;font-weight:600;text-align:center}' +
    '</style>' +
    '<p>🎯 FT Flashtalking Validator</p>' +
    '<a href="' + url + '" target="_blank">🌐 Abrir Validador</a>'
  ).setWidth(270).setHeight(200);
  SpreadsheetApp.getUi().showModelessDialog(html, 'FT Validator');
}

function irParaDash()        { _irPara(ABA_DASH); }
function irParaConsolidado() { _irPara(ABA_CONSOLIDADO); }
function irParaVideo()       { _irPara(ABA_VIDEO); }
function irParaDisplay()     { _irPara(ABA_DISPLAY); }
function irParaAudio()       { _irPara(ABA_AUDIO); }
function irParaExcecoes()    { _irPara(ABA_EXCECOES); }

function _irPara(nomeAba) {
  const ss  = SpreadsheetApp.getActiveSpreadsheet();
  const aba = ss.getSheetByName(nomeAba);
  if (aba) ss.setActiveSheet(aba);
  else SpreadsheetApp.getUi().alert('Aba "' + nomeAba + '" não encontrada.');
}

function recriarAbas() {
  const ui = SpreadsheetApp.getUi();
  const r  = ui.alert('Recriar abas?',
    'Cria todas as abas que não existirem. Dados existentes são preservados.',
    ui.ButtonSet.OK_CANCEL);
  if (r !== ui.Button.OK) return;
  _garantirAbas(SpreadsheetApp.getActiveSpreadsheet());
  ui.alert('✅ Abas verificadas/criadas com sucesso.');
}

/* ════════════════════════════════════════
   Funções de menu — limpar
   ════════════════════════════════════════ */
function limparAudio()       { _limparAba(ABA_AUDIO);       }
function limparDisplay()     { _limparAba(ABA_DISPLAY);     }
function limparVideo()       { _limparAba(ABA_VIDEO);       }
function limparConsolidado() { _limparAba(ABA_CONSOLIDADO); }

function limparTudo() {
  const ui = SpreadsheetApp.getUi();
  const r  = ui.alert('Limpar tudo?',
    'Apaga os dados de Audio, Display, Video e Consolidado. Dashboard e Exceções não são afetados.',
    ui.ButtonSet.OK_CANCEL);
  if (r !== ui.Button.OK) return;
  [ABA_AUDIO, ABA_DISPLAY, ABA_VIDEO, ABA_CONSOLIDADO].forEach(nome => _limparAba(nome, true));
  const ss   = SpreadsheetApp.openById(SPREADSHEET_ID);
  const dash = ss.getSheetByName(ABA_DASH);
  if (dash) _inicializarDash(dash);
  ui.alert('✅ Todas as abas de log foram limpas e o Dashboard foi atualizado.');
}

function _limparAba(nomeAba, silencioso) {
  const ss  = SpreadsheetApp.openById(SPREADSHEET_ID);
  const aba = ss.getSheetByName(nomeAba);
  if (!aba) {
    if (!silencioso) SpreadsheetApp.getUi().alert('Aba "' + nomeAba + '" não encontrada.');
    return;
  }
  const last = aba.getLastRow();
  if (last <= 1) {
    if (!silencioso) SpreadsheetApp.getUi().alert('Aba "' + nomeAba + '" já está vazia.');
    return;
  }
  aba.deleteRows(2, last - 1);
  if (!silencioso) SpreadsheetApp.getUi().alert('✅ Aba "' + nomeAba + '" limpa com sucesso.');
}

/* ════════════════════════════════════════
   _garantirAbas
   ════════════════════════════════════════ */
function _garantirAbas(ss) {
  const ordem = [ABA_DASH, ABA_CONSOLIDADO, ABA_AUDIO, ABA_DISPLAY, ABA_VIDEO, ABA_EXCECOES];
  var criouAlguma = false;
  ordem.forEach(nome => { if (!ss.getSheetByName(nome)) { ss.insertSheet(nome); criouAlguma = true; } });
  inicializarAba(ss.getSheetByName(ABA_VIDEO),       HDR_VIDEO);
  inicializarAba(ss.getSheetByName(ABA_DISPLAY),     HDR_DISPLAY);
  inicializarAba(ss.getSheetByName(ABA_AUDIO),       HDR_AUDIO);
  inicializarAba(ss.getSheetByName(ABA_CONSOLIDADO), HDR_CONSOLIDADO);
  inicializarAba(ss.getSheetByName(ABA_EXCECOES), ['Timestamp','Tipo','Justificativa','Status','Usuário','Dados']);
  if (criouAlguma) _inicializarDash(ss.getSheetByName(ABA_DASH));
  _reordenarAbas(ss, ordem);
}

function _reordenarAbas(ss, ordem) {
  try {
    ordem.forEach((nome, idx) => {
      const aba = ss.getSheetByName(nome);
      if (!aba) return;
      ss.setActiveSheet(aba);
      ss.moveActiveSheet(idx + 1);
    });
    const dash = ss.getSheetByName(ABA_DASH);
    if (dash) ss.setActiveSheet(dash);
  } catch (e) {}
}

/* ════════════════════════════════════════
   _inicializarDash
   ════════════════════════════════════════ */
function _inicializarDash(aba) {
  if (!aba) return;
  const ss  = aba.getParent();
  const pos = aba.getIndex();
  ss.deleteSheet(aba);
  aba = ss.insertSheet(ABA_DASH, pos - 1);

  aba.getRange('A1:B1').merge()
     .setValue('📊 Dashboard — FT Flashtalking Validator')
     .setBackground(COR_HEADER).setFontColor('#ffffff')
     .setFontWeight('bold').setFontSize(13)
     .setVerticalAlignment('middle').setHorizontalAlignment('center');

  _dashLabel(aba, 3, 1, 'Total de Validações', true);
  aba.getRange('B3').setFormula('=IFERROR(COUNTA(CONSOLIDADO!A2:A);0)');
  _dashValor(aba, 3, 2);

  _dashSecao(aba, 5, 'Por Tipo');
  _dashLabel(aba, 6, 1, 'Video',   false);
  _dashLabel(aba, 7, 1, 'Display', false);
  _dashLabel(aba, 8, 1, 'Audio',   false);
  aba.getRange('B6').setFormula('=IFERROR(COUNTIF(CONSOLIDADO!H:H;"VIDEO");0)');
  aba.getRange('B7').setFormula('=IFERROR(COUNTIF(CONSOLIDADO!H:H;"DISPLAY");0)');
  aba.getRange('B8').setFormula('=IFERROR(COUNTIF(CONSOLIDADO!H:H;"AUDIO");0)');
  _dashValor(aba, 6, 2); _dashValor(aba, 7, 2); _dashValor(aba, 8, 2);

  _dashSecao(aba, 10, 'Por Status');
  _dashLabel(aba, 11, 1, 'Aprovados',  false);
  _dashLabel(aba, 12, 1, 'Com Avisos', false);
  _dashLabel(aba, 13, 1, 'Reprovados', false);
  aba.getRange('B11').setFormula('=IFERROR(COUNTIF(CONSOLIDADO!E:E;"APROVADO");0)');
  aba.getRange('B12').setFormula('=IFERROR(COUNTIF(CONSOLIDADO!E:E;"AVISO");0)');
  aba.getRange('B13').setFormula('=IFERROR(COUNTIF(CONSOLIDADO!E:E;"REPROVADO");0)');
  aba.getRange('B11').setBackground('#e8f5e9').setFontColor('#2e7d32').setFontWeight('bold');
  aba.getRange('B12').setBackground('#fff3e0').setFontColor('#b45309').setFontWeight('bold');
  aba.getRange('B13').setBackground('#ffebee').setFontColor('#c62828').setFontWeight('bold');

  aba.getRange('A15').setValue('Taxa de Aprovação')
     .setBackground('#E8ECFB').setFontColor(COR_HEADER)
     .setFontWeight('bold').setVerticalAlignment('middle');
  aba.getRange('B15').setFormula('=IFERROR(IF(B3=0;"—";TEXT(B11/B3;"0.0%"));"—")')
     .setBackground('#E8ECFB').setFontColor(COR_HEADER)
     .setFontWeight('bold').setHorizontalAlignment('center').setVerticalAlignment('middle');

  aba.getRange('A1:A15').setVerticalAlignment('middle');
  aba.getRange('B1:B15').setHorizontalAlignment('center').setVerticalAlignment('middle');
  aba.setColumnWidth(1, 240); aba.setColumnWidth(2, 120);
  for (var r = 1; r <= 15; r++) aba.setRowHeight(r, 32);
  aba.setRowHeight(1, 44);
  [2, 4, 9, 14].forEach(r => aba.setRowHeight(r, 10));

  const finalRows = aba.getMaxRows();
  if (finalRows > 15) aba.deleteRows(16, finalRows - 15);
  const finalCols = aba.getMaxColumns();
  if (finalCols > 2) aba.deleteColumns(3, finalCols - 2);

  aba.setHiddenGridlines(true);
  aba.setFrozenRows(1);
  SpreadsheetApp.flush();
}

function _dashLabel(aba, row, col, txt, bold) {
  const c = aba.getRange(row, col).setValue(txt).setVerticalAlignment('middle');
  if (bold) c.setFontWeight('bold');
  aba.setRowHeight(row, 30);
}

function _dashValor(aba, row, col) {
  aba.getRange(row, col).setHorizontalAlignment('center')
     .setVerticalAlignment('middle').setFontWeight('bold');
}

function _dashSecao(aba, row, txt) {
  aba.getRange(row, 1, 1, 2).merge()
     .setValue(txt).setBackground('#E8ECFB').setFontColor(COR_HEADER)
     .setFontWeight('bold').setFontSize(10)
     .setVerticalAlignment('middle').setHorizontalAlignment('left');
  aba.setRowHeight(row, 26);
}

/* ════════════════════════════════════════
   reformatarAbas / reformatarDash / atualizarTudo
   ════════════════════════════════════════ */
function reformatarAbas() {
  const ss   = SpreadsheetApp.openById(SPREADSHEET_ID);
  const abas = [
    { nome: ABA_VIDEO,       hdr: HDR_VIDEO },
    { nome: ABA_DISPLAY,     hdr: HDR_DISPLAY },
    { nome: ABA_AUDIO,       hdr: HDR_AUDIO },
    { nome: ABA_CONSOLIDADO, hdr: HDR_CONSOLIDADO },
    { nome: ABA_EXCECOES,    hdr: ['Timestamp','Tipo','Justificativa','Status','Usuário','Dados'] }
  ];
  abas.forEach(a => {
    const aba = ss.getSheetByName(a.nome);
    if (!aba) return;
    if (aba.getLastRow() >= 1) formatarHeader(aba, a.hdr.length);
    const maxCol = aba.getLastColumn(), totalCol = aba.getMaxColumns();
    if (totalCol > maxCol && maxCol > 0) aba.deleteColumns(maxCol + 1, totalCol - maxCol);
    if (maxCol > 0) {
      aba.getRange(1, 1, Math.max(1, aba.getLastRow()), maxCol)
         .setVerticalAlignment('middle').setHorizontalAlignment('center');
      aba.autoResizeColumns(1, maxCol);
    }
  });
  SpreadsheetApp.flush();
  SpreadsheetApp.getUi().alert('✅ Formatação aplicada em todas as abas.');
}

function reformatarDash() {
  const ss   = SpreadsheetApp.openById(SPREADSHEET_ID);
  const dash = ss.getSheetByName(ABA_DASH);
  if (!dash) { SpreadsheetApp.getUi().alert('Aba DASH não encontrada.'); return; }
  _inicializarDash(dash);
  SpreadsheetApp.flush();
  SpreadsheetApp.getUi().alert('✅ Dashboard reconstruído com sucesso.');
}

function atualizarTudo() {
  const ss   = SpreadsheetApp.openById(SPREADSHEET_ID);
  const abas = [
    { nome: ABA_VIDEO,       hdr: HDR_VIDEO },
    { nome: ABA_DISPLAY,     hdr: HDR_DISPLAY },
    { nome: ABA_AUDIO,       hdr: HDR_AUDIO },
    { nome: ABA_CONSOLIDADO, hdr: HDR_CONSOLIDADO },
    { nome: ABA_EXCECOES,    hdr: ['Timestamp','Tipo','Justificativa','Status','Usuário','Dados'] }
  ];
  abas.forEach(a => {
    const aba = ss.getSheetByName(a.nome);
    if (!aba) return;
    if (aba.getLastRow() >= 1) formatarHeader(aba, a.hdr.length);
    const maxCol = aba.getLastColumn(), totalCol = aba.getMaxColumns();
    if (totalCol > maxCol && maxCol > 0) aba.deleteColumns(maxCol + 1, totalCol - maxCol);
    if (maxCol > 0) {
      aba.getRange(1, 1, Math.max(1, aba.getLastRow()), maxCol)
         .setVerticalAlignment('middle').setHorizontalAlignment('center');
      aba.autoResizeColumns(1, maxCol);
    }
  });
  const dash = ss.getSheetByName(ABA_DASH);
  if (dash) _inicializarDash(dash);
  SpreadsheetApp.flush();
  SpreadsheetApp.getUi().alert('✅ Tudo atualizado com sucesso.');
}

/* ════════════════════════════════════════
   Utilitários
   ════════════════════════════════════════ */
function getOrCreateSheet(ss, nome) {
  return ss.getSheetByName(nome) || ss.insertSheet(nome);
}

function inicializarAba(aba, headers) {
  if (!aba || aba.getLastRow() > 0) return;
  aba.getRange(1, 1, 1, headers.length).setValues([headers]);
  formatarHeader(aba, headers.length);
  formatarAba(aba);
}

function formatarHeader(aba, numCols) {
  aba.getRange(1, 1, 1, numCols)
     .setBackground(COR_HEADER).setFontColor('#ffffff')
     .setFontWeight('bold').setVerticalAlignment('middle')
     .setHorizontalAlignment('center');
  aba.setFrozenRows(1);
  aba.setRowHeight(1, 36);
}

function formatarAba(aba) {
  const maxCol = aba.getLastColumn(), totalCol = aba.getMaxColumns();
  if (totalCol > maxCol && maxCol > 0) aba.deleteColumns(maxCol + 1, totalCol - maxCol);
  if (maxCol > 0) {
    aba.getRange(1, 1, 1, maxCol).setHorizontalAlignment('center').setVerticalAlignment('middle');
    aba.autoResizeColumns(1, maxCol);
  }
  SpreadsheetApp.flush();
}

function aplicarZebra(aba) {
  const last = aba.getLastRow(), numCols = aba.getLastColumn();
  if (last < 2) return;
  for (let i = 2; i <= last; i++) {
    aba.getRange(i, 1, 1, numCols).setBackground(i % 2 === 0 ? COR_ZEBRA : '#ffffff');
  }
}

function colorirStatus(aba, row, col) {
  const cell = aba.getRange(row, col), val = cell.getValue();
  if (val === 'APROVADO')  cell.setBackground('#e8f5e9').setFontColor('#2e7d32');
  if (val === 'AVISO')     cell.setBackground('#fff3e0').setFontColor('#b45309');
  if (val === 'REPROVADO') cell.setBackground('#ffebee').setFontColor('#c62828');
}

function gerarId(ss, tipo) {
  const prefixos = { video: 'VID', display: 'DSP', audio: 'AUD' };
  const prefix   = prefixos[tipo] || 'LOG';
  const abaMap   = { video: ABA_VIDEO, display: ABA_DISPLAY, audio: ABA_AUDIO };
  const aba      = ss.getSheetByName(abaMap[tipo]);
  const n        = aba ? Math.max(0, aba.getLastRow() - 1) + 1 : 1;
  return prefix + '-' + String(n).padStart(4, '0');
}

function _parseDados(dadosStr) {
  try { return JSON.parse(dadosStr || '{}'); } catch (e) { return {}; }
}

/* ════════════════════════════════════════
   Trigger instalável
   ════════════════════════════════════════ */
function instalarTriggers() {
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('onOpen')
    .forSpreadsheet(SPREADSHEET_ID)
    .onOpen()
    .create();
}
