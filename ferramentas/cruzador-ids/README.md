# 🔗 Cruzador de IDs — ADP × RM

> **StormX / Unilever BR** · NC Tool · Taxonomia

🌐 **Link:** https://falssp.github.io/Projeto-NC/ferramentas/cruzador-ids/

---

## O que é

O ADP gera os campos de taxonomia (Campaign Name, Ad Set/Placement Name, Ad name, URL Parametrizada…) na ordem em que os placements foram criados. A RM pode estar em ordem diferente — e as ordens raramente coincidem.

Este tool cruza os dois arquivos pelo **Placement ID / ID Flashtalking·Stormx** e entrega cada coluna do ADP já reordenada na sequência da RM, pronta para colar diretamente na planilha.

---

## Como usar

### Etapa 1 — Cruzamento de IDs

1. Selecione o **canal** na barra lateral esquerda (Google, Programmatic, YouTube, Meta, TikTok, Pinterest, Snapchat, X, Flashtalking)
2. Cole os **Placement IDs do ADP** no campo esquerdo — um por linha, sem cabeçalho
3. Cole os **IDs Flashtalking/Stormx da RM** no campo direito — um por linha, na ordem em que estão na RM
4. Clique **Cruzar IDs →** — o tool mostra quantos têm match e libera as etapas seguintes

### Etapas 2 em diante — campo por campo

Para cada campo do canal selecionado:

1. Navegue pela **barra lateral** até a etapa desejada (ex: "2. Campaign Name")
2. Cole a coluna do ADP correspondente — **mesma ordem e quantidade que o ID ADP**, sem cabeçalho
3. Clique **Gerar saída** — a saída aparece à direita já na **ordem da RM**
4. Clique **📋 Copiar** e cole diretamente na coluna correspondente da RM
5. Use **Gerar e avançar →** para ir passando de campo em campo automaticamente

> **Dica:** Cada etapa é independente. Você pode pular etapas e ir direto para o campo que precisa (ex: só a URL Parametrizada).

---

## Colunas de ID por canal

### ADP — Placement ID (linha 14 = cabeçalho, dados a partir da linha 15)

| Canal | Aba ADP | Coluna Placement ID |
|---|---|---|
| Google | Google | BG |
| Programmatic | Programmatic | BJ |
| YouTube | Youtube | BH |
| Meta | Meta e Tiktok | BI |
| TikTok | Meta e Tiktok | BI |
| Pinterest | Pinterest, Snapchat e Twitter | BE |
| Snapchat | Pinterest, Snapchat e Twitter | BE |
| X (Twitter) | Pinterest, Snapchat e Twitter | BE |
| Flashtalking | Flashtalking | BB |

### RM — ID Flashtalking/Stormx (linha 1 = cabeçalho, dados a partir da linha 2)

| Canal | Aba RM | Coluna ID |
|---|---|---|
| Google | Google | AU |
| Programmatic | Programmatic | AX |
| YouTube | YouTube | AR |
| Meta | Meta e Tiktok | AU |
| TikTok | Meta e Tiktok | AU |
| Pinterest | Pinterest, Snapchat e X | AX |
| Snapchat | Pinterest, Snapchat e X | AX |
| X (Twitter) | Pinterest, Snapchat e X | AX |
| Flashtalking | Flashtalking | AS |

---

## Campos transportados por canal

Os campos ficam no bloco verde do ADP. Abaixo os campos na ordem das etapas do tool:

### Google (cols CX→DA + DP)
| Etapa | Campo |
|---|---|
| 2 | Campaign Name |
| 3 | Ad Set/Placement Name |
| 4 | Ad name |
| 5 | Campaign - Reduzido (IO - Deals do YT: Line ups, masthead, first position, YT Select, Demand Gen) |
| 6 | Parameterized URL |

### Programmatic (cols DE→DL + EB)
| Etapa | Campo |
|---|---|
| 2 | Campaign |
| 3 | Insertion Order |
| 4 | Line Item |
| 5 | Creative/Ad |
| 6 | Creative/Ad Amazon - Reduzido (pegar na planilha de geração de ID) |
| 7 | IO Reduzido - Meli Ads |
| 8 | Line Item Reduzido - Meli Ads |
| 9 | Creative Reduzido - Meli Ads |
| 10 | Parameterized URL |

