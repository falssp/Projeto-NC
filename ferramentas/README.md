# Ferramentas — NC Tool · Unilever BR

Ferramentas standalone de apoio a operações de mídia — geração de IDs, naming, taxonomias, cruzamento de planilhas e scraping de influencers.  
Cada ferramenta é um único arquivo HTML (CSS + JS inline) que roda direto no browser, independente do F4 estar aberto ou não.

---

## NC Naming Convention

Suite de ferramentas offline para criação, validação, análise e migração de naming conventions.

| Ferramenta | Descrição | Link |
|---|---|---|
| [**NC Score**](nc-score/) | Valida e pontua uma NC em tempo real — separador, segmentos, comprimento, case, chars especiais. Pesos configuráveis por regra | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/nc-score/) |
| [**NC Diff**](nc-diff/) | Compara duas listas de NCs (antes × depois de migração) com modo exato e fuzzy (Levenshtein). Diff por segmento, KPIs e export CSV | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/nc-diff/) |
| [**NC Glossary**](nc-glossary/) | Dicionário visual de termos NC por segmento — adicione, edite e consulte valores aceitos com exemplos e tags | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/nc-glossary/) |
| [**NC Rulebook**](nc-rulebook/) | Editor de documentação da naming convention — separador, case, segmentos ordenados, exemplos bons/ruins, export Markdown | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/nc-rulebook/) |
| [**NC Audit Log**](nc-audit-log/) | Timeline de ciclo de vida de NCs — criação, modificação, deprecação, restauração, review e notas. Filtros e export CSV | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/nc-audit-log/) |
| [**NC Bulk Validator**](nc-bulk-validator/) | Valida centenas de NCs de uma vez. Score + grade (pass/warn/fail) por NC. Exporta lista OK, lista de erros e CSV completo | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/nc-bulk-validator/) |
| [**NC Pattern Finder**](nc-pattern-finder/) | Descobre padrões em listas de NCs: frequência por posição, templates recorrentes, distribuição de segmentos e comprimento, matriz de co-ocorrência | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/nc-pattern-finder/) |
| [**NC Segment Heatmap**](nc-segment-heatmap/) | Heatmap de co-ocorrência entre dois segmentos escolhidos. Top combinações e export CSV | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/nc-segment-heatmap/) |
| [**NC Template Builder**](nc-template-builder/) | Templates com slots fixos e variáveis. Gera produto cartesiano de NCs, preview ao vivo, estimativa de combinações, export .txt | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/nc-template-builder/) |
| [**NC Migration Planner**](nc-migration-planner/) | Plano de migração de-para com dois modos: lista direta ou mapa por valor de segmento. Pares find-replace automáticos, export CSV e TSV | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/nc-migration-planner/) |
| [**NC Duplicate Finder**](nc-duplicate-finder/) | Detecta NCs duplicadas exatas e similares via distância de Levenshtein. Clusters com score de similaridade, tabs por tipo, export CSV | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/nc-duplicate-finder/) |
| [**NC Segment Normalizer**](nc-segment-normalizer/) | Pipeline de normalização configurável: minúsculas, trim, acentos, separadores alternativos, substituições customizadas. Export CSV comparativo | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/nc-segment-normalizer/) |
| [**NC Segment Stats**](nc-segment-stats/) | Estatísticas detalhadas por posição: frequência, comprimento (média, P25, mediana, P75), entropia de Shannon, export CSV | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/nc-segment-stats/) |
| [**NC Convention Tester**](nc-convention-tester/) | Valida NCs contra regras customizáveis por posição (valores, case, comprimento, regex). Filtro por status, detalhe de violações, export CSV | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/nc-convention-tester/) |
| [**NC Length Enforcer**](nc-length-enforcer/) | Aplica limites de comprimento (aviso/erro) com barra visual, histograma de distribuição, filtro por status e export CSV | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/nc-length-enforcer/) |
| [**NC Segment Counter**](nc-segment-counter/) | Agrupa NCs pelo número de segmentos com donut chart SVG interativo, legenda clicável, destaque de fora-do-padrão e export CSV | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/nc-segment-counter/) |
| [**NC Vocab Builder**](nc-vocab-builder/) | Dicionário de valores permitidos por posição — importa de NCs existentes, verifica cobertura por posição e adiciona valores desconhecidos com um clique | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/nc-vocab-builder/) |
| [**NC Timeline**](nc-timeline/) | Mapeia NCs em grade período × grupo com bolhas coloridas, reordenação de períodos, painel de detalhes por célula e export CSV | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/nc-timeline/) |
| [**NC Preview**](nc-preview/) | Preview visual de NCs com chips coloridos por posição | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/nc-preview/) |
| [**NC Changelog**](nc-changelog/) | Registro de mudanças na naming convention com versionamento | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/nc-changelog/) |
| [**NC Scorecard**](nc-scorecard/) | Scorecard comparativo de múltiplas NCs lado a lado | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/nc-scorecard/) |

