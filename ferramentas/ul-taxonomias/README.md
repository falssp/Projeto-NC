# Dicionário de Taxonomias UL

Dicionário interativo de taxonomias Galileo e Freetext — Unilever BR.  
Atualização automática todo dia 1 do mês.

---

## Acesso

🔗 **[https://falssp.github.io/Projeto-NC/ferramentas/ul-taxonomias/taxonomias-ul.html](https://falssp.github.io/Projeto-NC/ferramentas/ul-taxonomias/taxonomias-ul.html)**

---

## O que é

Consulta todos os parâmetros de naming (Galileo e Freetext) com siglas, descrições e plataformas.

**566 opções · 22 campos · Dark mode · Responsivo**

---

## Funcionalidades

- Busca em tempo real (campo, opção, sigla, descrição)
- Filtro por parâmetro na sidebar (Galileo / Freetext)
- Filtro por plataforma (14 opções)
- Expandir / recolher todos os cards
- FAQ com instruções e atalhos de teclado

---

## Arquivos

| Arquivo | Descrição |
|---|---|
| `taxonomias-ul.html` | Dicionário interativo standalone |
| `atualizar-taxonomias.gs` | Script GAS corp — lê planilha UL e commita o HTML |
| `atualizar-taxonomias-pessoal.gs` | Script GAS pessoal — mesmo funcionamento |

---

## Fontes de dados

| Item | ID |
|---|---|
| Planilha original UL | `1qIJIAz8UnYxHsRk1I5eRl1S9oPbewJhi7l7PjDnvgs0` |
| Planilha corp StormX | `1tYSRIxPXjsJNiLZ0f1bwbh_1MP74yXFc7kGrZOYL38w` |
| Planilha pessoal | `1hlLAFEkiU8bR67vCg337f9kcRGxhDeKg6XKwocE8J2Y` |

---

## Automação

| Script | Trigger | Função |
|---|---|---|
| `atualizar-taxonomias.gs` (corp) | Todo dia 1 às 08h | `atualizarTaxonomias` |
| `atualizar-taxonomias-pessoal.gs` (pessoal) | Todo dia 1 às 08h | `atualizarTaxonomias` |

### Forçar atualização manual
Planilha → Extensões → Apps Script → `atualizarTaxonomias` → Executar
