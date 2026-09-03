# Cloudflare Workers — nc-proxy

Proxy para resolver CORS entre GitHub Pages e Google Apps Script.

## URL

`https://nc-proxy.falssp.workers.dev/`

## Uso

```
GET /?fase=f3&env=corp&action=stats
GET /?fase=f4&env=pessoal&action=ping
```

## Parametros

| Param | Valores | Descricao |
|-------|---------|-----------|
| `fase` | `f3`, `f4`, `f5` | Fase do NC Tool |
| `env` | `corp`, `pes` | Ambiente |
| `action` | `ping`, `stats` | Acao do endpoint |

## Deploy

1. Acessa https://dash.cloudflare.com
2. Workers & Pages → nc-proxy → Edit code
3. Cola o conteudo de `worker.js`
4. Clica em Deploy

## Atualizacao de URLs

Se alguma URL do GAS mudar, atualiza o objeto `URLS` no `worker.js`
e faz redeploy no Cloudflare. Nao gera URL nova do worker.
