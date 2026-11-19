# Segurança — Ferramentas NC Tool

> Referência para aplicar nas ferramentas existentes e manter nas novas.

---

## 1. Headers de segurança (via meta tag)

Adicionar em **todas** as ferramentas, dentro de `<head>`, logo após `<meta charset>`:

```html
<!-- Bloqueia recursos externos não declarados (XSS, injeção) -->
<meta http-equiv="Content-Security-Policy"
  content="default-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com;
           script-src 'self' 'unsafe-inline';
           style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
           font-src https://fonts.gstatic.com;
           img-src 'self' data: blob:;
           connect-src 'none';">

<!-- Não vaza a URL de origem em requisições externas -->
<meta name="referrer" content="strict-origin-when-cross-origin">
```

> **Nota `unsafe-inline`:** Necessário porque as ferramentas são single-file HTML com `<script>` inline. Para eliminar, seria preciso mover cada script para arquivo `.js` externo — avaliável no futuro.

**Para ferramentas que usam CDN externo** (ex: qrcodejs, Chart.js), adicionar o domínio e o hash SRI:

```html
<meta http-equiv="Content-Security-Policy"
  content="... script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; ...">

<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"
  integrity="sha512-CNgIRecGo7nphbeZ04Sc13ka07paqdeTu0WR1IM4kNcpmBAUSHSXX5kgkDJjpeZZSi/oLa9Dw4TSAI7PdU3hg=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer">
</script>
```

---

## 2. Sanitização de input (XSS via DOM)

Sempre que inserir input do usuário no DOM, usar `textContent` em vez de `innerHTML`.

**❌ Errado:**
```js
element.innerHTML = userInput;
```

**✅ Correto:**
```js
element.textContent = userInput;
// ou, para HTML controlado com dados do usuário em campos específicos:
element.innerHTML = `<strong>${escapeHtml(userInput)}</strong>`;
```

**Função utilitária — incluir em ferramentas que manipulam DOM com input:**
```js
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
```

---

## 3. Validação de URLs (Open Redirect / javascript: injection)

Antes de usar qualquer URL fornecida pelo usuário em `href` ou `window.open`:

```js
function isSafeURL(url) {
  const v = String(url).trim();
  if (!v) return false;
  if (/^javascript:/i.test(v)) return false;
  if (/^vbscript:/i.test(v))   return false;
  if (/^data:(?!image\/)/i.test(v)) return false; // bloqueia data: exceto imagens
  return true;
}
```

---

## 4. localStorage — leitura segura

Sempre envolver leituras do storage em try/catch (pode falhar em modo privado):

```js
function safeGet(key, fallback = null) {
  try { return localStorage.getItem(key) ?? fallback; }
  catch { return fallback; }
}
function safeSet(key, val) {
  try { localStorage.setItem(key, val); } catch {}
}
```

---

## 5. Ferramentas conectadas a GAS (não-offline)

Para ferramentas que fazem `fetch()` para o Cloudflare Worker / GAS:

- Validar e sanitizar todos os campos antes de enviar
- Checar que a URL de destino é do domínio esperado (`nc-proxy.falssp.workers.dev`)
- Nunca exibir a resposta bruta da API diretamente via `innerHTML`
- Exibir erros genéricos para o usuário; logar detalhes só no console

```js
const ALLOWED_ORIGINS = [
  'https://nc-proxy.falssp.workers.dev',
  'https://script.google.com',
];

function isTrustedOrigin(url) {
  return ALLOWED_ORIGINS.some(o => url.startsWith(o));
}
```

---

## 6. Checklist por ferramenta

| Ferramenta | CSP meta | referrer | escapeHtml | isSafeURL | localStorage seguro |
|---|---|---|---|---|---|
| calculadora-metricas | ⬜ pendente | ⬜ | ✅ (textContent) | N/A | ✅ |
| simulador-pacing | ✅ | ✅ | ✅ (innerHTML controlado) | N/A | ✅ |
| gerador-qr | ✅ | ✅ | ✅ | ✅ | ✅ |
| index.html | ⬜ pendente | ⬜ | ✅ (textContent no search) | N/A | N/A |
| demais ferramentas | ⬜ pendente | ⬜ | ⬜ verificar | ⬜ verificar | ⬜ verificar |

> **Próximo passo:** adicionar as meta tags de CSP e referrer em `index.html` e nas ferramentas mais antigas marcadas como pendente.
