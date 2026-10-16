/**
 * Valida montarLinhasPlanilha_ (JIRA_EXTRACAO_UNIDADES.gs) com os dados de ../exemplos/.
 * Só a MONTAGEM das linhas é testada; chamadas ao Jira e SpreadsheetApp precisam de ambiente real.
 * Uso: node teste_planilha_gs.js
 */
const fs = require('fs'), path = require('path'), vm = require('vm');
const raiz = path.join(__dirname, '..');
const ctx = { Logger: { log: () => {} } };
vm.createContext(ctx);
['ROLLUP_UNIDADES_PAI_FILHO.gs', 'JIRA_EXTRACAO_UNIDADES.gs'].forEach(f =>
  vm.runInContext(fs.readFileSync(path.join(raiz, f), 'utf8'), ctx));

const linhas = f => fs.readFileSync(path.join(raiz, 'exemplos', f), 'utf8').trim().split('\n').slice(1).map(l => l.split(','));
const issues = linhas('dados_teste.csv').map(c => ({ key: c[0], parentKey: c[1] || null, unidades: c[2] === '' ? null : Number(c[2]) }));
const res = ctx.montarLinhasPlanilha_(issues);

let erros = 0;
const esperado = ['issue_key', 'parent_key', 'unidades', 'unidades_exibicao', 'unidades_total'];
if (JSON.stringify(res.linhas[0]) !== JSON.stringify(esperado)) { erros++; console.log('FALHA cabeçalho'); }
const porKey = Object.fromEntries(res.linhas.slice(1).map(l => [l[0], l]));
for (const c of linhas('resultados_esperados.csv')) {
  const [k, , multi, tot] = c;
  if (k === 'TOTAL') { if (res.totalGeral !== Number(tot)) { erros++; console.log(`FALHA total: ${res.totalGeral} != ${tot}`); } continue; }
  const l = porKey[k];
  if (l[3] !== Number(multi)) { erros++; console.log(`FALHA ${k} exibicao: ${l[3]} != ${multi}`); }
  const totEsp = tot === '' ? '' : Number(tot);
  if (l[4] !== totEsp) { erros++; console.log(`FALHA ${k} total: ${JSON.stringify(l[4])} != ${JSON.stringify(totEsp)}`); }
}
console.log(erros === 0 ? 'OK: todas as verificações passaram' : `${erros} falha(s)`);
process.exit(erros ? 1 : 0);
