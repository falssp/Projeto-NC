# Setup Clasp — Deploy GAS via GitHub

## Pré-requisitos

```bash
npm install -g @google/clasp
clasp login
```

## Preencher os scriptIds

Cada pasta tem um `.clasp.json` com placeholder. Substitua `<SCRIPT_ID_...>` pelo ID real:

**Como encontrar:** Apps Script → abrir o projeto → ⚙ Configurações → ID do script

| Pasta | scriptId |
|-------|----------|
| F1-IDs-AdServer/corp | Apps Script F1 Corp |
| F1-IDs-AdServer/pessoal | Apps Script F1 Pessoal |
| F2-Gerador/corp | Apps Script F2 Corp |
| F2-Gerador/pessoal | Apps Script F2 Pessoal |
| F3-Validador/corp | Apps Script F3 Corp |
| F3-Validador/pessoal | Apps Script F3 Pessoal |
| F4-Acessorios/corp | Apps Script F4 Corp |
| F4-Acessorios/pessoal | Apps Script F4 Pessoal |
| F5-Flashtalking/corp | Apps Script F5 Corp |
| F5-Flashtalking/pessoal | Apps Script F5 Pessoal |
| SuperApp/corp | Apps Script SuperApp Corp |
| SuperApp/pessoal | Apps Script SuperApp Pessoal |

## Deploy manual

```bash
cd F4-Acessorios/corp
clasp push --force
```

## Deploy automático (GitHub Actions)

Adicione o secret `CLASP_TOKEN` no repo:

1. `cat ~/.clasprc.json` — copia o conteúdo
2. GitHub → Settings → Secrets → New repository secret
3. Nome: `CLASP_TOKEN`, valor: conteúdo do `.clasprc.json`

A partir daí, qualquer push no `main` que altere arquivos em uma pasta com `.clasp.json` dispara o deploy automático naquela fase/ambiente.

## Fluxo recomendado

```
Edita no GAS → testa → clasp pull → git commit → git push
                                          ↓
                               Actions faz clasp push
                               (confirma que repo = GAS)
```
