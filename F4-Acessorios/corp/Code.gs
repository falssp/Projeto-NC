// ============================================================
// NC Tool | Unilever BR x Grasp — Script F4
// F4 - Acessórios · Apps Script Web App — ORIGINAL
//
// ESTRUTURA DO PROJETO:
//   Code.gs    ← este arquivo
//   index.html ← interface HTML (sem DOCTYPE)
//
// Deploy:
//   Extensões → Apps Script → Implantar → Gerenciar implantações
//   Tipo: App da Web · Executar como: Eu · Acesso: Qualquer pessoa
//
// REGRA: usar openById() SEMPRE — getActiveSpreadsheet() retorna
//        null em contexto Web App.
// ============================================================

/* ── IDs das planilhas ── */
var MINHA_SHEET_ID = '1qHDQx4rBJrb1bNrOIr_b_R_4qMND72ZsnyPWUSLoLkc';
var CHEFE_SHEET_ID = '17reFaVIatWRvNa-KpnLPsFUEV8WnxrNC2fsEHO5lU6s';
var CL_SHEET_ID    = '1dZ-TiUcFgjdc45Fpc9frztG1Bqsi9e0F0aAHQzXoHjw';
var DIC_SHEET_ID   = '1HlWrUbQGstYtb6NZUHpDNmVYmXJFUOyJ';

/* ── Aba corrente do Dicionário ── */
function _dicAba() {
  return new Date().getFullYear().toString(); // '2026', '2027', ...
}

/* ── doGet ── */
function doGet(e) {
  var action = e && e.parameter && e.parameter.action ? e.parameter.action : '';

  if (action === 'contadores') return _getContadores();
  if (action === 'list')       return _listLinks();
  if (action === 'ping')       return _jsonOut({ ok: true, pong: true });

  return HtmlService
    .createHtmlOutputFromFile('index')
    .setTitle('F4 - Acessórios · NC Tool Unilever BR')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/* ── doPost — roteador ── */
function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    var action  = payload.action || '';

    if (action === 'fillAdNames')        return fillAdNames(payload);
    if (action === 'getCLSheets')        return getCLSheets();
    if (action === 'checkDuplicatas')    return checkDuplicatas(payload);
    if (action === 'readRmSheet')        return readRmSheet(payload);
    if (action === 'checkDicDuplicatas') return checkDicDuplicatas(payload);
    if (action === 'saveCampaignLocal')  return saveCampaignLocal(payload);
    if (action === 'saveDicionario')     return saveDicionario(payload);

    // default sem action = gerarIDs
    return gerarIDs(payload);

  } catch (err) {
    return _jsonOut({ ok: false, error: err.message });
  }
}

/* ════════════════════════════════════════════════════════════
   CONTADORES (doGet action=contadores)
════════════════════════════════════════════════════════════ */
function _getContadores() {
  var out = { ok: true, contadores: {} };
  try {
    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    var ss    = SpreadsheetApp.openById(CHEFE_SHEET_ID);
    var cfg   = ss.getSheetByName('Config');
    var dados = cfg.getDataRange().getValues();
    for (var i = 1; i < dados.length; i++) {
      var prefix = String(dados[i][0] || '').trim();
      if (!prefix) continue;
      out.contadores[prefix] = {
        ultimo: parseInt(dados[i][3]) || 0,
        suffix: String(dados[i][1] || '').trim(),
        size:   parseInt(dados[i][2]) || 5
      };
    }
    lock.releaseLock();
  } catch (e) { out.ok = false; out.error = e.message; }
  return _jsonOut(out);
}

