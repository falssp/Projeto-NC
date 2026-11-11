# Dicionário de Dados — F4 Acessórios | NC Tool
> Versão 2.0

## Módulo Gerador de IDs

| Tipo | Prefixo | Padding | Exemplo |
|------|---------|---------|---------|
| SX (todas exceto Amazon) | SX | 8 dígitos | SX00004310 |
| AMZ (Amazon) | AMZ | 6 dígitos + H | AMZ000123H |

## Mapeamento ADP por módulo

### Ad Name Sync

| Plataforma | Coluna ID | Coluna Ad Name |
|---|---|---|
| Google | BF | CY |
| Programmatic | BJ | DH |
| YouTube | BG | DF |
| Meta e TikTok | BH | DD |
| Pinterest, Snapchat e Twitter | BE | DA |
| Flashtalking | AZ | CZ |

### Merge RM → ADP

| Aba ADP | rmKey | adpKey | Special Instructions |
|---|---|---|---|
| Google | AT | BF | BG |
| Programmatic | AW | BJ | BK |
| Youtube | AQ | BG | BH |
| Meta e Tiktok | AS | BH | BI |
| Pinterest, Snapchat e Twitter | AV | BE | BF |
| Flashtalking | AR | AZ | BA |

## Status RM (col A) → Ação ADP

| Status | Ação | Status após |
|---|---|---|
| Solicitado para Stormx | Nova linha no ADP | Concluído Stormx |
| Alterar | Atualiza linha + Special Instructions | Alterado |
| Cancelar | Special Instructions = Cancelar | Cancelado |
| (outros) | Ignorado | Sem alteração |

## IDs hardcoded em Code.gs (Corp)

| Variável | Planilha |
|---|---|
| MINHA_SHEET_ID | IDs da Unilever sem Ad Server |
| CHEFE_SHEET_ID | IDs da Unilever |
| CL_SHEET_ID | Inclusão Campaign Local |
| DIC_SHEET_ID | Dicionário_InfluencerName |
