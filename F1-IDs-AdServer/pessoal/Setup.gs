/***************************************
 * 🚀 CARGA INICIAL
 ***************************************/

function cargaInicial() {
  const ss       = SpreadsheetApp.getActiveSpreadsheet();
  const usuarios = ss.getSheetByName(CONFIG.abas.usuarios);

  const lastRow = usuarios.getLastRow();
  if (lastRow > 1) {
    usuarios.getRange(2, 1, lastRow - 1, 9).clearContent();
  }

  if (usuarios.getMaxColumns() > 9) {
    usuarios.deleteColumns(10, usuarios.getMaxColumns() - 9);
  }

  const aprovadoPor = "admin@empresa.com.br";

  const dados = [
    ["", "", "", "admin1@empresa.com.br",    "Admin",    "Ativo", aprovadoPor, "", ""],
    ["", "", "", "admin2@empresa.com.br",    "Admin",    "Ativo", aprovadoPor, "", ""],
    ["", "", "", "dev@empresa.com.br",       "Dev",      "Ativo", aprovadoPor, "", ""],
    ["", "", "", "gerente@empresa.com.br",   "Gerente",  "Ativo", aprovadoPor, "", ""],
    ["", "", "", "operador1@empresa.com.br", "Operador", "Ativo", aprovadoPor, "", ""],
    ["", "", "", "operador2@empresa.com.br", "Operador", "Ativo", aprovadoPor, "", ""],
  ];

  usuarios.getRange(2, 1, dados.length, 9).setValues(dados);

  atualizarUsuarios();
  formatarUsuarios();
  protegerEstrutura();

  log("cargaInicial: " + dados.length + " usuários carregados.");
  SpreadsheetApp.getUi().alert("Carga inicial concluída! " + dados.length + " usuários cadastrados.");
}

function migrarAbasExistentes() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const fixas = [CONFIG.abas.painel, CONFIG.abas.usuarios, CONFIG.abas.geral];

  ss.getSheets().forEach(sheet => {
    const nome = sheet.getName();
    if (fixas.includes(nome)) return;
    formatarAbaUsuario(sheet);
    log("migrarAbasExistentes: " + nome + " atualizada.");
  });

  log("migrarAbasExistentes: concluída.");
}
