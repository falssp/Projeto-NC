# 🏷️ Gerador de Tag Floodlight em Lote

Ferramenta para gerar tags de Floodlight (CM360) em lote — Img Tag legado e Global Site Tag (gtag.js) modernos — com todos os parâmetros obrigatórios e opcionais preenchidos automaticamente.

🔗 **https://falssp.github.io/Projeto-NC/ferramentas/gerador-floodlight/**

---

## Funcionalidades

- **Configuração global** com Advertiser ID (src), macros GDPR e cache buster
- **Até 20 atividades** por geração, cada uma com type, cat, tipo (Counter/Sales) e u-variables
- **Dois formatos de tag** por atividade: Img Tag 1×1px e Global Site Tag (gtag.js) com fallback noscript
- **Validação automática**: src numérico, type/cat alfanumérico, alerta para maiúsculas no cat
- **U-variables**: até 5 variáveis customizadas por atividade (u1=, u2=, ...)
- **Sales tag**: opção de incluir qty= e cost= para e-commerce
- **Export**: copiar código individual, copiar tudo, baixar .txt ou .csv
- **localStorage**: salva configuração entre sessões

## Como usar

1. Preencha o **Advertiser ID** (src) da conta no CM360
2. Marque se deseja macros GDPR e cache buster
3. Adicione as atividades com Activity Group (type) e Activity Tag (cat)
4. Para Sales: marque "Sales" no tipo e habilite qty=/cost= se necessário
5. Clique em **Gerar Tags**
6. Copie as tags da aba desejada (Img Tag ou gtag.js)

## Parâmetros gerados

| Parâmetro | Descrição |
|-----------|-----------|
| `src` | Advertiser ID do CM360 |
| `type` | Activity Group Tag |
| `cat` | Activity Tag |
| `dc_lat`, `dc_rdid`, `tfua`, `npa` | Parâmetros obrigatórios (vazios por padrão) |
| `gdpr`, `gdpr_consent` | Macros de consentimento GDPR |
| `ord` | Cache buster (timestamp para Counter, 1 para Sales) |
| `qty`, `cost` | Quantidade e valor para Sales tags |
| `u1`–`u5` | U-variables customizadas |

## Tecnologia

HTML5 + CSS3 + JavaScript puro · Zero dependências externas · PT-BR
