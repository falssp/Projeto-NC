# Documentacao Tecnica — Super App | NC Tool
> Versao 1.0

## Visao Geral

| Item | Valor |
|---|---|
| Planilha Corp | `1kqYJ6AGbTZOsv-uwN4Hr9lI0gJSL71C4F49mMLv04hQ` |
| Planilha Pessoal | `1BGPVx-4hdGh5g-K3mDsUXZhfXXF2uSSwAO4yThnmTQ0` |
| URL Corp | https://script.google.com/macros/s/AKfycbxVQ5Q1jwxNXho2Nd6rCY3gklBYpm6mXYq-vXnSAskvLwctYK8-irUVZ9HLfHIAmttI/exec |
| URL Pessoal | https://script.google.com/macros/s/AKfycbyVRcaI7RHdRIasOIi5V6WKdU3QztcDYiIT4dJZpr1ptzYDfnoL_rlfSykkjxz4UnA-Sw/exec |

## Arquivos

| Arquivo | Responsabilidade |
|---|---|
| `Code.gs` | `doGet()` — serve o `index.html` como web app |
| `index.html` (Corp) | Interface — objeto URLS aponta para F3/F4/F5 Corp |
| `index.html` (Pessoal) | Interface — objeto URLS aponta para F3/F4/F5 Pessoal |

## URLs hardcoded

### Corp
```js
var URLS = {
  f3: 'https://script.google.com/macros/s/AKfycby9YQftWg586o1m1gPEaMyHMMYzyYUJ8MRWY0WRSv67kGAkeEX4TVPXeLbB4_I6Wv7neA/exec',
  f4: 'https://script.google.com/macros/s/AKfycbxiWW0zVuFdRJCvzwCBeH8OIqsFJyKkhqZotgHX8vrD0UARbU3SUtJ7IxZsg2BXc_QrPw/exec',
  f5: 'https://script.google.com/macros/s/AKfycbwKsOut5TyYLf1pW_xm1He-zBvzZGYFM4KAEE5C6hssNZHsg9fL_QBXWjfF-zzIDxfXNQ/exec'
};
```

### Pessoal
```js
var URLS = {
  f3: 'https://script.google.com/macros/s/AKfycbw7QryYGzik1bbT0Mf4N5JcpuuNVoHAudTAbrT2jfzzXnz0wkuJfBFLIeMNViDO4SE2/exec',
  f4: 'https://script.google.com/macros/s/AKfycby6h6qvXqacFrf2TmcXYaflRQp7rvhklpnR27VWhIueh9pLxWvUCRYkFToJPxYezUN7cw/exec',
  f5: 'https://script.google.com/macros/s/AKfycbym0772425DQEUrNQn9TZc6C-wdRuqU1_erQVSoWzV-MEBbyCN4DOfJkaSd90cdVZHjSA/exec'
};
```

> A unica diferenca entre Corp e Pessoal no `index.html` e o objeto `URLS`.

## Isolamento

Corp nao conhece as URLs do Pessoal e vice-versa. Deploy independente por ambiente.