/* ════════════════════════════════════════════════════════════
   GERAR IDs
   Otimização: escrita em batch por tipo (SX/AMZ) em vez de
   uma chamada setValue por ID gerado.
════════════════════════════════════════════════════════════ */
function gerarIDs(payload) {
  var itens = payload.itens || [];
  if (!itens.length) return _jsonOut({ ok: false, error: 'Nenhum item.' });

  var lock = LockService.getScriptLock();
  if (!lock.tryLock(30000))
    return _jsonOut({ ok: false, error: 'Sistema ocupado. Tente novamente.' });

  try {
    var ssChefe = SpreadsheetApp.openById(CHEFE_SHEET_ID);
    var ssMinha = SpreadsheetApp.openById(MINHA_SHEET_ID);
    var cfg     = ssChefe.getSheetByName('Config');
    var dados   = cfg.getDataRange().getValues();

    // Mapa de contadores indexado por prefix
    var contMap = {};
    for (var i = 1; i < dados.length; i++) {
      var prefix = String(dados[i][0] || '').trim();
      if (prefix) contMap[prefix] = {
        row:    i + 1,
        suffix: String(dados[i][1] || '').trim(),
        size:   parseInt(dados[i][2]) || 5,
        last:   parseInt(dados[i][3]) || 0
      };
    }

    var anoAtual      = new Date().getFullYear().toString();
    var abaMinha      = _getOrCreateAba(ssMinha, anoAtual);
    var today         = _hoje();
    var linhaMinha    = abaMinha.getLastRow();
    var primeiraLinha = linhaMinha + 1;
    var resultado     = [];

    // Acumula valores pra escrever em batch (só na planilha minha)
    // O chefe lê via IMPORTRANGE — não gravar mais diretamente
    var batchMinha    = []; // [[linha, data, plat]]

    itens.forEach(function(item) {
      var plat = item.plataforma;
      var qtd  = parseInt(item.qtd) || 1;
      var tipo = _tipoPorPlat(plat);
      var cont = contMap[tipo];
      if (!cont) return;

      var ids = [];
      for (var k = 0; k < qtd; k++) {
        cont.last++;
        var id = tipo + String(cont.last).padStart(cont.size, '0') + cont.suffix;
        ids.push(id);
        linhaMinha++;
        batchMinha.push([linhaMinha, today, plat]);
      }
      resultado.push({ plataforma: plat, tipo: tipo, ids: ids });
      // NÃO atualiza contador aqui — só após gravação
    });

    // Escreve data e plataforma na planilha minha em batch
    if (batchMinha.length) {
      var startMinha = batchMinha[0][0];
      var datas = batchMinha.map(function(r) { return [r[1]]; });
      var plats = batchMinha.map(function(r) { return [r[2]]; });
      abaMinha.getRange(startMinha, 1, batchMinha.length, 1).setValues(datas);
      abaMinha.getRange(startMinha, 5, batchMinha.length, 1).setValues(plats);
    }

    SpreadsheetApp.flush();
    // Atualiza contadores SÓ APÓS gravação confirmada
    resultado.forEach(function(r) {
      var cont = contMap[r.tipo];
      if (cont) cfg.getRange(cont.row, 4).setValue(cont.last);
    });
    SpreadsheetApp.flush();
    lock.releaseLock();
    return _jsonOut({
      ok: true,
      resultado: resultado,
      linhasGeradas: linhaMinha - (primeiraLinha - 1),
      primeiraLinha: primeiraLinha
    });

  } catch (err) {
    try { lock.releaseLock(); } catch(e2) {}
    return _jsonOut({ ok: false, error: err.message });
  }
}

