# Location Taxonomy Tool

Ferramenta de consulta da taxonomia `Location` da campanha Unilever BR.  
Gera valores no formato `cid-sao-rio`, `est-sp`, `reg-ne`, `nac` — prontos para copiar.

---

## Estrutura do repositório

```
location-tool/
├── CORP_location.gs       ← Apps Script (ambiente Corp)
├── CORP_location.html     ← Interface Web App (Corp)
├── PESSOAL_location.gs    ← Apps Script (ambiente Pessoal / dev)
├── PESSOAL_location.html  ← Interface Web App (Pessoal)
└── README.md
```

**Branches:**
| Branch     | Ambiente  |
|------------|-----------|
| `corp`     | StormX Corp — planilha [UL] Taxonomia_Location |
| `personal` | Desenvolvimento — planilha [Felipe] Taxonomia_Location |

---

## Estrutura esperada na planilha

Cada planilha precisa ter **duas abas**: `Oficial` e `Inclusão`.

Em cada aba, o formato das colunas é:

| Coluna A (sigla)    | Coluna B (label)      |
|---------------------|-----------------------|
| `cid-sao`           | São Paulo             |
| `cid-rio`           | Rio de Janeiro        |
| `est-sp`            | Estado de SP          |
| `reg-se`            | Sudeste               |
| `nac`               | Nacional              |

> A aba `Oficial` prevalece sobre `Inclusão` em caso de sigla duplicada.  
> A primeira linha é considerada cabeçalho e ignorada.

---

## Deploy — Ambiente Corp (`branch: corp`)

### 1. Configurar o ID da planilha

Em `CORP_location.gs`, linha 8:
```js
const CORP_SHEET_ID = 'COLE_AQUI_O_ID_DA_PLANILHA_CORP';
```
Substitua pelo ID da planilha `[UL] Taxonomia_Location` (Corp).  
O ID está na URL da planilha: `https://docs.google.com/spreadsheets/d/**ID_AQUI**/edit`

### 2. Criar o projeto Apps Script

1. Abra [script.google.com](https://script.google.com) → **Novo projeto**
2. Renomeie o projeto para `location-tool-corp`
3. Apague o código padrão do arquivo `Código.gs`
4. Crie dois arquivos:
   - `CORP_location.gs` → cole o conteúdo do arquivo homônimo deste repo
   - `CORP_location.html` → **Arquivo → Novo → HTML** → cole o conteúdo

### 3. Publicar como Web App

1. **Implantar → Nova implantação**
2. Tipo: **App da Web**
3. Configurações:
   - **Executar como:** Eu (sua conta)
   - **Quem pode acessar:** Qualquer pessoa na organização (ou "Qualquer pessoa" se necessário)
4. Clique em **Implantar** → copie a URL gerada

### 4. Atualizar após mudanças

Sempre que alterar o código:  
**Implantar → Gerenciar implantações → Editar (lápis) → Versão: Nova versão → Implantar**

---

## Deploy — Ambiente Pessoal (`branch: personal`)

O processo é **idêntico ao Corp**, trocando:

| Item | Corp | Pessoal |
|------|------|---------|
| Arquivo `.gs` | `CORP_location.gs` | `PESSOAL_location.gs` |
| Arquivo `.html` | `CORP_location.html` | `PESSOAL_location.html` |
| Constante de ID | `CORP_SHEET_ID` | `PESSOAL_SHEET_ID` |
| Nome do projeto GAS | `location-tool-corp` | `location-tool-pessoal` |
| Planilha | `[UL] Taxonomia_Location` | `[Felipe] Taxonomia_Location` |

---

## Como usar a ferramenta

1. Selecione o **Tipo** (Cidade / Estado / Região / Nacional)
2. Para **Cidade** e **Região**: busque e clique nas entradas (até 3)
3. Para **Estado**: busque e clique em 1 entrada
4. Para **Nacional**: o valor `nac` é gerado automaticamente
5. Clique em **Copiar** — o valor está pronto para colar no campo de taxonomia

---

## Lógica de montagem do valor

| Tipo | Exemplos de saída |
|------|-------------------|
| Cidade (1) | `cid-sao` |
| Cidade (2) | `cid-sao-rio` |
| Cidade (3) | `cid-sao-rio-bhz` |
| Estado | `est-sp` |
| Região (1) | `reg-se` |
| Região (2) | `reg-se-ne` |
| Nacional | `nac` |

> As siglas de cidade são extraídas da planilha — se uma sigla errar, corrija na aba `Oficial`.
