# Dicionário Influencer — Fórmulas e Cores por Rede

> **v2 — Out/2026.** Kwai adicionado. Coluna C migrada para derivar de B (preserva ç e acentos). Branch Kwai em E. Exemplos de URL, guia de redes futuras e checklist de validação adicionados.

---

## Colunas

| Col | Campo | Origem | Observação |
|---|---|---|---|
| A | Nome Do Influenciador ÚNICO | Manual | Entrada principal |
| B | Nome_Do_Influenciador_ÚNICO | Fórmula ← A | PRI.MAIÚSCULA + underscore; preserva ç, acentos |
| C | SharePoint Name | Fórmula ← B | B minúsculo sem underscore; preserva ç, acentos |
| D | Rede Social | Fórmula ← H | Detecta plataforma pelo domínio |
| E | Perfil na Rede Social | Fórmula ← H | Extrai handle/slug |
| F | Influencer Handle | Fórmula ← E | ASCII-only; chave de dedup |
| G | Qde de seguidores | Manual | — |
| H | Link | Manual | URL completa; base de D, E e F |

---

## Fórmulas

### B — Nome_Do_Influenciador_ÚNICO
```
=ARRAYFORMULA(SE(A3:A="";"";REGEXREPLACE(REGEXREPLACE(SUBSTITUIR(PRI.MAIÚSCULA(ARRUMAR(A3:A));" ";"_");"[._]+";"_");"_$";"")))
```

### C — SharePoint Name (v2: deriva de B)
```
=ARRAYFORMULA(SE(B3:B="";"";MINÚSCULA(SUBSTITUIR(B3:B;"_";""))))
```
> Versão anterior usava `REGEXREPLACE(A3:A;"[[:punct:][:^ascii:]]";"")` e eliminava ç, ã, é.

### D — Rede Social
```
=ARRAYFORMULA(SE(H3:H="";"";SE(REGEXMATCH(H3:H;"facebook\.com");"Facebook";
SE(REGEXMATCH(H3:H;"instagram\.com");"Instagram";
SE(REGEXMATCH(H3:H;"tiktok\.com");"TikTok";
SE(REGEXMATCH(H3:H;"youtube\.com|youtu\.be");"YouTube";
SE(REGEXMATCH(H3:H;"x\.com|twitter\.com");"X";
SE(REGEXMATCH(H3:H;"pinterest\.com");"Pinterest";
SE(REGEXMATCH(H3:H;"linkedin\.com");"LinkedIn";
SE(REGEXMATCH(H3:H;"snapchat\.com");"Snapchat";
SE(REGEXMATCH(H3:H;"twitch\.tv");"Twitch";
SE(REGEXMATCH(H3:H;"kwai\.com");"Kwai";
"Verificar cadastro da mídia"))))))))))))
```

### E — Perfil na Rede Social
```
=ARRAYFORMULA(
SE(H3:H="";"";
SE(REGEXMATCH(H3:H;"tiktok\.com");
  SE(REGEXMATCH(H3:H;"@");
    REGEXEXTRACT(H3:H;"@([^/?&]+)");
    REGEXEXTRACT(H3:H;"tiktok\.com/([^/?&@]+)"));
SE(REGEXMATCH(H3:H;"youtube\.com");
  REGEXEXTRACT(H3:H;"youtube\.com/(?:c/|channel/|user/|@)?([^/?&]+)");
SE(REGEXMATCH(H3:H;"instagram\.com");
  REGEXEXTRACT(H3:H;"instagram\.com/([^/?&]+)");
SE(REGEXMATCH(H3:H;"twitch\.tv");
  REGEXEXTRACT(H3:H;"twitch\.tv/([^/?&]+)");
SE(REGEXMATCH(H3:H;"kwai\.com");
  REGEXEXTRACT(H3:H;"kwai\.com/@?([^/?&]+)");
"")))))))
```

### F — Influencer Handle
```
=ARRAYFORMULA(SE(E3:E="";"";REGEXREPLACE(TO_TEXT(E3:E);"[^A-Za-z0-9]";"")))
```

---

## Formatação condicional — D3:D570

