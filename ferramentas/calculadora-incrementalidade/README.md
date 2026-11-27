# Calculadora de Incrementalidade

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/calculadora-incrementalidade/

Ferramenta para planejamento e análise de testes de lift/incrementalidade em mídia digital.
Responde a pergunta: *quanto das conversões são realmente causadas pelos anúncios?*

## Funcionalidades

### Tab 1 — Dimensionamento do Teste
- Calcula tamanho de amostra necessário com fórmula estatística formal
- Parâmetros: CVR basal, MDE (efeito mínimo detectável), significância (90/95/99%), poder (80/90%)
- Calcula % de holdout recomendado e budget "perdido" para o grupo controle
- Alertas de amostra insuficiente para o período configurado

### Tab 2 — Configuração do Holdout
- Dimensiona grupos de teste e controle
- Estima receita em risco durante o período de holdout
- Guia de setup nativo por plataforma: Meta Conversion Lift Study, Google Ads Experiments, CM360/DV360 Audience Suppression, LinkedIn, TikTok
- Instrução para split geográfico quando não há ferramenta nativa

### Tab 3 — Análise de Resultados
- Teste Z bilateral com cálculo de p-value e Z-score
- Lift observado e conversões incrementais
- ROAS incremental e CPA incremental
- Interpretação automática: Significativo / Marginal / Não significativo
- Estimativa de % de conversões orgânicas sem os anúncios

## Stack
HTML/CSS/JS puro — zero dependências externas.
