# Super App · NC Tool Unilever BR

Hub central card-based consolidando acesso a F3, F4 e F5.
Interface de entrada única para todas as ferramentas NC Tool.

---

## Links por ambiente

### Corp (felipe.lima@stormx.com.br)

| Recurso | URL |
|---------|-----|
| **GAS Web App** | https://script.google.com/macros/s/AKfycbxVQ5Q1jwxNXho2Nd6rCY3gklBYpm6mXYq-vXnSAskvLwctYK8-irUVZ9HLfHIAmttI/exec |
| **Planilha (Capa)** | `1kqYJ6AGbTZOsv-uwN4Hr9lI0gJSL71C4F49mMLv04hQ` |
| **Link planilha** | [Abrir no Drive](https://docs.google.com/spreadsheets/d/1kqYJ6AGbTZOsv-uwN4Hr9lI0gJSL71C4F49mMLv04hQ/edit) |

### Pessoal (falssp@gmail.com)

| Recurso | URL |
|---------|-----|
| **GAS Web App** | https://script.google.com/macros/s/AKfycbyVRcaI7RHdRIasOIi5V6WKdU3QztcDYiIT4dJZpr1ptzYDfnoL_rlfSykkjxz4UnA-Sw/exec |
| **Planilha (Capa)** | `1BGPVx-4hdGh5g-K3mDsUXZhfXXF2uSSwAO4yThnmTQ0` |
| **Link planilha** | [Abrir no Drive](https://docs.google.com/spreadsheets/d/1BGPVx-4hdGh5g-K3mDsUXZhfXXF2uSSwAO4yThnmTQ0/edit) |

---

## Estrutura de arquivos

```
SuperApp/
├── corp/
│   ├── index.html  ← interface do Super App (cards)
│   ├── Capa.gs     ← backend da Capa — menu, links, configurações Corp
│   └── Code.gs     ← código auxiliar do Super App
└── pessoal/
    └── (mesma estrutura — links e IDs Pessoal)
```

---

## Ferramentas disponíveis no hub

| Ferramenta | Descrição |
|-----------|-----------|
| F3 — Validador NC | Valida naming conventions contra o dicionário |
| F4 — Acessórios | Suite de apoio ao processo de naming |
| F5 — FT Validator | Valida specs de criativos Flashtalking |
