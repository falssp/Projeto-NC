// ============================================================
// Excecoes.gs — Gestão de Exceções do F3 Validator
// ============================================================

var LOG_SHEET_ID = '1Dthsg7TWuYfQi-QU1yCkRJEhFdXKQ3I1wNO5Y90CCEQ';
var NC_SHEET_ID  = '1VBaExPGHOVYxpTyzJymrb8RuWWe34_9WBE0aC3slETU';

var EXC_COLS = {
  txKey:         1,  // A
  adName:        2,  // B
  plataforma:    3,  // C
  estrutura:     4,  // D
  motivo:        5,  // E
  dataEmail:     6,  // F
  assuntoEmail:  7,  // G
  remetente:     8,  // H
  solicitadoPor: 9,  // I
  dataSolic:     10, // J
  aprovadoPor:   11, // K
  dataAprov:     12, // L
  status:        13  // M
};

var EXC_MOTIVOS = [
  'Acordo com gerência',
  'Estrutura criada incorretamente — não será utilizada',
  'Exceção de cliente aprovada',
  'Limitação técnica da plataforma',
  'Nomenclatura legada (manter)',
  'Padrão de time externo (Search/AdServer)'
];

var EXC_EMAIL_DESTINO = 'felipe.lima@stormx.com.br';

// ── Obter usuário ativo ──────────────────────────────────────
function _getUsuarioAtivo() {
  try {
    var email = Session.getActiveUser().getEmail();
    if (!email) return null;

    var ss  = SpreadsheetApp.openById(NC_SHEET_ID);
    var aba = ss.getSheetByName('Usuarios');
    if (!aba) return { email: email, perfil: 'Operador', nome: email };

    var data = aba.getDataRange().getValues();
    for (var i = 1; i < data.length; i++) {
      var rowEmail = String(data[i][3] || '').trim().toLowerCase();
      if (rowEmail === email.toLowerCase()) {
        var perfil = String(data[i][4] || 'Operador');
        var perfilEfetivo = (perfil === 'Dev') ? 'Admin' : perfil;
        return {
          email:         email,
          nome:          String(data[i][1] || '') + ' ' + String(data[i][2] || ''),
          perfil:        perfil,
          perfilEfetivo: perfilEfetivo
        };
      }
    }
    return { email: email, perfil: 'Operador', nome: email };
  } catch(e) {
    Logger.log('_getUsuarioAtivo ERRO: ' + e.message);
    return null;
  }
}

// ── Criar / obter aba Exceções ───────────────────────────────
function _getExcecoesSheet() {
  var ss = SpreadsheetApp.openById(LOG_SHEET_ID);
  // Aceita nome legado "Excecoes" e renomeia automaticamente
  var sh = ss.getSheetByName('Exceções') || ss.getSheetByName('Excecoes');
  if (!sh) {
    sh = ss.insertSheet('Exceções');
    _setupExcecoesSheet(sh);
  } else if (sh.getName() === 'Excecoes') {
    sh.setName('Exceções');
  }
  return sh;
}

function _setupExcecoesSheet(sh) {
  var ul = '#1F36C7';
  var headers = [
    'TX Key','Ad Name','Plataforma','Estrutura','Motivo',
    'Data E-mail','Assunto E-mail','Remetente',
    'Solicitado Por','Data Solicitação',
    'Aprovado Por','Data Aprovação','Status'
  ];
  sh.getRange(1, 1, 1, headers.length)
    .setValues([headers])
    .setBackground(ul)
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setFontSize(10);

  var widths = [130,400,120,130,200,150,280,200,160,130,160,130,110];
  widths.forEach(function(w,i){ sh.setColumnWidth(i+1, w); });
  sh.setFrozenRows(1);
  sh.setRowHeight(1, 34);
  sh.getRange('A2:M').setVerticalAlignment('top').setWrap(true);
  sh.autoResizeColumns(1, 13);

  var maxCol = sh.getMaxColumns();
  if (maxCol > 13) sh.deleteColumns(14, maxCol - 13);
}

// ── Solicitar exceção ────────────────────────────────────────
function solicitarExcecao(dados) {
  try {
    var user = _getUsuarioAtivo();
    if (!user) return { ok:false, erro:'Usuário não autenticado' };

    var sh = _getExcecoesSheet();
    var txKey = '';

    if (dados.dataEmail || dados.assuntoEmail || dados.remetente) {
      var raw = (dados.adName||'') + '|' + (dados.plataforma||'') + '|' +
                (dados.assuntoEmail||'') + '|' + (dados.dataEmail||'');
      var h = 0;
      for (var i = 0; i < raw.length; i++) h = Math.imul(31,h) + raw.charCodeAt(i) | 0;
      txKey = 'EX-' + Math.abs(h).toString(16).toUpperCase().padStart(8,'0');
    }

    sh.appendRow([
      txKey,
      dados.adName     || '',
      dados.plataforma || '',
      dados.estrutura  || '',
      dados.motivo     || '',
      dados.dataEmail  || '',
      dados.assuntoEmail || '',
      dados.remetente  || '',
      user.email,
      new Date(),
      '', '',
      'Em Análise'
    ]);
    var newRow = sh.getLastRow();
    _aplicarEstiloLinha(sh, newRow, 'Em Análise');
    _enviarEmailExcecao(dados, user, txKey);

    return { ok:true, txKey:txKey, linha:newRow };
  } catch(e) {
    return { ok:false, erro:e.message };
  }
}

