// ============================================================
// SISTEMA_ABAS_ANO.gs — Unilever / Cadastra — Stormx
// v20 — Semáforo REAL cross-script via célula CampaignID!Z1
//        (substitui ScriptProperties — agora compartilhado de fato
//        com scripts externos que usam openById() )
//        + DocumentLock interno
//        + getDropdownData retorna abaAtiva (para dialog header)
//        H segue G | aba auto jan | bloqueio ano futuro | menu dialog
//        validação duplicata col D (Responsável = Felipe)
// ============================================================

// --------------- CONSTANTES ---------------------------------

const PRIMEIRO_ANO         = 2025;
const MARGEM_LINHAS        = 300;
const PRIMEIRA_LINHA_DADOS = 2;
const RESPONSAVEL_ALVO     = 'Felipe';

// Semáforo via célula — compartilhado com F4 Web App via mesma célula
// Célula CampaignID!Z1 está fora do alcance dos dados (col 26, linha 1)
const _LOCK_SHEET_NOME = 'CampaignID';
const _LOCK_CELL_ADDR  = 'Z1';
const _SEM_TIMEOUT     = 15000; // 15s
const _SEM_POLL        = 300;   // polling a cada 300ms

const HEADERS = [
  'Data de Inclusão',
  'Novo Campaing Local',
  'DE/PARA Campaing Local',
  'EXTRA',
  'DE/PARA EXTRA',
  'Brand Name',
  'Campaign Name',
  'CN CODE',
  'Responsável',
  'Agência',
  'Obs'
];

// --------------- ABERTURA -----------------------------------

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('📋 AdOps')
    .addItem('＋ Nova linha no topo', 'novaLinhaNoTopo')
    .addToUi();

  _comLock(function() {
    _preencherCnCodeTodasAbas();
    _auditarAbas();
    _sugerirAbaAnoAtual();
  }, true);
}

// --------------- SEMÁFORO CROSS-SCRIPT VIA CÉLULA -----------
// Usa CampaignID!Z1 como mutex compartilhado.
// Funciona entre scripts separados (F4 Web App via openById e
// este script bound) porque ambos acessam a mesma célula da planilha.
// Padrão CAS: escreve timestamp → flush → lê de volta → confirma posse.
// Zombie: lock com > 30s sem liberação é descartado automaticamente.

function _celSemAcquire(ss) {
  const sheet = ss.getSheetByName(_LOCK_SHEET_NOME);
  if (!sheet) return true; // aba não existe: deixa passar sem travar

  const cell   = sheet.getRange(_LOCK_CELL_ADDR);
  const inicio = Date.now();

  while (Date.now() - inicio < _SEM_TIMEOUT) {
    SpreadsheetApp.flush();
    const atual = String(cell.getValue() || '').trim();

    // Zombie: lock > 30s sem liberação → força limpeza
    if (atual && !isNaN(atual) && Date.now() - parseInt(atual) > 30000) {
      cell.clearContent();
      SpreadsheetApp.flush();
      Utilities.sleep(150);
      continue;
    }

    if (!atual) {
      const myTs = String(Date.now());
      cell.setValue(myTs);
      SpreadsheetApp.flush();
      Utilities.sleep(100); // janela para detectar conflito com outro script
      const confirmado = String(cell.getValue() || '').trim();
      if (confirmado === myTs) return true; // posse confirmada
      // Outro script escreveu antes: continua esperando
    }
    Utilities.sleep(_SEM_POLL);
  }
  return false;
}

function _celSemRelease(ss) {
  try {
    const sheet = ss.getSheetByName(_LOCK_SHEET_NOME);
    if (sheet) {
      sheet.getRange(_LOCK_CELL_ADDR).clearContent();
      SpreadsheetApp.flush();
    }
  } catch(e) {}
}

/**
 * Executa fn() com semáforo cross-script via célula + DocumentLock interno.
 * @param {Function} fn         - função a executar com exclusividade
 * @param {boolean}  silencioso - true = sem alert (headless/triggers)
 */
