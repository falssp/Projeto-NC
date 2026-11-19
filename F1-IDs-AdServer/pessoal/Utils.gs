/***************************************
 * 🚀 ON OPEN
 ***************************************/

function onOpen() {
  _garantirAbasEstruturais();
  criarMenuUsuario();
  formatarUsuarios();
  formatarGeral();
}

function _garantirAbasEstruturais() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const fixas = [
    { nome: CONFIG.abas.painel,   pos: 1, maxCols: 4 },
    { nome: CONFIG.abas.usuarios, pos: 2, maxCols: 9 },
    { nome: CONFIG.abas.geral,    pos: 3, maxCols: 6 }
  ];

  fixas.forEach(({ nome, pos, maxCols }) => {
    let sheet = ss.getSheetByName(nome);
    if (!sheet) {
      sheet = ss.insertSheet(nome, pos - 1);
      log("_garantirAbasEstruturais: aba criada — " + nome);
    }

    // Sempre limita colunas — independente de ser nova ou existente
    if (sheet.getMaxColumns() > maxCols) {
      sheet.deleteColumns(maxCols + 1, sheet.getMaxColumns() - maxCols);
    }
  });
}

// Chamada pelos triggers time-based
function rotinaPesada() {
  atualizarUsuarios();
  atualizarGeral();
  atualizarPainel();
  formatarGeral();
  formatarUsuarios();
  protegerEstrutura();
}

/***************************************
 * ⚡ ON EDIT
 ***************************************/

function onEdit(e) {
  if (!e) return;

  const sheet   = e.range.getSheet();
  const nome    = sheet.getName();

  // Delega para o handler correto
  if (nome === CONFIG.abas.usuarios) {
    onEditUsuarios(e);
    return;
  }

  // Abas estruturais ignoradas
  if (nome === CONFIG.abas.painel) return;
  if (nome === CONFIG.abas.geral)  return;

  // Abas de usuário
  onEditAbaUsuario(e);
}

/***************************************
 * 🔄 ON CHANGE
 ***************************************/

function onChange(e) {
  if (!e) return;

  try {
    const tipo = e.changeType;
    if (tipo === "INSERT_ROW" || tipo === "REMOVE_ROW" || tipo === "OTHER") {
      const ss    = SpreadsheetApp.getActiveSpreadsheet();
      const ativa = ss.getActiveSheet();
      if (ativa && ativa.getName() === CONFIG.abas.usuarios) {
        atualizarUsuarios();
      }
    }
  } catch(err) {
    log("onChange erro: " + err.message);
  }
}

/***************************************
 * ⏱️ CONFIGURAR TRIGGERS (rodar uma vez)
 ***************************************/

function configurarTriggers() {
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t));

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // onEdit instalável — permissões completas (ocultar/mostrar abas, etc)
  ScriptApp.newTrigger("onEdit")
    .forSpreadsheet(ss)
    .onEdit()
    .create();

  // onChange — mudanças estruturais
  ScriptApp.newTrigger("onChange")
    .forSpreadsheet(ss)
    .onChange()
    .create();

  // rotinaPesada — a cada 1 hora
  ScriptApp.newTrigger("rotinaPesada")
    .timeBased()
    .everyHours(1)
    .create();

  // atualizarGeral — a cada 1 hora
  ScriptApp.newTrigger("atualizarGeral")
    .timeBased()
    .everyHours(1)
    .create();

  // atualizarPainel — a cada 1 hora
  ScriptApp.newTrigger("atualizarPainel")
    .timeBased()
    .everyHours(1)
    .create();

  // verificarPendentes — a cada 1 hora
  ScriptApp.newTrigger("verificarPendentes")
    .timeBased()
    .everyHours(1)
    .create();

  log("configurarTriggers: triggers configurados.");
}

/***************************************
 * 🖨️ CONFIGURAR IMPRESSÃO
 ***************************************/

function configurarImpressao() {
  const painel = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.abas.painel);
  if (painel) painel.setHiddenGridlines(true);
}

/***************************************
 * 📝 LOG (silencioso — só via Apps Script)
 ***************************************/

function log(msg) {
  try {
    const props     = PropertiesService.getScriptProperties();
    const historico = JSON.parse(props.getProperty("log") || "[]");
    historico.push({ ts: new Date().toISOString(), msg });
    props.setProperty("log", JSON.stringify(historico.slice(-100)));
  } catch (e) {
    console.error("Erro ao registrar log:", e);
  }
}