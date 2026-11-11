# F4 — Acessórios · NC Tool Unilever BR

Suite de ferramentas de apoio ao processo de naming conventions.

---

## Links por ambiente

### Corp (felipe.lima@stormx.com.br)

| Recurso | URL |
|---------|-----|
| **GitHub Pages** | https://falssp.github.io/nc-tool/f4-corp/ |
| **GAS Web App** | https://script.google.com/a/macros/stormx.com.br/s/AKfycbxiWW0zVuFdRJCvzwCBeH8OIqsFJyKkhqZotgHX8vrD0UARbU3SUtJ7IxZsg2BXc_QrPw/exec |
| **Planilha principal** | https://docs.google.com/spreadsheets/d/1K3wO3b8BOOQldtHv7pBtOubmhoidoZBI0Y8yk4_UnmI |
| **Planilha do chefe** | https://docs.google.com/spreadsheets/d/1qHDQx4rBJrb1bNrOIr_b_R_4qMND72ZsnyPWUSLoLkc |
| **Ping** | https://script.google.com/a/macros/stormx.com.br/s/AKfycbxiWW0zVuFdRJCvzwCBeH8OIqsFJyKkhqZotgHX8vrD0UARbU3SUtJ7IxZsg2BXc_QrPw/exec?action=ping |
| **Stats** | https://script.google.com/a/macros/stormx.com.br/s/AKfycbxiWW0zVuFdRJCvzwCBeH8OIqsFJyKkhqZotgHX8vrD0UARbU3SUtJ7IxZsg2BXc_QrPw/exec?action=stats |

### Pessoal (falssp@gmail.com)

| Recurso | URL |
|---------|-----|
| **GitHub Pages** | https://falssp.github.io/nc-tool/f4-pessoal/ |
| **GAS Web App** | https://script.google.com/macros/s/AKfycby6h6qvXqacFrf2TmcXYaflRQp7rvhklpnR27VWhIueh9pLxWvUCRYkFToJPxYezUN7cw/exec |
| **Planilha principal** | https://docs.google.com/spreadsheets/d/16OdPmc-SeqXn1VefT0xRsIQJ-LdICRfUZnahsARuw4w |
| **Planilha do chefe** | https://docs.google.com/spreadsheets/d/17reFaVIatWRvNa-KpnLPsFUEV8WnxrNC2fsEHO5lU6s |
| **Ping** | https://script.google.com/macros/s/AKfycby6h6qvXqacFrf2TmcXYaflRQp7rvhklpnR27VWhIueh9pLxWvUCRYkFToJPxYezUN7cw/exec?action=ping |
| **Stats** | https://script.google.com/macros/s/AKfycby6h6qvXqacFrf2TmcXYaflRQp7rvhklpnR27VWhIueh9pLxWvUCRYkFToJPxYezUN7cw/exec?action=stats |

---

## Módulos

| Módulo | Descrição |
|--------|-----------|
| Gerador de IDs | Cria linhas e IDs SX/AMZ nas planilhas em uma operação |
| Ad Name Sync | Compara Ad Names entre Excel e Google Sheets pelo Placement ID |
| Campaign Local | Lê as 6 abas do ADP e gera linhas para a planilha Campaign Local |
| Mapeador RM → ADP | Mapeia estrutura do RM para o ADP |
| Merge RM → ADP | Faz o merge entre RM e ADP |
| Dicionário de Influs | Gestão do dicionário de influencers |
| Extrator de Influencer | Extrai dados de influencers do ADP |
| Influencer Name Tool | Ferramenta de naming para influencers |
| Extrator de Fórmulas | Extrai fórmulas da planilha |
| Comparador | Compara estruturas de campanhas |
| Contador ADP | Conta linhas no ADP |
| Removedor de Caracteres | Remove caracteres especiais de strings |

---

## Arquivos no repo

```
F4-Acessorios/
├── corp/
│   ├── Code.gs            # Backend GAS
│   ├── index.html         # Frontend ON (sem DOCTYPE)
│   ├── F4_acessorios.html # Frontend OFF (com DOCTYPE)
│   ├── appsscript.json    # Manifest GAS
│   ├── .clasp.json        # scriptId Corp
│   └── .claspignore
└── pessoal/
    ├── Code.gs
    ├── index.html
    ├── F4_acessorios.html
    ├── appsscript.json
    ├── .clasp.json        # scriptId Pessoal
    └── .claspignore
```

---

## Endpoints da API

| Endpoint | Autenticação | Resposta |
|----------|-------------|---------|
| `?action=ping` | Nenhuma | `{ ok, fase, env, ts }` |
| `?action=stats` | Nenhuma | `{ ok, ultimaOperacao, totalMes, totalOperacoes }` |
| `?action=contadores` | Token opcional | `{ ok, contadores }` |
| `?action=list` | Token opcional | Links da planilha |
| POST (todos) | Token opcional | Depende da action |

Token via `?token=NC_TOKEN` — obrigatório só se vier errado.

---

## Keep Alive

Trigger instalado: `setupKeepAliveTrigger()` — roda a cada 30 minutos.
Mantém o script aquecido para evitar timeout na primeira chamada.
