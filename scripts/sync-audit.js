#!/usr/bin/env node
/**
 * sync-audit.js — Verifica drift entre a planilha de taxonomia e os configs do F2.
 *
 * O que verifica:
 *   1. Novas abas na planilha que não estão no F2 (e não estão em not_in_f2)
 *   2. Abas do F2 que foram removidas da planilha
 *   3. Mudanças nas strings de taxonomia (linhas 1–3, coluna E) por plataforma
 *
 * Autenticação (uma das duas):
 *   - GOOGLE_SHEETS_SA_KEY  : JSON da Service Account (produção/CI)
 *   - GOOGLE_SHEETS_API_KEY : API key pública (se a planilha for "visualizar com link")
 *
 * Saída:
 *   - Exit 0 : nenhum drift
 *   - Exit 1 : drift detectado (relatório em /tmp/sync-drift-report.md)
 *   - Exit 2 : erro de configuração/autenticação
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const BASELINE_PATH = path.join(__dirname, 'sync-baseline.json');
const REPORT_PATH = '/tmp/sync-drift-report.md';

async function buildSheetsClient() {
  const saKey = process.env.GOOGLE_SHEETS_SA_KEY;
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;

  if (saKey) {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(saKey),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    return google.sheets({ version: 'v4', auth });
  }

  if (apiKey) {
    return google.sheets({ version: 'v4', auth: apiKey });
  }

  console.error('ERRO: defina GOOGLE_SHEETS_SA_KEY ou GOOGLE_SHEETS_API_KEY.');
  process.exit(2);
}

async function getTabNames(sheets, spreadsheetId) {
  const res = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: 'sheets.properties.title',
  });
  return res.data.sheets.map(s => s.properties.title);
}

async function getTaxonomyRows(sheets, spreadsheetId, tabName) {
  const range = `${tabName}!A1:E3`;
  const res = await sheets.spreadsheets.values.get({ spreadsheetId, range });
  const rows = res.data.values || [];
  return {
    row1_label: rows[0]?.[0] ?? '',
    row1:       rows[0]?.[4] ?? '',
    row2_label: rows[1]?.[0] ?? '',
    row2:       rows[1]?.[4] ?? '',
    row3_label: rows[2]?.[0] ?? '',
    row3:       rows[2]?.[4] ?? '',
  };
}

async function main() {
  const baseline = JSON.parse(fs.readFileSync(BASELINE_PATH, 'utf-8'));
  const { spreadsheet_id: spreadsheetId, not_in_f2: notInF2 = [], platforms } = baseline;

  const sheets = await buildSheetsClient();

  console.log(`🔍 Lendo planilha ${spreadsheetId}…`);
  const currentTabs = await getTabNames(sheets, spreadsheetId);
  const f2Tabs      = Object.values(platforms).map(p => p.tab);

  const drifts = [];

  // ── 1. Novas abas na planilha não mapeadas no F2 ──────────────────────────
  const newTabs = currentTabs.filter(t => !f2Tabs.includes(t) && !notInF2.includes(t));
  if (newTabs.length > 0) {
    drifts.push(
      `### 🆕 Novas abas na planilha — não mapeadas no F2\n` +
      newTabs.map(t => `- **${t}**`).join('\n') +
      `\n\n> Verificar se precisam de novo \`config/{id}.json\` em \`F2-Gerador/web/config/\` e entrada em \`PLATFORM_IDS\` no \`engine.js\`.`
    );
  }

  // ── 2. Abas do F2 removidas da planilha ──────────────────────────────────
  const removedTabs = f2Tabs.filter(t => !currentTabs.includes(t));
  if (removedTabs.length > 0) {
    drifts.push(
      `### 🗑️ Abas removidas da planilha que ainda existem no F2\n` +
      removedTabs.map(t => {
        const pid = Object.entries(platforms).find(([, p]) => p.tab === t)?.[0];
        return `- **${t}** (\`${pid}\`)`;
      }).join('\n') +
      `\n\n> Verificar se a plataforma foi descontinuada e deve ser removida do F2.`
    );
  }

  // ── 3. Mudanças de taxonomia por plataforma ───────────────────────────────
  for (const [platformId, { tab, taxonomy: baseline_tax }] of Object.entries(platforms)) {
    if (!currentTabs.includes(tab)) continue; // já reportado acima

    const current = await getTaxonomyRows(sheets, spreadsheetId, tab);

    const changed = Object.keys(baseline_tax).filter(k => current[k] !== baseline_tax[k]);
    if (changed.length > 0) {
      const lines = changed.map(k => {
        const before = baseline_tax[k] || '_(vazio)_';
        const after  = current[k]      || '_(vazio)_';
        return `**\`${k}\`**\n  - antes: \`${before}\`\n  - agora: \`${after}\``;
      });
      drifts.push(
        `### 📝 Taxonomia mudou — \`${platformId}\` (aba: *${tab}*)\n` +
        lines.join('\n\n') +
        `\n\n> Atualizar \`F2-Gerador/web/config/${platformId}.json\` e o baseline em \`scripts/sync-baseline.json\`.`
      );
    }
  }

  // ── Resultado ──────────────────────────────────────────────────────────────
  if (drifts.length === 0) {
    console.log('✅ Nenhum drift detectado. F2 está em sync com a planilha.');
    process.exit(0);
  }

  const today = new Date().toISOString().split('T')[0];
  const report = [
    `## ⚠️ Sync Audit — Drift F2 ↔ Planilha`,
    `**Data:** ${today}`,
    `**Itens com drift:** ${drifts.length}`,
    '',
    drifts.join('\n\n---\n\n'),
    '',
    '---',
    `**Planilha:** https://docs.google.com/spreadsheets/d/${spreadsheetId}`,
    `**F2 configs:** \`F2-Gerador/web/config/\``,
    `**Baseline:** \`scripts/sync-baseline.json\``,
  ].join('\n');

  console.log(report);
  fs.writeFileSync(REPORT_PATH, report, 'utf-8');

  process.exit(1);
}

main().catch(err => {
  console.error('ERRO inesperado:', err.message);
  process.exit(2);
});
