/***************************************
 * 📋 MENU — Abas de Usuário
 ***************************************/

function criarMenuUsuario() {
  SpreadsheetApp.getUi()
    .createMenu("Criar Linhas")
    .addItem("Amazon",             "criarLinhasAmazon")
    .addItem("Meta",               "criarLinhasMeta")
    .addItem("Search",             "criarLinhasSearch")
    .addItem("TikTok",             "criarLinhasTikTok")
    .addItem("YouTube",            "criarLinhasYouTube")
    .addSeparator()
    .addItem("Planejamento Livre", "planejamentoLivre")
    .addToUi();
}

/***************************************
 * 🧱 CRIAÇÃO DE LINHAS POR PLATAFORMA
 ***************************************/

function criarLinhasPorPlataforma(plataforma) {
  const sh   = SpreadsheetApp.getActiveSheet();
  const ui   = SpreadsheetApp.getUi();
  const nome = sh.getName();

  if (nome === CONFIG.abas.painel || nome === CONFIG.abas.usuarios || nome === CONFIG.abas.geral) return;

  const response = ui.prompt("Quantas linhas deseja criar para " + plataforma + "?");
  if (response.getSelectedButton() !== ui.Button.OK) return;

  const qtd = parseInt(response.getResponseText(), 10);
  if (isNaN(qtd) || qtd <= 0) return;

  const startRow = sh.getLastRow() + 1;
  const hoje     = hojeData();
  const cor      = getCorPlataforma(plataforma);

  // Gera todos os IDs e monta linhas em batch
  const linhas = Array(qtd).fill(null).map(() => {
    const r = processarID("", plataforma);
    return [hoje, r.idSX, r.idAMZ, "", plataforma];
  });

  sh.getRange(startRow, 1, qtd, 5).setValues(linhas);
  sh.getRange(startRow, 1, qtd, 1).setNumberFormat("dd/MM/yyyy");

  // Formata coluna E em batch
  const rangeE = sh.getRange(startRow, 5, qtd, 1);
  rangeE.setFontWeight("bold");
  if (cor) {
    rangeE.setBackground(cor.bg);
    rangeE.setFontColor(cor.font);
  }

  sh.autoResizeColumns(1, 5);
  destacarDuplicados(sh);
}

function criarLinhasAmazon() { criarLinhasPorPlataforma("Amazon");  }
function criarLinhasMeta()   { criarLinhasPorPlataforma("Meta");    }
function criarLinhasSearch() { criarLinhasPorPlataforma("Search");  }
function criarLinhasTikTok() { criarLinhasPorPlataforma("TikTok");  }
function criarLinhasYouTube(){ criarLinhasPorPlataforma("YouTube"); }

/***************************************
 * 🔥 PLANEJAMENTO LIVRE
 ***************************************/

function planejamentoLivre() {
  const sh   = SpreadsheetApp.getActiveSheet();
  const ui   = SpreadsheetApp.getUi();
  const nome = sh.getName();

  if (nome === CONFIG.abas.painel || nome === CONFIG.abas.usuarios || nome === CONFIG.abas.geral) return;

  const response = ui.prompt("Cole as plataformas");
  if (response.getSelectedButton() !== ui.Button.OK) return;

  const texto = response.getResponseText();
  if (!texto) return;

  const tokens = texto.split(/[\n\r\s]+/).filter(t => t.trim() !== "");
  if (!tokens.length) return;

  const hoje     = hojeData();
  const startRow = sh.getLastRow() + 1;

  // Monta linhas e gera IDs em batch
  const linhas = tokens.map(t => {
    const plataforma = normalizarPlataforma(t);
    if (!plataforma) return [hoje, "", "", "", t];
    const r = processarID("", plataforma);
    return [hoje, r.idSX, r.idAMZ, "", plataforma];
  });

  sh.getRange(startRow, 1, linhas.length, 5).setValues(linhas);
  sh.getRange(startRow, 1, linhas.length, 1).setNumberFormat("dd/MM/yyyy");

  // Agrupa por cor para minimizar chamadas à API
  const corMap = {};
  linhas.forEach((l, i) => {
    const p   = normalizarPlataforma(l[4]);
    const cor = p ? getCorPlataforma(p) : null;
    const key = cor ? cor.bg + "|" + cor.font : "none";
    if (!corMap[key]) corMap[key] = { cor, indices: [] };
    corMap[key].indices.push(i);
  });

  // Aplica formatação por grupo de cor em batch
  Object.values(corMap).forEach(({ cor, indices }) => {
    // Agrupa índices contíguos para usar setValues em ranges
    indices.forEach(i => {
      const rangeE = sh.getRange(startRow + i, 5);
      rangeE.setFontWeight("bold");
      if (cor) {
        rangeE.setBackground(cor.bg);
        rangeE.setFontColor(cor.font);
      }
    });
  });

  sh.autoResizeColumns(1, 5);
  destacarDuplicados(sh);
}

/***************************************
 * ⚡ ON EDIT — Abas de Usuário
 ***************************************/

