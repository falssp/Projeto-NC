# Dicionário Influencer — Fórmulas e Cores por Rede

> **v4 — Out/2026.** Kwai adicionado. Coluna C migrada para derivar de B (preserva ç e acentos). Branches E completos para todas as redes. YouTube detecta links de vídeo. X e Twitter separados.

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

### C — SharePoint Name (derivada de B)
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
SE(REGEXMATCH(H3:H;"x\.com");"X";
SE(REGEXMATCH(H3:H;"twitter\.com");"Twitter";
SE(REGEXMATCH(H3:H;"pinterest\.com");"Pinterest";
SE(REGEXMATCH(H3:H;"linkedin\.com");"LinkedIn";
SE(REGEXMATCH(H3:H;"snapchat\.com");"Snapchat";
SE(REGEXMATCH(H3:H;"twitch\.tv");"Twitch";
SE(REGEXMATCH(H3:H;"kwai\.com");"Kwai";
SE(REGEXMATCH(H3:H;"threads\.net");"Threads";
"Verificar cadastro da mídia")))))))))))))
```
> X e Twitter separados desde Out/2026 — x.com → "X", twitter.com → "Twitter".

### E — Perfil na Rede Social
```
=ARRAYFORMULA(
SE(H3:H="";"";
SE(REGEXMATCH(H3:H;"tiktok\.com");
  SE(REGEXMATCH(H3:H;"@");
    REGEXEXTRACT(H3:H;"@([^/?&]+)");
    REGEXEXTRACT(H3:H;"tiktok\.com/([^/?&@]+)"));
SE(REGEXMATCH(H3:H;"youtube\.com");
  SE(REGEXMATCH(H3:H;"youtube\.com/(?:watch|shorts|embed|playlist|results)");
    "⚠️ link de vídeo — informe o canal";
    REGEXEXTRACT(H3:H;"youtube\.com/(?:c/|channel/|user/|@)?@?([^/?&]+)"));
SE(REGEXMATCH(H3:H;"instagram\.com");
  REGEXEXTRACT(H3:H;"instagram\.com/@?([^/?&]+)");
SE(REGEXMATCH(H3:H;"twitch\.tv");
  REGEXEXTRACT(H3:H;"twitch\.tv/([^/?&]+)");
SE(REGEXMATCH(H3:H;"kwai\.com");
  REGEXEXTRACT(H3:H;"kwai\.com/@?([^/?&]+)");
SE(REGEXMATCH(H3:H;"facebook\.com");
  REGEXEXTRACT(H3:H;"facebook\.com/(?:pg/)?([^/?&]+)");
SE(REGEXMATCH(H3:H;"x\.com|twitter\.com");
  REGEXEXTRACT(H3:H;"(?:x|twitter)\.com/([^/?&]+)");
SE(REGEXMATCH(H3:H;"pinterest\.com");
  REGEXEXTRACT(H3:H;"pinterest\.com/([^/?&]+)");
SE(REGEXMATCH(H3:H;"linkedin\.com");
  IFERROR(REGEXEXTRACT(H3:H;"linkedin\.com/in/([^/?&]+)");REGEXEXTRACT(H3:H;"linkedin\.com/company/([^/?&]+)"));
SE(REGEXMATCH(H3:H;"snapchat\.com");
  IFERROR(REGEXEXTRACT(H3:H;"snapchat\.com/add/([^/?&]+)");REGEXEXTRACT(H3:H;"snapchat\.com/([^/?&]+)"));
""))))))))))))
```

### F — Influencer Handle
```
=ARRAYFORMULA(SE(E3:E="";"";REGEXREPLACE(TO_TEXT(E3:E);"[^A-Za-z0-9]";"")))
```

---

## Formatação condicional — D3:D

| Plataforma | Hex | Fórmula | Status |
|---|---|---|---|
| TikTok | `#000000` | `=REGEXMATCH(MAIÚSCULA(H3);"TIKTOK")` | ✅ |
| Instagram | `#E1306C` | `=REGEXMATCH(MAIÚSCULA(H3);"INSTAGRAM")` | ✅ |
| Facebook | `#1877F2` | `=REGEXMATCH(MAIÚSCULA(H3);"FACEBOOK\|META")` | ✅ |
| X | `#000000` | `=REGEXMATCH(MAIÚSCULA(H3);"(^\ \|\ )X($\|\ )")` | ✅ Out/2026 |
| Twitter | `#1DA1F2` | `=REGEXMATCH(MAIÚSCULA(H3);"TWITTER")` | ✅ Out/2026 |
| Pinterest | `#E60023` | `=REGEXMATCH(MAIÚSCULA(H3);"PINTEREST")` | ✅ |
| LinkedIn | `#0A66C2` | `=REGEXMATCH(MAIÚSCULA(H3);"LINKEDIN")` | ✅ |
| Snapchat | `#FFFC00` · texto preto | `=REGEXMATCH(MAIÚSCULA(H3);"SNAPCHAT")` | ✅ |
| Twitch | `#9146FF` | `=REGEXMATCH(MAIÚSCULA(H3);"TWITCH")` | ✅ |
| YouTube | `#FF0000` | `=REGEXMATCH(MAIÚSCULA(H3);"YOUTUBE")` | ✅ |
| Kwai *(Out/2026)* | `#FF6600` | `=REGEXMATCH(MAIÚSCULA(H3);"KWAI")` | ✅ |

