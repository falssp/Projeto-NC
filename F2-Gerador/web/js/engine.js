/**
 * F2 Naming Engine
 * Reads platform JSON configs, renders form fields, generates naming in real-time.
 */

// ─── State ───────────────────────────────────────────────────────────────────
let LISTS = {};
let PLATFORMS = [];
let currentPlatform = null;
let rows = []; // each row = { camp: {colValues}, ag: {colValues}, ad: {colValues} }
let currentRowIndex = 0;

// ─── Constants ───────────────────────────────────────────────────────────────
const PLATFORM_IDS = [
  'amazon-dsp','compra-direta','dv360-prog','dv360-td',
  'dv360-yt-auction','dv360-yt-reserva','flashtalking',
  'google-others','google-search','google-video',
  'meta','pinterest','tiktok','twitter'
];

// ─── Init ─────────────────────────────────────────────────────────────────────
async function init() {
  // Load lists first
  const listsResp = await fetch('config/lists.json');
  LISTS = await listsResp.json();

  // Load all platform configs
  const platPromises = PLATFORM_IDS.map(id =>
    fetch(`config/${id}.json`).then(r => r.json())
  );
  PLATFORMS = await Promise.all(platPromises);

  buildSidebar();
  selectPlatform(PLATFORMS[0]);
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function buildSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.innerHTML = '';
  PLATFORMS.forEach(p => {
    const btn = document.createElement('button');
    btn.className = 'platform-btn';
    btn.textContent = p.name;
    btn.dataset.id = p.id;
    btn.style.setProperty('--pcolor', p.color);
    btn.addEventListener('click', () => selectPlatform(p));
    sidebar.appendChild(btn);
  });
}

// ─── Platform Selection ───────────────────────────────────────────────────────
function selectPlatform(platform) {
  currentPlatform = platform;
  rows = [newRow()];
  currentRowIndex = 0;

  // Update sidebar active state
  document.querySelectorAll('.platform-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.id === platform.id);
  });

  // Update header color
  document.getElementById('platform-title').textContent = platform.name;
  document.getElementById('platform-header').style.borderColor = platform.color;

  renderForm();
  renderRowTabs();
  updateResults();
}

function newRow() {
  return { camp: {}, ag: {}, ad: {} };
}

// ─── Row Tabs ─────────────────────────────────────────────────────────────────
function renderRowTabs() {
  const tabsEl = document.getElementById('row-tabs');
  tabsEl.innerHTML = '';

  rows.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.className = 'row-tab' + (i === currentRowIndex ? ' active' : '');
    btn.textContent = `Linha ${i + 1}`;
    btn.addEventListener('click', () => { currentRowIndex = i; renderForm(); updateResults(); renderRowTabs(); });
    tabsEl.appendChild(btn);
  });

  const addBtn = document.createElement('button');
  addBtn.className = 'row-tab add-row';
  addBtn.textContent = '+ Linha';
  addBtn.addEventListener('click', addRow);
  tabsEl.appendChild(addBtn);
}

function addRow() {
  rows.push(newRow());
  currentRowIndex = rows.length - 1;
  renderForm();
  renderRowTabs();
  updateResults();
}

// ─── Form Rendering ───────────────────────────────────────────────────────────
function renderForm() {
  const p = currentPlatform;
  const levelNames = { camp: 'Campanha', ag: 'AdGroup', ad: 'Ad' };
  const form = document.getElementById('form-area');
  form.innerHTML = '';

  const levels = p.levels;
  levels.forEach(lvl => {
    const cols = p.columns.filter(c => c.level === lvl);
    if (!cols.length) return;

    const section = document.createElement('section');
    section.className = 'level-section';
    section.innerHTML = `<h3 class="level-title">${levelNames[lvl] || lvl}</h3>`;

    const grid = document.createElement('div');
    grid.className = 'fields-grid';

    cols.forEach(col => {
      const field = buildField(col, lvl);
      grid.appendChild(field);
    });

    section.appendChild(grid);
    form.appendChild(section);
  });
}

