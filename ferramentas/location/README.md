# Location Taxonomy

> 🔗 **[Abrir ferramenta](https://falssp.github.io/Projeto-NC/ferramentas/location/)**

Ferramenta de consulta da taxonomia `Location` da campanha Unilever BR.  
Gera valores no formato `cid-sao-rio`, `est-sp`, `reg-ne`, `nac` — prontos para copiar.

---

## Estrutura do repositório

```
ferramentas/location/
├── index.html             ← Interface Web App
├── municipios.json        ← Base de municípios BR (5.499 cidades)
├── CORP_location.gs       ← Apps Script (ambiente Corp)
├── PESSOAL_location.gs    ← Apps Script (ambiente Pessoal / dev)
└── README.md
```

---

## Estrutura esperada na planilha (GAS)

| Coluna A (sigla) | Coluna B (label)     |
|------------------|----------------------|
| `cid-sao`        | São Paulo            |
| `est-sp`         | Estado de SP         |
| `reg-se`         | Sudeste              |
| `nac`            | Nacional             |

> A aba `Oficial` prevalece sobre `Inclusão` em caso de sigla duplicada.

---

## Deploy GAS (Corp ou Pessoal)

1. Abra [script.google.com](https://script.google.com) → **Novo projeto**
2. Cole o conteúdo de `CORP_location.gs` (ou `PESSOAL_location.gs`)
3. Substitua o `SHEET_ID` pela ID da planilha correta
4. Adicione um arquivo HTML e cole o conteúdo de `index.html`
5. **Implantar → App da Web** → Executar como: Eu · Acesso: Organização
6. Copie a URL gerada

---

## Como usar

1. Selecione o **Tipo** na sidebar (Nacional / Região / Estado / Cidade)
2. Para **Cidade**: filtre por região/estado, busque por nome ou sigla, selecione até 3
3. Para **Estado** ou **Região**: selecione até 3
4. Para **Nacional**: valor `nac` gerado automaticamente
5. Clique em **Copiar**

| Tipo       | Exemplos de saída          |
|------------|----------------------------|
| Cidade (1) | `cid-gru`                  |
| Cidade (3) | `cid-gru-rio-cnf`          |
| Estado     | `est-sp-est-rj`            |
| Região     | `reg-se-ne`                |
| Nacional   | `nac`                      |