function _comLock(fn, silencioso) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. Semáforo cross-script via célula CampaignID!Z1
  if (!_celSemAcquire(ss)) {
    if (!silencioso) {
      try {
        SpreadsheetApp.getUi().alert(
          '⏳ Planilha em uso\n\n' +
          'Outra operação está sendo gravada agora.\n' +
          'Aguarde alguns segundos e tente novamente.'
        );
      } catch(e) {}
    }
    console.warn('[LOCK] Semáforo de célula não adquirido. Operação cancelada.');
    return null;
  }

  // 2. Lock nativo do documento (proteção intra-script)
  const lock = LockService.getDocumentLock();
  if (!lock.tryLock(12000)) {
    _celSemRelease(ss);
    if (!silencioso) {
      try {
        SpreadsheetApp.getUi().alert(
          '⏳ Planilha em uso\n\n' +
          'Outra operação está sendo gravada agora.\n' +
          'Aguarde alguns segundos e tente novamente.'
        );
      } catch(e) {}
    }
    console.warn('[LOCK] DocumentLock não adquirido. Operação cancelada.');
    return null;
  }

  try {
    return fn();
  } finally {
    lock.releaseLock();
    _celSemRelease(ss);
  }
}

// --------------- HELPERS ------------------------------------

function _openRange(sheet, col, minRow) {
  const totalRows = sheet.getMaxRows();
  const numRows   = Math.max(totalRows - minRow + 1, 1);
  return sheet.getRange(minRow, col, numRows, 1);
}

function _isAbaAtiva(nome) {
  return /^\d{4}$/.test(nome) && parseInt(nome, 10) >= PRIMEIRO_ANO;
}

function _jaConfigurada(sheet) {
  return sheet.getRange('A1').getValue() === HEADERS[0];
}

function _dataHoje() {
  const hoje = new Date();
  return String(hoje.getDate()).padStart(2, '0') + '/' +
         String(hoje.getMonth() + 1).padStart(2, '0');
}

function _ultimaLinhaDrops(sheet) {
  const last = Math.max(sheet.getLastRow(), PRIMEIRA_LINHA_DADOS);
  const max  = sheet.getMaxRows();
  return Math.min(last + MARGEM_LINHAS, max);
}

function _getRefSheets(ss) {
  const brandSheet = ss.getSheetByName('Brand');
  const campSheet  = ss.getSheetByName('CampaignID');
  if (!brandSheet || !campSheet) {
    const faltando = [
      !brandSheet ? 'Brand'      : null,
      !campSheet  ? 'CampaignID' : null
    ].filter(Boolean).join(', ');
    console.error('[SISTEMA_ABAS] Aba(s) não encontrada(s): ' + faltando);
    return null;
  }
  return { brandSheet, campSheet };
}

// --------------- LOOKUP CN CODE -----------------------------

function _buildCampMap(campSheet) {
  const dados = campSheet
    .getRange(2, 1, Math.max(campSheet.getLastRow() - 1, 1), 2)
    .getValues();
  const mapa = {};
  dados.forEach(function(row) {
    const chave = row[0] ? row[0].toString().trim() : '';
    if (chave) mapa[chave] = row[1] ? row[1].toString().trim() : '';
  });
  return mapa;
}

function _lookupCnCode(mapa, valorG) {
  const chave = valorG ? valorG.toString().trim() : '';
  if (!chave) return '';
  return (mapa[chave] !== undefined && mapa[chave] !== '')
    ? mapa[chave]
    : 'Verificar Campanha';
}

// Preenche H: lookup se G tem valor, '' se G vazio
function _preencherHNaAba(sheet, campSheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < PRIMEIRA_LINHA_DADOS) return;

  const mapa    = _buildCampMap(campSheet);
  const numRows = lastRow - PRIMEIRA_LINHA_DADOS + 1;
  const colG    = sheet.getRange(PRIMEIRA_LINHA_DADOS, 7, numRows, 1).getValues();
  const novosH  = colG.map(function(row) {
    const val = row[0] ? row[0].toString().trim() : '';
    return [val !== '' ? _lookupCnCode(mapa, row[0]) : ''];
  });
  sheet.getRange(PRIMEIRA_LINHA_DADOS, 8, numRows, 1).setValues(novosH);
}

