# UL · Taxonomia Location

Ferramenta web para geração de valores do campo **Location** na taxonomia Unilever BR.

**Link:** https://falssp.github.io/Projeto-NC/ferramentas/location-2/location-ul.html
**Repositório:** https://github.com/falssp/Projeto-NC/tree/main/ferramentas/location-2

---

## Arquivos

| Arquivo | Branch | Descrição |
|---|---|---|
| `UL_Location_Corp.gs` | main | Apps Script — backend corporativo |
| `UL_Location_Corp.html` | main | Interface da ferramenta |
| `UL_Location_Pessoal.gs` | main | Apps Script — backend pessoal |
| `UL_Location_Pessoal.html` | main | Interface pessoal |
| `location.json` | gh-pages | Base de dados (5.499 municípios) |
| `location-ul.html` | gh-pages | Página publicada |
| `ABAS_CONTEUDO.md` | main | Estrutura das abas do Sheets |
| `.github/workflows/sync-location.yml` | main | Sync automático diário |

---

## Como funciona

### Hierarquia de seleção

Cada nível é **independente** — selecionar um bloqueia os outros. O resultado reflete sempre o nível ativo.

| Nível | Formato | Exemplo | Até |
|---|---|---|---|
| Nacional | `nac` | `nac` | 1 |
| Região | `reg-xx` | `reg-se`, `reg-se-co` | 3 |
| Estado | `est-xx` | `est-sp`, `est-sp-rj` | 3 |
| Cidade | `cid-xxx` | `cid-sao`, `cid-sao-rec` | 3 |

### Regras de combinação

- Múltiplos valores do mesmo nível são separados por `-` após o prefixo
- `reg-se-co-ne` = Sudeste + Centro-Oeste + Nordeste
- `est-sp-rj-mg` = São Paulo + Rio de Janeiro + Minas Gerais  
- `cid-sao-rec-ssa` = São Paulo + Recife + Salvador
- Não é possível misturar níveis (ex: região + estado)

### Filtros

- **Região** → ao selecionar Estado, a região filtra os estados disponíveis (opcional)
- **Estado** → ao selecionar Cidade, o estado filtra as cidades disponíveis
- Mudar o filtro **não zera** seleções já feitas
- Cidades de estados diferentes podem ser combinadas (ex: slot 1 = AC + slot 2 = SP)

---

## Base de dados (location.json)

Gerado a partir do arquivo `UL_Location_Taxonomy.xlsx` com:

- **5.499 municípios** brasileiros (IBGE 2024)
- Cidades com aeroporto têm o código IATA exibido como referência no dropdown
- Siglas seguem o padrão do cliente (ex: `cid-sao` para São Paulo, não `cid-sao-paulo`)

### Correções manuais aplicadas

| Cidade | UF | Sigla | IATA | Motivo |
|---|---|---|---|---|
| São Paulo | SP | `cid-sao` | CGH | Excel usava GRU incorretamente |
| Guarulhos | SP | `cid-gru` | GRU | Corrigido para o aeroporto correto |

### Adicionar nova cidade

1. Sheets Corp → aba **Inclusão** → nova linha: `sigla \| label \| TRUE \| UF`
2. GitHub Actions sincroniza no dia seguinte (ou dispare manualmente)
3. Para correções de sigla: editar `location.json` diretamente na branch `gh-pages`

---

## Ambientes

### Corp `[UL] Taxonomia_Location`

- Acesso: Unilever / StormX
- Abas: **Oficial** (bloqueada) + **Inclusão** (editável com permissão)
- Web App: publica `UL_Location_Corp.html` como página standalone
- Endpoint JSON: `{URL_WEBAPP}?action=json`

### Pessoal `[Felipe] Taxonomia_Location`

- Acesso: apenas Felipe
- Espelha a Corp via `IMPORTRANGE` (Corp não sabe desta cópia)
- Serve como **fallback** quando a Corp falha

### Git (GitHub)

- Branch `main`: código-fonte (`.gs`, `.html`, docs)
- Branch `gh-pages`: arquivos publicados (`location-ul.html`, `location.json`)
- GitHub Actions roda diariamente às 06h UTC: busca Corp → valida JSON → fallback Pessoal → commita

---

## Deploy

### Corp

1. Criar Sheets `[UL] Taxonomia_Location` com as abas do `ABAS_CONTEUDO.md`
2. Extensões → Apps Script → colar `UL_Location_Corp.gs` + `UL_Location_Corp.html`
3. Publicar → Web App → Executar como: **Eu** · Acesso: **Organização**
4. Guardar URL como secret `CORP_WEBAPP_URL` no GitHub

### Pessoal

1. Criar Sheets `[Felipe] Taxonomia_Location`
2. Colar `UL_Location_Pessoal.gs` + `UL_Location_Pessoal.html`
3. Menu 📍 UL Location → **Configurar espelho da Corp** → colar URL da Corp
4. Aceitar IMPORTRANGE em cada aba
5. Publicar → Web App → Acesso: **Somente eu**
6. Guardar URL como secret `PESSOAL_WEBAPP_URL` no GitHub

### GitHub Secrets necessários

| Secret | Valor |
|---|---|
| `CORP_WEBAPP_URL` | URL do Web App Corp |
| `PESSOAL_WEBAPP_URL` | URL do Web App Pessoal |

---

## Estrutura das abas do Sheets

Colunas obrigatórias em todas as abas:

| A | B | C | D *(só Cidade)* |
|---|---|---|---|
| `sigla` | `label` | `ativo` | `uf` |
| cid-sao | São Paulo | TRUE | SP |

Regras:
- `sigla` sempre minúsculo, sem acento, sem espaço
- `ativo` deve ser `TRUE` para aparecer na ferramenta
- Aba **Cidade** exige coluna `uf` com a sigla do estado em maiúsculo

---

## Responsividade

| Tela | Comportamento |
|---|---|
| Mobile (<480px) | 1 coluna, slots empilhados, tipografia menor |
| Tablet (480-1100px) | slots lado a lado, regiões em 2 colunas |
| Desktop (1100px+) | Estado e Cidade em 2 colunas, regiões em linha única (5 col) |
| Widescreen | Tipografia e espaçamento escalam com `clamp()` |
