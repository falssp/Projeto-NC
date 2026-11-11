/***************************************
 * 🔒 SEGURANÇA
 ***************************************/

function protegerEstrutura() {
  const ss     = SpreadsheetApp.getActiveSpreadsheet();
  const admins = obterAdmins();

  _protegerGeral(ss, admins);
  _protegerPainel(ss, admins);
  _protegerUsuarios(ss, admins);

  log("protegerEstrutura: proteções aplicadas.");
}

function _adminsValidos(admins) {
  return admins.filter(e => e && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e));
}

function _protegerGeral(ss, admins) {
  try {
    const geral = ss.getSheetByName(CONFIG.abas.geral);
    if (!geral) return;
    geral.getProtections(SpreadsheetApp.ProtectionType.RANGE).forEach(p => p.remove());
    const prot = geral.protect().setDescription("Geral - somente leitura");
    prot.setWarningOnly(false);
    prot.removeEditors(prot.getEditors());
    const validos = _adminsValidos(admins);
    if (validos.length) prot.addEditors(validos);
  } catch(err) { log("_protegerGeral erro: " + err.message); }
}

function _protegerPainel(ss, admins) {
  try {
    const painel = ss.getSheetByName(CONFIG.abas.painel);
    if (!painel) return;
    painel.getProtections(SpreadsheetApp.ProtectionType.RANGE).forEach(p => p.remove());
    const prot = painel.protect().setDescription("Painel - somente leitura");
    prot.setWarningOnly(false);
    prot.removeEditors(prot.getEditors());
    const validos = _adminsValidos(admins);
    if (validos.length) prot.addEditors(validos);
  } catch(err) { log("_protegerPainel erro: " + err.message); }
}

function _protegerUsuarios(ss, admins) {
  try {
    const usuarios = ss.getSheetByName(CONFIG.abas.usuarios);
    if (!usuarios) return;
    usuarios.getProtections(SpreadsheetApp.ProtectionType.RANGE).forEach(p => p.remove());
    const prot = usuarios.protect().setDescription("Usuarios - somente Admin");
    prot.setWarningOnly(false);
    prot.removeEditors(prot.getEditors());
    const validos = _adminsValidos(admins);
    if (validos.length) prot.addEditors(validos);
    usuarios.setFrozenColumns(0);
    usuarios.setFrozenRows(1);
  } catch(err) { log("_protegerUsuarios erro: " + err.message); }
}
