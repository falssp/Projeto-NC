# Campaign Setup Guide

Guia interativo passo a passo para configuração de campanhas nas principais plataformas de mídia digital.

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/campaign-setup-guide/

## Plataformas

| Plataforma | Grupo | Status |
|---|---|---|
| Meta Ads | Social | ✅ Completo |
| Google Ads | Search / Display | ✅ Completo |
| Campaign Manager 360 | Ad Server | ✅ Completo |
| Display & Video 360 | Ad Server | ✅ Completo |
| LinkedIn | Social | ✅ Completo |
| TikTok Ads | Social | ✅ Completo |
| X Ads | Social | ✅ Completo |

## Funcionalidades

- Navegação por sidebar com agrupamento por tipo de plataforma
- Cards expansíveis por step com campos detalhados
- Para cada campo: label, obrigatório/opcional, onde encontrar, tipo, opções e dica
- Layout full-width, sem dependências externas

## Estrutura dos dados

```
PLATAFORMAS = {
  id: {
    nome, emoji, cor, descricao, url, status, grupo,
    steps: [{ id, titulo, icone, descricao, campos: [{ label, onde, tipo, obrigatorio, opcoes, dica }] }]
  }
}
```
