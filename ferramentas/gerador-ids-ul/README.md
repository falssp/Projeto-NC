# Gerador de IDs UL · NC Tools

> 🔗 **[Abrir ferramenta](https://falssp.github.io/Projeto-NC/ferramentas/gerador-ids-ul/)**

Ferramenta HTML standalone para gerar IDs de veiculação (SX/AMZ) para criativos da Unilever — integrada ao GAS Proxy de IDs da StormX.

Requer conexão com o Google Apps Script (GAS) configurado. Nenhum dado é processado localmente para a geração de IDs — toda a lógica está no GAS.

---

## Arquivos

```
ferramentas/gerador-ids-ul/
├── index.html   ← Ferramenta completa (HTML + CSS + JS em arquivo único)
└── README.md
```

---

## Configuração

Antes de usar, edite as constantes no topo do bloco `<script>` em `index.html`:

```javascript
var GID_PROXY = 'https://script.google.com/macros/s/...';  // URL do GAS Proxy de IDs
var NC_TOKEN  = 'seu-token-aqui';                           // Token de acesso
```

Os valores padrão apontam para o ambiente **corp**. Para outros ambientes, substitua pelas URLs e tokens correspondentes.

---

## Como usar

### Modo Plataforma por Plataforma

1. **Selecionar plataformas** — navegue pelas abas de categoria ou use a busca; clique em uma plataforma para adicioná-la ao lote
2. **Ajustar quantidades** — use os controles `–` / `+` ou clique no número para editar diretamente
3. **Confirmar** — revise o resumo com estimativa de próximo ID e clique em **Confirmar e Gerar**
4. **Resultado** — IDs gerados exibidos por plataforma; copie individualmente ou use o botão de exportar
5. **Associar Ad Names** *(opcional)* — cole os Ad Names para vinculá-los aos IDs gerados automaticamente

### Modo Planejamento Livre

Cole uma lista de plataformas em texto livre (ex.: saída de planejamento) e a ferramenta detecta automaticamente as plataformas e quantidades.

---

## Funcionalidades

| Funcionalidade | Detalhe |
|---|---|
| 35+ plataformas | Organizadas em 6 categorias: E-commerce, Performance/Programmatic, Redes Sociais, Streaming, TV/Broadcast, Portais/Native Ads |
| Dois tipos de ID | SX (formato `SX########`) para a maioria · AMZ (formato `AMZ######H`) para Amazon |
| Busca de plataforma | Filtragem por nome em tempo real |
| Estimativa de próximo ID | Busca o contador atual do GAS antes de gerar |
| Retry automático | Tenta a geração até 3× em caso de falha |
| Exportação flexível | CSV · Copiar todos · Copiar só SX · Copiar só AMZ |
| Associação de Ad Names | Detecta IDs no texto por regex ou associa por ordem |
| Planejamento Livre | Parseia texto livre com nomes de plataforma + quantidades |
| Confirmação modal | Exibe resumo antes da geração irreversível |

---

## Categorias de plataforma

| Categoria | Exemplos |
|---|---|
| E-commerce | Amazon (AMZ), Shopper Media, Criteo, etc. |
| Performance / Programmatic | DV360, Xandr, The Trade Desk, etc. |
| Redes Sociais | Meta, TikTok, Pinterest, Snapchat, X (Twitter), LinkedIn, etc. |
| Streaming | YouTube, Spotify, etc. |
| TV / Broadcast | Globoplay, Band, SBT, Record, etc. |
| Portais / Native Ads | UOL, Terra, Taboola, Outbrain, etc. |

---

## Formato dos IDs

| Tipo | Formato | Exemplo | Plataforma |
|---|---|---|---|
| SX | `SX` + 8 dígitos | `SX00001234` | Todas exceto Amazon |
| AMZ | `AMZ` + 6 dígitos + `H` | `AMZ001234H` | Amazon |

---

## Stack

- **Vanilla JS** — sem frameworks ou dependências de biblioteca
- **GAS Web App** — `doGet`/`doPost` no Google Apps Script (Proxy de IDs)
- HTML + CSS vanilla (DM Sans + DM Mono via Google Fonts)

---

## Também disponível no F4

Esta ferramenta existe de forma integrada no **F4 Acessórios** (módulo "Gerador de IDs"). A versão standalone aqui é idêntica em funcionalidade.