// ── Aprovar / Rejeitar ───────────────────────────────────────
function resolverExcecao(linha, decisao, observacao) {
  try {
    linha = parseInt(linha);
    if (!linha || linha < 2) return { ok:false, erro:'Linha inválida: ' + linha };

    var user = _getUsuarioAtivo();
    if (!user) return { ok:false, erro:'Usuário não autenticado' };
    var pef = user.perfilEfetivo || user.perfil;
    if (pef !== 'Admin' && pef !== 'Gerente')
      return { ok:false, erro:'Apenas Admin ou Gerente podem resolver exceções' };

    var sh = _getExcecoesSheet();
    var novoStatus = decisao === 'aprovar' ? 'Aprovado' : 'Rejeitado';

    var rowData = sh.getRange(linha, 1, 1, Object.keys(EXC_COLS).length).getValues()[0];
    var solicitante = String(rowData[EXC_COLS.solicitadoPor - 1] || '');
    var adName      = String(rowData[EXC_COLS.adName - 1] || '');

    var agora = new Date();
    sh.getRange(linha, EXC_COLS.aprovadoPor, 1, 3).setValues([[user.email, agora, novoStatus]]);
    _aplicarEstiloLinha(sh, linha, novoStatus);

    try { _enviarEmailResolucao(solicitante, novoStatus, adName, observacao); } catch(e2) {}

    return { ok:true, status:novoStatus };
  } catch(e) {
    return { ok:false, erro:e.message };
  }
}

// ── Desbloquear ──────────────────────────────────────────────
function desbloquearExcecao(adName, plataforma) {
  try {
    var user = _getUsuarioAtivo();
    if (!user) return { ok:false, erro:'Usuário não autenticado' };
    var pef = user.perfilEfetivo || user.perfil;
    if (pef !== 'Admin' && pef !== 'Gerente')
      return { ok:false, erro:'Apenas Admin ou Gerente podem desbloquear' };

    var sh   = _getExcecoesSheet();
    var data = sh.getDataRange().getValues();
    var linhasParaDeletar = [];
    for (var i = data.length - 1; i >= 1; i--) {
      if (String(data[i][EXC_COLS.adName-1]) === adName &&
          String(data[i][EXC_COLS.plataforma-1]) === plataforma) {
        linhasParaDeletar.push(i + 1);
      }
    }
    linhasParaDeletar.forEach(function(linha) {
      sh.deleteRow(linha);
    });

    return { ok:true, deletadas: linhasParaDeletar.length };
  } catch(e) {
    return { ok:false, erro:e.message };
  }
}

// ── Listar exceções ──────────────────────────────────────────
function getExcecoes() {
  try {
    var sh   = _getExcecoesSheet();
    var data = sh.getDataRange().getValues();
    if (data.length < 2) return [];

    var rows = data.slice(1).map(function(row, i) {
      return {
        linha:         i + 2,
        txKey:         row[EXC_COLS.txKey - 1],
        adName:        row[EXC_COLS.adName - 1],
        plataforma:    row[EXC_COLS.plataforma - 1],
        estrutura:     row[EXC_COLS.estrutura - 1],
        motivo:        row[EXC_COLS.motivo - 1],
        solicitadoPor: row[EXC_COLS.solicitadoPor - 1],
        aprovadoPor:   row[EXC_COLS.aprovadoPor - 1],
        dataAprov:     row[EXC_COLS.dataAprov - 1]
                         ? String(row[EXC_COLS.dataAprov - 1]).slice(0,10) : '',
        status:        row[EXC_COLS.status - 1]
      };
    }).filter(function(r){ return r.adName; });

    var rejeicoes = {};
    rows.forEach(function(r) {
      if (r.status === 'Rejeitado') {
        var k = r.adName + '||' + r.plataforma;
        rejeicoes[k] = (rejeicoes[k] || 0) + 1;
      }
    });
    rows.forEach(function(r) {
      var k = r.adName + '||' + r.plataforma;
      r.rejeicoes = rejeicoes[k] || 0;
    });

    return rows;
  } catch(e) { return []; }
}

