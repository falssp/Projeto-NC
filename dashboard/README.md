# Dashboard · NC Tool Unilever BR

Dashboard centralizado de monitoramento das ferramentas NC Tool.
Exibe status em tempo real de F1, F2, F3, F4 e F5 — Corp e Pessoal.

---

## Links

| Recurso | URL |
|---------|-----|
| **GitHub Pages** | https://falssp.github.io/Projeto-NC/dashboard/ |

---

## Arquivos

| Arquivo | Descrição |
|---------|-----------|
| `index.html` | Dashboard — status de todas as ferramentas |

---

## Ferramentas monitoradas

| Módulo | Endpoint verificado |
|--------|-------------------|
| F2 Corp | ping → `env: corp` |
| F2 Pessoal | ping → `env: pes` |
| F3 Corp | `?action=ping` |
| F3 Pessoal | `?action=ping` |
| F4 Corp | `?action=ping` |
| F4 Pessoal | `?action=ping` |
| F5 Corp | GAS Web App |
| F5 Pessoal | GAS Web App |
