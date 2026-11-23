# 🎨 Rastreador de Performance de Criativos

Ferramenta para análise e comparação de criativos em campanhas de mídia digital. Identifica top performers, detecta fadiga criativa e gera recomendações de rotação.

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/rastreador-criativos/

## Funcionalidades

- **Entrada de criativos** — até 20 criativos com nome, formato, dimensão, impressões, cliques, conversões, gasto, receita, VTR e dias ativos
- **Cálculo automático** — CTR, CVR, CPA, ROAS e CPM calculados em tempo real por linha
- **Score composto** — ponderação por objetivo (CTR / CVR / CPA / ROAS / VTR)

### Aba Ranking
- Tabela ordenável por qualquer métrica
- Color coding: verde (top 25%), amarelo (médio), vermelho (bottom 25%)
- Card do melhor criativo com métricas destacadas
- Cards de resumo totais da campanha

### Aba Fadiga
- Frequência estimada por criativo
- Status: Escalar / Manter / Reduzir exposição / Pausar
- Recomendação de ação por nível de saturação

### Aba Por Formato
- Agrupamento por formato (Imagem, Vídeo, Carrossel, etc.)
- Gráfico de barras CSS comparando CTR por formato
- Tabela de médias: CTR, CVR e CPA por formato

### Aba Recomendações
- Lista de criativos para pausar (score < 40)
- Lista de criativos para escalar (score ≥ 70)
- Sugestões de variações do melhor criativo
- Alertas de fadiga de audiência
- Análise de concentração de budget (top 3)
- Recomendações específicas por objetivo

## Dados Salvos
- localStorage — até 5 campanhas salvas
- Carregamento e exclusão por nome

## Exportação
- Copiar relatório formatado para clipboard
- Baixar CSV com todos os dados calculados

## Tecnologia
- HTML/CSS/JS puro — zero dependências externas
- Responsivo, layout full-width
- Font: Space Grotesk