function buildField(col, lvl) {
  const row = rows[currentRowIndex];
  const levelData = row[lvl] || {};
  const val = levelData[col.col] || '';

  const wrapper = document.createElement('div');
  wrapper.className = 'field-wrapper' + (col.optional ? ' optional' : '');

  const label = document.createElement('label');
  label.textContent = col.header;
  label.className = 'field-label';
  if (col.optional) {
    const opt = document.createElement('span');
    opt.className = 'optional-badge';
    opt.textContent = 'opc';
    label.appendChild(opt);
  }
  wrapper.appendChild(label);

  let input;

  switch (col.type) {
    case 'cn_drop': {
      // Dropdown of campaign names (from CN codes — for now a free text)
      input = document.createElement('input');
      input.type = 'text';
      input.className = 'field-input';
      input.placeholder = 'Nome da campanha...';
      input.value = val;
      input.addEventListener('input', () => { saveField(lvl, col.col, input.value); updateResults(); });
      break;
    }
    case 'cn_result': {
      // Read-only result field
      input = document.createElement('input');
      input.type = 'text';
      input.className = 'field-input result-field';
      input.readOnly = true;
      input.value = val;
      input.title = 'Campo calculado automaticamente';
      break;
    }
    case 'drop': {
      input = document.createElement('select');
      input.className = 'field-input';
      const listName = col.list;
      const options = LISTS[listName] || [];
      const emptyOpt = document.createElement('option');
      emptyOpt.value = '';
      emptyOpt.textContent = col.optional ? '— (opcional) —' : '— Selecione —';
      input.appendChild(emptyOpt);

      if (options[0] === '__dynamic__') {
        const dynOpt = document.createElement('option');
        dynOpt.value = '__dynamic__';
        dynOpt.textContent = '[Lista dinâmica — inserir manualmente]';
        input.appendChild(dynOpt);
        // Add a free text fallback
        const freeInput = document.createElement('input');
        freeInput.type = 'text';
        freeInput.className = 'field-input dynamic-free';
        freeInput.placeholder = 'Valor...';
        freeInput.value = val;
        freeInput.addEventListener('input', () => { saveField(lvl, col.col, freeInput.value); updateResults(); });
        wrapper.appendChild(label);
        wrapper.appendChild(freeInput);
        return wrapper;
      }

      options.forEach(opt => {
        const o = document.createElement('option');
        o.value = opt;
        o.textContent = opt;
        if (opt === val) o.selected = true;
        input.appendChild(o);
      });
      if (val && !options.includes(val)) input.value = '';
      input.addEventListener('change', () => { saveField(lvl, col.col, input.value); updateResults(); });
      break;
    }
    case 'free': {
      input = document.createElement('input');
      input.type = 'text';
      input.className = 'field-input';
      input.value = val;
      input.placeholder = col.optional ? '(opcional)' : '';
      input.addEventListener('input', () => { saveField(lvl, col.col, input.value); updateResults(); });
      break;
    }
    case 'formula': {
      input = document.createElement('input');
      input.type = 'text';
      input.className = 'field-input result-field formula-result';
      input.readOnly = true;
      input.value = val;
      input.title = 'Nome gerado automaticamente';
      break;
    }
    case 'age_lower': {
      input = document.createElement('select');
      input.className = 'field-input age-select';
      const emptyOpt = document.createElement('option');
      emptyOpt.value = '';
      emptyOpt.textContent = '—';
      input.appendChild(emptyOpt);
      LISTS.AgeLower.forEach(v => {
        const o = document.createElement('option');
        o.value = v; o.textContent = v;
        if (v === val) o.selected = true;
        input.appendChild(o);
      });
      input.addEventListener('change', () => { saveField(lvl, col.col, input.value); updateResults(); });
      break;
    }
    case 'age_upper': {
      input = document.createElement('select');
      input.className = 'field-input age-select';
      const emptyOpt = document.createElement('option');
      emptyOpt.value = '';
      emptyOpt.textContent = '—';
      input.appendChild(emptyOpt);
      LISTS.AgeUpper.forEach(v => {
        const o = document.createElement('option');
        o.value = v; o.textContent = v;
        if (v === val) o.selected = true;
        input.appendChild(o);
      });
      input.addEventListener('change', () => { saveField(lvl, col.col, input.value); updateResults(); });
      break;
    }
    case 'note': {
      input = document.createElement('textarea');
      input.className = 'field-input note-field';
      input.rows = 2;
      input.value = val;
      input.placeholder = 'Nota (não entra no nome)';
      input.addEventListener('input', () => { saveField(lvl, col.col, input.value); });
      break;
    }
    default: {
      input = document.createElement('input');
      input.type = 'text';
      input.className = 'field-input';
      input.value = val;
      input.addEventListener('input', () => { saveField(lvl, col.col, input.value); updateResults(); });
    }
  }

  wrapper.appendChild(input);
  return wrapper;
}

