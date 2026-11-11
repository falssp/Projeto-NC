# Setup Clasp — Deploy GAS via GitHub

## Visão geral

O clasp sincroniza este repositório com os projetos Google Apps Script.
Um push no `main` dispara o workflow que faz `clasp push` automaticamente
nas pastas que mudaram.

---

## 1. Instalar o clasp

```bash
npm install -g @google/clasp
```

---

## 2. Autenticar as duas contas

O projeto tem dois ambientes (Corp e Pessoal) com contas Google separadas.
O clasp guarda uma credencial por vez — autentique e salve cada uma.

**Pessoal (falssp@gmail.com):**
```bash
clasp login
# Autenticar com falssp@gmail.com no browser
cat ~/.clasprc.json   # copiar o conteúdo
```

**Corp (felipe.lima@stormx.com.br):**
```bash
clasp login --no-localhost
# Autenticar com felipe.lima@stormx.com.br
cat ~/.clasprc.json   # copiar o conteúdo
```

> A conta Corp exige que a Apps Script API esteja habilitada:
> https://script.google.com/home/usersettings

---

## 3. Adicionar secrets no GitHub

**github.com/falssp/Projeto-NC → Settings → Secrets and variables → Actions**

| Secret | Valor |
|--------|-------|
| `CLASP_TOKEN_PESSOAL` | conteúdo do `.clasprc.json` da conta Pessoal |
| `CLASP_TOKEN_CORP` | conteúdo do `.clasprc.json` da conta Corp |

---

## 4. scriptIds por pasta

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

## 5. Deploy manual (quando necessário)

```bash
cd F4-Acessorios/corp
clasp push --force
```

---

## 6. Keep Alive (F4)

O F4 tem um trigger de keep alive que mantém o script quente.
Para instalar: Apps Script → Executar → `setupKeepAliveTrigger`
Rodar uma vez em cada ambiente (Corp e Pessoal).

---

## Renovar tokens

Os `refresh_token` são permanentes. Se o workflow falhar por autenticação,
basta refazer o `clasp login` na conta correspondente e atualizar o secret.
