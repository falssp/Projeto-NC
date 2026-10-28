# NC Tool

Conjunto de ferramentas standalone de AdOps para operações de mídia digital — naming, validação, mensuração, KPIs e referências. Tudo roda direto no browser, sem instalação, sem backend.

**Deploy:** [falssp.github.io/Projeto-NC/](https://falssp.github.io/Projeto-NC/)

---

## Ferramentas AdOps Guide

As ferramentas abaixo ficam em `/ferramentas/` e cobrem o fluxo completo de AdOps:

| Ferramenta | Descrição | Link |
|---|---|---|
| 📊 Calculadora de KPIs | CPM, CPC, CPA, CTR, ROAS e VTR em todas as direções — informe dois campos e o terceiro é calculado. Inclui benchmarks BR 2024/25. | `/ferramentas/kpi-calc/` |
| 🏷️ Gerador de Naming Convention | Monte a estrutura do nome de campanha arrastando blocos, escolha o separador e gere nomes em lote. Export CSV. | `/ferramentas/naming-convention/` |
| 🚀 Checklist de Go-Live | 40+ itens em 7 categorias: tracking, criativos, segmentação, budget, brand safety, ad server e processo. Progresso visual e export .txt. | `/ferramentas/checklist-golive/` |
| 🕐 Conversor de Timezone | Converte horários entre BRT, EST, PST, GMT, CET, JST e mais 8 fusos. Gera tabela de flight por plataforma de ad server. | `/ferramentas/timezone-converter/` |
| 📐 Calculadora de Alcance & Budget | Informe budget, alcance ou impressões (dois quaisquer) e calcula o terceiro. Simula cenários e compara CPM efetivo vs. benchmark. | `/ferramentas/alcance-budget/` |
| 📖 Glossário AdTech & Mídia | 60+ termos com definições, fórmulas e exemplos. Filtros por categoria (KPI, Programática, Vídeo, Plataforma, Privacy, Estratégia). | `/ferramentas/glossario-nc/` |

Todas as ferramentas têm botão **❓ Como usar** com guia inline de uso.

---

## Outras ferramentas no repo

O portal `/ferramentas/` também lista ferramentas para outros fluxos:

- **Naming & Taxonomia** — Creative Taxonomy, Dicionário UL, Grasp Naming, Location
- **IDs & Cruzamento** — Cruzador de IDs, Galileo IDs, Gerador de IDs UL
- **ADP & Planilhas** — Ad Name Sync, Comparador ADP, Contador ADP, Extractor de Fórmulas, Merge RM→ADP
- **Influencers** — Extrator de Influs, Extrator de Links, Influencer Name, Branded Buzz Taxonomy
- **AdOps Guide** — UTM Builder, Spec Finder, Calculadora de Mídia, Posicionamentos NC, Validador de Floodlight, Gerador de VAST Tag, Comparador de Tag, Checklist de QA, Decodificador TCF, Comparador de Plataformas, e mais

---

## Estrutura do repositório

```
Projeto-NC/
├── index.html              # Portal principal (NC Tool)
├── ferramentas/
│   ├── index.html          # Índice de todas as ferramentas
│   ├── kpi-calc/
│   ├── naming-convention/
│   ├── checklist-golive/
│   ├── timezone-converter/
│   ├── alcance-budget/
│   ├── glossario-nc/
│   └── ...                 # demais ferramentas
└── README.md
```

---

## Tecnologia

- **HTML/CSS/JS puro** — sem frameworks, sem CDN, sem dependências externas
- **Offline-first** — todas as ferramentas funcionam sem conexão após o primeiro carregamento
- **Single-file** — cada ferramenta é um único `index.html` autocontido
- **Deploy via GitHub Pages** — push para `main` publica automaticamente

---

## Design

**Ferramentas AdOps Guide** usam a paleta `navy`:

```
--navy:   #0D2137
--accent: #38BDF8
--bg:     #F0F4F8
--green:  #10B981
--yellow: #F59E0B
--red:    #EF4444
```

**Portal e índice** usam a paleta `azul`:

```
--azul:   #1F36C7
--escuro: #1a237e
--bg:     #f0f2ff
```

---

## Como contribuir

1. Clone o repo: `git clone https://github.com/falssp/Projeto-NC.git`
2. Crie ou edite a ferramenta em `/ferramentas/<nome>/index.html`
3. Adicione o card correspondente em `/ferramentas/index.html`
4. Push para `main` — o GitHub Pages publica automaticamente

**Padrão das ferramentas AdOps Guide:**
- Arquivo único `index.html` autocontido
- `max-width: 1400px` no layout
- Botão `❓ Como usar` no header com modal de ajuda
- Paleta navy (`--navy`, `--accent`, `--bg`, etc.)
- Favicon NC inline (data URI SVG)

---

## Deploy

GitHub Pages está configurado para servir a branch `main` da raiz do repositório.

URL de produção: `https://falssp.github.io/Projeto-NC/`

Não há pipeline de build — os arquivos HTML são servidos diretamente.

---

*NC Tool © 2026 · Unilever BR × Grasp*
