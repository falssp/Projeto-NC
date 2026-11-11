/**
 * ROLLUP DE UNIDADES — PAI SEM VALOR / FILHO COM VALOR
 * ------------------------------------------------------------------
 * Regra:
 * - Se a issue tem "unidades" próprias preenchidas, usa esse valor.
 * - Se a issue é PAI e não tem valor próprio, ela EXIBE a soma
 *   (recursiva) das unidades dos filhos.
 * - No TOTAL GERAL do dashboard, soma-se apenas os valores ORIGINAIS
 *   (issues que realmente têm "unidades" preenchidas). O valor
 *   agregado exibido no pai NUNCA entra no total — assim cada
 *   unidade é contabilizada uma única vez, na origem (filho).
 *
 * Formato esperado de entrada (array de issues já achatado):
 * [
 *   { key: 'UL-100', parentKey: null,     unidades: null }, // pai
 *   { key: 'UL-101', parentKey: 'UL-100', unidades: 5 },    // filho
 *   { key: 'UL-102', parentKey: 'UL-100', unidades: 3 },    // filho
 *   ...
 * ]
 */

function calcularUnidadesComRollup(issues) {
  const porKey = {};
  issues.forEach(function (i) { porKey[i.key] = i; });

  const filhosPorPai = {};
  issues.forEach(function (i) {
    if (i.parentKey) {
      if (!filhosPorPai[i.parentKey]) filhosPorPai[i.parentKey] = [];
      filhosPorPai[i.parentKey].push(i.key);
    }
  });

  function temValorProprio(issue) {
    return issue.unidades !== null && issue.unidades !== undefined && issue.unidades !== '';
  }

  const cache = {};

  // Valor de EXIBIÇÃO por issue: valor próprio, ou soma recursiva dos filhos
  function unidadesExibicao(key) {
    if (cache[key] !== undefined) return cache[key];

    const issue = porKey[key];
    let valor;

    if (temValorProprio(issue)) {
      valor = Number(issue.unidades);
    } else {
      const filhos = filhosPorPai[key] || [];
      valor = filhos.reduce(function (soma, filhoKey) {
        return soma + unidadesExibicao(filhoKey);
      }, 0);
    }

    cache[key] = valor;
    return valor;
  }

  issues.forEach(function (i) {
    i.unidadesExibicao = unidadesExibicao(i.key);
  });

  // TOTAL GERAL: soma só quem tem valor próprio (origem real).
  // Isso garante que o rollup do pai (calculado, não original)
  // nunca é somado de novo no total.
  const totalGeral = issues
    .filter(temValorProprio)
    .reduce(function (soma, i) { return soma + Number(i.unidades); }, 0);

  return { issues: issues, totalGeral: totalGeral };
}

/**
 * Exemplo de uso rápido para teste manual no editor do Apps Script.
 */
function testeRollupUnidades() {
  const issues = [
    { key: 'UL-100', parentKey: null, unidades: null },
    { key: 'UL-101', parentKey: 'UL-100', unidades: 5 },
    { key: 'UL-102', parentKey: 'UL-100', unidades: 3 },
    { key: 'UL-200', parentKey: null, unidades: 10 } // pai que já tem valor próprio
  ];

  const resultado = calcularUnidadesComRollup(issues);
  Logger.log(JSON.stringify(resultado, null, 2));
  // UL-100.unidadesExibicao = 8 (5+3), UL-200.unidadesExibicao = 10
  // totalGeral = 18 (5+3+10) — sem duplicar o 8 do pai UL-100
}
