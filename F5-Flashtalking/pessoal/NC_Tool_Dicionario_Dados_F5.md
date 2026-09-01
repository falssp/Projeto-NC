# Dicionário de Dados — F5 FT Flashtalking Validator | NC Tool
> Versão 1.0

## Campos do ADP — Aba Flashtalking

| Coluna | Letra | Campo | Regra |
|---|---|---|---|
| 51 | AZ | Placement ID | Chave única — imutável |
| 28 | AB | Ad Name | Campo validado contra NC Flashtalking |

## Status de validação

| Status | Código | Descrição |
|---|---|---|
| ✅ Válido | valid | Todos os campos corretos |
| ❌ Inválido | invalid | Um ou mais erros — detalhes por campo |
| ⚠️ Exceção | exception | Aprovado como exceção |

## Tipos de erro

| Código | Descrição |
|---|---|
| CAMPO_FORA_LISTA | Valor não existe no dicionário Flashtalking |
| CAMPO_AUSENTE | Campo obrigatório não encontrado |
| ORDEM_INCORRETA | Campos na ordem errada |
| CARACTERE_INVALIDO | Espaço, acento ou símbolo proibido |
| SEPARADOR_INVALIDO | Separador diferente do padrão |

## Estrutura de abas da planilha F5

| Aba | Observação |
|---|---|
| Log | Append-only — nunca editar manualmente |
| Exceções | Compartilhado entre Corp e Pessoal |
| Usuarios | Gerenciado pelo Admin |
| Config | Configurações internas |
