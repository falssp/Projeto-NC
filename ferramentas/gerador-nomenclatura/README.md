# 🏷️ Gerador de Nomenclatura em Lote

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/gerador-nomenclatura/

Ferramenta para criar, padronizar, validar e exportar nomes de anúncios/placements em escala. Elimina inconsistências de nomenclatura entre equipes e plataformas.

## Funcionalidades

### Aba 1 — Convenção
- Montagem de convenção com até 14 tokens: `ANUNCIANTE`, `PRODUTO`, `CAMPANHA`, `OBJETIVO`, `PLATAFORMA`, `TIPO_CAMPANHA`, `FORMATO`, `DIMENSAO`, `PERIODO`, `VERSAO`, `VARIANTE`, `PUBLICO`, `CRIATIVO`, `CUSTOM`
- Reordenação por drag-and-drop (▲▼)
- Ativar/desativar tokens individualmente
- Separador configurável: `_` `-` `|` `.`
- Capitalização: MAIÚSCULAS, minúsculas, Title Case, como digitado
- Salvar até 5 convenções com localStorage
- Preview em tempo real com medidor de comprimento (verde <80, amarelo 80–100, vermelho >100)

### Aba 2 — Gerar Nomes
- Formulário dinâmico gerado pelos tokens da convenção ativa
- **Produto cartesiano:** preencha múltiplos valores separados por vírgula → gera todas as combinações
- Contador de combinações em tempo real
- Tabela de resultados com status de comprimento por linha

### Aba 3 — Validar
- Cole nomes existentes (um por linha)
- Valida contra qualquer convenção salva ou a convenção atual
- Verifica: comprimento (>100 chars), número de tokens, separador
- Resumo: total válidos vs. problemas encontrados

### Aba 4 — Exportar
- Copiar lista de nomes para clipboard
- Baixar CSV com `Nome, Comprimento, Status`
- Baixar **Trafficking Sheet** (formato CM360): `Placement Name, Ad Name, Start Date, End Date, Impressions, CPM, Budget, Creative, Click-through URL`

## Formato de nomenclatura padrão AdOps
```
ANUNCIANTE_PRODUTO_OBJETIVO_PLATAFORMA_FORMATO_PERIODO_VERSAO
Exemplo: NIKE_AIRMAX_AWA_META_IMG_202411_v1
```

## Regras de comprimento
| Status | Comprimento |
|--------|-------------|
| ✅ OK | até 80 chars |
| ⚠️ Atenção | 81–100 chars |
| ❌ Longo demais | >100 chars |

## Dados e privacidade
- Sem backend — tudo processado no browser
- Convenções salvas no `localStorage` do navegador
- Funciona 100% offline após carregamento
