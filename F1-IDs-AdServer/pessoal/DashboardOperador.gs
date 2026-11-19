/***************************************
 * 📊 DASHBOARD DE OPERADOR — F1
 * Sidebar HTML com filtro por período
 * Operador vê só os próprios dados
 * Admin e Dev veem todos
 ***************************************/

function abrirDashboardOperador() {
  const html = HtmlService.createTemplateFromString(_htmlDashboard())
    .evaluate()
    .setTitle('Dashboard Operador')
    .setWidth(420);
  SpreadsheetApp.getUi().showSidebar(html);
}

/***************************************
 * 📡 DADOS PARA O DASHBOARD (chamado pelo sidebar)
 ***************************************/

function getDadosDashboard(filtro) {
  const ss      = SpreadsheetApp.getActiveSpreadsheet();
  const geral   = ss.getSheetByName(CONFIG.abas.geral);
  const colG    = CONFIG.colunas.geral;
  const last    = geral.getLastRow();
  const email   = Session.getActiveUser().getEmail();
  const perfil  = _getPerfilUsuario(email);
  const isAdmin = (perfil === CONFIG.perfis.admin || perfil === CONFIG.perfis.dev);

  // Calcula intervalo de datas
  const { inicio, fim } = _calcularIntervalo(filtro);

  if (last < 2) return _dadosVazios(email, perfil, inicio, fim);

  const dados = geral.getRange(2, 1, last - 1, colG.origem).getValues();

  let totalGeral = 0, totalMeu = 0;
  const porPlataforma = {}, porDia = {}, porOperador = {};

  dados.forEach(row => {
    const data       = row[colG.data - 1];
    const idSX       = row[colG.idSX - 1];
    const idAMZ      = row[colG.idAMZ - 1];
    const plataforma = (row[colG.plataforma - 1] || '').toString().trim();
    const origem     = (row[colG.origem - 1] || '').toString().trim(); // email do operador

    if (!(data instanceof Date) || data.getFullYear() < 2020) return;
    if (data < inicio || data > fim) return;
    if (!idSX && !idAMZ) return;

    totalGeral++;

    // Conta por operador (admin vê todos)
    if (!porOperador[origem]) porOperador[origem] = 0;
    porOperador[origem]++;

    // Filtra por usuário se não for admin
    if (!isAdmin && origem !== email) return;

    totalMeu++;

    // Por plataforma
    if (!porPlataforma[plataforma]) porPlataforma[plataforma] = 0;
    porPlataforma[plataforma]++;

    // Por dia
    const diaKey = Utilities.formatDate(data, Session.getScriptTimeZone(), 'dd/MM');
    if (!porDia[diaKey]) porDia[diaKey] = 0;
    porDia[diaKey]++;
  });

  return {
    usuario:       email,
    perfil:        perfil,
    isAdmin:       isAdmin,
    totalGeral:    totalGeral,
    totalMeu:      totalMeu,
    porPlataforma: porPlataforma,
    porDia:        porDia,
    porOperador:   isAdmin ? porOperador : {},
    inicio:        Utilities.formatDate(inicio, Session.getScriptTimeZone(), 'dd/MM/yyyy'),
    fim:           Utilities.formatDate(fim,    Session.getScriptTimeZone(), 'dd/MM/yyyy')
  };
}

/***************************************
 * 🔍 PERFIL DO USUÁRIO
 ***************************************/

function _getPerfilUsuario(email) {
  const ss       = SpreadsheetApp.getActiveSpreadsheet();
  const usuarios = ss.getSheetByName(CONFIG.abas.usuarios);
  const col      = CONFIG.colunas.usuarios;
  const last     = usuarios.getLastRow();
  if (last < 2) return '';
  const dados = usuarios.getRange(2, 1, last - 1, col.perfil).getValues();
  for (const row of dados) {
    if ((row[col.email - 1] || '').toString().trim() === email) {
      return (row[col.perfil - 1] || '').toString().trim();
    }
  }
  return '';
}