/* ════════════════════════════════════════════════════════════
   FILL AD NAMES (Passo 4 do Gerador de IDs)
   Otimização: lê abaMinha inteira em batch uma vez só,
   acumula todas as escritas e aplica em setValues único.
════════════════════════════════════════════════════════════ */
function fillAdNames(payload) {
  var itens = payload.itens || [];
  if (!itens.length) return _jsonOut({ ok: false, error: 'Nenhum item.' });

  try {
    var ssChefe  = SpreadsheetApp.openById(CHEFE_SHEET_ID);
    var ssMinha  = SpreadsheetApp.openById(MINHA_SHEET_ID);
    var anoAtual = new Date().getFullYear().toString();
    var abaChefe = ssChefe.getSheetByName(anoAtual) || ssChefe.getSheets()[0];
    var abaMinha = _getOrCreateAba(ssMinha, anoAtual);
    var lastRow  = abaChefe.getLastRow();

    // Monta mapa ID → número de linha a partir das cols B e C da aba do chefe
    var mapaID = {};
    if (lastRow >= 2) {
      abaChefe.getRange(2, 2, lastRow - 1, 2).getValues().forEach(function(row, ri) {
        var b = String(row[0] || '').trim().toUpperCase();
        var c = String(row[1] || '').trim().toUpperCase();
        if (b) mapaID[b] = ri + 2;
        if (c) mapaID[c] = ri + 2;
      });
    }

    // Lê abaMinha inteira em batch (cols B, C, D) — UMA chamada só
    var lastMinha = abaMinha.getLastRow();
    var minhaData = {};
    if (lastMinha >= 2) {
      abaMinha.getRange(2, 2, lastMinha - 1, 3).getValues().forEach(function(row, ri) {
        minhaData[ri + 2] = {
          b: String(row[0] || '').trim().toUpperCase(),
          c: String(row[1] || '').trim().toUpperCase(),
          d: String(row[2] || '').trim()
        };
      });
    }

    // Processa itens e acumula escritas
    var conflitos   = [];
    var salvos      = 0;
    var writeAdName = []; // [[linha, adName]]
    var writeID     = []; // [[linha, coluna, id]]

    itens.forEach(function(item) {
      var adName = item.adName;
      var id     = String(item.id || '').trim().toUpperCase();
      var linha  = mapaID[id];
      if (!linha) return;

      var mSX  = adName.toUpperCase().match(/SX[\s\-]?(\d{1,8})/);
      var mAMZ = adName.toUpperCase().match(/AMZ[\s\-]?(\d{1,6})H?/);
      var idNoAdName = mSX  ? 'SX'  + mSX[1].padStart(8, '0')
                     : mAMZ ? 'AMZ' + mAMZ[1].padStart(6, '0') + 'H'
                     : null;

      var celula  = minhaData[linha] || { b: '', c: '', d: '' };
      var idAtual = celula.b || celula.c;

      if (idAtual && idNoAdName && idAtual !== idNoAdName)
        conflitos.push('L' + linha + ': ' + idAtual + ' ≠ ' + idNoAdName);

      writeAdName.push([linha, adName]);
      if (!idAtual) writeID.push([linha, id.startsWith('AMZ') ? 3 : 2, id]);
      salvos++;
    });

    // Agrupa escritas de Ad Name por coluna contígua onde possível
    // Para linhas dispersas, usa setValue individual (inevitável)
    writeAdName.forEach(function(w) { abaMinha.getRange(w[0], 4).setValue(w[1]); });
    writeID.forEach(function(w)     { abaMinha.getRange(w[0], w[1]).setValue(w[2]); });

    SpreadsheetApp.flush();

    // Identificar órfãos: IDs gerados sem Ad Name
    var orfaos = [];
    itens.forEach(function(item) {
      var id = String(item.id || '').trim().toUpperCase();
      var encontrado = writeAdName.some(function(w) {
        var m = minhaData[w[0]];
        return m && (m.b === id || m.c === id);
      });
      if (!encontrado && mapaID[id]) {
        orfaos.push({ id: item.id, linha: mapaID[id] });
      }
    });

    var resp = { ok: true, salvos: salvos, orfaos: orfaos };
    if (conflitos.length)
      resp.avisos = conflitos.length + ' conflito(s): ' + conflitos.slice(0, 3).join('; ');
    return _jsonOut(resp);

  } catch (err) {
    return _jsonOut({ ok: false, error: err.message });
  }
}

/* ════════════════════════════════════════════════════════════
   CAMPAIGN LOCAL
════════════════════════════════════════════════════════════ */

function getCLSheets() {
  try {
    var ss   = SpreadsheetApp.openById(CL_SHEET_ID);
    var tabs = ss.getSheets()
      .map(function(s) { return s.getName(); })
      .filter(function(n) { return /^\d{4}/.test(n); });
    return _jsonOut({ ok: true, tabs: tabs });
  } catch (e) {
    return _jsonOut({ ok: false, error: e.message });
  }
}

function checkDuplicatas(payload) {
  var aba   = payload.aba   || null;
  var itens = payload.itens || [];
  if (!aba || !itens.length) return _jsonOut({ ok: false, error: 'Payload inválido.' });

  try {
    var ss    = SpreadsheetApp.openById(CL_SHEET_ID);
    var sheet = ss.getSheetByName(aba) || _findAba(ss, 'Inclusão Campaign Local');
    if (!sheet) return _jsonOut({ ok: false, error: 'Aba não encontrada.' });

    var lastRow = sheet.getLastRow();
    if (lastRow < 3) return _jsonOut({ ok: true, duplicatas: [] });

    var allD = sheet.getRange(1, 4, lastRow, 1).getValues();
    var allI = sheet.getRange(1, 9, lastRow, 1).getValues();
    var existentes = {};
    for (var ri = 0; ri < allD.length; ri++) {
      var d    = String(allD[ri][0] || '').trim();
      var iVal = String(allI[ri][0] || '').trim().toLowerCase();
      if (!d || iVal !== 'felipe') continue;
      var dk = d.toLowerCase();
      if (!existentes[dk]) existentes[dk] = [];
      existentes[dk].push(ri + 1);
    }

    var seenD = {}, duplicatas = [];
    itens.forEach(function(item) {
      var d = String(item.d || '').trim();
      if (!d) return;
      var dk = d.toLowerCase();
      if (seenD[dk]) return;
      seenD[dk] = true;
      if (existentes[dk]) duplicatas.push({ d: d, g: item.g || '', linha: existentes[dk][0] });
    });

    return _jsonOut({ ok: true, duplicatas: duplicatas });
  } catch (e) {
    return _jsonOut({ ok: false, error: e.message });
  }
}

