# F5 — FT Flashtalking Validator · NC Tool Unilever BR

Validador de specs de criativos para a plataforma Flashtalking.
Verifica dimensões, formatos, pesos e requisitos técnicos por tipo de criativo.

---

## Links por ambiente

### Corp (felipe.lima@stormx.com.br)

| Recurso | URL |
|---------|-----|
| **GitHub Pages** | https://falssp.github.io/nc-tool/f5-corp/ |
| **GAS Web App** | https://script.google.com/macros/s/AKfycbwKsOut5TyYLf1pW_xm1He-zBvzZGYFM4KAEE5C6hssNZHsg9fL_QBXWjfF-zzIDxfXNQ/exec |
| **Planilha** | `1Y7_1NL7Uo9HgHn7bTIqnnVZhJCogCbXI3tgasxOTN_0` |
| **Link planilha** | [Abrir no Drive](https://docs.google.com/spreadsheets/d/1Y7_1NL7Uo9HgHn7bTIqnnVZhJCogCbXI3tgasxOTN_0/edit) |
| **Admin** | `felipe.lima@stormx.com.br` |

### Pessoal (falssp@gmail.com)

| Recurso | URL |
|---------|-----|
| **GitHub Pages** | https://falssp.github.io/nc-tool/f5-pessoal/ |
| **GAS Web App** | https://script.google.com/macros/s/AKfycbym0772425DQEUrNQn9TZc6C-wdRuqU1_erQVSoWzV-MEBbyCN4DOfJkaSd90cdVZHjSA/exec |
| **Planilha** | `1YZ3tFDlt3yP5xtNVpSMhyS-cxG3QHBlN5nr_z-yJi2s` |
| **Link planilha** | [Abrir no Drive](https://docs.google.com/spreadsheets/d/1YZ3tFDlt3yP5xtNVpSMhyS-cxG3QHBlN5nr_z-yJi2s/edit) |
| **Admin** | `falssp@gmail.com` |

---

## Estrutura de arquivos

```
F5-Flashtalking/
├── corp/
│   ├── Code.gs               ← script GAS — menus, backend, log, dashboard
│   ├── index.html            ← interface online (Web App ativo com backend GAS)
│   └── F5_Flashtalking.html  ← interface offline (standalone, sem backend)
└── pessoal/
    └── (mesma estrutura — BACKEND_URL e planilha diferentes)
```

---

## Isolamento Corp × Pessoal

> ⚠️ Os dois ambientes são **completamente independentes**.
> GAS e GitHub Pages alimentam a mesma planilha via mesmo `BACKEND_URL`.
> Nenhum ambiente sabe da existência do outro.
