# Dicionário de Dados — NC Tool | Unilever BR x Grasp
> Versão 2.0 · F1 + F2 + F3 + F4

## Plataformas — Valores Canônicos

| Valor | Cor BG | Cor Font |
|-------|--------|----------|
| Amazon | #FF9900 | #000000 |
| Compra Direta | #6B7280 | #FFFFFF |
| DV360 | #1967D2 | #FFFFFF |
| Google Ads | #34A853 | #FFFFFF |
| Kwai | #F60050 | #FFFFFF |
| LinkedIn | #0A66C2 | #FFFFFF |
| Meta | #0866FF | #FFFFFF |
| Pinterest | #E60023 | #FFFFFF |
| Search | #4285F4 | #FFFFFF |
| Snapchat | #FFFC00 | #000000 |
| Spotify | #1DB954 | #000000 |
| TikTok | #FF0050 | #FFFFFF |
| Twitter/X | #000000 | #FFFFFF |
| YouTube | #FF0000 | #FFFFFF |

## F1 — Campos por Aba de Usuário

| Campo | Coluna | Tipo | Preenchimento |
|-------|--------|------|---------------|
| Data | A | Date | Automático — dd/MM/yyyy |
| ID Meta/TikTok/YouTube | B | String | Automático — imutável |
| ID Amazon | C | String | Automático — imutável |
| Ad Name | D | String | Manual |
| Plataforma | E | Enum | Manual — ver tabela acima |

> ⚠️ Colunas A, B e C não devem ser editadas manualmente.

## Regras de perfil

| Perfil | Aba individual | Edita Geral | Edita Usuarios | Configura |
|--------|---------------|-------------|----------------|-----------|
| Admin | ❌ | ✅ | ✅ | ✅ |
| Dev | ✅ | ✅ | ✅ | ✅ |
| Gerente | ❌ | ❌ | ❌ | ❌ |
| Operador | ✅ | ❌ | ❌ | ❌ |

## Regras de Naming Convention

| Regra | Valor |
|-------|-------|
| Separador de campos | `_` (underscore) |
| Separador de palavras | `-` (hífen) |
| Caracteres permitidos | A-Z, a-z, 0-9, `_`, `-` |
| Caracteres proibidos | Espaço, acentos, símbolos especiais |
