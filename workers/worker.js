// NC Tool — Cloudflare Workers Proxy v2
// URL: https://nc-proxy.falssp.workers.dev/
// Suporta GET (leitura + cache KV) e POST (escrita, sem cache)
//
// Variaveis de ambiente (Settings → Variables):
// F1_CORP, F1_PES, F2_CORP, F2_PES, F3_CORP, F3_PES, F4_CORP, F4_PES, F5_CORP, F5_PES
// KV binding: RATE_KV

const URLS_FALLBACK = {
  f1_corp: 'https://docs.google.com/spreadsheets/d/1VBaExPGHOVYxpTyzJymrb8RuWWe34_9WBE0aC3slETU',
  f1_pes:  'https://docs.google.com/spreadsheets/d/1vGM_se-b1rechwv91WnSw-SW2XQFJ4DN4FPWqrEMkq8',
  f2_corp: 'https://script.google.com/macros/s/AKfycbzKKuKhr111DFtk5jAhx3ofQzZL78sQvliDKtxDj_FlBZmbPaLuufd6-oHxq7Tsr9sp_w/exec',
  f2_pes:  'https://script.google.com/macros/s/AKfycby6uFxVBlvGx2bC93m1NK9ixTG8Oa61CA2qeKCEc8FR9JnGJCv5m1AlOgoq4kmzbpS3/exec',
  f3_corp: 'https://script.google.com/macros/s/AKfycbzKKuKhr111DFtk5jAhx3ofQzZL78sQvliDKtxDj_FlBZmbPaLuufd6-oHxq7Tsr9sp_w/exec',
  f3_pes:  'https://script.google.com/macros/s/AKfycby6uFxVBlvGx2bC93m1NK9ixTG8Oa61CA2qeKCEc8FR9JnGJCv5m1AlOgoq4kmzbpS3/exec',
  f4_corp: 'https://script.google.com/macros/s/AKfycbxiWW0zVuFdRJCvzwCBeH8OIqsFJyKkhqZotgHX8vrD0UARbU3SUtJ7IxZsg2BXc_QrPw/exec',
  f4_pes:  'https://script.google.com/macros/s/AKfycby6h6qvXqacFrf2TmcXYaflRQp7rvhklpnR27VWhIueh9pLxWvUCRYkFToJPxYezUN7cw/exec',
  f5_corp: 'https://script.google.com/macros/s/AKfycbwKsOut5TyYLf1pW_xm1He-zBvzZGYFM4KAEE5C6hssNZHsg9fL_QBXWjfF-zzIDxfXNQ/exec',
  f5_pes:  'https://script.google.com/macros/s/AKfycbym0772425DQEUrNQn9TZc6C-wdRuqU1_erQVSoWzV-MEBbyCN4DOfJkaSd90cdVZHjSA/exec',
};

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

// Actions que podem ser cacheadas (apenas leitura)
const CACHEABLE_ACTIONS = ['ping','stats','listarIDs','buscarID','listarCampanhas','buscarCampanha','listarOpcoes'];
const CACHE_TTL = 300; // 5 minutos
const RATE_LIMIT  = 30;
const RATE_WINDOW = 60;

function getGasUrl(env, fase, envParam) {
  const key = fase + '_' + envParam;
  const envVarMap = {
    f1_corp: env.F1_CORP, f1_pes: env.F1_PES,
    f2_corp: env.F2_CORP, f2_pes: env.F2_PES,
    f3_corp: env.F3_CORP, f3_pes: env.F3_PES,
    f4_corp: env.F4_CORP, f4_pes: env.F4_PES,
    f5_corp: env.F5_CORP, f5_pes: env.F5_PES,
  };
  return (envVarMap[key]) || URLS_FALLBACK[key] || null;
}

export default {
  async fetch(request, env) {

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }

    // Rate limiting
    if (env.RATE_KV) {
      const ip  = request.headers.get('CF-Connecting-IP') || 'unknown';
      const key = 'rate:' + ip + ':' + Math.floor(Date.now() / (RATE_WINDOW * 1000));
      const cur = parseInt(await env.RATE_KV.get(key) || '0');
      if (cur >= RATE_LIMIT) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), { status: 429, headers: CORS });
      }
      await env.RATE_KV.put(key, String(cur + 1), { expirationTtl: RATE_WINDOW * 2 });
    }

    const url      = new URL(request.url);
    const fase     = url.searchParams.get('fase');
    const envParam = url.searchParams.get('env');
    const action   = url.searchParams.get('action') || 'stats';
    const isPost   = request.method === 'POST';

    if (!fase || !envParam) {
      return new Response(JSON.stringify({ error: 'Parametros fase e env obrigatorios' }), { status: 400, headers: CORS });
    }

    const gasUrl = getGasUrl(env, fase, envParam);
    if (!gasUrl) {
      return new Response(JSON.stringify({ error: 'Fase/env invalido: ' + fase + '_' + envParam }), { status: 400, headers: CORS });
    }

    // Cache KV para GET leitura
    const isCacheable = !isPost && CACHEABLE_ACTIONS.includes(action) && env.RATE_KV;
    const cacheKey    = 'cache:' + fase + ':' + envParam + ':' + action + ':' + url.searchParams.toString();

    if (isCacheable) {
      const cached = await env.RATE_KV.get(cacheKey);
      if (cached) {
        const headers = Object.assign({}, CORS, { 'X-Cache': 'HIT' });
        return new Response(cached, { status: 200, headers });
      }
    }

    // Monta request para o GAS
    try {
      // Constrói a URL do GAS com os params extras
      const extraParams = new URLSearchParams();
      url.searchParams.forEach((v, k) => {
        if (!['fase','env'].includes(k)) extraParams.set(k, v);
      });

      const gasFullUrl = gasUrl + '?' + extraParams.toString();
      const fetchOpts  = { redirect: 'follow' };

      if (isPost) {
        const body = await request.text();
        fetchOpts.method  = 'POST';
        fetchOpts.headers = { 'Content-Type': 'application/json' };
        fetchOpts.body    = body;
      }

      const resp = await fetch(gasFullUrl, fetchOpts);
      const text = await resp.text();

      // Detecta HTML (redirect para login)
      if (text.trim().startsWith('<')) {
        return new Response(JSON.stringify({ error: 'GAS retornou HTML — verificar deployment' }), { status: 502, headers: CORS });
      }

      // Salva no cache se for leitura
      if (isCacheable) {
        await env.RATE_KV.put(cacheKey, text, { expirationTtl: CACHE_TTL });
      }

      const headers = Object.assign({}, CORS, { 'X-Cache': 'MISS' });
      return new Response(text, { status: 200, headers });

    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { status: 502, headers: CORS });
    }
  }
};
