# Passo a passo: Jira → Google Sheets → Looker Studio

**Para quem não tem BigQuery.** Este caminho usa só Jira, uma planilha Google e o Looker Studio. O rollup (pai = soma dos filhos, total sem duplicar) é calculado pelo Apps Script e gravado já pronto na planilha.

> **Antes de começar:** as chamadas ao Jira e a gravação na planilha **não foram testadas em ambiente real** (só a lógica do cálculo foi). Siga o passo a passo na ordem; cada etapa tem um teste que mostra se está funcionando.

## O que você precisa

| Item | Detalhe |
|---|---|
| Conta Atlassian | Com permissão para ver o projeto no Jira Cloud |
| API token do Jira | Criado no passo 2 |
| Planilha Google | Nova ou existente (o script cria a aba `Jira_Unidades`) |
| Looker Studio | Conta Google com acesso à planilha |
| Arquivos desta pasta | `ROLLUP_UNIDADES_PAI_FILHO.gs` e `JIRA_EXTRACAO_UNIDADES.gs` |

## Passo 1 — Criar a planilha e o projeto do Apps Script

1. Crie (ou abra) uma planilha Google.
2. Menu **Extensões → Apps Script**. Abre o editor com um arquivo `Código.gs`.
3. Renomeie o projeto (ex.: `Jira Unidades`).
4. No arquivo `Código.gs`, apague tudo e cole o conteúdo de `ROLLUP_UNIDADES_PAI_FILHO.gs`. Renomeie o arquivo para `ROLLUP_UNIDADES_PAI_FILHO`.
5. Clique em **+ → Script** e crie um segundo arquivo `JIRA_EXTRACAO_UNIDADES`. Cole o conteúdo de `JIRA_EXTRACAO_UNIDADES.gs`.
6. Salve (ícone de disquete).

**Importante:** os dois arquivos precisam estar no **mesmo projeto**. O segundo usa a função do primeiro.

## Passo 2 — Criar o API token do Jira

1. Acesse `https://id.atlassian.com/manage-profile/security/api-tokens`.
2. **Create API token**, dê um nome (ex.: `Sheets Unidades`) e copie o token.
3. Guarde o token só para o passo 4. **Nunca** cole em código, em chat ou em repositório.

## Passo 3 — Ajustar a configuração do script

No arquivo `JIRA_EXTRACAO_UNIDADES`, edite o bloco `JIRA_CFG`:

| Campo | O que colocar | Exemplo |
|---|---|---|
| `DOMINIO` | Domínio do seu Jira, sem `https://` | `suaempresa.atlassian.net` |
| `JQL` | Busca que traga **pais e filhos** do escopo inteiro | `project = UL ORDER BY key ASC` |
| `CAMPO_UNIDADES` | ID do campo de unidades (passo 6) | `customfield_10123` |

**Regra do JQL:** nunca filtre só os filhos nem só um status. Se o pai ficar de fora, o filho vira "órfão" e o rollup quebra. Filtros ficam no Looker.

Deixe `CAMPO_UNIDADES` como está por enquanto; você descobre o ID no passo 6.

## Passo 4 — Guardar as credenciais

1. No editor, escolha a função **`configurarCredenciaisJira`** na lista ao lado do botão **Executar** e clique em **Executar**.
2. Na primeira vez o Google pede autorização: **Revisar permissões** → escolha sua conta → **Avançado** → **Acessar (nome do projeto)** → **Permitir**. (O script precisa acessar a planilha e fazer requisições externas.)
3. Volte à planilha: aparecem dois pop-ups. Informe o **e-mail** da conta Atlassian e o **API token** do passo 2.
4. Aparece "Credenciais salvas para o seu usuário".

As credenciais ficam nas propriedades do **seu usuário**, não no código.

## Passo 5 — Testar a conexão

1. Execute a função **`testarConexaoJira`**.
2. Abra **Execução** (menu lateral) ou **Ver → Registros** e confira: `Conectado como: <seu nome>`.

| Erro | Causa provável | O que fazer |
|---|---|---|
| `Jira HTTP 401` | E-mail ou token errado | Refazer o passo 4 |
| `Jira HTTP 404` | Domínio errado | Corrigir `DOMINIO` (sem `https://`) |
| `Jira HTTP 403` | Sem permissão | Pedir acesso ao projeto |
| `Defina JIRA_EMAIL e JIRA_TOKEN` | Credenciais não salvas | Refazer o passo 4 |

## Passo 6 — Descobrir o ID do campo de unidades

**Opção A (pelo script):**

1. Execute **`listarCamposJira`**. Ele procura campos com "unidade" no nome.
2. Nos registros aparece algo como `customfield_10123 | Unidades (custom)`. Copie o ID.
3. Se o nome do seu campo for outro (ex.: "Quantidade"), edite a chamada para `listarCamposJira('quantidade')` ou altere o termo padrão.

**Opção B (pela interface, precisa ser admin do Jira):** Configurações do Jira → Issues → Campos personalizados → abra o campo → o ID aparece na URL (`customfield_XXXXX`).

Cole o ID em `CAMPO_UNIDADES` e salve.

**Atenção:** se houver dois campos com nomes parecidos, confirme qual é o que está preenchido nas tarefas filhas (abra uma tarefa filha no Jira e compare).

