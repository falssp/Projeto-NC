# 🏆 Simulador de Leilão CPM

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/simulador-leilao/

Simule estratégias de lance programático, win rate e custo efetivo em leilões CPM.

## Funcionalidades

### Configuração
- Tipo de leilão: 2º preço (padrão programático) ou 1º preço (SSP moderno)
- Número de simulações: Monte Carlo via distribuição normal (1.000 a 100.000)
- Floor price configurável
- Lance via slider interativo ou campo numérico

### Concorrentes
- Até 8 concorrentes configuráveis
- Cada um com CPM médio e desvio padrão (distribuição normal)
- Simula variabilidade real do mercado

### Resultados
- Win rate estimado para o lance configurado
- CPM efetivo médio (preço pago, não o lance)
- Impressões por dia com o orçamento definido
- Insight automático: lance muito baixo, muito alto ou adequado

### Curva de Win Rate
- Tabela com 13 pontos de lance (R$ 2 a R$ 40)
- Win rate, CPM efetivo, impressões e custo estimado por ponto
- Destacado: o lance atual do usuário
- Export: copiar resumo ou baixar CSV

## Metodologia
Simulação Monte Carlo: para cada leilão, gera bids aleatórios de cada concorrente via distribuição normal (média ± desvio padrão). Conta vitórias quando seu lance é o maior e está acima do floor. No 2º preço, o custo pago é o 2º maior lance; no 1º preço, é o próprio lance.

## Dados e privacidade
- Sem backend — simulação 100% no browser
- Funciona offline após carregamento
