/**
 * F2 — ADP Import Module
 * Importa ADP (Unilever UNCC Digital Platform String Tool) XLSX,
 * detecta a aba/plataforma, mapeia colunas para F2 e carrega as linhas.
 */

// ─── De-Para: ADP Platform column values → F2 platform IDs ───────────────────
const ADP_PLATFORM_MAP = {
  // Programmatic sheet
  'dv360-programmatic':     'dv360-prog',
  'dv360 programmatic':     'dv360-prog',
  'programmatic':           'dv360-prog',
  'dv360prog':              'dv360-prog',
  'amazon dsp':             'amazon-dsp',
  'amazon':                 'amazon-dsp',
  'amazondsp':              'amazon-dsp',
  // Google sheet
  'google':                 'google-others',
  'google others':          'google-others',
  'google search':          'google-search',
  'googlesearch':           'google-search',
  // YouTube sheet
  'youtube':                'dv360-yt-auction',
  'dv360 youtube':          'dv360-yt-auction',
  'youtube auction':        'dv360-yt-auction',
  'youtube reserva':        'dv360-yt-reserva',
  'youtube reserve':        'dv360-yt-reserva',
  // Meta/TikTok sheet
  'meta':                   'meta',
  'facebook':               'meta',
  'tiktok':                 'tiktok',
  'tik tok':                'tiktok',
  // Pinterest/Snapchat/Twitter sheet
  'pinterest':              'pinterest',
  'twitter':                'twitter',
  'x (twitter)':            'twitter',
  // Flashtalking sheet
  'flashtalking':           'flashtalking',
  'flash talking':          'flashtalking',
  'compra direta':          'compra-direta',
  'compra-direta':          'compra-direta',
};

// ─── ADP Sheet name → default F2 platform (fallback when no Platform col) ────
const ADP_SHEET_DEFAULT = {
  'programmatic':           'dv360-prog',
  'programmatica':          'dv360-prog',
  'google':                 'google-others',
  'youtube':                'dv360-yt-auction',
  'meta e tiktok':          'meta',
  'meta e tiktokt':         'meta',
  'pinterest, snapchat e twitter': 'pinterest',
  'pinterest snapchat e twitter':  'pinterest',
  'flashtalking':           'flashtalking',
};

// ─── ADP column header → F2 column ID (per platform) ─────────────────────────
// Key: normalized ADP header (lowercase, trimmed)
// Value: F2 col ID (or function returning col ID based on context)
const ADP_TO_F2_COL = {
  // Campaign level
  'campaign name':              'A',   // cn_drop (Campaign Name)
  'buy model':                  'H',   // Buy Type
  'buyingtype':                 'H',
  'buying type':                'H',
  'buy type':                   'H',
  'objective':                  'E',
  'campaignlocal':              'I',
  'campaign local':             'I',
  'campaignlocal ':             'I',
  'brand name':                 'J',
  'brandlift yes or no':        'K',
  'brandlift':                  'K',
  'pilar de campanha':          'L',
  'pilar':                      'L',
  'midiacampaignlocal-extra':   'M',
  'midia campaign local extra': 'M',
  'format type':                'G',
  // AdGroup level
  'audience party':             'O',
  'landing page type':          'P',   // ag Landing Page
  'landing page':               'P',
  'retailer':                   null,  // context-dependent (ag=Q, ad=AH)
  'publisher':                  'R',
  'location type':              'S',
  'locationtype':               'S',
  'placement type':             'S',   // ADP uses "Placement Type" for Location Type
  'lower age':                  'T',
  'age lower':                  'T',
  'upper age':                  'U',
  'age upper':                  'U',
  'audience type':              'V',
  'gender':                     'W',
  'location':                   'Y',
  'audience name':              'Z',
  // Ad level
  'creative name':              'AC',
  'format group':               'AD',
  'formatgroup':                'AD',
  'format size (secundagem ou novideo)': 'AE',
  'format size':                'AE',
  'tipo de tag':                'AF',
  'tipode tag':                 'AF',
  'tipode':                     null,
  // seconds goes to Seconds col (AN) or Format Size (AE) depending on platform
  'seconds':                    'AN',
  'secondagem':                 'AN',
  // Extra optional fields
  'influencer':                 'AK',  // Publisher Name Ad
  'influncer':                  'AK',
  'amazon product':             null,
  'objetivootimização':         null,
  'objeotimização':             null,
};

