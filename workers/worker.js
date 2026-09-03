// NC Tool — Cloudflare Workers Proxy
// URL: https://nc-proxy.falssp.workers.dev/
// Resolve CORS entre GitHub Pages e Google Apps Script
// Parametros: ?fase=f3&env=corp&action=stats
//
// Variaveis de ambiente (configurar em Settings → Variables no Cloudflare):
// F3_CORP, F3_PES, F4_CORP, F4_PES, F5_CORP, F5_PES
// Se nao configuradas, usa as URLs hardcoded como fallback.

const URLS_FALLBACK = {
  f3_corp: 'https://script.google.com/macros/s/AKfycbzKKuKhr111DFtk5jAhx3ofQzZL78sQvliDKtxDj_FlBZmbPaLuufd6-oHxq7Tsr9sp_w/exec',
  f3_pes:  'https://script.google.com/macros/s/AKfycby6uFxVBlvGx2bC93m1NK9ixTG8Oa61CA2qeKCEc8FR9JnGJCv5m1AlOgoq4kmzbpS3/exec',
  f4_corp: 'https://script.google.com/macros/s/AKfycbxiWW0zVuFdRJCvzwCBeH8OIqsFJyKkhqZotgHX8vrD0UARbU3SUtJ7IxZsg2BXc_QrPw/exec',
  f4_pes:  'https://script.google.com/macros/s/AKfycby6h6qvXqacFrf2TmcXYaflRQp7rvhklpnR27VWhIueh9pLxWvUCRYkFToJPxYezUN7cw/exec',
  f5_corp: 'https://script.google.com/macros/s/AKfycbwKsOut5TyYLf1pW_xm1He-zBvzZGYFM4KAEE5C6hssNZHsg9fL_QBXWjfF-zzIDxfXNQ/exec',
  f5_pes:  'https://script.google.com/macros/s/AKfycbym0772425DQEUrNQn9TZc6C-wdRuqU1_erQVSoWzV-MEBbyCN4DOfJkaSd90cdVZHjSA/exec',
};

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Content-Type': 'application/json',
};

// Rate limiting: max 30 requests/minuto por IP
const RATE_LIMIT    = 30;
const RATE_WINDOW   = 60; // segundos

export default {
  async fetch(request, env) {

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }

    // Rate limiting via KV (se KV estiver configurado)
    if (env.RATE_KV) {
      const ip  = request.headers.get('CF-Connecting-IP') || 'unknown';
      const key = `rate:${ip}:${Math.floor(Date.now() / (RATE_WINDOW * 1000))}`;
      const cur = parseInt(await env.RATE_KV.get(key) || '0');
      if (cur >= RATE_LIMIT) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
          status: 429, headers: CORS
        });
      }
      await env.RATE_KV.put(key, String(cur + 1), { expirationTtl: RATE_WINDOW * 2 });
    }

    const url    = new URL(request.url);
    const fase   = url.searchParams.get('fase');
    const env_p  = url.searchParams.get('env');
    const action = url.searchParams.get('action') || 'stats';
    const key    = fase + '_' + env_p;

    // Usa variavel de ambiente se disponivel, fallback para hardcoded
    const envKey  = key.toUpperCase().replace('_', '_');
    const gasUrl  = (env && env[envKey.replace('f3_corp','F3_CORP').replace('f3_pes','F3_PES')
      .replace('f4_corp','F4_CORP').replace('f4_pes','F4_PES')
      .replace('f5_corp','F5_CORP').replace('f5_pes','F5_PES')]) || URLS_FALLBACK[key];

    if (!gasUrl) {
      return new Response(JSON.stringify({ error: 'Fase/env invalido: ' + key }), {
        status: 400, headers: CORS
      });
    }

    try {
      const resp = await fetch(gasUrl + '?action=' + action, { redirect: 'follow' });
      const text = await resp.text();
      // Verifica se retornou HTML em vez de JSON (redirect do GAS para login)
      if (text.trim().startsWith('<')) {
        return new Response(JSON.stringify({ error: 'GAS retornou HTML — verificar deployment' }), {
          status: 502, headers: CORS
        });
      }
      return new Response(text, { status: 200, headers: CORS });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), {
        status: 502, headers: CORS
      });
    }
  }
};
