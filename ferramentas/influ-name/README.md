# Influencer Name · NC Tools

> 🔗 **[Abrir ferramenta](https://falssp.github.io/Projeto-NC/ferramentas/influ-name/)**

Ferramenta HTML standalone para buscar o nome e seguidores de perfis de influencers e calcular os campos do Dicionário: Nome Padrão, Influencer Name, Rede, Handle e Seguidores.

Funciona offline (sem Cloud Run) para extração de handle e cálculo de campos. Para busca automática de nome e seguidores em TikTok, Instagram e YouTube, requer a URL de um servidor Cloud Run configurado.

---

## Arquivos

```
ferramentas/influ-name/
├── index.html   ← Ferramenta completa (HTML + CSS + JS em arquivo único)
└── README.md
```

---

## Configuração

Cole a URL do servidor Cloud Run no campo de configuração exibido no topo da ferramenta. A URL é salva no `localStorage` do browser.

Sem Cloud Run: apenas o handle é extraído da URL — nome e seguidores devem ser preenchidos manualmente.

---

## Como usar

1. **Entrada** — cole os links de perfil (um ou vários; aceita paste com múltiplas linhas)
2. **Buscar todos** — a ferramenta processa os links da fila, um a um:
   - Redes suportadas para scraping (com Cloud Run): **TikTok, Instagram, YouTube**
   - Redes com extração de handle apenas: **Pinterest, Twitch** e outras
   - Redes bloqueadas (handle extraído, sem scraping): **X, Facebook, LinkedIn, Snapchat**
3. **Editar** — campos A (nome) e G (seguidores) são editáveis inline; B e C recalculam automaticamente
4. **Copiar** — informe a linha de início na planilha e copie A–H ou só G–H

---

## Funcionalidades

| Funcionalidade | Detalhe |
|---|---|
| Input múltiplo | Cole vários links de uma vez (vírgula, ponto e vírgula ou quebra de linha) |
| Detecção de rede | Identifica TikTok, Instagram, YouTube, Facebook, X, Pinterest, LinkedIn, Snapchat, Twitch |
| Cloud Run | Busca nome e seguidores via endpoint `/fetch-profile` (POST JSON `{url}`) |
| Fallback CORS proxy | Tenta buscar HTML via proxy público quando Cloud Run não está configurado |
| Cálculo automático | B (Nome Padrão), C (Influencer Name), E (Perfil), F (Handle Puro) calculados por fórmula |
| Tabela editável | A (nome) e G (seguidores) editáveis inline; B/C atualizam automaticamente |
| Status por linha | OK (com seguidores), Sem seg., Bloqueado, Erro |
| Copiar A–H | TSV completo para colar no Dicionário |
| Copiar G–H | Só seguidores + URL (para atualizar colunas específicas) |
| Stop mid-run | Botão para interromper o processamento |

---

## Campos calculados

| Coluna | Campo | Fórmula |
|---|---|---|
| A | Nome do influencer | Buscado via Cloud Run / scraping, ou preenchido manualmente |
| B | Nome Padrão | `PROPER(A)` com espaços → `_`, sem `_` no final |
| C | Influencer Name | `LOWER(A)` sem acentos, pontuação e espaços |
| D | Rede social | Detectada pelo domínio da URL (H) |
| E | Perfil (handle) | Extraído da URL por rede |
| F | Handle Puro | `E` sem caracteres especiais (`[^A-Za-z0-9]`) |
| G | Seguidores | Buscado via Cloud Run / scraping, ou preenchido manualmente |
| H | URL do perfil | Fornecido pelo usuário |

---

## Stack

- HTML + CSS + JS vanilla (sem frameworks, sem dependências externas)
- Cloud Run opcional — endpoint `POST /fetch-profile` com body `{url}`
- Fallback: `api.allorigins.win` e `corsproxy.io` para scraping de HTML público

---

## Também disponível no F4

Esta ferramenta existe de forma integrada no **F4 Acessórios** (módulo "Influencer Name"). A versão standalone aqui é idêntica em funcionalidade.
