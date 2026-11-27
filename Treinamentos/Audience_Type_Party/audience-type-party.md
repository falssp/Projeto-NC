# Audience Type × Audience Party — Guia de Referência

> **Status:** v3. Matriz completa — padrão de mercado. Sujeita a ajuste caso a taxonomia UL defina regras específicas.

## Resposta rápida: Audience Type = Rmkt

Permitido **somente com 1PD-DID**. Qualquer outro party (1PD-DAD, 1PD-DID+DAD, No 1PD) não é permitido.

## Os dois campos

| Campo | Valores |
|---|---|
| `gl_audience_party` (Audience Party GL) | `1pd-dad`, `1pd-did`, `1pd-diddad`, `no1pd` |
| `ft_audience_type` (Audience Type FT) | CRM, Lookalike, CombinedAudiences, DMP, Collected in-platform, Custom, Remarket, Behavioural, Demographic, In-Market, Interest/Affinity, In-Market & Lifestyle, Lifestyle/Life Events (e `None`, ver pontos de atenção) |

## O que significa cada Audience Party

| Party | Significado |
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
| None | `none` | — | — | — | ✅ |

## Visão inversa: Audience Party → Audience Types

- **1PD-DAD:** CRM, Lookalike, CombinedAudiences
- **1PD-DID:** Lookalike, DMP, Collected in-platform, Remarket
- **1PD-DID+DAD:** Lookalike, CombinedAudiences, Custom
- **No 1PD:** CombinedAudiences, Custom, Behavioural, Demographic, In-Market, Interest/Affinity, In-Market & Lifestyle, Lifestyle/Life Events, None

## Pontos de atenção

1. **Matriz baseada em padrão de mercado.** Se a taxonomia UL definir regras próprias que difiram daqui, este guia deve ser atualizado.
2. **`None` como Audience Type** indica entrega sem segmentação → padrão de mercado = `No 1PD`.
3. **Abreviações de DID e DAD:** confirme no dicionário da UL se estão corretas — em versões anteriores havia inversão (`1pd-did` ↔ `1pd-dad`).

## Quando a UL usar um type com party fora da matriz

1. Confirmar na taxonomia enviada qual `gl_audience_party` veio junto.
2. Se a combinação não estiver na matriz (ex.: Rmkt + `1pd-dad`), devolver o ajuste: ou o type muda, ou o party passa a ser um `1pd-*` compatível.
3. Se estiver na matriz, seguir normalmente.
