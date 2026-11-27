# Manual do Usuário — F3 Validator · Pessoal
> Ambiente Pessoal (Backup)

## Modos de validação

| Modo | Como usar |
|---|---|
| ADP Excel | Upload do arquivo .xlsx — sistema detecta abas automaticamente |
| Dash / QA Painel | Upload .csv/.xlsx, colar tabela ou link Google Sheets |
| Manual / Colar | Selecione a plataforma e cole os strings |
| Modo Ticket | Compara dois ADPs (Antes × Depois) e valida o delta |

## Resultados

| Status | Significado |
|---|---|
| ✅ Válido | Ad name correto |
| ❌ Inválido | Um ou mais erros — veja o detalhe |
| ⚠️ Exceção | Aprovado como exceção pelo time |

Score: verde ≥ 95%, amarelo ≥ 70%, vermelho < 70%.

## Como solicitar uma exceção

1. Clique em **Solicitar Exceção** na linha com erro
2. Selecione o motivo no dropdown
3. Cole o cabeçalho do e-mail do cliente
4. Clique em **Enviar Solicitação**

## Integração Jira

Menu NC Tool → **Configurar Token Jira** → informe e-mail e API Token.
Token salvo em PropertiesService — nunca exposto no código.
