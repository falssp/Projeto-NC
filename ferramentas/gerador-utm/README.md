# 🔗 Gerador de UTM em Lote

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/gerador-utm/

Ferramenta para criar, padronizar e exportar parâmetros UTM para múltiplos placements em escala.

## Funcionalidades

### UTM Simples
- Formulário com todos os campos UTM: source, medium, campaign, content, term
- Capitalização automática dos valores (minúsculas, maiúsculas ou como digitado)
- Preview da URL gerada em tempo real
- Alerta para URLs acima de 2000 chars

### Lote (Matriz)
- Múltiplos valores por campo separados por vírgula
- **Produto cartesiano:** gera todas as combinações de source × medium × campaign × content × term
- Contador de combinações em tempo real
- Tabela de resultados paginada
- Export: lista de URLs, CSV completo, Tracking Sheet (com colunas extras para métricas)

### Decodificar
- Cole qualquer URL com UTMs para extrair e visualizar os parâmetros

## Exemplo de uso em lote
```
utm_source: meta, google
utm_medium: cpc, display
utm_campaign: brand_nov24
```
Gera 4 URLs: meta/cpc, meta/display, google/cpc, google/display

## Dados e privacidade
- Sem backend — tudo processado no browser
- Funciona 100% offline após carregamento
