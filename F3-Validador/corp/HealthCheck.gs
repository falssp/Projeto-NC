// ============================================================
// NC Tool | F3 — Validator  ·  HealthCheck.gs  (Corp)
// Verifica estrutura completa da planilha e gera relatório
// Disponível em NC Tool → 🩺 Health Check
// ============================================================

var HC_SHEET_ID = '1fAQfNJ-UkDfhCHZ2GYcxDWpsAojg7z0VglQHeXtAfSo';

var HC_ABAS_ESPERADAS = {
  'Dashboard': { colunas: null,    minLinhas: 1 },
  'Log':       { colunas: ['ID','Timestamp','Usuário','Cliente','Fonte','Arquivo','Plataforma','Total','Corretos','Erros','Score%'], minLinhas: 1 },
  'Erros':     { colunas: ['LogID','Timestamp','Cliente','Plataforma','Nível','String','Regra','Campo','Valor','Mensagem','Sugestão'], minLinhas: 1 },
  'Exceções':  { colunas: ['TX Key','Ad Name','Plataforma','Estrutura','Motivo','Data E-mail','Assunto E-mail','Remetente','Solicitado Por','Data Solicitação','Aprovado Por','Data Aprovação','Status'], minLinhas: 1 },
  'Arquivo':   { colunas: ['ID','Timestamp','Usuário','Cliente','Fonte','Arquivo','Plataforma','Total','Corretos','Erros','Score%'], minLinhas: 1 },
  'Config':    { colunas: null, minLinhas: 3 },
  'Clientes':  { colunas: ['Cliente','ID_Dicionario','ID_RM_Template','Plataformas_Ativas','Ativo','Notas'], minLinhas: 1 }
};

// ── Função principal ─────────────────────────────────────────
function runHealthCheck() {
  var ui  = SpreadsheetApp.getUi();
  var ss  = SpreadsheetApp.openById(HC_SHEET_ID);
  var erros = [], avisos = [], oks = [];

  // 1. Verificar abas esperadas
  Object.keys(HC_ABAS_ESPERADAS).forEach(function(nome) {
    var cfg = HC_ABAS_ESPERADAS[nome];
    var aba = ss.getSheetByName(nome);
    if (!aba) { erros.push('Aba "' + nome + '" não encontrada'); return; }

    // Colunas
    if (cfg.colunas) {
      var nCols = cfg.colunas.length;
      if (aba.getLastColumn() < nCols) {
        erros.push('Aba "' + nome + '": esperadas ' + nCols + ' colunas, tem ' + aba.getLastColumn());
      } else {
        var hdr = aba.getRange(1, 1, 1, nCols).getValues()[0];
        var errado = cfg.colunas.filter(function(c, i) { return String(hdr[i] || '').trim() !== c; });
        if (errado.length) {
          erros.push('Aba "' + nome + '": colunas incorretas — ' + errado.join(', '));
        } else {
          oks.push('Aba "' + nome + '": header OK (' + (aba.getLastRow() - 1) + ' registros)');
        }
      }
    } else {
      oks.push('Aba "' + nome + '": presente (' + aba.getLastRow() + ' linhas)');
    }
  });

  // 2. Aba Excecoes duplicada (sem acento)
  if (ss.getSheetByName('Excecoes')) {
    avisos.push('Aba "Excecoes" (sem acento) encontrada — duplicata de "Exceções". Apagar manualmente.');
  }

  // 3. Dicionário
  try {
    var dictStatus = getMergeDictStatus();
    if (!dictStatus.cacheOk) {
      avisos.push('Dicionário: cache vazio — rode NC Tool → 📖 Atualizar Dicionário Agora');
    } else {
      var diasAtras = dictStatus.lastMerge ? Math.floor((new Date() - new Date(dictStatus.lastMerge)) / 86400000) : 999;
      if (diasAtras > 8) {
        avisos.push('Dicionário: último merge há ' + diasAtras + ' dias — considere atualizar');
      } else {
        oks.push('Dicionário: ' + dictStatus.totalSlugs + ' slugs, atualizado há ' + diasAtras + ' dia(s)');
      }
    }
  } catch(e) { avisos.push('Dicionário: erro ao verificar — ' + e.message); }

  // 4. Token Jira
  var props = PropertiesService.getScriptProperties();
  if (!props.getProperty('JIRA_API_TOKEN')) {
    avisos.push('Token Jira não configurado — NC Tool → ⚙️ Configurar Token Jira');
  } else {
    oks.push('Token Jira: configurado');
  }

  // 5. Triggers
  var triggers = ScriptApp.getProjectTriggers().map(function(t) { return t.getHandlerFunction(); });
  var temMergeHC = triggers.indexOf('mergeDict') !== -1 || triggers.indexOf('menuMergeDict') !== -1;
  if (!temMergeHC) avisos.push('Trigger "mergeDict" não instalado');
  else             oks.push('Trigger mergeDict: ativo');
  if (triggers.indexOf('arquivarLogsAntigos') === -1)     avisos.push('Trigger "arquivarLogsAntigos" não instalado');
  else                                                     oks.push('Trigger arquivarLogsAntigos: ativo');

  // ── Relatório ──
  var linhas = [];
  linhas.push('NC Tool | F3 Validator — Health Check');
  linhas.push('Corp (Original) · ' + new Date().toLocaleString('pt-BR'));
  linhas.push('');

  if (erros.length) {
    linhas.push('❌ ERROS (' + erros.length + '):');
    erros.forEach(function(e) { linhas.push('  • ' + e); });
    linhas.push('');
  }
  if (avisos.length) {
    linhas.push('⚠️ AVISOS (' + avisos.length + '):');
    avisos.forEach(function(a) { linhas.push('  • ' + a); });
    linhas.push('');
  }
  linhas.push('✅ OK (' + oks.length + '):');
  oks.forEach(function(o) { linhas.push('  • ' + o); });

  var resumo = erros.length === 0 && avisos.length === 0
    ? '✅ Tudo OK!'
    : (erros.length ? '❌ ' + erros.length + ' erro(s)' : '') +
      (avisos.length ? (erros.length ? ' · ' : '') + '⚠️ ' + avisos.length + ' aviso(s)' : '');

  ui.alert('Health Check — ' + resumo, linhas.join('\n'), ui.ButtonSet.OK);
}