function _preencherCnCodeTodasAbas() {
  const ss   = SpreadsheetApp.getActiveSpreadsheet();
  const refs = _getRefSheets(ss);
  if (!refs) return;
  ss.getSheets().forEach(function(sheet) {
    if (_isAbaAtiva(sheet.getName())) {
      _preencherHNaAba(sheet, refs.campSheet);
    }
  });
}

// --------------- LINHA VAZIA --------------------------------

function _linhaVazia(sheet, row) {
  const vals = sheet.getRange(row, 2, 1, 10).getValues()[0];
  return vals.every(function(v) { return v === '' || v === null || v === 0; });
}

// --------------- SNAPSHOT DE ABAS ---------------------------

function _salvarSnapshotAbas() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const nomes = ss.getSheets()
                  .map(function(s) { return s.getName(); })
                  .filter(_isAbaAtiva);
  PropertiesService.getDocumentProperties()
    .setProperty('SNAPSHOT_ABAS', JSON.stringify(nomes));
}

function _lerSnapshotAbas() {
  const raw = PropertiesService.getDocumentProperties()
                .getProperty('SNAPSHOT_ABAS');
  return raw ? JSON.parse(raw) : null;
}

// --------------- AUDITORIA: bloqueia ano futuro -------------

function _auditarAbas() {
  const ss       = SpreadsheetApp.getActiveSpreadsheet();
  const anoAtual = new Date().getFullYear();
  const atual    = ss.getSheets()
                     .map(function(s) { return s.getName(); })
                     .filter(_isAbaAtiva);
  const snap     = _lerSnapshotAbas();

  if (!snap) { _salvarSnapshotAbas(); return; }

  const adicionadas = atual.filter(function(n) { return snap.indexOf(n) === -1; });

  adicionadas.forEach(function(nome) {
    const ano   = parseInt(nome, 10);
    const sheet = ss.getSheetByName(nome);
    if (!sheet) return;

    if (ano > anoAtual) {
      ss.deleteSheet(sheet);
      try {
        SpreadsheetApp.getUi().alert(
          '⛔ Criação bloqueada\n\n' +
          'A aba "' + nome + '" não pode ser criada manualmente.\n' +
          'Ela será gerada automaticamente em 01/01/' + ano + '.'
        );
      } catch(e) {}
      _salvarSnapshotAbas();
      return;
    }

    if (!_jaConfigurada(sheet)) _setupAba(sheet);
  });

  _salvarSnapshotAbas();
}

// --------------- SUGESTÃO ABA ANO ATUAL ---------------------

function _sugerirAbaAnoAtual() {
  const ss       = SpreadsheetApp.getActiveSpreadsheet();
  const anoAtual = new Date().getFullYear().toString();
  if (ss.getSheetByName(anoAtual)) return;
  _criarAbaAno(ss, anoAtual);
}

// --------------- OCULTAR COLUNA C ---------------------------

function _ocultarColunaC(sheet) {
  try { sheet.hideColumns(3); } catch(e) {
    console.error('[SISTEMA_ABAS] Erro ao ocultar C: ' + e.message);
  }
}

// --------------- PROTEÇÃO DO CABEÇALHO ----------------------

function _reverterCabecalho(sheet) {
  sheet.getRange(1, 1, 1, HEADERS.length)
       .setValues([HEADERS])
       .setBackground('#4a4a4a')
       .setFontColor('#ffffff')
       .setFontWeight('bold')
       .setHorizontalAlignment('center');
  sheet.setRowHeight(1, 30);
}

// --------------- VALIDAÇÕES (DROPS) -------------------------

