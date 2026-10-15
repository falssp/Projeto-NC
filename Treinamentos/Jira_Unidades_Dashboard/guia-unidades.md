# Jira → Dashboard: Unidades Pai/Filho sem Duplicidade

**Edição:** Out/26 · **Público:** AdOps / Taxonomia (UL) · **Fluxo:** Jira → BigQuery e/ou Google Sheets → Looker Studio

## Resumo (leia isto primeiro)

- No Jira, a tarefa **pai não tem unidade** e as **filhas têm**.
- O pai deve **mostrar** a soma dos filhos, mas essa soma **não pode entrar no total** (senão duplica).
- Solução: **duas colunas** na fonte de dados.
  - `unidades_exibicao` → o que aparece na linha (pai = soma dos filhos).
  - `unidades_total` → o que o Looker soma nos totais (pai = vazio).
- Nos totais, scorecards e gráficos agregados do Looker: **só `unidades_total`**.

---

## 1. Contexto e problema

O dashboard precisa contabilizar unidades por issue do Jira. As unidades são preenchidas nas tarefas filhas; o pai é só um agrupador sem valor. Duas exigências ao mesmo tempo:

1. O pai precisa **aparecer com o número** (soma dos filhos), para leitura no detalhe.
2. O **total geral** não pode contar o mesmo número duas vezes (uma no pai agregado, outra em cada filho).

> O número do pai é só **exibição**. A unidade de verdade vive no filho.

## 2. Glossário

| Termo | Significado |
|---|---|
| **Valor próprio** | Unidade preenchida na própria issue (inclui `0`). Vazio/NULL = não tem. |
| **Rollup** | Soma dos valores dos descendentes mostrada no pai. |
| **Exibição** | Número mostrado na linha (valor próprio, ou rollup se o pai não tem). |
| **Total** | Número que entra nas somas do dashboard (só valores próprios). |
| **Órfão** | Issue cujo `parent_key` não existe na base carregada. |

## 3. A regra

| Coluna | O que é | Pai sem valor próprio | Issue com valor próprio |
|---|---|---|---|
| `unidades_exibicao` | Aparece na linha | Soma dos descendentes | Valor próprio |
| `unidades_total` | Looker soma nos totais | **vazio / NULL** | Valor próprio |

- Tabela de detalhe → `unidades_exibicao`.
- Scorecard, total, gráfico agregado → **somente** `unidades_total`.

### Exemplo

| Issue | Pai | unidades (Jira) | unidades_exibicao | unidades_total |
|---|---|---|---|---|
| UL-100 | — | — | 8 | — |
| UL-101 | UL-100 | 5 | 5 | 5 |
| UL-102 | UL-100 | 3 | 3 | 3 |
| UL-200 | — | 10 | 10 | 10 |
| **Total do dashboard** | | | 26 (errado) | **18 (correto)** |

Somando `unidades_exibicao` o total seria 26 (o 8 do pai é duplicado). Com `unidades_total`, é 18.

## 4. Premissas e decisões

| Decisão | Motivo |
|---|---|
| Unidade é preenchida **só no filho** (nível mais baixo) | Evita ambiguidade; é a regra que o dashboard assume. |
| Total soma só **valores próprios** | É a forma de nunca contar rollup. |
| `0` conta como valor próprio, vazio não | Zero é informação ("sem unidades"); vazio é "não preenchido". |
| Pai com valor próprio **e** filhos com valor = **conta nos dois** | A regra não adivinha intenção; é erro de preenchimento (ver seção 10). |
| Cálculo na **camada de dados** (BQ/Sheets), não no Looker | O Looker só agrega o que a fonte entrega; ele não distingue valor original de herdado. |
| Carga sempre com a **hierarquia inteira** | Filtrar na carga deixa filhos órfãos e quebra o rollup. Filtrar no Looker. |

## 5. Fluxo de dados

```
Jira (issues: key, parent, unidades)
        │  extração (Apps Script / sync existente)
        ▼
BigQuery tabela_jira  ──►  view vw_jira_unidades (exibicao + total)
   ou                                   │
Google Sheets (colunas D e E)           ▼
                              Looker Studio (detalhe = exibicao | totais = total)
```

## 6. Extração do Jira

Cada issue precisa chegar na fonte com **3 campos**:

| Campo na fonte | Origem no Jira |
|---|---|
| `issue_key` | chave da issue (ex.: `UL-101`) |
| `parent_key` | `fields.parent.key` (vazio se não tem pai) |
| `unidades` | campo customizado de unidades (ID `customfield_XXXXX`; confirmar em Jira → Configurações → Campos). **Vazio = NULL**, não `0`. |

Exemplo pronto em [`JIRA_EXTRACAO_UNIDADES.gs`](JIRA_EXTRACAO_UNIDADES.gs). **Não foi testado contra o Jira real**: ajustar domínio, JQL e ID do campo, e conferir o endpoint de busca na documentação atual da API.

Regra de ouro: o JQL traz **pais e filhos** do escopo inteiro. Quem filtra é o Looker.

