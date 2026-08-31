/***************************************
 * 🚀 CARGA INICIAL
 * Rodar UMA VEZ em planilhas novas
 * Popula a aba Usuarios com os dados reais da equipe StormX
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

  const aprovadoPor = "carolina.dobner@stormx.com.br";

  const dados = [
    ["carolina.dobner", "Carolina", "Dobner",  "carolina.dobner@stormx.com.br", "Admin",    "Ativo", aprovadoPor, "", ""],
    ["aline.calderan",  "Aline",    "Calderan", "aline.calderan@stormx.com.br",  "Admin",    "Ativo", aprovadoPor, "", ""],
    ["felipe.lima",     "Felipe",   "Lima",     "felipe.lima@stormx.com.br",     "Dev",      "Ativo", aprovadoPor, "", ""],
    ["tiago.santos",    "Tiago",    "Santos",   "tiago.santos@stormx.com.br",    "Gerente",  "Ativo", aprovadoPor, "", ""],
    ["marcos.santos",   "Marcos",   "Santos",   "marcos.santos@stormx.com.br",   "Operador", "Ativo", aprovadoPor, "", ""],
    ["joao.braga",      "Joao",     "Braga",    "joao.braga@stormx.com.br",      "Operador", "Ativo", aprovadoPor, "", ""],
  ];

  usuarios.getRange(2, 1, dados.length, 9).setValues(dados);

  atualizarUsuarios();
  formatarUsuarios();
  protegerEstrutura();

  log("cargaInicial: " + dados.length + " usuarios carregados.");
  SpreadsheetApp.getUi().alert("Carga inicial concluida! " + dados.length + " usuarios cadastrados.");
}

/***************************************
 * 🔄 MIGRAR ABAS EXISTENTES
 ***************************************/

function migrarAbasExistentes() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const fixas = [CONFIG.abas.painel, CONFIG.abas.usuarios, CONFIG.abas.geral];

  ss.getSheets().forEach(sheet => {
    const nome = sheet.getName();
    if (fixas.includes(nome)) return;
    formatarAbaUsuario(sheet);
    log("migrarAbasExistentes: " + nome + " atualizada.");
  });

  log("migrarAbasExistentes: concluida.");
}
