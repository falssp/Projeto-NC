// ============================================================
// NC Tool | Unilever BR x Grasp — Planilha de Capa
// Cole em uma planilha Google nova e rode: montarCapa()
// ============================================================

var CAPA_CONFIG = {
  titulo: "NC Tool | Unilever BR x Grasp [Capa]",
  capaId: "1kqYJ6AGbTZOsv-uwN4Hr9lI0gJSL71C4F49mMLv04hQ",
  links: {
    f1:              "https://docs.google.com/spreadsheets/d/1VBaExPGHOVYxpTyzJymrb8RuWWe34_9WBE0aC3slETU/edit",
    f2:              "https://docs.google.com/spreadsheets/d/1_6SEjmDdYvSkxoLwLLpqORitM-QxX5flBpF8LoSX8Lc/edit",
    f3:              "https://docs.google.com/spreadsheets/d/1fAQfNJ-UkDfhCHZ2GYcxDWpsAojg7z0VglQHeXtAfSo/edit",
    f4:              "https://docs.google.com/spreadsheets/d/1K3wO3b8BOOQldtHv7pBtOubmhoidoZBI0Y8yk4_UnmI/edit",
    manualUsuario:   "https://docs.google.com/document/d/1Rm0CpP59u4eoo7BfOrsGg-mdd9ImsjoA/edit",
    docTecnica:      "https://docs.google.com/document/d/1P2qpZHBODlM-KaxZol0Hico9UOyxe8Hr/edit",
    dicionarioDados:   "https://docs.google.com/document/d/1iYHE5sDEq9dCPjSJbma4rseirZ-zk8SG/edit",
    manualUsuarioF4:   "https://docs.google.com/document/d/1tJq6Xwg05XBg-yulxMC8eOgNv4OyAzGD/edit",
    docTecnicaF4:      "https://docs.google.com/document/d/16OYqOrfFC2So1whoTD6AELBhR9ju9Zkn/edit",
    dicionarioDadosF4: "https://docs.google.com/document/d/1LSZW96j8ZXELxrseKppSk3dlucQ--IIs/edit",
    documentoMaster:   "https://docs.google.com/document/d/1d2xNhkfSgHvmxML_t8gmeux6y7vGy2SV/edit",
    promptSistema:     "https://docs.google.com/document/d/1F2ZewXbUhRtO1W7PrbfZZDYN350iUrvF/edit",
    acessoF3:          "https://script.google.com/macros/s/AKfycby9YQftWg586o1m1gPEaMyHMMYzyYUJ8MRWY0WRSv67kGAkeEX4TVPXeLbB4_I6Wv7neA/exec",
    acessoF4:          "https://script.google.com/macros/s/AKfycbxiWW0zVuFdRJCvzwCBeH8OIqsFJyKkhqZotgHX8vrD0UARbU3SUtJ7IxZsg2BXc_QrPw/exec",
    f5:                "https://docs.google.com/spreadsheets/d/1Y7_1NL7Uo9HgHn7bTIqnnVZhJCogCbXI3tgasxOTN_0/edit",
    acessoF5:          "https://script.google.com/macros/s/AKfycbwKsOut5TyYLf1pW_xm1He-zBvzZGYFM4KAEE5C6hssNZHsg9fL_QBXWjfF-zzIDxfXNQ/exec",
    manualUsuarioF5:   "https://docs.google.com/document/d/1GsiZq6Ent30uVgkVKWgIbAR4CGCW_D1w/edit",
    docTecnicaF5:      "https://docs.google.com/document/d/1yprfRJKP7B0o6sv8xbD1_Fxrz2WDJrYd/edit",
    dicionarioDadosF5: "https://docs.google.com/document/d/1AzTblq8J6Kzzev8qO7GzWjZQZvZ7jtdH/edit",
    superApp:              "https://docs.google.com/spreadsheets/d/1BGPVx-4hdGh5g-K3mDsUXZhfXXF2uSSwAO4yThnmTQ0/edit",
    acessoSuperApp:        "https://script.google.com/macros/s/AKfycbyVRcaI7RHdRIasOIi5V6WKdU3QztcDYiIT4dJZpr1ptzYDfnoL_rlfSykkjxz4UnA-Sw/exec",
    manualUsuarioSuperApp: "https://docs.google.com/document/d/1S0ax-tjhFTsp8ymi4ME6kXssDyRds4DN/edit",
    docTecnicaSuperApp:    "https://docs.google.com/document/d/1EoFDMAHkT9M81408iQq5Bz-XQ8KdEVUS/edit",
    dicionarioDadosSuperApp:"https://docs.google.com/document/d/1EuYS2U_Iq81oXnlHSSgM6lBkbQ_x7QyS/edit",
  },
  // Ordem: cargo (Admin → Dev → Gerente → Operador), depois nome alfabético
  equipe: [
    { nome: "Aline Calderan",  email: "aline.calderan@stormx.com.br",  perfil: "Admin"    },
    { nome: "Carolina Dobner", email: "carolina.dobner@stormx.com.br", perfil: "Admin"    },
    { nome: "Felipe Lima",     email: "felipe.lima@stormx.com.br",     perfil: "Dev"      },
    { nome: "Tiago Santos",    email: "tiago.santos@stormx.com.br",    perfil: "Gerente"  },
    { nome: "João Braga",      email: "joao.braga@stormx.com.br",      perfil: "Operador" },
    { nome: "Marcos Santos",   email: "marcos.santos@stormx.com.br",   perfil: "Operador" },
  ],
  cores: {
    header:     "#1F36C7",
    headerFont: "#FFFFFF",
    secao:      "#E8EAED",
    link:       "#1155CC",
  }
};

