// ReprocessadorIDs.gs — NC Tool | F1
// Detecta e corrige IDs invalidos ou duplicados em lote

function reprocessarIDs() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const ui    = SpreadsheetApp.getUi();
  const col   = CONFIG.colunas.geral;
  const geral = ss.getSheetByName(CONFIG.abas.geral);
  const last  = geral.getLastRow();

  if (last < 2) {
    ui.alert('Geral vazio — nada a reprocessar.');
    return;
  }

  const dados = geral.getRange(2, 1, last - 1, 6).getValues();
  const problemas = [];

  dados.forEach((row, i) => {
    const linha      = i + 2;
    const idSX       = (row[col.idSX - 1] || '').toString().trim();
    const idAMZ      = (row[col.idAMZ - 1] || '').toString().trim();
    const plataforma = (row[col.plataforma - 1] || '').toString().trim();

    // Valida formato SX
    if (idSX && !/^SX\d{8}$/.test(idSX)) {
      problemas.push({ linha, tipo: 'Formato SX invalido', id: idSX, plataforma });
    }

    // Valida formato AMZ
    if (idAMZ && !/^AMZ\d{6}H$/.test(idAMZ)) {
      problemas.push({ linha, tipo: 'Formato AMZ invalido', id: idAMZ, plataforma });
    }

    // Detecta plataforma sem ID
    const precisaSX  = ['Meta','TikTok','YouTube','Search'].includes(plataforma);
    const precisaAMZ = plataforma === 'Amazon';
    if (precisaSX && !idSX)  problemas.push({ linha, tipo: 'SX ausente', id: '', plataforma });
    if (precisaAMZ && !idAMZ) problemas.push({ linha, tipo: 'AMZ ausente', id: '', plataforma });
  });

  // Detecta duplicatas
  const mapaSX = {}, mapaAMZ = {};
  dados.forEach((row, i) => {
    const linha = i + 2;
    const idSX  = (row[col.idSX - 1] || '').toString().trim();
    const idAMZ = (row[col.idAMZ - 1] || '').toString().trim();
    if (idSX)  { if (!mapaSX[idSX])  mapaSX[idSX]  = []; mapaSX[idSX].push(linha);  }
    if (idAMZ) { if (!mapaAMZ[idAMZ]) mapaAMZ[idAMZ] = []; mapaAMZ[idAMZ].push(linha); }
  });

  Object.entries(mapaSX).forEach(([id, linhas]) => {
    if (linhas.length > 1)
      problemas.push({ linha: linhas.join('+'), tipo: 'SX duplicado', id, plataforma: '' });
  });
  Object.entries(mapaAMZ).forEach(([id, linhas]) => {
    if (linhas.length > 1)
      problemas.push({ linha: linhas.join('+'), tipo: 'AMZ duplicado', id, plataforma: '' });
  });

  if (!problemas.length) {
    ui.alert('✅ Nenhum problema encontrado!\nTodos os IDs estão válidos.');
    log('reprocessarIDs: nenhum problema encontrado.');
    return;
  }

  // Exibe resumo
  const resumo = problemas.slice(0, 20).map(p =>
    'Linha ' + p.linha + ' | ' + p.tipo + (p.id ? ' [' + p.id + ']' : '') +
    (p.plataforma ? ' (' + p.plataforma + ')' : '')
  ).join('\n');

  const msg = problemas.length + ' problema(s) encontrado(s):\n\n' +
    resumo +
    (problemas.length > 20 ? '\n\n... e mais ' + (problemas.length - 20) + ' problema(s).' : '') +
    '\n\nDeseja destacar as linhas com problema na planilha?';

  const resp = ui.alert(msg, ui.ButtonSet.YES_NO);

  if (resp === ui.Button.YES) {
    // Limpa highlights anteriores
    geral.getRange(2, col.idSX, last - 1, 2).setBackground(null);

    // Destaca problemas
    problemas.forEach(p => {
      const linhasNum = p.linha.toString().split('+').map(Number).filter(n => !isNaN(n));
      linhasNum.forEach(l => {
        if (l >= 2) geral.getRange(l, col.idSX, 1, 2).setBackground('#fecaca');
      });
    });

    log('reprocessarIDs: ' + problemas.length + ' problemas destacados.');
    ui.alert('✅ ' + problemas.length + ' linha(s) destacada(s) em vermelho.\nRevise e corrija manualmente ou use NC Tool → Corrigir IDs Selecionados.');
  }
}

function corrigirIDSelecionado() {
  const ss     = SpreadsheetApp.getActiveSpreadsheet();
  const ui     = SpreadsheetApp.getUi();
  const sheet  = ss.getActiveSheet();
  const range  = ss.getActiveRange();
  const row    = range.getRow();
  const col    = CONFIG.colunas.geral;

  if (sheet.getName() !== CONFIG.abas.geral || row < 2) {
    ui.alert('Selecione uma linha na aba Geral.');
    return;
  }

  const dados      = sheet.getRange(row, 1, 1, 6).getValues()[0];
  const plataforma = (dados[col.plataforma - 1] || '').toString().trim();
  const adName     = (dados[col.adName - 1] || '').toString().trim();

  if (!plataforma) {
    ui.alert('Linha sem plataforma — não é possível gerar ID.');
    return;
  }

  const tipo = getTipoID(plataforma);
  if (tipo === 'MANUAL') {
    ui.alert('Plataforma ' + plataforma + ' usa ID manual — edite diretamente.');
    return;
  }

  const novoID = gerarID(tipo);
  if (tipo === 'AMZ') {
    sheet.getRange(row, col.idAMZ).setValue(novoID).setBackground(null);
    sheet.getRange(row, col.idSX).setValue('').setBackground(null);
  } else {
    sheet.getRange(row, col.idSX).setValue(novoID).setBackground(null);
    sheet.getRange(row, col.idAMZ).setValue('').setBackground(null);
  }

  log('corrigirIDSelecionado: novo ID ' + novoID + ' gerado para linha ' + row);
  ui.alert('✅ Novo ID gerado: ' + novoID);
}
