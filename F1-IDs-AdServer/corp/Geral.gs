/***************************************
 * 📋 GERAL — Formatação
 ***************************************/

function formatarGeral() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const geral = ss.getSheetByName(CONFIG.abas.geral);

  _formatarCabecalhoGeral(geral);
  _configurarColunasGeral(geral);

  log("formatarGeral: formatação aplicada.");
}

function _formatarCabecalhoGeral(geral) {
  const cabecalhos = ["Data", "ID Meta/TikTok/Youtube", "ID Amazon", "Ad Name", "Plataforma", "Origem"];

  const headerRange = geral.getRange(1, 1, 1, cabecalhos.length);
  headerRange.setValues([cabecalhos]);
  headerRange.setBackground("#1F36C7").setFontColor("#FFFFFF")
    .setFontSize(11).setFontWeight("bold")
    .setHorizontalAlignment("center").setVerticalAlignment("middle");
  geral.setRowHeight(1, 34);
  geral.setFrozenColumns(0);
  geral.setFrozenRows(1);

  if (geral.getMaxColumns() > 6) {
    geral.deleteColumns(7, geral.getMaxColumns() - 6);
  }

  if (geral.getFilter()) geral.getFilter().remove();
  geral.getRange(1, 1, 1, cabecalhos.length).createFilter();
}

function _configurarColunasGeral(geral) {
  geral.setColumnWidth(1, 100);
  geral.setColumnWidth(2, 200);
  geral.setColumnWidth(3, 200);
  geral.setColumnWidth(4, 1050);
  geral.setColumnWidth(5, 100);
  geral.setColumnWidth(6, 200);
}

function limparDuplicadosGeral() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const col   = CONFIG.colunas.geral;
  const geral = ss.getSheetByName(CONFIG.abas.geral);
  const last  = geral.getLastRow();

  if (last < 2) return;

  const range  = geral.getRange(2, col.idSX, last - 1, 2);
  const values = range.getValues();
  const mapa   = {};

  values.forEach((row, i) => {
    row.forEach(val => {
      if (!val) return;
      if (!mapa[val]) mapa[val] = [];
      mapa[val].push(i + 2);
    });
  });

  range.setBackground(null);
  Object.values(mapa).forEach(rows => {
    if (rows.length > 1) {
      rows.forEach(r => geral.getRange(r, col.idSX, 1, 2).setBackground("#fef9c3"));
      log("Duplicado encontrado no Geral: linha(s) " + rows.join(", "));
    }
  });
}
