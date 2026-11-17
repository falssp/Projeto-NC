# Como subir arquivos ADP e RM

Guia técnico do fluxo de upload de planilhas e da automação do repositório.

---

## Onde ficam os arquivos

| Tipo | Pasta no repositório |
|---|---|
| ADP | `Arquivos/ADP/{ano}/` |
| RM | `Arquivos/RM/{ano}/` |

Os arquivos ficam **só no branch `main`** — não são publicados no GitHub Pages (só HTML e JSON vão para Pages).

---

## Passo a passo para subir uma nova versão

### 1. Acesse a pasta do ano correspondente

- ADP 2026 → [`Arquivos/ADP/2026/`](https://github.com/falssp/Projeto-NC/tree/main/Arquivos/ADP/2026)
- RM 2026 → [`Arquivos/RM/2026/`](https://github.com/falssp/Projeto-NC/tree/main/Arquivos/RM/2026)

> Para 2027 em diante: crie a pasta do novo ano via "Add file" no GitHub — a automação detecta automaticamente.

### 2. Faça o upload do arquivo xlsx

No GitHub, dentro da pasta correta:

1. Clique em **"Add file" → "Upload files"**
2. Arraste o arquivo `.xlsx` ou clique para selecionar
3. Clique em **"Commit changes"**

### 3. A automação cuida do resto

Assim que o commit chega ao `main`, o GitHub Actions (`update-latest.yml`) roda automaticamente e:

- Atualiza `Arquivos/ADP/latest.json` (ou RM) com o nome, caminho, versão e data do arquivo mais recente
- Atualiza `Arquivos/ADP/years.json` (ou RM) com a lista de todos os anos disponíveis
- Regenera o `index.html` de cada pasta de ano

### 4. O manual e o Pages atualizam sozinhos

- O deploy do Pages (`deploy.yml`) publica os arquivos HTML/JSON — sem os xlsx (que são grandes demais)
- O manual ADP lê o `latest.json` automaticamente e exibe a versão mais recente no botão de download
- A seção **"Versões anteriores"** do manual lê o `years.json` e monta os links por ano dinamicamente

---

## Regras de nomenclatura

### ADP
O script identifica a versão pelo padrão `_{major}_{minor}.xlsx` no nome do arquivo.

Exemplo: `UNCC_Digital_Platform_String_Tool_Merge_5_6.xlsx` → versão **5.6**

### RM
O script identifica pelo padrão `_{ano}_v{major}_{minor}` no nome do arquivo.

Exemplo: `Relationship_Matrix_2026_v6_1.xlsx` → versão **6.1**

---

## Estrutura de arquivos gerados pela automação

```
Arquivos/
├── ADP/
│   ├── latest.json        ← versão mais recente (gerado automaticamente)
│   ├── years.json         ← lista de anos disponíveis (gerado automaticamente)
│   ├── 2025/
│   │   ├── index.html     ← lista de arquivos do ano (gerado automaticamente)
│   │   └── *.xlsx
│   ├── 2026/
│   │   ├── index.html
│   │   └── *.xlsx
│   └── Manual/
│       └── manual_adp_stormx.html
└── RM/
    ├── latest.json
    ├── years.json
    ├── 2026/
    │   ├── index.html
    │   └── *.xlsx
    └── Manual/
```

---

## GitHub Actions envolvidos

| Workflow | Arquivo | Quando roda | O que faz |
|---|---|---|---|
| Atualiza jsons | `update-latest.yml` | Push de `*.xlsx` em `Arquivos/ADP/**` ou `Arquivos/RM/**` | Atualiza `latest.json`, `years.json` e `index.html` de cada pasta de ano |
| Deploy Pages | `deploy.yml` | Push em qualquer arquivo do `main` | Publica HTML/JSON no GitHub Pages — **sem os xlsx** (evita timeout) |

---

## Perguntas frequentes

**Preciso mexer no código quando subir uma versão nova?**
Não. Sobe o xlsx na pasta correta e a automação cuida de tudo.

**E para 2027?**
Cria a pasta `Arquivos/ADP/2027/` pelo GitHub, sobe o xlsx lá. A Action detecta automaticamente o novo ano e atualiza o `years.json` — o link de 2027 aparece no manual sem nenhuma mudança de código.

**O xlsx fica acessível para download?**
Sim. Os xlsx ficam no branch `main` e podem ser baixados diretamente pelo GitHub. O manual aponta para o arquivo via `latest.json`, que tem o caminho relativo correto.

**Por que os xlsx não vão para o Pages?**
O GitHub Pages tem um limite de tempo para sincronizar arquivos. Com 44+ arquivos xlsx no repo, o deploy travava. A solução foi excluir xlsx do Pages — eles continuam no `main` e acessíveis, só não são servidos pelo CDN do Pages.
