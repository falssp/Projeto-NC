# Jira → Dashboard | Unidades Pai/Filho sem Duplicidade

**Edição:** Out/26 · **Público:** AdOps / Taxonomia (UL) · **Fontes:** Jira → BigQuery e/ou Google Sheets → Looker Studio

---

## 1. O problema

No Jira, a tarefa **pai** não tem valor de unidade. As tarefas **filhas** têm. O dashboard precisa:

- mostrar no pai a **soma das unidades dos filhos**;
- **não duplicar** no total geral (o pai agregado + cada filho = contagem em dobro).

> O número do pai é só **exibição**. A unidade "de verdade" vive no filho.

## 2. A regra (2 colunas)

| Coluna | O que é | Pai sem valor próprio | Filho / issue com valor próprio |
|---|---|---|---|
| `unidades_exibicao` | O que aparece na linha | Soma dos filhos | Valor próprio |
| `unidades_total` | O que o Looker soma no total | **vazio / NULL** | Valor próprio |

- Linha/tabela de detalhe → usa `unidades_exibicao`.
- Scorecard, total, gráfico agregado → usa **somente** `unidades_total`.

### Exemplo

| Issue | Pai | unidades (Jira) | unidades_exibicao | unidades_total |
|---|---|---|---|---|
| UL-100 | — | — | 8 | — |
| UL-101 | UL-100 | 5 | 5 | 5 |
| UL-102 | UL-100 | 3 | 3 | 3 |
| UL-200 | — | 10 | 10 | 10 |
| **Total do dashboard** | | | | **18** |

Se o Looker somasse `unidades_exibicao`, o total seria 26 (8 duplicado). Com `unidades_total`, é 18.

## 3. Implementação por fonte

### BigQuery (view)

```sql
CREATE OR REPLACE VIEW `projeto.dataset.vw_jira_unidades` AS
WITH base AS (
  SELECT issue_key, parent_key, unidades
  FROM `projeto.dataset.tabela_jira`
),
soma_filhos AS (
  SELECT parent_key, SUM(unidades) AS unidades_filhos
  FROM base
  WHERE parent_key IS NOT NULL AND unidades IS NOT NULL
  GROUP BY parent_key
)
SELECT
  b.issue_key,
  b.parent_key,
  b.unidades,
  COALESCE(b.unidades, sf.unidades_filhos, 0) AS unidades_exibicao,
  b.unidades AS unidades_total
FROM base b
LEFT JOIN soma_filhos sf ON sf.parent_key = b.issue_key
```

> ⚠️ A view cobre **2 níveis** (pai → filho). Para 3+ níveis (pai → filho → neto) o SQL precisa de CTE recursiva; o Apps Script (seção abaixo) já é recursivo.

### Google Sheets

Colunas: `A = issue_key` · `B = parent_key` · `C = unidades`

| Coluna | Fórmula (linha 2) |
|---|---|
| `D` unidades_exibicao | `=IF(C2<>"", C2, SUMIF($B$2:$B, A2, $C$2:$C))` |
| `E` unidades_total | `=IF(C2<>"", C2, "")` |

O Looker lê a coluna `E` para totais e a `D` só para exibição.

### Apps Script (recursivo)

Arquivo: [`ROLLUP_UNIDADES_PAI_FILHO.gs`](ROLLUP_UNIDADES_PAI_FILHO.gs) — função `calcularUnidadesComRollup(issues)` devolve `unidadesExibicao` por issue e `totalGeral` (soma só valores originais).

## 4. Configuração no Looker Studio

1. Fonte de dados = view do BQ (ou aba do Sheets) com as 2 colunas.
2. Scorecards / totais / gráficos agregados → métrica `unidades_total` (Soma).
3. Tabela de detalhe → dimensão `issue_key` + métrica `unidades_exibicao`.
4. Nunca misturar as duas métricas no mesmo scorecard.

## 5. Checklist de validação

- [ ] Total do dashboard = soma manual das unidades **dos filhos + issues com valor próprio**.
- [ ] Pai sem valor próprio mostra a soma dos filhos na tabela.
- [ ] Pai sem valor próprio **não** altera o total.
- [ ] Filtros (BU, marca, campanha, veículo) mantêm o total coerente.

## 6. Erros comuns

| Erro | Efeito | Correção |
|---|---|---|
| Somar `unidades_exibicao` no total | Duplicidade (pai + filhos) | Usar `unidades_total` |
| Preencher unidade no pai **e** nos filhos | Conta nos dois (valores originais) | Unidade só no filho |
| Hierarquia com 3+ níveis na view SQL | Pai do topo fica incompleto | CTE recursiva ou Apps Script |
| Filho sem `parent_key` na sync | Vira "pai" e entra como valor próprio | Garantir `parent_key` na extração do Jira |

---

*Treinamento NC Tool · Unilever BR × Grasp*