function _aplicarDrops(sheet, brandSheet, campSheet) {
  const ultima = _ultimaLinhaDrops(sheet);
  const regras = [
    { range: 'F' + PRIMEIRA_LINHA_DADOS + ':F' + ultima, source: _openRange(brandSheet, 1, 2) },
    { range: 'G' + PRIMEIRA_LINHA_DADOS + ':G' + ultima, source: _openRange(campSheet,  1, 2) },
    { range: 'I' + PRIMEIRA_LINHA_DADOS + ':I' + ultima, source: _openRange(brandSheet, 3, 2) },
    { range: 'J' + PRIMEIRA_LINHA_DADOS + ':J' + ultima, source: _openRange(brandSheet, 5, 2) },
  ];
  regras.forEach(function(r) {
    sheet.getRange(r.range).setDataValidation(
      SpreadsheetApp.newDataValidation()
        .requireValueInRange(r.source, true)
        .setAllowInvalid(true)
        .build()
    );
  });
}

function _corrigirDrops(sheet) {
  const ss   = SpreadsheetApp.getActiveSpreadsheet();
  const refs = _getRefSheets(ss);
  if (!refs) return;
  _aplicarDrops(sheet, refs.brandSheet, refs.campSheet);
}

// --------------- FORMATAÇÃO CONDICIONAL: DUPLICATAS ---------

function _aplicarCondicionalDuplicata(sheet) {
  const ultimaLinha = _ultimaLinhaDrops(sheet);
  const dataRange   = sheet.getRange(
    PRIMEIRA_LINHA_DADOS, 1,
    ultimaLinha - PRIMEIRA_LINHA_DADOS + 1,
    HEADERS.length
  );

  const f       = PRIMEIRA_LINHA_DADOS;
  const formula =
    '=E(' +
      '$I' + f + '="' + RESPONSAVEL_ALVO + '";' +
      '$D' + f + '<>"";' +
      'CONT.SES($B:$B;$B' + f + ';$H:$H;$H' + f + ';$D:$D;$D' + f + ')>1' +
    ')';

  const novaRegra = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied(formula)
    .setBackground('#FF6B6B')
    .setFontColor('#FFFFFF')
    .setRanges([dataRange])
    .build();

  const regras = sheet.getConditionalFormatRules().filter(function(r) {
    const style = r.getBooleanCondition();
    return !(style && style.getBackground() === '#FF6B6B');
  });
  regras.unshift(novaRegra);
  sheet.setConditionalFormatRules(regras);
}

// --------------- HELPER: verifica duplicata via código ------

function _isDuplicata(sheet, row) {
  const vals = sheet.getRange(row, 1, 1, HEADERS.length).getValues()[0];
  const resp = vals[8]; // col I — Responsável
  const colD = vals[3]; // col D — EXTRA
  const colB = vals[1]; // col B — Novo Campaign Local
  const colH = vals[7]; // col H — CN CODE

  if (resp !== RESPONSAVEL_ALVO || colD === '' || colD === null) return false;

  const lastRow = sheet.getLastRow();
  if (lastRow < PRIMEIRA_LINHA_DADOS) return false;

  const dados = sheet.getRange(
    PRIMEIRA_LINHA_DADOS, 1,
    lastRow - PRIMEIRA_LINHA_DADOS + 1,
    HEADERS.length
  ).getValues();

  let count = 0;
  dados.forEach(function(r, i) {
    if ((i + PRIMEIRA_LINHA_DADOS) === row) return;
    if (r[1] === colB && r[7] === colH && r[3] === colD) count++;
  });

  return count > 0;
}

// --------------- SETUP COMPLETO DA ABA ----------------------

let _setupEmAndamento = false;

function _setupAba(sheet) {
  if (_setupEmAndamento) return;
  _setupEmAndamento = true;
  try {
    const ss   = SpreadsheetApp.getActiveSpreadsheet();
    const refs = _getRefSheets(ss);
    if (!refs) return;

    _reverterCabecalho(sheet);

    const ultima = _ultimaLinhaDrops(sheet);
    sheet.getRange('A' + PRIMEIRA_LINHA_DADOS + ':A' + ultima).setNumberFormat('@STRING@');

    _aplicarDrops(sheet, refs.brandSheet, refs.campSheet);
    _preencherHNaAba(sheet, refs.campSheet);
    _ocultarColunaC(sheet);
    _aplicarCondicionalDuplicata(sheet);
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, HEADERS.length);
    _salvarSnapshotAbas();
  } finally {
    _setupEmAndamento = false;
  }
}