---

## Offline

Rodam 100% no browser, sem configuração.

| Ferramenta | Descrição | Link |
|---|---|---|
| [**AI Detector**](ai-detector/) | Detecta conteúdo gerado por IA em vídeo, imagem, áudio e texto via APIs configuráveis | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/ai-detector/) |
| [**Calculadora AdOps**](calculadora-adops/) | 22 métricas AdOps calculadas automaticamente — CPC, CPM, CPA, CTR, ROAS, vCPM, eCPM, Ffee, ZCost e mais. Docs e benchmarks BR integrados | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/calculadora-adops/) |
| [**Branded Buzz Taxonomy**](branded-buzz-taxo/) | Preenche e gera linha de taxonomia para assets de Branded Buzz — bucket de duração automático e exportação TSV para Sheets/Excel | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/branded-buzz-taxo/branded-buzz-taxo.html) |
| [**Comparador ADP**](comparador-adp/) | Compara estrutura de duas abas ADP e aponta divergências | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/comparador-adp/) |
| [**Conditional Format Builder**](conditional-format-builder/) | Gera fórmulas de formatação condicional para Sheets/Excel — bloco linhas e bloco colunas, PT-BR ou inglês | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/conditional-format-builder/) |
| [**Contador ADP**](contador-adp/) | Conta linhas por aba e plataforma em planilhas ADP | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/contador-adp/) |
| [**Creative Taxonomy**](creative-taxonomy/) | Gera taxonomia de criativos (Plataforma + Brainsuite) | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/creative-taxonomy/creative-taxonomy.html) |
| [**Cruzador de IDs**](cruzador-ids/) | Cruza IDs ADP × RM e aponta divergências | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/cruzador-ids/) |
| [**Extractor de Fórmulas**](extractor-formulas/) | Extrai e deduplica fórmulas de planilhas .xlsx/.xlsm por aba | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/extractor-formulas/) |
| [**Extrator de Links de Influencer**](link-extrator/) | Extrai links de perfil de influencers de planilhas | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/link-extrator/) |
| [**Galileo IDs**](galileo-ids/) | Browser interativo de IDs e abreviações do sistema Galileo | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/galileo-ids/) |
| [**Grasp Naming**](grasp-naming/) | Referência de estrutura de naming por plataforma | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/grasp-naming/grasp-naming.html) |
| [**Location**](location/) | Gera o campo Location do naming (cidade, estado, região, nacional) | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/location/) |
| [**Mapeador RM→ADP**](mapeador-rm/) | Aplica mapeamento de nomes RM→ADP direto no .xlsx via ZIP patch | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/mapeador-rm/) |
| [**Merge RM→ADP**](merge-rm-adp/) | Mescla dados do RM na estrutura ADP por plataforma | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/merge-rm-adp/) |
| [**Removedor de Caracteres**](char-cleaner/) | Remove/substitui caracteres especiais de textos de campanha | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/char-cleaner/) |

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
| [**Location**](location/) | Gera o campo Location do naming (cidade, estado, região, nacional) | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/location/) |
| [**Location 2**](location-2/) | Versão atualizada da taxonomia Location (UL_Location_Corp.html) | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/location-2/) |

---

## Referência

Ferramentas de consulta e aprendizado.

| Ferramenta | Descrição | Link |
|---|---|---|
| [**Excel Reference**](excel-reference/) | Referência completa de fórmulas Excel/Sheets — trilíngue (PT/EN/ES), exemplos, modo flashcard e assistente IA | [🔗 Abrir](https://falssp.github.io/Projeto-NC/ferramentas/excel-reference/) |
