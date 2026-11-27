# 📊 Benchmarks de Mercado Digital BR

Ferramenta de referência para performance de publicidade digital no Brasil, com dados de IAB Brasil, Google Think, Meta Business Insights, DoubleVerify e Kantar — referência 2024/2025.

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/benchmarks-br/

---

## Funcionalidades

### Biblioteca de Benchmarks
- **60+ benchmarks** organizados por métrica: CTR, CPM, VTR, Viewability, CVR, CPC
- Cobertura de **7 plataformas**: Meta Ads, Google Search, Google Display, YouTube, DV360, LinkedIn, TikTok, X Ads, Programático
- Cada card exibe faixa mínima/máxima e mediana de mercado BR
- Barra visual de range com marcador de mediana

### Comparação com Sua Performance
- Em cada benchmark, clique em **"Comparar com minha performance"**
- Insira seu valor medido
- O sistema classifica automaticamente:
  - ✅ **Acima da mediana** — boa performance
  - ⚠️ **Abaixo da mediana** — dentro do range, mas atenção
  - ❌ **Fora do range** — abaixo do mínimo de referência
- O marcador do seu valor aparece na barra visual

### Filtros e Busca
- **Busca textual** por plataforma, formato ou métrica
- **Filtro por plataforma** (dropdown)
- **Filtro por métrica** (dropdown)
- **Abas por categoria**: CTR / CPM / VTR / Viewability / CVR / CPC / Todos

### Calculadora de CPM Sazonal
- Informe o CPM base (R$) e selecione o mês
- A ferramenta aplica o índice sazonal BR correspondente
- Resultado instantâneo em R$ ajustado

### Índice de Sazonalidade
Tabela de multiplicadores mensais para o mercado digital BR:
| Mês | Índice |
|-----|--------|
| Janeiro | ×0,7 |
| Fevereiro | ×0,8 |
| Março | ×0,9 |
| Abril–Maio | ×1,0 |
| Junho | ×0,95 |
| Julho | ×0,9 |
| Agosto | ×1,0 |
| Setembro | ×1,1 |
| Outubro | ×1,2 |
| **Novembro (Black Friday)** | **×1,5** 🔥 |
| Dezembro (Natal) | ×1,4 |

---

## Benchmarks Incluídos

### CTR (Click-Through Rate)
| Plataforma | Formato | Range | Mediana |
|-----------|---------|-------|---------|
| Meta Ads | Feed Imagem | 0,5–2,0% | 0,9% |
| Meta Ads | Feed Vídeo | 0,8–2,5% | 1,2% |
| Meta Ads | Stories | 0,3–1,5% | 0,7% |
| Meta Ads | Reels | 1,0–3,0% | 1,8% |
| Google Search | Branded | 5–15% | 8% |
| Google Search | Non-branded | 2–6% | 3,5% |
| Google Display | Banner | 0,03–0,15% | 0,07% |
| Google Display | Responsivo | 0,05–0,20% | 0,10% |
| YouTube | Pre-roll skip | 0,5–2,0% | 0,8% |
| YouTube | Bumper | 0,2–0,8% | 0,4% |
| DV360 | Display | 0,04–0,15% | 0,08% |
| DV360 | Vídeo | 0,3–1,2% | 0,6% |
| LinkedIn | Feed | 0,3–0,8% | 0,45% |
| LinkedIn | Message Ads | 2–6% | 3,5% |
| TikTok | In-Feed | 0,5–2,0% | 1,0% |
| TikTok | TopView | 1,5–4,0% | 2,5% |
| X Ads | Promoted Tweet | 0,3–1,2% | 0,6% |

### CPM (R$)
| Plataforma | Formato | Range (R$) | Mediana (R$) |
|-----------|---------|-----------|-------------|
| Meta Ads | Feed | 8–25 | 14 |
| Meta Ads | Stories | 5–18 | 10 |
| Meta Ads | Reels | 10–30 | 18 |
| Google Display | Display | 3–12 | 6 |
| YouTube | Pre-roll | 15–40 | 22 |
| YouTube | Bumper | 8–20 | 12 |
| DV360 | Display | 4–15 | 8 |
| DV360 | Vídeo | 15–45 | 25 |
| LinkedIn | Feed | 30–80 | 50 |
| TikTok | In-Feed | 10–35 | 20 |
| Programático | Open Market | 2–8 | 4 |
| Programático | PMPs | 6–20 | 12 |

### VTR, Viewability, CVR e CPC
Consulte a ferramenta para todos os valores — mais de 60 benchmarks no total.

---

## Metodologia

> Benchmarks baseados em dados públicos de IAB Brasil, Google Think, Meta Business Insights, DoubleVerify, Nielsen e Kantar — referência mercado BR 2024/2025.

**Avisos importantes:**
- Valores variam por vertical, audiência, qualidade criativa e momento de campanha
- Use como referência de mercado, não como garantia de performance
- Atualizar periodicamente conforme novos relatórios de mercado

---

## Tecnologia

- HTML5 + CSS3 + JavaScript vanilla
- Zero dependências externas
- Funciona offline (após primeiro carregamento)
- Layout responsivo full-width
