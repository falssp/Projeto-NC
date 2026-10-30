// ============================================================
//  PESSOAL_location.gs  —  Location Taxonomy Tool (Pessoal)
//  Ambiente: Felipe / Desenvolvimento
//  Planilha: [Felipe] Taxonomia_Location
//  Abas lidas: "Oficial" e "Inclusão"
// ============================================================

// ── CONFIG ──────────────────────────────────────────────────
const PESSOAL_SHEET_ID = 'COLE_AQUI_O_ID_DA_PLANILHA_PESSOAL';
const ABA_OFICIAL      = 'Oficial';
const ABA_INCLUSAO     = 'Inclusão';

const COL_SIGLA = 0;
const COL_LABEL = 1;

// ── WEB APP ENTRY POINTS ────────────────────────────────────
function doGet(e) {
  return HtmlService
    .createHtmlOutputFromFile('PESSOAL_location')
    .setTitle('Location Taxonomy — Pessoal')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ── DATA API ────────────────────────────────────────────────
function getLocationData() {
  try {
    const ss      = SpreadsheetApp.openById(PESSOAL_SHEET_ID);
    const oficial = _readTab(ss, ABA_OFICIAL);
    const incl    = _readTab(ss, ABA_INCLUSAO);
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
    if (i === 0) return;
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