/***************************************
 * 📅 CALCULAR INTERVALO
 ***************************************/

function _calcularIntervalo(filtro) {
  const agora = new Date();
  const hoje  = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate(), 23, 59, 59);

  switch (filtro) {
    case '7d':
      return { inicio: new Date(hoje.getTime() - 6 * 86400000), fim: hoje };
    case '15d':
      return { inicio: new Date(hoje.getTime() - 14 * 86400000), fim: hoje };
    case '30d':
      return { inicio: new Date(hoje.getTime() - 29 * 86400000), fim: hoje };
    case 'mes':
      return { inicio: new Date(agora.getFullYear(), agora.getMonth(), 1), fim: hoje };
    case 'trimestre':
      const trimInicio = new Date(agora.getFullYear(), Math.floor(agora.getMonth() / 3) * 3, 1);
      return { inicio: trimInicio, fim: hoje };
    case 'ano':
      return { inicio: new Date(agora.getFullYear(), 0, 1), fim: hoje };
    default:
      return { inicio: new Date(agora.getFullYear(), agora.getMonth(), 1), fim: hoje };
  }
}

function _dadosVazios(email, perfil, inicio, fim) {
  const tz = Session.getScriptTimeZone();
  return {
    usuario: email, perfil: perfil, isAdmin: false,
    totalGeral: 0, totalMeu: 0,
    porPlataforma: {}, porDia: {}, porOperador: {},
    inicio: Utilities.formatDate(inicio, tz, 'dd/MM/yyyy'),
    fim:    Utilities.formatDate(fim,    tz, 'dd/MM/yyyy')
  };
}

/***************************************
 * 🎨 HTML DO SIDEBAR
 ***************************************/

