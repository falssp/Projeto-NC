# RM · Requisição de Material

Planilha RM StormX — geração automática de nomenclaturas para campanhas Unilever BR.

## Links

| Recurso | URL |
|---------|-----|
| **Download (versão mais recente)** | https://falssp.github.io/Projeto-NC/Arquivos/RM/ |
| **Manual de uso** | https://falssp.github.io/Projeto-NC/Arquivos/RM/Manual/ |

## Estrutura

```
RM/
  index.html    → página de download (com link para o Manual)
  latest.json   → aponta para a versão mais recente (atualizado pelo GitHub Actions)
  Manual/       → manual interativo em HTML
  2025/         → (sem versões — histórico pré-repositório)
  2026/         → versões v1 a v6.1
```

## Como adicionar nova versão

1. Faça upload do novo `.xlsx` na pasta do ano correspondente (ex: `RM/2026/`)
2. O GitHub Actions detecta o push e atualiza `latest.json` automaticamente
3. O botão de download na página e no Manual já refletem a nova versão
