# F2 — Gerador NC · NC Tool Unilever BR

Gerador de Naming Conventions para 14 plataformas com cores oficiais de marca.
Interface web + Google Sheets como fonte de dados.

---

## Links por ambiente

### Corp (felipe.lima@stormx.com.br)

| Recurso | URL |
|---------|-----|
| **GAS Web App** | https://script.google.com/macros/s/AKfycbzKKuKhr111DFtk5jAhx3ofQzZL78sQvliDKtxDj_FlBZmbPaLuufd6-oHxq7Tsr9sp_w/exec |
| **Planilha** | `1_6SEjmDdYvSkxoLwLLpqORitM-QxX5flBpF8LoSX8Lc` |
| **Link planilha** | [Abrir no Drive](https://docs.google.com/spreadsheets/d/1_6SEjmDdYvSkxoLwLLpqORitM-QxX5flBpF8LoSX8Lc/edit) |
| **Script ID (clasp)** | `1ZgzaZej05txoNZ1-36NqpusrnRo4eFBgehWaN27MPfqmJbRA2nF3USA2` |

### Pessoal (falssp@gmail.com)

| Recurso | URL |
|---------|-----|
| **GAS Web App** | https://script.google.com/macros/s/AKfycby6uFxVBlvGx2bC93m1NK9ixTG8Oa61CA2qeKCEc8FR9JnGJCv5m1AlOgoq4kmzbpS3/exec |
| **Planilha** | `1fOPF6JLH29rY15Obb-QC88jVGuR1t0c4wuB4SyDmqyc` |
| **Link planilha** | [Abrir no Drive](https://docs.google.com/spreadsheets/d/1fOPF6JLH29rY15Obb-QC88jVGuR1t0c4wuB4SyDmqyc/edit) |
| **Script ID (clasp)** | `1b3ErH_OD3Gn1wElCuW-VPe0soE15PP_0dOvbZvbrEg-N6DpDgqVDyMMQ` |

---

## Estrutura de arquivos

```
F2-Gerador/
├── corp/
│   ├── Core.gs           ← config central, setup, menu, sync, onEdit, log
│   ├── Tabs1.gs          ← Amazon DSP, Compra Direta, DV360, Flashtalking
│   ├── Tabs2.gs          ← Google, Meta, Pinterest, TikTok, Twitter
│   ├── WebApp.gs         ← endpoints: ping, stats, listarOpcoes
│   └── appsscript.json   ← manifest — habilita Web App anônima, V8, fuso SP
├── pessoal/
│   └── (mesma estrutura — SPREADSHEET_ID e env diferentes)
└── web/
    ├── index.html        ← interface web standalone
    ├── config/           ← configurações do frontend
    └── js/               ← scripts do frontend
```

---

## Endpoints da Web App

| Action | Parâmetros | Retorno |
|--------|-----------|---------|
| `ping` | — | `{ ok, env, version, ts }` |
| `stats` | — | `{ plataformas[], nrows, lastSync, spreadsheet, ts }` |
| `listarOpcoes` | `campo` (opcional) | Todos os campos da aba Dados, ou só o campo solicitado |

---

## Isolamento Corp × Pessoal

> ⚠️ Os dois ambientes são **completamente independentes**.
> `Core.gs`: `SPREADSHEET_ID` diferente por ambiente.
> `WebApp.gs`: responde com `env: "corp"` ou `env: "pes"`.