function saveField(lvl, col, value) {
  if (!rows[currentRowIndex][lvl]) rows[currentRowIndex][lvl] = {};
  rows[currentRowIndex][lvl][col] = value;
}

// ─── Formula Helpers ──────────────────────────────────────────────────────────

/** Optional pipe: | value if not empty */
function pp(val) {
  return val && val.trim() ? '|' + val.trim() : '';
}

/** Optional underscore: _ value if not empty */
function uu(val) {
  return val && val.trim() ? '_' + val.trim() : '';
}

/** Strip time from date-like value (just return as-is in web context) */
function sh(val) {
  return val ? val.trim() : '';
}

/** Age range: "lower-upper" or "lower" if upper empty */
function age(lower, upper) {
  if (!lower) return '';
  if (!upper || upper === lower) return lower;
  return lower + '-' + upper;
}

/** FsVsSeconds: if TipodeTag is vast/vpaid, use Seconds; else use FormatSize.
    Also validates FormatSize against FsBlocked list. */
function fsVsSeconds(fsVal, secVal, tagVal) {
  if (!tagVal) return fsVal || '';
  const tagLow = tagVal.toLowerCase();
  if (tagLow === 'vast' || tagLow === 'vpaid') {
    return secVal || '';
  }
  // Validate FS not in blocked list
  if (fsVal) {
    const fsLow = fsVal.toLowerCase().replace(/[\s-_]/g,'');
    const blocked = (LISTS.FsBlocked || []).map(b => b.toLowerCase().replace(/[\s-_]/g,''));
    if (blocked.some(b => fsLow.includes(b))) {
      return `⚠️FS_INVÁLIDO(${fsVal})`;
    }
  }
  return fsVal || '';
}

/** Lookup objective short code */
function objShort(val) {
  return (LISTS.ObjectiveShort || {})[val] || val || '';
}

/** Lookup obj otimizacao short code */
function objOtimShort(val) {
  return (LISTS.ObjOtimizacaoShort || {})[val] || val || '';
}

// ─── Formula Evaluation ───────────────────────────────────────────────────────

/** Get a column value from the current row (any level) */
function getCol(colId, rowData) {
  for (const lvl of ['camp', 'ag', 'ad']) {
    if (rowData[lvl] && rowData[lvl][colId] !== undefined) {
      return rowData[lvl][colId] || '';
    }
  }
  return '';
}

/** Evaluate a formula pattern string */
function evalPattern(pattern, rowData, platform) {
  // Tokenize by _ but be careful with age() and sh() tokens
  // Pattern tokens: plain colId, sh(colId), age(colId,colId), literal strings

  const tokens = tokenizePattern(pattern);
  const parts = [];

  for (const tok of tokens) {
    if (tok.type === 'col') {
      const val = getColValue(tok.col, rowData, platform);
      if (val) parts.push(val);
    } else if (tok.type === 'sh') {
      const val = sh(getColValue(tok.col, rowData, platform));
      if (val) parts.push(val);
    } else if (tok.type === 'age') {
      const lower = getColValue(tok.lower, rowData, platform);
      const upper = getColValue(tok.upper, rowData, platform);
      const a = age(lower, upper);
      if (a) parts.push(a);
    } else if (tok.type === 'literal') {
      parts.push(tok.value);
    }
  }

  return parts.join('_');
}