// ============================================================
// PRINCIPAL
// ============================================================
function montarCapa() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.setName(CAPA_CONFIG.titulo);
  _montarAbaSistemas(ss);
  _montarAbaEquipe(ss);
  _montarAbaDocumentacao(ss);
  ["Plan1","Sheet1","Página1"].forEach(function(n) {
    var p = ss.getSheetByName(n);
    if (p && ss.getSheets().length > 1) try { ss.deleteSheet(p); } catch(e) {}
  });
  var pend = ss.getSheetByName("🔧 Pendências");
  if (pend && ss.getSheets().length > 1) try { ss.deleteSheet(pend); } catch(e) {}
  Logger.log("✅ Capa montada!");
}

// ============================================================
// ABA SISTEMAS
// ============================================================
function _montarAbaSistemas(ss) {
  var s = _aba(ss, "🗺️ Sistemas", 0, "#FF9900");
  var cab = ["Fase", "Nome", "Tipo", "Status", "Descrição", "Acesso"];
  _cabecalho(s, cab);

  var sistemas = [
    ["F1", "IDs AdServer",      CAPA_CONFIG.links.f1, "GAS planilha",       "✅ Completo",  "Registro e controle de IDs únicos por campanha/plataforma", ""],
    ["F2", "NC Tool Generator", CAPA_CONFIG.links.f2, "GAS + HTML sidebar", "✅ Completo",  "Geração automática de ad names seguindo a Naming Convention", ""],
    ["F3", "Validator",         CAPA_CONFIG.links.f3, "GAS + HTML webapp",  "✅ Completo",  "Validação de ad names contra o dicionário NC", CAPA_CONFIG.links.acessoF3],
    ["F4", "Acessórios",        CAPA_CONFIG.links.f4, "GAS + HTML webapp",  "✅ Completo",  "11 módulos: Ad Name Sync, Campaign Local, Comparador, Contador, Extrator Dicionário, Extrator de Fórmulas, Extrator de Influencer, Gerador de IDs, Influencer Name Tool, Mapeador RM→ADP, Merge RM→ADP", CAPA_CONFIG.links.acessoF4],
    ["F5", "FT Flashtalking Validator", CAPA_CONFIG.links.f5, "GAS + HTML webapp", "✅ Completo",  "Validação de ad names Flashtalking contra o dicionário NC", CAPA_CONFIG.links.acessoF5],
    ["—",  "Super App",                "https://docs.google.com/spreadsheets/d/1kqYJ6AGbTZOsv-uwN4Hr9lI0gJSL71C4F49mMLv04hQ/edit", "GAS + HTML webapp", "✅ Completo", "Hub central — acesso unificado ao F3, F4 e F5 em uma única tela", CAPA_CONFIG.links.acessoSuperApp],
  ];

  var totalSisRows = sistemas.length + 20;
  if (s.getMaxRows() < totalSisRows) s.insertRowsAfter(s.getMaxRows(), totalSisRows - s.getMaxRows());

  sistemas.forEach(function(l, i) {
    var row = i + 2;
    s.getRange(row, 1).setValue(l[0]);
    _link(s.getRange(row, 2), l[1], l[2]);
    s.getRange(row, 3).setValue(l[3]);
    s.getRange(row, 4).setValue(l[4]);
    s.getRange(row, 5).setValue(l[5]);
    _link(s.getRange(row, 6), l[6] ? "🔗 Acessar" : "", l[6]);
    s.setRowHeight(row, 52);
    var zebra = (i % 2 === 0) ? "#F8F9FF" : "#FFFFFF";
    s.getRange(row, 1, 1, cab.length).setBackground(zebra);
  });

  var sep = sistemas.length + 2;
  s.getRange(sep, 1, 1, cab.length).merge().setValue("📚 Recursos")
    .setBackground(CAPA_CONFIG.cores.secao).setFontWeight("bold")
    .setHorizontalAlignment("center").setVerticalAlignment("middle");
  s.setRowHeight(sep, 40);

  var recursos = [
    { nome: "[UL] Dicionário | Grasp 2026",   url: "https://docs.google.com/spreadsheets/d/17vc4UfMz-o2Oz0unAnJlErhHd_2n34tvlFxFnPgTIok/edit?gid=1909520238",  tipo: "Google Sheets", obs: "Fonte de verdade — valores válidos (910 linhas)" },
    { nome: "[UL] Dicionário_InfluencerName", url: "https://docs.google.com/spreadsheets/d/1HlWrUbQGstYtb6NZUHpDNmVYmXJFUOyJ/edit?gid=359468873",             tipo: "Excel Online",  obs: "Read-only — não pode ser alterado ou substituído" },
    { nome: "[UL] Inclusão Campaign Local",   url: "https://docs.google.com/spreadsheets/d/1dZ-TiUcFgjdc45Fpc9frztG1Bqsi9e0F0aAHQzXoHjw/edit?gid=1967119477", tipo: "Google Sheets", obs: "Valores de CampaignLocal para o dicionário" },
    { nome: "IDs da Unilever",               url: "https://docs.google.com/spreadsheets/d/17reFaVIatWRvNa-KpnLPsFUEV8WnxrNC2fsEHO5lU6s/edit?gid=0",          tipo: "Google Sheets", obs: "IDs Unilever — referência geral" },
    { nome: "IDs da Unilever sem Ad Server", url: "https://docs.google.com/spreadsheets/d/1qHDQx4rBJrb1bNrOIr_b_R_4qMND72ZsnyPWUSLoLkc/edit?gid=0",          tipo: "Google Sheets", obs: "IDs Unilever — sem Ad Server" },
  ];

  recursos.forEach(function(r, i) {
    var row = sep + 1 + i;
    s.getRange(row, 1).setValue("—");
    _link(s.getRange(row, 2), r.nome, r.url);
    s.getRange(row, 3).setValue(r.tipo);
    s.getRange(row, 4).setValue("✅ Ativo");
    s.getRange(row, 5).setValue(r.obs);
    s.setRowHeight(row, 48);
    var zebra = (i % 2 === 0) ? "#F8F9FF" : "#FFFFFF";
    s.getRange(row, 1, 1, cab.length).setBackground(zebra);
  });

  s.setColumnWidth(1, 70);
  s.setColumnWidth(2, 340);
  s.setColumnWidth(3, 220);
  s.setColumnWidth(4, 160);
  s.setColumnWidth(5, 820);
  s.setColumnWidth(6, 120);

  var lr = s.getLastRow();
  if (lr > 1) {
    s.getRange(2, 1, lr - 1, cab.length).setVerticalAlignment("middle");
    s.getRange(2, 1, lr - 1, 1).setHorizontalAlignment("center"); // Fase
    s.getRange(2, 3, lr - 1, 1).setHorizontalAlignment("center"); // Tipo
    s.getRange(2, 4, lr - 1, 1).setHorizontalAlignment("center"); // Status
    s.getRange(2, 6, lr - 1, 1).setHorizontalAlignment("center");
    s.getRange(2, 5, lr - 1, 1).setWrap(true);
  }
  _limpar(s, cab.length);
}

