// ============================================================
// UL_Location_Pessoal.gs
// Projeto: [Felipe] Taxonomia_Location — Ambiente Pessoal
// Apps Script: cole junto com UL_Location_Pessoal.html
// A Corp nunca sabe da existência deste ambiente.
// ============================================================

// Mesma estrutura da planilha Corp — abas espelhadas via IMPORTRANGE preservam colunas
const PESSOAL = {
  ABAS: {
    NACIONAL: { nome: 'Nacional', SIGLA: 0, LABEL: 1, STATUS: -1 },
    REGIAO:   { nome: 'Regiões',  SIGLA: 0, LABEL: 1, STATUS:  3 },
    ESTADO:   { nome: 'Estados',  SIGLA: 0, LABEL: 2, STATUS:  4 },
    CIDADE:   { nome: 'Cidades',  SIGLA: 0, LABEL: 1, STATUS:  7, UF: 2 },
  }
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
  const ab = PESSOAL.ABAS;
  return {
    geradoEm: new Date().toISOString(),
    fonte: 'pessoal',
    nacional: lerAba_(ss, ab.NACIONAL),
    região:   lerAba_(ss, ab.REGIAO),
    estado:   lerAba_(ss, ab.ESTADO),
    cidade:   lerAba_(ss, ab.CIDADE),
  };
}

// cfg = { nome, SIGLA, LABEL, STATUS (-1 = sem filtro), UF (opcional) }
function lerAba_(ss, cfg) {
  try {
    const aba = ss.getSheetByName(cfg.nome);
    if (!aba) { console.warn(`Aba não encontrada: ${cfg.nome}`); return []; }
    const rows = aba.getDataRange().getValues().slice(1);
    return rows
      .filter(r => r[cfg.SIGLA] && (cfg.STATUS < 0 || !r[cfg.STATUS]))
      .map(r => {
        const sigla = String(r[cfg.SIGLA]).trim().toLowerCase();
        const obj   = { sigla, label: String(r[cfg.LABEL]).trim() };
        if (sigla.startsWith('est-')) obj.uf = sigla.slice(4).toUpperCase();
        else if (sigla.startsWith('cid-') && cfg.UF >= 0 && r[cfg.UF])
          obj.uf = String(r[cfg.UF]).trim().toUpperCase();
        return obj;
      });
  } catch(e) {
    console.error(`Erro ao ler "${cfg.nome}": ${e}`);
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
  // Nomes de aba idênticos à Corp para preservar estrutura de colunas
  const abas = ['Nacional','Regiões','Estados','Cidades'];

  abas.forEach(nome => {
    let aba = ss.getSheetByName(nome);
    if (!aba) aba = ss.insertSheet(nome);
    aba.clearContents();
    // IMPORTRANGE inclui cabeçalho (A1) para preservar estrutura de colunas da Corp
    aba.getRange('A1').setFormula(`=IMPORTRANGE("${url}","${nome}!A1:Z")`);
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