// ── Perfil ───────────────────────────────────────────────────
function getPerfilUsuario() {
  try {
    var user = _getUsuarioAtivo();
    if (!user) return '';
    return user.perfilEfetivo || user.perfil || '';
  } catch(e) { return ''; }
}

function getUserAtivo() {
  try { return _getUsuarioAtivo(); } catch(e) { return null; }
}

// ── Estilo por status ────────────────────────────────────────
function _aplicarEstiloLinha(sh, linha, status) {
  var cores = {
    'Em Análise': { bg:'#FFF8E1', fc:'#B45309' },
    'Aprovado':   { bg:'#F0FFF4', fc:'#0D7A4E' },
    'Rejeitado':  { bg:'#FFF0F0', fc:'#C0392B' }
  };
  var cor = cores[status] || { bg:'#FFFFFF', fc:'#212529' };
  sh.getRange(linha, 1, 1, Object.keys(EXC_COLS).length).setBackground(cor.bg);
  sh.getRange(linha, EXC_COLS.status).setFontWeight('bold').setFontColor(cor.fc);
}

// ── E-mails ──────────────────────────────────────────────────
function _enviarEmailExcecao(dados, user, txKey) {
  try {
    var f3Url = 'https://script.google.com/a/macros/stormx.com.br/s/AKfycby9YQftWg586o1m1gPEaMyHMMYzyYUJ8MRWY0WRSv67kGAkeEX4TVPXeLbB4_I6Wv7neA/exec';
    var adNameHtml = '<div style="background:#F8F9FA;border:1px solid #DEE2E6;border-radius:6px;padding:10px 12px;font-family:Courier New,monospace;font-size:12px;color:#212529;word-break:break-all;margin-bottom:20px">' + (dados.adName||'—') + '</div>';
    var origem = '<div style="background:#FFFBEB;border:1px solid #FDE68A;border-radius:6px;padding:12px 14px;margin-bottom:20px">'
      + '<p style="margin:0 0 8px;font-size:10px;font-weight:700;letter-spacing:.06em;color:#B45309;text-transform:uppercase">Origem (E-mail do cliente)</p>'
      + '<table style="width:100%;border-collapse:collapse;font-size:12px">'
      + _linhaEmail('Data',     dados.dataEmail)
      + _linhaEmail('Assunto',  dados.assuntoEmail)
      + _linhaEmail('Remetente',dados.remetente)
      + '</table></div>';
    var cta = '<div style="text-align:center;margin-bottom:8px">'
      + '<a href="' + f3Url + '" style="display:inline-block;background:#1F36C7;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:13px;font-weight:600">Abrir F3 Validator para aprovar ou rejeitar &#8594;</a>'
      + '</div>';
    var corpo = '<div style="font-family:Arial,sans-serif;max-width:580px;margin:0 auto;border:1px solid #E9ECEF;border-radius:10px;overflow:hidden">'
      + '<div style="background:#1F36C7;padding:20px 28px">'
      + '<p style="margin:0;font-size:11px;font-weight:700;letter-spacing:.08em;color:#A5B4FC;text-transform:uppercase">F3 Validator &#xB7; NC Tool Unilever BR</p>'
      + '<h1 style="margin:6px 0 0;font-size:18px;color:#fff;font-weight:600">Nova Solicita&#231;&#227;o de Exce&#231;&#227;o</h1>'
      + '</div>'
      + '<div style="padding:24px 28px">'
      + '<p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:.06em;color:#868E96;text-transform:uppercase">Ad Name</p>'
      + adNameHtml
      + '<table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:20px">'
      + _linhaEmail('Plataforma',     dados.plataforma)
      + _linhaEmail('Estrutura',      dados.estrutura)
      + _linhaEmail('Motivo',         dados.motivo)
      + _linhaEmail('Solicitado por', user.email)
      + '</table>'
      + origem
      + '<p style="margin:0 0 20px;font-size:11px;color:#ADB5BD">TX Key: <span style="font-family:Courier New,monospace">' + txKey + '</span></p>'
      + cta
      + '</div>'
      + '<div style="background:#F0F4FF;border-top:1px solid #C5CEEE;padding:16px 28px">'
      + '<p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#1F36C7;text-transform:uppercase;letter-spacing:.06em">O que fazer agora</p>'
      + '<ol style="margin:0;padding-left:18px;font-size:12px;color:#495057;line-height:1.8">'
      + '<li>Acesse o <a href="' + f3Url + '" style="color:#1F36C7;font-weight:600">F3 Validator</a> (botão abaixo)</li>'
      + '<li>Revalide o ADP ' + (dados.adpArquivo ? '<strong>' + dados.adpArquivo + '</strong> ' : '') + '— a string aparecerá com badge <strong>EM ANÁLISE</strong></li>'
      + '<li>Clique em <strong>Aprovar</strong> ou <strong>Rejeitar</strong> na linha correspondente</li>'
      + '</ol>'
      + '<p style="margin:12px 0 0;font-size:11px;color:#868E96">Precisa da &#250;ltima vers&#227;o do ADP? Consulte o <a href="https://storm-x.atlassian.net/jira/software/c/projects/UL/boards/46" style="color:#1F36C7">Jira Unilever BR</a>.</p>'
      + '</div>'
      + '<div style="background:#F8F9FA;padding:12px 28px;border-top:1px solid #E9ECEF">'
      + '<p style="margin:0;font-size:11px;color:#ADB5BD">StormX &#xB7; NC Tool Unilever BR &#xB7; F3 Validator</p>'
      + '</div></div>';
    MailApp.sendEmail({
      to:       EXC_EMAIL_DESTINO,
      subject:  '[F3 Validator] Exceção | ' + (dados.plataforma||'') + ' — ' + (dados.adName||'').slice(0,50),
      htmlBody: corpo
    });
  } catch(e) { Logger.log('Erro e-mail excecao: ' + e.message); }
}