// ============================================================
// ABA EQUIPE
// ============================================================
function _montarAbaEquipe(ss) {
  var s = _aba(ss, "👥 Equipe", 1, "#0A66C2");
  var cab = ["Nome", "E-mail", "Perfil", "F1", "F2", "F3", "F4", "F5"];
  _cabecalho(s, cab);

  var totalEqRows = CAPA_CONFIG.equipe.length + 1;
  if (s.getMaxRows() < totalEqRows) s.insertRowsAfter(s.getMaxRows(), totalEqRows - s.getMaxRows());

  CAPA_CONFIG.equipe.forEach(function(m, i) {
    var row = i + 2;
    var acesso = (m.perfil === "Admin" || m.perfil === "Dev") ? "Admin" : m.perfil;
    s.getRange(row, 1).setValue(m.nome);
    s.getRange(row, 2).setValue(m.email);
    s.getRange(row, 3).setValue(m.perfil);
    s.getRange(row, 4).setValue(acesso);
    s.getRange(row, 5).setValue(acesso);
    s.getRange(row, 6).setValue(acesso);
    s.getRange(row, 7).setValue(acesso);
    s.getRange(row, 8).setValue(acesso);
    s.setRowHeight(row, 52);
    var zebra = (i % 2 === 0) ? "#F8F9FF" : "#FFFFFF";
    s.getRange(row, 1, 1, cab.length).setBackground(zebra);
  });

  s.setColumnWidth(1, 220);
  s.setColumnWidth(2, 300);
  s.setColumnWidth(3, 120);
  [4,5,6,7,8].forEach(function(c) { s.setColumnWidth(c, 150); });

  var lr = s.getLastRow();
  if (lr > 1) {
    s.getRange(2, 1, lr - 1, cab.length).setVerticalAlignment("middle");
    s.getRange(2, 1, lr - 1, cab.length).setHorizontalAlignment("center");
  }
  _limpar(s, cab.length);
}

