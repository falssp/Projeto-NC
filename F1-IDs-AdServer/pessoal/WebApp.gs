/***************************************
 * 🌐 WEB APP — F1 IDs AdServer · Corp
 * Endpoints para o portal e dashboard
 ***************************************/

const SHEET_ID_PES = '1vGM_se-b1rechwv91WnSw-SW2XQFJ4DN4FPWqrEMkq8';

function doGet(e) {
  const action = (e && e.parameter && e.parameter.action) || 'ping';
  const ss     = SpreadsheetApp.openById(SHEET_ID_PES);

  try {
    let result;
    switch (action) {
      case 'ping':
        result = _ping('corp');
        break;
      case 'stats':
        result = _stats(ss);
        break;
      case 'listarIDs':
        result = _listarIDs(ss, e.parameter);
        break;
      case 'buscarID':
        result = _buscarID(ss, e.parameter.id);
        break;
      default:
        result = { error: 'Action desconhecida: ' + action };
    }
    return _json(result);
  } catch (err) {
    return _json({ error: err.message });
  }
}

function doPost(e) {
  const action = (e && e.parameter && e.parameter.action) || '';
  const ss     = SpreadsheetApp.openById(SHEET_ID_PES);
  let body     = {};

  try {
    if (e.postData && e.postData.contents) {
      body = JSON.parse(e.postData.contents);
    }
  } catch(err) {}

  try {
    let result;
    switch (action) {
      case 'criarIDLote':
        result = _criarIDLote(ss, body);
        break;
      case 'criarID':
        result = _criarID(ss, body);
        break;
      case 'inativarID':
        result = _inativarID(ss, body);
        break;
      case 'editarAdName':
        result = _editarAdName(ss, body);
        break;
      default:
        result = { error: 'Action POST desconhecida: ' + action };
    }
    return _json(result);
  } catch(err) {
    return _json({ error: err.message });
  }
}

/* ── PING ─────────────────────────────── */
function _ping(env) {
  return {
    ok:      true,
    fase:    'F1',
    env:     env,
    ts:      new Date().toISOString(),
    usuario: Session.getActiveUser().getEmail()
  };
}

/* ── STATS ────────────────────────────── */
function _stats(ss) {
  const geral  = ss.getSheetByName(CONFIG.abas.geral);
  const col    = CONFIG.colunas.geral;
  const last   = geral.getLastRow();
  if (last < 2) return _statsVazio();

  const dados  = geral.getRange(2, 1, last - 1, 6).getValues();
  const agora  = new Date();
  const mesAtual = agora.getMonth();
  const anoAtual = agora.getFullYear();

  let totalSlugs = 0, totalMes = 0, totalSX = 0, totalAMZ = 0;
  const porPlataforma = {};
  let ultimaEntrada = null;

  dados.forEach(row => {
    const data       = row[col.data - 1];
    const idSX       = row[col.idSX - 1];
    const idAMZ      = row[col.idAMZ - 1];
    const plataforma = (row[col.plataforma - 1] || '').toString().trim();

    if (!idSX && !idAMZ) return;
    totalSlugs++;

    if (idSX)  totalSX++;
    if (idAMZ) totalAMZ++;

    if (plataforma) {
      if (!porPlataforma[plataforma]) porPlataforma[plataforma] = 0;
      porPlataforma[plataforma]++;
    }

    if (data instanceof Date && data.getMonth() === mesAtual && data.getFullYear() === anoAtual) {
      totalMes++;
    }

    if (!ultimaEntrada || (data instanceof Date && data > ultimaEntrada.data)) {
      ultimaEntrada = {
        data:        data instanceof Date ? Utilities.formatDate(data, Session.getScriptTimeZone(), 'dd/MM/yyyy') : '',
        idSX:        idSX  || '',
        idAMZ:       idAMZ || '',
        plataforma:  plataforma,
        usuario:     (row[col.origem - 1] || '').toString().trim()
      };
    }
  });

  return {
    fase:           'F1',
    env:            'corp',
    totalSlugs:     totalSlugs,
    totalMes:       totalMes,
    totalSX:        totalSX,
    totalAMZ:       totalAMZ,
    porPlataforma:  porPlataforma,
    ultimaEntrada:  ultimaEntrada,
    ts:             new Date().toISOString()
  };
}

function _statsVazio() {
  return {
    fase:'F1', env:'pessoal', totalSlugs:0, totalMes:0, totalSX:0, totalAMZ:0,
    porPlataforma:{}, ultimaEntrada:null, ts:new Date().toISOString()
  };
}

/* ── LISTAR IDs ───────────────────────── */
function _listarIDs(ss, params) {
  const geral  = ss.getSheetByName(CONFIG.abas.geral);
  const col    = CONFIG.colunas.geral;
  const last   = geral.getLastRow();
  if (last < 2) return { ids: [] };

  const dados    = geral.getRange(2, 1, last - 1, 6).getValues();
  const filtPlat = (params && params.plataforma) || '';
  const filtUser = (params && params.usuario)    || '';
  const tz       = Session.getScriptTimeZone();

  const ids = dados
    .filter(row => row[col.idSX - 1] || row[col.idAMZ - 1])
    .filter(row => !filtPlat || row[col.plataforma - 1] === filtPlat)
    .filter(row => !filtUser || row[col.origem - 1]    === filtUser)
    .map(row => ({
      id:          row[col.idSX - 1] || row[col.idAMZ - 1] || '',
      idSX:        row[col.idSX  - 1] || '',
      idAMZ:       row[col.idAMZ - 1] || '',
      adName:      row[col.adName - 1] || '',
      plataforma:  row[col.plataforma - 1] || '',
      usuario:     row[col.origem - 1] || '',
      data:        row[col.data - 1] instanceof Date
                   ? Utilities.formatDate(row[col.data - 1], tz, 'dd/MM/yyyy')
                   : '',
      status:      'ativo'
    }));

  return { ids: ids };
}

