# AdOps Mensuração

Ferramenta standalone de referência e construção de tags de mensuração digital. Roda 100% no browser, sem instalação, sem dependências externas.

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/adops-mensuracao/

---

## O que tem dentro

| Aba | Descrição |
|-----|-----------|
| **Tag vs Contador** | Tabela de 29 plataformas com suporte a Tag JS vs Impression Tracker. Filtro por segmento e busca livre. |
| **Construtor de Floodlight** | Gera URLs de Floodlight Counter, Floodlight Sales e VAST Tracking com todos os parâmetros (src=, cat=, type=, ord=, cost=, qty=, u1/u2). 4 formatos de saída: iFrame, gtag.js, Impression URL, GTM dataLayer. |
| **Construtor de Tracker** | Monta URLs de Impression Tracker, Click Tracker e VAST para CM360, DV360, IAS, DoubleVerify, MOAT, Nielsen, TTD e Amazon DSP. |
| **Analisador de Mensuração** | Cole qualquer tag ou URL — identifica tipo, extrai parâmetros com descrições e gera orientações. Detecta 12+ formatos. |
| **Formatos** | Referência de todos os formatos de mensuração com exemplos de código copiável. |
| **Glossário** | 33 termos de ad tech com definições, pesquisável. |
| **Checklist** | Checklist personalizado por ambiente, objetivo, ad server e parceiro de verificação. |

---

## Formatos detectados pelo Analisador

- Floodlight Counter (`ad.doubleclick.net/ddm/activity` sem `cost=`)
- Floodlight Sales (com `cost=` e `qty=`)
- Click Tracker CM360 (`ad.doubleclick.net/ddm/clk`)
- VAST Tracking URL (`<Tracking event=...>`)
- Meta Pixel (`fbevents.js` / `fbq(`)
- gtag.js / Floodlight via Google Tag
- IAS Tag (`adsafeprotected.com`)
- DoubleVerify (`doubleverify.com` / `dvtp_src`)
- MOAT Analytics (`moatads.com`)
- The Trade Desk (`insight.adsrvr.org`)
- Amazon DSP (`amazon-adsystem.com`)
- Social Pixel genérico

---

## Parâmetros Floodlight

| Parâmetro | Uso |
|-----------|-----|
| `src=` | Advertiser ID do CM360 |
| `cat=` | Activity Tag String |
| `type=` | Group Tag String |
| `ord=` | **Counter:** `[Random]` (cache-buster). **Sales:** Order ID único |
| `cost=` | Valor da transação (Sales only) |
| `qty=` | Quantidade (Sales only) |
| `u1=`…`u100=` | Custom Floodlight Variables |
| `npa=` | Non-Personalized Ads (LGPD/GDPR) |

---

## Tecnologia

- HTML + CSS + JS vanilla — zero dependências
- Google Fonts (Inter + JetBrains Mono)
- Tema claro/escuro automático (`prefers-color-scheme`) + toggle manual
- Funciona offline após primeiro carregamento

---

## Atualização

Substitua `index.html` por nova versão e faça push. O GitHub Pages atualiza em ~1 min.
