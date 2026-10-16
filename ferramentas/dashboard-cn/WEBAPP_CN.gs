// ============================================================
// WEBAPP_CN.gs — [UL] Inclusão Campaign Local
// Web App para servir dados ao Dashboard CN
//
//  DEPLOY:
//    1. Adicione este arquivo ao Apps Script da planilha.
//    2. Publicar → Implantar como Web App
//       • Executar como: EU (minha conta)
//       • Quem tem acesso: Qualquer pessoa (ou "qualquer pessoa com link")
//    3. Copie a URL gerada e cole em WEBAPP_URL no index.html do dashboard.
// ============================================================

const _CN_PRIMEIRO_ANO = 2026;
const _CN_PRIMEIRA_LINHA_DADOS = 3;

const _CN_HEADERS = [
  'Data de Inclusão',     // A  0
  'Novo Campaign Local',  // B  1
  'DE/PARA Campaign Local', // C 2
  'EXTRA',                // D  3
  'DE/PARA EXTRA',        // E  4
  'Brand Name',           // F  5
  'Campaign Name',        // G  6
  'CN CODE',              // H  7
  'Responsável',          // I  8
  'Agência',              // J  9
  'Obs'                   // K  10
];

// Colunas excluídas da comparação de duplicatas (0-based index)
// CN CODE (7), Campaign Name (6), EXTRA (3)
const _CN_EXCLUIR_DUP = new Set([3, 6, 7]);

function _cn_isAbaAtiva(nome) {
  return /^\d{4}$/.test(nome) && parseInt(nome, 10) >= _CN_PRIMEIRO_ANO;
}

function _cn_getDados() {
  const ss     = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ss.getSheets().filter(s => _cn_isAbaAtiva(s.getName()));
  const rows   = [];
  const dupMap = {};

  sheets.forEach(sheet => {
    const ano     = sheet.getName();
    const lastRow = sheet.getLastRow();
    if (lastRow < _CN_PRIMEIRA_LINHA_DADOS) return;

    const numRows = lastRow - _CN_PRIMEIRA_LINHA_DADOS + 1;
    const vals    = sheet.getRange(_CN_PRIMEIRA_LINHA_DADOS, 1, numRows, 11).getValues();

    vals.forEach((row, i) => {
      // Linha com pelo menos um campo preenchido (além de A)
      const temDado = row.slice(1).some(v => v !== '' && v !== null && v !== 0);
      if (!temDado) return;

      const obj = {};
      _CN_HEADERS.forEach((h, j) => { obj[h] = row[j] !== null && row[j] !== undefined ? String(row[j]) : ''; });
      obj['_ano']     = ano;
      obj['_linha']   = _CN_PRIMEIRA_LINHA_DADOS + i;

      // Chave de duplicata (exclui CN CODE, Campaign Name, EXTRA)
      const partesDup = [];
      _CN_HEADERS.forEach((h, j) => {
        if (!_CN_EXCLUIR_DUP.has(j)) partesDup.push(String(row[j] || '').trim().toLowerCase());
      });
      const chave = partesDup.join('|');
      obj['_dupKey'] = chave;

      if (!dupMap[chave]) dupMap[chave] = [];
      dupMap[chave].push(rows.length);
      rows.push(obj);
    });
  });

  // Marca duplicatas
  let totalDup = 0;
  Object.values(dupMap).forEach(indices => {
    if (indices.length > 1) {
      indices.forEach(i => { rows[i]['_duplicata'] = true; });
      totalDup += indices.length;
    }
  });

  const verificar = rows.filter(r => r['CN CODE'] === 'Verificar Campanha').length;

  return {
    sync:          new Date().toISOString(),
    total:         rows.length,
    totalVerificar: verificar,
    totalDuplicatas: totalDup,
    rows
  };
}

function doGet(e) {
  const p    = (e && e.parameter) || {};
  const json = JSON.stringify(_cn_getDados());

  if (p.callback) {
    return ContentService.createTextOutput(p.callback + '(' + json + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}
