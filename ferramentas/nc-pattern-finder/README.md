# NC Pattern Finder

Descobre padrões e estruturas recorrentes em listas de NCs.

🔗 **https://falssp.github.io/Projeto-NC/ferramentas/nc-pattern-finder/**

---

## O que faz

Cole uma lista de NCs (uma por linha) e obtenha:

| Análise | Descrição |
|---|---|
| **Frequência por posição** | Top-N valores mais usados em cada posição, com barra de % |
| **Templates recorrentes** | NCs agrupadas por estrutura (nº de segmentos × tamanho de cada um) |
| **Distribuição de segmentos** | Quantas NCs têm 2, 3, 4… segmentos |
| **Distribuição de comprimento** | Histograma de chars com média, P25 e P75 |
| **Matriz de co-ocorrência** | Tabela posição 1 × posição 2 (top 8 cada), com intensidade de cor |

## Configuração

| Campo | Descrição |
|---|---|
| Separador | `_` `-` `.` `\|` |
| Top N por posição | Quantos valores mostrar por posição (3–50) |
| Mín. para template | Mínimo de NCs para agrupar como template (2–20) |

## Export

- **CSV**: frequência por posição (posição, valor, ocorrências, %)

## Uso

1. Cole suas NCs no textarea
2. Ajuste separador e parâmetros
3. Clique **▶ Analisar**
4. Explore as seções de resultado

## Dados

100% offline. Nenhum dado sai do browser.
