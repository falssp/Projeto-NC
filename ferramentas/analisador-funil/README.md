# 🔽 Analisador de Funil de Campanha

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/analisador-funil/

Visualize drop-offs, identifique gargalos e compare períodos no funil de conversão das suas campanhas.

## Funcionalidades

### Dados do Funil
- Configuração de estágios personalizados (nome, volume, custo, meta)
- Padrão AdOps: Impressões → Cliques → Visitas → Leads → Conversões → Vendas
- Adicionar/remover estágios livremente
- Campo de receita total para cálculo de ROAS

### Visualização
- Funil visual proporcional com cores gradiente
- Drop-off e CVR exibidos entre cada par de estágios

### Métricas
- CVR global e entre cada estágio
- Custo acumulado por estágio
- Custo por unidade em cada nível do funil
- ROAS (quando receita preenchida)
- Semáforo verde/amarelo/vermelho vs meta configurada
- **Destaque automático do maior gargalo**

### Comparar Períodos
- Cole dados de Período A e B no formato `Estágio,Volume`
- Tabela comparativa com variação percentual (delta)

### Export
- Copiar resumo para clipboard
- Baixar CSV completo com todas as métricas

## Formato de entrada (comparação)
```
Impressões,100000
Cliques,3500
Visitas,2800
Leads,420
Conversões,85
```

## Dados e privacidade
- Sem backend — tudo processado no browser
- Estado salvo automaticamente no localStorage
- Funciona 100% offline após carregamento
