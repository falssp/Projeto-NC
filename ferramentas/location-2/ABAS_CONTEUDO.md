# Conteúdo das abas — [UL] Taxonomia_Location

Estrutura de colunas obrigatória em **todas as abas**:

| Coluna A | Coluna B | Coluna C |
|----------|----------|----------|
| `sigla`  | `label`  | `ativo`  |
| Valor da taxonomia (minúsculo) | Nome legível | TRUE ou FALSE |

---

## Aba: Nacional

| sigla | label    | ativo |
|-------|----------|-------|
| nac   | Nacional | TRUE  |

---

## Aba: Região

| sigla | label          | ativo |
|-------|----------------|-------|
| co    | Centro-Oeste   | TRUE  |
| ne    | Nordeste       | TRUE  |
| no    | Norte          | TRUE  |
| se    | Sudeste        | TRUE  |
| su    | Sul            | TRUE  |

---

## Aba: Estado

| sigla | label                  | ativo |
|-------|------------------------|-------|
| ac    | Acre                   | TRUE  |
| al    | Alagoas                | TRUE  |
| am    | Amazonas               | TRUE  |
| ap    | Amapá                  | TRUE  |
| ba    | Bahia                  | TRUE  |
| ce    | Ceará                  | TRUE  |
| df    | Distrito Federal       | TRUE  |
| es    | Espírito Santo         | TRUE  |
| go    | Goiás                  | TRUE  |
| ma    | Maranhão               | TRUE  |
| mg    | Minas Gerais           | TRUE  |
| ms    | Mato Grosso do Sul     | TRUE  |
| mt    | Mato Grosso            | TRUE  |
| pa    | Pará                   | TRUE  |
| pb    | Paraíba                | TRUE  |
| pe    | Pernambuco             | TRUE  |
| pi    | Piauí                  | TRUE  |
| pr    | Paraná                 | TRUE  |
| rj    | Rio de Janeiro         | TRUE  |
| rn    | Rio Grande do Norte    | TRUE  |
| ro    | Rondônia               | TRUE  |
| rr    | Roraima                | TRUE  |
| rs    | Rio Grande do Sul      | TRUE  |
| sc    | Santa Catarina         | TRUE  |
| se    | Sergipe                | TRUE  |
| sp    | São Paulo              | TRUE  |
| to    | Tocantins              | TRUE  |

---

## Aba: Cidade

> Coluna extra obrigatória: **D = `uf`** (sigla do estado em maiúsculo, ex: SP)

| sigla | label                   | ativo | uf |
|-------|-------------------------|-------|----|
| aju   | Aracaju                 | TRUE  | SE |
| apg   | Apucarana               | TRUE  | PR |
| aps   | Aparecida de Goiânia    | TRUE  | GO |
| bel   | Belém                   | TRUE  | PA |
| bhz   | Belo Horizonte          | TRUE  | MG |
| bnu   | Blumenau                | TRUE  | SC |
| brb   | Brasília                | TRUE  | DF |
| cau   | Caruaru                 | TRUE  | PE |
| cax   | Caxias do Sul           | TRUE  | RS |
| cgb   | Cuiabá                  | TRUE  | MT |
| cgr   | Campo Grande            | TRUE  | MS |
| con   | Contagem                | TRUE  | MG |
| cpq   | Campinas                | TRUE  | SP |
| cwb   | Curitiba                | TRUE  | PR |
| fec   | Feira de Santana        | TRUE  | BA |
| fln   | Florianópolis           | TRUE  | SC |
| for   | Fortaleza               | TRUE  | CE |
| gru   | Guarulhos               | TRUE  | SP |
| gyn   | Goiânia                 | TRUE  | GO |
| imp   | Imperatriz              | TRUE  | MA |
| jdf   | Juiz de Fora            | TRUE  | MG |
| jdo   | Juazeiro do Norte       | TRUE  | CE |
| joi   | Joinville               | TRUE  | SC |
| jpa   | João Pessoa             | TRUE  | PB |
| ldb   | Londrina                | TRUE  | PR |
| mao   | Manaus                  | TRUE  | AM |
| mcz   | Maceió                  | TRUE  | AL |
| mgf   | Maringá                 | TRUE  | PR |
| nat   | Natal                   | TRUE  | RN |
| nig   | Nova Iguaçu             | TRUE  | RJ |
| nit   | Niterói                 | TRUE  | RJ |
| osa   | Osasco                  | TRUE  | SP |
| pet   | Pelotas                 | TRUE  | RS |
| pnz   | Petrolina/Juazeiro      | TRUE  | PE |
| poa   | Porto Alegre            | TRUE  | RS |
| rao   | Ribeirão Preto          | TRUE  | SP |
| rec   | Recife                  | TRUE  | PE |
| rio   | Rio de Janeiro          | TRUE  | RJ |
| sao   | São Paulo               | TRUE  | SP |
| sbc   | São Bernardo do Campo   | TRUE  | SP |
| slz   | São Luís                | TRUE  | MA |
| sod   | Sorocaba                | TRUE  | SP |
| ssa   | Salvador                | TRUE  | BA |
| ssz   | Santos                  | TRUE  | SP |
| stm   | Santarém                | TRUE  | PA |
| the   | Teresina                | TRUE  | PI |
| udi   | Uberlândia              | TRUE  | MG |
| vix   | Vitória                 | TRUE  | ES |

---

## Aba: Inclusão *(somente Corp)*

Mesma estrutura das abas acima. Novas siglas submetidas aqui pelo time com permissão.
Itens com `ativo = FALSE` são ignorados pela ferramenta.

---

## Regras gerais

- `sigla` sempre **minúsculo**, sem acento, sem espaço
- `label` nome legível, com acento e maiúsculas corretas
- `ativo` deve ser `TRUE` para aparecer na ferramenta
- Cidades precisam da coluna `uf` com a sigla do estado em **maiúsculo** (SP, RJ, MG…)
- A ferramenta filtra cidades pelo estado selecionado usando essa coluna
