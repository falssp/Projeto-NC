# Calculadora de Viewability

Calcula viewable rate, CPVI (custo por viewable impression), taxa de mensuração, ajuste de IVT e compara com benchmarks do mercado por formato e parceiro de verificação.

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/calculadora-viewability/

---

## Métricas calculadas

| Métrica | Descrição |
|---------|-----------|
| Viewable Rate | % de impressões mensuráveis que foram viewable |
| Taxa de Mensuração | % de impressões servidas que foram mensuráveis |
| CPVI | Custo por mil impressões viewable (R$) |
| CPVI ajustado IVT | CPVI após desconto de invalid traffic |
| Impressões válidas | Viewable × (1 − IVT rate) |

---

## Benchmarks

Benchmarks por formato baseados em relatórios IAS H2 2024 / DoubleVerify:

| Formato | Viewable Rate benchmark |
|---------|------------------------|
| Display 300×250 | 62% |
| Leaderboard 728×90 | 58% |
| Billboard 970×250 | 68% |
| Vídeo Pre-roll | 73% |
| Vídeo Out-stream | 54% |
| Native | 70% |
| CTV | 95% |

---

## Parceiros suportados

IAS, DoubleVerify, MOAT (Oracle), CM360 Active View, sem verificação.

---

## Insights automáticos

- Alerta se viewable rate < 90% do benchmark
- Aviso de IVT alto (> 3%)
- Alerta MOAT descontinuado
- Aviso de mensurabilidade baixa (< 70%)
