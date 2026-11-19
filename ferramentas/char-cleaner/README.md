# Removedor de Caracteres · NC Tools

> 🔗 **[Abrir ferramenta](https://falssp.github.io/Projeto-NC/ferramentas/char-cleaner/)**

Ferramenta HTML standalone para identificar caracteres especiais em textos e gerar versões limpas com transliteração automática — ideal para validar nomes de campanhas, Ad Names e estruturas de nomenclatura antes de usar em planilhas ou sistemas.

Funciona 100% offline — nenhum dado sai do browser.

---

## Arquivos

```
ferramentas/char-cleaner/
├── index.html   ← Ferramenta completa (HTML + CSS + JS em arquivo único)
└── README.md
```

---

## Como usar

1. Cole os textos no campo de entrada — um por linha
2. Os resultados aparecem automaticamente em tempo real
3. Veja por linha:
   - **Original** — o texto exatamente como foi inserido
   - **Caracteres encontrados** — badges com cada caractere especial detectado
   - **Sugestão limpa** — versão transliterada e normalizada
4. Clique em **📋** em qualquer linha para copiar a versão limpa
5. Clique em **📋 Copiar tudo** para copiar todas as versões limpas de uma vez
6. Use **Limpar** para resetar a ferramenta

---

## Funcionalidades

| Funcionalidade | Detalhe |
|---|---|
| Detecção em tempo real | Resultado atualiza a cada tecla digitada |
| Transliteração | Acentos mapeados para equivalente ASCII (á→a, ç→c, etc.) |
| Badges visuais | Cada caractere especial destacado individualmente |
| Copiar individual | Botão 📋 por linha com feedback visual |
| Copiar tudo | Copia todas as sugestões limpas de uma vez |
| Sem dependências | HTML puro, sem bibliotecas externas |
| 100% local | Nenhum dado sai do browser |

---

## Caracteres tratados

- **Acentos**: `á à â ã ä é è ê ë í ì î ï ó ò ô õ ö ú ù û ü ç ñ` (e maiúsculos)
- **Separadores**: `_` e `|` → convertidos para `-`
- **Símbolos**: `& @ # $ % ! ? * ( ) [ ] { } = + \`` → removidos
- **Demais**: qualquer caractere fora de `A-Z a-z 0-9 -` → removido

---

## Também disponível no F4

Esta ferramenta existe de forma integrada no **F4 Acessórios** (módulo "Removedor de Caracteres"). A versão standalone aqui é idêntica em funcionalidade, porém executada fora do F4.
