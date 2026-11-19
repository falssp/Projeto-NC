# 💰 Calculadora de ROAS e Break-even

**AdOps Suite — NC Tools**
URL: https://falssp.github.io/Projeto-NC/ferramentas/calculadora-roas/

## O que é

Calculadora completa para análise de lucratividade de campanhas: ROAS mínimo para break-even, CPA máximo sustentável e simulação de cenários por nível de ROAS.

## 3 módulos

### 1. ROAS & Break-even
- Calcula ROAS de break-even baseado em ticket médio, margem bruta, custo fixo e taxa de plataforma
- Compara ROAS atual vs mínimo necessário
- Mostra lucro/prejuízo total e por pedido
- Gráfico de composição de custos por pedido

### 2. Simulador de Cenários
- Tabela com 7 cenários de ROAS (1x break-even até 5x)
- Mostra receita, lucro e ROI para cada cenário
- Destaca o cenário atual e o break-even

### 3. CPA Máximo
- Calcula CPA máximo baseado em % da margem disponível para mídia
- Faixas de alerta: ótimo / atenção / prejuízo
- Sugestões de meta de bidding para Google Ads e Meta (tCPA / Cost Cap)

## Fórmulas

```
Margem Líquida/Pedido = (Ticket × Margem%) − Custo Fixo − (Ticket × Taxa Plataforma%)
ROAS Break-even = Ticket ÷ Margem Líquida
CPA Máximo = Margem Líquida × (% Mídia / 100)
ROAS Atual = Receita ÷ Budget
ROI = (Lucro ÷ Budget) × 100
```

---
*Parte do projeto [NC Tools — AdOps Suite](https://falssp.github.io/Projeto-NC/ferramentas/)*