## Passo 7 — Rodar a sincronização

1. Execute **`sincronizarUnidadesParaPlanilha`**.
2. Nos registros aparece: `Issues gravadas: N | Total geral (unidades_total): X`.
3. Na planilha surge a aba **`Jira_Unidades`** com 5 colunas:

| Coluna | Conteúdo |
|---|---|
| `issue_key` | Chave da issue |
| `parent_key` | Chave do pai (vazio se não tem) |
| `unidades` | Valor próprio no Jira (vazio se não tem) |
| `unidades_exibicao` | Para o pai sem valor: soma dos descendentes |
| `unidades_total` | Valor próprio (vazio no pai sem valor) — **é o que o Looker soma** |

Cada execução **substitui** o conteúdo da aba. Não edite a aba na mão.

## Passo 8 — Validar o resultado

Faça com uma amostra pequena antes de confiar no total.

- [ ] Escolha um pai conhecido; some à mão as unidades dos filhos no Jira; compare com `unidades_exibicao` desse pai.
- [ ] Some a coluna `unidades_total` (ex.: `=SUM(E2:E)`) e compare com a soma manual de todas as issues com valor próprio.
- [ ] Conte issues na aba e compare com o resultado do JQL no Jira (mesma contagem).
- [ ] Procure órfãos: `parent_key` preenchido que não existe em `issue_key`.
- [ ] Procure pai com valor próprio **e** filhos com valor (conta nos dois).

Se o total não bater, veja a tabela de problemas no fim.

## Passo 9 — Agendar a atualização

1. No editor, ícone de **relógio (Acionadores)** → **Adicionar acionador**.
2. Função: `sincronizarUnidadesParaPlanilha` · Origem: **Baseado em tempo** · Escolha a frequência (ex.: a cada hora ou diária).
3. Salve. Confira depois em **Execuções** se rodou sem erro.

O Apps Script tem limite de tempo por execução (alguns minutos). Se o projeto for muito grande e der erro de tempo, restrinja o escopo no JQL (por exemplo, por período de criação), mantendo sempre pais e filhos juntos.

## Passo 10 — Conectar no Looker Studio

1. Acesse `https://lookerstudio.google.com` → **Criar → Fonte de dados**.
2. Conector **Planilhas Google** → escolha a planilha → aba **`Jira_Unidades`**.
3. Marque **Usar a primeira linha como cabeçalho** → **Conectar**.
4. Confira os tipos: `unidades`, `unidades_exibicao` e `unidades_total` como **Número** (se vier como texto, mude para Número).
5. **Criar relatório**.

**Montagem do relatório:**

| Elemento | Campos | Agregação |
|---|---|---|
| Scorecard / totais / gráficos agregados | `unidades_total` | Soma |
| Tabela de detalhe | `issue_key` + `unidades_exibicao` | Soma |

**Nunca** coloque `unidades_exibicao` em total, scorecard ou gráfico agregado.

O Looker Studio guarda cache da fonte. Se o dado novo não aparece, use **Atualizar dados** no relatório ou ajuste a atualização da fonte.

## Passo 11 — Dimensões que só existem no pai (BU, marca, campanha, veículo)

Se campanha, BU etc. estão preenchidas só no pai, o total por dimensão (que soma linhas de filhos) fica sem agrupamento. Duas saídas:

1. **Preencher a dimensão nos filhos** no Jira.
2. **Herdar do pai** no script: adicionar a dimensão ao `fields` da busca e copiá-la para o filho na montagem das linhas. Hoje o script não faz isso; precisa de ajuste (pedir para implementar quando a dimensão estiver definida).

## Problemas comuns

| Sintoma | Causa provável | Solução |
|---|---|---|
| Aba vazia ou `Issues gravadas: 0` | JQL sem resultado ou sem permissão | Testar o mesmo JQL na busca avançada do Jira |
| `unidades` vazia para todas as issues | ID do campo errado | Refazer o passo 6 e comparar com uma tarefa preenchida |
| Aviso "valor não numérico" nos registros | Campo é texto/lista, não número | Usar um campo numérico; o valor ruim é tratado como vazio |
| Pai mostra 0 | Filhos sem valor, ou filhos fora do JQL | Conferir valores e o JQL (pais e filhos juntos) |
| Total maior que o esperado | Pai com valor próprio e filhos com valor, ou soma de `unidades_exibicao` | Unidade só no filho; usar `unidades_total` |
| Total menor que o esperado | Filhos fora do JQL ou valores vazios | Conferir JQL e preenchimento |
| `Jira HTTP 410` ou erro no endpoint de busca | Endpoint de busca mudou | Conferir na documentação atual da API do Jira Cloud e ajustar a URL em `buscarIssuesJira` |
| Erro de tempo de execução | Projeto muito grande | Restringir o JQL mantendo pais e filhos |
| Looker não atualiza | Cache da fonte | Atualizar dados no relatório |

## Quando migrar para BigQuery

Se a base crescer ou houver mais de 3 níveis, o mesmo cálculo existe em SQL (`sql/vw_jira_unidades_multinivel.sql`). A tabela de entrada precisa ter `issue_key`, `parent_key` e `unidades`, os mesmos campos que o script extrai.

---

*Treinamento NC Tool · Unilever BR × Grasp*