// ─── Normalize header string ──────────────────────────────────────────────────
function normHeader(h) {
  return String(h || '').toLowerCase().trim().replace(/\s+/g, ' ');
}

// ─── Detect platform from Platform column value ───────────────────────────────
function detectPlatformId(cellValue) {
  if (!cellValue) return null;
  const norm = normHeader(cellValue);
  return ADP_PLATFORM_MAP[norm] || null;
}

// ─── Detect platform from ADP sheet name ─────────────────────────────────────
function detectPlatformFromSheetName(sheetName) {
  const norm = normHeader(sheetName);
  return ADP_SHEET_DEFAULT[norm] || null;
}

// ─── Parse a single ADP data row into F2 field map { colId: value } ──────────
function parseAdpRow(headerMap, rowValues, platformId) {
  const result = {};

  for (const [normH, colIdx] of Object.entries(headerMap)) {
    const rawVal = rowValues[colIdx];
    if (rawVal === undefined || rawVal === null || rawVal === '') continue;
    const val = String(rawVal).trim();
    if (!val) continue;

    let f2col = ADP_TO_F2_COL[normH];

    // Context-dependent: Retailer appears at ag (Q) and ad (AH)
    if (normH === 'retailer') {
      result['Q'] = val;   // ag
      result['AH'] = val;  // ad
      continue;
    }

    // Landing page appears at ag (P) and ad (AG)
    if (normH === 'landing page type' || normH === 'landing page') {
      result['P'] = val;   // ag
      result['AG'] = val;  // ad
      continue;
    }

    if (!f2col) continue;
    result[f2col] = val;
  }

  return result;
}

// ─── Distribute flat field map into F2 row { camp, ag, ad } ──────────────────
function distributeToRow(flatMap, platform) {
  const row = { camp: {}, ag: {}, ad: {} };

  for (const [colId, value] of Object.entries(flatMap)) {
    const colDef = platform.columns.find(c => c.col === colId);
    if (!colDef) continue;

    const lvl = colDef.level;
    if (lvl === 'camp' || lvl === 'ag' || lvl === 'ad') {
      row[lvl][colId] = value;
    }
  }

  return row;
}

// ─── Find header row in ADP sheet ────────────────────────────────────────────
// ADP sheets have metadata rows before the actual header (usually row 4, index 3)
function findHeaderRow(sheet, XLSX) {
  const range = XLSX.utils.decode_range(sheet['!ref'] || 'A1:A1');
  const maxRow = Math.min(range.e.r, 10); // search first 10 rows

  for (let r = 0; r <= maxRow; r++) {
    const rowCells = [];
    for (let c = range.s.c; c <= Math.min(range.e.c, 60); c++) {
      const addr = XLSX.utils.encode_cell({ r, c });
      const cell = sheet[addr];
      rowCells.push(cell ? String(cell.v || '').trim() : '');
    }

    // A valid header row has multiple non-empty cells and includes known ADP headers
    const nonEmpty = rowCells.filter(v => v.length > 0).length;
    const hasKnown = rowCells.some(v => {
      const n = normHeader(v);
      return ['platform', 'buy model', 'objective', 'audience party',
              'creative name', 'format type', 'brand name', 'campaign name'].includes(n);
    });

    if (nonEmpty >= 5 && hasKnown) {
      return { rowIndex: r, headers: rowCells };
    }
  }

  return null;
}

