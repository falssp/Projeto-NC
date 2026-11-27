# Analisador de Path to Conversion

Análise de atribuição assistida com dados do relatório Path to Conversion do CM360.

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/analisador-p2c/

## O que faz

- Importa CSV do relatório P2C do CM360 (ou entrada manual por canal)
- Calcula Assisted Conversion Rate e índice de subfinanciamento por canal
- Visualiza posição de cada canal no funil (topo / meio / fundo)
- Exibe os 10 paths mais comuns com badges coloridos por tipo de canal
- Gera recomendações automáticas (canais subfinanciados, migração para DDA, janela de atribuição)

## Índice de Subfinanciamento

| Faixa | Significado |
|---|---|
| > 1.5 | Canal subfinanciado — alto papel assistente, pouco crédito last-click |
| 0.8 – 1.5 | Balanceado |
| < 0.8 | Last-click heavy |

## Formato CSV esperado

```
Path,Conversões,Receita,Comprimento do Path,Dias até Conversão
Display > Search > Direct,145,52200.00,3,5
Search > Direct,312,89640.00,2,2
```

Separador: vírgula ou tab (auto-detectado). Cabeçalho: opcional.

## Canais detectados automaticamente

Display, Search, Social, Direct, E-mail, Vídeo, Native

## Limitação

O P2C do CM360 captura apenas touchpoints de ads servidos via CM360 — não inclui search orgânico, social fora do GMP nem e-mail.
