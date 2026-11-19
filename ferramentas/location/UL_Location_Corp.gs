// ============================================================
// UL_Location_Corp.gs
// Projeto: [UL] Taxonomia_Location — Ambiente Corporativo
// Apps Script: cole junto com UL_Location_Corp.html
// ============================================================

// Configuração por aba — reflete a estrutura da planilha UL_Location_Taxonomy
// Nacional:  A=sigla, B=label
// Regiões:   A=sigla, B=label,  D=status
// Estados:   A=sigla, B=UF,     C=label(nome), D=região, E=status
// Cidades:   A=sigla, B=label,  C=UF,          H=status
const CORP = {
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
  const ab = CORP.ABAS;
  return {
    geradoEm: new Date().toISOString(),
    fonte: 'corp',
    nacional: lerAba_(ss, ab.NACIONAL),
    região:   lerAba_(ss, ab.REGIAO),
    estado:   lerAba_(ss, ab.ESTADO),
    cidade:   lerAba_(ss, ab.CIDADE),
  };
}

// cfg = { nome, SIGLA, LABEL, STATUS (-1 = sem filtro), UF (opcional) }
// STATUS vazio = item ativo; STATUS preenchido = marcado p/ alteração → excluído
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
