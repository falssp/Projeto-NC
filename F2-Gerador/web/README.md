# F2 — NC Tool Web

Versão web do F2 Gerador — mesma lógica do Sheets, roda no browser, sem depender do Google.

## Estrutura

```
web/
├── index.html        ← interface principal (sidebar + área de trabalho)
├── js/
│   ├── engine.js     ← lê configs JSON, monta campos, gera naming em tempo real
│   └── download.js   ← exporta .xlsx / .csv
└── config/
    ├── lists.json    ← listas de dropdown compartilhadas
    ├── amazon-dsp.json
    ├── compra-direta.json
    ├── dv360-prog.json
    ├── dv360-td.json
    ├── dv360-yt-auction.json
    ├── dv360-yt-reserva.json
    ├── flashtalking.json
    ├── google-others.json
    ├── google-search.json
    ├── google-video.json
    ├── meta.json
    ├── pinterest.json
    ├── tiktok.json
    └── twitter.json
```

## Status

🚧 Em construção

## Plataformas

- [ ] Amazon DSP
- [ ] Compra Direta
- [ ] DV360-Prog
- [ ] DV360-TradeDesk
- [ ] DV360-YT Auction
- [ ] DV360-YT Reserva
- [ ] Flashtalking
- [ ] Google Others
- [ ] Google Search
- [ ] Google Video
- [ ] Meta
- [ ] Pinterest
- [ ] TikTok
- [ ] Twitter