function _htmlDashboard() {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',Arial,sans-serif;background:#f0f2ff;font-size:13px;}
.header{background:#1F36C7;color:#fff;padding:14px 16px;}
.header h2{font-size:1rem;font-weight:700;}
.header p{font-size:.75rem;opacity:.8;margin-top:2px;}
.filtros{background:#fff;padding:12px 16px;border-bottom:1px solid #d6dbf2;display:flex;gap:6px;flex-wrap:wrap;}
.btn-filtro{padding:5px 10px;border:1px solid #d6dbf2;border-radius:6px;background:#fff;cursor:pointer;font-size:.75rem;font-weight:600;color:#9fa8da;transition:all .2s;}
.btn-filtro.ativo{background:#1F36C7;color:#fff;border-color:#1F36C7;}
.body{padding:12px 16px;}
.stat{background:#fff;border:1px solid #d6dbf2;border-radius:10px;padding:12px 14px;margin-bottom:10px;}
.stat-val{font-size:1.6rem;font-weight:800;color:#1F36C7;}
.stat-label{font-size:.72rem;color:#888;text-transform:uppercase;letter-spacing:.5px;margin-top:2px;}
.section{background:#fff;border:1px solid #d6dbf2;border-radius:10px;padding:12px 14px;margin-bottom:10px;}
.section h3{font-size:.78rem;font-weight:700;color:#1a237e;margin-bottom:10px;text-transform:uppercase;letter-spacing:.5px;}
.plat-row{display:flex;align-items:center;gap:8px;margin-bottom:7px;}
.plat-name{font-size:.75rem;color:#444;width:100px;flex-shrink:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.bar-wrap{flex:1;background:#f0f2ff;border-radius:3px;height:7px;}
.bar{height:100%;border-radius:3px;background:#1F36C7;transition:width .5s;}
.plat-num{font-size:.72rem;font-weight:700;color:#1a237e;width:24px;text-align:right;}
.op-row{display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid #f0f2ff;font-size:.78rem;}
.op-email{color:#444;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:200px;}
.op-num{font-weight:700;color:#1F36C7;}
.periodo{font-size:.72rem;color:#9fa8da;text-align:center;padding:6px 0;}
.loading{text-align:center;padding:24px;color:#9fa8da;}
.spinner{display:inline-block;width:20px;height:20px;border:2px solid #d6dbf2;border-top-color:#1F36C7;border-radius:50%;animation:spin .7s linear infinite;}
@keyframes spin{to{transform:rotate(360deg)}}
.stats-row{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px;}
</style>
</head>
<body>
<div class="header">
  <h2>📊 Dashboard Operador</h2>
  <p id="header-user">NC Tool — F1</p>
</div>
<div class="filtros">
  <button class="btn-filtro" onclick="carregar('7d')">7 dias</button>
  <button class="btn-filtro" onclick="carregar('15d')">15 dias</button>
  <button class="btn-filtro ativo" onclick="carregar('mes')">Este mês</button>
  <button class="btn-filtro" onclick="carregar('30d')">30 dias</button>
  <button class="btn-filtro" onclick="carregar('trimestre')">Trimestre</button>
  <button class="btn-filtro" onclick="carregar('ano')">Ano</button>
</div>
<div class="body" id="body">
  <div class="loading"><div class="spinner"></div></div>
</div>

<script>
var filtroAtivo = 'mes';

function carregar(f) {
  filtroAtivo = f;
  document.querySelectorAll('.btn-filtro').forEach(function(b) {
    b.classList.toggle('ativo', b.textContent.trim() === {
      '7d':'7 dias','15d':'15 dias','mes':'Este mês',
      '30d':'30 dias','trimestre':'Trimestre','ano':'Ano'
    }[f]);
  });
  document.getElementById('body').innerHTML = '<div class="loading"><div class="spinner"></div></div>';
  google.script.run.withSuccessHandler(renderizar).getDadosDashboard(f);
}

function renderizar(d) {
  document.getElementById('header-user').textContent = d.usuario + ' (' + d.perfil + ')';

  var html = '<div class="periodo">Período: ' + d.inicio + ' → ' + d.fim + '</div>';
  html += '<div class="stats-row">';
  html += '<div class="stat"><div class="stat-val">' + (d.isAdmin ? d.totalGeral : d.totalMeu) + '</div><div class="stat-label">' + (d.isAdmin ? 'Total geral' : 'Meus IDs') + '</div></div>';
  if (d.isAdmin) {
    html += '<div class="stat"><div class="stat-val">' + Object.keys(d.porOperador).length + '</div><div class="stat-label">Operadores ativos</div></div>';
  } else {
    html += '<div class="stat"><div class="stat-val">' + d.totalGeral + '</div><div class="stat-label">Total geral</div></div>';
  }
  html += '</div>';

  // Por plataforma
  var plats = Object.entries(d.porPlataforma).sort(function(a,b){return b[1]-a[1];});
  if (plats.length) {
    var max = plats[0][1] || 1;
    html += '<div class="section"><h3>Por Plataforma</h3>';
    plats.forEach(function(p) {
      var pct = Math.round((p[1]/max)*100);
      html += '<div class="plat-row"><div class="plat-name">' + p[0] + '</div>' +
        '<div class="bar-wrap"><div class="bar" style="width:' + pct + '%"></div></div>' +
        '<div class="plat-num">' + p[1] + '</div></div>';
    });
    html += '</div>';
  }

  // Por operador (admin)
  if (d.isAdmin) {
    var ops = Object.entries(d.porOperador).sort(function(a,b){return b[1]-a[1];});
    if (ops.length) {
      html += '<div class="section"><h3>Por Operador</h3>';
      ops.forEach(function(op) {
        html += '<div class="op-row"><span class="op-email">' + op[0] + '</span><span class="op-num">' + op[1] + '</span></div>';
      });
      html += '</div>';
    }
  }

  if (!plats.length && !Object.keys(d.porOperador).length) {
    html += '<div class="loading" style="color:#9fa8da">Sem dados no período selecionado.</div>';
  }

  document.getElementById('body').innerHTML = html;
}

carregar('mes');
</script>
</body>
</html>`;
}
