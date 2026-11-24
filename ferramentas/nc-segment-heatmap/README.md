# NC Segment Heatmap

Visualiza co-ocorrências entre dois segmentos de uma NC como heatmap interativo.

🔗 **https://falssp.github.io/Projeto-NC/ferramentas/nc-segment-heatmap/**

---

## O que faz

Cole NCs, escolha quais duas posições comparar (ex: posição 1 × posição 2) e veja:

- **Heatmap** com 6 níveis de intensidade (branco → azul escuro) por frequência de co-ocorrência
- **KPIs**: total de NCs, valores únicos por eixo, co-ocorrência máxima
- **Top 15 combinações** com barra de proporção
- Tooltip em cada célula com os dois valores e a contagem exata

## Configuração

| Campo | Descrição |
|---|---|
| Separador | `_` `-` `.` `\|` |
| Eixo X — Posição | Posição que vai nas colunas (1–6) |
| Eixo Y — Posição | Posição que vai nas linhas (1–6) |
| Top N por eixo | Quantos valores únicos mostrar (3–30) |

## Export

- **CSV**: todos os pares Y×X com suas contagens

## Uso

1. Cole suas NCs
2. Escolha posições X e Y (devem ser diferentes)
3. Clique **▶ Gerar Heatmap**
4. Passe o mouse sobre as células para ver o detalhe

## Dados

100% offline. Nenhum dado sai do browser.
