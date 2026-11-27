# Cloudflare Workers — nc-proxy

Proxy para resolver CORS entre GitHub Pages e Google Apps Script.

## URL

`https://nc-proxy.falssp.workers.dev/`

## Uso

```
GET /?fase=f3&env=corp&action=stats
GET /?fase=f4&env=pes&action=ping
GET /?fase=f5&env=pes&action=stats
```

## Parametros

| Param | Valores | Descricao |
|-------|---------|-----------|
| `fase` | `f3`, `f4`, `f5` | Fase do NC Tool |
| `env` | `corp`, `pes` | Ambiente |
| `action` | `ping`, `stats` | Acao do endpoint |

## URLs mapeadas

| Chave | URL |
|-------|-----|
| f3_corp | https://script.google.com/macros/s/AKfycbzKKuKhr111DFtk5jAhx3ofQzZL78sQvliDKtxDj_FlBZmbPaLuufd6-oHxq7Tsr9sp_w/exec |
| f3_pes | https://script.google.com/macros/s/AKfycby6uFxVBlvGx2bC93m1NK9ixTG8Oa61CA2qeKCEc8FR9JnGJCv5m1AlOgoq4kmzbpS3/exec |
| f4_corp | https://script.google.com/macros/s/AKfycbxiWW0zVuFdRJCvzwCBeH8OIqsFJyKkhqZotgHX8vrD0UARbU3SUtJ7IxZsg2BXc_QrPw/exec |
| f4_pes | https://script.google.com/macros/s/AKfycby6h6qvXqacFrf2TmcXYaflRQp7rvhklpnR27VWhIueh9pLxWvUCRYkFToJPxYezUN7cw/exec |
| f5_corp | https://script.google.com/macros/s/AKfycbwKsOut5TyYLf1pW_xm1He-zBvzZGYFM4KAEE5C6hssNZHsg9fL_QBXWjfF-zzIDxfXNQ/exec |
| f5_pes | https://script.google.com/macros/s/AKfycbym0772425DQEUrNQn9TZc6C-wdRuqU1_erQVSoWzV-MEBbyCN4DOfJkaSd90cdVZHjSA/exec |

## Atualizacao

Se alguma URL do GAS mudar:
1. Edita o objeto `URLS` no `worker.js`
2. Acessa https://dash.cloudflare.com → Workers & Pages → nc-proxy → Edit code
3. Cola o novo conteudo e clica em Deploy
4. Nao gera URL nova do worker
