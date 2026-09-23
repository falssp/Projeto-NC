/***************************************
 * 🖨️ EXPORTADOR PDF — Painel F1
 * Exporta a aba Painel como PDF
 * com opção de salvar no Drive ou baixar
 ***************************************/

function exportarPainelPDF() {
  const ui = SpreadsheetApp.getUi();
  const resp = ui.alert(
    '📄 Exportar Painel PDF',
    'Onde deseja salvar o PDF?\n\n' +
    'OK = Drive (pasta NC Tool)\n' +
    'Cancelar = Download no browser',
    ui.ButtonSet.OK_CANCEL
  );

  if (resp === ui.Button.OK) {
    _exportarPDFParaDrive();
  } else {
    _exportarPDFDownload();
  }
}

/***************************************
 * 💾 SALVAR NO DRIVE
 ***************************************/

function _exportarPDFParaDrive() {
  const ui = SpreadsheetApp.getUi();
  try {
    const blob = _gerarBlobPDF();
    const nome = _nomePDF();

    // Busca ou cria pasta NC Tool no Drive
    let pasta;
    const pastas = DriveApp.getFoldersByName('NC Tool — F1');
    if (pastas.hasNext()) {
      pasta = pastas.next();
    } else {
      pasta = DriveApp.createFolder('NC Tool — F1');
    }

    const arquivo = pasta.createFile(blob.setName(nome));
    log('exportarPDFDrive: salvo em Drive — ' + arquivo.getName());

    ui.alert(
      '✅ PDF salvo no Drive',
      'Arquivo: ' + arquivo.getName() + '\n' +
      'Pasta: NC Tool — F1\n\n' +
      'Link: ' + arquivo.getUrl(),
      ui.ButtonSet.OK
    );
  } catch (e) {
    log('exportarPDFDrive ERRO: ' + e.message);
    ui.alert('❌ Erro ao salvar PDF: ' + e.message);
  }
}

/***************************************
 * ⬇️ DOWNLOAD NO BROWSER (sidebar HTML)
 ***************************************/

function _exportarPDFDownload() {
  try {
    const blob   = _gerarBlobPDF();
    const nome   = _nomePDF();
    const base64 = Utilities.base64Encode(blob.getBytes());

    const html = HtmlService.createHtmlOutput(
      '<!DOCTYPE html><html><head><meta charset="UTF-8">' +
      '<style>body{font-family:Arial,sans-serif;padding:24px;text-align:center;color:#1a237e;}' +
      'h3{margin-bottom:8px;}p{color:#666;font-size:.85rem;margin-bottom:20px;}' +
      '.btn{display:inline-block;padding:12px 24px;background:#1F36C7;color:#fff;' +
      'border-radius:8px;text-decoration:none;font-weight:700;font-size:.9rem;}</style>' +
      '</head><body>' +
      '<h3>📄 PDF Pronto</h3>' +
      '<p>' + nome + '</p>' +
      '<a class="btn" href="data:application/pdf;base64,' + base64 + '" download="' + nome + '">⬇️ Baixar PDF</a>' +
      '<script>setTimeout(function(){' +
      'var a=document.querySelector("a");' +
      'if(a){a.click();}' +
      '},800);</script>' +
      '</body></html>'
    ).setTitle('Download PDF').setWidth(320).setHeight(200);

    SpreadsheetApp.getUi().showModalDialog(html, 'Exportar PDF');
    log('exportarPDFDownload: PDF gerado — ' + nome);
  } catch (e) {
    log('exportarPDFDownload ERRO: ' + e.message);
    SpreadsheetApp.getUi().alert('❌ Erro ao gerar PDF: ' + e.message);
  }
}

/***************************************
 * 📦 GERAR BLOB DO PDF
 ***************************************/

function _gerarBlobPDF() {
  const ss     = SpreadsheetApp.getActiveSpreadsheet();
  const painel = ss.getSheetByName(CONFIG.abas.painel);
  const gid    = painel.getSheetId();
  const ssId   = ss.getId();

  const url = 'https://docs.google.com/spreadsheets/d/' + ssId +
    '/export?format=pdf' +
    '&size=A4' +
    '&portrait=true' +
    '&fitw=true' +
    '&sheetnames=false' +
    '&printtitle=false' +
    '&pagenumbers=false' +
    '&gridlines=false' +
    '&fzr=false' +
    '&gid=' + gid;

  const token = ScriptApp.getOAuthToken();
  const resp  = UrlFetchApp.fetch(url, {
    headers: { Authorization: 'Bearer ' + token }
  });

  return resp.getBlob().setContentType('application/pdf');
}

/***************************************
 * 📛 NOME DO ARQUIVO
 ***************************************/

function _nomePDF() {
  const tz  = Session.getScriptTimeZone();
  const now = new Date();
  const dt  = Utilities.formatDate(now, tz, 'yyyyMMdd_HHmm');
  return 'Painel_NC_F1_' + dt + '.pdf';
}
