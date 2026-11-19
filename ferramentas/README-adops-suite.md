# AdOps Suite

Conjunto de ferramentas standalone para operações de mídia digital — rodam direto no browser, sem instalação, sem dependências externas.

**Portal:** https://falssp.github.io/Projeto-NC/ferramentas/

---

## Ferramentas

### 🗺️ Campaign Setup Guide
**URL:** `/ferramentas/campaign-setup-guide/`

Guia passo a passo para subir campanhas do zero em 7 plataformas de mídia:
- Meta Ads, Google Ads, CM360, DV360, LinkedIn, TikTok, X Ads
- Sidebar de navegação por plataforma e grupo
- Cards expansíveis com campos detalhados: label, obrigatório/opcional, onde encontrar, tipo, opções e dica

---

### 🔗 UTM Builder
**URL:** `/ferramentas/utm-builder/`

Gerador de URLs com parâmetros UTM:
- 12 presets de plataforma (Meta, Google, DV360, LinkedIn, TikTok, X, Kwai, Pinterest, E-mail, WhatsApp)
- Preview ao vivo + botão copiar
- Toggles: forçar lowercase, substituir espaços por hífens
- QA checklist automático com 6 verificações
- Histórico dos últimos 10 URLs (localStorage)

---

### 🎨 Spec Finder
**URL:** `/ferramentas/spec-finder/`

Especificações técnicas de criativos por plataforma e formato:
- 37+ formatos de 7 plataformas
- Busca global por dimensão, formato ou extensão
- Filtro por tipo (Imagem, Vídeo, HTML5, Native, Carrossel)
- Botão "Copiar specs" formata bloco de texto para briefing

---

### 📊 Calculadora de Mídia
**URL:** `/ferramentas/calculadora-midia/`

4 modos de cálculo em abas:
1. **Projeção de Entrega** — budget + métricas → impressões, cliques, conversões, alcance
2. **Cálculo Reverso** — define meta → projeta budget necessário em 3 cenários
3. **Comparador de Cenários** — tabela comparativa de até 3 cenários com destaque nas melhores métricas
4. **Pacing Check** — status On Pace / Underpacing / Overpacing com barra visual e diagnóstico

---

### 📚 Glossário AdTech
**URL:** `/ferramentas/glossario-adtech/`

Dicionário de termos de AdTech em português (BR):
- 120+ termos com definições claras e contextualizadas para o mercado BR
- 6 categorias: Programmatic, Ad Server, Social Media Ads, Mensuração & Analytics, Formatos & Criativos, Mercado & Negócios
- Busca em tempo real com highlight
- Filtro por categoria
- Índice A-Z

---

## Visual

Todas as ferramentas seguem o mesmo sistema visual do NC Tool:

| Token | Valor |
|---|---|
| Header | `#1a237e` |
| Accent | `#1F36C7` |
| Highlight bg | `#e8ecfd` |
| Border | `#d6dbf2` |
| Page bg | `#f4f5fb` |

Layout full-width, font Space Grotesk (Google Fonts inline via `@import`).

---

## Deploy

Arquivos servidos via GitHub Pages. Cada ferramenta está em sua própria pasta com `index.html`:

```
ferramentas/
├── campaign-setup-guide/index.html
├── utm-builder/index.html
├── spec-finder/index.html
├── calculadora-midia/index.html
└── glossario-adtech/index.html
```
