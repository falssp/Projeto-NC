# Comparador de Tag

Compara duas versões de uma tag ou URL e mostra exatamente o que mudou — parâmetros adicionados, removidos e alterados, com destaque por cor.

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/comparador-tag/

---

## Como usar

1. Cole a versão **original** no campo A (antes)
2. Cole a versão **nova** no campo B (depois)
3. A comparação atualiza automaticamente após digitar

Use o botão **↕ Inverter A/B** para trocar os lados.

---

## Tipos de tag suportados

| Tipo | Detecção |
|------|----------|
| Floodlight Counter / Sales | `ad.doubleclick.net/ddm/activity/` |
| Click Tracker CM360 | `ad.doubleclick.net/ddm/clk/` |
| VAST Tracking | `<Tracking event="...">` |
| Meta Pixel | `fbevents.js` / `fbq(` |
| gtag.js | `gtag(` / `googletagmanager` |
| IAS | `adsafeprotected.com` |
| DoubleVerify | `doubleverify.com` |
| Genérico (query string) | Qualquer URL com `?key=value` |

---

## Legenda

| Cor | Significado |
|-----|-------------|
| ✅ Verde | Parâmetro adicionado em B |
| ❌ Vermelho | Parâmetro removido em B |
| ✏️ Amarelo | Parâmetro presente nos dois, mas com valor diferente |
| = Cinza | Parâmetro igual nos dois |

---

## Abas

- **Parâmetros** — diff estruturado por chave/valor, ideal para URLs com `;param=valor`
- **Diff de texto** — linha por linha, útil para comparar snippets de código (gtag, pixel, etc.)

---

## Tecnologia

- HTML + CSS + JS vanilla — zero dependências
- Parsing de formato Floodlight (`;key=value;`) e query string (`?key=value&`)
- Auto-compare ao digitar (delay de 600ms)
