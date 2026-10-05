# Extrator de Links de Influencer · NC Tools

> 🔗 **[Abrir ferramenta](https://falssp.github.io/Projeto-NC/ferramentas/link-extrator/)**

Ferramenta HTML standalone para extrair handles de influencers a partir de URLs de redes sociais — Instagram, TikTok, YouTube, Facebook, X, LinkedIn, Pinterest, Snapchat e Twitch.

Funciona 100% offline — nenhum dado sai do browser.

---

## Arquivos

```
ferramentas/link-extrator/
├── index.html   ← Ferramenta completa (HTML + CSS + JS em arquivo único)
└── README.md
```

---

## Como usar

### Modo unitário

1. Cole a URL no campo **URL** (ou use o botão 📋 para colar do clipboard)
2. O handle e a rede são detectados automaticamente em tempo real
3. Clique em **→ Passar para lote** para acumular no lote

### Modo lote

1. Clique em **Lote** para alternar para o modo em lote
2. Cole as URLs — uma por linha
3. Clique em **🔍 Processar**
4. Veja a tabela com rede, handle e URL canônica por linha
5. Use **📋 Copiar Tabela** para copiar como texto legível ou **Copiar Tabela (TSV)** para colar direto em planilhas

---

## Funcionalidades

| Funcionalidade | Detalhe |
|---|---|
| Redes suportadas | Instagram, TikTok, YouTube, Facebook, X (Twitter), LinkedIn, Pinterest, Snapchat, Twitch |
| Detecção automática | Rede detectada em tempo real ao digitar/colar |
| URL canônica | Normaliza a URL removendo parâmetros e caminhos extras |
| Modo lote | Processa múltiplas URLs de uma vez, com tabela de resultados |
| Copiar tabela | Copia resultado como texto formatado ou TSV para planilhas |
| Copiar individual | Botão por linha para copiar handle ou URL canônica |
| Sem dependências | HTML puro, sem bibliotecas externas |
| 100% local | Nenhum dado sai do browser |

---

## Também disponível no F4

Esta ferramenta existe de forma integrada no **F4 Acessórios** (módulo "Extrator de Influencer"). A versão standalone aqui é idêntica em funcionalidade — exceto pelo botão "Salvar no Dicionário", que requer Google Apps Script e só funciona dentro do F4.
