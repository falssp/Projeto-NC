// ============================================================
// UL_Location_Pessoal.gs
// Projeto: [Felipe] Taxonomia_Location — Ambiente Pessoal
// Apps Script: cole junto com UL_Location_Pessoal.html
// A Corp nunca sabe da existência deste ambiente.
// ============================================================

const PESSOAL = {
  ABA_ESPELHO:  'Espelho_Corp',  // alimentada via IMPORTRANGE da Corp
  ABA_NACIONAL: 'Nacional',
  ABA_REGIAO:   'Região',
  ABA_ESTADO:   'Estado',
  ABA_CIDADE:   'Cidade',
  COL: { SIGLA: 0, LABEL: 1, ATIVO: 2 }
};

// ------------------------------------------------------------
// Web App
// ------------------------------------------------------------
function doGet(e) {
  const action = (e && e.parameter && e.parameter.action) || '';

  if (action === 'json') {
    const dados = getDadosPessoal_();
    return ContentService
      .createTextOutput(JSON.stringify(dados))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return HtmlService
    .createHtmlOutputFromFile('UL_Location_Pessoal')
    .setTitle('UL · Taxonomia Location')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ------------------------------------------------------------
// Leitura — tenta cada aba independentemente
// ------------------------------------------------------------
function getDadosPessoal_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return {
    geradoEm: new Date().toISOString(),
    fonte: 'pessoal',
    nacional: lerAba_(ss, PESSOAL.ABA_NACIONAL),
    região:   lerAba_(ss, PESSOAL.ABA_REGIAO),
    estado:   lerAba_(ss, PESSOAL.ABA_ESTADO),
    cidade:   lerAba_(ss, PESSOAL.ABA_CIDADE),
  };
}

function lerAba_(ss, nomeAba) {
  try {
    const aba = ss.getSheetByName(nomeAba);
    if (!aba) { console.warn(`Aba não encontrada: ${nomeAba}`); return []; }
    const rows = aba.getDataRange().getValues().slice(1);
    const c = PESSOAL.COL;
    return rows
      .filter(r => r[c.SIGLA] && (r[c.ATIVO] === true || String(r[c.ATIVO]).toUpperCase() === 'TRUE'))
      .map(r => ({ sigla: String(r[c.SIGLA]).trim().toLowerCase(), label: String(r[c.LABEL]).trim() }));
  } catch(e) {
    console.error(`Erro ao ler "${nomeAba}": ${e}`);
    return [];
  }
}

function getDados() { return getDadosPessoal_(); }

// ------------------------------------------------------------
// Configurar IMPORTRANGE da Corp (roda uma vez)
// ------------------------------------------------------------
function configurarEspelho() {
  const ui = SpreadsheetApp.getUi();
  const resp = ui.prompt('URL do Sheets Corp', 'Cole a URL completa:', ui.ButtonSet.OK_CANCEL);
  if (resp.getSelectedButton() !== ui.Button.OK) return;

  const url = resp.getResponseText().trim();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const abas = ['Nacional','Região','Estado','Cidade'];

  abas.forEach(nome => {
    let aba = ss.getSheetByName(nome);
    if (!aba) aba = ss.insertSheet(nome);
    aba.clearContents();
    aba.getRange('A1:C1').setValues([['sigla','label','ativo']]);
    aba.getRange('A2').setFormula(`=IMPORTRANGE("${url}","${nome}!A2:C")`);
  });

  ui.alert('Espelho configurado.\n\nAceite a permissão do IMPORTRANGE que aparecerá na célula A2 de cada aba.');
}

// ------------------------------------------------------------
// Menu
// ------------------------------------------------------------
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('📍 UL Location')
    .addItem('Abrir ferramenta', 'abrirApp_')
    .addItem('Configurar espelho da Corp', 'configurarEspelho')
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
