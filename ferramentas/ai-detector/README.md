# AI Detector · NC Tools

Ferramenta standalone de detecção de conteúdo gerado por IA — vídeo, imagem, áudio e texto.

🔗 **[Abrir ferramenta](https://falssp.github.io/Projeto-NC/ferramentas/ai-detector/)**

---

## O que faz

Analisa arquivos e textos para identificar se o conteúdo foi gerado por inteligência artificial. Suporta múltiplos tipos de mídia via APIs configuráveis.

| Tipo | Formatos | APIs suportadas |
|------|----------|-----------------|
| 🎵 Áudio | MP3, WAV, M4A, OGG, FLAC | AssemblyAI, OpenAI (Whisper) |
| 🖼️ Imagem | JPG, PNG, WEBP, GIF | Google Gemini, OpenAI GPT-4o, Anthropic Claude |
| 📝 Texto | Texto livre (mín. 50 chars) | Google Gemini, OpenAI GPT-4o, Anthropic Claude |
| 🎬 Vídeo | MP4, MOV, AVI, MPEG | Google Gemini, OpenAI GPT-4o |

---

## APIs suportadas

| API | Modelo | Tipos | Gratuita? |
|-----|--------|-------|-----------|
| **Google Gemini** ⭐ | gemini-1.5-flash | Vídeo, Imagem, Texto | ✅ Sim |
| **OpenAI GPT-4o** | gpt-4o + whisper-1 | Todos | ❌ Pago |
| **Anthropic Claude** | claude-opus-4-5 | Imagem, Texto | ❌ Pago |
| **AssemblyAI** | Universal-2 | Áudio | ❌ Pago |
| **ElevenLabs** | speech-to-text | Áudio | ❌ Pago |

> **Recomendado para começar:** Google Gemini — gratuito, sem cartão de crédito.

---

## Como usar

1. Acesse a ferramenta pelo link acima
2. Clique em **Configurar APIs** e adicione ao menos uma chave
3. Selecione o tipo de arquivo na aba correspondente
4. Faça upload do arquivo (ou cole o texto)
5. Clique em **Analisar**

---

## Segurança

As chaves de API são salvas **exclusivamente no `localStorage` do browser do usuário** — nunca em servidor, nunca na URL.  
Compartilhar o link **não** compartilha as chaves. Cada usuário configura as suas próprias.

---

## Estrutura

```
ai-detector/
└── index.html   # Aplicação completa (HTML + CSS + JS inline)
```

Arquivo único, sem dependências externas além das fontes Google Fonts. Roda offline após o primeiro carregamento (exceto chamadas às APIs).
