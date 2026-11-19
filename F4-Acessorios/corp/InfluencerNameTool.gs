// ============================================================
// InfluencerNameTool_Setup.gs
// NC Tool | Unilever BR x Grasp — Planilha F4 Corp (Acessórios)
// ============================================================
//
// INFLU_SHEET_ID aponta para a planilha F4 Pessoal.
// Para rodar: Editor Apps Script → selecionar a função → ▶ Executar
// ============================================================

var INFLU_SHEET_ID  = '1K3wO3b8BOOQldtHv7pBtOubmhoidoZBI0Y8yk4_UnmI';
var INFLU_ABA_NOME  = 'Influencer Name Tool';
var INFLU_NUM_COLS  = 9;
var INFLU_MAX_ROWS  = 1000;
var INFLU_HEADERS   = [
  'Data de Criação',
  'Nome Do Influenciador ÚNICO',
  'Nome_Do_Influenciador_ÚNICO',
  'SharePoint Name',
  'Rede_Social_Instagram,_TikTok,_Etc',
  'Perfil_Na_Rede_Social',
  'Influencer Handle',
  'Qde de seguidores',
  'Link'
];

function criarAbaInfluencerNameTool() {
  var ss = SpreadsheetApp.openById(INFLU_SHEET_ID);
  var existente = ss.getSheetByName(INFLU_ABA_NOME);
  if (existente) ss.deleteSheet(existente);
  var aba = ss.insertSheet(INFLU_ABA_NOME);

  var totalLinhas = INFLU_MAX_ROWS + 1;
  if (aba.getMaxRows() < totalLinhas)
    aba.insertRowsAfter(aba.getMaxRows(), totalLinhas - aba.getMaxRows());
  if (aba.getMaxColumns() < INFLU_NUM_COLS)
    aba.insertColumnsAfter(aba.getMaxColumns(), INFLU_NUM_COLS - aba.getMaxColumns());
  if (aba.getMaxColumns() > INFLU_NUM_COLS)
    aba.deleteColumns(INFLU_NUM_COLS + 1, aba.getMaxColumns() - INFLU_NUM_COLS);

  _influEscreverCabecalho(aba);
  _influEscreverFormulas(aba);
  aba.getRange(2, 1, INFLU_MAX_ROWS, 1).setNumberFormat('dd/mm/yyyy');
  _influAplicarCondicional(aba);
  _influAplicarFormatacao(aba, totalLinhas);
  _influAplicarLarguras(aba);
  aba.setFrozenRows(1);
  SpreadsheetApp.flush();
  Logger.log('Concluído.');
}

function atualizarAbaInfluencerNameTool() {
  var ss = SpreadsheetApp.openById(INFLU_SHEET_ID);
  var aba = ss.getSheetByName(INFLU_ABA_NOME);

  if (!aba) {
    Logger.log('Aba "%s" não encontrada — rode criarAbaInfluencerNameTool() primeiro.', INFLU_ABA_NOME);
    return;
  }

  var totalLinhas = INFLU_MAX_ROWS + 1;

  if (aba.getMaxRows() < totalLinhas)
    aba.insertRowsAfter(aba.getMaxRows(), totalLinhas - aba.getMaxRows());
  if (aba.getMaxColumns() < INFLU_NUM_COLS)
    aba.insertColumnsAfter(aba.getMaxColumns(), INFLU_NUM_COLS - aba.getMaxColumns());
  if (aba.getMaxColumns() > INFLU_NUM_COLS)
    aba.deleteColumns(INFLU_NUM_COLS + 1, aba.getMaxColumns() - INFLU_NUM_COLS);

  _influEscreverCabecalho(aba);
  _influEscreverFormulas(aba);
  aba.getRange(2, 1, INFLU_MAX_ROWS, 1).setNumberFormat('dd/mm/yyyy');
  _influAplicarCondicional(aba);
  _influAplicarFormatacao(aba, totalLinhas);
  _influAplicarLarguras(aba);
  aba.setFrozenRows(1);
  SpreadsheetApp.flush();
  Logger.log('✅ Aba "%s" atualizada — dados preservados.', INFLU_ABA_NOME);
}

