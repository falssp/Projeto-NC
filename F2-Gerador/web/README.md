# F2 Naming Tool — Manual de Uso

Ferramenta web para geração de nomes padronizados de campanhas, ad groups e anúncios em múltiplas plataformas de mídia.

---

## Acesso

| Ambiente | URL | Badge |
|---|---|---|
| **Corp** | `https://nc-tool-f2.pages.dev/?env=corp` | Verde — CORP |
| **Pessoal** | `https://nc-tool-f2.pages.dev/?env=pes` | Roxo — PESSOAL |

> Os ambientes são completamente isolados. Dados de um nunca aparecem no outro.

---

## Status GAS

Badge no canto superior direito do header:

| Badge | Significado |
|---|---|
| `⟳ GAS` (cinza piscando) | Conectando ao GAS... |
| `● GAS` (verde) | Listas carregadas com sucesso |
| `⚠ GAS` (amarelo) | GAS indisponível — usando listas de fallback |

Quando **fallback**, os dropdowns ainda funcionam com dados estáticos que podem estar desatualizados.

---

## Navegação

### Sidebar — Plataformas

Clique em uma plataforma para carregar o formulário correspondente:

- Amazon DSP
- Compra Direta
- DV360 Programático
- DV360 Trueview / YouTube Auction
- DV360 YouTube Reserva
- Flashtalking
- Google Others
- Google Search
- Google Video
- Meta
- Pinterest
- TikTok
- Twitter

### Abas de Linhas (Rows)

Cada linha = um conjunto independente de nomes (campanha + grupo + anúncio).

- **Alternar** entre linhas pelas abas no topo
- **`+ Add Row`** — adicionar nova linha em branco

---

## Preenchimento dos Campos

O formulário é dividido em seções por nível: **CAMPAIGN**, **AD GROUP** e **AD**.

| Tipo | Aparência | Comportamento |
|---|---|---|
| Dropdown | Select | Selecione uma opção da lista |
| Texto livre | Input borda tracejada | Digite livremente |
| CN Code | Input com autocomplete | Digite o nome do CN e selecione |
| Resultado | Fundo roxo/azul | Gerado automaticamente, read-only |
| Fórmula | Fundo verde | Calculado por fórmula, read-only |
| Nota | Textarea | Campo livre para anotações |

### CN Code (Compra Direta)

1. Digite o nome do CN (ex: `Globo`, `SBT`)
2. Selecione da lista que aparece
3. O ID correspondente é preenchido automaticamente

---

## Painel de Resultados

À direita do formulário, o painel **Nomes Gerados** exibe em tempo real:

- Nome da Campanha
- Nome do Ad Group / Conjunto
- Nome do Anúncio / Criativo

Botão **Copiar** em cada resultado para copiar para a área de transferência.

---

## Exportação

| Botão | Formato | Onde encontrar |
|---|---|---|
| CSV | `.csv` separado por vírgula | Header (↓ CSV) ou painel de resultados |
| Excel | `.xlsx` multi-aba | Header (↓ Excel) ou painel de resultados |

O Excel gerado contém uma aba por plataforma ativa, com todas as linhas e nomes gerados.

---

## Arquitetura e Dados

Todos os dados dos dropdowns vêm de uma única fonte:

- **SOURCE_ID**: `17vc4UfMz-o2Oz0unAnJlErhHd_2n34tvlFxFnPgTIok`
- Sincronizados para a planilha de cada ambiente via GAS (`syncListas`)
- Expostos via endpoint `?action=listarOpcoes`

```
SOURCE_ID (planilha mestra)
  → GAS syncListas → aba "Dados" de cada ambiente
  → WebApp ?action=listarOpcoes
  → F2 Web Tool (dropdowns em tempo real)
```

Se o GAS estiver indisponível, usa `config/lists.json` como fallback estático.

---

## Ambientes GAS

| Ambiente | Conta | Acesso |
|---|---|---|
| Corp | `felipe.lima@stormx.com.br` | `executeAs: USER_DEPLOYING`, `ANYONE_ANONYMOUS` |
| Pessoal | `falssp@gmail.com` | `executeAs: USER_DEPLOYING`, `ANYONE_ANONYMOUS` |

---

## Estrutura de Arquivos

```
web/
├── index.html              # Interface principal
├── config/
│   ├── env.corp.json       # Config ambiente Corp
│   ├── env.pes.json        # Config ambiente Pessoal
│   └── lists.json          # Fallback estático de listas
├── js/
│   ├── engine.js           # Lógica principal + fetch GAS
│   └── download.js         # Exportação CSV e XLSX
└── platforms/              # JSONs de configuração por plataforma
    ├── amazon-dsp.json
    ├── compra-direta.json
    ├── dv360-prog.json
    └── ...
```

---

## Deploy

- **Hosting**: Cloudflare Pages — `nc-tool-f2.pages.dev`
- **Auto-deploy**: push para branch `main` → deploy automático em ~1 min
- **Repositório**: `github.com/falssp/Projeto-NC` — pasta `F2-Gerador/web/`
