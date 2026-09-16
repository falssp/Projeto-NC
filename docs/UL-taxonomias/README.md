# Dicionário de Taxonomias UL

**Projeto:** NC Tool — Unilever BR × StormX Data & Tech  
**Atualização:** Automática todo dia 1 do mês

---

## Arquivos

| Arquivo | Descrição | Abrir |
|---|---|---|
| `taxonomias-ul.html` | Dicionário interativo de taxonomias (HTML standalone) | [Abrir](taxonomias-ul.html) |
| `atualizar-taxonomias.gs` | Script GAS (conta corp) — lê planilha UL e commita o HTML | — |
| `atualizar-taxonomias-pessoal.gs` | Script GAS (conta pessoal) — mesmo funcionamento | — |

---

## O que é

Dicionário interativo de taxonomias da Unilever BR para uso interno da StormX.  
Permite buscar, filtrar e consultar todos os parâmetros de naming (Galileo e Freetext) com suas siglas, descrições e plataformas.

**566 opções · 22 campos · Dark mode · Responsivo**

---

## Funcionalidades

- Busca em tempo real (campo, opção, sigla, descrição)
- Filtro de parâmetros na sidebar (Galileo / Freetext)
- Filtro por plataforma (14 opções + aliases)
- Expandir / recolher todos os cards
- FAQ com instruções e atalhos de teclado
- Proteção de conteúdo (sem cópia, print ou inspecionar)

---

## Fontes de dados

| Item | Valor |
|---|---|
| Planilha original UL | `1qIJIAz8UnYxHsRk1I5eRl1S9oPbewJhi7l7PjDnvgs0` |
| Aba | `Galielo e Freetext` (typo proposital — é assim na planilha) |
| Planilha corp StormX | `1tYSRIxPXjsJNiLZ0f1bwbh_1MP74yXFc7kGrZOYL38w` |
| Planilha pessoal | `1hlLAFEkiU8bR67vCg337f9kcRGxhDeKg6XKwocE8J2Y` |

---

## Automação

| Script | Planilha | Trigger | Função |
|---|---|---|---|
| `atualizar-taxonomias.gs` | Corp (`@stormx.com.br`) | Todo dia 1 às 08h | `atualizarTaxonomias` |
| `atualizar-taxonomias-pessoal.gs` | Pessoal | Todo dia 1 às 08h | `atualizarTaxonomias` |

### Forçar atualização manual
1. Abrir planilha corp ou pessoal
2. Extensões → Apps Script → selecionar `atualizarTaxonomias` → Executar

### Reconfigurar triggers/proteção
1. Apps Script → selecionar `setup` → Executar

---

## Cores Unilever

| Token | Hex |
|---|---|
| Azul principal | `#1F36C7` |
| Azul escuro | `#003087` |