// --------------- CRIAR ABA DO ANO ---------------------------

function _criarAbaAno(ss, nomeNovo) {
  if (ss.getSheetByName(nomeNovo)) return;

  const anoAnt  = (parseInt(nomeNovo, 10) - 1).toString();
  const baseAba = ss.getSheetByName(anoAnt);
  let novaAba;

  if (baseAba) {
    novaAba = baseAba.copyTo(ss);
    novaAba.setName(nomeNovo);
    ss.setActiveSheet(novaAba);
    ss.moveActiveSheet(baseAba.getIndex() + 1);

    const lastRow = novaAba.getLastRow();
    if (lastRow > 1) {
      novaAba.getRange(2, 1, lastRow - 1, novaAba.getLastColumn()).clearContent();
    }
    _reverterCabecalho(novaAba);
    _ocultarColunaC(novaAba);
    const ultima = _ultimaLinhaDrops(novaAba);
    novaAba.getRange('A' + PRIMEIRA_LINHA_DADOS + ':A' + ultima).setNumberFormat('@STRING@');
    _corrigirDrops(novaAba);
    _aplicarCondicionalDuplicata(novaAba);
  } else {
    novaAba = ss.insertSheet(nomeNovo);
    _reverterCabecalho(novaAba);
    novaAba.setFrozenRows(1);
    const ultima = _ultimaLinhaDrops(novaAba);
    novaAba.getRange('A' + PRIMEIRA_LINHA_DADOS + ':A' + ultima).setNumberFormat('@STRING@');
    const refs = _getRefSheets(ss);
    if (refs) _aplicarDrops(novaAba, refs.brandSheet, refs.campSheet);
    _ocultarColunaC(novaAba);
    _aplicarCondicionalDuplicata(novaAba);
    novaAba.autoResizeColumns(1, HEADERS.length);
  }

  _salvarSnapshotAbas();
  console.log('[SISTEMA_ABAS] Aba ' + nomeNovo + ' criada automaticamente.');
}

// --------------- TRIGGER MENSAL: só age em janeiro ----------

function criarAbaAnoAutomatico() {
  if (new Date().getMonth() !== 0) return;
  _comLock(function() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    _criarAbaAno(ss, new Date().getFullYear().toString());
  }, true);
}

// --------------- AUTO-DATA ----------------------------------

function _preencherDataNaAba(sheet) {
  const data    = _dataHoje();
  const lastRow = sheet.getLastRow();
  if (lastRow < PRIMEIRA_LINHA_DADOS) return;

  const numLinhas = lastRow - PRIMEIRA_LINHA_DADOS + 1;
  const valores   = sheet.getRange(PRIMEIRA_LINHA_DADOS, 1, numLinhas, 11).getValues();
  const linhasParaAtualizar = [];

  for (let i = 0; i < valores.length; i++) {
    const linha  = valores[i];
    const aVazio = (linha[0] === '' || linha[0] === null || linha[0] === 0);
    if (!aVazio) continue;
    for (let j = 1; j <= 10; j++) {
      if (linha[j].toString().trim() !== '') { linhasParaAtualizar.push(i); break; }
    }
  }

  if (linhasParaAtualizar.length === 0) return;

  let grupo = [linhasParaAtualizar[0]];
  const _flush = function(g) {
    const startRow = g[0] + PRIMEIRA_LINHA_DADOS;
    const range    = sheet.getRange(startRow, 1, g.length, 1);
    range.setNumberFormat('@STRING@');
    range.setValues(g.map(function() { return [data]; }));
  };
  for (let k = 1; k < linhasParaAtualizar.length; k++) {
    if (linhasParaAtualizar[k] === linhasParaAtualizar[k - 1] + 1) {
      grupo.push(linhasParaAtualizar[k]);
    } else {
      _flush(grupo);
      grupo = [linhasParaAtualizar[k]];
    }
  }
  _flush(grupo);
}

