# F1 — IDs AdServer · NC Tool Unilever BR

Planilha de gestão de IDs únicos por campanha/plataforma.
Garante unicidade de IDs por operador, plataforma e ciclo de campanha.

---

## Links por ambiente

### Corp (felipe.lima@stormx.com.br)

| Recurso | Valor |
|---------|-------|
| **Planilha** | `1VBaExPGHOVYxpTyzJymrb8RuWWe34_9WBE0aC3slETU` |
| **Link planilha** | [Abrir no Drive](https://docs.google.com/spreadsheets/d/1VBaExPGHOVYxpTyzJymrb8RuWWe34_9WBE0aC3slETU/edit) |

### Pessoal (falssp@gmail.com)

| Recurso | Valor |
|---------|-------|
| **Planilha** | `1vGM_se-b1rechwv91WnSw-SW2XQFJ4DN4FPWqrEMkq8` |
| **Link planilha** | [Abrir no Drive](https://docs.google.com/spreadsheets/d/1vGM_se-b1rechwv91WnSw-SW2XQFJ4DN4FPWqrEMkq8/edit) |

---

## Estrutura de arquivos

```
F1-IDs-AdServer/
├── corp/
│   ├── Config.gs         ← configurações centrais, IDs, plataformas, geração
│   ├── Main.gs           ← onOpen, onEdit, onChange, triggers, log
│   ├── Painel.gs         ← dashboard executivo com contagem por plataforma
│   ├── Usuarios.gs       ← gestão de usuários, perfis, proteções e e-mails
│   ├── AbaUsuario.gs     ← menu, criação de linhas, onEdit por aba, formatação
│   ├── Geral.gs          ← formatação e sincronização da aba Geral
│   ├── GeralSync.gs      ← consolidação de todas as abas de usuário na Geral
│   ├── Setup.gs          ← carga inicial com equipe real StormX
│   ├── Plataformas.gs    ← cores brand, normalização e sugestão de plataforma
│   └── Seguranca.gs      ← proteção de abas estruturais
└── pessoal/
    └── (mesma estrutura — Setup.gs usa dados genéricos)
```

---

## Isolamento Corp × Pessoal

> ⚠️ Os dois ambientes são **completamente independentes**.
> Nenhum arquivo referencia IDs do outro ambiente.
