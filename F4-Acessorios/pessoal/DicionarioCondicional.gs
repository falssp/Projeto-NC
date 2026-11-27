// ============================================================
// DicionarioCondicional_Pessoal.gs
// Aplica formatação condicional por rede social na coluna B
// da aba "Dicionário" na planilha F4 Pessoal.
//
// QUANDO RODAR
// ────────────
// • Primeira vez: quando a aba já tiver dados mas sem cores
// • Pode rodar quantas vezes quiser — substitui as regras existentes
//   sem apagar dados
//
// COMO RODAR
// ──────────
// Editor Apps Script → selecionar aplicarCondicionalDicionario → ▶ Executar
// ============================================================

var DIC_SHEET_ID  = '16OdPmc-SeqXn1VefT0xRsIQJ-LdICRfUZnahsARuw4w';
var DIC_ABA_NOME  = 'Dicionário';
var DIC_COL_PLAT  = 2; // coluna B — Plataforma
var DIC_LINHA_INI = 2; // dados começam na linha 2

function aplicarCondicionalDicionario() {
  var ss  = SpreadsheetApp.openById(DIC_SHEET_ID);
  var aba = ss.getSheetByName(DIC_ABA_NOME);

  if (!aba) {
    Logger.log('Aba "%s" não encontrada.', DIC_ABA_NOME);
    return;
  }

  var lastRow = Math.max(aba.getLastRow(), DIC_LINHA_INI + 1);
  var rangeB  = aba.getRange(DIC_LINHA_INI, DIC_COL_PLAT, lastRow - DIC_LINHA_INI + 1, 1);

  function regra(texto, bg, fg) {
    return SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo(texto)
      .setBackground(bg)
      .setFontColor(fg)
      .setBold(true)
      .setRanges([rangeB])
      .build();
  }

  var regrasMantidas = aba.getConditionalFormatRules().filter(function(r) {
    return r.getRanges().every(function(rng) {
      return rng.getColumn() !== DIC_COL_PLAT;
    });
  });

  aba.setConditionalFormatRules(regrasMantidas.concat([
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
  ]));

  SpreadsheetApp.flush();
  Logger.log('✅ Formatação condicional aplicada na coluna B da aba "%s".', DIC_ABA_NOME);
}

function formatarDicionario() {
  var ss  = SpreadsheetApp.openById(DIC_SHEET_ID);
  var aba = ss.getSheetByName(DIC_ABA_NOME);
  if (!aba) { Logger.log('Aba não encontrada.'); return; }

  var totalLinhas = aba.getMaxRows();

  aba.setColumnWidth(1, 1200); // A — Link
  aba.setColumnWidth(2, 200);  // B — Plataforma
  aba.setColumnWidth(3, 200);  // C — Perfil

  aba.getRange(1, 2, totalLinhas, 1).setHorizontalAlignment('center');
  aba.getRange(1, 1, 1, 3).setHorizontalAlignment('center');
  aba.getRange(1, 1, totalLinhas, 3).setVerticalAlignment('middle');

  SpreadsheetApp.flush();
  Logger.log('✅ Formatação aplicada na aba "%s".', DIC_ABA_NOME);
}