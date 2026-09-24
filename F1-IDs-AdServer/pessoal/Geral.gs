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

/***************************************
 * 🎨 CABEÇALHO
 ***************************************/

function _formatarCabecalhoGeral(geral) {
  const cabecalhos = ["Data", "ID Meta/TikTok/Youtube", "ID Amazon", "Ad Name", "Plataforma", "Origem"];

  const headerRange = geral.getRange(1, 1, 1, cabecalhos.length);
  headerRange.setValues([cabecalhos]);
  headerRange.setBackground("#1F36C7");
  headerRange.setFontColor("#FFFFFF");
  headerRange.setFontSize(11);
  headerRange.setFontWeight("bold");
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  geral.setRowHeight(1, 34);

  // Congela só linha 1 — sem colunas
  geral.setFrozenColumns(0);
  geral.setFrozenRows(1);

  // Remove colunas excedentes além de F (6)
  if (geral.getMaxColumns() > 6) {
    geral.deleteColumns(7, geral.getMaxColumns() - 6);
  }

  // Filtro automático
  if (geral.getFilter()) geral.getFilter().remove();
  geral.getRange(1, 1, 1, cabecalhos.length).createFilter();
}

/***************************************
 * 📐 COLUNAS
 ***************************************/

function _configurarColunasGeral(geral) {
  // Larguras proporcionais somando ~1800px — sem scroll horizontal
  geral.setColumnWidth(1, 100);  // Data
  geral.setColumnWidth(2, 200);  // ID Meta/TikTok/Youtube
  geral.setColumnWidth(3, 200);  // ID Amazon
  geral.setColumnWidth(4, 1050); // Ad Name
  geral.setColumnWidth(5, 100);  // Plataforma
  geral.setColumnWidth(6, 200);  // Origem
}

/***************************************
 * 🔁 DUPLICIDADE NO GERAL
 ***************************************/

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