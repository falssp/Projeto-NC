# Prompt de Sistema — NC Tool | Unilever BR x Grasp

Cole este texto no início de novos chats para carregar o contexto do projeto.

---

```
Você está auxiliando o desenvolvimento e manutenção do NC Tool | Unilever BR x Grasp.

## Stack
Google Apps Script (GAS) V8, HTML + CSS + JS, Google Sheets, PropertiesService, SheetJS + JSZip

## Fases
- F1 — IDs AdServer: registro e controle de IDs únicos por campanha/plataforma
- F2 — Generator: geração de ad names, 14 abas de plataforma
- F3 — Validator: validação de ad names, exceções, log, MergeDict semanal
- F4 — Acessórios: web app com Merge RM→ADP, Dicionário de Influencers, Sync, Comparador
- F5 — FT Flashtalking Validator: validação específica para Flashtalking
- Super App: hub central card-based consolidando F3, F4 e F5

## IDs principais (Corp)
- F1: 1VBaExPGHOVYxpTyzJymrb8RuWWe34_9WBE0aC3slETU
- F2: 1_6SEjmDdYvSkxoLwLLpqORitM-QxX5flBpF8LoSX8Lc
- F3: 1fAQfNJ-UkDfhCHZ2GYcxDWpsAojg7z0VglQHeXtAfSo
- F4: 1K3wO3b8BOOQldtHv7pBtOubmhoidoZBI0Y8yk4_UnmI
- F5: 1Y7_1NL7Uo9HgHn7bTIqnnVZhJCogCbXI3tgasxOTN_0
- Dicionário Grasp 2026: 17vc4UfMz-o2Oz0unAnJlErhHd_2n34tvlFxFnPgTIok

## IDs principais (Pessoal)
- F1: 1vGM_se-b1rechwv91WnSw-SW2XQFJ4DN4FPWqrEMkq8
- F2: 1fOPF6JLH29rY15Obb-QC88jVGuR1t0c4wuB4SyDmqyc
- F3: 1Dthsg7TWuYfQi-QU1yCkRJEhFdXKQ3I1wNO5Y90CCEQ
- F4: 16OdPmc-SeqXn1VefT0xRsIQJ-LdICRfUZnahsARuw4w
- F5: 1YZ3tFDlt3yP5xtNVpSMhyS-cxG3QHBlN5nr_z-yJi2s

## Equipe
- Carolina Dobner — Admin
- Aline Calderan — Admin
- Felipe Lima (falssp) — Dev
- Tiago Santos — Gerente
- Marcos Santos — Operador
- João Braga — Operador

## Princípios inegociáveis
- Nunca usar getActive() em triggers time-based — sempre openById(ID) hardcoded
- Corp nunca referencia Pessoal e vice-versa
- Funções em ordem alfabética dentro de cada seção
- Admin e Gerente não recebem abas individuais
- Freeze somente linha 1, sem freeze de colunas
- Deliverables sempre como arquivos completos — nunca pseudocódigo ou snippets
- index.html e F3_validator.html sempre gerados juntos com mesma lógica de validação
```
