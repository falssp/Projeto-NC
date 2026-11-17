# Calculadora de ROAS e ROI

Ferramenta de análise de retorno sobre investimento em mídia paga, com cálculo de breakeven e simulação de cenários de budget.

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/calculadora-roas/

## Abas

### 1 — Análise de ROAS
- ROAS atual, ROI%, lucro bruto após COGS
- Breakeven ROAS automático pela margem bruta
- Gauge visual com zonas: abaixo do breakeven / sub-meta / acima da meta
- Tabela de referência por vertical

### 2 — Breakeven e Meta
- Breakeven ROAS = 100 ÷ Margem%
- CPA máximo sustentável = Ticket × Margem%
- Receita e conversões necessárias para a meta
- Alerta se CPA atual ultrapassa o limite

### 3 — Cenários de Budget
- Simulação +20% / +50% / +100% de budget
- Modelo: `Conv_base × (Budget_novo ÷ Budget_base)^expoente`
- Expoente configurável (padrão 0.7)
- Gráfico de ROI por cenário + recomendação de melhor retorno marginal

## Fórmulas

| Métrica | Fórmula |
|---|---|
| ROAS | Receita ÷ Investimento |
| ROI % | (Receita − Investimento) ÷ Investimento × 100 |
| Breakeven ROAS | 100 ÷ Margem% |
| CPA Máximo | Ticket × Margem% ÷ 100 |
| Conversões (cenário) | Conv_base × (Budget_novo ÷ Budget_base)^exp |
