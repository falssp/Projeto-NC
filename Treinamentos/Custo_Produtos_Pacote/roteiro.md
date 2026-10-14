# Roteiro — Custo de Produtos Vendidos em Pacote (ADP × BI)

**Apresentação:** Custo_Produtos_Pacote
**Data base:** Out/2026
**Responsável:** Felipe Lima (StormX Data & Tech)

---

## Slide 01 — Capa

> Hoje vamos falar de um problema que se repete: produtos de mídia vendidos em pacote, como o Masthead CPH, o Branded Mission e agora o Branded Buzz, e como medir o custo deles sem criar exceção no ADP.

---

## Slide 02 — O problema

> Ao quebrar o relatório do YouTube por Ad, Ad Group ou Ad ID, o custo do Masthead CPH aparece como R$0. A medição existe na plataforma; o custo só não consegue ser distribuído nessa granularidade. O risco é o BI ler R$0 como investimento zero, e a reação padrão ser mexer no ADP a cada produto novo.

---

## Slide 03 — Leilão vs. pacote

> No leilão, cada impressão tem custo próprio, então dá para atribuir custo ao Ad ID. No pacote, o valor é do período ou da iniciativa inteira. Analogia: alugar um outdoor por um dia. O valor é do dia, não de cada cartaz que passou por ele. A regra é: a granularidade do custo respeita o modelo comercial do produto.

---

## Slide 04 — Onde o custo mora

> YouTube tradicional: custo em Ad Group/Ad ID. Masthead CPH: custo na Insertion Order (flight). Branded Mission: custo na missão/flight, com paid, earned e creator separados. Branded Buzz: ainda a definir. O custo sobe de nível; as métricas de entrega continuam no anúncio.

---

## Slide 05 — O ADP já resolve

> Não precisa mudar o ADP. A coluna "Masthead ou Youtube?" já sinaliza o produto. A Insertion Order e o IO - Reduzido já representam o nível de deal/flight. O Line Item Motor já carrega o flight na string. O ajuste é como o BI lê essa estrutura.

---

## Slide 06 — Ajuste no BI

> Hoje o custo é colado no YouTube Ad ID. Quando "Masthead ou Youtube?" for Masthead, o custo deve ser colado na Insertion Order. A entrega fica em camada separada e o BI calcula CPM efetivo e custo por view. Registrar isso como regra única evita virar exceção.

---

## Slide 07 — Cada produto monta a string de um jeito

> Masthead CPH, Branded Mission e Mercado Livre concatenam 2 campos, sem delimitador, em minúsculo. A diferença está em como cada linha é identificada e nas validações: o Masthead exige IO com no mínimo 120 caracteres. Hoje isso está em fórmulas hardcoded por produto.

---

## Slide 08 — Config_Produtos e motor de montagem

> A aba Config_Produtos tem uma linha por produto com trigger, colunas fonte, delimitador, transformação, tamanho mínimo e mensagem de erro. O módulo VBA lê essa aba e monta a string. Produto novo é uma linha nova. Limite: se o produto precisar de um VLOOKUP novo contra uma tabela inexistente, essa parte continua manual. Salvar como .xlsm.

---

## Slide 09 — Checklist de novo posicionamento

> Antes de criar coluna no ADP ou planilha paralela: qual o modelo de custo, em que granularidade ele é atribuível, se já existe campo no ADP, quem mais vai registrar o dado e se a regra de montagem é igual a de um produto já cadastrado. Fonte única de dado, sem planilha de mídia paralela.

---

## Slide 10 — Encerramento

> "Think. Think. Think. and then automate."
