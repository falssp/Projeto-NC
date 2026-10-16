# Flashtalking — Especificações de Mídia

> Guia de referência para trafficking — StormX Data & Tech · out/2026
> ℹ️ A seção **Specs por Veículo** abaixo vem de uma fonte real: a planilha interna *"Specs Publishers - Compartilhada Initiative"*. As seções de Display/Rich Media/Vídeo seguintes são **padrão de mercado (IAB)** e servem de fallback só para veículos que não estão listados na planilha — nesse caso, confirme sempre no client portal da Flashtalking antes de subir.

## Specs por veículo — fonte: planilha interna

Fonte: "Specs Publishers - Compartilhada Initiative". Lista por publisher/formato — usar como referência primária antes de cair no padrão IAB genérico.

| Veículo | Formato | Dimensão | Tag / Tracking | Vídeo |
|---|---|---|---|---|
| One Station Media | Rich Media | Imagens: 640x854 · Vídeo: 480x720 · Fundo: 640x960 | TAG (In-Stream Vídeo) | — |
| One Station Media | Video 10" | 640x360 / 360x640 | TAG (In-Stream Vídeo) | VAST 2.0 |
| Logan | Pré Roll | 16:9 · 640x960px · 30" | TAG (In-Stream Vídeo) | VAST/VPAID |
| Logan | Push | Smartphone 320x480 · Tablet 768x1024 | Tracking (Impressions/Clicks) | — |
| Logan | Full Banner | 320x480, 320x568, 480x320, 568x320 | TAG (In-Banner) | — |
| Meta X | Vídeo | 1920x1080 | TAG (In-Stream Vídeo) | VAST 2.0 |
| Adsmovil | Horizontal Instant Play HD Video | 16:9 (1920x1080) · máx 30" | TAG (In-Stream Vídeo) | VAST 2.0 |
| Adsmovil | Horizontal Dynamic End Card | 1200x800 | TAG (In-Stream Vídeo) | VAST 2.0 |
| Adsmovil | Custom Overlay | 500x400 máx | TAG (In-Banner) | — |
| Adsmovil | IAB Banner Overlay | 728x90 | TAG (In-Banner) | — |
| Adsmovil | Button Overlay | — | TAG (In-Banner) | — |
| Super Interessante | Display | 728x90, 300x250, 320x100, 320x50, 300x600 | TAG (In-Banner) | — |
| Spotify (DV360) | Áudio / Vídeo | — | TAG (In-Stream Vídeo) | VAST 2.0 |
| Spotify (DV360) | Overlay Mobile | — | Tracking (Impressions/Clicks) | — |
| Spotify (DV360) | Overlay Desktop | 800x435 · 728x90 | Tracking / TAG (In-Banner) | — |
| Waze | Takeover Premium | — | **Não aceita Tracking/TAG** | — |
| Hugo Gloss | Super Banner / Display IAB | 728x90, 320x50, 300x450, 1190x648, 336x596, 300x250, 970x250, 300x600 | TAG (In-Banner) | — |
| Band | Blast | 970x250 · 728x90 · 300x250 · 320x50 | TAG (In-Banner) | — |
| Band | Billboard + Widebanner | 1190x250 ou 970x250 + 320x50 ou 320x100 | TAG (In-Banner) | — |
| Band | Background | 1900x510 | Tracking (Impressions/Clicks) | — |
| Band | Arroba / Billboard / Super Banner / Super Leaderboard / Half Page | 300x250, 970x250, 728x90, 970x90, 300x600 | TAG (In-Banner) | — |
| Band | Wide/Small Banner | 320x100 ou 320x50 | TAG (In-Banner) | — |
| Band | Pré-Roll | 2:1, 16:9 | TAG (In-Stream Vídeo) | VAST 2.0 |
| 365 Scores | Homepage Takeover / Countdown | 1080x380 | Tracking (Impressions/Clicks) | — |
| 365 Scores | Floating Button | 200px diâmetro | Tracking (Impressions/Clicks) | — |
| 365 Scores | Interstitials Display | 640x960 | TAG (In-Banner) | — |
| 365 Scores | Interstitials Vídeo | 640x360 (16:9) | TAG (In-Stream Vídeo) | VAST 2.0 |
| 365 Scores | Big Native Imagem / Logo / Vídeo | 1200x627, 128x128, 640x360 | Tracking | — |
| 365 Scores | MPU / Banner | 300x250, 640x100, 375x59, 390x61 | TAG (In-Banner) | — |
| Adlook | Vídeo 10s | 640x360 (16:9) | TAG (In-Stream Vídeo) | VAST/VPAID |
| Adlook | Display | 300x250, 320x50, 300x600, 728x90 | TAG (In-Banner) | — |
| South Media | CTV / Vídeo | — | TAG (In-Stream Vídeo) | VAST 2.0 / VAST-VPAID |
| South Media | Banner Display | — | TAG (In-Banner) | — |
| Teads | Display / Vídeo (peça feita pela Teads) | — | Tracking | — |
| Verve | Display | 300x600, 320x100, 320x50, 300x50, 970x250, 320x480, 350x250, 300x250, 728x90, 320x320, 160x600 | TAG (In-Banner) | — |
| Verve | Vídeo | — | TAG (In-Stream Vídeo) | VAST/VPAID |
| Globo.com | DAI | — | Tracking (Only Impressions) | — |
| Globo.com | Pause Ads | — | Tracking (Impressions/Clicks) | — |
| Globo.com | Primeirissima | — | TAG (In-Stream Vídeo) | VAST 3.0 / VAST 4.0 |
| Sua Música | Background / Fullbg / Imagem de Fundo | 1700x1000, 1900x1000, 1200x320 | Tracking (Impressions/Clicks) | — |
| Sua Música | Pop Up | 780x430 e 320x480 | Tracking (Impressions/Clicks) | — |
| Sua Música | Display (Billboard/Super Banner/Retângulo/Leaderboard/Half Page/Mobile) | 970x250, 728x90, 300x250, 970x90, 300x600, 320x100 | TAG (In-Banner) | — |
| Sua Música | Interstitial | 320x480 | Tracking (Impressions/Clicks) | — |
| Sua Música | Pre-Roll | até 640x480 | TAG (In-Stream Vídeo) | VAST 2.0 |
| Sua Música | Audio Ads | 300x250 | TAG (In-Stream Vídeo) | VAST 2.0 |
| Sua Música | Widget Vídeo | 380x115 | Tracking (Only Clicks) | — |
| Sua Música | Slide Principal / Patrocínio Player / Envelopamento / Branded Channel / Post Patrocinado | varia | **Não aceita Tracking/TAG** | — |
| Sua Música | Push Notification | 500x500 | **Não aceita Tracking/TAG** | — |
| UOL | Cutting Edge + Viewport | 1190x250 | Tracking (Impressions/Clicks) | — |
| UOL | Cutting Edge (sem expansão) | 1190x250 | TAG (In-Banner) | — |
| UOL | Cutting Edge (com expansão) | Retraído 1190x250 · Expandido 1190x460 · Mobile 336x450 | Tracking (Impressions/Clicks) | — |
| Webmotors | — | 1920x320, 560x280 | Tracking (Impressions/Clicks) | — |
| Hands | Push Notification | 192x192 | Tracking (Only Clicks) | — |
| Hands | Arroba / Top / Interstitial | 300x250, 320x50, 320x480 | Tracking (Impressions/Clicks) | — |
| XT Media | Display | 300x250, 728x90 | TAG (In-Banner) | — |

Planilha fonte com 267 linhas totais (algumas vazias/formatação) — se algum veículo do seu plano não está aqui, ele pode constar na planilha completa; vale checar o link original antes de assumir ausência.

## Display estático — fallback padrão IAB

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

## Rich Media / Expansível — fallback padrão IAB

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

## Vídeo — VAST / VPAID (fallback padrão IAB)

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
