# Decodificador TCF Consent String

Decodifica strings `gdpr_consent=` (TCF v1 e v2) e exibe propósitos de consentimento, vendors autorizados e metadados técnicos.

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/decodificador-tcf/

---

## O que exibe

- **Versão TCF** (v1 ou v2) com alerta se v1 (descontinuado desde 2020)
- **Metadados**: CMP ID, versão, idioma, data de criação/atualização, Publisher CC
- **Propósitos de consentimento** (P1–P10/P11 para v2, P1–P5 para v1): ✅ consentido / ❌ não consentido + distinção entre consentimento explícito e interesse legítimo
- **Recursos Especiais** (v2): geolocalização precisa, device fingerprinting
- **Vendors conhecidos** (50+ principais do mercado): IAS, DoubleVerify, The Trade Desk, Google, Meta Audience Network, Criteo, Amazon, Xandr, etc.
- **Lista de todos os IDs consentidos** na string

---

## Filtros

- Busca por nome ou ID do vendor
- Toggle: Todos / Consentidos / Não consentidos

---

## Exemplos incluídos

- TCF v2 completo (com vendor range encoding)
- TCF v2 mínimo
- TCF v1 (com alerta de depreciação)

---

## Tecnologia

- Decodificação 100% client-side — a string não sai do browser
- Parsing manual dos bits TCF (Base64URL → BitArray → campos)
- HTML + CSS + JS vanilla, zero dependências
