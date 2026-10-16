// ExportadorPDF.gs — NC Tool | F3
// Gera relatorio PDF formatado da ultima validacao

function exportarRelatorioHTML() {
  var ss  = SpreadsheetApp.getActiveSpreadsheet();
  var log = ss.getSheetByName('Log');

  if (!log || log.getLastRow() < 2) {
    SpreadsheetApp.getUi().alert('Nenhuma validacao encontrada no Log.');
    return;
  }

  // Pega ultima validacao do Log
  var lastRow = log.getLastRow();
  var dados   = log.getRange(2, 1, lastRow - 1, 11).getValues();

  // Ultima linha valida
  var ultima = null;
  for (var i = dados.length - 1; i >= 0; i--) {
    if (dados[i][0]) { ultima = dados[i]; break; }
  }

  if (!ultima) {
    SpreadsheetApp.getUi().alert('Nenhuma validacao valida encontrada.');
    return;
  }

  var id          = ultima[0] || '';
  var ts          = ultima[1] ? new Date(ultima[1]) : new Date();
  var usuario     = ultima[2] || '';
  var cliente     = ultima[3] || 'Unilever BR';
  var fonte       = ultima[4] || '';
  var arquivo     = ultima[5] || '';
  var plataforma  = ultima[6] || '';
  var total       = ultima[7] || 0;
  var corretos    = ultima[8] || 0;
  var erros       = ultima[9] || 0;
  var score       = ultima[10] || '0%';

  var dataFmt = Utilities.formatDate(ts, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm');
  var corScore = parseFloat(score) >= 95 ? '#2e7d32' : parseFloat(score) >= 70 ? '#e65100' : '#c62828';

  var html = HtmlService.createHtmlOutput(
    '<!DOCTYPE html>' +
    '<html lang="pt-BR"><head>' +
    '<meta charset="UTF-8">' +
    '<title>Relatorio NC Tool — ' + dataFmt + '</title>' +
    '<style>' +
    'body{font-family:Arial,sans-serif;margin:0;padding:32px;color:#1a237e;background:#fff;}' +
    'h1{font-size:1.4rem;margin:0 0 4px;}' +
    '.sub{font-size:.85rem;color:#666;margin-bottom:24px;}' +
    '.meta{display:grid;grid-template-columns:1fr 1fr;gap:8px 24px;margin-bottom:24px;}' +
    '.meta-item{font-size:.82rem;}' +
    '.meta-label{color:#888;font-size:.75rem;text-transform:uppercase;letter-spacing:.5px;}' +
    '.score-box{display:inline-block;padding:12px 24px;border-radius:10px;font-size:2rem;font-weight:800;color:#fff;background:' + corScore + ';margin-bottom:24px;}' +
    '.stats{display:flex;gap:16px;margin-bottom:24px;}' +
    '.stat{flex:1;padding:14px;border-radius:10px;background:#f0f2ff;text-align:center;}' +
    '.stat-val{font-size:1.6rem;font-weight:800;color:#1F36C7;}' +
    '.stat-label{font-size:.75rem;color:#666;text-transform:uppercase;}' +
    '.footer{margin-top:32px;font-size:.72rem;color:#aaa;border-top:1px solid #e0e0e0;padding-top:12px;}' +
    '@media print{button{display:none!important;}}' +
    '</style></head><body>' +
    '<button onclick="window.print()" style="position:fixed;top:16px;right:16px;padding:10px 20px;background:#1F36C7;color:#fff;border:none;border-radius:8px;font-size:.85rem;font-weight:700;cursor:pointer;">&#128424; Exportar PDF</button>' +
    '<h1>NC Tool | Relatorio de Validacao</h1>' +
    '<div class="sub">' + cliente + ' &mdash; F3 Validator</div>' +
    '<div class="score-box">' + score + '</div>' +
    '<div class="stats">' +
    '<div class="stat"><div class="stat-val">' + total + '</div><div class="stat-label">Total</div></div>' +
    '<div class="stat"><div class="stat-val" style="color:#2e7d32">' + corretos + '</div><div class="stat-label">Validos</div></div>' +
    '<div class="stat"><div class="stat-val" style="color:#c62828">' + erros + '</div><div class="stat-label">Erros</div></div>' +
    '</div>' +
    '<div class="meta">' +
    '<div class="meta-item"><div class="meta-label">Data</div>' + dataFmt + '</div>' +
    '<div class="meta-item"><div class="meta-label">ID</div>' + id + '</div>' +
    '<div class="meta-item"><div class="meta-label">Usuario</div>' + usuario + '</div>' +
    '<div class="meta-item"><div class="meta-label">Fonte</div>' + fonte + '</div>' +
    '<div class="meta-item"><div class="meta-label">Plataforma</div>' + plataforma + '</div>' +
    '<div class="meta-item"><div class="meta-label">Arquivo</div>' + arquivo + '</div>' +
    '</div>' +
    '<div class="footer">Gerado em ' + dataFmt + ' &mdash; NC Tool | Unilever BR x Grasp &mdash; StormX</div>' +
    '</body></html>'
  )
  .setTitle('Relatorio NC Tool')
  .setWidth(700)
  .setHeight(520);

  SpreadsheetApp.getUi().showModalDialog(html, 'Exportar Relatorio PDF');
  log('exportarRelatorioHTML: relatorio gerado — ' + id);
}

function exportarUltimasValidacoes() {
  var ss  = SpreadsheetApp.getActiveSpreadsheet();
  var log = ss.getSheetByName('Log');
  var ui  = SpreadsheetApp.getUi();

  if (!log || log.getLastRow() < 2) {
    ui.alert('Nenhuma validacao encontrada no Log.');
    return;
  }

  var resp = ui.prompt('Quantas validacoes recentes deseja incluir? (max 20)', '5', ui.ButtonSet.OK_CANCEL);
  if (resp.getSelectedButton() !== ui.Button.OK) return;

  var qtd  = Math.min(20, Math.max(1, parseInt(resp.getResponseText()) || 5));
  var last = log.getLastRow();
  var start = Math.max(2, last - qtd + 1);
  var dados = log.getRange(start, 1, last - start + 1, 11).getValues().reverse();

  var linhas = dados.map(function(row) {
    if (!row[0]) return '';
    var ts    = row[1] ? Utilities.formatDate(new Date(row[1]), Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm') : '';
    var score = row[10] || '0%';
    var cor   = parseFloat(score) >= 95 ? '#e8f5e9' : parseFloat(score) >= 70 ? '#fff8e1' : '#ffebee';
    return '<tr style="background:' + cor + '">' +
      '<td>' + ts + '</td>' +
      '<td>' + (row[2] || '') + '</td>' +
      '<td>' + (row[6] || '') + '</td>' +
      '<td style="text-align:center">' + (row[7] || 0) + '</td>' +
      '<td style="text-align:center">' + (row[9] || 0) + '</td>' +
      '<td style="text-align:center;font-weight:700">' + score + '</td>' +
      '</tr>';
  }).join('');

  var html = HtmlService.createHtmlOutput(
    '<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8">' +
    '<title>Historico NC Tool</title>' +
    '<style>body{font-family:Arial,sans-serif;padding:24px;color:#1a237e;}' +
    'h1{font-size:1.2rem;margin-bottom:16px;}' +
    'table{width:100%;border-collapse:collapse;font-size:.82rem;}' +
    'th{background:#1F36C7;color:#fff;padding:8px 12px;text-align:left;}' +
    'td{padding:8px 12px;border-bottom:1px solid #e0e0e0;}' +
    '@media print{button{display:none!important;}}' +
    '</style></head><body>' +
    '<button onclick="window.print()" style="position:fixed;top:16px;right:16px;padding:10px 20px;background:#1F36C7;color:#fff;border:none;border-radius:8px;font-size:.85rem;font-weight:700;cursor:pointer;">&#128424; Exportar PDF</button>' +
    '<h1>NC Tool | Historico de Validacoes</h1>' +
    '<table><thead><tr>' +
    '<th>Data</th><th>Usuario</th><th>Plataforma</th><th>Total</th><th>Erros</th><th>Score</th>' +
    '</tr></thead><tbody>' + linhas + '</tbody></table>' +
    '</body></html>'
  )
  .setTitle('Historico de Validacoes')
  .setWidth(700)
  .setHeight(480);

  ui.showModalDialog(html, 'Historico de Validacoes — PDF');
}
