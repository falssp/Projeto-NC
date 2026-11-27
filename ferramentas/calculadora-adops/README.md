# Calculadora AdOps

Ferramenta offline para cálculo de 22 métricas de AdOps a partir de dados base de campanha.

> 🔗 **[Abrir ferramenta](https://falssp.github.io/Projeto-NC/ferramentas/calculadora-adops/)**

---

## Como usar

1. Preencha os **Dados da campanha** (col. esquerda) — investimento, impressões, cliques, conversões etc.
2. As **métricas calculáveis** aparecem automaticamente na coluna da direita
3. Apenas métricas com dados suficientes são exibidas — sem entradas em branco ou erros
4. A aba **Docs & FAQ** (direita, abaixo) traz fórmulas, benchmarks BR e definições para cada métrica

---

## Métricas calculadas

### Custo por ação (12)

| Métrica | Fórmula |
|---|---|
| CPC — Custo por Clique | `Invest. ÷ Cliques` |
| CPM — Custo por Mil Impressões | `(Invest. ÷ Impr.) × 1.000` |
| vCPM — Viewable CPM | `(Invest. ÷ Impr. Viewáveis) × 1.000` |
| eCPM — CPM Efetivo (c/ bônus) | `Invest. ÷ (Impr. Pagas + Bônus) × 1.000` |
| CPA — Custo por Aquisição | `Invest. ÷ Conversões` |
| CPL — Custo por Lead | `Invest. ÷ Leads` |
| CPI — Custo por Instalação | `Invest. ÷ Instalações` |
| CPV — Custo por View | `Invest. ÷ Views` |
| CPCV — Custo por View Completa | `Invest. ÷ Views Completas` |
| CPE — Custo por Engajamento | `Invest. ÷ Engajamentos` |
| Ffee — Flat Fee → CPM Implícito | `(Flat Fee ÷ Impr.) × 1.000` |
| ZCost — Valor das Impr. Bônus | `(Impr. Bônus ÷ 1.000) × CPM pago` |

### Taxas de desempenho (7)

| Métrica | Fórmula |
|---|---|
| CTR — Click-Through Rate | `(Cliques ÷ Impr.) × 100` |
| VTR — View-Through Rate | `(Views ÷ Impr.) × 100` |
| VCR — Video Completion Rate | `(Views Completas ÷ Views) × 100` |
| CVR — Conversion Rate | `(Conversões ÷ Cliques) × 100` |
| View% — Viewability Rate | `(Impr. Viewáveis ÷ Impr.) × 100` |
| 1stImp% — First Impression Rate | `(Impr. 1st Position ÷ Impr.) × 100` |
| SOV — Share of Voice | `(Impr. ÷ Total Impr. Disponíveis) × 100` |

### Alcance (2)

| Métrica | Fórmula |
|---|---|
| Freq. — Frequência Média | `Impr. ÷ Usuários Únicos` |
| Reach — Alcance de Usuários Únicos | `Usuários Únicos` |

### Retorno (2)

| Métrica | Fórmula |
|---|---|
| ROAS — Return on Ad Spend | `Receita ÷ Invest.` |
| ROI — Return on Investment | `((Receita − Invest.) ÷ Invest.) × 100` |

---

## Inputs disponíveis

| Campo | ID |
|---|---|
| Investimento (R$) | `i-invest` |
| Impressões | `i-impr` |
| Cliques | `i-clk` |
| Conversões | `i-conv` |
| Leads | `i-leads` |
| Instalações | `i-install` |
| Engajamentos | `i-eng` |
| Views (vídeo) | `i-views` |
| Views completas | `i-viewsc` |
| Impressões viewáveis | `i-viewimpr` |
| Impressões 1st position | `i-1stimpr` |
| Impressões bônus (ZCost) | `i-bonus` |
| Usuários únicos | `i-uniq` |
| Total impressões disponíveis | `i-universe` |
| Receita gerada (R$) | `i-revenue` |
| Flat Fee — custo fixo (R$) | `i-ffee` |

---

## Funcionalidades

| Funcionalidade | Detalhe |
|---|---|
| Cálculo automático | Todas as métricas derivadas atualizam em tempo real ao digitar |
| Métricas condicionais | Só exibe métricas com dados suficientes — sem resultados vazios |
| Docs integrados | Acordeão com fórmula, quando usar, tipo e benchmark BR por métrica |
| FAQ integrado | 8 perguntas frequentes sobre uso e interpretação de métricas |
| Layout two-column | Col. esquerda: inputs + resultados · Col. direita: docs/FAQ |
| Light / dark | Suporte completo a tema claro e escuro via `prefers-color-scheme` |
| Localização | Valores em R$ com formatação pt-BR |
| 100% offline | HTML + CSS + JS em arquivo único — sem dependências externas de API |

---

## Arquivos

```
ferramentas/calculadora-adops/
├── index.html   ← Ferramenta completa (HTML + CSS + JS em arquivo único)
└── README.md
```

---

## Stack

- **Vanilla JS** — sem frameworks ou dependências de biblioteca
- **Google Fonts** — Plus Jakarta Sans + JetBrains Mono (via CDN)
- HTML + CSS vanilla com CSS custom properties para theming
