# 🔗 Cruzador de IDs — ADP × RM

> **StormX / Unilever BR** — F4 Acessórios · NC Tool

Cruza o **Placement ID do ADP** com o **ID Flashtalking/Stormx da RM** e transpõe todos os campos de output do ADP para a ordem correta da RM — campo por campo, etapa por etapa.

---

## Como usar

### Etapa 1 — IDs
1. Cole os **Placement IDs do ADP** (um por linha, sem cabeçalho)
2. Cole os **IDs Flashtalking/Stormx da RM** (um por linha, na ordem da RM)
3. Clique **Cruzar IDs** → o tool mostra quantos têm match e libera as etapas seguintes

### Etapas 2 em diante — campo por campo
Para cada campo do canal selecionado:
1. Cole a coluna do ADP (mesma ordem e quantidade que o ID ADP)
2. Clique **Gerar saída** → a saída aparece alinhada à **ordem da RM**
3. Clique **📋 Copiar** e cole diretamente na coluna correspondente da RM
4. Use **Gerar e avançar →** para seguir para o próximo campo sem voltar ao menu

---

## Campos por canal

### Google
`Campaign Name` · `Ad Set/Placement Name` · `Ad name` · `Campaign - Reduzido (IO - Deals do YT...)` · `Parameterized URL`

### Programmatic
`Campaign` · `Insertion Order` · `Line Item` · `Creative/Ad` · `Creative/Ad Amazon - Reduzido` · `IO Reduzido - Meli Ads` · `Line Item Reduzido - Meli Ads` · `Creative Reduzido - Meli Ads` · `Parameterized URL`

### YouTube
`Campaign` · `Insertion Order` · `Line Item` · `AdGroup` · `Creative/Ad` · `IO - Reduzido (...)` · `IO Youtube Masthead CPH` · `Ad Group Youtube Masthead CPH` · `Ad Name Youtube Masthead CPH` · `Parameterized URL`

### Meta e TikTok
`Campaign Name` · `Ad Set/Placement Name` · `Ad name` · `Campaign Tiktok Branded Mission e Buzz` · `Ad Set Tiktok Branded Mission e Buzz` · `Ad Name Tiktok Branded Mission e Buzz` · `Campaign Tiktokshop` · `Parameterized URL`

### Pinterest / Snap / X
`Campaign Name` · `Ad Set/Placement Name` · `Ad name` · `Campaign Name (Pinterest - Compra Direta)` · `Ad Set/Placement Name (Pinterest - Compra Direta)` · `Ad name (Pinterest - Compra Direta)` · `Parameterized URL`

### Flashtalking
`Campaign Name` · `Ad Set/Placement Name` · `Ad name` · `Campaign Reduzido - Meli Ads e Kwai` · `Ad Name Reduzido - Kwai` · `Parameterized URL`

---

## Colunas de ID

| Canal | ADP — Placement ID | RM — ID Flashtalking/Stormx |
|---|---|---|
| Google | BG | AU |
| Programmatic | BJ | AX |
| YouTube | BH | AR |
| Meta e TikTok | BI | AU |
| Pinterest / Snap / X | BE | AX |
| Flashtalking | BB | AS |

---

## Comportamento

- **Match** → dado transportado ✅
- **Sem match** → célula em branco na saída ⬜ + aviso
- **Mismatch de linhas** → aviso visual, IDs sem par recebem branco (não bloqueia)
- Canal pode ser trocado a qualquer momento (limpa tudo e pergunta confirmação)

---

## Estrutura

```
ferramentas/cruzador-ids/
├── index.html   ← tool completo (self-contained)
└── README.md    ← esta documentação
```

---

*Mantido pelo time de Taxonomia · StormX · Grasp*
