/**
 * Valida ROLLUP_UNIDADES_PAI_FILHO.gs (calcularUnidadesComRollup) com os dados de ../exemplos/.
 * Uso:  node teste_rollup_gs.js      (o .gs é JS puro; Logger é simulado)
 * Comportamento esperado: igual à view multi-nível (rollup recursivo) e total = 31.
 */
const fs = require('fs'), path = require('path'), vm = require('vm');

const ex = path.join(__dirname, '..', 'exemplos');
const ctx = { Logger: { log: () => {} } };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'ROLLUP_UNIDADES_PAI_FILHO.gs'), 'utf8'), ctx);

const linhas = (f) => fs.readFileSync(path.join(ex, f), 'utf8').trim().split('\n').slice(1).map(l => l.split(','));
const issues = linhas('dados_teste.csv').map(c => ({
  key: c[0], parentKey: c[1] || null, unidades: c[2] === '' ? null : Number(c[2])
}));

const r = ctx.calcularUnidadesComRollup(issues);
const porKey = Object.fromEntries(r.issues.map(i => [i.key, i]));

let erros = 0;
for (const c of linhas('resultados_esperados.csv')) {
  const [k, , multi] = c;
  if (k === 'TOTAL') {
    const esperado = Number(c[3]);
    if (r.totalGeral !== esperado) { erros++; console.log(`FALHA total: obtido=${r.totalGeral} esperado=${esperado}`); }
    continue;
  }
  if (porKey[k].unidadesExibicao !== Number(multi)) {
    erros++; console.log(`FALHA ${k}: obtido=${porKey[k].unidadesExibicao} esperado=${multi}`);
  }
}
console.log(erros === 0 ? 'OK: todas as verificações passaram' : `${erros} falha(s)`);
process.exit(erros ? 1 : 0);
