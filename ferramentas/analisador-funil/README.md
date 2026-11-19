# 📊 Analisador de Funil de Conversão

**AdOps Suite — NC Tools**
URL: https://falssp.github.io/Projeto-NC/ferramentas/analisador-funil/

---

## O que é

Ferramenta interativa para análise de funil click-to-conversion em campanhas digitais. Identifica gargalos, calcula taxas de conversão por etapa e compara com benchmarks de mercado por vertical.

## Funcionalidades

- **7 etapas configuráveis**: Impressões → Cliques → Landing → Produto → Cart → Checkout → Conversões
- **Ativação por etapa**: habilite/desabilite cada etapa conforme o modelo de campanha
- **Visualização do funil**: barras proporcionais coloridas por status (verde/amarelo/vermelho)
- **Benchmarks por vertical**: E-commerce, Lead Gen, App Install, Branding
- **Identificação de gargalo**: destaca automaticamente a etapa com maior drop-off crítico
- **Recomendações por etapa**: sugestões práticas baseadas no gargalo identificado
- **KPIs globais**: Taxa de Conversão Global, CTR, CPA, ROAS (com inputs de budget/receita)

## Métricas calculadas

| Métrica | Fórmula |
|---------|---------|
| Taxa de Conversão | Etapa N / Etapa N-1 × 100 |
| Drop-off | 100 - Taxa de Conversão |
| CTR | Cliques / Impressões × 100 |
| CPA | Budget / Conversões |
| ROAS | Receita / Budget |
| Conv. Global | Conversões / Impressões × 100 |

## Benchmarks por vertical

### E-commerce
- Impressões→Cliques: ≥1% ótimo, ≥0,3% ok
- Cliques→Landing: ≥80% ótimo, ≥50% ok
- Landing→Produto: ≥40% ótimo, ≥20% ok
- Produto→Cart: ≥15% ótimo, ≥8% ok
- Cart→Checkout: ≥60% ótimo, ≥30% ok
- Checkout→Conversão: ≥60% ótimo, ≥30% ok

### Lead Generation
- CTR: ≥2% ótimo, ≥0,5% ok
- Conversão final: ≥70% ótimo, ≥40% ok

---

*Parte do projeto [NC Tools — AdOps Suite](https://falssp.github.io/Projeto-NC/ferramentas/)*
