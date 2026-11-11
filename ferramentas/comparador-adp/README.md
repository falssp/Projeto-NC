# Comparador de Estruturas · NC Tools

> 🔗 **[Abrir ferramenta](https://falssp.github.io/Projeto-NC/ferramentas/comparador-adp/)**

Ferramenta HTML standalone para comparar tokens entre duas strings lado a lado, posição por posição — ideal para validar nomes de Ad Names, Placement IDs e estruturas de nomenclatura entre fontes diferentes (ADP, RM, AdServer, Plataforma etc.).

Funciona 100% offline — nenhum dado sai do browser.

---

## Arquivos

```
ferramentas/comparador-adp/
├── index.html   ← Ferramenta completa (HTML + CSS + JS em arquivo único)
└── README.md
```

---

## Como usar

1. Selecione a **Origem A** e a **Origem B** nos dropdowns (ADP, RM, AdServer, Plataforma, Planilha ou Livre)
2. Cole os IDs/nomes nos dois campos de texto — um por linha
3. Escolha o **Separador** (`_`, `|`, `-` ou ambos)
4. Clique em **🔀 Comparar**
5. Veja o resultado:
   - Cards com totais clicáveis para filtrar (Idênticos / Divergentes / Ausentes)
   - Barras de progresso com percentuais
   - Tabela por par, posição a posição, com destaque visual

---

## Funcionalidades

| Funcionalidade | Detalhe |
|---|---|
| Separadores | `_` e `\|` juntos, apenas `_`, apenas `\|`, apenas `-` |
| Origens | ADP, AdServer, Livre, Planilha, Plataforma, RM |
| Filtros | Cards clicáveis para filtrar por resultado (idêntico/divergente/ausente) |
| Barras de progresso | % de posições idênticas vs. divergentes |
| Detalhe por posição | Tabela por par com cada token comparado |
| Sem dependências | HTML puro, sem bibliotecas externas |
| 100% local | Nenhum dado sai do browser |

---

## Também disponível no F4

Esta ferramenta existe de forma integrada no **F4 Acessórios** (módulo "Comparador de Estruturas"). A versão standalone aqui é idêntica em funcionalidade, porém executada fora do F4.
