# 🔧 Documentação Técnica — F5 FT Flashtalking Validator | NC Tool
> Versão 2.0 · Referência para desenvolvimento e manutenção

---

## Visão Geral

| Item | Valor |
|---|---|
| Planilha Corp | `1Y7_1NL7Uo9HgHn7bTIqnnVZhJCogCbXI3tgasxOTN_0` |
| Planilha Pessoal | `1YZ3tFDlt3yP5xtNVpSMhyS-cxG3QHBlN5nr_z-yJi2s` |
| Web App Corp | https://script.google.com/macros/s/AKfycbwKsOut5TyYLf1pW_xm1He-zBvzZGYFM4KAEE5C6hssNZHsg9fL_QBXWjfF-zzIDxfXNQ/exec |
| Web App Pessoal | https://script.google.com/macros/s/AKfycbym0772425DQEUrNQn9TZc6C-wdRuqU1_erQVSoWzV-MEBbyCN4DOfJkaSd90cdVZHjSA/exec |
| GitHub Pages Corp | https://falssp.github.io/nc-tool/f5-corp/ |
| GitHub Pages Pessoal | https://falssp.github.io/nc-tool/f5-pessoal/ |
| Admin Corp | `felipe.lima@stormx.com.br` |
| Admin Pessoal | `falssp@gmail.com` |

---

## Arquitetura

```
GitHub Pages (nc-tool)          GAS Web App
  f5-corp/index.html    ──POST──►  doPost() → saveLog()
  f5-pessoal/index.html ──GET───►  doGet()  → loadHist()
                                             loadUserPerfil()
                                             loadExcecoes()
                                    ▼
                              Google Sheets
                          DASH · CONSOLIDADO · AUDIO
                          DISPLAY · VIDEO · EXCECOES
```

GAS e GitHub Pages alimentam a **mesma planilha** via mesmo `BACKEND_URL`. Os dois ambientes são completamente isolados entre si.

---

## Arquivos

| Arquivo | Ambiente | Descrição |
|---|---|---|
| `Code.gs` | Corp / Pessoal | Script GAS — backend, menus, dashboard |
| `index.html` | Corp / Pessoal | Interface online — BACKEND_URL ativo |
| `F5_Flashtalking.html` | Corp / Pessoal | Interface offline — sem backend |

---

## Code.gs — Funções principais

| Função | Descrição |
|---|---|
| `doGet(e)` | Serve o HTML ou responde `loadHist`, `loadUserPerfil`, `loadExcecoes` |
| `doPost(e)` | Recebe `saveLog` e `saveExcecao` |
| `saveLog(payload)` | Grava na aba específica (AUDIO/DISPLAY/VIDEO) + CONSOLIDADO, aplica zebra, colorStatus, autoResize |
| `loadHist(e)` | Retorna logs do CONSOLIDADO |
| `loadUserPerfil()` | Retorna email, nome e perfil do usuário via Session |
| `loadExcecoes()` | Retorna lista de exceções da aba EXCECOES |
| `saveExcecao(payload)` | Grava exceção + notifica admins por e-mail |
| `onOpen()` | Cria menus FT Validator, Limpar, Admin; chama `_garantirAbas` |
| `_garantirAbas(ss)` | Cria abas faltantes; reconstrói Dashboard só se criou alguma aba nova |
| `abrirValidador()` | Abre dialog modeless com link fixo para o Web App |
| `limparTudo()` | Apaga dados de todas as abas de log + reconstrói Dashboard |
| `_inicializarDash(aba)` | Reconstrói aba DASH com fórmulas e formatação |
| `gerarId(ss, tipo)` | Gera ID sequencial por tipo (VID-0001, DSP-0001, AUD-0001) |

---

## HTML — Funções principais

