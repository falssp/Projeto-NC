# NC Score

Validador e pontuador de Naming Convention em tempo real.

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/nc-score/

## Funcionalidades

- Score 0–100 calculado ao vivo conforme o usuário digita
- 9 regras validadas: separador, contagem mínima/máxima de segmentos, comprimento máximo, espaços, uppercase, caracteres especiais, segmentos vazios, duplicatas
- Pesos configuráveis por regra (0–50) com 3 presets: Padrão, Rigoroso, Flexível
- Badge colorido: Excelente / Bom / Regular / Ruim
- Chips por regra com detalhe do erro
- Configuração persistida em localStorage

## Arquivos

```
ferramentas/nc-score/
├── index.html   ← Ferramenta completa (HTML + CSS + JS em arquivo único)
└── README.md
```

## Stack

Vanilla JS + CSS — offline, sem dependências externas.
