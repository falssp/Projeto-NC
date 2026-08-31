/***************************************
 * 🔄 GERAL SYNC
 ***************************************/

function atualizarGeral() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const abas  = ss.getSheets();
  const col   = CONFIG.colunas;
  const geral = ss.getSheetByName(CONFIG.abas.geral);

  let dados = [];

  abas.forEach(sheet => {
    const nome = sheet.getName();

    if (nome === CONFIG.abas.geral)    return;
    if (nome === CONFIG.abas.painel)   return;
    if (nome === CONFIG.abas.usuarios) return;

    const last = sheet.getLastRow();
    if (last < 2) return;

    const valores = sheet.getRange(2, 1, last - 1, 5).getValues();

    valores.forEach(l => {
      const adName     = l[col.aba.adName - 1];
      const data       = l[col.aba.data - 1];
      const idAMZ      = l[col.aba.idAMZ - 1];
      const idSX       = l[col.aba.idSX - 1];
      const plataforma = l[col.aba.plataforma - 1];

      if (data && adName && plataforma) {
        dados.push([data, idSX, idAMZ, adName, plataforma, nome]);
      }
    });
  });

  if (dados.length) {
    geral.getRange(2, 1, dados.length, 6).setValues(dados);
    geral.getRange(2, 1, dados.length, 1).setNumberFormat("dd/MM/yyyy");

    const totalLinhas  = geral.getMaxRows();
    const proximaLinha = dados.length + 2;
    if (totalLinhas >= proximaLinha) {
      geral.getRange(proximaLinha, 1, totalLinhas - proximaLinha + 1, 6).clearContent();
    }
  } else {
    const totalLinhas = geral.getMaxRows();
    if (totalLinhas >= 2) {
      geral.getRange(2, 1, totalLinhas - 1, 6).clearContent();
    }
  }

  formatarGeral();
  log("atualizarGeral: " + dados.length + " linhas sincronizadas.");
}
