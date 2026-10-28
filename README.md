# Projeto NC — Toolkit de AdOps & Mídia

> Coleção de ferramentas offline para operações de mídia digital — rodando direto no browser, sem backend, sem dependências externas.

🔗 **[Acessar o toolkit](https://falssp.github.io/Projeto-NC/)**

---

## O que é

O Projeto NC é um hub de ferramentas para profissionais de AdOps, mídia e AdTech. Cada ferramenta é um único arquivo HTML autocontido — abre em qualquer browser, funciona offline, sem login e sem enviar dados a nenhum servidor.

---

## Ferramentas disponíveis

### AdOps & Mídia

| Ferramenta | Descrição |
|---|---|
| [Calculadora de KPIs de Mídia](ferramentas/kpi-calc/) | CPM, CPC, CPA, CTR, ROAS, VTR — calcula em qualquer direção |
| [Gerador de Naming Convention](ferramentas/naming-convention/) | Monta estrutura de nome de campanha com blocos drag-and-drop, export CSV |
| [Checklist de Go-Live](ferramentas/checklist-golive/) | 40+ itens em 7 categorias, progresso visual, notas e export .txt |
| [Conversor de Timezone para AdOps](ferramentas/timezone-converter/) | Converte horários entre 12 fusos, gera tabela de flight por plataforma |
| [Calculadora de Alcance & Budget](ferramentas/alcance-budget/) | Budget ↔ Alcance ↔ Impressões com simulação de cenários |
| [Glossário AdTech & Mídia](ferramentas/glossario-nc/) | 60+ termos com definições, fórmulas e exemplos PT/EN |
| [Simulador de Pacing](ferramentas/pacing-simulator/) | Índice de pacing, projeção de entrega e ações corretivas |
| [Gerador de Relatório de Performance](ferramentas/relatorio-performance/) | Estrutura de relatório editável por canal, export .txt |
| [Calculadora de Frequência](ferramentas/freq-calculator/) | Frequency cap ideal por objetivo, canal, formato e audiência |
| [Calculadora de Viewability](ferramentas/calculadora-viewability/) | VB%, CPVI, ajuste de IVT, benchmarks por formato e parceiro |
| [Analisador de Discrepância](ferramentas/discrepancia/) | Diagnóstico de discrepância entre ad server e plataforma |
| [Comparador de Tag](ferramentas/comparador-tag/) | Diff de tags/URLs com highlight de parâmetros adicionados/removidos |
| [Checklist de QA](ferramentas/checklist-qa/) | QA por plataforma — CM360, Meta, Google Ads, DV360, LinkedIn, TikTok |
| [Decodificador TCF](ferramentas/decodificador-tcf/) | Decodifica strings gdpr_consent (TCF v1 e v2) offline |
| [Comparador de Plataformas](ferramentas/comparador-plataformas/) | Tabela comparativa de plataformas de mídia |
| [Mapa de Viewability](ferramentas/viewability-map/) | Suporte a viewability e brand safety por plataforma |
| [Brief Criativo](ferramentas/brief-criativo/) | Gerador de briefs com specs por plataforma e formato |
| [Mapa de Ad Servers](ferramentas/adserver-map/) | Compatibilidade e quando usar cada ad server |
| [Relatório de Tag](ferramentas/relatorio-tag/) | Cadastro e status de tags de campanha |
| [Calculadora de Mídia](ferramentas/calculadora-midia/) | Calculadora geral de mídia |
| [UTM Builder](ferramentas/utm-builder/) | Gerador de parâmetros UTM |
| [Validador de Floodlight](ferramentas/validador-floodlight/) | Validação de tags Floodlight |

### Naming & Taxonomia

| Ferramenta | Descrição |
|---|---|
| [Grasp Naming](ferramentas/grasp-naming/) | Naming convention Grasp |
| [Creative Taxonomy](ferramentas/creative-taxonomy/) | Taxonomia de criativos |
| [Branded Buzz Taxo](ferramentas/branded-buzz-taxo/) | Taxonomia Branded Buzz |
| [UL Taxonomias](ferramentas/ul-taxonomias/) | Taxonomias UL |
| [Ad Name Sync](ferramentas/ad-name-sync/) | Sincronização de nomes de anúncios |
| [Influ Name](ferramentas/influ-name/) | Naming de influenciadores |

### Mensuração & Dados

| Ferramenta | Descrição |
|---|---|
| [AdOps Mensuração](ferramentas/adops-mensuracao/) | Guia de mensuração em AdOps |
| [Extrator de Campanha](ferramentas/extrator-campanha/) | Extrator de dados de campanha |
| [Extrator de Influenciadores](ferramentas/extrator-influs/) | Extrator de dados de influenciadores |
| [Cruzador de IDs](ferramentas/cruzador-ids/) | Cruzamento de IDs entre plataformas |
| [Dashboard CN](ferramentas/dashboard-cn/) | Dashboard de controle |

---

## Stack técnica

- **HTML/CSS/JS puro** — sem frameworks, sem npm, sem build step
- **Zero dependências externas** — tudo autocontido em um único arquivo por ferramenta
- **GitHub Pages** — deploy automático via push na branch `main`
- **Offline-first** — todas as ferramentas funcionam sem conexão à internet

---

## Estrutura do repositório

```
Projeto-NC/
├── index.html                    # Landing page principal
├── ferramentas/
│   ├── index.html                # Hub de ferramentas (catálogo)
│   ├── kpi-calc/index.html
│   ├── naming-convention/index.html
│   ├── checklist-golive/index.html
│   ├── timezone-converter/index.html
│   ├── alcance-budget/index.html
│   ├── glossario-nc/index.html
│   ├── pacing-simulator/index.html
│   ├── relatorio-performance/index.html
│   ├── freq-calculator/index.html
│   └── ... (demais ferramentas)
└── README.md
```

---

## Contribuindo

### Criando uma nova ferramenta

1. Crie uma pasta em `ferramentas/nome-da-ferramenta/`
2. Coloque o código em `ferramentas/nome-da-ferramenta/index.html`
3. A ferramenta deve ser autocontida (sem arquivos externos)
4. Use o sistema de design do projeto (variáveis CSS abaixo)
5. Adicione o card no `ferramentas/index.html`

### Sistema de design

```css
:root {
  --navy:   #0D2137;  /* fundo header */
  --navy2:  #1A3F63;  /* navy secundário */
  --accent: #38BDF8;  /* azul destaque */
  --bg:     #F0F4F8;  /* fundo da página */
  --surface:#ffffff;  /* cards/painéis */
  --border: #DDE3EC;  /* bordas */
}
```

### Padrão de componentes

- **Header** sticky de 56px de altura com `--navy`
- **Layout** de duas colunas: sidebar de inputs (300–340px) + painel de resultados
- **Cards** com `border-radius: 12px`, `border: 1px solid var(--border)`
- **Botão primário**: `background: #2563EB`, `border-radius: 8px`
- **Export**: Blob + anchor click para `.txt` ou `.csv`

### Git workflow

```bash
# Clonar
git clone https://github.com/falssp/Projeto-NC.git
cd Projeto-NC

# Criar/editar ferramenta
# ...

# Publicar
git add .
git commit -m "feat: adiciona ferramenta X"

# Se houver conflito com remote (alguém fez push antes):
git fetch origin main
git rebase origin/main
# Resolver conflitos mantendo TODOS os cards (remote + seus)
git add ferramentas/index.html
GIT_EDITOR=true git rebase --continue
git push origin main
```

> ⚠️ **Regra de ouro em conflitos**: sempre mantém TODOS os cards de ambos os lados (remote + local). Nunca descarta cards do remote.

---

## Deploy

O deploy é automático via **GitHub Pages** na branch `main`.

Após o push, aguarde ~30s e acesse: `https://falssp.github.io/Projeto-NC/`

---

## Licença

Uso interno. © 2026 NC Tool.
