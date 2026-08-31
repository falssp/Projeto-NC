// v1.1
/***************************************
 * ⚙️ CONFIG CENTRAL
 ***************************************/

const CONFIG = {
  abas: {
    geral:    "Geral",
    painel:   "Painel",
    usuarios: "Usuarios"
  },
  colunas: {
    aba: {
      adName:     4,
      data:       1,
      idAMZ:      3,
      idSX:       2,
      plataforma: 5
    },
    geral: {
      adName:     4,
      data:       1,
      idAMZ:      3,
      idSX:       2,
      origem:     6,
      plataforma: 5
    },
    usuarios: {
      login:            1,
      nome:             2,
      sobrenome:        3,
      email:            4,
      perfil:           5,
      status:           6,
      aprovadoPor:      7,
      acessoExtra:      8,
      aprovadoExtraPor: 9
    }
  },
  perfis: {
    admin:    "Admin",
    dev:      "Dev",
    gerente:  "Gerente",
    operador: "Operador"
  },
  plataformas: {
    amazon:       "Amazon",
    compraDireta: "Compra Direta",
    dv360:        "DV360",
    googleAds:    "Google Ads",
    kwai:         "Kwai",
    linkedin:     "LinkedIn",
    meta:         "Meta",
    pinterest:    "Pinterest",
    search:       "Search",
    snapchat:     "Snapchat",
    spotify:      "Spotify",
    tiktok:       "TikTok",
    twitterX:     "Twitter/X",
    youtube:      "YouTube"
  },
  status: {
    ativo:    "Ativo",
    inativo:  "Inativo",
    pendente: "Pendente"
  }
}

/***************************************
 * 🔑 CONFIG DE IDs
 ***************************************/

const ID_CONFIG = {
  AMZ: {
    digitos:     6,
    plataformas: ["Amazon"],
    prefixo:     "AMZ",
    prop:        "ultimoAMZ",
    sufixo:      "H"
  },
  SX: {
    digitos:     8,
    plataformas: ["Meta", "TikTok", "YouTube", "Search"],
    prefixo:     "SX",
    prop:        "ultimoSX",
    sufixo:      ""
  }
}

/***************************************
 * 🔑 GERAÇÃO DE IDs
 ***************************************/

function extrairIDsBrutos(texto) {
  if (!texto) return { tipo: "", id: "", valido: false };
  const t = texto.toString().toUpperCase();

  const amz = t.match(/AMZ(\d{1,6})H?/);
  if (amz) {
    const num = amz[1];
    return { tipo: "AMZ", id: "AMZ" + num.padStart(6, "0") + "H", valido: num.length === 6 };
  }

  const sx = t.match(/SX(\d{1,8})/);
  if (sx) {
    const num = sx[1];
    return { tipo: "SX", id: "SX" + num.padStart(8, "0"), valido: num.length === 8 };
  }

  return { tipo: "", id: "", valido: false };
}

function formatarID(tipo, numero) {
  const cfg = ID_CONFIG[tipo];
  return cfg.prefixo + numero.toString().padStart(cfg.digitos, "0") + cfg.sufixo;
}

function gerarID(tipo) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    const props   = PropertiesService.getScriptProperties();
    const cfg     = ID_CONFIG[tipo];
    const ultimo  = parseInt(props.getProperty(cfg.prop) || "0");
    const proximo = ultimo + 1;

    if (idJaExiste(formatarID(tipo, proximo))) {
      return gerarProximoDisponivel(tipo, proximo, props, cfg);
    }

    props.setProperty(cfg.prop, proximo.toString());
    return formatarID(tipo, proximo);

  } finally {
    lock.releaseLock();
  }
}

function gerarProximoDisponivel(tipo, inicio, props, cfg) {
  let tentativa = inicio;
  while (true) {
    const id = formatarID(tipo, tentativa);
    if (!idJaExiste(id)) {
      props.setProperty(cfg.prop, tentativa.toString());
      return id;
    }
    tentativa++;
  }
}

