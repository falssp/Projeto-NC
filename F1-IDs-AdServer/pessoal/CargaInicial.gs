/***************************************
 * 🚀 CARGA INICIAL
 * Rodar UMA VEZ em planilhas novas
 * Popula a aba Usuarios com os dados iniciais
 ***************************************/

function cargaInicial() {
  const ss       = SpreadsheetApp.getActiveSpreadsheet();
  const usuarios = ss.getSheetByName(CONFIG.abas.usuarios);

  // Limpa dados existentes (mantém cabeçalho)
  const lastRow = usuarios.getLastRow();
  if (lastRow > 1) {
    usuarios.getRange(2, 1, lastRow - 1, 9).clearContent();
  }

  // Remove colunas excedentes além de I (9)
  if (usuarios.getMaxColumns() > 9) {
    usuarios.deleteColumns(10, usuarios.getMaxColumns() - 9);
  }

  const aprovadoPor = "admin@empresa.com.br"; // substitua pelo e-mail do Admin principal

  // Estrutura: Login | Nome | Sobrenome | E-mail | Perfil | Status | Aprovado por | Acesso Extra | Aprovado por (extra)
  const dados = [
    ["", "", "", "admin1@empresa.com.br",    "Admin",    "Ativo", aprovadoPor, "", ""],
    ["", "", "", "admin2@empresa.com.br",    "Admin",    "Ativo", aprovadoPor, "", ""],
    ["", "", "", "dev@empresa.com.br",       "Dev",      "Ativo", aprovadoPor, "", ""],
    ["", "", "", "gerente@empresa.com.br",   "Gerente",  "Ativo", aprovadoPor, "", ""],
    ["", "", "", "operador1@empresa.com.br", "Operador", "Ativo", aprovadoPor, "", ""],
    ["", "", "", "operador2@empresa.com.br", "Operador", "Ativo", aprovadoPor, "", ""],
  ];

  usuarios.getRange(2, 1, dados.length, 9).setValues(dados);

  // Cria abas individuais e proteções primeiro
  atualizarUsuarios();

  // Formata após ter dados — garante dropdown Acesso Extra correto
  formatarUsuarios();

  // Aplica proteções nas abas estruturais
  protegerEstrutura();

  log("cargaInicial: " + dados.length + " usuários carregados.");
  SpreadsheetApp.getUi().alert("Carga inicial concluída! " + dados.length + " usuários cadastrados.");
}

/***************************************
 * 🔄 MIGRAR ABAS EXISTENTES
 * Rodar quando precisar reformatar
 * todas as abas de usuário de uma vez
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

  log("migrarAbasExistentes: concluída.");
}