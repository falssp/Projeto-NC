# Dicionário Influencer — Fórmulas e Cores por Rede

> **v1 — Out/2026.** Kwai adicionado. Coluna C migrada para derivar de B (preserva ç e acentos). Branch Kwai adicionado em E.

## Coluna B — Nome_Do_Influenciador_ÚNICO

```
=ARRAYFORMULA(SE(A3:A="";"";REGEXREPLACE(REGEXREPLACE(SUBSTITUIR(PRI.MAIÚSCULA(ARRUMAR(A3:A));" ";"_");"[._]+";"_");"_$";"")))
```

PRI.MAIÚSCULA por palavra → substitui espaços por `_` → normaliza underscores duplos → remove `_` final. Preserva ç, ã, é etc.

## Coluna C — SharePoint Name

```
=ARRAYFORMULA(SE(B3:B="";"";MINÚSCULA(SUBSTITUIR(B3:B;"_";""))))
```

Deriva de B (já normalizado) → remove underscores → minúsculo. Preserva ç, acentos.

> **Atenção:** versão anterior usava `REGEXREPLACE(A3:A;"[[:punct:][:^ascii:]]";"")` aplicado direto em A, eliminando ç, ã, é. A versão atual corrige isso.

## Coluna D — Rede Social

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

## Coluna E — Perfil na Rede Social

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

O padrão `/@?` cobre URLs com e sem `@` no Kwai.

## Coluna F — Influencer Handle

```
=ARRAYFORMULA(SE(E3:E="";"";REGEXREPLACE(TO_TEXT(E3:E);"[^A-Za-z0-9]";"")))
```

Remove tudo que não for alfanumérico ASCII. Usado como chave de busca/dedup.

## Formatação condicional — Coluna D (D3:D570)

Todas as regras usam **Fórmula personalizada** no intervalo `D3:D570`. As regras verificam a coluna H (link), não D.

| Plataforma | Cor de fundo | Fórmula |
|---|---|---|
| TikTok | `#000000` preto | `=REGEXMATCH(MAIÚSCULA(H3);"TIKTOK")` |
| Instagram | `#e1306c` rosa | `=REGEXMATCH(MAIÚSCULA(H3);"INSTAGRAM")` |
| Facebook | `#1877f2` azul | `=REGEXMATCH(MAIÚSCULA(H3);"FACEBOOK\|META")` |
| X / Twitter | `#000000` preto | `=REGEXMATCH(MAIÚSCULA(H3);"TWITTER\|(^\ \|\ )X($\|\ )")` |
| Pinterest | `#e60023` vermelho | `=REGEXMATCH(MAIÚSCULA(H3);"PINTEREST")` |
| Twitch | `#9146ff` roxo | `=REGEXMATCH(MAIÚSCULA(H3);"TWITCH")` |
| YouTube | `#ff0000` vermelho YT | `=REGEXMATCH(MAIÚSCULA(H3);"YOUTUBE")` |
| **Kwai** *(Out/2026)* | `#ff6600` laranja | `=REGEXMATCH(MAIÚSCULA(H3);"KWAI")` |
| **LinkedIn** *(Out/2026)* | `#0a66c2` azul-marinho | `=REGEXMATCH(MAIÚSCULA(H3);"LINKEDIN")` |
| **Snapchat** *(Out/2026)* | `#fffc00` amarelo · texto preto | `=REGEXMATCH(MAIÚSCULA(H3);"SNAPCHAT")` |

## Como adicionar nova rede

1. **D**: adicionar `SE(REGEXMATCH(H3:H;"dominio\.ext");"NomeDaRede";` antes do `"Verificar cadastro da mídia"`.
2. **E**: adicionar branch `SE(REGEXMATCH(H3:H;"dominio\.ext"); REGEXEXTRACT(H3:H;"dominio\.ext/@?([^/?&]+)");` antes do `""` final.
3. **Formatação condicional**: Formatar → Formatação condicional → Adicionar outra regra → Fórmula personalizada → `=REGEXMATCH(MAIÚSCULA(H3);"NOMEDAREDE")` → intervalo `D3:D570` → cor da plataforma.
4. Fechar a cadeia de SE corretamente (cada SE abre dois parênteses extras no final).

## Pontos de atenção

- **Intervalo D3:D570**: ao adicionar linhas além de 570, expandir o intervalo em todas as regras de uma vez.
- **Kwai URLs**: cobre `kwai.com/@handle` e `kwai.com/handle` pelo padrão `/@?`.
- **F é ASCII-only**: o handle limpo fica em F (chave). O perfil legível com acentos fica em E.