function tokenizePattern(pattern) {
  const tokens = [];
  // Split by _ but keep function calls intact
  let remaining = pattern;

  while (remaining.length > 0) {
    // Check for sh(...)
    const shMatch = remaining.match(/^sh\(([^)]+)\)/);
    if (shMatch) {
      tokens.push({ type: 'sh', col: shMatch[1] });
      remaining = remaining.slice(shMatch[0].length);
      if (remaining.startsWith('_')) remaining = remaining.slice(1);
      continue;
    }

    // Check for age(col1,col2)
    const ageMatch = remaining.match(/^age\(([^,]+),([^)]+)\)/);
    if (ageMatch) {
      tokens.push({ type: 'age', lower: ageMatch[1], upper: ageMatch[2] });
      remaining = remaining.slice(ageMatch[0].length);
      if (remaining.startsWith('_')) remaining = remaining.slice(1);
      continue;
    }

    // Plain col or literal up to next _
    const underIdx = remaining.indexOf('_');
    let token;
    if (underIdx === -1) {
      token = remaining;
      remaining = '';
    } else {
      token = remaining.slice(0, underIdx);
      remaining = remaining.slice(underIdx + 1);
    }

    if (token === 'na') {
      tokens.push({ type: 'literal', value: 'na' });
    } else if (token.match(/^\|/)) {
      tokens.push({ type: 'literal', value: token });
    } else {
      tokens.push({ type: 'col', col: token });
    }
  }

  return tokens;
}

/** Get processed column value (applying cn_result lookups, etc.) */
function getColValue(colId, rowData, platform) {
  const raw = getCol(colId, rowData);
  const colDef = platform.columns.find(c => c.col === colId);
  if (!colDef) return raw;

  if (colDef.type === 'cn_result') {
    // These are lookup results — for now return the computed value
    // (computed separately by computeCNResults)
    return getCol(colId, rowData);
  }

  return raw;
}

/** Handle Flashtalking campaign pattern which has pipe literals in pattern */
function evalFlashtalkingCampaign(pattern, rowData, platform) {
  // pattern: "B_C_na_na_D|na|na|na"
  // Result: "B_C_na_na_D|na|na|na" with col values substituted
  const B = getCol('B', rowData);
  const C = getCol('C', rowData);
  const D = getCol('D', rowData);

  return `${B}_${C}_na_na_${D}|na|na|na`;
}

// ─── IHAMP Ad Name Logic ──────────────────────────────────────────────────────
function buildIHAMPAdName(formula, rowData, platform) {
  const ihampVal = getCol(formula.ihamp_col, rowData);
  const withIHAMP = ihampVal === 'com-IHAMP';

  const basePattern = formula.base_pattern;
  // Expand base pattern, substituting [col] as optional bracket references
  const parts = [];

  // Parse base pattern tokens (handles _col_, [col], etc.)
  let remaining = basePattern;
  while (remaining.length > 0) {
    // Check for [col] bracket — becomes the raw value without brackets
    const bracketMatch = remaining.match(/^\[([^\]]+)\]/);
    if (bracketMatch) {
      const val = getCol(bracketMatch[1], rowData);
      if (val) parts.push(val);
      remaining = remaining.slice(bracketMatch[0].length);
      if (remaining.startsWith('_')) remaining = remaining.slice(1);
      continue;
    }

    // Check for sh(...)
    const shMatch = remaining.match(/^sh\(([^)]+)\)/);
    if (shMatch) {
      const val = sh(getCol(shMatch[1], rowData));
      if (val) parts.push(val);
      remaining = remaining.slice(shMatch[0].length);
      if (remaining.startsWith('_')) remaining = remaining.slice(1);
      continue;
    }

    // Plain col up to _
    const underIdx = remaining.indexOf('_');
    let token;
    if (underIdx === -1) { token = remaining; remaining = ''; }
    else { token = remaining.slice(0, underIdx); remaining = remaining.slice(underIdx + 1); }

    const val = getCol(token, rowData);
    if (val) parts.push(val);
  }

  // Add optional pipes based on IHAMP status
  const optPipes = withIHAMP
    ? (formula.with_ihamp_optional_pipes || formula.optional_pipes || [])
    : (formula.without_ihamp_optional_pipes || formula.optional_pipes || []);

  // IHAMP skips — columns to skip when with_ihamp
  const skips = withIHAMP ? (formula.with_ihamp_skips || []) : [];

  // Remove skipped cols from the base (they were already added above in base_pattern)
  // The skips refer to columns that appear in optional_pipes ONLY
  for (const colId of optPipes) {
    if (skips.includes(colId)) continue;
    const val = getCol(colId, rowData);
    if (val) parts.push('|' + val);
  }

  return parts.join('_');
}