## 7. Implementação

### 7.1 BigQuery — view simples (2 níveis: pai → filho)

Arquivo: [`sql/vw_jira_unidades_simples.sql`](sql/vw_jira_unidades_simples.sql)

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

> ⚠️ Só enxerga **filhos diretos**. Num cenário pai → filho → neto, o pai do topo mostra 0 se o filho do meio não tem valor.

### 7.2 BigQuery — view multi-nível (3+ níveis)

Arquivo: [`sql/vw_jira_unidades_multinivel.sql`](sql/vw_jira_unidades_multinivel.sql)

```sql
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
LEFT JOIN soma s ON s.raiz = b.issue_key
```

O pai exibe a soma de **todos** os descendentes (premissa: valores só nas issues de baixo).

> Lógica validada em **DuckDB** com os dados de `exemplos/`. Na 1ª execução no BigQuery, conferir o total contra a soma manual.

### 7.3 Google Sheets — 2 níveis

Colunas: `A` issue_key · `B` parent_key · `C` unidades

| Coluna | Fórmula (linha 2) |
|---|---|
| `D` unidades_exibicao | `=IF(C2<>"", C2, SUMIF($B$2:$B, A2, $C$2:$C))` |
| `E` unidades_total | `=IF(C2<>"", C2, "")` |

### 7.4 Google Sheets — até 3 níveis (sem referência circular)

Adicionar a coluna `F` (chave do avô) e trocar a `D`:

| Coluna | Fórmula (linha 2) |
|---|---|
| `F` avo_key | `=IFERROR(VLOOKUP(B2, $A$2:$B, 2, FALSE), "")` |
| `D` unidades_exibicao | `=IF(C2<>"", C2, SUMIF($B$2:$B, A2, $C$2:$C) + SUMIF($F$2:$F, A2, $C$2:$C))` |
| `E` unidades_total | `=IF(C2<>"", C2, "")` |

Cada nível extra exige mais uma coluna auxiliar (bisavô etc.). A partir de 4 níveis, prefira BigQuery ou Apps Script. Fórmulas testadas em LibreOffice com os dados de `exemplos/`; o comportamento no Google Sheets é equivalente, mas valide na 1ª vez.

### 7.5 Apps Script (recursivo, qualquer profundidade)

Arquivo: [`ROLLUP_UNIDADES_PAI_FILHO.gs`](ROLLUP_UNIDADES_PAI_FILHO.gs). A função `calcularUnidadesComRollup(issues)` recebe `[{key, parentKey, unidades}]` e devolve cada issue com `unidadesExibicao` e o `totalGeral` (só valores próprios).

## 8. Configuração no Looker Studio

1. Fonte de dados = view do BigQuery (ou aba do Sheets) com as duas colunas.
2. Scorecards, totais, gráficos agregados → métrica `unidades_total` (**Soma**).
3. Tabela de detalhe → dimensão `issue_key` + métrica `unidades_exibicao`.
4. Nunca colocar `unidades_exibicao` e `unidades_total` no mesmo scorecard.
5. Para tabelas com pai e filhos juntos, esperar linha de pai **sem** valor na coluna de total (é proposital).

### Dimensões que só existem no pai (BU, marca, campanha, veículo)

Se a dimensão está preenchida só no pai, o total por dimensão (que soma linhas de filho) fica sem agrupamento. Solução: herdar a dimensão do pai na view (padrão `LEFT JOIN` no `parent_key`):

```sql
SELECT b.*, p.campanha AS campanha_pai
FROM base b
LEFT JOIN base p ON p.issue_key = b.parent_key
```

(Padrão genérico; ajustar nomes de colunas à tabela real.)

### Limitação com filtros

`unidades_exibicao` do pai é calculada na **view**, sobre todos os filhos. Se um filtro do Looker (status, data) esconde alguns filhos, o pai continua mostrando a soma completa. O **total** continua correto (soma só filhos visíveis). Para decisões, confie em `unidades_total`; use a exibição do pai como referência de leitura.

## 9. Dados de teste

Arquivos em `exemplos/`: `dados_teste.csv` (entrada) e `resultados_esperados.csv` (saída esperada). **Total esperado: 31.**

## 10. Casos de borda (todos testados)

| Caso | Dados | Resultado | Observação |
|---|---|---|---|
| Pai sem valor, 2 filhos | A-1 → 5 e 3 | pai exibe 8, total 8 | Caso padrão |
| Pai **com** valor + filho com valor | B-1=10, B-2=4 | total 14 (conta nos dois) | Erro de preenchimento: unidade só no filho |
| Filho `0` e filho vazio | C-2=0, C-3=vazio | pai exibe 0 | `0` é valor próprio, vazio não |
| Órfão (pai não está na base) | D-1=7, pai inexistente | conta 7 | Vira valor próprio; carregar hierarquia inteira |
| 3 níveis | E-1 → E-2 → E-3=2 | simples: E-1=0 ❌ / multi-nível: E-1=2 ✅ | Usar view multi-nível |
| Ciclo de parentesco | X-1 ↔ X-2 | recursão não termina | Em teste local (DuckDB) travou; no BigQuery espere erro de limite de iterações. O Jira em princípio não permite ciclos, então o risco é dado corrompido na carga |