// --------------- MENU: abre diálogo de nova linha -----------

function novaLinhaNoTopo() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();

  if (!_isAbaAtiva(sheet.getName())) {
    SpreadsheetApp.getUi().alert('Use essa função apenas nas abas de ano (ex: 2026).');
    return;
  }

  // Nota: o lock real está em processarNovasLinhas (chamado pelo dialog).
  // novaLinhaNoTopo apenas abre o dialog — não escreve nada aqui.
  const html = HtmlService.createHtmlOutputFromFile('DialogNovaLinha')
    .setWidth(680)
    .setHeight(540);
  SpreadsheetApp.getUi().showModalDialog(html, 'Nova linha no topo');
}

// --------------- SERVER: dados para os dropdowns ------------

function getDropdownData() {
  const ss        = SpreadsheetApp.getActiveSpreadsheet();
  const refs      = _getRefSheets(ss);
  if (!refs) return { brands: [], camps: [], resps: [], agencias: [], abaAtiva: '' };

  const { brandSheet, campSheet } = refs;

  function _col(sheet, col) {
    const last = Math.max(sheet.getLastRow() - 1, 0);
    if (last === 0) return [];
    return sheet.getRange(2, col, last, 1).getValues()
      .map(function(r) { return r[0] ? r[0].toString().trim() : ''; })
      .filter(function(v) { return v !== ''; });
  }

  // Mapeamento fixo e-mail → nome do responsável
  const EMAIL_RESP_MAP = {
    'joao.braga@stormx.com.br':     'João',
    'felipe.lima@stormx.com.br':    'Felipe',
    'marcos.santos@stormx.com.br':  'Marcão',
    'carolina.dobner@stormx.com.br':'Carolina'
  };
  let currentResp = '';
  try {
    const email = (
      Session.getActiveUser().getEmail() ||
      Session.getEffectiveUser().getEmail() || ''
    ).toLowerCase().trim();
    currentResp = EMAIL_RESP_MAP[email] || '';
  } catch(e) { /* sem permissão de email: silencioso */ }

  // Nome da aba destino (exibido no cabeçalho do dialog)
  const abaAtiva = ss.getActiveSheet().getName();

  // Pares Brand+CampaignLocal já existentes na aba ativa (para deduplicação no dialog ADP)
  let existentes = [];
  if (_isAbaAtiva(abaAtiva)) {
    const sheet   = ss.getActiveSheet();
    const lastRow = sheet.getLastRow();
    if (lastRow >= PRIMEIRA_LINHA_DADOS) {
      const numRows = lastRow - PRIMEIRA_LINHA_DADOS + 1;
      // cols B (2) e F (6) → índices 1 e 5 (0-based no getValues)
      const vals = sheet.getRange(PRIMEIRA_LINHA_DADOS, 1, numRows, 6).getValues();
      vals.forEach(function(r) {
        const brand = (r[5] || '').toString().trim();  // col F
        const cl    = (r[1] || '').toString().trim();  // col B
        if (brand && cl) existentes.push(brand + '|' + cl);
      });
    }
  }

  return {
    brands:      _col(brandSheet, 1),
    camps:       _col(campSheet,  1),
    resps:       _col(brandSheet, 3),
    agencias:    _col(brandSheet, 5),
    currentResp: currentResp,
    abaAtiva:    _isAbaAtiva(abaAtiva) ? abaAtiva : '',
    existentes:  existentes
  };
}

// --------------- SERVER: insere linhas (menu) ---------------

