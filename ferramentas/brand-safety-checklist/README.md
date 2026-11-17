# 🛡️ Brand Safety Checklist

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/brand-safety-checklist/

Checklist interativo para avaliar e documentar configurações de brand safety em campanhas digitais.

## Funcionalidades

### Informações da campanha
- Campos para anunciante, campanha e responsável

### Plataformas
- Multi-plataforma: cada plataforma (Meta, Google/DV360, Programático, etc.) tem seu próprio estado de checklist
- Adicionar plataformas customizadas
- Troca rápida de plataforma com persistência de estado por localStorage

### Seções do checklist (21 itens)
1. **Inventário e Contexto** — whitelist/blacklist, categorias excluídas, GARM, IAS/DV, PMPs
2. **Segmentação e Contexto** — segmentação contextual, keywords negativas, geo, audiência
3. **Fraude e Tráfego Inválido** — filtro IVT, viewability, frequency cap, exclusão bot
4. **Criativo e Compliance** — specs, landing pages, aprovação de marca, age gate
5. **Monitoramento e Resposta** — alertas, checagem diária, escalada, exclusão pós-veiculação

### Status por item
- ✅ OK — configurado e validado
- ⚠️ Atenção — configurado com ressalvas ou parcialmente
- N/A — não aplicável nesta campanha
- Campo de nota livre por item

### Score e Export
- Barra de progresso por plataforma
- Contagem de itens por status
- Export CSV com todos os itens, status e notas
- Copiar resumo para clipboard

## Padrões cobertos
- GARM (Global Alliance for Responsible Media)
- IAB Brand Safety tiers
- MRC viewability standards
- IVT (Invalid Traffic) — IAS/DoubleVerify

## Dados e privacidade
- Sem backend — estado salvo no localStorage por browser
- Funciona offline após carregamento
