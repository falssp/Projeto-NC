# Ferramentas — NC Tool · Unilever BR

Ferramentas standalone de apoio a operações de mídia — geração de IDs, naming, taxonomias, cruzamento de planilhas e scraping de influencers.  
Cada ferramenta é um único arquivo HTML (CSS + JS inline) que roda direto no browser, independente do F4 estar aberto ou não.

---

## Offline

Rodam 100% no browser, sem configuração.

| Ferramenta | Descrição | Link |
|---|---|---|
| [**Removedor de Caracteres**](char-cleaner/) | Remove/substitui caracteres especiais de textos de campanha | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/char-cleaner/) |
| [**Comparador ADP**](comparador-adp/) | Compara estrutura de duas abas ADP e aponta divergências | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/comparador-adp/) |
| [**Contador ADP**](contador-adp/) | Conta linhas por aba e plataforma em planilhas ADP | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/contador-adp/) |
| [**Creative Taxonomy**](creative-taxonomy/) | Gera taxonomia de criativos (Plataforma + Brainsuite) | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/creative-taxonomy/creative-taxonomy.html) |
| [**Cruzador de IDs**](cruzador-ids/) | Cruza IDs ADP × RM e aponta divergências | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/cruzador-ids/) |
| [**Extractor de Fórmulas**](extractor-formulas/) | Extrai e deduplica fórmulas de planilhas .xlsx/.xlsm por aba | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/extractor-formulas/) |
| [**Galileo IDs**](galileo-ids/) | Browser interativo de IDs e abreviações do sistema Galileo | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/galileo-ids/) |
| [**Grasp Naming**](grasp-naming/) | Referência de estrutura de naming por plataforma | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/grasp-naming/grasp-naming.html) |
| [**Extrator de Links de Influencer**](link-extrator/) | Extrai links de perfil de influencers de planilhas | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/link-extrator/) |
| [**Location**](location/) | Gera o campo Location do naming (cidade, estado, região, nacional) | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/location/) |
| [**Mapeador RM→ADP**](mapeador-rm/) | Aplica mapeamento de nomes RM→ADP direto no .xlsx via ZIP patch | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/mapeador-rm/) |
| [**Merge RM→ADP**](merge-rm-adp/) | Mescla dados do RM na estrutura ADP por plataforma | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/merge-rm-adp/) |

---

## GAS

Dependem de Web App Google Apps Script. Endpoints configurados no topo de cada `index.html`.

| Ferramenta | Descrição | Link |
|---|---|---|
| [**Ad Name Sync**](ad-name-sync/) | Sincroniza Ad Names entre planilhas RM e ADP | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/ad-name-sync/) |
| [**Dashboard Jira**](dashboard-jira/) | Sincroniza subtasks do Jira com Google Sheets | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/dashboard-jira/) |
| [**Extrator de Campaign Local**](extrator-campanha/) | Extrai dados de Campaign Local das planilhas | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/extrator-campanha/) |
| [**Extrator de Influs**](extrator-influs/) | Extrai influencers do RM/ADP e valida duplicatas no dicionário | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/extrator-influs/) |
| [**Gerador de IDs UL**](gerador-ids-ul/) | Gera e registra IDs SX/AMZ nas planilhas em uma operação | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/gerador-ids-ul/) |

---

## Offline + Cloud Run

Roda local mas pode chamar serviço de scraping externo (opcional — funciona sem ele).

| Ferramenta | Descrição | Link |
|---|---|---|
| [**Influencer Name**](influ-name/) | Padroniza nomes de influencers e extrai handles/seguidores | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/influ-name/) |

---

## Offline + GAS

Interface offline com atualização automática via GAS.

| Ferramenta | Descrição | Link |
|---|---|---|
| [**Dicionário de Taxonomias UL**](ul-taxonomias/) | Dicionário interativo de todos os parâmetros Galileo e Freetext | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/ul-taxonomias/taxonomias-ul.html) |
