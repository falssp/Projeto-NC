// ============================================================
// NC Tool | F3 — Validator  ·  NotificacaoDicionario.gs  (Backup)
// Avisa por e-mail + toast se dicionário estiver desatualizado
// Roda automaticamente via trigger diário — instalar com
// instalarTriggerNotificacaoDicionario()
// ============================================================

var ND_EMAIL_DESTINO = 'felipe.lima@stormx.com.br';
var ND_DIAS_LIMITE   = 8; // alerta se último merge > X dias atrás

function verificarDicionarioDesatualizado() {
  try {
    var status = getMergeDictStatus();
    if (!status.lastMerge) {
      _ndEnviarAlerta('Cache vazio', 'O dicionário nunca foi sincronizado. Acesse a planilha e rode NC Tool → 📖 Atualizar Dicionário Agora.');
      return;
    }
    var ts        = new Date(status.lastMerge);
    var diasAtras = Math.floor((new Date() - ts) / 86400000);
    if (diasAtras > ND_DIAS_LIMITE) {
      _ndEnviarAlerta(
        'Dicionário desatualizado há ' + diasAtras + ' dia(s)',
        'O último merge foi em ' + ts.toLocaleString('pt-BR') + '.\n' +
        'Total atual: ' + status.totalSlugs + ' slugs.\n\n' +
        'Acesse a planilha e rode NC Tool → 📖 Atualizar Dicionário Agora.'
      );
    }
    // Se estiver ok, silencioso
  } catch(e) {
    Logger.log('verificarDicionarioDesatualizado ERRO: ' + e.message);
  }
}

function _ndEnviarAlerta(assunto, corpo) {
  try {
    MailApp.sendEmail({
      to:      ND_EMAIL_DESTINO,
      subject: '[NC Tool · F3 Backup] ⚠️ ' + assunto,
      body:    'NC Tool | F3 Validator — Pessoal (Backup)\n\n' + corpo + '\n\nMensagem automática gerada pelo trigger diário.'
    });
    Logger.log('Alerta dicionário enviado: ' + assunto);
  } catch(e) {
    Logger.log('_ndEnviarAlerta ERRO: ' + e.message);
  }
}

function instalarTriggerNotificacaoDicionario() {
  // Remove trigger anterior se existir
  ScriptApp.getProjectTriggers().forEach(function(t) {
    if (t.getHandlerFunction() === 'verificarDicionarioDesatualizado') ScriptApp.deleteTrigger(t);
  });
  // Roda todo dia às 9h
  ScriptApp.newTrigger('verificarDicionarioDesatualizado')
    .timeBased().everyDays(1).atHour(9).create();
  SpreadsheetApp.getUi().alert('✅ Trigger de notificação instalado!\nVerificação diária às 9h — alerta por e-mail se dicionário estiver há mais de ' + ND_DIAS_LIMITE + ' dias sem merge.');
}

function removerTriggerNotificacaoDicionario() {
  ScriptApp.getProjectTriggers().forEach(function(t) {
    if (t.getHandlerFunction() === 'verificarDicionarioDesatualizado') ScriptApp.deleteTrigger(t);
  });
  SpreadsheetApp.getUi().alert('✅ Trigger de notificação removido.');
}
