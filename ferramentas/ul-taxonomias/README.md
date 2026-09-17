# Dicionário de Taxonomias UL

**Projeto:** NC Tool — Unilever BR × StormX Data & Tech  
**Atualização:** Automática todo dia 1 do mês

---

## Acesso

🔗 **[https://falssp.github.io/nc-tool/ul-taxonomias/taxonomias-ul.html](https://falssp.github.io/nc-tool/ul-taxonomias/taxonomias-ul.html)**

> Servido via `nc-tool` (repo público). Este repo (`Projeto-NC`) mantém a cópia de referência.

---

## Arquivos

| Arquivo | Descrição |
|---|---|
| `taxonomias-ul.html` | Dicionário interativo (HTML standalone) |
| `atualizar-taxonomias.gs` | Script GAS corp — lê planilha UL e commita |
| `atualizar-taxonomias-pessoal.gs` | Script GAS pessoal — mesmo funcionamento |

---

## Fontes de dados

| Item | Valor |
|---|---|
| Planilha original UL | `1qIJIAz8UnYxHsRk1I5eRl1S9oPbewJhi7l7PjDnvgs0` |
| Aba | `Galielo e Freetext` |
| Planilha corp StormX | `1tYSRIxPXjsJNiLZ0f1bwbh_1MP74yXFc7kGrZOYL38w` |
| Planilha pessoal | `1hlLAFEkiU8bR67vCg337f9kcRGxhDeKg6XKwocE8J2Y` |

---

## Automação

| Script | Trigger | Função |
|---|---|---|
| `atualizar-taxonomias.gs` (corp) | Todo dia 1 às 08h | `atualizarTaxonomias` |
| `atualizar-taxonomias-pessoal.gs` (pessoal) | Todo dia 1 às 08h | `atualizarTaxonomias` |

### Forçar atualização manual
1. Abrir planilha → Extensões → Apps Script → `atualizarTaxonomias` → Executar

### Reconfigurar triggers/proteção
1. Apps Script → `setup` → Executar