function processarNovasLinhas(dados) {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  if (!_isAbaAtiva(sheet.getName())) return;

  _comLock(function() {
    const qtd    = Math.min(Math.max(parseInt(dados.qty, 10) || 1, 1), 20);
    sheet.insertRows(PRIMEIRA_LINHA_DADOS, qtd);

    const refs   = _getRefSheets(ss);
    const mapa   = refs ? _buildCampMap(refs.campSheet) : {};
    const cnCode = dados.colG ? _lookupCnCode(mapa, dados.colG) : '';
    const hoje   = _dataHoje();

    // dExtras: array com um valor de D por linha
    const dExtras = Array.isArray(dados.dExtras) ? dados.dExtras : [];

    // Batch write: monta matriz A–K para inserção de uma vez
    const batch = [];
    for (let i = 0; i < qtd; i++) {
      batch.push([
        hoje,                             // A — data
        dados.colB    || '',              // B — Novo Campaign Local
        dados.colC    || '',              // C — DE/PARA Campaign Local (opcional)
        dExtras[i]    || '',              // D — EXTRA (por linha)
        dados.colE    || '',              // E — DE/PARA EXTRA
        dados.colF    || '',              // F — Brand Name
        dados.colG    || '',              // G — Campaign Name
        cnCode,                           // H — CN CODE (lookup de G)
        dados.colI    || '',              // I — Responsável
        dados.colJ    || '',              // J — Agência
        dados.colK    || ''               // K — Obs
      ]);
    }

    const range = sheet.getRange(PRIMEIRA_LINHA_DADOS, 1, qtd, 11);
    range.setValues(batch);
    // Garante col A como texto (formato dd/mm)
    sheet.getRange(PRIMEIRA_LINHA_DADOS, 1, qtd, 1).setNumberFormat('@STRING@');

    _corrigirDrops(sheet);
    return { msg: qtd + (qtd === 1 ? ' linha inserida' : ' linhas inseridas') + '!' };
  });
}

// --------------- SERVER: insere linhas do ADP ---------------
// payload: { linhas:[{colB,colD,colF,colG},...], colC, colE, colI, colJ, colK, aba }
// Extra "na" ou vazio já vem sanitizado como '' pelo dialog.

function processarLinhasADP(payload) {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const nomeAba = payload.aba || ss.getActiveSheet().getName();
  const sheet = ss.getSheetByName(nomeAba) || ss.getActiveSheet();
  if (!_isAbaAtiva(sheet.getName())) return { msg: 'Aba inválida.' };

  const linhas = Array.isArray(payload.linhas) ? payload.linhas : [];
  if (!linhas.length) return { msg: 'Nenhuma linha selecionada.' };

  _comLock(function() {
    const qtd  = linhas.length;
    sheet.insertRows(PRIMEIRA_LINHA_DADOS, qtd);

    const refs = _getRefSheets(ss);
    const mapa = refs ? _buildCampMap(refs.campSheet) : {};
    const hoje = _dataHoje();

    const batch = linhas.map(function(l) {
      const cnCode = l.colG ? _lookupCnCode(mapa, l.colG) : '';
      return [
        hoje,                   // A — data
        l.colB    || '',        // B — Campaign Local
        payload.colC || '',     // C — DE/PARA (compartilhado)
        l.colD    || '',        // D — Extra (por linha; "na" já veio como "")
        payload.colE || '',     // E — DE/PARA EXTRA (compartilhado)
        l.colF    || '',        // F — Brand
        l.colG    || '',        // G — Campaign Global
        cnCode,                 // H — CN CODE
        payload.colI || '',     // I — Responsável (compartilhado)
        payload.colJ || '',     // J — Agência (compartilhado)
        payload.colK || ''      // K — Obs (compartilhado)
      ];
    });

    sheet.getRange(PRIMEIRA_LINHA_DADOS, 1, qtd, 11).setValues(batch);
    sheet.getRange(PRIMEIRA_LINHA_DADOS, 1, qtd, 1).setNumberFormat('@STRING@');
    _corrigirDrops(sheet);
    return { msg: qtd + (qtd === 1 ? ' linha inserida' : ' linhas inseridas') + ' do ADP!' };
  });
}

// --------------- SERVER: desfaz última importação ADP -------
// payload: { qtd: N, aba: 'nomeAba' }
// Remove as primeiras N linhas de dados (topo da aba), que são
// exatamente as que processarLinhasADP acabou de inserir.

