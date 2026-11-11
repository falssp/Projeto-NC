# Validador de Floodlight

Ferramenta standalone para validar tags Floodlight antes de elas irem ao ar. Zero dependências, roda 100% no browser.

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/validador-floodlight/

---

## O que valida

| Tipo | Detecção |
|------|----------|
| Floodlight Counter | `ad.doubleclick.net/ddm/activity/` sem `cost=` |
| Floodlight Sales | `ad.doubleclick.net/ddm/activity/` com `cost=` |
| gtag.js | Snippet `gtag('event', 'conversion', {...})` |
| VAST Tracking | Elemento `<Tracking event="...">` com URL Floodlight |

---

## Validações realizadas

### Erros críticos (⛔)
- `src=` ausente, vazio ou não-numérico (Advertiser ID inválido)
- `cat=` ausente ou vazio (Activity Tag String)
- `type=` ausente ou vazio (Group Tag String)
- `ord=` ausente
- **Sales com `ord=[Random]`** — causa duplicação garantida de transações
- **Sales sem `cost=`** — receita não registrada no CM360

### Alertas (⚠️)
- Counter com `ord=` estático — risco de cache sem cache-buster
- `cost=` com formato inválido (ex: `R$199,90` em vez de `199.90`)
- `dc_lat=` ausente — Limit Ad Tracking não implementado
- `npa=` ausente — conformidade LGPD/GDPR
- `src=` com número de dígitos suspeito

### Informativos (ℹ️)
- `gdpr=` não encontrado
- Dicas de validação com Tag Assistant

---

## Modo Batch

Cole várias URLs (uma por linha) para validar em bulk. Cada linha mostra um score de 0–100 e os problemas encontrados — útil para auditar uma campanha inteira antes do go-live.

---

## Parâmetros Floodlight suportados

| Parâmetro | Obrigatório | Descrição |
|-----------|-------------|-----------|
| `src=` | ✅ | Advertiser ID do CM360 |
| `cat=` | ✅ | Activity Tag String |
| `type=` | ✅ | Group Tag String |
| `ord=` | ✅ | `[Random]` em Counter; Order ID único em Sales |
| `cost=` | ✅ Sales | Valor da transação |
| `qty=` | Opt. | Quantidade de itens |
| `dc_lat=` | Rec. | Limit Ad Tracking |
| `dc_rdid=` | Opt. | Device ID (IDFA/GAID) |
| `npa=` | Rec. | Non-Personalized Ads |
| `gdpr=` | Rec. | GDPR flag |
| `gdpr_consent=` | Opt. | TCF Consent String |

---

## Tecnologia

- HTML + CSS + JS vanilla — zero dependências externas
- Google Fonts (Space Grotesk)
- Score de 0–100 por tag
- Modo batch para validação em volume
