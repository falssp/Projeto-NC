# Dicionário de Taxonomias UL — Documentação

**Versão:** Set/2026  
**Projeto:** RM StormX ADP — Unilever BR  
**Responsável:** Felipe Lima (StormX Data & Tech)

---

## O que é

Dicionário interativo de taxonomias da Unilever BR para uso interno da StormX. Permite buscar, filtrar e consultar todos os parâmetros de naming (Galileo e Freetext) com suas siglas, descrições e plataformas.

---

## Links

| Ambiente | URL |
|---|---|
| GitHub Pages (principal) | https://falssp.github.io/nc-tool/treinamentos/RM_STORMX_ADP/24-08-26/taxonomias-ul.html |
| Webapp GAS (alternativo) | https://script.google.com/macros/s/AKfycbyybpqyew-4q5VkE2erWqvhli01J_QLp5qcpLoJah_rXKX-HkkqfWknJZBFU_THZKAuJQ/exec |

---

## Fontes de dados

| Arquivo | ID / Localização |
|---|---|
| Planilha original UL (fonte) | `1qIJIAz8UnYxHsRk1I5eRl1S9oPbewJhi7l7PjDnvgs0` |
| Aba com os dados | `Galielo e Freetext` (nome com typo — é assim mesmo) |
| Planilha corp StormX | `1tYSRIxPXjsJNiLZ0f1bwbh_1MP74yXFc7kGrZOYL38w` |
| Planilha pessoal | `1hlLAFEkiU8bR67vCg337f9kcRGxhDeKg6XKwocE8J2Y` |

---

## Repositórios

| Repo | Visibilidade | Caminho do HTML |
|---|---|---|
| `falssp/nc-tool` | Público | `treinamentos/RM_STORMX_ADP/24-08-26/taxonomias-ul.html` |
| `falssp/Projeto-NC` | Privado | `Treinamentos/RM_STORMX_ADP/24-08-26/taxonomias-ul.html` |

Scripts GAS nos dois repos no mesmo caminho, com sufixo `-pessoal` para a versão pessoal.

---

## Estrutura de atualização

```
Planilha original UL (fonte)
    ↓ GAS lê via openById (sem IMPORTRANGE visível)
    ↓ aplica master de 516 siglas do ADP Excel
    ↓ gera HTML atualizado
    ↓ commita via GitHub API
GitHub repos (nc-tool e Projeto-NC)
    ↓ GitHub Pages serve automaticamente
URL pública
```

---

## Automação

| Planilha | Trigger | Função |
|---|---|---|
| Corp (`@stormx.com.br`) | Todo dia 1 às 08h | `atualizarTaxonomias` |
| Pessoal | Todo dia 1 às 08h | `atualizarTaxonomias` |

- Se falhar, envia email automático para o dono do script
- Sem menu visível — tudo via trigger
- Planilhas protegidas contra edição

### Para forçar atualização manual
1. Abrir planilha corp ou pessoal
2. Extensões → Apps Script
3. Selecionar `atualizarTaxonomias` → Executar

### Para reconfigurar triggers e proteção (após trocar de planilha)
1. Apps Script → Selecionar `setup` → Executar

---

## Conteúdo atual

- **566 opções** em **22 campos**
- **Galileo (GL):** Audience Party, BuyModel, BuyType, Format Type, Influencer, Influencer Post Type, Keyword Match, Keyword Type, Landing Page Type, Objetivo, Placement Type, Retailer, Targeting Strategy
- **Freetext (FT):** Audience Type, BuyingType, FormatGroup, Influencer or Brand, Location, Location Type, Objetivo de Otimização, Position, TipodeTag

---

## Funcionalidades do HTML

- **Busca** em tempo real (campo, opção, sigla, descrição)
- **Filtro de parâmetros** — multi-select na sidebar (Galileo / Freetext)
- **Filtro Plataforma / Formato** — dropdown com 14 opções + aliases
- **Expandir / Recolher** todos os cards de uma vez
- **FAQ** — botão `?` no header com instruções e atalhos
- **Responsivo** — mobile, tablet, desktop, telão
- **Dark mode** automático
- **Proteção** — sem seleção, clique direito, Ctrl+C, print
- **Copyright** StormX + Unilever BR no footer e console

### Atalhos de teclado
| Tecla | Ação |
|---|---|
| `/` ou `Ctrl+K` | Foca na busca |
| `Esc` | Limpa busca / fecha modal |

---

## Cores

| Token | Hex | Uso |
|---|---|---|
| Azul Unilever | `#1F36C7` | Accent principal |
| Azul escuro Unilever | `#003087` | Destaques |

---

## Manutenção

### Quando a planilha original UL mudar
O trigger roda automaticamente dia 1. Se precisar atualizar antes, rodar `atualizarTaxonomias` manualmente.

### Quando houver campos ou siglas novos no ADP
1. Atualizar o master de siglas no GAS (`const SIGLAS = {...}` na função `lerAba`)
2. Commitar o GAS atualizado nos dois repos
3. Rodar `atualizarTaxonomias` para publicar

### Se o GAS commitou HTML sem siglas
Acontece se o master não tem o opt exato da planilha. Verificar no log de execução quantas opções foram lidas. Corrigir o master e rodar novamente.

---

## Arquivos no GitHub

| Arquivo | Descrição |
|---|---|
| `taxonomias-ul.html` | Dicionário interativo (HTML standalone) |
| `atualizar-taxonomias.gs` | Script GAS corp — lê planilha e commita |
| `atualizar-taxonomias-pessoal.gs` | Script GAS pessoal — mesmo funcionamento |

