// ============================================================
// NC Tool | F3 — Validator  ·  Setup.gs  (Backup)
// ============================================================

var SETUP_SHEET_ID = "1Dthsg7TWuYfQi-QU1yCkRJEhFdXKQ3I1wNO5Y90CCEQ";
var SETUP_DICT_ID  = "1EpIBzL99_Dh03MySNE-hHiToeN4HiN5yeHSf6XLEEBw";

var COR_HEADER  = '#0F1B6E'; // azul escuro — todos os headers de tabela
var COR_SECAO   = '#E8ECFB'; // azul claro — seções do Dashboard/Config
var COR_TEXTO   = '#0F1B6E'; // texto das seções

// ── SETUP COMPLETO ───────────────────────────────────────────
function setupPlanilha() {
  var ss = SpreadsheetApp.openById(SETUP_SHEET_ID);

  // Renomear aba Excecoes → Exceções se existir
  _renomearExcecoes(ss);

  _criarDashboard(ss);
  _criarArquivo(ss);
  _criarLog(ss);
  _criarErros(ss);
  _criarExcecoes(ss);
  _criarConfig(ss);
  _criarClientes(ss);

  SpreadsheetApp.flush();

  // Reordenar abas
  var ordem = ['Dashboard','Arquivo','Log','Erros','Exceções','Config','Clientes'];
  for (var i = 0; i < ordem.length; i++) {
    var aba = ss.getSheetByName(ordem[i]);
    if (!aba) continue;
    try { ss.setActiveSheet(aba); ss.moveActiveSheet(i + 1); } catch(e) {}
    SpreadsheetApp.flush();
  }

  ss.toast('✅ Setup concluído!', 'NC Tool', 5);
}

// ── RENOMEAR EXCECOES ────────────────────────────────────────
function _renomearExcecoes(ss) {
  try {
    var antiga = ss.getSheetByName('Excecoes');
    if (antiga) antiga.setName('Exceções');
  } catch(e) {}
}

// ── ARQUIVAMENTO (6 meses) ───────────────────────────────────
function arquivarLogsAntigos() {
  var ss  = SpreadsheetApp.openById(SETUP_SHEET_ID);
  var log = ss.getSheetByName('Log');
  var logLastRow = log ? log.getLastRow() : 0;
  if (!log || logLastRow < 2) return;
  var limite = new Date();
  limite.setMonth(limite.getMonth() - 6);
  var arquivo = ss.getSheetByName('Arquivo') || ss.insertSheet('Arquivo');
  var arquivoLastRow = arquivo.getLastRow();
  if (arquivoLastRow === 0) {
    arquivo.appendRow(['ID','Timestamp','Usuário','Cliente','Fonte','Arquivo','Plataforma','Total','Corretos','Erros','Score%']);
    arquivo.getRange(1,1,1,11).setFontWeight('bold').setBackground(COR_HEADER).setFontColor('#fff');
    arquivoLastRow = 1;
  }
  var data = log.getRange(2, 1, logLastRow - 1, 11).getValues();
  var manter = [], mover = [];
  data.forEach(function(row) {
    (new Date(row[1]) < limite ? mover : manter).push(row);
  });
  if (mover.length) {
    arquivo.getRange(arquivoLastRow + 1, 1, mover.length, 11).setValues(mover);
    log.getRange(2, 1, logLastRow - 1, 11).clearContent();
    if (manter.length) log.getRange(2, 1, manter.length, 11).setValues(manter);
  }
}