function saveCampaignLocal(payload) {
  var linhas = payload.linhas || [];
  var aba    = payload.aba   || null;
  if (!linhas.length) return _jsonOut({ ok: false, error: 'Nenhuma linha.' });

  var lock = LockService.getScriptLock();
  if (!lock.tryLock(20000))
    return _jsonOut({ ok: false, error: 'Planilha em uso. Tente em alguns segundos.' });

  try {
    var ss    = SpreadsheetApp.openById(CL_SHEET_ID);
    var sheet = aba ? ss.getSheetByName(aba) : _findAba(ss, 'Inclusão Campaign Local');
    if (!sheet) {
      lock.releaseLock();
      return _jsonOut({ ok: false, error: 'Aba "' + (aba || 'Inclusão Campaign Local') + '" não encontrada.' });
    }

    var nLinhas = linhas.length;

    if (sheet.getMaxColumns() < 11)
      sheet.insertColumnsAfter(sheet.getMaxColumns(), 11 - sheet.getMaxColumns());

    var curLastRow  = sheet.getLastRow();
    var existentesD = {};
    if (curLastRow >= 3) {
      var bloco = sheet.getRange(3, 4, curLastRow - 2, 6).getValues();
      for (var ri = 0; ri < bloco.length; ri++) {
        var dv = String(bloco[ri][0] || '').trim().toLowerCase();
        var iv = String(bloco[ri][5] || '').trim().toLowerCase();
        if (dv && iv === 'felipe') existentesD[dv] = true;
      }
    }

    var novas = linhas.filter(function(r) {
      var b = String(r[2] || '').trim();
      var d = String(r[4] || '').trim().toLowerCase();
      return b && d && !existentesD[d];
    });
    var nNovas  = novas.length;
    var puladas = nLinhas - nNovas;

    if (!nNovas) {
      lock.releaseLock();
      return _jsonOut({ ok: true, inseridas: 0, puladas: puladas,
        msg: 'Todas as ' + puladas + ' linha(s) já existiam.' });
    }

    var topRow = 3;
    while (topRow <= sheet.getLastRow()) {
      var topVals = sheet.getRange(topRow, 1, 1, 7).getValues()[0];
      if (topVals.every(function(v) { return String(v).trim() === ''; }))
        sheet.deleteRow(topRow);
      else break;
    }

    sheet.insertRowsBefore(3, nNovas);
    var insertAt = 3;

    var refRow = 3 + nNovas;
    if (refRow > sheet.getLastRow()) refRow = 2;
    [6, 7, 9].forEach(function(col) {
      sheet.getRange(refRow, col, 1, 1).copyTo(
        sheet.getRange(insertAt, col, nNovas, 1),
        SpreadsheetApp.CopyPasteType.PASTE_DATA_VALIDATION, false
      );
    });

    var blockAG = novas.map(function(r) {
      return [r[1]||'', r[2]||'', r[3]||'', r[4]||'', r[5]||'', r[6]||'', r[7]||''];
    });
    sheet.getRange(insertAt, 1, nNovas, 7).setValues(blockAG).setBackground('#ffffff');

    var blockIJ = novas.map(function(r) { return [r[9]||'', r[10]||'']; });
    sheet.getRange(insertAt, 9, nNovas, 2).setValues(blockIJ).setBackground('#ffffff');

    sheet.getRange(insertAt, 8, nNovas, 1).clearContent();
    var agRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['Cadastra', 'Initiative'], true)
      .setAllowInvalid(true).build();
    sheet.getRange(insertAt, 10, nNovas, 1).setDataValidation(agRule);
    sheet.getRange(insertAt, 11, nNovas, 1).clearDataValidations();

    SpreadsheetApp.flush();
    lock.releaseLock();
    return _jsonOut({ ok: true, inseridas: nNovas, puladas: puladas, linha: insertAt });

  } catch (e) {
    try { lock.releaseLock(); } catch(e2) {}
    return _jsonOut({ ok: false, error: e.message });
  }
}

