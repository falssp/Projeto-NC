// ============================================================
//  CORP_location.gs  —  Location Taxonomy Tool (Corp)
//  Ambiente: StormX Corp
//  Planilha: [UL] Taxonomia_Location
//  Abas lidas: "Oficial" e "Inclusão"
// ============================================================

// ── CONFIG ──────────────────────────────────────────────────
const CORP_SHEET_ID   = 'COLE_AQUI_O_ID_DA_PLANILHA_CORP';
const ABA_OFICIAL     = 'Oficial';
const ABA_INCLUSAO    = 'Inclusão';

// Colunas esperadas em cada aba (índice 0-based):
//   Col A = sigla/código  (ex: sao, est-sp, reg-se, nac)
//   Col B = label legível (ex: São Paulo, Estado de SP, Sudeste, Nacional)
const COL_SIGLA = 0;
const COL_LABEL = 1;

// ── WEB APP ENTRY POINTS ────────────────────────────────────
function doGet(e) {
  return HtmlService
    .createHtmlOutputFromFile('CORP_location')
    .setTitle('Location Taxonomy — Corp')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ── DATA API (chamada pelo frontend via google.script.run) ──
function getLocationData() {
  try {
    const ss      = SpreadsheetApp.openById(CORP_SHEET_ID);
    const oficial = _readTab(ss, ABA_OFICIAL);
    const incl    = _readTab(ss, ABA_INCLUSAO);

    // Mescla as duas abas, deduplica por sigla (Oficial prevalece)
    const merged  = _merge(oficial, incl);
    return { ok: true, data: merged };

  } catch (err) {
    return { ok: false, error: err.message };
  }
}

// ── HELPERS ─────────────────────────────────────────────────
function _readTab(ss, tabName) {
  const sheet  = ss.getSheetByName(tabName);
  if (!sheet) return [];

  const values = sheet.getDataRange().getValues();
  const result = [];

  values.forEach((row, i) => {
    if (i === 0) return; // pula cabeçalho
    const sigla = String(row[COL_SIGLA] || '').trim().toLowerCase();
    const label = String(row[COL_LABEL] || '').trim();
    if (sigla) result.push({ sigla, label: label || sigla });
  });

  return result;
}

function _merge(oficial, incl) {
  const map = new Map();
  oficial.forEach(r => map.set(r.sigla, r));
  incl.forEach(r => { if (!map.has(r.sigla)) map.set(r.sigla, r); });
  return Array.from(map.values());
}
