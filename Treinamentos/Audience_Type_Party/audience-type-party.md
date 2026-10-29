# Audience Type × Audience Party — Guia de Referência

> **Status:** v2. Regra do Remarket (Rmkt) definida: somente 1PD-DID. As demais combinações foram extraídas do Dicionário Grasp 2026, do Glossário 2026 e da UNCC Digital Platform String Tool. O Rmkt ainda não foi incorporado ao Dicionário/Glossário (ver *Pontos de atenção*).

## Resposta rápida: Audience Type = Rmkt

Permitido **somente com 1PD-DID**. Qualquer outro party (1PD-DAD, 1PD-DID+DAD, No 1PD) não é permitido.

## Os dois campos

| Campo | Valores |
|---|---|
| `gl_audience_party` (Audience Party GL) | `1pd-dad`, `1pd-did`, `1pd-diddad`, `no1pd` |
| `ft_audience_type` (Audience Type FT) | CRM, Lookalike, CombinedAudiences, DMP, Collected in-platform, Custom, Remarket, Behavioural, Demographic, In-Market, Interest/Affinity, In-Market & Lifestyle, Lifestyle/Life Events (e `None`, ver pontos de atenção) |

## O que significa cada Audience Party

| Party | Significado (Glossário 2026) |
|---|---|
| **1PD-DID** | Só dados próprios (1PD) de *Digital ID Data*: identificadores digitais **anônimos** coletados nas propriedades digitais da Unilever |
| **1PD-DAD** | Só dados próprios (1PD) de *Deterministic Audience Data*: consumidores **identificados** por cadastro, CRM ou outras fontes determinísticas |
| **1PD-DID+DAD** | Combinação das bases DID e DAD |
| **No 1PD** | Não usa dados próprios para segmentar a audiência |

## Matriz: Audience Type → Audience Party permitido

| Audience Type | Short | 1PD-DAD | 1PD-DID | 1PD-DID+DAD | No 1PD |
|---|---|---|---|---|---|
| CRM | `crm` | ✅ | — | — | — |
| Lookalike | `llike` | ✅ | ✅ | ✅ | — |
| CombinedAudiences | `combaud` | ✅ | — | ✅ | ✅ |
| DMP | `dmp` | — | ✅ | — | — |
| Collected in-platform | `collpform` | — | ✅ | — | — |
| Custom | `cust` | — | — | ✅ | ✅ |
| Remarket | `rmkt` | — | ✅ | — | — |
| Behavioural | `behav` | — | — | — | ✅ |
| Demographic | `demog` | — | — | — | ✅ |
| In-Market | `inmark` | — | — | — | ✅ |
| Interest/Affinity | `intaff` | — | — | — | ✅ |
| In-Market & Lifestyle | `inmlst` | — | — | — | ✅ |
| Lifestyle/Life Events | `lstyle` | — | — | — | ✅ |

## Visão inversa: Audience Party → Audience Types

- **1PD-DAD:** CRM, Lookalike, CombinedAudiences
- **1PD-DID:** Lookalike, DMP, Collected in-platform, Remarket
- **1PD-DID+DAD:** Lookalike, CombinedAudiences, Custom
- **No 1PD:** CombinedAudiences, Custom, Behavioural, Demographic, In-Market, Interest/Affinity, In-Market & Lifestyle, Lifestyle/Life Events

## Pontos de atenção

1. **Rmkt não está no nosso Dicionário, no Glossário nem no RM (`Dados`).** Está na aba `Mandated Values Freetext` da UNCC como *Remarket / Rmkt*, ali permitido com os três 1PD. A regra adotada aqui é mais restritiva (somente 1PD-DID): Rmkt com 1PD-DAD ou 1PD-DID+DAD, aceito na UNCC, não seria aceito por nós. Falta incorporar a regra ao Dicionário e ao Glossário.
2. **Glossário com abreviações invertidas:** na aba `Galileo e Freetext`, a opção `1PD-DID` aparece com a abreviação `1pd-dad` (e vice-versa). Pelo texto do Significado e pelo Dicionário, o correto é DID → `1pd-did` e DAD → `1pd-dad`.
3. **`None` como Audience Type:** consta na lista de tipos da UNCC (`Mandated Dimensions & Values`), mas não encontrei regra de party para ele.
4. **DMP e remarketing:** o Glossário descreve DMP como audiência com dados próprios *ou segmentos de remarketing*, ambos com 1PD-DID.

## Quando a UL usar um type com party fora da matriz

1. Confirmar na taxonomia enviada qual `gl_audience_party` veio junto.
2. Se a combinação não estiver na matriz (ex.: Rmkt + `1pd-dad`), devolver o ajuste: ou o type muda, ou o party passa a ser um `1pd-*` compatível.
3. Se estiver na matriz, seguir normalmente.

## Fontes

- Dicionário Grasp 2026, aba Google Search, colunas `Regra-Audience-Party-x-Audience-Type` (BT:BU)
- Glossário 2026, aba Galileo e Freetext, coluna Relação
- UNCC Digital Platform String Tool, abas `Mandated Values Freetext` e `Mandated Dimensions & Values`
- RM StormX 2026 v6.0, aba `Dados` (regra sem Rmkt)
