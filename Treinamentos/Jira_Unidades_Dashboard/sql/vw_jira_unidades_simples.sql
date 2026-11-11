-- View SIMPLES (2 níveis: pai -> filho). Troque projeto.dataset.tabela_jira pela tabela real.
-- Colunas esperadas: issue_key, parent_key, unidades (NULL = sem valor próprio).
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
  COALESCE(b.unidades, sf.unidades_filhos, 0) AS unidades_exibicao,  -- linha / detalhe
  b.unidades AS unidades_total                                       -- Looker soma SÓ esta nos totais
FROM base b
LEFT JOIN soma_filhos sf ON sf.parent_key = b.issue_key;