// ============================================================
// ABA DOCUMENTACAO
// ============================================================
function _montarAbaDocumentacao(ss) {
  var s = _aba(ss, "📄 Documentação", 2, "#34A853");
  var cab = ["Documento", "Fase", "Status", "Observações"];
  _cabecalho(s, cab);

  // Separadores coloridos por grupo
  var corGeral   = { bg: "#1a237e", fg: "#FFFFFF" };
  var corF13     = { bg: "#283593", fg: "#FFFFFF" };
  var corF4      = { bg: "#1b5e20", fg: "#FFFFFF" };
  var corF5      = { bg: "#e65100", fg: "#FFFFFF" };
  var corSuper   = { bg: "#4a148c", fg: "#FFFFFF" };
  var corSistema = { bg: "#37474f", fg: "#FFFFFF" };

  // Estrutura: null = separador, objeto = doc
  var linhas = [
    { sep: true, label: "📋 Geral", cor: corGeral },
    { nome:"Documento Master",           url:CAPA_CONFIG.links.documentoMaster,    fase:"F1–F5",     status:"✅ Publicado", obs:"Índice consolidado de todas as fases e documentos" },
    { sep: true, label: "F1–F3", cor: corF13 },
    { nome:"Dicionário de Dados",        url:CAPA_CONFIG.links.dicionarioDados,    fase:"F1–F3",     status:"✅ Publicado", obs:"Campos, valores, tipos e regras por fase" },
    { nome:"Documentação Técnica",       url:CAPA_CONFIG.links.docTecnica,         fase:"F1–F3",     status:"✅ Publicado", obs:"Referência para desenvolvimento e manutenção" },
    { nome:"Manual do Usuário",          url:CAPA_CONFIG.links.manualUsuario,      fase:"F1–F3",     status:"✅ Publicado", obs:"Manual de uso para operadores e gerentes" },
    { sep: true, label: "F4 — Acessórios", cor: corF4 },
    { nome:"Dicionário de Dados F4",     url:CAPA_CONFIG.links.dicionarioDadosF4,  fase:"F4",        status:"✅ Publicado", obs:"Campos, valores e regras do F4" },
    { nome:"Documentação Técnica F4",    url:CAPA_CONFIG.links.docTecnicaF4,       fase:"F4",        status:"✅ Publicado", obs:"Arquitetura, IDs, módulos e backup do F4" },
    { nome:"Manual do Usuário F4",       url:CAPA_CONFIG.links.manualUsuarioF4,    fase:"F4",        status:"✅ Publicado", obs:"Manual de uso — 11 módulos do F4 Acessórios" },
    { sep: true, label: "F5 — FT Flashtalking Validator", cor: corF5 },
    { nome:"Dicionário de Dados F5",     url:CAPA_CONFIG.links.dicionarioDadosF5,  fase:"F5",        status:"✅ Publicado", obs:"Campos, valores e regras do F5" },
    { nome:"Documentação Técnica F5",    url:CAPA_CONFIG.links.docTecnicaF5,       fase:"F5",        status:"✅ Publicado", obs:"Arquitetura, IDs e backup do F5" },
    { nome:"Manual do Usuário F5",       url:CAPA_CONFIG.links.manualUsuarioF5,    fase:"F5",        status:"✅ Publicado", obs:"Manual de uso — FT Flashtalking Validator" },
    { sep: true, label: "Super App", cor: corSuper },
    { nome:"Dicionário de Dados Super App",   url:CAPA_CONFIG.links.dicionarioDadosSuperApp, fase:"Super App", status:"✅ Publicado", obs:"Campos, funções JS, cores e variáveis CSS" },
    { nome:"Documentação Técnica Super App",  url:CAPA_CONFIG.links.docTecnicaSuperApp,      fase:"Super App", status:"✅ Publicado", obs:"Arquitetura, URLs e isolamento Corp/Pessoal" },
    { nome:"Manual do Usuário Super App",     url:CAPA_CONFIG.links.manualUsuarioSuperApp,   fase:"Super App", status:"✅ Publicado", obs:"Manual de uso — hub de navegação F3, F4 e F5" },
    { sep: true, label: "🤖 Sistema", cor: corSistema },
    { nome:"Prompt de Sistema",          url:CAPA_CONFIG.links.promptSistema,      fase:"F1–F5",     status:"✅ Gerado",    obs:"Cole no início de novos chats no Claude" },
  ];

  var totalRows = linhas.length + 1;
  if (s.getMaxRows() < totalRows) s.insertRowsAfter(s.getMaxRows(), totalRows - s.getMaxRows());

  linhas.forEach(function(l, i) {
    var row = i + 2;
    if (l.sep) {
      var r = s.getRange(row, 1, 1, cab.length);
      r.merge().setValue(l.label)
        .setBackground(l.cor.bg).setFontColor(l.cor.fg)
        .setFontWeight("bold").setHorizontalAlignment("center")
        .setVerticalAlignment("middle");
      s.setRowHeight(row, 28);
    } else {
      _link(s.getRange(row, 1), l.nome, l.url);
      s.getRange(row, 2).setValue(l.fase);
      s.getRange(row, 3).setValue(l.status);
      s.getRange(row, 4).setValue(l.obs);
      s.getRange(row, 1, 1, cab.length).setVerticalAlignment("middle");
      s.getRange(row, 2).setHorizontalAlignment("center");
      s.getRange(row, 3).setHorizontalAlignment("center");
      s.getRange(row, 4).setWrap(true);
      s.setRowHeight(row, 52);
    }
  });

  s.setColumnWidth(1, 280);
  s.setColumnWidth(2, 120);
  s.setColumnWidth(3, 130);
  s.setColumnWidth(4, 830);
  _limpar(s, cab.length);
}

