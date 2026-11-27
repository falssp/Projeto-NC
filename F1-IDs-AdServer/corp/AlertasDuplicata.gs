// AlertasDuplicata.gs — NC Tool | F1
// Detecta IDs duplicados no Geral e notifica Admins por e-mail

function verificarDuplicatasGeral() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const col   = CONFIG.colunas.geral;
  const geral = ss.getSheetByName(CONFIG.abas.geral);
  const last  = geral.getLastRow();

  if (last < 2) return;

  const dados = geral.getRange(2, col.idSX, last - 1, 2).getValues();
  const mapa  = {};

  dados.forEach((row, i) => {
    row.forEach(val => {
      if (!val) return;
      const id = val.toString().trim();
      if (!mapa[id]) mapa[id] = [];
      mapa[id].push(i + 2);
    });
  });

  const duplicados = Object.entries(mapa).filter(([_, rows]) => rows.length > 1);

  // Limpa highlights
  geral.getRange(2, col.idSX, last - 1, 2).setBackground(null);

  if (!duplicados.length) {
    log('verificarDuplicatasGeral: nenhum duplicado encontrado.');
    return;
  }

  // Destaca em amarelo
  duplicados.forEach(([id, rows]) => {
    rows.forEach(r => geral.getRange(r, col.idSX, 1, 2).setBackground('#fef9c3'));
  });

  // Monta corpo do e-mail
  const linhas = duplicados.map(([id, rows]) =>
    '• ' + id + ' — linhas: ' + rows.join(', ')
  ).join('\n');

  const corpo =
    'NC Tool | F1 — Alerta de IDs Duplicados\n\n' +
    'Foram encontrados ' + duplicados.length + ' IDs duplicados no Geral:\n\n' +
    linhas + '\n\n' +
    'Acesse a planilha para verificar e corrigir.\n\n' +
    'Mensagem automática — NC Tool';

  // Envia para todos os Admins
  const admins = obterAdmins();
  if (admins.length) {
    MailApp.sendEmail({
      to:      admins.join(','),
      subject: '[NC Tool · F1] ⚠️ ' + duplicados.length + ' ID(s) duplicado(s) detectado(s)',
      body:    corpo
    });
    log('verificarDuplicatasGeral: alerta enviado para ' + admins.join(', '));
  }

  log('verificarDuplicatasGeral: ' + duplicados.length + ' duplicados encontrados.');
}

function instalarTriggerDuplicatas() {
  ScriptApp.getProjectTriggers().forEach(t => {
    if (t.getHandlerFunction() === 'verificarDuplicatasGeral') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('verificarDuplicatasGeral')
    .timeBased().everyHours(6).create();
  SpreadsheetApp.getUi().alert('✅ Trigger de alertas instalado!\nVerificação a cada 6 horas.');
}

function removerTriggerDuplicatas() {
  ScriptApp.getProjectTriggers().forEach(t => {
    if (t.getHandlerFunction() === 'verificarDuplicatasGeral') ScriptApp.deleteTrigger(t);
  });
  SpreadsheetApp.getUi().alert('✅ Trigger de alertas removido.');
}