function instalarTriggerArquivamento() {
  ScriptApp.getProjectTriggers().forEach(function(t) {
    if (t.getHandlerFunction() === 'arquivarLogsAntigos') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('arquivarLogsAntigos').timeBased().onMonthDay(1).atHour(3).create();
  SpreadsheetApp.getUi().alert('Trigger instalado!');
}

function instalarTriggerMerge() {
  ScriptApp.getProjectTriggers().forEach(function(t) {
    if (t.getHandlerFunction() === 'menuMergeDict') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('menuMergeDict').timeBased().onWeekDay(ScriptApp.WeekDay.SUNDAY).atHour(3).create();
  SpreadsheetApp.getUi().alert('Trigger semanal instalado!');
}

// ── HELPERS ──────────────────────────────────────────────────
function _limitarColunas(aba, manter) {
  SpreadsheetApp.flush();
  var total = aba.getMaxColumns();
  if (total > manter) {
    try { aba.deleteColumns(manter + 1, total - manter); } catch(e) {}
  }
}

function _hdrSetup(aba, ncols, bg) {
  aba.getRange(1, 1, 1, ncols)
     .setFontWeight('bold').setFontSize(10)
     .setBackground(bg).setFontColor('#ffffff')
     .setHorizontalAlignment('center').setVerticalAlignment('middle')
     .setWrap(false);
  aba.setRowHeight(1, 34);
  aba.setFrozenRows(1);
  aba.setFrozenColumns(0);
}

function _secao(aba, linha, texto, ncols) {
  var rng = aba.getRange(linha, 1, 1, ncols);
  if (ncols > 1) rng.merge();
  rng.setValue(texto)
     .setFontWeight('bold').setFontSize(11)
     .setBackground(COR_SECAO).setFontColor(COR_TEXTO)
     .setVerticalAlignment('middle').setWrap(false);
  aba.setRowHeight(linha, 34);
}

function _labelValor(aba, linha, label, valor, nota) {
  aba.getRange(linha, 1).setValue(label).setFontWeight('bold').setFontSize(11).setVerticalAlignment('middle');
  aba.getRange(linha, 2).setValue(valor).setHorizontalAlignment('center').setVerticalAlignment('middle').setFontSize(13).setFontWeight('bold');
  if (nota !== undefined) aba.getRange(linha, 3).setValue(nota).setFontSize(11).setVerticalAlignment('middle');
  aba.setRowHeight(linha, 32);
}

// ── ABA DASHBOARD ────────────────────────────────────────────
function _criarDashboard(ss) {
  var aba = ss.getSheetByName('Dashboard') || ss.insertSheet('Dashboard');
  aba.clearContents(); aba.clearFormats();
  _limitarColunas(aba, 2);

  // Linha 1 — título
  aba.getRange('A1:B1').merge()
    .setValue('NC Tool | F3 Validator — Dashboard')
    .setFontSize(14).setFontWeight('bold').setFontColor(COR_TEXTO)
    .setBackground('#FFFFFF').setVerticalAlignment('middle');
  aba.setRowHeight(1, 48);

  // Seção GERAL
  _secao(aba, 2, 'GERAL', 2);
  _labelValor(aba, 3, 'Total de validações',        '=IFERROR(COUNTA(Log!A2:A);0)');
  _labelValor(aba, 4, 'Total de strings validadas',  '=IFERROR(SUM(Log!H2:H);0)');
  _labelValor(aba, 5, 'Total de erros encontrados',  '=IFERROR(SUM(Log!J2:J);0)');
  _labelValor(aba, 6, 'Score médio',                 '=IFERROR(TEXT(SUMIF(Log!H2:H;">"&0;Log!I2:I)/SUMIF(Log!H2:H;">"&0;Log!H2:H);"0%");"-")');
  aba.setRowHeight(7, 20);

  // Seção ÚLTIMA VALIDAÇÃO
  _secao(aba, 8, 'ÚLTIMA VALIDAÇÃO', 2);
  _labelValor(aba, 9,  'Data',     '=IFERROR(TEXT(LOOKUP(2;1/(Log!B2:B<>"");Log!B2:B);"dd/mm/yyyy hh:mm");"-")');
  _labelValor(aba, 10, 'Usuário',  '=IFERROR(LOOKUP(2;1/(Log!C2:C<>"");Log!C2:C);"-")');
  _labelValor(aba, 11, 'Cliente',  '=IFERROR(LOOKUP(2;1/(Log!D2:D<>"");Log!D2:D);"-")');
  _labelValor(aba, 12, 'Fonte',    '=IFERROR(LOOKUP(2;1/(Log!E2:E<>"");Log!E2:E);"-")');
  _labelValor(aba, 13, 'Score',    '=IFERROR(LOOKUP(2;1/(Log!K2:K<>"");Log!K2:K);"-")');
  aba.setRowHeight(14, 20);

  // Seção REGRA MAIS FREQUENTE
  _secao(aba, 15, 'REGRA MAIS FREQUENTE', 2);
  _labelValor(aba, 16, 'Regra',       '=IFERROR(INDEX(Erros!G2:G;MATCH(MAX(COUNTIF(Erros!G2:G;Erros!G2:G));COUNTIF(Erros!G2:G;Erros!G2:G);0);1);"-")');
  _labelValor(aba, 17, 'Ocorrências', '=IFERROR(COUNTIF(Erros!G2:G;INDEX(Erros!G2:G;MATCH(MAX(COUNTIF(Erros!G2:G;Erros!G2:G));COUNTIF(Erros!G2:G;Erros!G2:G);0)));0)');

  aba.setColumnWidth(1, 680);
  aba.setColumnWidth(2, 300);
  aba.setFrozenRows(0);
}

// ── ABA ARQUIVO ──────────────────────────────────────────────
function _criarArquivo(ss) {
  var aba = ss.getSheetByName('Arquivo') || ss.insertSheet('Arquivo');
  aba.clearContents(); aba.clearFormats();
  var hdr = ['ID','Timestamp','Usuário','Cliente','Fonte','Arquivo','Plataforma','Total','Corretos','Erros','Score%'];
  aba.appendRow(hdr);
  _hdrSetup(aba, hdr.length, COR_HEADER);
  var ws = [150, 155, 140, 100, 80, 360, 105, 48, 60, 48, 62];
  ws.forEach(function(w, i){ aba.setColumnWidth(i+1, w); });
  _limitarColunas(aba, hdr.length);
}

// ── ABA LOG ──────────────────────────────────────────────────
function _criarLog(ss) {
  var aba = ss.getSheetByName('Log');
  if (!aba) aba = ss.insertSheet('Log');
  // Só recria o cabeçalho se a aba estava vazia
  if (aba.getLastRow() === 0) {
    var hdr = ['ID','Timestamp','Usuário','Cliente','Fonte','Arquivo','Plataforma','Total','Corretos','Erros','Score%'];
    aba.appendRow(hdr);
  }
  var hdr = ['ID','Timestamp','Usuário','Cliente','Fonte','Arquivo','Plataforma','Total','Corretos','Erros','Score%'];
  aba.getRange(1, 1, 1, hdr.length).setValues([hdr]);
  _hdrSetup(aba, hdr.length, COR_HEADER);
  var ws = [150, 155, 140, 100, 80, 360, 105, 48, 60, 48, 62];
  ws.forEach(function(w, i){ aba.setColumnWidth(i+1, w); });
  _limitarColunas(aba, hdr.length);
}

// ── ABA ERROS ────────────────────────────────────────────────
function _criarErros(ss) {
  var aba = ss.getSheetByName('Erros');
  if (!aba) aba = ss.insertSheet('Erros');
  if (aba.getLastRow() === 0) {
    var hdr = ['LogID','Timestamp','Cliente','Plataforma','Nível','String','Regra','Campo','Valor','Mensagem','Sugestão'];
    aba.appendRow(hdr);
  }
  var hdr = ['LogID','Timestamp','Cliente','Plataforma','Nível','String','Regra','Campo','Valor','Mensagem','Sugestão'];
  aba.getRange(1, 1, 1, hdr.length).setValues([hdr]);
  _hdrSetup(aba, hdr.length, COR_HEADER);
  var ws = [150, 150, 100, 110, 95, 380, 65, 115, 150, 220, 220];
  ws.forEach(function(w, i){ aba.setColumnWidth(i+1, w); });
  _limitarColunas(aba, hdr.length);
}

// ── ABA EXCEÇÕES ─────────────────────────────────────────────
function _criarExcecoes(ss) {
  var aba = ss.getSheetByName('Exceções') || ss.getSheetByName('Excecoes');
  if (!aba) aba = ss.insertSheet('Exceções');
  // Garantir nome correto
  if (aba.getName() === 'Excecoes') aba.setName('Exceções');
  var hdr = ['TX Key','Ad Name','Plataforma','Estrutura','Motivo',
             'Data E-mail','Assunto E-mail','Remetente',
             'Solicitado Por','Data Solicitação','Aprovado Por','Data Aprovação','Status'];
  aba.getRange(1, 1, 1, hdr.length).setValues([hdr]);
  _hdrSetup(aba, hdr.length, COR_HEADER);
  var ws = [80, 300, 90, 90, 130, 110, 280, 140, 120, 110, 120, 110, 80];
  ws.forEach(function(w, i){ aba.setColumnWidth(i+1, w); });
  aba.setFrozenRows(1);
  _limitarColunas(aba, hdr.length);
}

// ── ABA CONFIG ───────────────────────────────────────────────
function _criarConfig(ss) {
  var aba = ss.getSheetByName('Config') || ss.insertSheet('Config');
  aba.clearContents(); aba.clearFormats();
  _limitarColunas(aba, 3);

  // Linha 1 — título
  aba.getRange('A1:C1').merge()
    .setValue('NC Tool | F3 Validator — Configurações')
    .setFontSize(14).setFontWeight('bold').setFontColor(COR_TEXTO)
    .setBackground('#FFFFFF').setVerticalAlignment('middle');
  aba.setRowHeight(1, 48);
  aba.setRowHeight(2, 12);

  // Seção REGRAS DE VALIDAÇÃO
  _secao(aba, 3, 'REGRAS DE VALIDAÇÃO', 3);

  var regras = [
    ['VAL-CL',    true,  'Valida CampaignLocal contra o dicionário'],
    ['VAL-MKT',   true,  'Valida Market (PCAT) contra o dicionário'],
    ['VAL-BUY',   true,  'Valida Buy Model contra lista permitida'],
    ['VAL-OBJ',   true,  'Valida Objetivo contra lista permitida'],
    ['REL0',      true,  'Valida que Campaign Name começa com cnXXXXXX'],
    ['WARN-PLAT', true,  'Avisa quando plataforma do string difere da selecionada']
  ];
  regras.forEach(function(row, i) {
    var r = i + 4;
    aba.getRange(r, 1).setValue(row[0]).setFontWeight('bold').setFontSize(11).setVerticalAlignment('middle');
    aba.getRange(r, 2).setValue(row[1]).setHorizontalAlignment('center').setVerticalAlignment('middle');
    aba.getRange(r, 3).setValue(row[2]).setFontSize(11).setVerticalAlignment('middle');
    aba.setRowHeight(r, 30);
  });
  aba.getRange('B4:B9').setDataValidation(SpreadsheetApp.newDataValidation().requireCheckbox().build());
  aba.setRowHeight(10, 12);

  // Seção SCORE
  _secao(aba, 11, 'SCORE', 3);
  _labelValor(aba, 12, 'Score mínimo OK (verde)',       90, 'Score >= este valor = verde');
  _labelValor(aba, 13, 'Score mínimo aviso (amarelo)',  70, 'Score >= este valor = amarelo (abaixo = vermelho)');
  aba.setRowHeight(14, 12);

  // Seção HISTÓRICO
  _secao(aba, 15, 'HISTÓRICO', 3);
  _labelValor(aba, 16, 'Linhas de log a exibir',   30,  'Registros mostrados no painel de Histórico');
  _labelValor(aba, 17, 'Max erros por validação',  200, 'Limite de erros detalhados salvos por sessão');
  _labelValor(aba, 18, 'Meses de retenção do log', 6,   'Logs mais antigos são arquivados automaticamente');

  aba.setColumnWidth(1, 460);
  aba.setColumnWidth(2, 160);
  aba.setColumnWidth(3, 400);
  aba.setFrozenRows(1);
  aba.setFrozenColumns(0);
}

// ── ABA CLIENTES ─────────────────────────────────────────────
function _criarClientes(ss) {
  var aba = ss.getSheetByName('Clientes') || ss.insertSheet('Clientes');
  aba.clearContents(); aba.clearFormats();
  var hdr = ['Cliente','ID_Dicionario','ID_RM_Template','Plataformas_Ativas','Ativo','Notas'];
  aba.appendRow(hdr);
  aba.appendRow([
    'Unilever BR', SETUP_DICT_ID,
    '144h_vGX9vBnxf1vENnsoseGGqt0pqxITuGuh72XbS-w',
    'Google,YouTube,Meta,TikTok,Programatica,Pinterest,Flashtalking',
    true, 'Cliente principal — Dicionário Grasp 2026'
  ]);
  _hdrSetup(aba, hdr.length, COR_HEADER);
  var ws = [110, 330, 330, 290, 50, 340];
  ws.forEach(function(w, i){ aba.setColumnWidth(i+1, w); });
  aba.getRange('E2:E50').setDataValidation(SpreadsheetApp.newDataValidation().requireCheckbox().build());
  _limitarColunas(aba, hdr.length);
}

// ── PADRONIZAR ABAS (FIX) ────────────────────────────────────
// Recria conteúdo e formatação de todas as abas — não apaga dados das
// abas de log (Log, Erros, Arquivo, Exceções), apenas reaplica o header.
function fixTodasAbas() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  _renomearExcecoes(ss);
  _fixDashboard(ss);
  _fixLog(ss);
  _fixArquivo(ss);
  _fixErros(ss);
  _fixExcecoes(ss);
  _fixConfig(ss);
  _fixClientes(ss);
  SpreadsheetApp.flush();
  SpreadsheetApp.getUi().alert('✅ Abas padronizadas!');
}

// ── FIX individual de cada aba ────────────────────────────────

function _fixDashboard(ss) {
  var aba = ss.getSheetByName('Dashboard');
  if (!aba) { _criarDashboard(ss); return; }
  // Recria conteúdo completo — Dashboard não tem dados, só fórmulas
  _criarDashboard(ss);
}

function _fixArquivo(ss) {
  var aba = ss.getSheetByName('Arquivo');
  if (!aba) { _criarArquivo(ss); return; }
  var hdr = ['ID','Timestamp','Usuário','Cliente','Fonte','Arquivo','Plataforma','Total','Corretos','Erros','Score%'];
  aba.getRange(1, 1, 1, hdr.length).setValues([hdr]);
  _hdrSetup(aba, hdr.length, COR_HEADER);
  var ws = [150, 155, 140, 100, 80, 360, 105, 48, 60, 48, 62];
  ws.forEach(function(w, i){ aba.setColumnWidth(i+1, w); });
  _limitarColunas(aba, hdr.length);
}

function _fixLog(ss) {
  var aba = ss.getSheetByName('Log');
  if (!aba) { _criarLog(ss); return; }
  var hdr = ['ID','Timestamp','Usuário','Cliente','Fonte','Arquivo','Plataforma','Total','Corretos','Erros','Score%'];
  aba.getRange(1, 1, 1, hdr.length).setValues([hdr]);
  _hdrSetup(aba, hdr.length, COR_HEADER);
  var ws = [150, 155, 140, 100, 80, 360, 105, 48, 60, 48, 62];
  ws.forEach(function(w, i){ aba.setColumnWidth(i+1, w); });
  _limitarColunas(aba, hdr.length);
}

function _fixErros(ss) {
  var aba = ss.getSheetByName('Erros');
  if (!aba) { _criarErros(ss); return; }
  var hdr = ['LogID','Timestamp','Cliente','Plataforma','Nível','String','Regra','Campo','Valor','Mensagem','Sugestão'];
  aba.getRange(1, 1, 1, hdr.length).setValues([hdr]);
  _hdrSetup(aba, hdr.length, COR_HEADER);
  var ws = [150, 150, 100, 110, 95, 380, 65, 115, 150, 220, 220];
  ws.forEach(function(w, i){ aba.setColumnWidth(i+1, w); });
  _limitarColunas(aba, hdr.length);
}

function _fixExcecoes(ss) {
  var aba = ss.getSheetByName('Exceções') || ss.getSheetByName('Excecoes');
  if (!aba) { _criarExcecoes(ss); return; }
  if (aba.getName() === 'Excecoes') aba.setName('Exceções');
  var hdr = ['TX Key','Ad Name','Plataforma','Estrutura','Motivo',
             'Data E-mail','Assunto E-mail','Remetente',
             'Solicitado Por','Data Solicitação','Aprovado Por','Data Aprovação','Status'];
  aba.getRange(1, 1, 1, hdr.length).setValues([hdr]);
  _hdrSetup(aba, hdr.length, COR_HEADER);
  var ws = [80, 300, 90, 90, 130, 110, 280, 140, 120, 110, 120, 110, 80];
  ws.forEach(function(w, i){ aba.setColumnWidth(i+1, w); });
  _limitarColunas(aba, hdr.length);
}

function _fixConfig(ss) {
  var aba = ss.getSheetByName('Config');
  if (!aba) { _criarConfig(ss); return; }
  // Recria conteúdo completo — Config não tem dados variáveis
  _criarConfig(ss);
}

function _fixClientes(ss) {
  var aba = ss.getSheetByName('Clientes');
  if (!aba) { _criarClientes(ss); return; }
  var hdr = ['Cliente','ID_Dicionario','ID_RM_Template','Plataformas_Ativas','Ativo','Notas'];
  aba.getRange(1, 1, 1, hdr.length).setValues([hdr]);
  _hdrSetup(aba, hdr.length, COR_HEADER);
  var ws = [110, 330, 330, 290, 50, 340];
  ws.forEach(function(w, i){ aba.setColumnWidth(i+1, w); });
  // Corrige nota da linha Unilever BR se tiver sem acento — leitura/escrita em batch
  var lastRow = aba.getLastRow();
  if (lastRow >= 2) {
    var notas    = aba.getRange(2, 6, lastRow - 1, 1).getValues();
    var alterado = false;
    notas = notas.map(function(row) {
      var nota = String(row[0]);
      if (nota.indexOf('Dicionario') !== -1) {
        alterado = true;
        return [nota.replace(/Dicionario/g, 'Dicionário')];
      }
      return row;
    });
    if (alterado) aba.getRange(2, 6, lastRow - 1, 1).setValues(notas);
  }
  _limitarColunas(aba, hdr.length);
}
