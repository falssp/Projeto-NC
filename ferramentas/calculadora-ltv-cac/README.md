# Calculadora de LTV e CAC

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/calculadora-ltv-cac/

Ferramenta de análise de Lifetime Value (LTV), Customer Acquisition Cost (CAC) e ratio LTV:CAC para campanhas de performance digital.

## Funcionalidades

### Tab 1 — LTV e CAC Básico
- Calcula LTV com fórmula: `(Ticket × Freq × Margem%) / (1 - Retenção%)`
- Calcula CAC = Custo total / Clientes adquiridos
- Ratio LTV:CAC com gauge visual colorido por zona (crítico/atenção/saudável/excelente)
- Payback period em meses
- Timeline de receita acumulada por cliente (meses 1, 3, 6, 12, 24, 36)
- Insight automático com diagnóstico e recomendação

### Tab 2 — Análise por Cohort
- Até 4 cohorts mensais com dados de receita por período (mês 1, 2, 3, 6, 12)
- Breakeven por cohort (mês em que receita acumulada supera CAC)
- LTV projetado a 12 meses por cohort
- Destaque automático do melhor cohort
- Barras CSS comparativas

### Tab 3 — Meta de CPA por Canal
- CPA máximo sustentável baseado no LTV e ratio-alvo
- Fórmula: Max CAC = LTV / Ratio LTV:CAC alvo
- Distribuição por canal: Meta, Google, LinkedIn, TikTok, Programático
- Input de CPA atual por canal com status ✅/⚠️/❌
- Tabela de benchmarks LTV:CAC por vertical (e-commerce, SaaS, serviços, financeiro, educação, saúde)

## Uso recomendado

Preencha o Tab 1 com dados reais de ticket médio, frequência, retenção e margem — o LTV calculado é automaticamente usado no Tab 3 para definir CPAs máximos por canal.

## Tecnologia

- HTML/CSS/JS puro — zero dependências externas
- Layout full-width responsivo
- Fonte: Space Grotesk (Google Fonts)
- Moeda: R$ BRL (formato 1.000,00)
