/**
 * F2 Download Module
 * Exports naming results to .xlsx (via SheetJS) and CSV.
 */

function exportToCSV() {
  const data = window.F2Engine.getAllResults();
  if (!data.length) return alert('Nenhuma linha para exportar.');

  const headers = ['Linha', 'Plataforma', 'Campaign Name', 'AdGroup Name', 'Ad Name', 'Status'];
  const csvRows = [headers.join(',')];

  data.forEach(row => {
    const vals = [
      row.row,
      `"${row.platform}"`,
      `"${(row.campaign||'').replace(/"/g,'""')}"`,
      `"${(row.adgroup||'').replace(/"/g,'""')}"`,
      `"${(row.ad||'').replace(/"/g,'""')}"`,
      `"${(row.status||'').replace(/"/g,'""')}"`
    ];
    csvRows.push(vals.join(','));
  });

  const blob = new Blob(['﻿' + csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, `F2_${window.F2Engine.currentPlatform.id}_naming.csv`);
}

function exportToXLSX() {
  const data = window.F2Engine.getAllResults();
  if (!data.length) return alert('Nenhuma linha para exportar.');

  if (typeof XLSX === 'undefined') {
    alert('SheetJS não carregado. Use exportar CSV como alternativa.');
    return;
  }

  const headers = ['Linha', 'Plataforma', 'Campaign Name', 'AdGroup Name', 'Ad Name', 'Status'];
  const sheetData = [headers];
  data.forEach(row => {
    sheetData.push([row.row, row.platform, row.campaign, row.adgroup, row.ad, row.status]);
  });

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(sheetData);

  // Column widths
  ws['!cols'] = [
    { wch: 6 }, { wch: 15 }, { wch: 80 }, { wch: 80 }, { wch: 80 }, { wch: 15 }
  ];

  // Style header row (bold)
  const range = XLSX.utils.decode_range(ws['!ref']);
  for (let C = range.s.c; C <= range.e.c; C++) {
    const addr = XLSX.utils.encode_cell({ r: 0, c: C });
    if (!ws[addr]) continue;
    ws[addr].s = { font: { bold: true }, fill: { fgColor: { rgb: 'D9D9D9' } } };
  }

  const platName = window.F2Engine.currentPlatform.name.replace(/[^a-zA-Z0-9]/g, '_');
  XLSX.utils.book_append_sheet(wb, ws, platName);
  XLSX.writeFile(wb, `F2_${window.F2Engine.currentPlatform.id}_naming.xlsx`);
}

function exportAllPlatforms() {
  // Export all platforms' current data to a multi-sheet XLSX
  if (typeof XLSX === 'undefined') {
    alert('SheetJS não carregado.');
    return;
  }

  const wb = XLSX.utils.book_new();
  const platforms = window.F2Engine.PLATFORMS;

  platforms.forEach(p => {
    const headers = ['Campaign Name', 'AdGroup Name', 'Ad Name'];
    const sheetData = [headers, ['', '', '']]; // empty template row
    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    ws['!cols'] = [{ wch: 80 }, { wch: 80 }, { wch: 80 }];
    const sheetName = p.name.substring(0, 31); // Excel limit
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  });

  XLSX.writeFile(wb, 'F2_Template_Todas_Plataformas.xlsx');
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

window.F2Download = { exportToCSV, exportToXLSX, exportAllPlatforms };