function _enviarEmailResolucao(destinatario, status, adName, observacao) {
  try {
    var f3Url = 'https://script.google.com/a/macros/stormx.com.br/s/AKfycby9YQftWg586o1m1gPEaMyHMMYzyYUJ8MRWY0WRSv67kGAkeEX4TVPXeLbB4_I6Wv7neA/exec';
    var isAprov = status === 'Aprovado';
    var cor = isAprov ? '#0D7A4E' : '#C0392B';
    var emoji = isAprov ? '&#x2705;' : '&#x274C;';
    var adNameHtml = '<div style="background:#F8F9FA;border:1px solid #DEE2E6;border-radius:6px;padding:10px 12px;font-family:Courier New,monospace;font-size:12px;color:#212529;word-break:break-all;margin-bottom:20px">' + (adName||'—') + '</div>';
    var obsHtml = observacao
      ? '<div style="background:#FFFBEB;border:1px solid #FDE68A;border-radius:6px;padding:12px 14px;margin-bottom:20px"><p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#B45309">Observação</p><p style="margin:0;font-size:13px;color:#212529">' + observacao + '</p></div>'
      : '';
    var cta = '<div style="text-align:center;margin-bottom:8px">'
      + '<a href="' + f3Url + '" style="display:inline-block;background:#1F36C7;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:13px;font-weight:600">Abrir F3 Validator &#8594;</a>'
      + '</div>';
    var corpo = '<div style="font-family:Arial,sans-serif;max-width:580px;margin:0 auto;border:1px solid #E9ECEF;border-radius:10px;overflow:hidden">'
      + '<div style="background:' + cor + ';padding:20px 28px">'
      + '<p style="margin:0;font-size:11px;font-weight:700;letter-spacing:.08em;color:rgba(255,255,255,.7);text-transform:uppercase">F3 Validator &#xB7; NC Tool Unilever BR</p>'
      + '<h1 style="margin:6px 0 0;font-size:18px;color:#fff;font-weight:600">' + emoji + ' Exce&#231;&#227;o ' + status + '</h1>'
      + '</div>'
      + '<div style="padding:24px 28px">'
      + '<p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:.06em;color:#868E96;text-transform:uppercase">Ad Name</p>'
      + adNameHtml
      + obsHtml
      + cta
      + '</div>'
      + '<div style="background:#F8F9FA;padding:12px 28px;border-top:1px solid #E9ECEF">'
      + '<p style="margin:0;font-size:11px;color:#ADB5BD">StormX &#xB7; NC Tool Unilever BR &#xB7; F3 Validator</p>'
      + '</div></div>';
    MailApp.sendEmail({
      to:       destinatario || EXC_EMAIL_DESTINO,
      cc:       EXC_EMAIL_DESTINO,
      subject:  '[F3 Validator] Exceção ' + status + ' | ' + (adName||'').slice(0,50),
      htmlBody: corpo
    });
  } catch(e) { Logger.log('Erro e-mail resolucao: ' + e.message); }
}

function _linhaEmail(label, valor) {
  return '<tr>' +
    '<td style="padding:4px 16px 4px 0;font-weight:bold;color:#495057;white-space:nowrap">' + label + ':</td>' +
    '<td style="padding:4px 0;color:#212529">' + (valor||'—') + '</td>' +
    '</tr>';
}

// ── Inicializar ──────────────────────────────────────────────
function inicializarExcecoes() {
  var sh = _getExcecoesSheet();
  sh.setRowHeight(1, 34);
  sh.autoResizeColumns(1, 13);
  var maxCol = sh.getMaxColumns();
  if (maxCol > 13) sh.deleteColumns(14, maxCol - 13);
  SpreadsheetApp.getActiveSpreadsheet()
    .toast('Aba Exceções atualizada.', 'F3 Validator', 3);
}