/* ════════════════════════════════════════════════════════════
   DICIONÁRIO DE INFLUENCERS
════════════════════════════════════════════════════════════ */

function _listLinks() {
  try {
    var ss    = SpreadsheetApp.openById(DIC_SHEET_ID);
    var sheet = ss.getSheetByName(_dicAba());
    if (!sheet || sheet.getLastRow() < 4)
      return _jsonOut({ ok: true, links: [] });
    var vals  = sheet.getRange(4, 8, sheet.getLastRow() - 3, 1).getValues();
    var links = vals.map(function(r) { return String(r[0]||'').trim(); }).filter(Boolean);
    return _jsonOut({ ok: true, links: links });
  } catch (e) {
    return _jsonOut({ ok: false, error: e.message });
  }
}

function checkDicDuplicatas(payload) {
  // Aceita tanto {links:[...]} (legado) quanto {itens:[{h,f,d},...]}
  var itens = payload.itens || (payload.links || []).map(function(l) { return { h: l, f: '', d: '' }; });
  if (!itens.length) return _jsonOut({ ok: true, duplicatas: [] });

  try {
    var ss    = SpreadsheetApp.openById(DIC_SHEET_ID);
    var sheet = ss.getSheetByName(_dicAba());

    // Ler existentes: colunas D(4), F(6), H(8)
    var existentes = {}; // chave: canonUrl(H) ou handle+plataforma
    if (sheet && sheet.getLastRow() >= 4) {
      var numRows = sheet.getLastRow() - 3;
      var data = sheet.getRange(4, 4, numRows, 5).getValues(); // D,E,F,G,H
      data.forEach(function(row) {
        var d = String(row[0]||'').trim();  // Plataforma (col D)
        var f = String(row[2]||'').trim();  // Handle (col F)
        var h = _canonUrl(String(row[4]||'')); // Link (col H)
        if (h) existentes['h:'+h] = true;
        if (f && d) existentes['fd:'+f.toLowerCase()+'|'+d.toLowerCase()] = true;
      });
    }

    var seen = {}, duplicatas = [];
    itens.forEach(function(item) {
      var h   = _canonUrl(item.h || '');
      var f   = String(item.f || '').trim().toLowerCase();
      var d   = String(item.d || '').trim().toLowerCase();
      var keyH  = h  ? 'h:'+h : null;
      var keyFD = (f && d) ? 'fd:'+f+'|'+d : null;

      // Evitar duplicatas dentro do próprio lote
      var seenKey = keyH || keyFD;
      if (!seenKey || seen[seenKey]) return;
      seen[seenKey] = true;

      if ((keyH && existentes[keyH]) || (keyFD && existentes[keyFD])) {
        duplicatas.push(item.h || item.f);
      }
    });

    return _jsonOut({ ok: true, duplicatas: duplicatas });
  } catch (e) {
    return _jsonOut({ ok: false, error: e.message });
  }
}

function saveDicionario(payload) {
  var linhas = payload.linhas || [];
  if (!linhas.length) return _jsonOut({ ok: false, error: 'Nenhuma linha.' });

  try {
    var ss    = SpreadsheetApp.openById(DIC_SHEET_ID);
    var aba   = _dicAba();
    var sheet = ss.getSheetByName(aba);
    if (!sheet) sheet = ss.insertSheet(aba);

    var lastRow   = sheet.getLastRow();
    var startData = 4;
    var existentesH = {};

    if (lastRow >= startData) {
      sheet.getRange(startData, 8, lastRow - startData + 1, 1).getValues().forEach(function(r) {
        var h = _canonUrl(String(r[0]||''));
        if (h) existentesH[h] = true;
      });
    }

    var novas = linhas.filter(function(r) {
      var link = String(r[1]||'').trim();
      return link && !existentesH[_canonUrl(link)];
    });

    if (!novas.length)
      return _jsonOut({ ok: true, inseridas: 0, msg: 'Todos os links já existem.' });

    // Escreve em batch: Nome em A, Link em H
    var insertAt = Math.max(startData, lastRow + 1);
    var nomes = novas.map(function(r) { return [r[0]||'']; });
    var links = novas.map(function(r) { return [r[1]||'']; });
    sheet.getRange(insertAt, 1, novas.length, 1).setValues(nomes);
    sheet.getRange(insertAt, 8, novas.length, 1).setValues(links);

    SpreadsheetApp.flush();
    return _jsonOut({ ok: true, inseridas: novas.length, linha: insertAt });
  } catch (e) {
    return _jsonOut({ ok: false, error: e.message });
  }
}