| Plataforma | Hex | Fórmula | Status |
|---|---|---|---|
| TikTok | `#000000` | `=REGEXMATCH(MAIÚSCULA(H3);"TIKTOK")` | ✅ |
| Instagram | `#e1306c` | `=REGEXMATCH(MAIÚSCULA(H3);"INSTAGRAM")` | ✅ |
| Facebook | `#1877f2` | `=REGEXMATCH(MAIÚSCULA(H3);"FACEBOOK\|META")` | ✅ |
| X / Twitter | `#00bfff` | `=REGEXMATCH(MAIÚSCULA(H3);"TWITTER\|(^\ \|\ )X($\|\ )")` | ✅ |
| Pinterest | `#e60023` | `=REGEXMATCH(MAIÚSCULA(H3);"PINTEREST")` | ✅ |
| Twitch | `#9146ff` | `=REGEXMATCH(MAIÚSCULA(H3);"TWITCH")` | ✅ |
| YouTube | `#ff0000` | `=REGEXMATCH(MAIÚSCULA(H3);"YOUTUBE")` | ✅ |
| Kwai *(Out/2026)* | `#ff6600` | `=REGEXMATCH(MAIÚSCULA(H3);"KWAI")` | ✅ |
| LinkedIn *(Out/2026)* | `#0a66c2` | `=REGEXMATCH(MAIÚSCULA(H3);"LINKEDIN")` | ✅ |
| Snapchat *(Out/2026)* | `#fffc00` · texto preto | `=REGEXMATCH(MAIÚSCULA(H3);"SNAPCHAT")` | ✅ |

---

## Exemplos de URL por rede

| Rede | URL | D | E |
|---|---|---|---|
| TikTok | `https://www.tiktok.com/@crismacahiba` | TikTok | crismacahiba |
| TikTok | `https://www.tiktok.com/crismacahiba` | TikTok | crismacahiba |
| Instagram | `https://www.instagram.com/crismacahiba/` | Instagram | crismacahiba |
| YouTube | `https://www.youtube.com/@NomeCanal` | YouTube | NomeCanal |
| YouTube | `https://www.youtube.com/c/NomeCanal` | YouTube | NomeCanal |
| Twitch | `https://www.twitch.tv/nomecanal` | Twitch | nomecanal |
| Kwai | `https://www.kwai.com/@bialourolopes` | Kwai | bialourolopes |
| Kwai | `https://www.kwai.com/bialourolopes` | Kwai | bialourolopes |
| Facebook | `https://www.facebook.com/NomePagina` | Facebook | — (manual) |
| X | `https://x.com/handle` | X | — (manual) |
| LinkedIn | `https://www.linkedin.com/in/nomeperfil` | LinkedIn | — (manual) |

---

## Como adicionar nova rede

1. **Identificar domínio** — testar em célula isolada: `=REGEXMATCH("https://www.threads.net/@handle";"threads\.net")`
2. **Atualizar D** — inserir `SE(REGEXMATCH(H3:H;"threads\.net");"Threads";` antes do `"Verificar cadastro da mídia"`
3. **Atualizar E** — inserir branch antes do `""` final: `SE(REGEXMATCH(H3:H;"threads\.net"); REGEXEXTRACT(H3:H;"threads\.net/@?([^/?&]+)");"")`
4. **Adicionar formatação condicional** — Formatar → Formatação condicional → Fórmula personalizada → `=REGEXMATCH(MAIÚSCULA(H3);"THREADS")` → intervalo `D3:D570`
5. **Verificar parênteses** — cada SE adiciona um parêntese extra no fechamento
6. **Atualizar este guia**

---

## Redes futuras — domínio e cor sugerida

| Rede | Domínio | Hex sugerido | Observação |
|---|---|---|---|
| Threads | `threads.net` | `#101010` | `threads.net/@handle` |
| Bluesky | `bsky.app` | `#0085ff` | `bsky.app/profile/handle.bsky.social` |
| BeReal | `bereal.com` | `#1c1c1c` | `bereal.com/handle` |
| Telegram | `t.me` | `#26a5e4` | `t.me/handle` |
| Spotify (podcast) | `open.spotify.com` | `#1db954` | `open.spotify.com/show/ID` |
| Substack | `substack.com` | `#ff6719` | `handle.substack.com` — subdomínio, atenção no regex |

---

## Checklist de validação pós-adição

- [ ] D preencheu corretamente (nome da rede, não "Verificar cadastro da mídia")
- [ ] E extraiu o handle — testar com 3 URLs (com @, sem @, com barra no final)
- [ ] F preenchido automaticamente a partir de E
- [ ] Cor aparece na coluna D
- [ ] Intervalo da regra condicional é `D3:D570`
- [ ] Parênteses balanceados em D e E
- [ ] Testado com URL com parâmetros (ex: `?igsh=xxx`)
- [ ] Guia atualizado (tabelas de Cores e Exemplos de URL)

---

## Pontos de atenção

- **C antes de Out/2026** eliminava ç, ã, é com `[[:^ascii:]]`. Corrigido na v2.
- **Intervalo D3:D570**: ao passar de 570 linhas, expandir em todas as 10 regras de uma vez.
- **E vazio para Facebook, X, Pinterest, LinkedIn, Snapchat**: branch pendente; handle manual por enquanto.
- **F é ASCII-only por design**: chave de dedup. Perfil legível fica em E.
- **Ordem dos SE em D**: domínios mais específicos primeiro.
- **Substack usa subdomínio**: `handle.substack.com` — regex sem âncora de início.
