# Location Taxonomy · Unilever BR

> 🔗 **[Abrir ferramenta](https://falssp.github.io/Projeto-NC/ferramentas/location/)**

Ferramenta de consulta da taxonomia `Location` para campanhas Unilever BR.
Gera valores no formato `cid-sao-rio`, `est-sp`, `reg-ne`, `nac` — prontos para copiar e usar no NC Tool.

---

## Arquivos

```
ferramentas/location/
├── index.html                  ← Ferramenta (interface web)
├── municipios.json             ← Base de municípios BR (5.499 cidades, IBGE 2024)
├── UL_Location_Taxonomy.xlsx   ← Referência de valores + fluxo de alterações
├── reprocessar_location.py     ← Script de atualização da base
├── CORP_location.gs            ← Apps Script (ambiente Corp)
├── PESSOAL_location.gs         ← Apps Script (ambiente Pessoal / dev)
└── README.md
```

---

## Como usar

1. Acesse a ferramenta pelo link acima
2. Selecione o **Tipo** na sidebar (Nacional / Região / Estado / Cidade)
3. Para **Cidade**: filtre por região ou estado, busque pelo nome ou sigla
4. Para **Estado** ou **Região**: clique direto na lista
5. Para **Nacional**: o valor `nac` é gerado automaticamente
6. Clique em **Copiar** e cole no campo Location do NC Tool

| Tipo | Exemplos |
|------|----------|
| Nacional | `nac` |
| Região (1) | `reg-se` |
| Região (2-3) | `reg-se-ne` |
| Estado (1) | `est-sp` |
| Estado (2-3) | `est-sp-est-rj` |
| Cidade (1) | `cid-gru` |
| Cidade (2-3) | `cid-gru-rio-cnf` |

---

## Referência Excel

O arquivo `UL_Location_Taxonomy.xlsx` contém:

| Aba | Conteúdo |
|-----|----------|
| Capa | Metadados e instruções |
| Nacional | Valor `nac` |
| Regiões | 5 regiões com siglas |
| Estados | 27 UFs |
| Cidades | 5.499 municípios + coluna IATA |
| Cidades IATA | 143 cidades com aeroporto |

A coluna **Status** nas abas de dados aceita dropdown:
- `ALTERAR` — corrigir sigla ou nome
- `ADICIONAR` — incluir novo item
- `REMOVER` — excluir item

---

## Solicitar alterações na base

1. Abra o `UL_Location_Taxonomy.xlsx`
2. Localize o item nas abas Cidades, Estados ou Regiões
3. Preencha os dados e selecione o Status no dropdown
4. Envie o arquivo para a equipe StormX

Após receber o Excel, a equipe roda o script de reprocessamento:

```bash
# Coloque o Excel e o municipios.json na mesma pasta e rode:
python reprocessar_location.py

# Revise o municipios_updated.json gerado
# Renomeie para municipios.json e suba no GitHub
```

A ferramenta atualiza em menos de 5 minutos após o commit.

---

## Deploy GAS (opcional)

Para usar a ferramenta dentro de uma planilha Google Sheets via Apps Script:

1. Abra [script.google.com](https://script.google.com) → Novo projeto
2. Cole o conteúdo de `CORP_location.gs` (ou `PESSOAL_location.gs`)
3. Substitua o `SHEET_ID` pelo ID da planilha correta
4. Adicione um arquivo HTML e cole o conteúdo de `index.html`
5. **Implantar → App da Web** → Executar como: Eu · Acesso: Organização

---

## Branches

| Branch | Ambiente |
|--------|----------|
| `main` | Desenvolvimento — source of truth |
| `gh-pages` | Produção — servido pelo GitHub Pages |

> ⚠️ Sempre sincronize `main` → `gh-pages` após alterações.
