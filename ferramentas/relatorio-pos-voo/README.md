# ✈️ Relatório Pós-Voo de Campanha

**AdOps Suite — NC Tools**
URL: https://falssp.github.io/Projeto-NC/ferramentas/relatorio-pos-voo/

## O que é

Gerador de relatório pós-voo (post-flight report) com preview em tempo real. Preencha os dados e o relatório formatado é construído automaticamente, pronto para exportar como PDF.

## Funcionalidades

- **Preview em tempo real** à direita enquanto preenche os dados
- **Dados gerais**: nome, cliente, período, objetivo, responsável
- **Budget**: planejado vs realizado com delta automático
- **Métricas totais**: impressões, cliques, conversões, receita, viewability
- **Por plataforma**: tabela com até N plataformas (CM360, Meta, Google, TikTok, LinkedIn…)
- **KPIs calculados automaticamente**: CTR, CPM, CPC, CPA, ROAS
- **Narrativa automática**: parágrafo descritivo gerado a partir dos dados
- **Análise qualitativa**: destaques positivos, pontos de melhoria, recomendações
- **Export PDF** via print do navegador

## Como usar

1. Preencha nome da campanha e cliente
2. Defina período e objetivo
3. Insira verba planejada e realizada
4. Adicione impressões, cliques e conversões
5. Clique em **+ Adicionar plataforma** para inserir dados por canal
6. Preencha análise qualitativa nas caixas de texto
7. Clique **🖨️ Exportar PDF** para salvar

## Métricas calculadas

| Métrica | Fórmula |
|---------|---------|
| CTR | Cliques / Impressões × 100 |
| CPM | Budget / Impressões × 1.000 |
| CPC | Budget / Cliques |
| CPA | Budget / Conversões |
| ROAS | Receita / Budget |
| Execução % | Budget Real / Budget Planejado × 100 |

---
*Parte do projeto [NC Tools — AdOps Suite](https://falssp.github.io/Projeto-NC/ferramentas/)*