function _influEscreverFormulas(aba) {
  var L = INFLU_MAX_ROWS + 1;
  var formulas = [
    ['A2', '=ARRAYFORMULA(IF(I2:I' + L + '<>"";TODAY();""))'],
    ['C2', '=ARRAYFORMULA(IFERROR(IF(B2:B' + L + '<>"";REGEXREPLACE(REGEXREPLACE(SUBSTITUTE(PROPER(TRIM(B2:B' + L + '));" ";"_");"[._]+";"_");"_$";"");"");""))'],
    ['D2', '=ARRAYFORMULA(IFERROR(IF(B2:B' + L + '<>"";LOWER(SUBSTITUTE(REGEXREPLACE(B2:B' + L + ';"[[:punct:][:^ascii:]]";"");" ";""));"");""))'],
    ['E2', '=ARRAYFORMULA(IFERROR(IF(I2:I' + L + '<>"";IF(REGEXMATCH(I2:I' + L + ';"facebook.com");"Facebook";IF(REGEXMATCH(I2:I' + L + ';"instagram.com");"Instagram";IF(REGEXMATCH(I2:I' + L + ';"tiktok.com");"TikTok";IF(REGEXMATCH(I2:I' + L + ';"youtube.com|youtu.be");"YouTube";IF(REGEXMATCH(I2:I' + L + ';"x.com|twitter.com");"X";IF(REGEXMATCH(I2:I' + L + ';"pinterest.com");"Pinterest";IF(REGEXMATCH(I2:I' + L + ';"linkedin.com");"LinkedIn";IF(REGEXMATCH(I2:I' + L + ';"snapchat.com");"Snapchat";IF(REGEXMATCH(I2:I' + L + ';"twitch.tv");"Twitch";IF(REGEXMATCH(I2:I' + L + ';"kwai.com");"Kwai";IF(REGEXMATCH(I2:I' + L + ';"threads.net");"Threads";IF(REGEXMATCH(I2:I' + L + ';"bsky.app");"Bluesky";IF(REGEXMATCH(I2:I' + L + ';"t.me");"Telegram";IF(REGEXMATCH(I2:I' + L + ';"bereal.com");"BeReal";IF(REGEXMATCH(I2:I' + L + ';"triller.co");"Triller";IF(REGEXMATCH(I2:I' + L + ';"rumble.com");"Rumble";IF(REGEXMATCH(I2:I' + L + ';"kick.com");"Kick";IF(REGEXMATCH(I2:I' + L + ';"discord.com|discord.gg");"Discord";IF(REGEXMATCH(I2:I' + L + ';"reddit.com");"Reddit";"Verificar cadastro da mídia")))))))))))))))))));"");""))'],
    ['F2', '=ARRAYFORMULA(IFERROR(IF(I2:I' + L + '<>"";REGEXEXTRACT(I2:I' + L + ';"(?:tiktok.com/@?|youtube.com/(?:c/|channel/|user/|@)?|instagram.com/|twitch.tv/)([^/?&]+)");"");""))'],
    ['G2', '=ARRAYFORMULA(IFERROR(IF(F2:F' + L + '<>"";REGEXREPLACE(TO_TEXT(F2:F' + L + ');"[^A-Za-z0-9]";"");"");""))']
  ];

  formulas.forEach(function(pair) {
    try {
      aba.getRange(pair[0]).setFormula(pair[1]);
      Logger.log('OK: ' + pair[0]);
    } catch(e) {
      Logger.log('ERRO em ' + pair[0] + ': ' + e.message);
    }
  });
}

function _influEscreverCabecalho(aba) {
  var hdr = aba.getRange(1, 1, 1, INFLU_NUM_COLS);
  hdr.setValues([INFLU_HEADERS]);
  hdr.setBackground('#1F36C7').setFontColor('#FFFFFF')
     .setFontWeight('bold').setFontSize(11).setFontFamily('DM Sans')
     .setHorizontalAlignment('center').setVerticalAlignment('middle')
     .setWrap(false);
  aba.setRowHeight(1, 32);
}

function _influAplicarCondicional(aba) {
  var rangeE = aba.getRange(2, 5, INFLU_MAX_ROWS, 1);
  function regra(texto, bg, fg) {
    return SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo(texto).setBackground(bg).setFontColor(fg).setBold(true)
      .setRanges([rangeE]).build();
  }
  aba.setConditionalFormatRules([
    regra('TikTok',    '#000000', '#FFFFFF'),
    regra('Instagram', '#F4CCCC', '#CC0000'),
    regra('YouTube',   '#FF0000', '#FFFFFF'),
    regra('Facebook',  '#1877F2', '#FFFFFF'),
    regra('Pinterest', '#E60023', '#FFFFFF'),
    regra('X',         '#000000', '#FFFFFF'),
    regra('LinkedIn',  '#0A66C2', '#FFFFFF'),
    regra('Snapchat',  '#FFFC00', '#000000'),
    regra('Twitch',    '#9146FF', '#FFFFFF'),
    regra('Kwai',    '#FF5700', '#FFFFFF'),
    regra('Threads',    '#000000', '#FFFFFF'),
    regra('Bluesky',    '#0085FF', '#FFFFFF'),
    regra('Telegram',    '#2AABEE', '#FFFFFF'),
    regra('BeReal',    '#000000', '#FFFFFF'),
    regra('Triller',    '#FF0050', '#FFFFFF'),
    regra('Rumble',    '#85C742', '#FFFFFF'),
    regra('Kick',    '#53FC18', '#000000'),
    regra('Discord',    '#5865F2', '#FFFFFF'),
    regra('Reddit',    '#FF4500', '#FFFFFF'),
  ]);
}

function _influAplicarFormatacao(aba, totalLinhas) {
  aba.getRange(1, 1, totalLinhas, INFLU_NUM_COLS)
     .setBorder(true, true, true, true, true, true, '#DEE2E6', SpreadsheetApp.BorderStyle.SOLID);
  aba.getRange(2, 1, totalLinhas - 1, INFLU_NUM_COLS)
     .setFontFamily('Courier New').setFontSize(11).setFontColor('#212529');
  try { aba.getFilter().remove(); } catch (e) {}
  aba.getRange(1, 1, totalLinhas, INFLU_NUM_COLS).createFilter();
}

function _influAplicarLarguras(aba) {
  var larguras = [150, 245, 265, 155, 300, 195, 155, 165, 220];
  for (var c = 1; c <= INFLU_NUM_COLS; c++) {
    aba.setColumnWidth(c, larguras[c - 1]);
  }
  var colsCentro = [1, 5, 8];
  for (var i = 0; i < colsCentro.length; i++) {
    aba.getRange(1, colsCentro[i], INFLU_MAX_ROWS + 1, 1).setHorizontalAlignment('center');
  }
  aba.getRange(1, 1, 1, INFLU_NUM_COLS).setWrap(false);
  aba.getRange(2, 1, INFLU_MAX_ROWS, INFLU_NUM_COLS).setWrap(true);
  aba.getRange(1, 1, INFLU_MAX_ROWS + 1, INFLU_NUM_COLS).setVerticalAlignment('middle');
}