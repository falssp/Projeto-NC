# Gerador de Proposta de Mídia

Ferramenta para gerar propostas de mídia digital formatadas com preview ao vivo.

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/proposta-midia/

## Funcionalidades

- **Formulário completo:** dados do cliente, agência, responsável, número e datas da proposta
- **Objetivo:** seletor de objetivo e KPI principal, meta, budget e período da campanha
- **Tabela de placements:** plataforma, formato, impressões, CPM, investimento (calculado automaticamente)
- **Cálculo automático:** `impressões × CPM ÷ 1000 = investimento`; override manual disponível
- **Distribuição de budget:** barra visual colorida por plataforma + legenda com percentuais
- **Notas técnicas e condições comerciais:** campos de texto livre
- **Preview ao vivo:** atualiza em tempo real conforme o formulário é preenchido
- **Botões de exportação:** Imprimir/PDF, Copiar HTML, Copiar como texto

## Plataformas disponíveis

Meta Ads · Google Ads · DV360 · LinkedIn · TikTok · X Ads · Display Direto · YouTube · Programático Aberto · Outro

## Layout

- Dois painéis: formulário à esquerda (42%) + preview à direita (58%)
- Full-width, sem max-width no `.main`
- Print CSS: oculta formulário, imprime apenas a proposta
- Space Grotesk via `@import`, zero dependências externas

## Visual do documento gerado

- Cabeçalho azul escuro (`#1a237e`) com título, cliente/campanha e metadados
- Bloco de objetivos com destaque (`#e8ecfd`)
- Tabela de planejamento com total e % do budget
- Barra de distribuição de budget por plataforma (cores por plataforma)
- Rodapé com data de geração