## 11. Checklist de validação

- [ ] Total do dashboard = soma manual dos valores próprios (filhos + issues com valor).
- [ ] Pai sem valor próprio mostra a soma dos filhos na tabela.
- [ ] Pai sem valor próprio **não** altera o total.
- [ ] Filtros (BU, marca, campanha, veículo) mantêm o total coerente.
- [ ] Nenhum órfão inesperado: `parent_key` que não existe em `issue_key`.
- [ ] Nenhum pai com valor próprio **e** filhos com valor.

Query para achar órfãos:

```sql
SELECT b.issue_key, b.parent_key
FROM `projeto.dataset.tabela_jira` b
LEFT JOIN `projeto.dataset.tabela_jira` p ON p.issue_key = b.parent_key
WHERE b.parent_key IS NOT NULL AND p.issue_key IS NULL
```

Query para achar pai com valor próprio e filhos com valor:

```sql
SELECT p.issue_key, p.unidades AS unidades_pai
FROM `projeto.dataset.tabela_jira` p
WHERE p.unidades IS NOT NULL
  AND EXISTS (
    SELECT 1 FROM `projeto.dataset.tabela_jira` f
    WHERE f.parent_key = p.issue_key AND f.unidades IS NOT NULL
  )
```

## 12. Erros comuns

| Erro | Efeito | Correção |
|---|---|---|
| Somar `unidades_exibicao` no total | Duplicidade | Usar `unidades_total` |
| Preencher unidade no pai **e** nos filhos | Conta nos dois | Unidade só no filho |
| View simples com 3+ níveis | Pai do topo incompleto | View multi-nível ou Apps Script |
| Filho sem `parent_key` na sync | Vira "pai" e entra como valor próprio | Garantir `parent_key` na extração |
| Carga filtrada (só filhos, sem os pais) | Filhos viram órfãos | Carregar hierarquia inteira |
| Campo vazio gravado como `0` na carga | Pai exibe 0 em vez de rollup correto | Gravar NULL quando o campo está vazio |
| Total somando linhas de pai | Duplicidade | Pai tem `unidades_total` vazio; conferir a métrica |

## 13. FAQ

**Por que não fazer o rollup direto no Looker?**
O Looker Studio soma o que a fonte entrega e não distingue valor original de herdado. Sem a coluna `unidades_total`, não há como excluir o pai do total.

**O pai pode ter unidade própria?**
Pode, mas se os filhos também tiverem, conta nos dois. A regra assume unidade só no filho.

**Qual fonte usar, BigQuery ou Sheets?**
BigQuery quando o volume ou os níveis crescem (view multi-nível, sem fórmulas frágeis). Sheets quando a base é pequena e a hierarquia tem até 3 níveis.

**Quando usar o Apps Script?**
Para calcular na própria sync (antes de gravar), com qualquer profundidade, ou para validar um total rapidamente.

**Como validar um total que parece errado?**
Rode as queries da seção 11 (órfãos e pai com valor + filhos) e compare com a soma manual de `unidades` das issues com valor próprio.

## 14. Limitações conhecidas

- View SQL simples cobre só 2 níveis; o Sheets chega a 3 com colunas extras.
- `unidades_exibicao` do pai não reage a filtros do Looker.
- Ciclos de parentesco quebram a view multi-nível.
- Não testados em ambiente real: execução no BigQuery, execução no Google Sheets e `JIRA_EXTRACAO_UNIDADES.gs` contra o Jira. A lógica das views e fórmulas foi validada localmente (DuckDB e LibreOffice) com os dados de `exemplos/`.

## 15. Arquivos desta pasta

| Arquivo | Descrição |
|---|---|
| `index.html` | Este guia (HTML) |
| `guia-unidades.md` | Este guia (Markdown) |
| `sql/vw_jira_unidades_simples.sql` | View BigQuery, 2 níveis |
| `sql/vw_jira_unidades_multinivel.sql` | View BigQuery, 3+ níveis |
| `ROLLUP_UNIDADES_PAI_FILHO.gs` | Rollup recursivo (exibição + total) |
| `JIRA_EXTRACAO_UNIDADES.gs` | Exemplo de extração do Jira (não testado) |
| `exemplos/dados_teste.csv` | Dados de teste |
| `exemplos/resultados_esperados.csv` | Resultados esperados (total 31) |

## 16. Histórico

| Data | Mudança |
|---|---|
| 15/10/2026 | Criação: regra de duas colunas, view simples, Sheets, Apps Script, Looker |
| 15/10/2026 | View BigQuery multi-nível |
| 15/10/2026 | Documentação completa: casos de borda, Sheets 3 níveis, extração Jira, FAQ, dados de teste |

---

*Treinamento NC Tool · Unilever BR × Grasp*