// ============================================================
// HELPERS
// ============================================================

function _aba(ss, nome, pos, cor) {
  var s = ss.getSheetByName(nome);
  if (!s) { s = ss.insertSheet(nome, pos); }
  s.clear();
  if (cor) { s.setTabColor(cor); }
  s.setHiddenGridlines(true);
  return s;
}

function _cabecalho(s, cab) {
  var r = s.getRange(1, 1, 1, cab.length);
  r.setValues([cab]);
  r.setBackground(CAPA_CONFIG.cores.header);
  r.setFontColor(CAPA_CONFIG.cores.headerFont);
  r.setFontWeight("bold");
  r.setFontSize(11);
  r.setHorizontalAlignment("center");
  r.setVerticalAlignment("middle");
  s.setRowHeight(1, 44);
  s.setFrozenRows(1);
  s.setFrozenColumns(0);
}

function _link(cell, texto, url) {
  if (url) {
    var rich = SpreadsheetApp.newRichTextValue()
      .setText(texto)
      .setLinkUrl(url)
      .setTextStyle(SpreadsheetApp.newTextStyle()
        .setForegroundColor(CAPA_CONFIG.cores.link)
        .setUnderline(true).build())
      .build();
    cell.setRichTextValue(rich);
  } else {
    cell.setValue(texto);
  }
}

function _limpar(s, manter) {
  SpreadsheetApp.flush();
  var maxC = s.getMaxColumns();
  if (maxC > manter) s.deleteColumns(manter + 1, maxC - manter);
  var lastRow = s.getLastRow();
  var maxR = s.getMaxRows();
  if (maxR > lastRow) s.deleteRows(lastRow + 1, maxR - lastRow);
}