### YouTube (cols DC→DK + EA)
| Etapa | Campo |
|---|---|
| 2 | Campaign |
| 3 | Insertion Order |
| 4 | Line Item |
| 5 | AdGroup |
| 6 | Creative/Ad |
| 7 | IO - Reduzido (Campaign - Deals do YT: Line ups, masthead, first position, YT Select - Original) |
| 8 | IO Youtube Masthead CPH (Compra Direta) |
| 9 | Ad Group Youtube Masthead CPH (Compra Direta) |
| 10 | Ad Name Youtube Masthead CPH (Compra Direta) |
| 11 | Parameterized URL |

### Meta / TikTok (cols DC→DI + DX)
> Mesmos campos para os dois canais — seguem a aba "Meta e Tiktok" do ADP

| Etapa | Campo |
|---|---|
| 2 | Campaign Name |
| 3 | Ad Set/Placement Name |
| 4 | Ad name |
| 5 | Campaign Tiktok Branded Mission e Buzz (Compra Direta) |
| 6 | Ad Set Tiktok Branded Mission e Buzz (Compra Direta) |
| 7 | Ad Name Tiktok Branded Mission e Buzz (Compra Direta) |
| 8 | Campaign Tiktokshop |
| 9 | Parameterized URL |

### Pinterest / Snapchat / X (cols CY→DD + DS)
> Mesmos campos para os três canais — seguem a aba "Pinterest, Snapchat e Twitter" do ADP

| Etapa | Campo |
|---|---|
| 2 | Campaign Name |
| 3 | Ad Set/Placement Name |
| 4 | Ad name |
| 5 | Campaign Name (Pinterest - Compra Direta) |
| 6 | Ad Set/Placement Name (Pinterest - Compra Direta) |
| 7 | Ad name (Pinterest - Compra Direta) |
| 8 | Parameterized URL |

### Flashtalking (cols CZ→DD + DT)
| Etapa | Campo |
|---|---|
| 2 | Campaign Name |
| 3 | Ad Set/Placement Name |
| 4 | Ad name |
| 5 | Campaign Reduzido - Meli Ads e Kwai |
| 6 | Ad Name Reduzido - Kwai |
| 7 | Parameterized URL |

---

## Comportamento

| Situação | O que acontece |
|---|---|
| ID encontrado nos dois lados | Dado transportado ✅ |
| ID da RM não encontrado no ADP | Célula em branco ⬜ + aviso |
| ID ADP e Dado ADP com nº de linhas diferente | Aviso visual, não bloqueia |
| Campo vazio no ADP | Célula em branco na saída |
| Trocar de canal | Apaga tudo e pede confirmação |
| Nova coluna criada no ADP ou RM | **Não afeta o tool** — como é manual, só muda qual coluna você copia. O tool não lê por posição de coluna |

---

## Perguntas frequentes

**Posso pular etapas?**
Sim. Cada etapa é independente. Clique direto na etapa que precisa na sidebar.

**E se eu só precisar de um campo?**
Faça só a Etapa 1 (IDs) e a etapa do campo que precisa. Ignore as demais.

**O Dado ADP precisa ter exatamente o mesmo número de linhas que o ID ADP?**
Sim, idealmente. Se for diferente, o tool avisa e preenche em branco onde faltar.

**Funciona para qualquer versão do ADP?**
Sim, desde que as colunas de ID e os campos de output estejam nas posições documentadas acima. Se o ADP mudar de estrutura, os campos a copiar mudam mas o tool não quebra — é só buscar a coluna certa.

**Meta e TikTok têm os mesmos campos?**
Sim — seguem a mesma aba do ADP ("Meta e Tiktok"). Os canais são separados na sidebar por clareza, mas os campos transportados são idênticos.

**Pinterest, Snapchat e X têm os mesmos campos?**
Sim — seguem a aba "Pinterest, Snapchat e Twitter" do ADP.

---

## Estrutura do repositório

```
ferramentas/cruzador-ids/
├── index.html   ← tool completo, self-contained (sem dependências externas)
└── README.md    ← esta documentação
```

---

## Histórico de canais separados

| Canal | Status | Aba ADP de referência |
|---|---|---|
| Google | ✅ Separado | Google |
| Programmatic (DV360) | ✅ Separado | Programmatic |
| YouTube | ✅ Separado | Youtube |
| Meta | ✅ Separado | Meta e Tiktok |
| TikTok | ✅ Separado | Meta e Tiktok |
| Pinterest | ✅ Separado | Pinterest, Snapchat e Twitter |
| Snapchat | ✅ Separado | Pinterest, Snapchat e Twitter |
| X (Twitter) | ✅ Separado | Pinterest, Snapchat e Twitter |
| Flashtalking | ✅ Separado | Flashtalking |

---

*Mantido pelo time de Taxonomia · StormX · Grasp*