// ─── Status Validation ────────────────────────────────────────────────────────
function computeStatus(platform, rowData) {
  const required = platform.columns.filter(c => !c.optional && c.type !== 'formula' && c.type !== 'cn_result' && c.type !== 'note');
  const missing = required.filter(c => {
    const val = getCol(c.col, rowData);
    return !val || val.trim() === '';
  });

  if (missing.length === 0) return '✅ OK';
  return `⚠️ ${missing.length} campo(s) em falta`;
}

// ─── cn_result computation (Objective-Short, ObjOtim-Short) ──────────────────
function computeCNResults(platform, rowData) {
  // Map cn_result cols based on what they follow
  platform.columns.forEach((col, idx) => {
    if (col.type !== 'cn_result') return;

    // Heuristic: look at header to determine what to compute
    const header = col.header;
    const lvl = col.level;

    if (header.includes('CN Code')) {
      // CN Code = the Campaign Name field (cn_drop) value — pass through for now
      // In real GAS, this is the campaign number from a registry — we skip for web
      const cnDropCol = platform.columns.find(c => c.type === 'cn_drop');
      if (cnDropCol) {
        const val = getCol(cnDropCol.col, rowData);
        setComputedCol(col.col, lvl, val, rowData);
      }
    } else if (header.includes('Objective-Short')) {
      // Look for Objective col
      const objCol = platform.columns.find(c => c.header === 'Objective');
      if (objCol) {
        const val = objShort(getCol(objCol.col, rowData));
        setComputedCol(col.col, lvl, val, rowData);
      }
    } else if (header.includes('Obj Otim-Short')) {
      const objOtimCol = platform.columns.find(c => c.header === 'Obj Otimização');
      if (objOtimCol) {
        const val = objOtimShort(getCol(objOtimCol.col, rowData));
        setComputedCol(col.col, lvl, val, rowData);
      }
    }
  });
}

function setComputedCol(colId, lvl, value, rowData) {
  if (!rowData[lvl]) rowData[lvl] = {};
  rowData[lvl][colId] = value;
}

// ─── Main Formula Computation ─────────────────────────────────────────────────
function computeFormulas(platform, rowData) {
  // First compute cn_results
  computeCNResults(platform, rowData);

  const results = {};
  const { formulas } = platform;

  for (const [level, fml] of Object.entries(formulas)) {
    let name = '';

    if (fml.type === 'ihamp') {
      name = buildIHAMPAdName(fml, rowData, platform);
    } else if (platform.id === 'flashtalking' && level === 'campaign') {
      name = evalFlashtalkingCampaign(fml.pattern, rowData, platform);
    } else {
      name = evalPattern(fml.pattern, rowData, platform);

      // Optional pipes
      for (const colId of (fml.optional_pipes || [])) {
        const val = getCol(colId, rowData);
        if (val) name += '|' + val;
      }

      // Optional underscores
      for (const colId of (fml.optional_underscores || [])) {
        const val = getCol(colId, rowData);
        if (val) name += '_' + val;
      }

      // Age pipe (google-video style: appended as pipe)
      if (fml.age_pipe) {
        const lower = getCol(fml.age_pipe.lower, rowData);
        const upper = getCol(fml.age_pipe.upper, rowData);
        const a = age(lower, upper);
        if (a) name += '|' + a;
      }

      // Extra pipe (google-video AE)
      if (fml.extra_pipe) {
        const val = getCol(fml.extra_pipe, rowData);
        if (val) name += '|' + val;
      }

      // fsVsSeconds
      if (fml.fs_vs_seconds) {
        const { fs_col, sec_col, tag_col, position } = fml.fs_vs_seconds;
        const fsVal = getCol(fs_col, rowData);
        const secVal = getCol(sec_col, rowData);
        const tagVal = getCol(tag_col, rowData);
        const computed = fsVsSeconds(fsVal, secVal, tagVal);
        // Replace the placeholder in name or append
        name = name + (computed ? '_' + computed : '');
      }
    }

    results[level] = name;

    // Store in rowData
    const targetCol = fml.col;
    const targetLevel = level === 'campaign' ? 'camp' : level === 'adgroup' ? 'ag' : 'ad';
    setComputedCol(targetCol, targetLevel, name, rowData);
  }

  // Status
  results.status = computeStatus(platform, rowData);

  return results;
}