| Função | Descrição |
|---|---|
| `init()` | Carrega perfil, exceções; atualiza status na sidebar |
| `goTo(id, title, btn)` | Navega entre páginas; limpa aba anterior; carrega histórico se `hist` |
| `applyFile(file, tipo)` | Detecta aba errada; chama `applyVideo/Display/Audio` |
| `_detectarAbaErrada(ext, tipo)` | Compara extensão contra `TIPOS_EXT`; retorna aba correta ou null |
| `_abrirBulletAbaErrada(...)` | Cria overlay dinâmico com opção de mover e validar automaticamente |
| `applyVideo/Display/Audio` | Auto-fill de campos via metadados do arquivo |
| `validarVideo/Display/Audio` | Executa checklist de specs; chama `renderRes` |
| `renderRes(id, checks, tipo, dados)` | Renderiza resultado ordenado + info de cópia + botão exceção |
| `loadHistMain()` | Carrega histórico do backend e renderiza no panel-hist |
| `saveLog(tipo, checks, dados)` | POST para BACKEND_URL com dados da validação |
| `abrirModalExcF3(tipo, dados)` | Abre modal de exceção padrão F3 |
| `parseEmailHeaderExc()` | Extrai data, hora, remetente e assunto de cabeçalho colado |
| `enviarExcecaoF3()` | Valida campos e POST para BACKEND_URL |

---

## Abas da planilha

| Aba | Colunas | Descrição |
|---|---|---|
| DASH | A:B | Dashboard com totais por tipo e status |
| CONSOLIDADO | ID, Timestamp, Usuário, Arquivo, Status, Erros, Avisos, Tipo, Detalhes, Observações | Log unificado de todas as validações |
| AUDIO | ID, Timestamp, Usuário, Arquivo, Status, Erros, Avisos, Formato, Tamanho (MB), Duração (s), Bitrate (Kbps), Sample Rate (kHz), LUFS, TPL (dB), VAST, Observações | Log de validações de áudio |
| DISPLAY | ID, Timestamp, Usuário, Arquivo, Status, Erros, Avisos, Nome HTML, Tamanho (MB), Largura × Altura, manifest.js, ClickTagCount, Variáveis, Tipo de Ad, Observações | Log de validações de display |
| VIDEO | ID, Timestamp, Usuário, Arquivo, Status, Erros, Avisos, Formato, Tamanho (MB), Duração (s), Aspect Ratio, Codec, Bitrate, Subtipo, Observações | Log de validações de vídeo |
| EXCECOES | Timestamp, Tipo, Justificativa, Status, Usuário, Dados | Solicitações de exceção |
| EQUIPE | Nome, Perfil, Email | Cadastro de usuários para identificação |

---

## Variáveis de ambiente no HTML

| Variável | Descrição |
|---|---|
| `BACKEND_URL` | URL do Web App GAS — única diferença entre ON e OFF |
| `LOG_SHEET` | `'LOG_FLASHTALKING'` — nome da aba de log (legado, não usado no backend atual) |
| `TIPOS_EXT` | Mapa de extensões por tipo para detecção de aba errada |

---

## Padrão de entrega

| Variante | BACKEND_URL | Badge |
|---|---|---|
| Corp ON (`index.html`) | URL Web App Corp | `F5 - Validator` |
| Corp OFF (`F5_Flashtalking.html`) | `YOUR_APPS_SCRIPT_WEB_APP_URL` | `F5 - Validator` |
| Pessoal ON (`index.html`) | URL Web App Pessoal | `F5 - Validator · Backup` |
| Pessoal OFF (`F5_Flashtalking.html`) | `YOUR_APPS_SCRIPT_WEB_APP_URL` | `F5 - Validator · Backup` |

---

## Histórico de versões

| Versão | O que mudou |
|---|---|
| 1.0 | Lançamento — validação Audio, Display, Video |
| 1.1 | Bullet de aba errada + auto-redirecionamento + cor vermelha na aba errada |
| 1.2 | Histórico como página na sidebar + fix div extra fora do `#main` |
| 1.3 | Backend ativo — log na planilha, dashboard, exceções, BACKEND_URL configurado |
| 2.0 | `autoResizeColumns` no `saveLog` · `limparTudo` reconstrói dashboard · `abrirValidador` com URL fixa · `_garantirAbas` sem recriar dashboard no `onOpen` · GitHub Pages em `nc-tool` |
