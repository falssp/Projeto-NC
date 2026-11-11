# Manual do Usuário — RM StormX 2026 v5.8

> Versão 5.8 · Atualizado em 09/03/2026

---

## 1. Legenda de Cores

Cada cor de célula indica quem preenche e como. Entender isso é o passo mais importante antes de começar.

| Cor | Nome | Quem preenche | Instrução |
|-----|------|---------------|-----------|
| 🔵 Azul Escuro (`#1A4775`) | Agência | Usuário | Status, Solicitado por, Datas — **obrigatório** |
| 🟢 Verde (`#93C47D`) | Plano Camphouse | Automático | Puxado via número da linha (col. G) |
| 🔷 Azul Claro (`#CFE2F3`) | Auto Camphouse | Automático | Preenchido automaticamente — **não editar** |
| 🟣 Roxo (`#B482DA`) | Dropdown obrigatório | Usuário | Selecionar via lista suspensa — não digitar |
| 🟡 Amarelo (`#FFE599`) | Preenchimento manual | Usuário | Inserir manualmente — **sem caracteres especiais** |
| 🟪 Lilás (`#D9D2E9`) | StormX | Sistema | Gerado pela StormX — **não editar** |
| 🟩 Verde Claro (`#DAF2D0`) | Condicional | Usuário | Apenas quando aplicável (ex: campos Keyword no Google Search) |

---

## 2. Fluxo de Preenchimento

Siga sempre esta ordem. Pular etapas quebra os vínculos automáticos entre as abas.

### Etapa 1 — Exportar o plano no Camphouse
No Camphouse, use a opção **Exportar StormX**. O sistema gera um arquivo Excel com todas as linhas do plano.

### Etapa 2 — Colar na aba Plano - Camphouse
Copie todos os dados do arquivo exportado e cole **a partir da célula C3** usando **Colar Especial → Valores**.

> ⚠ Nunca use Colar normal — isso copia formatação e pode quebrar as fórmulas.

### Etapa 3 — Selecionar a aba do veículo
Abra a aba correspondente à plataforma da campanha: **Google, Programmatic, YouTube, Meta e TikTok, Pinterest/Snapchat/X** ou **Flashtalking**.

### Etapa 4 — Informar o número da linha (col. G)
Na coluna **G (Linha plano)**, insira o número da linha correspondente no Plano - Camphouse. Isso aciona o preenchimento automático dos campos verdes e azuis.

### Etapa 5 — Preencher os dropdowns roxos
Selecione as opções via lista suspensa. Não digite manualmente — use apenas as opções disponíveis.

### Etapa 6 — Preencher os campos manuais amarelos
Insira os dados nos campos amarelos: link e nome do asset, format size, pilar da campanha, campos livres de nomenclatura e URL do anúncio.

> ⚠ Não use caracteres especiais: acentos, ç, / \ & ( ) ! ? @ # $ % *

### Etapa 7 — Informar os dados administrativos (cabeçalho azul escuro)
Preencha: **Status**, **Solicitado por** e **Data de Solicitação**. Esses três campos são obrigatórios.

### Etapa 8 — Aguardar o retorno da StormX
Os campos lilás (IDs, contadores, nomenclaturas finais, URL parametrizada e QA) são preenchidos exclusivamente pela StormX.

---

**Novas linhas no Camphouse?** Exporte o plano novamente. Copie _apenas as linhas novas_ e cole abaixo da última linha preenchida na aba Plano - Camphouse, usando Colar Especial → Valores.

---

## 3. Abas Visíveis

### CAPA
Página de identificação do arquivo.

| Campo | Célula | Instrução |
|-------|--------|-----------|
| Marca | D10 | Nome da marca/produto. Ex: `Rexona` |
| Campanha Global | D11 | Nome da campanha. Ex: `BR_2026_PC_Rexona_Hulk` |
| CN Code | D12 | Código de identificação interna da campanha |

---

### Guia de Uso
Aba de referência rápida embutida na planilha. Contém o fluxo resumido de etapas. Não editar.

---

### Estrutura das Abas
Aba de documentação que descreve a finalidade de cada aba. Não editar.

---

### Plano - Camphouse
Recebe os dados exportados do Camphouse. Funciona como fonte de dados central.

**Regras críticas:**
- Colar sempre a partir de **C3**
- Usar **Colar Especial → Valores** (nunca colar com formatação)
- Não alterar a estrutura de colunas desta aba

---

### Google
Campanhas Google Ads (Search, Display, Video).

Campos exclusivos: **Publisher** (🟣 Roxo, dropdown), **Keyword Type** e **Keyword Match** (🟩 Verde Claro — apenas para Search).