// ─── Update Results Display ───────────────────────────────────────────────────
function updateResults() {
  const rowData = rows[currentRowIndex];
  const platform = currentPlatform;

  const results = computeFormulas(platform, rowData);

  // Update formula fields in the form
  platform.columns.forEach(col => {
    if (col.type !== 'formula' && col.type !== 'cn_result') return;

    let value = '';
    if (col.type === 'cn_result') {
      for (const lvl of ['camp', 'ag', 'ad']) {
        if (rowData[lvl] && rowData[lvl][col.col] !== undefined) {
          value = rowData[lvl][col.col] || '';
          break;
        }
      }
    } else if (col.type === 'formula') {
      // Find which formula level this col belongs to
      for (const [level, fml] of Object.entries(platform.formulas)) {
        if (fml.col === col.col) {
          value = results[level] || '';
          break;
        }
        // Status col
        if (col.header.includes('Status')) {
          value = results.status || '';
        }
      }
      if (col.header.includes('Status')) {
        value = results.status || '';
      }
    }

    // Find the DOM element for this field
    const inputs = document.querySelectorAll('.result-field, .formula-result');
    inputs.forEach(inp => {
      const wrapper = inp.closest('.field-wrapper');
      if (!wrapper) return;
      const label = wrapper.querySelector('.field-label');
      if (label && label.textContent.trim().startsWith(col.header.trim().replace(/📋 |✅ /,''))) {
        inp.value = value;
      }
    });
  });

  // Update results panel
  const panel = document.getElementById('results-panel');
  panel.innerHTML = '';

  const levelMap = { campaign: 'CAMPAIGN NAME', adgroup: 'ADGROUP NAME', ad: 'AD NAME' };

  for (const [level, name] of Object.entries(results)) {
    if (level === 'status') continue;
    const div = document.createElement('div');
    div.className = 'result-item';
    div.innerHTML = `
      <div class="result-label">${levelMap[level] || level.toUpperCase()}</div>
      <div class="result-name ${name ? '' : 'empty'}">${name || '(preencha os campos acima)'}</div>
      ${name ? `<button class="copy-btn" onclick="copyText(this, '${escapeForAttr(name)}')">Copiar</button>` : ''}
    `;
    panel.appendChild(div);
  }

  const statusDiv = document.createElement('div');
  statusDiv.className = 'result-status';
  statusDiv.textContent = results.status;
  panel.appendChild(statusDiv);
}

function copyText(btn, text) {
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.textContent;
    btn.textContent = '✓ Copiado!';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 1500);
  });
}

function escapeForAttr(str) {
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// ─── Export ───────────────────────────────────────────────────────────────────
function getAllResults() {
  const platform = currentPlatform;
  return rows.map((rowData, i) => {
    const results = computeFormulas(platform, rowData);
    return {
      row: i + 1,
      platform: platform.name,
      campaign: results.campaign || '',
      adgroup: results.adgroup || '',
      ad: results.ad || '',
      status: results.status || ''
    };
  });
}

// ─── Export interface ─────────────────────────────────────────────────────────
window.F2Engine = {
  init,
  selectPlatform,
  addRow,
  getAllResults,
  get currentPlatform() { return currentPlatform; },
  get rows() { return rows; },
  get PLATFORMS() { return PLATFORMS; }
};
