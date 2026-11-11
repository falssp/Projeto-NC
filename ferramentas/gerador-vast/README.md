# Gerador de VAST Tag

Gera XML VAST 2.0/3.0 completo com tracking de Floodlight (CM360) para todos os eventos de vídeo, pronto para colar no ad server.

**URL:** https://falssp.github.io/Projeto-NC/ferramentas/gerador-vast/

---

## Modos

### Inline Ad
Gera um VAST completo com `<InLine>` — inclui `<MediaFile>` com a URL do vídeo, duração, click-through e click tracker.

### Wrapper
Gera um VAST `<Wrapper>` que envolve outro VAST externo (ex: tag do veículo), adicionando os Floodlight tracking URLs por cima.

---

## Eventos suportados

| Evento | Padrão | Descrição |
|--------|--------|-----------|
| Impression | ✅ | Impressão do ad (via `<Impression>`) |
| start | ✅ | Início da reprodução |
| firstQuartile | ✅ | 25% assistido |
| midpoint | ✅ | 50% assistido |
| thirdQuartile | ✅ | 75% assistido |
| complete | ✅ | 100% assistido |
| mute | — | Vídeo mutado |
| unmute | — | Som restaurado |
| pause | — | Vídeo pausado |
| resume | — | Reprodução retomada |
| skip | — | Skip pressionado |
| fullscreen | — | Modo fullscreen ativado |

Os 6 eventos marcados por padrão são o mínimo recomendado para relatórios de Floodlight em vídeo.

---

## Parâmetros gerados automaticamente

Cada URL de tracking inclui os parâmetros de privacidade vazios:
```
dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=;gdpr_consent=
```

---

## Tecnologia

- HTML + CSS + JS vanilla — zero dependências
- Google Fonts (Space Grotesk + JetBrains Mono)
- Geração em tempo real ao digitar
- Suporte a VAST 2.0 e 3.0
