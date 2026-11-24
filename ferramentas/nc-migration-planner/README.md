# NC Migration Planner

Planeja migrações de naming convention — mapeia NCs antigas para novas e gera pares find-replace.

🔗 **https://falssp.github.io/Projeto-NC/ferramentas/nc-migration-planner/**

---

## O que faz

Dois modos de migração:

| Modo | Como usar |
|---|---|
| **Lista direta** | Cole as NCs antigas e as novas na mesma ordem. A ferramenta faz a correspondência linha a linha |
| **Mapa de-para** | Deixe a coluna "Novas" vazia e preencha a tabela com pares `valor antigo → valor novo`. A ferramenta substitui os valores em cada segmento automaticamente |

## Resultado

- **Migradas** (verde): NC antiga diferente da nova — sucesso
- **Sem mudança** (âmbar): NC ficou idêntica — nenhuma regra se aplicou
- **Sem match** (vermelho): NC não tinha correspondência na lista nova

## Pares Find-Replace

Gerados automaticamente a partir das correspondências únicas. Prontos para colar em qualquer ferramenta de substituição em massa.

## Export

- **↓ CSV de-para**: nc_antiga, nc_nova, status, nota
- **⎘ Find-Replace**: pares em formato TSV (cola direto no Sheets/Excel)

## Uso

**Modo lista direta:**
1. Cole NCs antigas em "NCs Antigas"
2. Cole NCs novas (mesma ordem) em "NCs Novas"
3. Clique **▶ Planejar Migração**

**Modo mapa de-para:**
1. Cole NCs antigas em "NCs Antigas"
2. Deixe "NCs Novas" em branco
3. Preencha a tabela de mapa (valor antigo → valor novo)
4. Clique **▶ Planejar Migração**

## Dados

100% offline. Mapa de-para salvo em localStorage.