| Campo | Cor | Instrução |
|-------|-----|-----------|
| STATUS | 🔵 Azul Escuro | Obrigatório |
| Solicitado por | 🔵 Azul Escuro | Nome do responsável |
| Data da Solicitação | 🔵 Azul Escuro | Data de envio |
| Linha plano (G) | 🟢 Verde | Número da linha — aciona automação |
| Publisher | 🟣 Roxo | Dropdown |
| Audience Name | 🟣 Roxo | Dropdown obrigatório |
| Objetivo de Otimização | 🟣 Roxo | Dropdown obrigatório |
| Link do Asset | 🟡 Amarelo | URL do criativo, sem espaços |
| Nome do Asset | 🟡 Amarelo | Sem caracteres especiais |
| Format Size | 🟡 Amarelo | Ex: `300x250`, `15s` |
| Keyword Type | 🟩 Verde Claro | Apenas para Search |
| Pilar da Campanha | 🟡 Amarelo | Fase criativa |
| Campaign / Ad Group / Ad Name (livres) | 🟡 Amarelo | Composição da nomenclatura |
| URL do anúncio | 🟡 Amarelo | Landing page |
| ID de terceiros | 🟡 Amarelo | Quando aplicável |

---

### Programmatic
DSP e mídia programática (DV360, TTD etc.).

Campos exclusivos: **Buy Model**, **Buying Type**, **Format Group**, **Tipo de Tag**, **Tag ou Contador?** (azul claro — automáticos), **IO - Campo Livre** e **Line Item - Campo Livre** (amarelos).

---

### YouTube
Campanhas de vídeo no YouTube. Estrutura similar ao Google, sem campos de Keyword.

Campo exclusivo: **IO Reduzido** (🟪 Lilás — gerado automaticamente pela StormX).

---

### Meta e TikTok
Facebook, Instagram e TikTok.

Campos exclusivos (🟣 Roxo, dropdown):
- **Collaborative Account Type** — para campanhas collaborative (Meta)
- **Collaborative Ads** — indicar se é collab ad
- **Add-on (TikTok)** — extensões TikTok; deixar em branco se Meta
- **Influencer-Post-Type** — tipo de post do influencer
- **Creative-Exchange** — indicar se usa Creative Exchange
- **Influ Brand** — Brand, Influencer ou UGC

---

### Pinterest, Snapchat e X
Estrutura similar ao Meta e TikTok.

Campos exclusivos: **Tipo de Tag** (🟣 Roxo), **Tag ou Contador?** (🔷 Azul Claro — automático). Possui campos de Faturamento, Impressão e Custo Unitário puxados automaticamente do plano.

---

### Flashtalking
Ad server. Configuração e tags de terceiros.

Campos exclusivos:
- **Format Type** — 🟣 Roxo, dropdown obrigatório
- **Tipo de Tag** — 🟣 Roxo, dropdown
- **Tag ou Contador?** — 🔷 Azul Claro, automático
- **Título Globo** — 🟪 Lilás, gerado pela StormX
- **ID Flashtalking/StormX** — 🟪 Lilás, gerado pela StormX

---

## 4. O que Fazer / Não Fazer

### ✅ Fazer
- Usar sempre **Colar Especial → Valores** ao colar dados do Camphouse
- Colar na célula **C3** da aba Plano - Camphouse
- Informar a **Linha do Plano (col. G)** antes de qualquer outro campo nos veículos
- Usar **somente as opções de dropdown** nos campos roxos
- Preencher **Status, Solicitado por e Data** em toda solicitação
- Para novas linhas do Camphouse: colar **abaixo da última linha** existente

### ❌ Não Fazer
- **Não editar** células de cor azul claro ou lilás
- **Não usar caracteres especiais** nos campos amarelos: `/ \ & ( ) ! ? @ # $ % * ç` e acentos
- **Não colar com formatação** — sempre usar Colar Especial → Valores
- **Não apagar linhas** preenchidas sem alinhamento com a StormX
- **Não reorganizar** colunas nem alterar a ordem das abas
- **Não usar a mesma linha** do plano em abas de veículos diferentes

---

## 5. Abas Ocultas — Referência

Não devem ser editadas. São a infraestrutura da planilha.

| Aba | Função |
|-----|--------|
| `Dados` | Base central com listas de valores válidos para todos os dropdowns e preenchimentos automáticos |
| `Taxonomy_FT_CampaignLocal` | Regras de composição de nomenclaturas (taxonomia) — define como Campaign, IO, Line Item e Ad Name são gerados automaticamente pela StormX |

> Se um dropdown aparecer vazio ou uma fórmula retornar erro, verifique se as abas ocultas estão presentes. Reabrir uma cópia limpa do arquivo resolve na maioria dos casos.
