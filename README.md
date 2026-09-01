# Projeto-NC · NC Tool Unilever BR

Sistema de naming conventions e gestão de campanhas para Unilever BR.
Desenvolvido pela StormX em parceria com a Grasp.

## Ambientes

| Ambiente | Conta | Descrição |
|----------|-------|-----------|
| **Corp** | felipe.lima@stormx.com.br | Ambiente original (produção) |
| **Pessoal** | falssp@gmail.com | Ambiente backup — isolado do Corp |

> Corp e Pessoal são completamente isolados. Nenhum arquivo Corp referencia IDs ou paths de Pessoal.

---

## Módulos

| Fase | Nome | Status | GitHub Pages |
|------|------|--------|--------------|
| F1 | IDs AdServer | Implantado | — (planilha) |
| F2 | Gerador NC | Implantado | — (planilha) |
| F3 | Validador | Implantado | Em breve |
| F4 | Acessórios | Implantado | [Corp](https://falssp.github.io/nc-tool/f4-corp/) · [Pessoal](https://falssp.github.io/nc-tool/f4-pessoal/) |
| F5 | FT Flashtalking Validator | Implantado | Em breve |
| Super App | Hub central | Implantado | [Hub](https://falssp.github.io/nc-tool/) |

---

## Estrutura de pastas

```
Projeto-NC/
├── F1-IDs-AdServer/   corp/ · pessoal/
├── F2-Gerador/        corp/ · pessoal/ · (Shared: Tabs1.gs, Tabs2.gs)
├── F3-Validador/      corp/ · pessoal/
├── F4-Acessorios/     corp/ · pessoal/
├── F5-Flashtalking/   corp/ · pessoal/
├── SuperApp/          corp/ · pessoal/
└── docs/              links.md · clasp-setup.md
```

Cada pasta contém: arquivos `.gs`, `.html`, `.clasp.json`, `appsscript.json`, `.claspignore`

---

## Stack

- Google Apps Script (GAS) — backend e lógica
- Google Sheets — armazenamento
- HTML/CSS/JS — frontend (GAS embed + GitHub Pages)
- GitHub Actions — deploy automático via clasp
- Jira REST API v3, Google Drive API

---

## Deploy automático

Qualquer push no `main` que altere arquivos em uma pasta com `.clasp.json` dispara o `clasp push` automaticamente via GitHub Actions.

- Pastas `corp/` usam `CLASP_TOKEN_CORP` (felipe.lima@stormx.com.br)
- Pastas `pessoal/` usam `CLASP_TOKEN_PESSOAL` (falssp@gmail.com)

Ver `docs/clasp-setup.md` para configuração completa.

---

## Convenção de commits

```
[F4] Fix ANS_EXCEL_MAP para ADP 4.6
[F3] Add exceções modal
[CI] Update deploy workflow
[docs] Update links.md
[All] Propagate fix para corp e pessoal
```