function desfazADP(payload) {
  const ss      = SpreadsheetApp.getActiveSpreadsheet();
  const nomeAba = payload.aba || ss.getActiveSheet().getName();
  const sheet   = ss.getSheetByName(nomeAba) || ss.getActiveSheet();
  if (!_isAbaAtiva(sheet.getName())) return { msg: 'Aba inválida.' };

  const qtd = parseInt(payload.qtd, 10) || 0;
  if (qtd <= 0) return { msg: 'Nada a desfazer.' };

  const lastRow = sheet.getLastRow();
  if (lastRow < PRIMEIRA_LINHA_DADOS) return { msg: 'Aba sem dados.' };

  const disponivel = lastRow - PRIMEIRA_LINHA_DADOS + 1;
  const remover    = Math.min(qtd, disponivel);

  _comLock(function() {
    sheet.deleteRows(PRIMEIRA_LINHA_DADOS, remover);
    _corrigirDrops(sheet);
  });

  return { msg: remover + ' linha(s) removida(s). Importação desfeita.' };
}

// --------------- TRIGGER onEdit -----------------------------

function onEdit(e) {
  if (!e || !e.range) return;

  const range = e.range;
  const sheet = range.getSheet();
  const nome  = sheet.getName();
  if (!_isAbaAtiva(nome)) return;

  const col     = range.getColumn();
  const row     = range.getRow();
  const numRows = range.getNumRows();
  const numCols = range.getNumColumns();

  if (!_jaConfigurada(sheet)) { _comLock(function(){ _setupAba(sheet); }, true); return; }
  if (row === 1)              { _comLock(function(){ _reverterCabecalho(sheet); }, true); return; }
  if (col === 1)              { _comLock(function(){ range.clearContent(); }, true); return; }

  _comLock(function() {
    const ss   = SpreadsheetApp.getActiveSpreadsheet();
    const refs = _getRefSheets(ss);

    // Col G → atualiza H
    const colFim = col + numCols - 1;
    if (col <= 7 && colFim >= 7 && refs) {
      const mapa          = _buildCampMap(refs.campSheet);
      const primeiraLinha = Math.max(row, PRIMEIRA_LINHA_DADOS);
      const ultimaLinha   = row + numRows - 1;
      for (let r = primeiraLinha; r <= ultimaLinha; r++) {
        const valorG = sheet.getRange(r, 7).getValue();
        const hVal   = (valorG !== '' && valorG !== null)
                       ? _lookupCnCode(mapa, valorG)
                       : '';
        sheet.getRange(r, 8).setValue(hVal);
      }
    }

    // Drops
    const dropCols = { 6: true, 7: true, 9: true, 10: true };
    if (dropCols[col] && !range.getDataValidation()) { _corrigirDrops(sheet); }

    // Auto-data
    if (row >= PRIMEIRA_LINHA_DADOS) {
      for (let r = row; r < row + numRows; r++) {
        if (r < PRIMEIRA_LINHA_DADOS) continue;
        const dateCell = sheet.getRange(r, 1);
        dateCell.setNumberFormat('@STRING@');
        if (_linhaVazia(sheet, r)) {
          dateCell.clearContent();
        } else if (dateCell.getValue().toString().trim() === '') {
          dateCell.setValue(_dataHoje());
        }
      }
    }
  }, true);

  // Alerta duplicata FORA do lock (apenas leitura + UI)
  if (col === 4 && row >= PRIMEIRA_LINHA_DADOS) {
    for (let r = row; r < row + numRows; r++) {
      if (_isDuplicata(sheet, r)) {
        try {
          SpreadsheetApp.getUi().alert(
            '⚠️ Linha duplicada\n\n' +
            'A combinação de Campaign Local (B), CN CODE (H) e EXTRA (D) já existe.\n' +
            'A linha foi destacada em vermelho.'
          );
        } catch(e2) {}
        break;
      }
    }
  }
}
