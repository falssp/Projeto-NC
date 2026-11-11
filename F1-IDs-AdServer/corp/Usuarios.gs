/***************************************
 * 👥 USUARIOS — Formatação e Validações
 ***************************************/

function formatarUsuarios() {
  const ss       = SpreadsheetApp.getActiveSpreadsheet();
  const usuarios = ss.getSheetByName(CONFIG.abas.usuarios);

  _formatarCabecalhoUsuarios(usuarios);
  _configurarColunasUsuarios(usuarios);
  _configurarValidacoesUsuarios(usuarios);
  _atualizarDropdownAcessoExtra(usuarios);

  usuarios.setFrozenColumns(0);
  usuarios.setFrozenRows(1);

  log("formatarUsuarios: formatação aplicada.");
}

function _formatarCabecalhoUsuarios(usuarios) {
  const cabecalhos = ["Login","Nome","Sobrenome","E-mail","Perfil","Status","Aprovado por","Acesso Extra","Aprovado por"];

  const headerRange = usuarios.getRange(1, 1, 1, cabecalhos.length);
  headerRange.setValues([cabecalhos]);
  headerRange.setBackground("#1F36C7").setFontColor("#FFFFFF")
    .setFontSize(11).setFontWeight("bold")
    .setHorizontalAlignment("center").setVerticalAlignment("middle");
  usuarios.setRowHeight(1, 34);
  usuarios.setFrozenColumns(0);
  usuarios.setFrozenRows(1);

  if (usuarios.getFilter()) usuarios.getFilter().remove();
  usuarios.getRange(1, 1, 1, 9).createFilter();

  if (usuarios.getMaxColumns() > 9) {
    usuarios.deleteColumns(10, usuarios.getMaxColumns() - 9);
  }
}

function _configurarColunasUsuarios(usuarios) {
  usuarios.setColumnWidth(1, 140);
  usuarios.setColumnWidth(2, 120);
  usuarios.setColumnWidth(3, 140);
  usuarios.setColumnWidth(4, 300);
  usuarios.setColumnWidth(5, 110);
  usuarios.setColumnWidth(6, 110);
  usuarios.setColumnWidth(7, 280);
  usuarios.setColumnWidth(8, 200);
  usuarios.setColumnWidth(9, 280);
}

function _configurarValidacoesUsuarios(usuarios) {
  const maxRows = usuarios.getMaxRows();
  const col     = CONFIG.colunas.usuarios;

  usuarios.getRange(2, col.perfil, maxRows - 1, 1)
    .setDataValidation(
      SpreadsheetApp.newDataValidation()
        .requireValueInList([CONFIG.perfis.admin, CONFIG.perfis.dev, CONFIG.perfis.gerente, CONFIG.perfis.operador], true)
        .setAllowInvalid(false).build()
    );

  usuarios.getRange(2, col.status, maxRows - 1, 1)
    .setDataValidation(
      SpreadsheetApp.newDataValidation()
        .requireValueInList([CONFIG.status.ativo, CONFIG.status.inativo, CONFIG.status.pendente], true)
        .setAllowInvalid(false).build()
    );
}

function _atualizarDropdownAcessoExtra(usuarios) {
  const col     = CONFIG.colunas.usuarios;
  const lastRow = usuarios.getLastRow();
  let   logins  = [];

  if (lastRow >= 2) {
    const colsNecessarias = Math.max(col.login, col.status);
    const dados = usuarios.getRange(2, 1, lastRow - 1, colsNecessarias).getValues();
    logins = dados
      .filter(u => u[col.status - 1] === CONFIG.status.ativo && u[col.login - 1])
      .map(u => u[col.login - 1].toString());
  }

  if (!logins.length) return;

  usuarios.getRange(2, col.acessoExtra, usuarios.getMaxRows() - 1, 1)
    .setDataValidation(
      SpreadsheetApp.newDataValidation()
        .requireValueInList(logins, true)
        .setAllowInvalid(true).build()
    );
}

function onEditUsuarios(e) {
  if (!e) return;

  const range  = e.range;
  const sheet  = range.getSheet();
  const col    = range.getColumn();
  const row    = range.getRow();
  const colCfg = CONFIG.colunas.usuarios;

  if (sheet.getName() !== CONFIG.abas.usuarios) return;
  if (row < 2) return;

  const dados  = sheet.getRange(row, 1, 1, colCfg.aprovadoExtraPor).getValues()[0];
  const email  = dados[colCfg.email - 1];
  const status = dados[colCfg.status - 1];
  const login  = dados[colCfg.login - 1];

  if (col === colCfg.email && email) {
    const loginGerado = extrairLoginDoEmail(email);
    if (loginGerado && !login) {
      sheet.getRange(row, colCfg.login).setValue(loginGerado);
    }
  }

  if (col === colCfg.status && email) {
    const aprovador = Session.getActiveUser().getEmail();
    const nome      = dados[colCfg.nome - 1] + " " + dados[colCfg.sobrenome - 1];

    if (status === CONFIG.status.ativo) {
      sheet.getRange(row, colCfg.aprovadoPor).setValue(aprovador);
      _emailAtivacao(email, nome, aprovador);
    } else if (status === CONFIG.status.inativo) {
      _emailInativacao(email, nome, aprovador);
    } else if (status === CONFIG.status.pendente) {
      _emailNovoPendente(nome, email);
    }

    atualizarUsuarios();
  }

  if (col === colCfg.acessoExtra) {
    if (dados[colCfg.acessoExtra - 1]) {
      const aprovador = Session.getActiveUser().getEmail();
      sheet.getRange(row, colCfg.aprovadoExtraPor).setValue(aprovador);
    } else {
      sheet.getRange(row, colCfg.aprovadoExtraPor).clearContent();
    }
  }
}