/* ── BUSCAR ID ────────────────────────── */
function _buscarID(ss, idBusca) {
  if (!idBusca) return { error: 'ID não informado' };
  const geral = ss.getSheetByName(CONFIG.abas.geral);
  const col   = CONFIG.colunas.geral;
  const last  = geral.getLastRow();
  if (last < 2) return { error: 'Geral vazio' };

  const dados = geral.getRange(2, 1, last - 1, 6).getValues();
  const tz    = Session.getScriptTimeZone();

  for (const row of dados) {
    if (row[col.idSX - 1] === idBusca || row[col.idAMZ - 1] === idBusca) {
      return {
        id:         idBusca,
        idSX:       row[col.idSX  - 1] || '',
        idAMZ:      row[col.idAMZ - 1] || '',
        adName:     row[col.adName - 1] || '',
        plataforma: row[col.plataforma - 1] || '',
        usuario:    row[col.origem - 1] || '',
        data:       row[col.data - 1] instanceof Date
                    ? Utilities.formatDate(row[col.data - 1], tz, 'dd/MM/yyyy')
                    : '',
        status:     'ativo'
      };
    }
  }
  return { error: 'ID não encontrado: ' + idBusca };
}

/* ── CRIAR ID (unitário) ──────────────── */
function _criarID(ss, body) {
  const { adName, plataforma, usuario } = body;
  if (!adName || !plataforma) return { error: 'adName e plataforma obrigatórios' };

  const resultado = processarID(adName, plataforma);
  const abaUser   = ss.getSheetByName(usuario || '');

  if (abaUser) {
    const row = abaUser.getLastRow() + 1;
    abaUser.getRange(row, 1, 1, 5).setValues([[
      new Date(), resultado.idSX, resultado.idAMZ, adName, plataforma
    ]]);
  }

  _sincronizarGeral(ss);

  return {
    id:         resultado.idSX || resultado.idAMZ || '',
    tipo:       resultado.tipo,
    idSX:       resultado.idSX  || '',
    idAMZ:      resultado.idAMZ || '',
    adName:     adName,
    plataforma: plataforma,
    data:       Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd/MM/yyyy'),
    usuario:    usuario || ''
  };
}

/* ── CRIAR IDs EM LOTE ────────────────── */
function _criarIDLote(ss, body) {
  const { adNames, plataforma, usuario } = body;
  if (!adNames || !adNames.length) return { error: 'adNames obrigatório' };
  if (!plataforma)                  return { error: 'plataforma obrigatória' };

  const abaUser = ss.getSheetByName(usuario || '');
  const tz      = Session.getScriptTimeZone();
  const hoje    = new Date();
  const ids     = [];

  adNames.forEach(adName => {
    const r = processarID(adName, plataforma);
    ids.push({
      id:         r.idSX || r.idAMZ || '',
      tipo:       r.tipo,
      idSX:       r.idSX  || '',
      idAMZ:      r.idAMZ || '',
      adName:     adName,
      plataforma: plataforma,
      data:       Utilities.formatDate(hoje, tz, 'dd/MM/yyyy'),
      usuario:    usuario || ''
    });

    if (abaUser) {
      const row = abaUser.getLastRow() + 1;
      abaUser.getRange(row, 1, 1, 5).setValues([[hoje, r.idSX, r.idAMZ, adName, plataforma]]);
    }
  });

  _sincronizarGeral(ss);
  return { ids: ids };
}

/* ── INATIVAR ID ──────────────────────── */
function _inativarID(ss, body) {
  const { id, motivo, usuario } = body;
  if (!id) return { error: 'ID obrigatório' };
  // Registra inativação na coluna G (nota) da aba Geral
  const geral = ss.getSheetByName(CONFIG.abas.geral);
  const col   = CONFIG.colunas.geral;
  const last  = geral.getLastRow();
  if (last < 2) return { error: 'Geral vazio' };

  const dados = geral.getRange(2, 1, last - 1, 6).getValues();
  for (let i = 0; i < dados.length; i++) {
    if (dados[i][col.idSX - 1] === id || dados[i][col.idAMZ - 1] === id) {
      const nota = 'INATIVO | ' + (motivo || '') + ' | ' + (usuario || '') + ' | ' +
                   Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm');
      geral.getRange(i + 2, 7).setValue(nota);
      return { ok: true, id: id, status: 'inativo' };
    }
  }
  return { error: 'ID não encontrado: ' + id };
}

/* ── EDITAR AD NAME ───────────────────── */
function _editarAdName(ss, body) {
  const { id, adNameNovo, usuario } = body;
  if (!id || !adNameNovo) return { error: 'id e adNameNovo obrigatórios' };

  const geral = ss.getSheetByName(CONFIG.abas.geral);
  const col   = CONFIG.colunas.geral;
  const last  = geral.getLastRow();
  const dados = geral.getRange(2, 1, last - 1, 6).getValues();

  for (let i = 0; i < dados.length; i++) {
    if (dados[i][col.idSX - 1] === id || dados[i][col.idAMZ - 1] === id) {
      const antigo = dados[i][col.adName - 1];
      geral.getRange(i + 2, col.adName).setValue(adNameNovo);
      return { ok: true, id: id, adNameAnterior: antigo, adNameNovo: adNameNovo };
    }
  }
  return { error: 'ID não encontrado: ' + id };
}

/* ── SYNC GERAL ───────────────────────── */
function _sincronizarGeral(ss) {
  if (typeof atualizarGeral === 'function') {
    try { atualizarGeral(); } catch(e) {}
  }
}

/* ── HELPER JSON ──────────────────────── */
function _json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
