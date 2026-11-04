// ============================================================
// UL_Location.gs
// Projeto: [UL] Taxonomia_Location
// Apps Script: cole junto com UL_Location.html
// Planilha: UL_Location_Taxonomy (Gmail)
// ============================================================

// Estrutura da planilha UL_Location_Taxonomy:
//   Nacional:  A=sigla  B=label
//   Regiões:   A=sigla  B=label   D=status
//   Estados:   A=sigla  B=UF      C=label(nome)  D=região  E=status
//   Cidades:   A=sigla  B=label   C=UF           H=status
// STATUS vazio = ativo; preenchido = marcado para alteração → excluído
const CFG = {
  NACIONAL: { nome: 'Nacional', SIGLA: 0, LABEL: 1, STATUS: -1 },
  REGIAO:   { nome: 'Regiões',  SIGLA: 0, LABEL: 1, STATUS:  3 },
  ESTADO:   { nome: 'Estados',  SIGLA: 0, LABEL: 2, STATUS:  4 },
  CIDADE:   { nome: 'Cidades',  SIGLA: 0, LABEL: 1, STATUS:  7, UF: 2 },
};

// ------------------------------------------------------------
// Web App
// ------------------------------------------------------------
function doGet(e) {
  const action = (e && e.parameter && e.parameter.action) || '';

  if (action === 'json') {
    return ContentService
      .createTextOutput(JSON.stringify(getDados_()))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return HtmlService
    .createHtmlOutputFromFile('UL_Location')
    .setTitle('UL · Taxonomia Location')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ------------------------------------------------------------
// Leitura
// ------------------------------------------------------------
function getDados_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return {
    geradoEm: new Date().toISOString(),
    nacional: lerAba_(ss, CFG.NACIONAL),
    região:   lerAba_(ss, CFG.REGIAO),
    estado:   lerAba_(ss, CFG.ESTADO),
    cidade:   lerAba_(ss, CFG.CIDADE),
  };
}

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
        // Estado: deriva UF da sigla (est-sp → SP)
        if (sigla.startsWith('est-')) obj.uf = sigla.slice(4).toUpperCase();
        // Cidade: lê UF da coluna C
        else if (sigla.startsWith('cid-') && cfg.UF >= 0 && r[cfg.UF])
          obj.uf = String(r[cfg.UF]).trim().toUpperCase();
        return obj;
      });
  } catch(e) {
    console.error(`Erro ao ler "${cfg.nome}": ${e}`);
    return [];
  }
}

// Chamado pelo HTML via google.script.run
function getDados() { return getDados_(); }

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
    HtmlService.createHtmlOutput(`<script>window.open('${url}','_blank');google.script.host.close();<\/script>`),
    'Abrindo...'
  );
}

function verUrl_() {
  SpreadsheetApp.getUi().alert('URL do Web App:\n\n' + ScriptApp.getService().getUrl());
}