function verificarPendentes() {
  const ss       = SpreadsheetApp.getActiveSpreadsheet();
  const usuarios = ss.getSheetByName(CONFIG.abas.usuarios);
  const lastRow  = usuarios.getLastRow();
  if (lastRow < 2) return;

  const col    = CONFIG.colunas.usuarios;
  const dados  = usuarios.getRange(2, 1, lastRow - 1, col.aprovadoPor).getValues();
  const cadeia = obterCadeiaAprovacao();
  const agora  = new Date().getTime();

  dados.forEach((u, i) => {
    const status      = u[col.status - 1];
    const email       = u[col.email - 1];
    const nome        = u[col.nome - 1] + " " + u[col.sobrenome - 1];
    const aprovadoPor = u[col.aprovadoPor - 1];

    if (status !== CONFIG.status.pendente || !email) return;

    const marcador      = aprovadoPor ? aprovadoPor.toString() : "";
    const partes        = marcador.split("|");
    const tsUltimo      = partes[0] ? parseInt(partes[0]) : agora;
    const priAtual      = partes[1] ? parseInt(partes[1]) : 0;
    const horasPassadas = (agora - tsUltimo) / (1000 * 60 * 60);

    if (horasPassadas >= 2) {
      const proxima = cadeia.find(c => c.prioridade > priAtual);
      if (proxima) {
        _emailEscalonamento(proxima.email, nome, email);
        usuarios.getRange(i + 2, col.aprovadoPor).setValue(agora + "|" + proxima.prioridade);
        log("verificarPendentes: escalonado " + nome + " para prioridade " + proxima.prioridade);
      }
    }
  });
}

function _emailsBloqueados() { return true; }

function _emailAdmins(assunto, corpo) {
  if (_emailsBloqueados()) return;
  const cadeia = obterCadeiaAprovacao();
  if (!cadeia.length) return;
  MailApp.sendEmail({ to: cadeia.map(c => c.email).join(","), subject: assunto, body: corpo + "\n\nStormX" });
}

function _emailAtivacao(emailUsuario, nome, aprovador) {
  try {
    if (_emailsBloqueados()) return;
    MailApp.sendEmail({ to: emailUsuario, subject: "✅ Acesso liberado — StormX x Unilever",
      body: "Olá " + nome + ",\n\nSeu acesso foi liberado por " + aprovador + ".\n\nBem-vindo ao time!\n\nStormX" });
    _emailAdmins("Usuário ativado: " + nome, nome + " (" + emailUsuario + ") foi ativado por " + aprovador + ".");
  } catch(err) { log("_emailAtivacao erro: " + err.message); }
}

function _emailEscalonamento(emailDestino, nomeUsuario, emailUsuario) {
  try {
    if (_emailsBloqueados()) return;
    MailApp.sendEmail({ to: emailDestino, subject: "⏳ Aprovação pendente — " + nomeUsuario,
      body: "Há um usuário aguardando aprovação:\n\nNome: " + nomeUsuario + "\nE-mail: " + emailUsuario + "\n\nStormX" });
  } catch(err) { log("_emailEscalonamento erro: " + err.message); }
}

function _emailInativacao(emailUsuario, nome, aprovador) {
  try {
    if (_emailsBloqueados()) return;
    MailApp.sendEmail({ to: emailUsuario, subject: "⛔ Acesso suspenso — StormX x Unilever",
      body: "Olá " + nome + ",\n\nSeu acesso foi suspenso por " + aprovador + ".\n\nStormX" });
    _emailAdmins("Usuário inativado: " + nome, nome + " (" + emailUsuario + ") foi inativado por " + aprovador + ".");
  } catch(err) { log("_emailInativacao erro: " + err.message); }
}

function _emailNovoPendente(nome, emailUsuario) {
  try {
    if (_emailsBloqueados()) return;
    _emailAdmins("⏳ Novo usuário aguardando aprovação: " + nome,
      "Um novo usuário está aguardando aprovação:\n\nNome: " + nome + "\nE-mail: " + emailUsuario + "\n\nStormX");
  } catch(err) { log("_emailNovoPendente erro: " + err.message); }
}
