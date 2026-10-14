# Audience Type × Audience Party — Guia de Referência

> **Status:** rascunho. A regra de Rmkt abaixo é a proposta da operação e ainda precisa de validação com Carolina Dobner / UL antes de virar oficial.

## Os dois campos

| Campo | Onde aparece | Valores no dicionário |
|---|---|---|
| `gl_audience_party` | Dicionário (global) | `1pd-dad`, `1pd-did`, `1pd-diddad`, `no1pd` |
| `ft_audience_type` | Dicionário (field type) | Behav, CollPform, CombAud, CRM, Cust, Demog, DMP, InMark, InmLst, IntAff, Lstyle, LLike, None, Rmkt |

São duas listas independentes: não existe correspondência linha a linha entre elas. A regra de combinação é o que este guia documenta.

## Regra: Audience Type = Rmkt (remarketing)

Remarketing é construído sobre audiência que já teve contato direto com a marca, ou seja, dado de 1ª parte.

| Audience Party | Permitido com Rmkt? | Motivo |
|---|---|---|
| `1pd-dad` | Sim | É 1PD |
| `1pd-did` | Sim | É 1PD |
| `1pd-diddad` | Sim | É 1PD (combinação) |
| `no1pd` | **Não** | Declara que não há 1PD, o que contradiz remarketing |

**Resposta curta:** qualquer `1pd-*`; nunca `no1pd`.

## Matriz completa (a preencher)

| Audience Type | Party permitido |
|---|---|
| Rmkt | 1pd-dad, 1pd-did, 1pd-diddad |
| CRM | a validar |
| Cust | a validar |
| Demog, Behav, IntAff, Lstyle, LLike, InMark, InmLst | a validar |
| DMP, CollPform, CombAud | a validar |
| None | a validar |

## Quando a UL usar Rmkt com party errado

1. Confirmar na taxonomia enviada qual `gl_audience_party` veio junto.
2. Se for `no1pd`, devolver o ajuste: ou o type não é Rmkt, ou o party deve ser um `1pd-*`.
3. Se for `1pd-*`, seguir normalmente.

## Pendências

- Validar a regra de Rmkt com a Carolina.
- Confirmar o significado de `dad` / `did` / `diddad` com o dicionário global.
- Preencher as demais linhas da matriz.
