// NC Tool — Cloudflare Workers Proxy
// URL: https://nc-proxy.falssp.workers.dev/
// Resolve CORS entre GitHub Pages e Google Apps Script
// Parametros: ?fase=f3&env=corp&action=stats

const URLS = {
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

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }

    const url    = new URL(request.url);
    const fase   = url.searchParams.get('fase');
    const env    = url.searchParams.get('env');
    const action = url.searchParams.get('action') || 'stats';
    const key    = fase + '_' + env;
    const gasUrl = URLS[key];

    if (!gasUrl) {
      return new Response(JSON.stringify({ error: 'Fase/env invalido: ' + key }), { status: 400, headers: CORS });
    }

    try {
      const resp = await fetch(gasUrl + '?action=' + action, { redirect: 'follow' });
      const text = await resp.text();
      return new Response(text, { status: 200, headers: CORS });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { status: 502, headers: CORS });
    }
  }
};