function getTipoID(plataforma) {
  if (ID_CONFIG.AMZ.plataformas.includes(plataforma)) return "AMZ";
  if (ID_CONFIG.SX.plataformas.includes(plataforma))  return "SX";
  return "MANUAL";
}

function idJaExiste(id) {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const geral = ss.getSheetByName(CONFIG.abas.geral);
  const last  = geral.getLastRow();
  if (last < 2) return false;

  const col   = CONFIG.colunas.geral;
  const dados = geral.getRange(2, col.idSX, last - 1, 2).getValues();

  return dados.some(row => row[0] === id || row[1] === id);
}

function processarID(adName, plataforma) {
  const tipo = getTipoID(plataforma);

  if (tipo === "MANUAL") {
    const resultado = validarIDManual(adName);
    return { idAMZ: "", idManual: resultado.id, idSX: "", tipo: "MANUAL", valido: resultado.valido };
  }

  const bruto = extrairIDsBrutos(adName);
  if (bruto.tipo === tipo) {
    return {
      idAMZ:    tipo === "AMZ" ? bruto.id : "",
      idManual: "",
      idSX:     tipo === "SX"  ? bruto.id : "",
      tipo,
      valido:   bruto.valido
    };
  }

  const id = gerarID(tipo);
  return {
    idAMZ:    tipo === "AMZ" ? id : "",
    idManual: "",
    idSX:     tipo === "SX"  ? id : "",
    tipo,
    valido:   true
  };
}

function validarIDManual(valor) {
  if (!valor) return { valido: false, id: "" };
  const limpo  = valor.toString().trim();
  const valido = /^\d{6,10}$/.test(limpo);
  return { valido, id: limpo };
}

/***************************************
 * 👥 USUARIOS
 ***************************************/

function atualizarUsuarios() {
  const ss       = SpreadsheetApp.getActiveSpreadsheet();
  const usuarios = ss.getSheetByName(CONFIG.abas.usuarios);
  const lastRow  = usuarios.getLastRow();
  if (lastRow < 2) return;

  const col   = CONFIG.colunas.usuarios;
  const dados = usuarios.getRange(2, 1, lastRow - 1, col.aprovadoExtraPor).getValues();
  const fixas = [CONFIG.abas.painel, CONFIG.abas.usuarios, CONFIG.abas.geral];

  const admins       = _extrairAdminsDeDados(dados, col);
  const loginUpdates = [];

  dados.forEach((u, i) => {
    const acessoExtra = u[col.acessoExtra - 1];
    const email       = u[col.email - 1];
    const login       = u[col.login - 1];
    const perfil      = u[col.perfil - 1];
    const status      = u[col.status - 1];

    if (!email) return;

    const loginGerado = extrairLoginDoEmail(email);
    if (!login && loginGerado) loginUpdates.push({ row: i + 2, login: loginGerado });

    const loginFinal = login || loginGerado;
    if (!loginFinal) return;

    if (perfil === CONFIG.perfis.operador || perfil === CONFIG.perfis.dev) {
      let sheet = ss.getSheetByName(loginFinal);
      if (!sheet) sheet = ss.insertSheet(loginFinal);

      if (sheet.getRange(1, 1).getValue() !== "Data") formatarAbaUsuario(sheet);

      const inativo = status === CONFIG.status.inativo || status === CONFIG.status.pendente;
      inativo ? sheet.hideSheet() : sheet.showSheet();

      _protegerAbaComAdmins(sheet, email, perfil, acessoExtra, admins, dados, col);

    } else if (perfil === CONFIG.perfis.admin || perfil === CONFIG.perfis.gerente) {
      const sheet = ss.getSheetByName(loginFinal);
      if (sheet && !fixas.includes(loginFinal)) {
        ss.deleteSheet(sheet);
        log("atualizarUsuarios: aba removida — " + loginFinal + " (" + perfil + ")");
      }
    }
  });

  loginUpdates.forEach(({ row, login }) => usuarios.getRange(row, col.login).setValue(login));

  _ordenarAbas(ss);
}

