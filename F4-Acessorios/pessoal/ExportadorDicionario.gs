// ============================================================
// ExportadorDicionario.gs
// NC Tool | Unilever BR x Grasp — F4 Pessoal
// Exporta linhas filtradas do Dicionário para uma aba separada.
//
// FILTROS DISPONÍVEIS (via dialog)
// ─────────────────────────────────
//   • Plataforma (col B) — multi-select
//   • Período    (col E) — data início / data fim (Última Verificação)
//
// SAÍDA
// ─────
//   Aba "📤 Exportação Dicionário" — criada/sobrescrita a cada exportação
// ============================================================

var EXP_SHEET_ID   = '16OdPmc-SeqXn1VefT0xRsIQJ-LdICRfUZnahsARuw4w';
var EXP_ABA_ORIGEM = 'Dicionário';
var EXP_ABA_DEST   = '📤 Exportação Dicionário';
var EXP_LINHA_INI  = 2;

function exportarDicionario() {
  var ss  = SpreadsheetApp.openById(EXP_SHEET_ID);
  var aba = ss.getSheetByName(EXP_ABA_ORIGEM);
  if (!aba) { SpreadsheetApp.getUi().alert('Aba "' + EXP_ABA_ORIGEM + '" não encontrada.'); return; }

  var lastRow = aba.getLastRow();
  if (lastRow < EXP_LINHA_INI) { SpreadsheetApp.getUi().alert('Nenhum dado no Dicionário.'); return; }

  // Coletar plataformas únicas para o dialog
  var numRows    = lastRow - EXP_LINHA_INI + 1;
  var dados      = aba.getRange(EXP_LINHA_INI, 1, numRows, 5).getValues();
  var plataformas = [];
  dados.forEach(function(row) {
    var p = String(row[1] || '').trim();
    if (p && plataformas.indexOf(p) < 0) plataformas.push(p);
  });
  plataformas.sort();

  // Dialog de filtros via HTML
  var html = HtmlService.createHtmlOutput(_expBuildDialog(plataformas))
    .setWidth(420).setHeight(340);
  SpreadsheetApp.getUi().showModalDialog(html, 'Exportar Dicionário — Filtros');
}

function _expExecutar(filtros) {
  var ss  = SpreadsheetApp.openById(EXP_SHEET_ID);
  var aba = ss.getSheetByName(EXP_ABA_ORIGEM);
  if (!aba) return { ok: false, msg: 'Aba origem não encontrada.' };

  var lastRow = aba.getLastRow();
  if (lastRow < EXP_LINHA_INI) return { ok: false, msg: 'Nenhum dado.' };

  var numRows  = lastRow - EXP_LINHA_INI + 1;
  var cabecalho = aba.getRange(1, 1, 1, 5).getValues()[0];
  var dados     = aba.getRange(EXP_LINHA_INI, 1, numRows, 5).getValues();

  var plats    = filtros.plataformas || [];
  var dtInicio = filtros.dataInicio ? new Date(filtros.dataInicio) : null;
  var dtFim    = filtros.dataFim    ? new Date(filtros.dataFim)    : null;
  if (dtFim) dtFim.setHours(23, 59, 59);

  var filtrado = dados.filter(function(row) {
    var link  = String(row[0] || '').trim();
    if (!link) return false;

    // Filtro plataforma
    if (plats.length > 0) {
      var plat = String(row[1] || '').trim();
      if (plats.indexOf(plat) < 0) return false;
    }

    // Filtro período (col E — Última Verificação)
    if (dtInicio || dtFim) {
      var dataStr = String(row[4] || '').trim();
      if (!dataStr) return false;
      var partes = dataStr.split('/');
      if (partes.length < 3) return false;
      var dataRow = new Date(partes[2].split(' ')[0], partes[1] - 1, partes[0]);
      if (dtInicio && dataRow < dtInicio) return false;
      if (dtFim    && dataRow > dtFim)    return false;
    }

    return true;
  });

  // Criar/sobrescrever aba de destino
  var destino = ss.getSheetByName(EXP_ABA_DEST);
  if (destino) ss.deleteSheet(destino);
  destino = ss.insertSheet(EXP_ABA_DEST);

  // Cabeçalho
  var hdr = destino.getRange(1, 1, 1, cabecalho.length);
  hdr.setValues([cabecalho]);
  hdr.setBackground('#1F36C7').setFontColor('#FFFFFF')
     .setFontWeight('bold').setHorizontalAlignment('center');

  if (filtrado.length > 0) {
    destino.getRange(2, 1, filtrado.length, cabecalho.length).setValues(filtrado);
  }

  // Formatação básica
  destino.setColumnWidth(1, 400);
  destino.setColumnWidth(2, 180);
  destino.setColumnWidth(3, 180);
  destino.setColumnWidth(4, 160);
  destino.setColumnWidth(5, 180);
  destino.setFrozenRows(1);
  SpreadsheetApp.flush();

  return { ok: true, total: filtrado.length };
}

function _expBuildDialog(plataformas) {
  var checks = plataformas.map(function(p) {
    return '<label style="display:block;margin:4px 0"><input type="checkbox" name="plat" value="' + p + '" checked> ' + p + '</label>';
  }).join('');

  return '<!DOCTYPE html><html><head><meta charset="UTF-8">'
    + '<style>body{font-family:Arial,sans-serif;font-size:13px;padding:16px;color:#212529}'
    + 'h3{margin:0 0 12px;font-size:14px;color:#1F36C7}'
    + '.sec{margin-bottom:14px}.sec label{font-weight:600;display:block;margin-bottom:6px}'
    + '.plats{max-height:120px;overflow-y:auto;border:1px solid #dee2e6;border-radius:6px;padding:8px}'
    + '.row{display:flex;gap:8px;align-items:center}.row input{flex:1;padding:6px 8px;border:1px solid #dee2e6;border-radius:5px;font-size:12px}'
    + 'button{padding:8px 18px;border:none;border-radius:6px;cursor:pointer;font-size:13px}'
    + '.btn-ok{background:#1F36C7;color:#fff}.btn-cancel{background:#f1f3f5;color:#495057}'
    + '.footer{display:flex;gap:8px;justify-content:flex-end;margin-top:16px}'
    + '</style></head><body>'
    + '<h3>Filtros de Exportação</h3>'
    + '<div class="sec"><label>Plataforma</label><div class="plats">' + checks + '</div></div>'
    + '<div class="sec"><label>Período (Última Verificação)</label>'
    + '<div class="row"><input type="date" id="dtIni" placeholder="De"><span>até</span><input type="date" id="dtFim" placeholder="Até"></div></div>'
    + '<div class="footer">'
    + '<button class="btn-cancel" onclick="google.script.host.close()">Cancelar</button>'
    + '<button class="btn-ok" onclick="enviar()">Exportar</button>'
    + '</div>'
    + '<script>function enviar(){'
    + 'var plats=[...document.querySelectorAll("input[name=plat]:checked")].map(e=>e.value);'
    + 'var filtros={plataformas:plats,dataInicio:document.getElementById("dtIni").value,dataFim:document.getElementById("dtFim").value};'
    + 'google.script.run.withSuccessHandler(function(r){if(r.ok){google.script.host.close();}'
    + 'else{alert(r.msg);}}).withFailureHandler(function(e){alert(e.message);})._expExecutar(filtros);}'
    + '</script></body></html>';
}