# Conditional Format Builder — NC Tool · Unilever BR

Gera fórmulas de formatação condicional para Google Sheets e Excel — detecta duplicatas por linha (bloco linhas) ou por coluna (bloco colunas), com suporte a PT-BR e inglês.

**Link:** https://falssp.github.io/Projeto-NC/ferramentas/conditional-format-builder/  
**Repositório:** https://github.com/falssp/Projeto-NC/tree/main/ferramentas/conditional-format-builder

---

## Blocos

| Bloco | Descrição |
|---|---|
| 🔵 Bloco Linhas | Detecta duplicatas entre linhas — formata a linha inteira quando um valor se repete na coluna gatilho |
| 🟣 Bloco Colunas | Detecta duplicatas dentro de uma coluna — formata a célula quando o valor já aparece em outra linha da mesma coluna |

## Funcionalidades

- **Plataforma:** Google Sheets (`$B$2:$B`) ou Excel (`$B$2:$B$1048576`)
- **Idioma:** PT-BR (`E()`, `CONT.SES()`, separador `;`) ou English (`AND()`, `COUNTIFS()`, separador `,`)
- **4 combinações:** Sheets PT-BR · Sheets EN · Excel PT-BR · Excel EN
- Auto-regeneração ao trocar plataforma ou idioma com output já visível
- Aviso de duplicatas antes de gerar (colunas repetidas no mesmo bloco)
- Carregamento de plataformas pré-configuradas com colunas padrão
- Cópia individual de cada fórmula ou cópia de todas de uma vez

## Dependências

Nenhuma — HTML/CSS/JS vanilla, sem build.
