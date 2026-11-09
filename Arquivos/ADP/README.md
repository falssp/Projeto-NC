# ADP · String Tool Merge

Ferramenta de geração de strings para Ad Platform — integra dados do Camphouse e exporta para CM360 / DV360.

## Link de download

| Recurso | URL |
|---------|-----|
| **Download (versão mais recente)** | https://falssp.github.io/Projeto-NC/Arquivos/ADP/ |

A página lê `latest.json` automaticamente e oferece sempre o arquivo mais novo, independente do ano.

## Estrutura

```
ADP/
  index.html    → página de download
  latest.json   → aponta para a versão mais recente (atualizado pelo GitHub Actions)
  2025/         → versões v12.4 a v15.8
  2026/         → versões v1.0 a v5.5
```

## Como adicionar nova versão

1. Faça upload do novo `.xlsx` na pasta do ano correspondente (ex: `ADP/2026/`)
2. O GitHub Actions detecta o push e atualiza `latest.json` automaticamente
3. O botão de download na página já reflete a nova versão
