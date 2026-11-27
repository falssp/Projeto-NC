# F4 — Acessorios · Corp

Suite de ferramentas HTML/GAS — ambiente Corp (Original).

## Spreadsheet

| Campo | Valor |
|-------|-------|
| ID | `1K3wO3b8BOOQldtHv7pBtOubmhoidoZBI0Y8yk4_UnmI` |
| Link | [Abrir planilha](https://docs.google.com/spreadsheets/d/1K3wO3b8BOOQldtHv7pBtOubmhoidoZBI0Y8yk4_UnmI/edit?gid=1454625265#gid=1454625265) |

## Web App

| Ambiente | URL |
|----------|-----|
| Corp | https://script.google.com/macros/s/AKfycbxiWW0zVuFdRJCvzwCBeH8OIqsFJyKkhqZotgHX8vrD0UARbU3SUtJ7IxZsg2BXc_QrPw/exec |

## Arquivos HTML

Os 3 arquivos HTML devem ser mantidos sempre em sincronia (mesmas features, mesmo MRG_COLS).
Alterar qualquer um → alterar os outros 2 também.

| Arquivo | Serve como | Obs |
|---------|-----------|-----|
| `index.html` | ON (GAS-connected) | Cole no Apps Script Editor e faça redeploy |
| `F4_acessorios.html` | OFF (standalone) | Copia de F4_acessorios_off.html — identicos |
| `F4_acessorios_off.html` | OFF (standalone) | Copia de F4_acessorios.html — identicos |

> **Por que 3 arquivos?** O GAS exige que o arquivo se chame `index.html`. Os outros dois existem para
> facilitar testes offline e uma futura migração sem GAS. Enquanto o GAS não for eliminado, os 3 ficam iguais.

## MRG_COLS — ADP v4.8 (Placement Name · linha 14)

Mapeamento validado diretamente no XLSX v4.8. `adpKey` = coluna "Placement Name" (usada no match);
`adpSpc` = coluna "Special Instructions" (preenchida no Merge).

| Tab ADP | rmKey (RM) | adpKey (Placement Name) | adpSpc (Special Instructions) |
|---------|-----------|------------------------|-------------------------------|
| Google | AT | BE | BG |
| Programmatic | AW | BH | BJ |
| Youtube | AQ | BF | BH |
| Meta e Tiktok | AS | BG | BI |
| Pinterest, Snapchat e Twitter | AV | BC | BE |
| Flashtalking | AR | AX | BB |

## Arquivos GAS

| Arquivo | Tipo | Descricao |
|---------|------|-----------|
| `index.html` | HTML | Interface principal (Corp ON) |
| `F4_acessorios.html` | HTML | Interface acessorios (Corp OFF) |
| `Code.gs` | GAS | Backend principal |
| `ValidadorLinks.gs` | GAS | Validador de links |
| `ExportadorDicionario.gs` | GAS | Exportador do dicionario |
| `Historico.gs` | GAS | Historico de operacoes |
| `DicionarioCondicional.gs` | GAS | Dicionario condicional Corp |
| `InfluencerNameTool.gs` | GAS | Ferramenta de nomes de influencer |
| `Menu.gs` | GAS | Menu F4 Corp |

## Modulos

Gerador de IDs · ANS · Campaign Local · Dicionario de Influs ·
Extrator de Influencer · Merge/Mapeador RM→ADP · Influencer Name Tool ·
Extrator de Formulas · Comparador · Contador ADP · Removedor de Caracteres