function _extrairAdminsDeDados(dados, col) {
  return dados
    .filter(u => {
      const perfil = u[col.perfil - 1];
      return (perfil === CONFIG.perfis.admin || perfil === CONFIG.perfis.dev) && u[col.email - 1];
    })
    .map(u => u[col.email - 1]);
}

function _ordenarAbas(ss) {
  const fixas    = [CONFIG.abas.painel, CONFIG.abas.usuarios, CONFIG.abas.geral];
  const abaAtiva = ss.getActiveSheet();
  const outros   = ss.getSheets()
    .map(s => s.getName())
    .filter(n => !fixas.includes(n))
    .sort();

  [...fixas, ...outros].forEach((nome, i) => {
    const sheet = ss.getSheetByName(nome);
    if (!sheet) return;
    ss.setActiveSheet(sheet);
    ss.moveActiveSheet(i + 1);
  });

  if (abaAtiva) ss.setActiveSheet(abaAtiva);
}

function _protegerAbaComAdmins(sheet, emailUsuario, perfil, acessoExtra, admins, dados, col) {
  try {
    const protection = sheet.protect();
    protection.setWarningOnly(false);

    let editores = [...admins];

    if (perfil === CONFIG.perfis.operador) editores.push(emailUsuario);

    if (acessoExtra) {
      const row = dados.find(u => u[col.login - 1] === acessoExtra.toString().trim());
      if (row && row[col.email - 1]) editores.push(row[col.email - 1]);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    editores = editores.filter(e => e && emailRegex.test(e));

    protection.removeEditors(protection.getEditors());
    if (editores.length) protection.addEditors(editores);
  } catch(err) {
    log("_protegerAbaComAdmins erro: " + err.message);
  }
}

function obterAdmins() {
  const ss       = SpreadsheetApp.getActiveSpreadsheet();
  const usuarios = ss.getSheetByName(CONFIG.abas.usuarios);
  const lastRow  = usuarios.getLastRow();
  if (lastRow < 2) return [];

  const col   = CONFIG.colunas.usuarios;
  const dados = usuarios.getRange(2, 1, lastRow - 1, col.perfil).getValues();
  return _extrairAdminsDeDados(dados, col);
}

function obterCadeiaAprovacao() {
  const ss       = SpreadsheetApp.getActiveSpreadsheet();
  const usuarios = ss.getSheetByName(CONFIG.abas.usuarios);
  const lastRow  = usuarios.getLastRow();
  if (lastRow < 2) return [];

  const col      = CONFIG.colunas.usuarios;
  const dados    = usuarios.getRange(2, 1, lastRow - 1, col.aprovadoPor).getValues();
  const prioMap  = {
    [CONFIG.perfis.admin]:   1,
    [CONFIG.perfis.dev]:     3,
    [CONFIG.perfis.gerente]: 4
  };
  let adminCount = 0;

  return dados
    .filter(u => {
      const perfil = u[col.perfil - 1];
      return u[col.email - 1] && u[col.status - 1] === CONFIG.status.ativo &&
        (perfil === CONFIG.perfis.admin || perfil === CONFIG.perfis.dev || perfil === CONFIG.perfis.gerente);
    })
    .map(u => {
      const perfil = u[col.perfil - 1];
      let prio = prioMap[perfil] || 99;
      if (perfil === CONFIG.perfis.admin) prio = ++adminCount;
      return { email: u[col.email - 1], prioridade: prio };
    })
    .sort((a, b) => a.prioridade - b.prioridade);
}

function protegerAbaUsuario(sheet, emailUsuario, perfil, acessoExtra) {
  const admins = obterAdmins();
  _protegerAbaComAdmins(sheet, emailUsuario, perfil, acessoExtra, admins, [], CONFIG.colunas.usuarios);
}

function extrairLoginDoEmail(email) {
  if (!email) return null;
  return email.split("@")[0].toLowerCase().replace(/[^a-z0-9.]/g, "");
}
