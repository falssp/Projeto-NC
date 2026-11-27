# Extrator de Influs · NC Tools

> 🔗 **[Abrir ferramenta](https://falssp.github.io/Projeto-NC/ferramentas/extrator-influs/)**

Ferramenta HTML standalone para extrair links de influencers do RM ou ADP, calcular os campos do Dicionário de Influs (Nome Padrão, Influencer Name, Rede, Perfil, Handle Puro) e exportar para colar na planilha.

Requer conexão com o Google Apps Script principal para verificação de duplicatas. A leitura dos arquivos é 100% local via SheetJS — nenhum dado bruto sai do browser.

---

## Arquivos

```
ferramentas/extrator-influs/
├── index.html   ← Ferramenta completa (HTML + CSS + JS em arquivo único)
└── README.md
```

---

## Configuração

Edite as constantes no topo do bloco `<script>` em `index.html`:

```javascript
var F4_PROXY = 'https://script.google.com/macros/s/...';  // URL do GAS principal
var NC_TOKEN  = 'seu-token-aqui';                          // Token de acesso
```

Os valores padrão apontam para o ambiente **corp**. Para outros ambientes, substitua pelos valores correspondentes.

---

## Como usar

1. **Entrada** — escolha a fonte:
   - **RM (upload)**: carregue o arquivo RM (.xlsx); a ferramenta extrai os links da coluna de influencer por aba
   - **ADP (upload)**: carregue o ADP (.xlsx); extrai handles onde a coluna de brand = `inf`, `ugc` ou começa com `inf-`/`ugc-`
   - **Manual / Links**: cole os links diretamente (um por linha)
2. **Revisar e calcular** — tabela editável com todos os campos calculados automaticamente; edite A (nome), G (seguidores) e H (URL) conforme necessário
3. **Duplicatas** — verificação local (contra links carregados) e via GAS; exibe contagem de novos vs. já existentes
4. **Exportar** — informe a linha de início na planilha e copie para colar; apenas linhas novas são copiadas

---

## Funcionalidades

| Funcionalidade | Detalhe |
|---|---|
| Upload RM | Extrai coluna de link por aba; usa `DIC_RM_MAP` |
| Upload ADP | Extrai handles de linhas com brand = inf/ugc; usa `DIC_ADP_MAP` |
| Entrada manual | Cole links diretamente, um por linha |
| Cálculo automático | B (Nome Padrão), C (Influencer Name), D (Rede), E (Perfil), F (Handle Puro) calculados por fórmula |
| Tabela editável | Campos A (nome), G (seguidores) e H (URL) editáveis inline |
| Links existentes | Campo para colar links já cadastrados; filtro local antes de exibir |
| Verificação de duplicatas | Consulta GAS antes de exportar |
| Exportação | Copia apenas linhas novas em formato TSV, pronto para colar no Sheets |

---

## Mapeamento de colunas por aba (ADP)

| Aba | Coluna InfluencerName | Coluna Brand | Primeira linha de dados |
|---|---|---|---|
| Google | AU (46) | AT (45) | 16 |
| Programmatic | AT (45) | AS (44) | 16 |
| YouTube | AR (43) | AQ (42) | 16 |
| Meta e Tiktok | AX (49) | AW (48) | 19 |
| Pinterest, Snapchat e Twitter | AT (45) | AS (44) | 19 |
| Flashtalking | AN (39) | AM (38) | 16 |

---

## Mapeamento de colunas por aba (RM)

| Aba RM | Coluna Link do Perfil |
|---|---|
| Google | AK (36) |
| Programmatic | AL (37) |
| YouTube | AI (34) |
| Meta e Tiktok | AN (39) |
| Pinterest, Snapchat e X | AM (38) |
| Flashtalking | AH (33) |

---

## Campos calculados

| Coluna | Campo | Fórmula |
|---|---|---|
| A | Nome do influencer | Editável pelo usuário |
| B | Nome Padrão | `PROPER(A)` com espaços → `_` |
| C | Influencer Name | `LOWER(A)` sem acentos, pontuação ou espaços |
| D | Rede social | Detectada pelo domínio da URL (H) |
| E | Perfil (handle) | Extraído da URL por rede |
| F | Handle Puro | `E` sem caracteres especiais |
| G | Seguidores | Editável pelo usuário |
| H | URL do perfil | Editável pelo usuário |

---

## Stack

- **SheetJS** `xlsx.full.min.js` v0.18.5 — leitura de `.xlsx` (via CDN cdnjs)
- **GAS Web App** — action `checkDicDuplicatas`
- HTML + CSS + JS vanilla (sem frameworks)

---

## Também disponível no F4

Esta ferramenta existe de forma integrada no **F4 Acessórios** (módulo "Dicionário de Influs"). A versão standalone aqui é idêntica em funcionalidade de extração e edição.
