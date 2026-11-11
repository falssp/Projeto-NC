# Dicionário de Dados — F5 FT Flashtalking Validator | NC Tool
> Versão 2.0 · NC Tool | Unilever BR × Grasp × StormX

---

## Abas da planilha

### CONSOLIDADO

| Campo | Tipo | Descrição |
|---|---|---|
| ID | String | Identificador único gerado automaticamente (ex: `VID-0001`) |
| Timestamp | ISO 8601 | Data e hora da validação |
| Usuário | String | Nome do usuário (via aba EQUIPE) ou e-mail |
| Arquivo | String | Nome do arquivo validado |
| Status | Enum | `APROVADO` · `AVISO` · `REPROVADO` |
| Erros | Inteiro | Quantidade de critérios obrigatórios reprovados |
| Avisos | Inteiro | Quantidade de campos opcionais com alerta |
| Tipo | Enum | `AUDIO` · `DISPLAY` · `VIDEO` |
| Detalhes | JSON | Objeto com todos os dados da validação |
| Observações | String | Campo livre preenchido pelo usuário |

### AUDIO

| Campo | Tipo | Descrição |
|---|---|---|
| ID | String | `AUD-XXXX` |
| Timestamp | ISO 8601 | Data e hora da validação |
| Usuário | String | Nome ou e-mail |
| Arquivo | String | Nome do arquivo |
| Status | Enum | `APROVADO` · `AVISO` · `REPROVADO` |
| Erros | Inteiro | — |
| Avisos | Inteiro | — |
| Formato | String | MP3, OGG, M4A, AAC |
| Tamanho (MB) | Decimal | Tamanho do arquivo |
| Duração (s) | Inteiro | Duração em segundos |
| Bitrate (Kbps) | Inteiro | Taxa de bits — mínimo 192 Kbps |
| Sample Rate (kHz) | Decimal | Taxa de amostragem — mínimo 44.1 kHz |
| LUFS | Decimal | Loudness — alvo -16 ±1.5 |
| TPL (dB) | Decimal | True Peak Level — máximo -2.0 dB |
| VAST | String | VAST 2.0 · VAST 4.1 · Outro |
| Observações | String | Campo livre |

### DISPLAY

| Campo | Tipo | Descrição |
|---|---|---|
| ID | String | `DSP-XXXX` |
| Timestamp | ISO 8601 | — |
| Usuário | String | — |
| Arquivo | String | — |
| Status | Enum | — |
| Erros | Inteiro | — |
| Avisos | Inteiro | — |
| Nome HTML | String | Nome do arquivo principal |
| Tamanho (MB) | Decimal | Tamanho total do pacote |
| Largura × Altura | String | ex: `300×600` |
| manifest.js | Enum | `sim` · `nao` · `nao-sei` |
| ClickTagCount | Inteiro | Número de click tags |
| Variáveis | Inteiro | Variáveis dinâmicas — máximo 50 |
| Tipo de Ad | Enum | `standard` · `rich` |
| Observações | String | Campo livre |

### VIDEO

| Campo | Tipo | Descrição |
|---|---|---|
| ID | String | `VID-XXXX` |
| Timestamp | ISO 8601 | — |
| Usuário | String | — |
| Arquivo | String | — |
| Status | Enum | — |
| Erros | Inteiro | — |
| Avisos | Inteiro | — |
| Formato | String | MOV, MP4, MPEG, MPG, AVI, WMV |
| Tamanho (MB) | Decimal | — |
| Duração (s) | Inteiro | — |
| Aspect Ratio | Enum | `16:9` · `4:3` · `Outro` |
| Codec | Enum | `H264` · `MPEG4` · `WMV` · `Outro` |
| Bitrate | Decimal | kbps (Display) ou Mbps (VAST) |
| Subtipo | Enum | `display` · `vast` |
| Observações | String | Campo livre |

### EXCECOES

| Campo | Tipo | Descrição |
|---|---|---|
| Timestamp | ISO 8601 | Data e hora da solicitação |
| Tipo | String | Tipo do criativo (audio/display/video) |
| Justificativa | String | Motivo + remetente + data do e-mail |
| Status | Enum | `pendente` · `aprovada` · `rejeitada` |
| Usuário | String | Quem solicitou |
| Dados | JSON | Dados completos da validação |

### EQUIPE

| Campo | Tipo | Descrição |
|---|---|---|
| Nome | String | Nome de exibição do usuário |
| Perfil | Enum | `Admin` · `Gerente` · `Operador` |
| Email | String | E-mail Google para identificação |

---

## Status de validação

| Status | Condição |
|---|---|
| `APROVADO` | Nenhum erro em critérios obrigatórios |
| `AVISO` | Nenhum erro obrigatório, mas há alertas em opcionais |
| `REPROVADO` | Um ou mais erros em critérios obrigatórios |

---

## Tipos de check

| Tipo | Símbolo | Descrição |
|---|---|---|
| `ok` | ✅ | Critério atendido |
| `err` | ❌ | Critério não atendido — conta como erro |
| `warn` | ⚠️ | Campo opcional com valor fora do esperado |
| `skip` | — | Campo opcional não informado — ignorado |

---

## Extensões aceitas por tipo

| Tipo | Extensões |
|---|---|
| Audio | MP3, OGG, M4A, AAC, WAV, FLAC, WMA, AIFF |
| Display | ZIP, HTML, HTM, JPG, JPEG, PNG, GIF, WEBP, SVG |
| Video | MOV, MP4, MPEG, MPG, AVI, WMV, MKV, FLV, WEBM, M4V |

> As extensões aceitas para **validação** são um subconjunto mais restrito. As extensões acima são usadas apenas para **detecção de aba errada**.