function onEditAbaUsuario(e) {
  if (!e) return;

  const range    = e.range;
  const sheet    = range.getSheet();
  const nomeAba  = sheet.getName();
  const col      = range.getColumn();
  const lastCol  = range.getLastColumn();
  const rowStart = range.getRow();
  const numRows  = range.getNumRows();

  if (nomeAba === CONFIG.abas.geral)    return;
  if (nomeAba === CONFIG.abas.painel)   return;
  if (nomeAba === CONFIG.abas.usuarios) return;
  if (rowStart < 2)                     return;
  if (lastCol < 4 || col > 5)           return;

  // Leitura única de todas as linhas editadas
  const values = sheet.getRange(rowStart, 1, numRows, 5).getValues();
  let algumID  = false;

  for (let i = 0; i < numRows; i++) {
    const row = rowStart + i;
    const A   = values[i][0];
    const B   = values[i][1];
    const C   = values[i][2];
    const D   = values[i][3];
    const E   = values[i][4];

    // ── Coluna E editada ──
    if (col <= 5 && lastCol >= 5 && E) {
      const normalizado = normalizarPlataforma(E);

      if (!normalizado) {
        const sugestao = sugerirPlataforma(E);
        const cellE    = sheet.getRange(row, 5);
        cellE.setBackground("#dc2626").setFontColor("#ffffff").setFontWeight("bold");
        cellE.setNote(sugestao ? "Plataforma inválida. Sugestão: " + sugestao : "Plataforma inválida");
        sheet.getRange(row, 2, 1, 2).clearContent().setBackground(null);
        continue;
      }

      const cellE = sheet.getRange(row, 5);
      cellE.setFontWeight("bold").setNote("").setValue(normalizado);
      const cor = getCorPlataforma(normalizado);
      if (cor) cellE.setBackground(cor.bg).setFontColor(cor.font);

      if (!A) preencherData(sheet, row);
      if (D && !B && !C) { aplicarID(sheet, row, D, normalizado); algumID = true; }
    }

    // ── Coluna D editada ──
    if (col <= 4 && lastCol >= 4 && D) {
      const plataforma = normalizarPlataforma(E);
      if (!plataforma) continue;
      if (!A) preencherData(sheet, row);
      aplicarID(sheet, row, D, plataforma);
      algumID = true;
    }
  }

  if (algumID) destacarDuplicados(sheet);
}

/***************************************
 * 🔧 FUNÇÕES DE SUPORTE
 ***************************************/

function aplicarID(sheet, row, adName, plataforma) {
  const resultado = processarID(adName, plataforma);
  const cellB     = sheet.getRange(row, 2);
  const cellC     = sheet.getRange(row, 3);

  if (resultado.tipo === "AMZ") {
    cellB.setValue("").setBackground("#FFFFFF").setFontColor("#111827");
    cellC.setValue(resultado.idAMZ)
      .setBackground(resultado.valido ? "#FFFFFF" : "#fecaca")
      .setFontColor("#111827");

  } else if (resultado.tipo === "SX") {
    cellB.setValue(resultado.idSX)
      .setBackground(resultado.valido ? "#FFFFFF" : "#fecaca")
      .setFontColor("#111827");
    cellC.setValue("").setBackground("#FFFFFF").setFontColor("#111827");

  } else if (resultado.tipo === "MANUAL") {
    cellB.setValue(resultado.idManual)
      .setBackground(resultado.valido ? "#FFFFFF" : "#fecaca")
      .setFontColor("#111827")
      .setNote(resultado.valido ? "" : "ID inválido. Esperado: numérico de 6 a 10 dígitos.");
    cellC.setValue("").setBackground("#FFFFFF").setFontColor("#111827");
  }
}

function destacarDuplicados(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;

  const range  = sheet.getRange(2, 2, lastRow - 1, 2);
  const values = range.getValues();

  // Verifica se há IDs na mesma leitura
  const temIds = values.some(r => r[0] || r[1]);
  if (!temIds) return;

  const mapa = {};
  values.forEach((row, i) => {
    row.forEach(val => {
      if (!val) return;
      if (!mapa[val]) mapa[val] = [];
      mapa[val].push(i + 2);
    });
  });

  range.setBackground(null);
  Object.values(mapa).forEach(rows => {
    if (rows.length > 1) {
      rows.forEach(r => sheet.getRange(r, 2, 1, 2).setBackground("#fef9c3"));
    }
  });
}

function preencherData(sheet, row) {
  sheet.getRange(row, 1).setValue(hojeData()).setNumberFormat("dd/MM/yyyy");
}

/***************************************
 * 📅 DATA SEM HORA
 ***************************************/

function hojeData() {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/***************************************
 * 🎨 FORMATAR ABA DE USUÁRIO
 ***************************************/

function formatarAbaUsuario(sheet) {
  if (!sheet) {
    log("formatarAbaUsuario: sheet undefined — chamada ignorada.");
    return;
  }

  const header = sheet.getRange(1, 1, 1, 5);
  header.setValues([["Data", "ID Meta/TikTok/Youtube", "ID Amazon", "Ad Name", "Plataforma"]]);
  header.setBackground("#1F36C7")
    .setFontColor("#FFFFFF")
    .setFontSize(11)
    .setFontWeight("bold")
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle");
  sheet.setRowHeight(1, 34);
  sheet.setFrozenColumns(0);
  sheet.setFrozenRows(1);

  if (sheet.getFilter()) sheet.getFilter().remove();
  sheet.getRange(1, 1, 1, 5).createFilter();

  if (sheet.getMaxColumns() > 5) sheet.deleteColumns(6, sheet.getMaxColumns() - 5);

  sheet.setColumnWidth(1, 100);
  sheet.setColumnWidth(2, 200);
  sheet.setColumnWidth(3, 200);
  sheet.setColumnWidth(4, 1250);
  sheet.setColumnWidth(5, 100);

  _protegerColunasAba(sheet);
}

function _protegerColunasAba(sheet) {
  try {
    const me = Session.getEffectiveUser();
    sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE).forEach(p => p.remove());
    [1, 5].forEach(col => {
      const prot = sheet.getRange(2, col, sheet.getMaxRows() - 1, 1)
        .protect()
        .setDescription("Col " + col + " — bloqueada pelo script");
      prot.removeEditors(prot.getEditors());
      prot.addEditor(me);
      if (prot.canDomainEdit()) prot.setDomainEdit(false);
    });
  } catch(err) {
    log("_protegerColunasAba erro: " + err.message);
  }
}