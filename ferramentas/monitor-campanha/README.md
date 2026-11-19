# 🩺 Monitor de Saúde de Campanha

Dashboard de monitoramento diário para campanhas de mídia digital. Calcula um **Health Score 0–100** com alertas em tempo real, análise de pacing e matriz de saúde por placement.

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/monitor-campanha/

---

## Funcionalidades

### Score de Saúde Geral
- Score 0–100 com indicador visual 🟢🟡🟠🔴
- Decomposto em 4 sub-scores ponderados:
  - **Pacing (25%)** — aderência ao ritmo de entrega esperado
  - **Performance (35%)** — CPA, CTR, ROAS vs metas
  - **Qualidade (25%)** — Viewability, Frequência
  - **Budget (15%)** — alinhamento de gasto vs período decorrido

### Configuração de Campanha
- Nome, período (início/fim), budget total e gasto realizado
- Metas configuráveis: CPM máx, CTR mín, CPA máx, Viewability mín, Frequência máx, ROAS mín

### Placements / Ad Sets
- Adicione quantos placements quiser
- Campos: nome, plataforma, gasto, impressões, cliques, conversões, viewability, frequência, VTR, receita e status
- Plataformas suportadas: Meta Ads, Google Ads, DV360, LinkedIn, TikTok, CM360, YouTube, Programático, X Ads, Outro

### Alertas Ativos
- Gerados automaticamente com base nos dados vs metas
- Classificados por severidade: 🔴 Crítico → 🟠 Alto → 🟡 Médio → ℹ️ Info
- Cada alerta inclui **ação recomendada**

**Tipos de alerta:**
| Alerta | Trigger |
|--------|---------|
| CPA crítico | CPA > meta × 1,3 |
| CPA acima | CPA > meta |
| Frequência alta | Freq > limite |
| Viewability crítica | View < meta × 0,7 |
| Viewability baixa | View < meta |
| CTR muito baixo | CTR < meta × 0,5 |
| CPM acima | CPM > meta × 1,5 |
| Gasto sem impressões | Gasto > 0 e imp = 0 |
| Sem conversões | Gasto > 0, conv = 0, CPA definido |
| Underpacing | Pacing < 75% |
| Overpacing | Pacing > 130% |

### Análise de Pacing
- Budget realizado vs esperado (proporcional ao período decorrido)
- Dias decorridos / restantes
- Budget restante e **budget diário necessário**
- Barra visual comparativa

### Matriz de Saúde por Placement
- Tabela com métricas calculadas (CPM, CTR, CPA, Viewability, Frequência) coloridas vs metas
- 🟢 Meta atingida · 🟡 Próximo · 🔴 Fora da meta

### Tendência 7 Dias
- Cole dados tab-separados (Data, Impressões, Cliques, Conversões, Gasto)
- Sparklines com variação dia a dia

---

## Como Usar

1. Preencha os dados da campanha (nome, datas, budget)
2. Configure as metas de performance
3. Adicione os placements com métricas do dia
4. Clique **"Atualizar análise"** para ver o score e alertas
5. Use **"💾 Salvar"** para guardar a campanha no navegador (até 10 campanhas)
6. Use **"📋 Copiar relatório"** para compartilhar um resumo em texto

**Demo:** Clique em "Carregar dados de demonstração" para ver um exemplo completo com 5 placements simulados.

---

## Métricas Calculadas

| Métrica | Fórmula |
|---------|---------|
| CPM | Gasto / (Impressões / 1.000) |
| CTR | Cliques / Impressões × 100 |
| CPA | Gasto / Conversões |
| ROAS | Receita / Gasto |
| Pacing % | Gasto realizado / Gasto esperado × 100 |
| Budget diário | Budget restante / Dias restantes |

---

## Persistência

Dados salvos via `localStorage` — permanecem no navegador entre sessões. Até 10 campanhas armazenadas.

---

## Parte do NC AdOps Suite

| Ferramenta | Link |
|------------|------|
| QA Checklist | [/ferramentas/qa-checklist/](../qa-checklist/) |
| Simulador de Pacing | [/ferramentas/simulador-pacing/](../simulador-pacing/) |
| Analisador P2C | [/ferramentas/analisador-p2c/](../analisador-p2c/) |
| Detector de Discrepância | [/ferramentas/detector-discrepancia/](../detector-discrepancia/) |
| Budget Distribuidor | [/ferramentas/budget-distribuidor/](../budget-distribuidor/) |

---

*NC AdOps Suite — ferramentas para profissionais de mídia programática*