---

## Exemplos de URL por rede

| Rede | URL | D | E |
|---|---|---|---|
| TikTok | `https://www.tiktok.com/@crismacahiba` | TikTok | crismacahiba |
| Instagram | `https://www.instagram.com/crismacahiba/` | Instagram | crismacahiba |
| YouTube canal | `https://www.youtube.com/@NomeCanal` | YouTube | NomeCanal |
| YouTube vídeo | `https://www.youtube.com/watch?v=xxx` | YouTube | ⚠️ link de vídeo — informe o canal |
| Twitch | `https://www.twitch.tv/nomecanal` | Twitch | nomecanal |
| Kwai | `https://www.kwai.com/@bialourolopes` | Kwai | bialourolopes |
| X | `https://x.com/handle` | X | handle |
| Twitter | `https://twitter.com/handle` | Twitter | handle |
| Facebook | `https://www.facebook.com/NomePagina` | Facebook | NomePagina |
| LinkedIn | `https://www.linkedin.com/in/nomeperfil` | LinkedIn | nomeperfil |
| Snapchat | `https://www.snapchat.com/add/nomeperfil` | Snapchat | nomeperfil |

---

## Como adicionar nova rede

1. **Testar domínio** em célula isolada: `=REGEXMATCH("https://www.threads.net/@handle";"threads\.net")`
2. **Atualizar D** — inserir `SE(REGEXMATCH(H3:H;"threads\.net");"Threads";` antes do `"Verificar cadastro da mídia"`
3. **Atualizar E** — inserir branch antes do `""` final: `SE(REGEXMATCH(H3:H;"threads\.net"); REGEXEXTRACT(H3:H;"threads\.net/@?([^/?&]+)");"")`
4. **Formatação condicional** — Formatar → Formatação condicional → Fórmula personalizada → `=REGEXMATCH(MAIÚSCULA(H3);"THREADS")` → intervalo `D3:D`
5. **Usar o Gerador** → [ferramentas/influencer-formulas](https://falssp.github.io/Projeto-NC/ferramentas/influencer-formulas/) — gera as fórmulas D, E e regras de formatação automaticamente

---

## Pontos de atenção

- **C antes de Out/2026** eliminava ç, ã, é com `[[:^ascii:]]`. Corrigido na v2.
- **Intervalo D3:D**: sem limite de linha — não precisa expandir ao crescer a planilha.
- **F é ASCII-only por design**: chave de dedup. Perfil legível fica em E.
- **YouTube**: URL de vídeo retorna aviso em E — informar o link do canal, não do vídeo.
- **X e Twitter separados**: mesma cor (#000000) mas entradas distintas nas fórmulas e formatação condicional.
