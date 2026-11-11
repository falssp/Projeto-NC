# Manual do Usuário — F5 FT Flashtalking Validator | NC Tool
> Versão 2.0 · NC Tool | Unilever BR × Grasp × StormX

---

## Como acessar

### Via planilha (GAS)
1. Abra a planilha F5 (Corp ou Pessoal)
2. No menu **🎯 FT Validator**, clique em **🌐 Abrir Validador**
3. Clique no botão "Abrir Validador" no dialog que aparecer

### Via GitHub Pages
- Corp: https://falssp.github.io/nc-tool/f5-corp/
- Pessoal: https://falssp.github.io/nc-tool/f5-pessoal/

---

## Tipos de criativo

O validador suporta três tipos, acessíveis pela sidebar:

| Tipo | Ícone | Formatos aceitos |
|---|---|---|
| Audio | 🎵 | MP3, OGG, M4A, AAC |
| Display | 🖥️ | ZIP, HTML, JPG, PNG, GIF, SVG |
| Video | 🎬 | MOV, MP4, MPEG, MPG, AVI, WMV |

---

## Como validar

1. Selecione o tipo de criativo na sidebar (Audio, Display ou Video)
2. Arraste o arquivo para a zona de upload ou clique para selecionar
3. Os campos são preenchidos automaticamente via metadados do arquivo
4. Preencha os campos opcionais se quiser validação completa
5. Clique em **🔍 Validar**

> 💡 Se carregar um arquivo na aba errada (ex: MP4 na aba Audio), o sistema detecta e oferece mover para a aba correta automaticamente.

---

## Resultado da validação

| Status | Significado |
|---|---|
| ✅ Aprovado | Todos os critérios obrigatórios atendidos |
| ⚠️ Aprovado com aviso | Critérios obrigatórios ok, mas há alertas em campos opcionais |
| ❌ Reprovado | Um ou mais critérios obrigatórios não atendidos |

Os resultados são divididos em duas seções:
- **Obrigatórios** — itens ok aparecem primeiro, erros por último
- **Opcionais** — ordenados alfabeticamente; com valor antes de vazios

---

## Specs validadas

### Audio
| Campo | Regra |
|---|---|
| Formato | MP3, OGG, M4A, AAC |
| Tamanho | ≤ 100 MB |
| Duração | ≥ 1s |
| Bitrate | ≥ 192 Kbps (opcional) |
| Sample Rate | ≥ 44.1 kHz (opcional) |
| Loudness | -16 LUFS ±1.5 (opcional) |
| TPL | ≤ -2.0 dB (opcional) |
| VAST | 2.0 ou 4.1 (opcional) |

### Display
| Campo | Regra |
|---|---|
| Formato | ZIP, HTML, JPG, PNG, GIF, SVG |
| Tamanho total | ≤ 500 MB |
| Standard Ad | ≤ 300 KB (se selecionado) |
| Largura / Altura | Obrigatório |
| manifest.js | Obrigatório |
| ClickTagCount | Obrigatório |
| Variáveis dinâmicas | ≤ 50 (opcional) |

### Video
| Campo | Regra |
|---|---|
| Formato | MOV, MP4, MPEG, MPG, AVI, WMV |
| Tamanho | ≤ 15 MB |
| Duração | ≤ 900s |
| Aspect Ratio | 16:9 ou 4:3 (opcional) |
| Codec | H264, MPEG4, WMV (opcional) |
| Bitrate Display | 900–2400 kbps (opcional) |
| Bitrate VAST | 15–30 Mbps (opcional) |

---

## Informações para cópia

Após validar, aparece um box antes do resultado com o dado principal para copiar para outras planilhas:
- **Audio / Video** → duração em segundos (ex: `30s`)
- **Display** → dimensões (ex: `300x600`)

---

## Histórico

Clique em **📋 Histórico** na sidebar para ver as últimas validações registradas na planilha.

> Disponível apenas na versão online (Web App / GitHub Pages com backend ativo).

---

## Solicitar exceção

Se um criativo for reprovado por critérios com os quais há acordo prévio:
1. Clique em **⚠️ Solicitar Exceção** ao final do resultado
2. Selecione o motivo
3. Cole o cabeçalho do e-mail de aprovação (data, hora e remetente são preenchidos automaticamente)
4. Clique em **Enviar Solicitação**

---

## Menus na planilha

| Menu | Opção | Função |
|---|---|---|
| 🎯 FT Validator | Abrir Validador | Abre o validador via dialog |
| 🎯 FT Validator | Consolidado / Dashboard | Navega para a aba |
| 🎯 FT Validator | Log Audio / Display / Video | Navega para a aba de log |
| 🗑️ Limpar | Limpar Audio/Display/Video | Apaga dados da aba |
| 🗑️ Limpar | Limpar Consolidado | Apaga dados do consolidado |
| 🗑️ Limpar | Limpar Tudo | Apaga tudo e reconstrói o Dashboard |
| ⚙️ Admin | Atualizar Tudo | Reformata abas + reconstrói Dashboard |
| ⚙️ Admin | Exceções Pendentes | Navega para aba EXCECOES |
| ⚙️ Admin | Recriar Abas | Cria abas faltantes |
| ⚙️ Admin | Reformatar Abas / Dashboard | Reformata individualmente |
