// ============================================================
// Menu.gs — NC Tool | Unilever BR x Grasp — F4 Pessoal
//
// REQUISITO: as funções referenciadas precisam existir nos
// outros arquivos .gs deste projeto:
//   criarAbaInfluencerNameTool()     → Influencernametool.gs
//   atualizarAbaInfluencerNameTool() → Influencernametool.gs
//   aplicarCondicionalDicionario()   → Dicionario.gs
//   formatarDicionario()             → Dicionario.gs
//   validarLinksAgora()              → ValidadorLinks.gs
//   resetarValidacaoLinks()          → ValidadorLinks.gs
//   exportarDicionario()             → ExportadorDicionario.gs
//   instalarMonitoramento()          → Historico.gs
//   limparHistorico()                → Historico.gs
// ============================================================

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('NC Tool')
    .addSubMenu(
      SpreadsheetApp.getUi().createMenu('📖 Dicionário')
        .addItem('🎨 Aplicar cores (condicional)', 'aplicarCondicionalDicionario')
        .addItem('📐 Formatar (larguras/alinhamento)', 'formatarDicionario')
        .addSeparator()
        .addItem('🔗 Validar links agora', 'validarLinksAgora')
        .addItem('🔄 Resetar validação (revalida tudo)', 'resetarValidacaoLinks')
        .addSeparator()
        .addItem('📤 Exportar filtrado', 'exportarDicionario')
    )
    .addSubMenu(
      SpreadsheetApp.getUi().createMenu('👤 Influencer Name Tool')
        .addItem('🔄 Atualizar aba (preserva dados)', 'atualizarAbaInfluencerNameTool')
        .addItem('🆕 Criar aba (do zero)', 'criarAbaInfluencerNameTool')
    )
    .addSubMenu(
      SpreadsheetApp.getUi().createMenu('📋 Histórico')
        .addItem('✅ Instalar monitoramento', 'instalarMonitoramento')
        .addItem('🗑️ Limpar histórico', 'limparHistorico')
    )
    .addToUi();
}