function salvarDicionario(dados) {
  if (!dados || !dados.length) return { ok: false, msg: 'Nenhum dado.' };
  var linhas = dados.map(function(d) { return ['', d[0]||'']; });
  var result = saveDicionario({ linhas: linhas });
  try { return JSON.parse(result.getContent()); } catch(e) { return { ok: false, error: e.message }; }
}

/* ════════════════════════════════════════════════════════════
   RM — leitura de Google Sheets externo
════════════════════════════════════════════════════════════ */
function readRmSheet(payload) {
  var sheetId = payload.sheetId || '';
  if (!sheetId) return _jsonOut({ ok: false, error: 'ID inválido.' });

  var RM_COLS = {
    'Google': 35, 'Programmatic': 36, 'YouTube': 33,
    'Meta e Tiktok': 37, 'Pinterest, Snapchat e X': 36, 'Flashtalking': 32
  };

  try {
    var ss    = SpreadsheetApp.openById(sheetId);
    var title = ss.getName();
    var links = [], seen = {};

    Object.keys(RM_COLS).forEach(function(abaNome) {
      var colIdx = RM_COLS[abaNome];
      var sheet  = ss.getSheetByName(abaNome);
      if (!sheet) return;
      var lastRow = sheet.getLastRow();
      if (lastRow < 2) return;
      sheet.getRange(2, colIdx + 1, lastRow - 1, 1).getValues().forEach(function(row) {
        var v = String(row[0]||'').trim();
        if (!v || !/^https?:\/\//i.test(v)) return;
        var key = _canonUrl(v);
        if (!seen[key]) { seen[key] = true; links.push(v); }
      });
    });

    return _jsonOut({ ok: true, title: title, links: links });
  } catch (e) {
    return _jsonOut({ ok: false, error: 'Sem acesso: ' + e.message });
  }
}

/* ════════════════════════════════════════════════════════════
   UTILS
════════════════════════════════════════════════════════════ */
function _hoje() {
  return Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd/MM/yyyy');
}
function _tipoPorPlat(plat) {
  return (!plat || plat.toLowerCase() !== 'amazon') ? 'SX' : 'AMZ';
}
function _getOrCreateAba(ss, nome) {
  var aba = ss.getSheetByName(nome);
  if (!aba) {
    aba = ss.insertSheet(nome);
    aba.getRange(1, 1, 1, 5).setValues([['Data','ID SX','ID AMZ','Ad Name','Plataforma']]);
    aba.setFrozenRows(1);
  }
  return aba;
}
function _findAba(ss, nome) {
  var aba = ss.getSheetByName(nome);
  if (aba) return aba;
  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i++)
    if (sheets[i].getName().toLowerCase().indexOf(nome.toLowerCase()) !== -1)
      return sheets[i];
  return null;
}
function _canonUrl(url) {
  return String(url||'').trim().toLowerCase()
    .replace(/^https?:\/\/(www\.)?/, '')
    .replace(/[?#].*$/, '')
    .replace(/\/+$/, '');
}
function _jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
/* ════════════════════════════════════════════════════════════
   KEEP ALIVE — trigger a cada 20 min para manter o script quente
════════════════════════════════════════════════════════════ */
function keepAlive() {
  // Chamada mínima para manter o script ativo — não grava nada
  SpreadsheetApp.openById(CHEFE_SHEET_ID).getName();
}

/* ════════════════════════════════════════════════════════════
   SETUP TRIGGER — rodar uma vez para instalar o trigger keepAlive
   Menu: Apps Script → Executar → setupKeepAliveTrigger
════════════════════════════════════════════════════════════ */
function setupKeepAliveTrigger() {
  // Remove triggers antigos de keepAlive para evitar duplicatas
  ScriptApp.getProjectTriggers().forEach(function(t) {
    if (t.getHandlerFunction() === 'keepAlive') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('keepAlive')
    .timeBased()
    .everyMinutes(30)
    .create();
  Logger.log('Trigger keepAlive instalado: a cada 30 minutos.');
}
