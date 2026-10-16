# Creative Taxonomy

Ferramenta para geração de taxonomia de criativos Unilever BR.  
Preencha os campos e copie as duas saídas prontas para uso.

---

## Acesso

🔗 **[https://falssp.github.io/Projeto-NC/ferramentas/creative-taxonomy/creative-taxonomy.html](https://falssp.github.io/Projeto-NC/ferramentas/creative-taxonomy/creative-taxonomy.html)**

---

## Campos (11 no total)

| Campo | Tipo | Descrição |
|---|---|---|
| Marca | Dropdown | Nome da marca — filtra Campanha e Segmento |
| Campanha | Dropdown | Campanha da marca selecionada (com CN Code) |
| Ano | Dropdown | Ano de veiculação do asset |
| Origem | Dropdown | `global` ou `local` |
| Tipo de Conteúdo | Dropdown | `brand` ou `influencer` |
| Duração | Dropdown | Duração do criativo (`7s`, `display`, `gif` etc.) |
| Editoria | Freetext | Contexto criativo (sem `-` ou `_`) |
| Identificação | Freetext | Identificador único do asset (sem `-` ou `_`) |
| Tipo Criativo | Dropdown | `AI` ou `original` |
| Segmento | Dropdown | Segmento de produto (filtra por marca) |
| Versão Brainsuite | Dropdown | Versão do asset para teste no Brainsuite |

---

## Saídas geradas

| Output | Formato |
|---|---|
| **Taxonomia Plataforma** | `origem_short-editoria-identificacao-tipocriativo_short-segmento-versao` |
| **Taxonomia Brainsuite** | `marca-campanha-ano-tipocont_short-duracao_short-origem_short-editoria-identificacao-tipocriativo_short-segmento-versao` |

---

## Arquivos

| Arquivo | Descrição |
|---|---|
| `creative-taxonomy.html` | App completo standalone (HTML + CSS + JS + dados embutidos) |

---

## Fonte de dados

Dados extraídos de `Creative_Taxonomy_Creation_1_21.xlsx` (v1.21, mai/2026) — aba `Tables and Connections`.  
Para atualizar, reprocessar o xlsx e regenerar o HTML.
