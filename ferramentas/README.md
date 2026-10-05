# Ferramentas — NC Tool · Unilever BR

Ferramentas standalone de apoio a operações de mídia — geração de IDs, naming, taxonomias, cruzamento de planilhas e scraping de influencers.  
Cada ferramenta é um único arquivo HTML (CSS + JS inline) que roda direto no browser, independente do F4 estar aberto ou não.

---

## Ferramentas disponíveis

| Ferramenta | Descrição | Tipo | Link |
|---|---|---|---|
| [**Ad Name Sync**](ad-name-sync/) | Sincroniza Ad Names entre planilhas RM e ADP via GAS | GAS | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/ad-name-sync/) |
| [**Removedor de Caracteres**](char-cleaner/) | Remove/substitui caracteres especiais de textos de campanha | Offline | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/char-cleaner/) |
| [**Comparador ADP**](comparador-adp/) | Compara estrutura de duas abas ADP e aponta divergências | Offline | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/comparador-adp/) |
| [**Contador ADP**](contador-adp/) | Conta linhas por aba e plataforma em planilhas ADP | Offline | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/contador-adp/) |
| [**Creative Taxonomy**](creative-taxonomy/) | Gera taxonomia de criativos (Plataforma + Brainsuite) | Offline | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/creative-taxonomy/creative-taxonomy.html) |
| [**Cruzador de IDs**](cruzador-ids/) | Cruza IDs ADP × RM e aponta divergências | Offline | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/cruzador-ids/) |
| [**Dashboard Jira**](dashboard-jira/) | Sincroniza subtasks do Jira com Google Sheets | GAS | — GAS only |
| [**Extractor de Fórmulas**](extractor-formulas/) | Extrai e deduplica fórmulas de planilhas .xlsx/.xlsm por aba | Offline | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/extractor-formulas/) |
| [**Extrator de Campaign Local**](extrator-campanha/) | Extrai dados de Campaign Local das planilhas via GAS | GAS | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/extrator-campanha/) |
| [**Extrator de Influs**](extrator-influs/) | Extrai influencers do RM/ADP e valida duplicatas no dicionário | GAS | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/extrator-influs/) |
| [**Galileo IDs**](galileo-ids/) | Browser interativo de IDs e abreviações do sistema Galileo | Offline | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/galileo-ids/) |
| [**Gerador de IDs UL**](gerador-ids-ul/) | Gera e registra IDs SX/AMZ nas planilhas em uma operação | GAS | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/gerador-ids-ul/) |
| [**Grasp Naming**](grasp-naming/) | Referência de estrutura de naming por plataforma (Campaign / Ad Group / Ad Name) | Offline | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/grasp-naming/grasp-naming.html) |
| [**Influencer Name**](influ-name/) | Padroniza nomes de influencers e extrai handles/seguidores via scraping | Offline + Cloud Run | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/influ-name/) |
| [**Extrator de Links de Influencer**](link-extrator/) | Extrai links de perfil de influencers de planilhas | Offline | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/link-extrator/) |
| [**Location**](location/) | Gera o campo Location do naming (cidade, estado, região, nacional) | Offline | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/location/) |
| [**Mapeador RM→ADP**](mapeador-rm/) | Aplica mapeamento de nomes RM→ADP direto no .xlsx via ZIP patch | Offline | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/mapeador-rm/) |
| [**Merge RM→ADP**](merge-rm-adp/) | Mescla dados do RM na estrutura ADP por plataforma | Offline | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/merge-rm-adp/) |
| [**Dicionário de Taxonomias UL**](ul-taxonomias/) | Dicionário interativo de todos os parâmetros Galileo e Freetext | Offline + GAS | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/ul-taxonomias/taxonomias-ul.html) |

---

## Tipos

- **Offline** — roda 100% no browser, sem chamadas externas
- **GAS** — depende de Web App Google Apps Script (endpoints configurados em cada arquivo)
- **Offline + Cloud Run** — roda local mas pode chamar serviço de scraping externo (opcional)

---

## Stack

Todas as ferramentas são arquivos HTML únicos — CSS e JS inline, sem build, sem framework.  
Ferramentas GAS chamam diretamente os endpoints `script.google.com` configurados no topo de cada `index.html`.
