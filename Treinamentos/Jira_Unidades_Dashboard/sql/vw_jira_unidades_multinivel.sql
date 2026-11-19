-- View MULTI-NÍVEL (3+ níveis). Premissa: unidade preenchida só nas issues de baixo.
-- O pai exibe a soma de TODOS os descendentes.
CREATE OR REPLACE VIEW `projeto.dataset.vw_jira_unidades` AS
WITH RECURSIVE base AS (
  SELECT issue_key, parent_key, unidades
  FROM `projeto.dataset.tabela_jira`
),
arvore AS (
  SELECT issue_key AS raiz, issue_key AS descendente FROM base
  UNION ALL
  SELECT a.raiz, b.issue_key
  FROM arvore a
  JOIN base b ON b.parent_key = a.descendente
),
soma AS (
  SELECT a.raiz, SUM(d.unidades) AS unidades_desc
  FROM arvore a
  JOIN base d ON d.issue_key = a.descendente
  WHERE a.descendente <> a.raiz
  GROUP BY a.raiz
)
SELECT
  b.issue_key,
  b.parent_key,
  b.unidades,
  COALESCE(b.unidades, s.unidades_desc, 0) AS unidades_exibicao,
  b.unidades AS unidades_total
FROM base b
LEFT JOIN soma s ON s.raiz = b.issue_key;
