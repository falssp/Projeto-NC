# NC Template Builder

Cria templates de NC com slots fixos e variáveis e gera todas as combinações possíveis.

🔗 **https://falssp.github.io/Projeto-NC/ferramentas/nc-template-builder/**

---

## O que faz

Defina a estrutura da NC posição por posição, marque cada segmento como **FIXO** (valor único) ou **VAR** (lista de valores), e gere o produto cartesiano completo.

Exemplo com 2 variáveis × 3 variáveis → 6 NCs geradas automaticamente.

## Fluxo

1. **Estrutura do Template** (coluna esquerda)
   - Adicione/remova segmentos com `+ Adicionar segmento`
   - Clique em **FIXO** / **VAR** para alternar o tipo
   - Segmentos FIXO: digite o valor diretamente na linha
   - Preview ao vivo com chips coloridos (roxo = fixo, âmbar = var)
   - Estimativa de combinações calculada em tempo real

2. **Valores das Variáveis** (coluna direita)
   - Um campo por segmento VAR
   - Digite um valor por linha

3. Clique **▶ Gerar NCs**

## Configuração

| Campo | Descrição |
|---|---|
| Separador | `_` `-` `.` `\|` |

## Export

- **⎘ Copiar tudo**: todas as NCs no clipboard
- **↓ .txt**: arquivo de texto com uma NC por linha
- Botão individual de cópia por NC

## Limites

- Máximo de 5.000 NCs por geração

## Dados

100% offline. Template salvo em localStorage.
