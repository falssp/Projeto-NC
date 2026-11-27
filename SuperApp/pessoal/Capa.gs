// ============================================================
// NC Tool | Unilever BR x Grasp — Planilha de Capa [Pessoal]
// Cole em uma planilha Google nova e rode: montarCapa()
// ============================================================

var CAPA_CONFIG = {
  titulo: "NC Tool | Unilever BR x Grasp [Capa]",
  links: {
    f1:                "https://docs.google.com/spreadsheets/d/1vGM_se-b1rechwv91WnSw-SW2XQFJ4DN4FPWqrEMkq8/edit",
    f2:                "https://docs.google.com/spreadsheets/d/1fOPF6JLH29rY15Obb-QC88jVGuR1t0c4wuB4SyDmqyc/edit",
    f3:                "https://docs.google.com/spreadsheets/d/1Dthsg7TWuYfQi-QU1yCkRJEhFdXKQ3I1wNO5Y90CCEQ/edit",
    f4:                "https://docs.google.com/spreadsheets/d/16OdPmc-SeqXn1VefT0xRsIQJ-LdICRfUZnahsARuw4w/edit",
    f5:                "https://docs.google.com/spreadsheets/d/1YZ3tFDlt3yP5xtNVpSMhyS-cxG3QHBlN5nr_z-yJi2s/edit",
    acessoF3:          "https://script.google.com/macros/s/AKfycbw7QryYGzik1bbT0Mf4N5JcpuuNVoHAudTAbrT2jfzzXnz0wkuJfBFLIeMNViDO4SE2/exec",
    acessoF4:          "https://script.google.com/macros/s/AKfycby6h6qvXqacFrf2TmcXYaflRQp7rvhklpnR27VWhIueh9pLxWvUCRYkFToJPxYezUN7cw/exec",
    acessoF5:          "https://script.google.com/macros/s/AKfycbym0772425DQEUrNQn9TZc6C-wdRuqU1_erQVSoWzV-MEBbyCN4DOfJkaSd90cdVZHjSA/exec",
    acessoSuperApp:    "https://script.google.com/macros/s/AKfycbyVRcaI7RHdRIasOIi5V6WKdU3QztcDYiIT4dJZpr1ptzYDfnoL_rlfSykkjxz4UnA-Sw/exec",
    dicionario:        "https://docs.google.com/spreadsheets/d/1EpIBzL99_Dh03MySNE-hHiToeN4HiN5yeHSf6XLEEBw/edit",
    dicInfluencer:     "https://docs.google.com/spreadsheets/d/1PEBpspeDx8gFUYVoVYkdJgj3E5KU2GTvf7VqBBuG9hQ/edit",
    campaignLocal:     "https://docs.google.com/spreadsheets/d/1SfrPlVwEhRw2IAtAOCVv_Itx-znz4XB3I25FoUbFdcc/edit",
    idsUnilever:       "https://docs.google.com/spreadsheets/d/1kcW8wlRXFua9RV24BI7c7FqbsMN-90ywxq7VCmQoQXI/edit",
    idsSemAdServer:    "https://docs.google.com/spreadsheets/d/1WZf3wiiZYoMqr7XH5UlUpzHggIwUTQE0JlTlhLr-46o/edit",
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
  Logger.log("✅ Capa [Pessoal] montada!");
}

// ============================================================
// ABA SISTEMAS
// ============================================================
function _montarAbaSistemas(ss) {
  var s = _aba(ss, "🗺️ Sistemas", 0, "#FF9900");
  var cab = ["Fase", "Nome", "Tipo", "Status", "Descrição", "Acesso"];
  _cabecalho(s, cab);

  var sistemas = [
    ["F1",  "IDs AdServer",              CAPA_CONFIG.links.f1, "GAS planilha",       "✅ Completo", "Registro e controle de IDs únicos por campanha/plataforma", ""],
    ["F2",  "NC Tool Generator",         CAPA_CONFIG.links.f2, "GAS + HTML sidebar", "✅ Completo", "Geração automática de ad names seguindo a Naming Convention", ""],
    ["F3",  "Validator",                 CAPA_CONFIG.links.f3, "GAS + HTML webapp",  "✅ Completo", "Validação de ad names contra o dicionário NC", CAPA_CONFIG.links.acessoF3],
    ["F4",  "Acessórios",                CAPA_CONFIG.links.f4, "GAS + HTML webapp",  "✅ Completo", "11 módulos: Ad Name Sync, Campaign Local, Comparador, Contador, Extrator Dicionário, Extrator de Fórmulas, Extrator de Influencer, Gerador de IDs, Influencer Name Tool, Mapeador RM→ADP, Merge RM→ADP", CAPA_CONFIG.links.acessoF4],
    ["F5",  "FT Flashtalking Validator", CAPA_CONFIG.links.f5, "GAS + HTML webapp",  "✅ Completo", "Validação de ad names Flashtalking contra o dicionário NC", CAPA_CONFIG.links.acessoF5],
    ["—",   "Super App",                 "https://docs.google.com/spreadsheets/d/1BGPVx-4hdGh5g-K3mDsUXZhfXXF2uSSwAO4yThnmTQ0/edit", "GAS + HTML webapp", "✅ Completo", "Hub central — acesso unificado ao F3, F4 e F5 em uma única tela", CAPA_CONFIG.links.acessoSuperApp],
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
    { nome: "[UL] Dicionário | Grasp 2026 — Backup", url: CAPA_CONFIG.links.dicionario,     tipo: "Google Sheets", obs: "Cópia do dicionário principal — fonte de verdade do sistema pessoal" },
    { nome: "[UL] Dicionário_InfluencerName",         url: CAPA_CONFIG.links.dicInfluencer,  tipo: "Google Sheets", obs: "Read-only — não pode ser alterado ou substituído" },
    { nome: "[UL] Inclusão Campaign Local",           url: CAPA_CONFIG.links.campaignLocal,  tipo: "Google Sheets", obs: "Valores de CampaignLocal para o dicionário" },
    { nome: "IDs da Unilever",                       url: CAPA_CONFIG.links.idsUnilever,    tipo: "Google Sheets", obs: "IDs Unilever — referência geral" },
    { nome: "IDs da Unilever sem Ad Server",         url: CAPA_CONFIG.links.idsSemAdServer, tipo: "Google Sheets", obs: "IDs Unilever — sem Ad Server" },
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
    s.getRange(2, 1, lr - 1, 1).setHorizontalAlignment("center");
    s.getRange(2, 3, lr - 1, 1).setHorizontalAlignment("center");
    s.getRange(2, 4, lr - 1, 1).setHorizontalAlignment("center");
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

  var corGeral   = { bg: "#1a237e", fg: "#FFFFFF" };
  var corF13     = { bg: "#283593", fg: "#FFFFFF" };
  var corF4      = { bg: "#1b5e20", fg: "#FFFFFF" };
  var corF5      = { bg: "#e65100", fg: "#FFFFFF" };
  var corSuper   = { bg: "#4a148c", fg: "#FFFFFF" };
  var corSistema = { bg: "#37474f", fg: "#FFFFFF" };

  var linhas = [
    { sep: true, label: "📋 Geral", cor: corGeral },
    { nome:"Documento Master",                url:"https://docs.google.com/document/d/1VpaGBENrx5gy-rRqF7hT233649zZg9mO/edit",  fase:"F1–F5",     status:"✅ Publicado", obs:"Índice consolidado de todas as fases e documentos" },
    { sep: true, label: "F1–F3", cor: corF13 },
    { nome:"Dicionário de Dados",             url:"https://docs.google.com/document/d/1DP_jtSivwxPjaakijScuw-ZJurSIuw9C/edit",  fase:"F1–F3",     status:"✅ Publicado", obs:"Campos, valores, tipos e regras por fase" },
    { nome:"Documentação Técnica",            url:"https://docs.google.com/document/d/1nqEOxRLLPXXNkSywAhxFJGSat0MnUZM8/edit",  fase:"F1–F3",     status:"✅ Publicado", obs:"Referência para desenvolvimento e manutenção" },
    { nome:"Manual do Usuário",               url:"https://docs.google.com/document/d/1-WKAvfULW5i6MaOoaaAGTp0k8QIKYkbo/edit",  fase:"F1–F3",     status:"✅ Publicado", obs:"Manual de uso para operadores e gerentes" },
    { sep: true, label: "F4 — Acessórios", cor: corF4 },
    { nome:"Dicionário de Dados F4",          url:"https://docs.google.com/document/d/1X6c_A85YNPqJ4zzZpdPJyY1FN-NHXJZ4/edit",  fase:"F4",        status:"✅ Publicado", obs:"Campos, valores e regras do F4" },
    { nome:"Documentação Técnica F4",         url:"https://docs.google.com/document/d/1AgpTaDHkgkq7TxhsQdIFxGK4581FFWUT/edit",  fase:"F4",        status:"✅ Publicado", obs:"Arquitetura, IDs, módulos e backup do F4" },
    { nome:"Manual do Usuário F4",            url:"https://docs.google.com/document/d/1Dw05izJXihJ3xsV6iWmG7KE1mlJ24fx0/edit",  fase:"F4",        status:"✅ Publicado", obs:"Manual de uso — 11 módulos do F4 Acessórios" },
    { sep: true, label: "F5 — FT Flashtalking Validator", cor: corF5 },
    { nome:"Dicionário de Dados F5",          url:"https://docs.google.com/document/d/1iQSYM-bG4XWLQRkAR6a8aZHS1Yd0oSw_/edit",  fase:"F5",        status:"✅ Publicado", obs:"Campos, valores e regras do F5" },
    { nome:"Documentação Técnica F5",         url:"https://docs.google.com/document/d/1nA1RP9lAxJynkk2ZXSgt6IL4m4-B9Eub/edit",  fase:"F5",        status:"✅ Publicado", obs:"Arquitetura, IDs e backup do F5" },
    { nome:"Manual do Usuário F5",            url:"https://docs.google.com/document/d/19vZMoe8eJHnkwND0X5JPcsozHR8ZNYv9/edit",  fase:"F5",        status:"✅ Publicado", obs:"Manual de uso — FT Flashtalking Validator" },
    { sep: true, label: "Super App", cor: corSuper },
    { nome:"Dicionário de Dados Super App",   url:"https://docs.google.com/document/d/1EuYS2U_Iq81oXnlHSSgM6lBkbQ_x7QyS/edit",  fase:"Super App", status:"✅ Publicado", obs:"Campos, funções JS, cores e variáveis CSS" },
    { nome:"Documentação Técnica Super App",  url:"https://docs.google.com/document/d/1EoFDMAHkT9M81408iQq5Bz-XQ8KdEVUS/edit",  fase:"Super App", status:"✅ Publicado", obs:"Arquitetura, URLs e isolamento Corp/Pessoal" },
    { nome:"Manual do Usuário Super App",     url:"https://docs.google.com/document/d/1S0ax-tjhFTsp8ymi4ME6kXssDyRds4DN/edit",  fase:"Super App", status:"✅ Publicado", obs:"Manual de uso — hub de navegação F3, F4 e F5" },
    { sep: true, label: "🤖 Sistema", cor: corSistema },
    { nome:"Prompt de Sistema",               url:"https://docs.google.com/document/d/1NGel2oOCdTDDFF2JsQBWcNuXOtpAQIZ8/edit",  fase:"F1–F5",     status:"✅ Gerado",    obs:"Cole no início de novos chats no Claude" },
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