# Ferramentas — NC Tool · Unilever BR

Ferramentas interativas de consulta, geração e validação de taxonomias para campanhas Unilever BR.  
Todas são aplicações HTML standalone — sem dependências externas, abertas direto no browser.

---

## Ferramentas disponíveis

| Ferramenta | Descrição | Abrir |
|---|---|---|
| **Creative Taxonomy** | Gera taxonomia de criativos (Plataforma + Brainsuite) a partir dos campos do asset | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/creative-taxonomy/creative-taxonomy.html) |
| **Galileo IDs** | Consulta IDs e abreviações do sistema Galileo por campo (Brand, PCat, Audience etc.) | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/galileo-ids/galileo-ul.html) |
| **Grasp Naming** | Estrutura de naming por plataforma (Campaign / Ad Group / Ad Name) | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/grasp-naming/grasp-naming.html) |
| **Location** | Gera o campo Location do naming (cidade, estado, região, nacional) | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/location/index.html) |
| **Dicionário de Taxonomias UL** | Dicionário interativo de todos os parâmetros Galileo e Freetext com siglas e descrições | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/ul-taxonomias/taxonomias-ul.html) |
| **Dashboard Jira** | Web App GAS — sincroniza subtasks do Jira com Google Sheets | — GAS only |

---

## Subpastas

| Pasta | Conteúdo |
|---|---|
| [`creative-taxonomy/`](https://github.com/falssp/Projeto-NC/tree/main/ferramentas/creative-taxonomy) | App HTML — Creative Taxonomy |
| [`galileo-ids/`](https://github.com/falssp/Projeto-NC/tree/main/ferramentas/galileo-ids) | App HTML — Galileo IDs |
| [`grasp-naming/`](https://github.com/falssp/Projeto-NC/tree/main/ferramentas/grasp-naming) | App HTML — Grasp Naming |
| [`location/`](https://github.com/falssp/Projeto-NC/tree/main/ferramentas/location) | App HTML + GAS — Location |
| [`ul-taxonomias/`](https://github.com/falssp/Projeto-NC/tree/main/ferramentas/ul-taxonomias) | App HTML + GAS — Dicionário de Taxonomias |
| [`dashboard-jira/`](https://github.com/falssp/Projeto-NC/tree/main/ferramentas/dashboard-jira) | GAS — Dashboard Jira |

---

## Stack

Todas as ferramentas HTML são **standalone** — HTML + CSS + JS em um único arquivo, sem build, sem dependências de CDN.  
As ferramentas GAS rodam como Web App no Google Apps Script e leem planilhas do Google Sheets.
