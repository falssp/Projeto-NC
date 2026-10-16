# Custo de Produtos Vendidos em Pacote | ADP × BI

Treinamento sobre como tratar custo e taxonomia de produtos vendidos em pacote (Masthead CPH, TikTok Branded Mission, Branded Buzz) sem criar exceções no ADP.

## Acesso

🔗 **[https://falssp.github.io/Projeto-NC/Treinamentos/Custo_Produtos_Pacote/](https://falssp.github.io/Projeto-NC/Treinamentos/Custo_Produtos_Pacote/)**

## Arquivos

| Arquivo | Descrição | Link |
|---|---|---|
| `index.html` | Apresentação interativa — 10 slides | [Abrir](https://falssp.github.io/Projeto-NC/Treinamentos/Custo_Produtos_Pacote/index.html) |
| `roteiro.html` / `roteiro.md` | Roteiro com falas sugeridas por slide | [Abrir](https://falssp.github.io/Projeto-NC/Treinamentos/Custo_Produtos_Pacote/roteiro.html) |
| `MotorTaxonomiaGenerico.bas` | Módulo VBA: motor genérico de montagem de string + `SetupConfigProdutos()` | — |
| `Config_Produtos.tsv` | Conteúdo da aba `Config_Produtos` (colar na célula A1 do ADP) | — |

## Conteúdo (10 slides)

| # | Slide | Conteúdo |
|---|---|---|
| 01 | Capa | Custo de produtos vendidos em pacote |
| 02 | O problema | Masthead CPH com custo R$0 ao quebrar por Ad/Ad Group/Ad ID |
| 03 | Leilão vs. pacote | Causa raiz: modelo comercial do produto |
| 04 | Onde o custo mora | Tabela produto → granularidade de custo e de entrega |
| 05 | O ADP já resolve | Coluna D, Insertion Order / IO - Reduzido, Line Item Motor |
| 06 | Ajuste no BI | Troca da chave do join: Ad ID → Insertion Order |
| 07 | Montagem por produto | Masthead CPH, Branded Mission, Mercado Livre |
| 08 | Config_Produtos + VBA | Tabela de configuração e motor genérico |
| 09 | Checklist | Intake de novo posicionamento |
| 10 | Encerramento | "Think. Think. Think. and then automate." |

## Fonte

Gerado a partir do ADP `UNCC_Digital_Platform_String_Tool_Merge_4_4` (abas Youtube, Meta e Tiktok, Programmatic).
Data: Out/2026

## Se o ADP for recriado do zero

Ver o anexo no [roteiro](roteiro.html). Resumo: o motor e a `Config_Produtos` já nascem no arquivo novo (`.xlsm`), mas é preciso garantir strings idênticas às atuais (campanhas em veiculação e joins do BI), remapear as letras de coluna da config (ideal: referenciar por nome de cabeçalho), migrar validações e abas de apoio, e rodar os dois ADPs em paralelo antes do corte. O VBA não roda no Excel Online.
