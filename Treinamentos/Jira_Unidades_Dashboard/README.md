# Jira → Dashboard | Unidades Pai/Filho

Documentação completa de como contabilizar unidades de tarefas filhas no pai (Jira) **sem duplicar** no total do dashboard (BigQuery/Sheets → Looker Studio).

## Acesso

🔗 **[https://falssp.github.io/Projeto-NC/Treinamentos/Jira_Unidades_Dashboard/](https://falssp.github.io/Projeto-NC/Treinamentos/Jira_Unidades_Dashboard/)**

## Arquivos

| Arquivo | Descrição |
|---|---|
| `index.html` | Guia (HTML), gerado a partir do `.md` |
| `guia-unidades.md` | Guia (Markdown) — fonte principal |
| `sql/vw_jira_unidades_simples.sql` | View BigQuery, 2 níveis |
| `sql/vw_jira_unidades_multinivel.sql` | View BigQuery, 3+ níveis (CTE recursiva) |
| `ROLLUP_UNIDADES_PAI_FILHO.gs` | Rollup recursivo em Apps Script |
| `JIRA_EXTRACAO_UNIDADES.gs` | Exemplo de extração do Jira (não testado contra o Jira real) |
| `exemplos/dados_teste.csv` | Dados de teste com casos de borda |
| `exemplos/resultados_esperados.csv` | Resultados esperados (total = 31) |

## Manutenção

Editar o `guia-unidades.md` e regenerar o `index.html`; os dois devem ficar iguais em conteúdo.
