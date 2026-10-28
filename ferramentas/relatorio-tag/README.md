# Relatório de Tag

Cadastre as tags de uma campanha, defina status de cada uma e exporte um relatório HTML pronto para enviar ao cliente ou ao veículo.

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/relatorio-tag/

---

## Funcionalidades

- Cadastro de múltiplas tags com: nome, tipo, plataforma, ambiente, necessidade de tracker e status
- **Detecção automática** de tipo ao colar qualquer tag (Floodlight, VAST, Click Tracker, gtag.js, IAS, DV, MOAT, Meta Pixel)
- Relatório com resumo executivo (total, validadas, pendentes, com problema, que precisam de tracker)
- Destaque visual para tags com problema e ambientes que exigem Impression Tracker
- **Exportação** via Imprimir/Salvar PDF (print CSS) ou copiar HTML

---

## Tipos de tag suportados

Floodlight Counter, Floodlight Sales, Click Tracker CM360, VAST Tracking, gtag.js, IAS, DoubleVerify, MOAT, Meta Pixel, Impression Tracker, Outro.

---

## Status de tag

| Status | Significado |
|--------|-------------|
| ⏳ Pendente | Ainda não validada |
| ✅ Validada | Testada e aprovada |
| ⚠️ Problema | Erro identificado |
| 📤 Enviada | Entregue ao veículo |
| 🟢 Ao vivo | Campanha rodando |

---

## Tecnologia

- HTML + CSS + JS vanilla — zero dependências
- Dados em memória (sessão) — nada é enviado ao servidor
- Print CSS para saída em PDF limpa
