# ✅ Checklist de Implementação de Tag

**AdOps Suite — NC Tools**
URL: https://falssp.github.io/Projeto-NC/ferramentas/checklist-tag-impl/

---

## O que é

Checklist interativo de verificação pré-campanha para garantir que todos os pixels e tags de rastreamento estão implementados corretamente antes do lançamento de uma campanha de mídia digital.

## Plataformas cobertas

| Plataforma | Itens | Foco |
|------------|-------|------|
| CM360 / Floodlight | 16 | Activity setup, src/type/cat, macros GDPR |
| Meta Pixel | 14 | Código base, eventos, Pixel Helper, CAPI |
| Google / GTM | 14 | GTM container, Google Ads conversion, GA4 |
| TikTok Pixel | 6 | Pixel ID, eventos, Events Manager |
| LinkedIn Insight Tag | 5 | Insight Tag, domínio verificado |
| Verificação Final | 10 | Produção, mobile, Network Inspector, pré-launch |

**Total: 65 itens de verificação**

## Funcionalidades

- **6 abas de plataforma** com seções organizadas por etapa (pré-requisitos, implementação, verificação)
- **3 níveis de prioridade**: 🔴 Crítico, 🟡 Importante, ⚪ Extra
- **"Como verificar"** expandível por item com instruções práticas passo a passo
- **Campo de notas** por item para registrar observações
- **Progresso em tempo real** — barra geral + contador por aba
- **Múltiplas verificações** — até 5 campanhas salvas simultaneamente via localStorage
- **Ambiente**: toggle Homologação / Produção
- **Relatório de verificação** — copia resumo completo para o clipboard
- **Export PDF** via print do navegador
- **Layout full-screen** responsivo

## Como usar

### 1. Criar/selecionar verificação
No topo, selecione uma verificação existente ou clique em **+ Nova** para iniciar. Preencha nome da campanha, responsável e data.

### 2. Navegar pelas abas
Cada aba corresponde a uma plataforma de rastreamento. Os contadores mostram progresso em tempo real (ex: `12/16`).

### 3. Verificar item a item
- Clique no item ou no checkbox para marcar como verificado ✓
- Clique em **▼ Como verificar** para expandir a instrução detalhada
- Use o campo de notas para observações específicas (ex: "ID: 1234567")

### 4. Registrar ambiente
Use o badge no cabeçalho para indicar se a verificação é em **Homologação** ou **Produção**.

### 5. Exportar relatório
- **📋 Copiar relatório** — copia resumo completo com todos os itens para o clipboard
- **🖨️ Exportar PDF** — abre o diálogo de impressão do navegador (salvar como PDF)

## Prioridades

| Badge | Significado |
|-------|------------|
| 🔴 Crítico | Sem isso, a tag não funciona ou conversões não são registradas |
| 🟡 Importante | Pode causar dados incorretos ou problemas de qualidade |
| ⚪ Extra | Boas práticas, opcionais mas recomendados |

## Dicas de uso

- **Teste sempre em produção** — não só em staging ou localhost
- **Modo anônimo** — desativa extensões que bloqueiam pixels (AdBlock, uBlock)
- **Network Inspector** — Chrome DevTools → Network → filtre pelo domínio do pixel
- **CM360**: filtrar por "ddm/activity" | **Meta**: filtrar por "facebook.com/tr" | **Google**: filtrar por "googleadservices"
- Use junto com o **Auditor VAST** e **Tag Inspector** do portal para cobertura completa

## Armazenamento

Todos os dados são salvos localmente via **localStorage** do navegador. Nenhuma informação é enviada para servidores externos. Dados persistem ao fechar e reabrir o navegador na mesma máquina.

---

*Parte do projeto [NC Tools — AdOps Suite](https://falssp.github.io/Projeto-NC/ferramentas/)*
*Desenvolvido para profissionais de AdOps, trafficking e operações de mídia digital.*