// ─── Parse an ADP sheet ───────────────────────────────────────────────────────
function parseAdpSheet(sheet, sheetName, platforms, XLSX) {
  const headerInfo = findHeaderRow(sheet, XLSX);
  if (!headerInfo) return null;

  const { rowIndex: headerRow, headers } = headerInfo;

  // Build header map: normalized header → column index
  const headerMap = {};
  headers.forEach((h, i) => {
    const norm = normHeader(h);
    if (norm) headerMap[norm] = i;
  });

  // Find Platform column index
  const platColIdx = headerMap['platform'];

  // Read data rows (start after header)
  const range = XLSX.utils.decode_range(sheet['!ref'] || 'A1:A1');
  const dataRows = [];

  for (let r = headerRow + 1; r <= range.e.r; r++) {
    const rowCells = [];
    for (let c = range.s.c; c <= Math.min(range.e.c, 80); c++) {
      const addr = XLSX.utils.encode_cell({ r, c });
      const cell = sheet[addr];
      rowCells.push(cell ? (cell.v !== undefined ? cell.v : '') : '');
    }

    // Skip completely empty rows
    const hasContent = rowCells.some(v => v !== '' && v !== null && v !== undefined);
    if (!hasContent) continue;

    // Skip rows that look like section headers (only 1-2 filled cells)
    const nonEmpty = rowCells.filter(v => String(v).trim().length > 0).length;
    if (nonEmpty < 2) continue;

    dataRows.push(rowCells);
  }

  if (dataRows.length === 0) return null;

  // Determine platform: check first data row's Platform column
  // Then group rows by platform
  const grouped = new Map(); // platformId → [{rowValues, originalRowIndex}]

  dataRows.forEach((rowVals, idx) => {
    let platformId = null;

    if (platColIdx !== undefined) {
      const platVal = rowVals[platColIdx];
      platformId = detectPlatformId(platVal);
    }

    if (!platformId) {
      platformId = detectPlatformFromSheetName(sheetName);
    }

    if (!platformId) platformId = 'dv360-prog'; // last resort fallback

    if (!grouped.has(platformId)) grouped.set(platformId, []);
    grouped.get(platformId).push({ rowVals, originalIndex: idx });
  });

  // Convert grouped rows to F2 row format
  const result = [];

  for (const [platformId, adpRows] of grouped.entries()) {
    const platform = platforms.find(p => p.id === platformId);
    if (!platform) {
      console.warn(`[ADP Import] Platform not found: ${platformId}`);
      continue;
    }

    for (const { rowVals } of adpRows) {
      const flatMap = parseAdpRow(headerMap, rowVals, platformId);
      const f2row = distributeToRow(flatMap, platform);
      result.push({ platformId, row: f2row });
    }
  }

  return result.length > 0 ? result : null;
}

// ─── Main Import Function ─────────────────────────────────────────────────────
async function importAdpFile(file, platforms) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Known ADP platform sheets (order matters for display)
        const ADP_SHEETS = [
          'Programmatic', 'Google', 'Youtube', 'YouTube',
          'Meta e Tiktok', 'Meta e TikTok', 'Meta e TikTokt',
          'Pinterest, Snapchat e Twitter', 'Pinterest Snapchat e Twitter',
          'Flashtalking'
        ];

        // Collect results grouped by platform
        const byPlatform = new Map(); // platformId → F2 rows[]

        for (const sheetName of workbook.SheetNames) {
          // Only process known platform sheets
          const isTarget = ADP_SHEETS.some(s =>
            normHeader(s) === normHeader(sheetName)
          );
          if (!isTarget) continue;

          const sheet = workbook.Sheets[sheetName];
          if (!sheet || !sheet['!ref']) continue;

          const parsed = parseAdpSheet(sheet, sheetName, platforms, XLSX);
          if (!parsed) continue;

          for (const { platformId, row } of parsed) {
            if (!byPlatform.has(platformId)) byPlatform.set(platformId, []);
            byPlatform.get(platformId).push(row);
          }
        }

        if (byPlatform.size === 0) {
          reject(new Error('Nenhuma linha importável encontrada no ADP. Verifique se o arquivo é o ADP correto.'));
          return;
        }

        resolve(byPlatform);
      } catch (err) {
        reject(new Error(`Erro ao ler XLSX: ${err.message}`));
      }
    };
    reader.onerror = () => reject(new Error('Falha ao ler o arquivo'));
    reader.readAsArrayBuffer(file);
  });
}

// ─── Public API ───────────────────────────────────────────────────────────────
window.F2AdpImport = {
  importAdpFile,
  ADP_PLATFORM_MAP,
  ADP_SHEET_DEFAULT,
};
