# Projeto-NC · NC Tool Unilever BR

Sistema de naming conventions e gestão de campanhas para Unilever BR.
Desenvolvido pela StormX em parceria com a Grasp.

## Ambientes

| Ambiente | Conta | Descrição |
|----------|-------|-----------|
| **Corp** | felipe.lima@stormx.com.br | Ambiente original (produção) |
| **Pessoal** | falssp@gmail.com | Backup e desenvolvimento |

Regra absoluta: arquivos Corp nunca referenciam IDs ou URLs do Pessoal, e vice-versa.

---

## Estrutura do repositório

```
Projeto-NC/
├── F1-IDs-AdServer/
│   ├── corp/          # Code.gs + .clasp.json
│   └── pessoal/
├── F2-Gerador/
│   ├── corp/          # Code.gs + .clasp.json
│   └── pessoal/
├── F3-Validador/
│   ├── corp/          # Code.gs + index.html + .clasp.json
│   └── pessoal/
├── F4-Acessorios/
│   ├── corp/          # Code.gs + index.html + appsscript.json + .clasp.json
│   └── pessoal/
├── F5-Flashtalking/
│   ├── corp/
│   └── pessoal/
├── SuperApp/
│   ├── corp/
│   └── pessoal/
├── docs/
│   ├── links.md       # Todos os IDs, URLs e tokens (não commitar publicamente)
│   └── clasp-setup.md # Guia de setup do clasp
└── .github/
    └── workflows/
        └── deploy.yml # CI: clasp push automático ao fazer push no main
```

---

## Fases

| Fase | Nome | Status | Frontend |
|------|------|--------|----------|
| F1 | IDs AdServer | Completo | Google Sheets |
| F2 | Gerador NC | Completo | Google Sheets |
| F3 | Validador NC | Em desenvolvimento | GAS Web App |
| F4 | Acessórios | Completo | GAS Web App + GitHub Pages |
| F5 | FT Flashtalking | Completo | GAS Web App |
| Super App | Launcher | Completo | GAS Web App |

---

## GitHub Pages (nc-tool)

Repo público: [falssp/nc-tool](https://github.com/falssp/nc-tool)
Hub: [falssp.github.io/nc-tool](https://falssp.github.io/nc-tool/)

| Fase | Corp | Pessoal |
|------|------|---------|
| F4 — Acessórios | [f4-corp](https://falssp.github.io/nc-tool/f4-corp/) | [f4-pessoal](https://falssp.github.io/nc-tool/f4-pessoal/) |
| F3 — Validador | Em breve | Em breve |
| F5 — Flashtalking | Em breve | Em breve |

Chamadas do Pages ao GAS são protegidas por token. Ver `docs/links.md`.

---

## Deploy automático (CI)

Qualquer push no `main` que altere arquivos em uma pasta com `.clasp.json` e `appsscript.json` dispara o `clasp push` automaticamente para o projeto GAS correspondente.

Secrets necessários no repo:
- `CLASP_TOKEN_CORP` — credencial clasp de felipe.lima@stormx.com.br
- `CLASP_TOKEN_PESSOAL` — credencial clasp de falssp@gmail.com

Ver `docs/clasp-setup.md` para instruções completas.

---

## Convenção de commits

```
[F4] Fix ANS_EXCEL_MAP para ADP 4.6
[F3] Add exceções modal
[CI] Update deploy workflow
[docs] Update links.md
[All] Fix typo em mensagem de erro
```
