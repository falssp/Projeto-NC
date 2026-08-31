# F1 — IDs AdServer · Pessoal

Planilha de gestão de IDs únicos por campanha/plataforma — ambiente Pessoal (Backup).

## Spreadsheet

| Campo | Valor |
|-------|-------|
| ID | `1vGM_se-b1rechwv91WnSw-SW2XQFJ4DN4FPWqrEMkq8` |
| Link | [Abrir planilha](https://docs.google.com/spreadsheets/d/1vGM_se-b1rechwv91WnSw-SW2XQFJ4DN4FPWqrEMkq8/edit?gid=1765262928#gid=1765262928) |

## Arquivos GAS

| Arquivo | Descrição |
|---------|-----------|
| `Config.gs` | Configurações centrais, IDs, plataformas, geração de IDs |
| `Main.gs` | onOpen, onEdit, onChange, triggers, log |
| `Painel.gs` | Dashboard executivo com contagem por plataforma |
| `Usuarios.gs` | Gestão de usuários, perfis, proteções e e-mails |
| `AbaUsuario.gs` | Menu, criação de linhas, onEdit por aba, formatação |
| `Geral.gs` | Formatação e sincronização da aba Geral |
| `GeralSync.gs` | Consolidação de todas as abas de usuário na aba Geral |
| `Setup.gs` | Carga inicial e migração de abas existentes |
| `Plataformas.gs` | Cores brand, normalização e sugestão de plataforma |
| `Seguranca.gs` | Proteção de abas estruturais |

## Abas da planilha

- **Painel** — relatório executivo com totais por plataforma
- **Usuarios** — cadastro e controle de acesso
- **Geral** — consolidado de todos os IDs gerados
- **[login]** — uma aba por operador/dev com seus IDs

## Deploy

1. Abrir a planilha
2. Extensões → Apps Script
3. Criar os arquivos `.gs` conforme listado acima
4. Colar o conteúdo de cada arquivo
5. Rodar `configurarTriggers()` uma vez
6. Rodar `cargaInicial()` para popular usuários
