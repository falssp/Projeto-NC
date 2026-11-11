# Manual do Usuário — F4 Acessórios | NC Tool
> Versão 2.0

## Ferramentas disponíveis

| Ferramenta | O que faz |
|---|---|
| Ad Name Sync | Compara Ad Names entre Excel e Sheets pelo Placement ID |
| Extrator — Campaign Local | Lê 6 abas do ADP e gera linhas para planilha Campaign Local |
| Comparador de Estruturas | Compara tokens entre duas strings posição por posição |
| Contador de Linhas — ADP | Conta linhas válidas por aba do ADP |
| Extrator — Dicionário de Influs | Extrai links únicos de influenciadores do ADP/RM |
| Extrator de Fórmulas | Lista fórmulas de Excel por aba e coluna — 100% local |
| Extrator de Influencer | Extrai handle e plataforma de links de perfil |
| Gerador de IDs | Cria IDs SX/AMZ nas planilhas do sistema |
| Influencer Name Tool | Extrai nome e seguidores a partir do link de perfil |
| Mapeador RM → ADP | Configuração livre de colunas RM → ADP para linhas Alterar |
| Merge RM → ADP | Merge completo com mapeamento fixo por status da col A do RM |

## Merge RM → ADP — Regras

| Status RM (col A) | Ação no ADP | Status após |
|---|---|---|
| Solicitado para Stormx | Nova linha inserida | Concluído Stormx |
| Alterar | Linha atualizada + Special Instructions | Alterado |
| Cancelar | Special Instructions = Cancelar | Cancelado |
| (outros) | Ignorado | Sem alteração |

> ℹ️ O merge roda localmente no navegador — nenhum dado trafega para servidores externos.
