// ============================================================
// Historico.gs
// NC Tool | Unilever BR x Grasp — F4 Pessoal
// Rastreia edições nas abas monitoradas e registra na aba
// "📋 Histórico" com: data/hora, usuário, aba, célula,
// valor anterior e valor novo.
//
// ABAS MONITORADAS
// ─────────────────
//   • Dicionário
//   • Influencer Name Tool
//
// COMO FUNCIONA
// ─────────────
// O trigger onEdit é instalado automaticamente na primeira vez
// que o menu "Instalar monitoramento" é acionado.
// Edições nas abas monitoradas são registradas silenciosamente.
// ============================================================

var HIST_SHEET_ID    = '16OdPmc-SeqXn1VefT0xRsIQJ-LdICRfUZnahsARuw4w';
var HIST_ABA_NOME    = '📋 Histórico';
var HIST_ABAS_MON    = ['Dicionário', 'Influencer Name Tool'];
var HIST_NUM_COLS    = 6;
var HIST_MAX_LINHAS  = 5000;

// ── Trigger onEdit ─────────────────────────────────────────
function onEditHistorico(e) {
  try {
    if (!e || !e.range) return;
    var aba     = e.range.getSheet();
    var abaNome = aba.getName();

    if (HIST_ABAS_MON.indexOf(abaNome) < 0) return;

    var ss      = SpreadsheetApp.openById(HIST_SHEET_ID);
    var histAba = _histGarantirAba(ss);

    var usuario     = Session.getActiveUser().getEmail() || 'desconhecido';
    var dataHora    = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm:ss');
    var celula      = e.range.getA1Notation();
    var valorAntes  = String(e.oldValue !== undefined ? e.oldValue : '');
    var valorDepois = String(e.value    !== undefined ? e.value    : '');

    if (valorAntes === valorDepois) return;

    var lastRow = histAba.getLastRow();
    if (lastRow >= HIST_MAX_LINHAS + 1) {
      histAba.deleteRow(2);
    }

    histAba.appendRow([dataHora, usuario, abaNome, celula, valorAntes, valorDepois]);
    SpreadsheetApp.flush();
  } catch (err) {
    Logger.log('Histórico erro: ' + err.message);
  }
}

// ── Instalar trigger ───────────────────────────────────────
function instalarMonitoramento() {
  _histGarantirTrigger();
  var ss = SpreadsheetApp.openById(HIST_SHEET_ID);
  _histGarantirAba(ss);
  SpreadsheetApp.getUi().alert('✅ Monitoramento instalado. Edições em "' + HIST_ABAS_MON.join('" e "') + '" serão registradas no Histórico.');
}

// ── Limpar histórico ───────────────────────────────────────
function limparHistorico() {
  var ui   = SpreadsheetApp.getUi();
  var resp = ui.alert('Limpar Histórico', 'Isso apaga todos os registros. Confirma?', ui.ButtonSet.OK_CANCEL);
  if (resp !== ui.Button.OK) return;

  var ss      = SpreadsheetApp.openById(HIST_SHEET_ID);
  var histAba = ss.getSheetByName(HIST_ABA_NOME);
  if (!histAba) return;

  var lastRow = histAba.getLastRow();
  if (lastRow > 1) histAba.deleteRows(2, lastRow - 1);
  SpreadsheetApp.flush();
  ui.alert('✅ Histórico limpo.');
}

// ── Criar/garantir aba Histórico ──────────────────────────
function _histGarantirAba(ss) {
  var aba = ss.getSheetByName(HIST_ABA_NOME);
  if (!aba) {
    aba = ss.insertSheet(HIST_ABA_NOME);
  }

  // Remover colunas extras além de A–F (força mesmo com colunas vazias)
  while (aba.getMaxColumns() > HIST_NUM_COLS) {
    aba.deleteColumns(HIST_NUM_COLS + 1, aba.getMaxColumns() - HIST_NUM_COLS);
  }

  // Cabeçalho
  var hdr = aba.getRange(1, 1, 1, HIST_NUM_COLS);
  hdr.setValues([['Data/Hora', 'Usuário', 'Aba', 'Célula', 'Valor Anterior', 'Valor Novo']]);
  hdr.setBackground('#1F36C7').setFontColor('#FFFFFF')
     .setFontWeight('bold').setFontSize(11).setFontFamily('DM Sans')
     .setHorizontalAlignment('center').setVerticalAlignment('middle')
     .setWrap(false);
  aba.setRowHeight(1, 32);

  // Larguras
  aba.setColumnWidth(1, 150); // Data/Hora
  aba.setColumnWidth(2, 220); // Usuário
  aba.setColumnWidth(3, 180); // Aba
  aba.setColumnWidth(4, 80);  // Célula
  aba.setColumnWidth(5, 250); // Valor Anterior
  aba.setColumnWidth(6, 250); // Valor Novo

  // Filtro
  try { aba.getFilter().remove(); } catch(e) {}
  aba.getRange(1, 1, Math.max(aba.getLastRow(), 2), HIST_NUM_COLS).createFilter();

  aba.setFrozenRows(1);
  SpreadsheetApp.flush();
  return aba;
}

// ── Garantir trigger único ────────────────────────────────
function _histGarantirTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'onEditHistorico') return;
  }
  ScriptApp.newTrigger('onEditHistorico')
    .forSpreadsheet(SpreadsheetApp.openById(HIST_SHEET_ID))
    .onEdit()
    .create();
  Logger.log('✅ Trigger onEdit instalado para onEditHistorico.');
}