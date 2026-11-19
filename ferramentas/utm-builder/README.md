# UTM Builder v2.5

Ferramenta web para criação, gerenciamento e análise de parâmetros UTM — hospedada no GitHub Pages, sem backend, 100% client-side.

🔗 **[Acessar ferramenta](https://falssp.github.io/Projeto-NC/ferramentas/utm-builder/)**

---

## Funcionalidades

### Abas

| Aba | Descrição |
|-----|-----------|
| 🏗️ **Construtor** | Geração individual de UTMs com seleção de plataforma, campos guiados e preview ao vivo |
| 📋 **Lote** | Geração em massa via CSV — upload, mapeamento de colunas, download com BOM para Excel |
| 📜 **Histórico** | Últimas 50 URLs geradas, com busca, cópia e exportação CSV |
| 🔍 **Analisador** | Decodifica qualquer URL com UTM — cola e vê todos os parâmetros separados |
| ⚙️ **Macros** | Referência de macros de rastreamento por plataforma, com busca e click-to-copy |

### Construtor
- **56 plataformas** cobertas: Meta, Google Ads, DV360, CM360, SA360, TikTok, LinkedIn, Pinterest, Kwai, Spotify, Netflix Ads, Amazon DSP, e mais
- **Filtro por categoria** (pills): Paid Social · Search · Display & Prog. · Retail Media · Video & Áudio · Retarg. & Native · Mobile & CTV · Mensageria
- **⭐ Favoritos** — estrela em cada plataforma, pill "Favoritos" aparece no filtro
- **Validador de campos** — destaca em vermelho campos com espaços, acentos ou caracteres inválidos
- **Sugestão de campaign** — ao selecionar plataforma, sugere formato de nome por categoria
- **Modo NC Tool** — botão NC no header valida `utm_campaign` contra padrão de 5 segmentos (`advertiser_produto_objetivo_formato_período`)
- Preview da URL final em tempo real
- Botão de cópia com feedback visual
- Suporte a **QR Code** para URLs geradas
- **Link de compartilhamento** — estado do formulário codificado no hash da URL (`#state=…`)

### Lote
- Upload de CSV com mapeamento de colunas
- Mesma seleção de plataforma e filtro de categoria do Construtor
- Download com BOM UTF-8 (compatível com Excel)

### Macros
- **50+ macros** para CM360, DV360, Google Ads (ValueTrack), SA360 e Meta Ads
- Filtro por plataforma (pills coloridos)
- Busca por nome ou sintaxe
- Click-to-copy com flash de confirmação
- **Export CSV** — baixa os macros visíveis (filtro + busca aplicados)

---

## Cobertura de plataformas

| Categoria | Plataformas |
|-----------|-------------|
| Paid Social | Meta, TikTok, LinkedIn, Pinterest, Twitter/X, Snapchat, Kwai, Reddit, BeReal |
| Search | Google Ads, Bing Ads, Apple Search Ads, Yahoo Japan |
| Display & Prog. | DV360, CM360, Xandr, The Trade Desk, Criteo, Verizon Media |
| Retail Media | Amazon DSP, Mercado Ads, Shopee Ads, Magazine Luiza Ads, Americanas Ads |
| Video & Áudio | YouTube, Spotify, Globoplay, Netflix Ads, Deezer Ads, SoundCloud Ads |
| Retarg. & Native | Outbrain, Taboola, RTB House, Zemanta, AdRoll |
| Mobile & CTV | AppsFlyer, Adjust, Samsung Ads, LG Ads, Vizio Ads |
| Mensageria | WhatsApp Business, Telegram Ads, Email Marketing (genérico) |

---

## Dados locais

Todas as URLs geradas e templates ficam no `localStorage` do navegador — nada é enviado a nenhum servidor.

| Chave | Conteúdo |
|-------|----------|
| `utm_history_v2` | Histórico das últimas 50 UTMs |
| `utm_templates_v2` | Templates salvos pelo usuário |
| `utm_theme` | Preferência de tema (light/dark/system) |
| `utm_fav_platforms` | Plataformas marcadas como favoritas |

---

## Histórico de versões

| Versão | Destaques |
|--------|-----------|
| v2.5 | Favoritos de plataforma · Validador de campos · Sugestão de campaign por categoria · Modo NC Tool · Export CSV de macros · Layout full-width |
| v2.4 | Filtro de categorias (Construtor + Lote) · Aba ⚙️ Macros com 50+ macros |
| v2.3 | 56 plataformas · Lote com CSV · Histórico · Analisador · QR Code · Share link · Dark mode |
| v2.2 | Templates · Export CSV com BOM · Melhorias de UX |
| v2.1 | Versão inicial multi-plataforma |

---

## Stack

- HTML + CSS + JS vanilla — sem framework
- [qrcodejs](https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js) para geração de QR Code
- Hospedagem: GitHub Pages (deploy automático via Actions)
