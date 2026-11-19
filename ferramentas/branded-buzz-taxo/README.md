# Branded Buzz Taxonomy

Ferramenta offline para preenchimento e geração de linhas de taxonomia de assets de Branded Buzz.  
Preencha os campos e copie a saída TSV pronta para colar no Excel/Sheets.

---

## Acesso

🔗 **[https://falssp.github.io/Projeto-NC/ferramentas/branded-buzz-taxo/branded-buzz-taxo.html](https://falssp.github.io/Projeto-NC/ferramentas/branded-buzz-taxo/branded-buzz-taxo.html)**

---

## Campos (22 no total)

| Campo | Tipo | Descrição |
|---|---|---|
| Asset ID | Gerado | Gerado automaticamente no padrão `BB_YYYY_NNNNN` |
| Link do Asset | Freetext | URL do asset na plataforma |
| Nome do Influencer | Freetext | Nome completo ou handle |
| Influencer ID | Freetext | ID interno do influencer |
| Campaign ID | Freetext | ID da campanha |
| Campanha | Freetext | Nome da campanha |
| Marca | Dropdown | Marca anunciante |
| Produto | Freetext | Produto ou linha específica |
| Plataforma | Dropdown | TikTok, Instagram, YouTube, Pinterest, X |
| Tipo de Asset | Dropdown | Varia por plataforma (Reels, Stories, Short etc.) |
| Duração (seg.) | Número | Duração do asset em segundos |
| Duration Bucket | Calculado | Calculado automaticamente a partir da duração |
| Formato | Dropdown | Vertical, Quadrado, Horizontal |
| Tema | Freetext | Tema ou contexto do conteúdo |
| Paid / Organic | Dropdown | `paid` ou `organic` |
| Sentimento | Dropdown | Positivo, Neutro, Negativo |
| Creator Tier | Dropdown | Nano, Micro, Médio, Macro, Mega |
| CTA | Dropdown | Tipo de chamada para ação |
| Hashtag | Freetext | Hashtags utilizadas |
| Menção de Marca | Dropdown | `sim` ou `não` |
| Data de Publicação | Data | Data em que o asset foi publicado |
| Data de Coleta | Data | Data de preenchimento do formulário |

---

## Duration Bucket (calculado automaticamente)

| Bucket | Faixa |
|---|---|
| `≤15s` | 0 – 15 segundos |
| `15–30s` | 16 – 30 segundos |
| `30–60s` | 31 – 60 segundos |
| `1–2min` | 61 – 120 segundos |
| `>2min` | Acima de 120 segundos |

---

## Saída gerada

Linha TSV com os 22 campos na ordem acima — pronta para colar no Excel ou Google Sheets via Ctrl+V.

---

## Arquivos

| Arquivo | Descrição |
|---|---|
| `branded-buzz-taxo.html` | App completo standalone (HTML + CSS + JS inline) |
