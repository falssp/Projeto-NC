# 🔗 Cruzador de IDs — ADP × RM

> **StormX / Unilever BR** — Ferramentas de Taxonomia

Faz o cruzamento entre o **Placement ID do ADP** e o **ID Flashtalking/Stormx da RM**, transportando qualquer dado do ADP para a ordem correta da RM — o equivalente a um PROCV manual sem precisar abrir o Excel.

---

## Como usar

### 1 — Cole os três inputs

| Campo | O que colar | Fonte |
|---|---|---|
| **ID ADP** | Placement IDs do ADP | Coluna `BG` / `BJ` / `BH` / `BI` / `BE` / `BB` (varia por canal) |
| **ID RM** | IDs Flashtalking/Stormx da RM | Coluna `AU` / `AX` / `AR` / `AS` (varia por canal) |
| **Dado ADP** | O campo que você quer transportar (Campaign Name, Placement Name, etc.) | Qualquer coluna do ADP, na mesma ordem e quantidade que ID ADP |

> Um valor por linha, sem cabeçalho.

### 2 — Clique em **Cruzar**

O tool faz o PROCV: para cada ID da RM, localiza o ID correspondente no ADP e retorna o dado alinhado à **ordem da RM**.

### 3 — Copie a saída e cole na RM

O campo **Saída** já está pronto para colar diretamente na coluna da RM.

---

## Colunas de ID por canal

### ADP — Placement ID

| Canal | Aba ADP | Coluna |
|---|---|---|
| Google | Google | BG |
| Programmatic | Programmatic | BJ |
| YouTube | Youtube | BH |
| Meta e TikTok | Meta e Tiktok | BI |
| Pinterest / Snap / X | Pinterest, Snapchat e Twitter | BE |
| Flashtalking | Flashtalking | BB |

### RM — ID Flashtalking/Stormx

| Canal | Aba RM | Coluna |
|---|---|---|
| Google | Google | AU |
| Programmatic | Programmatic | AX |
| YouTube | YouTube | AR |
| Meta e TikTok | Meta e Tiktok | AU |
| Pinterest / Snap / X | Pinterest, Snapchat e X | AX |
| Flashtalking | Flashtalking | AS |

---

## Comportamento

- **Match**: ID encontrado nos dois lados → dado transportado ✅
- **Sem match**: ID da RM não existe no ADP → célula em branco na saída ⬜
- **Mismatch de linhas**: ID ADP e Dado ADP com quantidades diferentes → aviso visual, IDs sem dado recebem célula em branco (não bloqueia o cruzamento)

---

## Recursos

- 📋 **Copiar saída** — copia apenas a coluna resultado (pronta para colar na RM)
- 📋 **Copiar tudo (TSV)** — copia a tabela completa com status + IDs + dado (para colar no Sheets)
- Suporte a **dark mode** automático

---

## Estrutura

```
ferramentas/cruzador-ids/
├── index.html   ← tool completo (self-contained, sem dependências externas)
└── README.md    ← esta documentação
```

---

*Mantido pelo time de Taxonomia · StormX · Grasp*
