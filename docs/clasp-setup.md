# Setup Clasp — Deploy GAS via GitHub

## Pré-requisitos

```bash
npm install -g @google/clasp
clasp login   # autenticar com a conta Pessoal (falssp@gmail.com)
```

---

## scriptIds por pasta

Todos já preenchidos nos `.clasp.json` de cada pasta.

| Pasta | Ambiente | scriptId |
|-------|----------|----------|
| F1-IDs-AdServer/corp | Corp | `12CfPaskswefOU7lFqSlY7ozOSvr5GIIbNiQORIzrtX1MOK7c9epXyiQX` |
| F1-IDs-AdServer/pessoal | Pessoal | `1lyqAvHGXinovDnvgn1W53t0CxA-4PBfrJGmNLDkTO-zgZXoNmNweinI-` |
| F2-Gerador/corp | Corp | `1ZgzaZej05txoNZ1-36NqpusrnRo4eFBgehWaN27MPfqmJbRA2nF3USA2` |
| F2-Gerador/pessoal | Pessoal | `1b3ErH_OD3Gn1wElCuW-VPe0soE15PP_0dOvbZvbrEg-N6DpDgqVDyMMQ` |
| F3-Validador/corp | Corp | `1cG5SBWdb4eOiRXb9JSmW-U8bS6EylmxMdIYEkyuk6luUQKrbWNfFTP_V` |
| F3-Validador/pessoal | Pessoal | `1-QNQVSrbeqYL13XBNdEvEF2g3PSzcjaa5hRPbtAVQPhKDILWUHgT5oCO` |
| F4-Acessorios/corp | Corp | `1WVX1VIV27HCVlVBoAhZczWClXGxGypbhYvEar4Y0CowGuXaJ2JEdJv06` |
| F4-Acessorios/pessoal | Pessoal | `19VxJg3wD1-MBDOxW-8yBRfO9Jy6ZlHOU8P8Ofki5aYJmNBB4HGkZ_9oQ` |
| F5-Flashtalking/corp | Corp | `1RqXZcBXgKWysusXmC1eH0Xo3PeHYBg2w_IzVSn5AdfQUrUfeJrxdmgVj` |
| F5-Flashtalking/pessoal | Pessoal | `10E1Enkjj8xjJw2s2eRiBCmkr6v5S6VBAGOWOOaX4NQpamU95V7Fm78gq` |
| SuperApp/corp | Corp | `14NzeJYHlScHsDWa3ZqRaKZBJmQS29j0t_dOCJgXOIF3MOlcZz3sT24Bi` |
| SuperApp/pessoal | Pessoal | `1MepXw1J98bOq74mfDOlhxHHWiRWiGxarMARQW1Tdi1ab2kbUHwSHfNyk` |

---

## Deploy manual

```bash
# Autenticar na conta correta antes de cada push
clasp login   # Pessoal
# ou
clasp login --no-localhost   # Corp (abre browser para trocar conta)

cd F4-Acessorios/corp
clasp push --force
```

---

## Deploy automático (GitHub Actions)

O workflow `.github/workflows/deploy.yml` já está configurado.

**Secrets necessários (já configurados):**

| Secret | Conta |
|--------|-------|
| `CLASP_TOKEN_CORP` | felipe.lima@stormx.com.br |
| `CLASP_TOKEN_PESSOAL` | falssp@gmail.com |

Qualquer push no `main` que altere arquivos em uma pasta com `.clasp.json` dispara o deploy automático naquela pasta.

**Renovar tokens (quando expirar):**

```bash
clasp login   # loga com a conta desejada
cat ~/.clasprc.json   # copia o conteúdo
# GitHub → Settings → Secrets → atualizar CLASP_TOKEN_CORP ou CLASP_TOKEN_PESSOAL
```

---

## KeepAlive trigger

O F4 tem um trigger de 30 em 30 minutos que mantém o GAS aquecido.
Para instalar/reinstalar: Apps Script → Executar → `setupKeepAliveTrigger`

---

## Fluxo recomendado

```
Edita no GAS → testa → (Claude gera ou você edita local)
      ↓
git commit + push
      ↓
GitHub Actions → clasp push automático
```
