# VAST vs VPAID — Guia de Referência

## O que são?

| | VAST | VPAID |
|---|---|---|
| **Nome completo** | Video Ad Serving Template | Video Player Ad-serving Interface Definition |
| **Criado por** | IAB | IAB |
| **Natureza** | Protocolo de entrega de vídeo | Interface executável (código rodando no player) |
| **Formato** | XML | JavaScript / SWF (legado) |

---

## VAST — Video Ad Serving Template

### O que faz
Define como o ad server entrega um vídeo ao player. É um XML que descreve onde está o arquivo de vídeo, os pixels de tracking, os cliques, as durações etc.

### Versões principais

| Versão | Destaques |
|---|---|
| VAST 2.0 | Linear, Non-linear, Companion banners |
| VAST 3.0 | Ad pods, skippable ads, tracking de viewability |
| VAST 4.0 / 4.2 | Suporte nativo a OTT/CTV, muted autoplay, verificação de viewability sem VPAID |

### Estrutura básica do XML

```xml
<VAST version="4.2">
  <Ad id="123">
    <InLine>
      <AdSystem>DSP Name</AdSystem>
      <AdTitle>Meu Anúncio</AdTitle>
      <Impression><![CDATA[https://pixel-de-impressao.com]]></Impression>
      <Creatives>
        <Creative>
          <Linear>
            <Duration>00:00:30</Duration>
            <TrackingEvents>
              <Tracking event="start"><![CDATA[...]]></Tracking>
              <Tracking event="firstQuartile"><![CDATA[...]]></Tracking>
              <Tracking event="midpoint"><![CDATA[...]]></Tracking>
              <Tracking event="thirdQuartile"><![CDATA[...]]></Tracking>
              <Tracking event="complete"><![CDATA[...]]></Tracking>
            </TrackingEvents>
            <MediaFiles>
              <MediaFile type="video/mp4" width="1920" height="1080">
                <![CDATA[https://cdn.video.com/anuncio.mp4]]>
              </MediaFile>
            </MediaFiles>
            <VideoClicks>
              <ClickThrough><![CDATA[https://site-do-anunciante.com]]></ClickThrough>
            </VideoClicks>
          </Linear>
        </Creative>
      </Creatives>
    </InLine>
  </Ad>
</VAST>
```

### Eventos de tracking disponíveis no VAST

- `impression`
- `start`, `firstQuartile`, `midpoint`, `thirdQuartile`, `complete`
- `skip`, `closeLinear`
- `mute`, `unmute`, `pause`, `resume`, `rewind`
- `fullscreen`, `exitFullscreen`
- `acceptInvitationLinear`, `collapse`, `expand`
- `playerCollapse`, `playerExpand`
- `progress` (com offset, ex: `00:00:05`)
- `creativeView`

---

## VPAID — Video Player Ad-serving Interface Definition

### O que faz
Código JavaScript executado dentro do player. Em vez de apenas entregar um vídeo, o VPAID roda uma aplicação interativa com controle total sobre o player durante a exibição do anúncio.

### Como funciona
1. O VAST chama o VPAID (normalmente um `.js`)
2. O player carrega e executa esse JS
3. O JS "assume o controle" do player
4. O anúncio pode coletar dados, exibir overlays, forçar interações etc.

### Versões

| Versão | Destaques |
|---|---|
| VPAID 1.0 | Flash (SWF) — obsoleto |
| VPAID 2.0 | JavaScript — padrão do mercado (em declínio) |

### O que o VPAID permite que VAST não permite
- Interatividade real dentro do vídeo (formulários, gamificação, hotspots)
- Coleta de dados própria do criativo (sem depender do ad server)
- Viewability customizada (script próprio rodando no player)
- Verificação de brand safety pelo próprio anunciante
- Anúncios não-lineares complexos com lógica programada
- Expansão/retração do player controlada pelo criativo

---

## Comparação técnica e operacional

| Critério | VAST | VPAID |
|---|---|---|
| Tipo de arquivo | XML estático | JS executável |
| Execução | Player interpreta e executa | Código roda dentro do player |
| Interatividade | Limitada (só clique e skip) | Alta (qualquer evento JS) |
| Dados coletados | Eventos pré-definidos pelo IAB | Qualquer dado que o JS capturar |
| Viewability | Via pixel externo (IAS, MOAT, DV) | Pode medir internamente |
| Segurança | Alta — só pixels e vídeo | Baixa — código arbitrário no player |
| Performance | Leve e rápido | Pesado, pode causar lentidão |
| Compatibilidade CTV/OTT | Total (VAST 4.x) | Muito limitada / bloqueada |
| Compatibilidade mobile app | Alta | Baixa / problemática |
| Ad blocking | Parcialmente afetado | Muito afetado |
| Ambiente programático | Suportado por todos os DSPs | Suporte variável, muitos bloqueiam |
| Auditabilidade | Fácil (XML legível) | Difícil (código ofuscado) |
| Risco de fraude | Menor | Maior (execução de código) |

---

## Quando usar cada um

### Use VAST quando:
- Campanhas em CTV, OTT, Smart TV
- Inventário mobile in-app
- Ambientes programáticos (DV360, TTD, Amazon DSP)
- O objetivo é escala e reach
- Segurança e confiabilidade são prioritárias
- O player do publisher não suporta VPAID

### Use VPAID quando:
- O criativo exige interatividade avançada (não substituível)
- A campanha roda em web desktop com publishers confiáveis
- Há necessidade de viewability própria sem depender de terceiros
- O publisher garantiu suporte ao VPAID 2.0

---

## A tendência do mercado

O VPAID está em declínio acelerado por três razões:

1. **Segurança** — publishers e SSPs bloquearam VPAID após incidentes de malvertising (código JS malicioso disfarçado de criativo)
2. **CTV/OTT** — VPAID é incompatível com esses ambientes, que são o maior crescimento do vídeo digital
3. **OMID** — o IAB criou o Open Measurement Interface Definition como substituto para medição/viewability sem VPAID

### Substitutos ao VPAID

| Necessidade | Substituto |
|---|---|
| Viewability | OMID (IAS, MOAT, DV integrados via SDK) |
| Interatividade | SIMID (Secure Interactive Media Interface Definition) |
| Tracking avançado | VAST 4.2 com eventos adicionais |
| Rich media em vídeo | HTML5 overlay separado do VPAID |

---

## Resumo

**VAST** = XML que diz onde está o vídeo e o que trackear.  
**VPAID** = código JS que roda dentro do player e controla a experiência ativamente.

---

*Referência interna StormX Data & Tech — out/2026*
