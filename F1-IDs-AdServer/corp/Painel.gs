/***************************************
 * 📊 PAINEL
 ***************************************/

function atualizarPainel() {
  const ss     = SpreadsheetApp.getActiveSpreadsheet();
  const col    = CONFIG.colunas.geral;
  const geral  = ss.getSheetByName(CONFIG.abas.geral);
  const last   = geral.getLastRow();
  const painel = ss.getSheetByName(CONFIG.abas.painel);

  const contagem = {};
  Object.values(CONFIG.plataformas).sort().forEach(p => contagem[p] = 0);

  let datas = [];

  if (last >= 2) {
    const dados = geral.getRange(2, 1, last - 1, col.plataforma).getValues();
    dados.forEach(r => {
      const data       = r[col.data - 1];
      const plataforma = r[col.plataforma - 1] ? r[col.plataforma - 1].toString().trim() : "";
      if (data instanceof Date && data.getFullYear() > 1900) datas.push(data);
      if (contagem.hasOwnProperty(plataforma)) contagem[plataforma]++;
    });
  }

  const total = Object.values(contagem).reduce((a, b) => a + b, 0);

  painel.getCharts().forEach(c => painel.removeChart(c));
  painel.getRange("A1:C19").breakApart();

  _configurarColunas(painel);
  _formatarCabecalho(painel);
  _atualizarDatas(painel, datas);
  _atualizarTabela(painel, contagem, total);
  _configurarImpressao(painel);

  log("atualizarPainel: " + total + " registros.");
}

function _configurarColunas(painel) {
  painel.setColumnWidth(1, 280);
  painel.setColumnWidth(2, 160);
  painel.setColumnWidth(3, 130);

  if (painel.getMaxColumns() > 3) {
    painel.deleteColumns(4, painel.getMaxColumns() - 3);
  }
}

function _formatarCabecalho(painel) {
  painel.getRange("A1:C1").breakApart().merge()
    .setValue("RELATÓRIO EXECUTIVO — STORMX x UNILEVER")
    .setBackground("#1F36C7")
    .setFontColor("#FFFFFF")
    .setFontSize(13)
    .setFontWeight("bold")
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle");

  painel.getRange("A3:C3").clearContent().setBackground("#FFFFFF");
}

function _atualizarDatas(painel, datas) {
  painel.getRange("A2:C2").setBackground("#FFFFFF");
  painel.getRange("C2").clearContent();

  const fmt = Session.getScriptTimeZone();

  const primeira = datas.length
    ? Utilities.formatDate(new Date(Math.min(...datas.map(d => d.getTime()))), fmt, "dd/MM/yyyy")
    : "—";
  const ultima = datas.length
    ? Utilities.formatDate(new Date(Math.max(...datas.map(d => d.getTime()))), fmt, "dd/MM/yyyy")
    : "—";

  painel.getRange("A2")
    .setValue("Primeira entrada:  " + primeira)
    .setFontWeight("normal")
    .setFontColor("#1F36C7")
    .setFontSize(10);

  painel.getRange("B2")
    .setValue("Última entrada:  " + ultima)
    .setFontWeight("normal")
    .setFontColor("#1F36C7")
    .setFontSize(10);
}

function _atualizarTabela(painel, contagem, total) {
  const startRow = 4;

  const linhas = Object.entries(contagem)
    .sort((a, b) => b[1] - a[1])
    .map(([plataforma, qtd]) => [plataforma, qtd, total ? qtd / total : 0]);

  const tabelaCompleta = [
    ["Plataforma", "Quantidade", "%"],
    ...linhas,
    ["Total", total, total ? 1 : 0]
  ];

  const numLinhas = tabelaCompleta.length;
  const range     = painel.getRange(startRow, 1, numLinhas, 3);
  range.setValues(tabelaCompleta);
  range.setHorizontalAlignment("center");

  painel.getRange(startRow + 1, 3, numLinhas - 1, 1).setNumberFormat("0.0%");
  range.setBorder(true, true, true, true, true, true, "#E5E7EB", SpreadsheetApp.BorderStyle.SOLID);
  range.setBorder(true, true, true, true, null, null, "#1F36C7", SpreadsheetApp.BorderStyle.SOLID_MEDIUM);

  painel.getRange(startRow, 1, 1, 3)
    .setBackground("#1F36C7").setFontColor("#FFFFFF")
    .setFontSize(11).setFontWeight("bold")
    .setHorizontalAlignment("center").setVerticalAlignment("middle");
  painel.getRange(startRow, 1).setHorizontalAlignment("left");
  painel.setRowHeight(startRow, 34);

  linhas.forEach((linha, i) => {
    const plataforma = linha[0];
    const rowIdx     = startRow + 1 + i;
    const cor        = getCorPlataforma(plataforma);

    const celA = painel.getRange(rowIdx, 1);
    celA.setFontWeight("bold").setHorizontalAlignment("left").setVerticalAlignment("middle");
    if (cor) {
      celA.setBackground(cor.bg).setFontColor(cor.font);
    } else {
      celA.setBackground("#F3F4F6").setFontColor("#111827");
    }

    painel.getRange(rowIdx, 2, 1, 2)
      .setBackground("#FFFFFF").setFontColor("#111827")
      .setFontWeight("500").setHorizontalAlignment("center").setVerticalAlignment("middle");

    painel.setRowHeight(rowIdx, 34);
  });

  const totalRowIdx = startRow + numLinhas - 1;
  painel.getRange(totalRowIdx, 1, 1, 3)
    .setBackground("#1F36C7").setFontColor("#FFFFFF")
    .setFontSize(11).setFontWeight("bold")
    .setHorizontalAlignment("center").setVerticalAlignment("middle");
  painel.getRange(totalRowIdx, 1).setHorizontalAlignment("left");
  painel.getRange(totalRowIdx, 1, 1, 3)
    .setBorder(true, null, null, null, null, null, "#FFFFFF", SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
  painel.setRowHeight(totalRowIdx, 34);

  SpreadsheetApp.flush();
  const proximaLinha = startRow + numLinhas;
  const totalLinhas  = painel.getMaxRows();

  if (totalLinhas >= proximaLinha) {
    painel.getRange(proximaLinha, 1, totalLinhas - proximaLinha + 1, 3)
      .clearContent().setBackground(null).setFontWeight("normal")
      .setBorder(false, false, false, false, false, false);
  }

  if (totalLinhas > proximaLinha - 1) {
    try { painel.deleteRows(proximaLinha, totalLinhas - proximaLinha + 1); } catch(e) {}
  }
}

function _configurarImpressao(painel) {
  painel.setHiddenGridlines(true);
  painel.setRowHeight(1, 44);
  painel.setRowHeight(2, 26);
  painel.setRowHeight(3, 14);
}
