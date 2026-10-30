// ============================================================
// UL_Location_Corp.gs
// Projeto: [UL] Taxonomia_Location — Ambiente Corporativo
// Apps Script: cole junto com UL_Location_Corp.html
// ============================================================

const CORP = {
  ABA_NACIONAL: 'Nacional',
  ABA_REGIAO:   'Região',
  ABA_ESTADO:   'Estado',
  ABA_CIDADE:   'Cidade',
  // Colunas: A=sigla, B=label, C=ativo (TRUE/FALSE), D=uf (só na aba Cidade)
  COL: { SIGLA: 0, LABEL: 1, ATIVO: 2, UF: 3 }
};

// ------------------------------------------------------------
// Web App
// ------------------------------------------------------------
function doGet(e) {
  const action = (e && e.parameter && e.parameter.action) || '';

  if (action === 'json') {
    const dados = getDadosCorp_();
    return ContentService
      .createTextOutput(JSON.stringify(dados))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return HtmlService
    .createHtmlOutputFromFile('UL_Location_Corp')
    .setTitle('UL · Taxonomia Location')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ------------------------------------------------------------
// Leitura das abas
// ------------------------------------------------------------
function getDadosCorp_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return {
    geradoEm: new Date().toISOString(),
    fonte: 'corp',
    nacional: lerAba_(ss, CORP.ABA_NACIONAL),
    região:   lerAba_(ss, CORP.ABA_REGIAO),
    estado:   lerAba_(ss, CORP.ABA_ESTADO),
    cidade:   lerAba_(ss, CORP.ABA_CIDADE),
  };
}

function lerAba_(ss, nomeAba) {
  try {
    const aba = ss.getSheetByName(nomeAba);
    if (!aba) { console.warn(`Aba não encontrada: ${nomeAba}`); return []; }
    const rows = aba.getDataRange().getValues().slice(1);
    const c = CORP.COL;
    return rows
      .filter(r => r[c.SIGLA] && (r[c.ATIVO] === true || String(r[c.ATIVO]).toUpperCase() === 'TRUE'))
      .map(r => {
        const sigla = String(r[c.SIGLA]).trim().toLowerCase();
        const obj = { sigla, label: String(r[c.LABEL]).trim() };
        // Estado: deriva UF da sigla (est-sp → SP)
        if (sigla.startsWith('est-')) obj.uf = sigla.slice(4).toUpperCase();
        // Cidade: lê UF da coluna D
        else if (sigla.startsWith('cid-') && r[c.UF]) obj.uf = String(r[c.UF]).trim().toUpperCase();
        return obj;
      });
  } catch(e) {
    console.error(`Erro ao ler "${nomeAba}": ${e}`);
    return [];
  }
}

// Chamado pelo HTML via google.script.run
function getDados() { return getDadosCorp_(); }

// ------------------------------------------------------------
// Menu
// ------------------------------------------------------------
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('📍 UL Location')
    .addItem('Abrir ferramenta', 'abrirApp_')
    .addItem('Ver URL do Web App', 'verUrl_')
    .addToUi();
}

function abrirApp_() {
  const url = ScriptApp.getService().getUrl();
  SpreadsheetApp.getUi().showModalDialog(
    HtmlService.createHtmlOutput(`<script>window.open('${url}','_blank');google.script.host.close();</script>`),
    'Abrindo...'
  );
}

function verUrl_() {
  SpreadsheetApp.getUi().alert('URL:\n\n' + ScriptApp.getService().getUrl());
}
