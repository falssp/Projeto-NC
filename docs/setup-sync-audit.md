# Setup — Sync Audit F2 ↔ Planilha

O GitHub Action `sync-audit.yml` roda toda segunda-feira e detecta drift entre a planilha de taxonomia e os configs do F2. Para funcionar, precisa de acesso à planilha via Google Sheets API.

---

## Como configurar (uma vez só)

### 1. Criar Service Account no Google Cloud

1. Acesse [console.cloud.google.com](https://console.cloud.google.com)
2. Selecione (ou crie) um projeto — pode ser qualquer projeto existente
3. No menu lateral: **APIs e Serviços → Credenciais**
4. Clique **+ Criar Credenciais → Conta de serviço**
   - Nome: `nc-tool-sync-audit`
   - Descrição: "Leitura da planilha de taxonomia para sync audit do NC Tool"
   - Clique em **Criar e Continuar** → **Concluído**
5. Na lista de contas de serviço, clique na que você criou
6. Vá na aba **Chaves → Adicionar chave → Criar nova chave → JSON**
7. Salve o arquivo `.json` gerado (ex: `nc-tool-sync-audit.json`)

### 2. Habilitar a Google Sheets API

1. No mesmo projeto, vá em **APIs e Serviços → Biblioteca**
2. Busque "Google Sheets API" → clique → **Ativar**

### 3. Dar acesso à planilha para a Service Account

1. Abra o arquivo JSON baixado no passo 1 e copie o valor de `"client_email"`
   - Vai parecer com: `nc-tool-sync-audit@SEU-PROJETO.iam.gserviceaccount.com`
2. Abra a planilha: `https://docs.google.com/spreadsheets/d/17vc4UfMz-o2Oz0unAnJlErhHd_2n34tvlFxFnPgTIok`
3. Clique em **Compartilhar** (canto superior direito)
4. Cole o `client_email` no campo, escolha **Visualizador** e clique **Enviar**

### 4. Adicionar o JSON como Secret no GitHub

1. No repositório GitHub, vá em **Settings → Secrets and variables → Actions**
2. Clique **New repository secret**
   - Nome: `GOOGLE_SHEETS_SA_KEY`
   - Valor: **todo o conteúdo** do arquivo JSON (ctrl+A, ctrl+C no arquivo)
3. Clique **Add secret**

---

## Pronto ✅

A partir da próxima segunda-feira às 09h, o audit roda automaticamente.

- Se tudo estiver em sync: o workflow fica verde, sem barulho
- Se houver drift: o workflow fica vermelho **e cria um Issue** com o relatório detalhado

---

## Disparar manualmente

No GitHub: **Actions → Sync Audit — F2 vs Planilha → Run workflow**

Útil quando quiser checar fora da segunda-feira.

---

## Atualizar o baseline após confirmar mudanças

Quando um drift é detectado e você já atualizou os JSONs do F2:

1. Rode localmente:
   ```bash
   cd scripts
   npm install
   GOOGLE_SHEETS_SA_KEY=$(cat caminho/para/nc-tool-sync-audit.json) node sync-audit.js
   ```
2. Se aparecer drift esperado, atualize `scripts/sync-baseline.json` com os novos valores
3. Commit e push — o próximo audit vai usar o baseline atualizado

---

## Notas

- **Google Pmax** e **Twitter-Amplify** estão em `not_in_f2` no baseline e são ignorados pelo audit
- Para adicionar uma nova plataforma no F2 após ela aparecer na planilha:
  - Criar `F2-Gerador/web/config/{id}.json`
  - Adicionar o ID em `PLATFORM_IDS` no `engine.js`
  - Adicionar a entrada em `scripts/sync-baseline.json`
  - O audit vai parar de reportar aquela aba como nova
