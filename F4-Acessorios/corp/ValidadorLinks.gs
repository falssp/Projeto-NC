// ============================================================
// ValidadorLinks.gs
// NC Tool | Unilever BR x Grasp — F4 Corp
// Valida URLs da aba "Dicionário" (col A) e registra status
// nas colunas D (Status Link) e E (Última Verificação).
//
// COLUNAS ADICIONADAS NO DICIONÁRIO
// ───────────────────────────────────
//   D — Status Link        ✅ OK / ❌ Quebrado / ⚠️ Não verificável / ⏳ Pendente
//   E — Última Verificação data/hora da última checagem
//
// COMO RODAR
// ──────────
// Manual : Menu NC Tool → 🔗 Validador → Validar links agora
// Auto   : trigger diário configurado automaticamente no primeiro uso
// ============================================================

var VAL_SHEET_ID  = '1K3wO3b8BOOQldtHv7pBtOubmhoidoZBI0Y8yk4_UnmI';
var VAL_ABA_NOME  = 'Dicionário';
var VAL_COL_LINK  = 1; // A
var VAL_COL_STAT  = 4; // D — Status Link
var VAL_COL_DATA  = 5; // E — Última Verificação
var VAL_LINHA_INI = 2;

// Redes que bloqueiam bots — não é possível verificar via UrlFetchApp
var VAL_REDES_BLOQUEADAS = ['instagram.com', 'tiktok.com', 'facebook.com', 'twitter.com', 'x.com', 'linkedin.com', 'snapchat.com'];

// ── Entrada manual (menu) ──────────────────────────────────
function validarLinksAgora() {
  _valGarantirCabecalho();
  _valGarantirTrigger();
  var total = _valExecutar();
  SpreadsheetApp.getUi().alert('✅ Validação concluída: ' + total + ' link(s) verificado(s).');
}

// ── Entrada automática (trigger) ──────────────────────────
function validarLinksTrigger() {
  _valGarantirCabecalho();
  _valExecutar();
}

// ── Lógica principal ──────────────────────────────────────
function _valExecutar() {
  var ss  = SpreadsheetApp.openById(VAL_SHEET_ID);
  var aba = ss.getSheetByName(VAL_ABA_NOME);
  if (!aba) { Logger.log('Aba "%s" não encontrada.', VAL_ABA_NOME); return 0; }

  var lastRow = aba.getLastRow();
  if (lastRow < VAL_LINHA_INI) return 0;

  var numRows = lastRow - VAL_LINHA_INI + 1;
  var links   = aba.getRange(VAL_LINHA_INI, VAL_COL_LINK, numRows, 1).getValues();
  var status  = aba.getRange(VAL_LINHA_INI, VAL_COL_STAT, numRows, 1).getValues();
  var datas   = aba.getRange(VAL_LINHA_INI, VAL_COL_DATA, numRows, 1).getValues();

  var agora    = new Date();
  var contador = 0;

  for (var i = 0; i < numRows; i++) {
    var url = String(links[i][0] || '').trim();
    if (!url) continue;

    // Só revalida se estiver pendente ou vazio
    var statAtual = String(status[i][0] || '').trim();
    if (statAtual !== '' && statAtual !== '⏳ Pendente') continue;

    var resultado = _valVerificarUrl(url);
    status[i][0] = resultado;
    datas[i][0]  = Utilities.formatDate(agora, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm');
    contador++;
  }

  if (contador > 0) {
    aba.getRange(VAL_LINHA_INI, VAL_COL_STAT, numRows, 1).setValues(status);
    aba.getRange(VAL_LINHA_INI, VAL_COL_DATA, numRows, 1).setValues(datas);
    SpreadsheetApp.flush();
  }

  Logger.log('✅ Validação concluída: %s link(s).', contador);
  return contador;
}

function _valVerificarUrl(url) {
  // Redes bloqueadas — não verificável via servidor
  for (var i = 0; i < VAL_REDES_BLOQUEADAS.length; i++) {
    if (url.indexOf(VAL_REDES_BLOQUEADAS[i]) >= 0) return '⚠️ Não verificável';
  }
  try {
    var resp = UrlFetchApp.fetch(url, {
      muteHttpExceptions: true,
      followRedirects: true,
      method: 'GET',
      headers: { 'User-Agent': 'Mozilla/5.0' },
      deadline: 10  // timeout 10s por URL
    });
    var code = resp.getResponseCode();
    if (code >= 200 && code < 400) return '✅ OK';
    if (code === 401 || code === 403) return '🔒 Privado';
    return '❌ Quebrado (' + code + ')';
  } catch (e) {
    return '❌ Quebrado';
  }
}

// ── Cabeçalho das colunas D e E + filtro ─────────────────
function _valGarantirCabecalho() {
  var ss  = SpreadsheetApp.openById(VAL_SHEET_ID);
  var aba = ss.getSheetByName(VAL_ABA_NOME);
  if (!aba) return;

  // Padrão visual: mesma fonte/altura do cabeçalho das outras abas
  var hdrD = aba.getRange(1, VAL_COL_STAT);
  var hdrE = aba.getRange(1, VAL_COL_DATA);

  [hdrD, hdrE].forEach(function(cell) {
    cell.setBackground('#1F36C7').setFontColor('#FFFFFF')
        .setFontWeight('bold').setFontSize(11).setFontFamily('DM Sans')
        .setHorizontalAlignment('center').setVerticalAlignment('middle')
        .setWrap(false);
  });

  if (!hdrD.getValue()) hdrD.setValue('Status Link');
  if (!hdrE.getValue()) hdrE.setValue('Última Verificação');

  aba.setRowHeight(1, 32);
  aba.setColumnWidth(VAL_COL_STAT, 160);
  aba.setColumnWidth(VAL_COL_DATA, 180);

  // Recriar filtro cobrindo todas as colunas (A–E)
  try { aba.getFilter().remove(); } catch(e) {}
  var totalCols = VAL_COL_DATA; // E = 5
  var totalRows = Math.max(aba.getLastRow(), 2);
  aba.getRange(1, 1, totalRows, totalCols).createFilter();

  SpreadsheetApp.flush();
}

// ── Trigger diário (garante um único trigger) ─────────────
function _valGarantirTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'validarLinksTrigger') return;
  }
  ScriptApp.newTrigger('validarLinksTrigger')
    .timeBased().everyDays(1).atHour(3).create();
  Logger.log('✅ Trigger diário criado para validarLinksTrigger.');
}

// ── Resetar status (revalida tudo do zero) ────────────────
function resetarValidacaoLinks() {
  var ui = SpreadsheetApp.getUi();
  var resp = ui.alert('Resetar validação', 'Isso vai apagar todos os status e revalidar tudo. Confirma?', ui.ButtonSet.OK_CANCEL);
  if (resp !== ui.Button.OK) return;

  var ss  = SpreadsheetApp.openById(VAL_SHEET_ID);
  var aba = ss.getSheetByName(VAL_ABA_NOME);
  if (!aba) return;

  var lastRow = aba.getLastRow();
  if (lastRow < VAL_LINHA_INI) return;

  var numRows = lastRow - VAL_LINHA_INI + 1;
  var vazio   = Array(numRows).fill(['']);
  aba.getRange(VAL_LINHA_INI, VAL_COL_STAT, numRows, 1).setValues(vazio);
  aba.getRange(VAL_LINHA_INI, VAL_COL_DATA, numRows, 1).setValues(vazio);
  SpreadsheetApp.flush();

  var total = _valExecutar();
  ui.alert('✅ Reset concluído: ' + total + ' link(s) revalidado(s).');
}