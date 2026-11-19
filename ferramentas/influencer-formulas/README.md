# Gerador de Fórmulas — Influencer Dicionário · NC Tools

> 🔗 **[Abrir ferramenta](https://falssp.github.io/Projeto-NC/ferramentas/influencer-formulas/)**

Ferramenta HTML standalone para adicionar novas redes sociais ao `[UL] Dicionário_InfluencerName` e gerar as fórmulas D, E e regras de formatação condicional atualizadas, prontas para colar na planilha.

Funciona 100% offline — nenhum dado sai do browser.

---

## Arquivos

```
ferramentas/influencer-formulas/
├── index.html   ← Ferramenta completa (HTML + CSS + JS em arquivo único)
└── README.md
```

---

## O que faz

| Funcionalidade | Detalhe |
|---|---|
| Lista de redes cadastradas | Visualização das 10 redes originais com swatch de cor, domínio e padrão de URL |
| Adicionar nova rede | Nome, domínio, padrão de URL (5 tipos), cor hex, cor do texto, termo REGEXMATCH |
| Testador de URL | Cola uma URL e vê em tempo real qual rede detecta e qual handle extrai |
| Gerador fórmula D | Fórmula completa `ARRAYFORMULA + SE` com todas as redes |
| Gerador fórmula E | Fórmula completa de extração de handle para todas as redes |
| Formatação condicional | Tabela com swatch, hex e fórmula `REGEXMATCH` por rede |
| Botão Copiar | Por bloco de fórmula individual |
| Proteção de originais | Redes originais não podem ser removidas |
| Validação de duplicata | Bloqueia adição de rede com mesmo nome ou domínio |

---

## Redes originais (Out/2026)

TikTok · Instagram · Facebook · YouTube · X/Twitter · Pinterest · LinkedIn · Snapchat · Twitch · Kwai
