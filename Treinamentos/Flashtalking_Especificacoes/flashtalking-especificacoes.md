# Flashtalking — Especificações de Mídia

> ⚠️ **Não validado no client portal FT.** Guia de referência para trafficking — StormX Data & Tech · out/2026
> Base: padrões IAB que a Flashtalking segue. **Peso, formato e aceite final sempre variam por publisher/veículo** — confirmar o spec sheet específico no client portal (support.flashtalking.com) antes de subir qualquer peça fora do padrão.

## Display estático — tamanhos e peso

| Tamanho | Uso comum | Peso máx. recomendado | Formato |
|---|---|---|---|
| 300x250 | MPU — sidebar / in-content | 150–200 KB | JPG, PNG, GIF |
| 728x90 | Leaderboard | 150–200 KB | JPG, PNG, GIF |
| 970x250 | Billboard | 200 KB | JPG, PNG, GIF |
| 160x600 | Skyscraper | 150 KB | JPG, PNG, GIF |
| 300x600 | Half Page | 200 KB | JPG, PNG, GIF |
| 320x50 / 320x100 | Mobile banner | 50–100 KB | JPG, PNG, GIF |
| 970x90 | Super Leaderboard | 200 KB | JPG, PNG, GIF |

GIF animado: loop limitado a 3x, duração total até 15–30s conforme publisher. Peso é o fator que mais derruba aprovação — validar sempre abaixo do limite do veículo, não só do IAB.

> ⚠️ Valores de peso são padrão IAB, não extraídos do spec sheet da Flashtalking. Confirmar antes de divulgar — veículos como Globo e UOL costumam ter exigência própria.

## Rich Media / Expansível

| Tamanho base | Tamanho expandido máx. |
|---|---|
| 300x250 | 500x300 |
| 160x600 | 320x600 |
| 120x600 | 240x600 |
| 728x90 | 728x300 |
| 300x600 | 560x600 |
| 468x60 | 468x210 |

**Boas práticas de trafficking:**
- Clicktag único por padrão — se houver múltiplos elementos clicáveis, usar Open Creative API (senão o clique principal é desativado)
- Borda de 1px aplicada em todo criativo
- Declarar direção de expansão (Left/Right/Up/Down) coerente com o rail
- Se o criativo for MRAID, **não** declarar como expansível na Creatives Library — trava o spend

> ⚠️ Tamanhos de expansão máxima não foram extraídos do spec sheet da Flashtalking — confirmar no portal antes de usar como regra fixa, especialmente por veículo.

## Vídeo — VAST / VPAID

| Item | Padrão |
|---|---|
| Tag | VAST 3.0/4.x (padrão) · VPAID 2.0 JS (quando interatividade é exigida) |
| Codec / container | H.264 / MP4 |
| Frame rate | 25 fps (PAL / Brasil) · 29.97 fps (NTSC) |
| Duração | 6s, 15s, 30s |
| Bitrate | 8–10 Mbps (HD) — ajustar por inventário (CTV exige maior qualidade) |
| Scan | Progressive (não entrelaçado) |

**Eventos de tracking padrão (VAST):** impression, start, firstQuartile, midpoint, thirdQuartile, complete, skip, mute/unmute, pause/resume, clickThrough.

> ⚠️ Bitrate e duração são padrão de mercado — alguns publishers de CTV exigem specs próprias; confirmar no portal FT antes de trafegar.

Ver guia [VAST vs VPAID](../VAST_VPAID/vast-vs-vpaid.md) para detalhe de protocolo.

## Quando usar cada formato

**Display estático** — campanha de awareness/reach de alto volume, sem exigência de interatividade, prioridade em peso leve e aprovação rápida.

**Rich Media / Expansível** — rail disponível com espaço de expansão, objetivo exige mais espaço de mensagem sem sair do banner, publisher confirma suporte.

**Vídeo** — CTV, OTT, in-app, programático (DV360, TTD, Amazon DSP), precisa de medição de quartil/completion, verificação de brand safety rodando (DoubleVerify/IAS).

## Resumo

Specs base são IAB — mas quem manda é o publisher. Antes de subir qualquer peça fora do padrão listado aqui, confirmar o spec sheet do veículo no client portal da Flashtalking.
