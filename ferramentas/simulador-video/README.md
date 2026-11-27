# 🎬 Simulador de Campanha de Vídeo

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/simulador-video/

Ferramenta de planejamento para campanhas de vídeo digital, com projeção de GRP digital, alcance, frequência e mix recomendado por plataforma.

## Funcionalidades

- **Configuração completa:** objetivo, universo, budget, período, duração do vídeo (6s/15s/30s/+30s), metas de frequência e alcance
- **Plataformas suportadas:** YouTube (Pre-roll skip, Non-skip, Bumper 6s), Meta (Feed, Reels, Stories), TikTok In-Feed, DV360 Programático, CTV/OTT
- **Benchmarks BR 2024/2025** de CPM e VTR por plataforma e duração

## Abas de Output

| Aba | Conteúdo |
|-----|----------|
| **Projeção** | Tabela por plataforma: impressões, VTR, visualizações, CPV, alcance estimado |
| **GRP & Alcance** | GRP digital total, curva de alcance logarítmica, budget necessário para meta |
| **CPV** | Custo por visualização completa rankeado, score de eficiência ponderado por duração |
| **Mix Recomendado** | Sugestão de split por objetivo (Branding/Consideração/Conversão) com reasoning |

## Fórmulas

- **GRP digital** = (Impressões / Universo) × 100
- **Alcance** = Universo × (1 − e^(−0.7 × Impressões/Universo)) — modelo logarítmico de Ernie Ephron
- **Frequência** = Impressões / Alcance único
- **Score de eficiência** = (Visualizações × peso_duração) / Budget

## Uso

1. Configure objetivo e universo do público-alvo
2. Defina budget total e período
3. Selecione duração do vídeo — afeta benchmarks de VTR
4. Marque plataformas e distribua % do budget (deve somar 100%)
5. Clique em **Simular Campanha**
6. Navegue pelas 4 abas para análise completa
