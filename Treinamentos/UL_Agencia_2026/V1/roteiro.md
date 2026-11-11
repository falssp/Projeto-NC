# Roteiro — UL | Treinamento Agência + Stormx + Flashtalking V1

**Apresentação:** [UL] Prévia - Treinamento Agência + Stormx + Flashtalking  
**Data base:** Outubro 2026  
**Fonte:** Stormx for Unilever — Digital Forward  
**Google Slides v1:** https://docs.google.com/presentation/d/1ZyLzuvGhe0xfWXhSf2LUme83bn16R8aZt3dVBsKFGdU/edit

---

## Slide 01 — Capa

> Bom dia/tarde/noite a todos! Hoje vamos cobrir o treinamento completo da operação Unilever 2026, abrangendo taxonomias, RM, Jira, Flashtalking e as principais boas práticas do nosso processo digital. Vamos começar?

---

## Slide 02 — Processo e Escopo

> Antes de entrar nos detalhes, é importante entender o fluxo macro da nossa operação. As demandas chegam pelo Jira, passamos pelo preenchimento das ferramentas Galileo e Freetext conforme o ADP, criamos a taxonomia com a URL parametrizada, geramos os contadores e tags via Flashtalking, e encerramos com QA e report diário.

- A Stormx é o time de AdOps responsável pela criação e distribuição das taxonomias.
- A Flashtalking é o AdServer responsável pela criação dos rastreadores — tags e contadores.

---

## Slide 03 — Taxonomia: O que é?

> Taxonomia é o coração da operação. É o sistema de nomenclatura padronizado que aplicamos ao Campaign, Ad Group e Ad Name em todos os veículos digitais.

- Garante que qualquer pessoa, em qualquer momento, entenda exatamente o que cada campanha representa.
- Erros na taxonomia podem impedir que os dados sejam contabilizados no dashboard — incluindo investimento, impressões e cliques — o que impacta o RROI.
- Temos uma janela de 30 dias para corrigir.

---

## Slide 04 — Taxonomia: Estrutura

> A taxonomia Unilever tem dois blocos distintos.

- **Campos Galileo** (separados por `_`): mandatórios globalmente. Não podem ser alterados sem autorização da UL Global.
- **Campos Freetext** (separados por `|`): mandatórios no Brasil. São definidos localmente, sem necessidade de aprovação global, mas qualquer mudança deve ser alinhada com a UL Brasil primeiro.

---

## Slide 05 — Taxonomia: Exemplo Meta

> Aqui temos um exemplo real de taxonomia aplicada ao Meta. Notem a separação clara entre os campos Galileo e Freetext.

- **Campaign:** campos Galileo separados por `_` + campos Freetext separados por `|`.
- **Ad Group:** mesma lógica.
- **Ad Name:** inclui o ID único (SX00010803 no exemplo).
- Regra de ouro: usar a taxonomia **exatamente como entregue** pela Stormx. Qualquer ajuste precisa ser solicitado via Jira.

---

## Slide 06 — ADP e RM Online

> O ADP passa por atualizações regulares. Toda sexta-feira o Global envia atualizações do Galileo, a Stormx incorpora e toda segunda-feira até as 17h distribui a nova versão do ADP e atualiza a RM online no SharePoint.

- Manter o ADP sempre atualizado é fundamental para que a taxonomia reflita as últimas definições globais.

---

## Slide 07 — Novo CN Code

> Quando uma campanha ainda não existe no UNCC Global, a solicitação de um novo CN Code deve ser feita pelo time de marketing ou mídia da BU diretamente ao Global.

- O Global aprova às segundas-feiras às 7h e envia atualizações do UNCC às sextas.
- Se a UL Brasil autorizar antecipadamente, ela envia o CN Code e Campaign e o mídia formaliza por e-mail para a Stormx com print da autorização.

---

## Slide 08 — Campaign Name

> O Campaign Name é definido pelo Global da Unilever. A Stormx recebe atualizações toda sexta-feira e repassa no ADP toda segunda.

- Campaign Local deve ser **igual** ao Campaign Name Global.
- Informações extras vão no Campaign Local Extra, solicitado pelo mídia para que a Stormx crie no ADP.
- Uso de Campaign Name genérico ("Always On Non Search") é exceção — só enquanto o oficial não chega. Quando chegar, **todas** as taxonomias devem ser ajustadas.

---

## Slide 09 — Camphouse

> O Camphouse é onde os planos de mídia são cadastrados e aprovados, com acesso conjunto da agência e da Unilever.

- O mídia cadastra o plano e envia para aprovação da UL.
- Uma informação errada no Camphouse vai estar errada na RM e chegará errada para a Stormx — por isso atenção no preenchimento.
- A Stormx precisa estar no fluxo para acompanhar novidades. Quando algo chega pelo Camphouse sem ser repassado à Stormx, há atraso na demanda.
- Com a linha aprovada, o mídia exporta o plano e preenche a RM.

---

## Slide 10 — RM: O que é?

> A RM (versão atual: RM_Stormx_2026_v6.0) é o documento online onde os mídias registram o briefing e o plano de mídia.

- Centraliza todas as informações da campanha em um único lugar.
- Funciona como controle de status das solicitações.
- Todas as solicitações devem ser registradas na RM e sinalizadas na task do Jira.

---

## Slide 11 — RM: Inserindo o Plano de Mídia

> Antes de preencher a RM, o Plano de Mídia precisa ser inserido na aba "Plano - Camphouse".

1. Exportar o plano no Camphouse: opção "Export Stormx - feito por Alexandre Parma". O sistema gera um Excel.
2. Copiar todos os dados do arquivo exportado.
3. Colar na aba "Plano - Camphouse" a partir da linha 3, coluna C, usando **Colar Especial → Valores** para evitar conflitos de formatação.

---

## Slide 12 — RM: Preenchimento

> Com o plano inserido, acesse a aba do veículo da campanha e informe o número da linha na coluna "Linha" para puxar os dados automaticamente.

- **Campos roxos:** dropdown.
- **Campos amarelos:** preenchimento livre, sem caracteres especiais.
- **Colunas finais (roxo claro):** preenchidas pelo AdOps — taxonomias, ID, URL e contadores.
- RM incompleta = demanda pode ser recusada pelo time de AdOps.

---

## Slide 13 — RM: Status da Demanda

> Toda movimentação na RM deve ter o status atualizado corretamente.

- **Novos pedidos:** preencher todas as colunas, status "Solicitado para Stormx", criar task no Jira com link da RM.
- **Alterações:** destacar em amarelo as células alteradas, status "Alterar", sinalizar no Jira qual linha e coluna foi alterada.
- **Cancelamentos:** status "Cancelar" e informar no Jira qual linha cancelar.
- **Prorrogações:** status "Prorrogado", atualizar data de início (amarelo) e sinalizar no Jira.

---

## Slide 14 — RM: Responsabilidade e Versionamento

> A responsabilidade de atualizar a estrutura da RM é exclusivamente da Stormx.

- Novos campos, regras, dropdowns e ajustes técnicos: solicitar à Carolina (Stormx).
- Apenas a Stormx pode criar novas versões.
- Cada campanha deve ter **apenas uma RM ativa** — não criar RMs adicionais para campanha já com RM em aberto.

---

## Slide 15 — Jira: Solicitação

> Para que a Stormx inicie o desenvolvimento, os mídias precisam criar uma task no Jira.

- **Task Pai:** inclui o link da RM. Permanece "Em andamento" até o encerramento da campanha.
- A Stormx cria subtarefas internas para controle.
- Se a campanha for implementada via tag, enviar também as peças (link Drive, Dropbox ou WeTransfer).

---

## Slide 16 — Jira: Como Acessar

> O acesso ao Jira é por time, usando credenciais do 1Password.

1. Verificar o e-mail do seu time na Planilha de acesso ao Jira Stormx.
2. Acessar o link do 1Password correspondente ao seu time.
3. Fazer login em accounts.google.com com as credenciais do 1Password.
4. No Jira, clicar "Continuar com o Google" — **não informar e-mail e senha diretamente**.

- Os logins são separados por time. Confirmar o e-mail correto antes de abrir uma tarefa.

---

## Slide 17 — SLA

> O SLA da Stormx varia de acordo com o volume de inserções e o tipo de demanda.

- Criação: de 1h (até 10 inserções) a 16h+ (acima de 100 inserções).
- Alteração: de 30min a 10h+.
- Pausas: 10–20 min.
- QA: de 8 a 20 dias.
- Atendimento: 9h30–18h30, segunda a sexta.
- Solicitações até 16h = retorno no mesmo dia.
- Urgências (War Room): sinalizar com pelo menos 3 dias úteis de antecedência.

---

## Slide 18 — Produção: Criação

> Após receber a solicitação via RM e Jira, o AdOps cria as taxonomias com base nas informações da RM, plano de mídia e regras UL Brasil/Global.

- Antes da entrega, todas as taxonomias passam por um validador automatizado. Por isso, informações corretas na RM são fundamentais.

---

## Slide 19 — Produção: Entrega

> A entrega varia conforme o veículo.

- TikTok, Meta e YouTube: taxonomias incluídas na RM; status "Concluído Stormx".
- Pinterest, Twitter, Compra Direta, Amazon DSP e Programática: pode ser necessário solicitar tags ou contadores à Flashtalking (prazo: 48h).
- Kinesso: taxonomias e contadores na RM.
- Veículos externos: só taxonomias — Flashtalking envia aos destinatários.
- Usar a taxonomia exatamente como entregue. Ajustes via Jira.

---

## Slide 20 — IDs

> Para cada linha solicitada, criamos um ID único.

- Meta, TikTok e YouTube: ID único por linha, incluído no Ad Name.
- Pinterest, Twitter, Amazon DSP, Programática e Compra Direta: Flashtalking gera o ID por Placement.
- Campaign/IO, Ad Group e Ad Name devem pertencer ao mesmo ID.
- Mesmo anúncio em campanhas/IOs/Ad Groups diferentes = solicitar individualmente na RM.

---

## Slide 21 — Flashtalking: AdServer

> O ADP é enviado à Flashtalking por e-mail, com todos os envolvidos da campanha em cópia.

- Ajustes durante o processo: Flashtalking retorna o ADP atualizado → Stormx adiciona na task do Jira e informa os mídias.
- Alterações de taxonomia, peça ou período: enviar para Stormx via Jira/Teams para que o responsável da BU envie à Flashtalking na thread original.
- Exemplo de thread: **ADP | Brilhante | Diamond | 2026 | Flashtalking**

---

## Slide 22 — Flashtalking: Grupos Teams

> Os grupos do Microsoft Teams devem ser usados exclusivamente para alinhamentos entre Stormx, Initiative e Flashtalking.

- ✅ Usar para: alinhamentos com a Flashtalking, dúvidas e definições técnicas.
- ⛔ Não usar para: solicitações de taxonomia, alterações na RM, cancelamentos ou prorrogações.
- Todas as solicitações de taxonomia vão na RM + task do Jira.

---

## Slide 23 — Solicitação de TAGs

> O fluxo de TAGs envolve etapas claras entre agência, Stormx e Flashtalking.

1. Agência/Stormx envia ADP + peças.
2. CS/Ops Flashtalking valida o ADP.
3. Creative/QA valida as peças.
4. Com peças validadas, CS/Ops cria a campanha, associa as peças e envia previews.
5. Agência/Stormx valida os previews.
6. CS/Ops libera as TAGs, verifica contabilizações e discrepâncias.

---

## Slide 24 — Solicitação de Trackings

> Para trackings, o fluxo é mais simples.

- Agência/Stormx envia o ADP.
- CS/Ops Flashtalking valida, cria a campanha, libera os contadores e verifica contabilizações e discrepâncias.
- Contadores de social são inseridos no ADP e implementados pela agência.
- Para Social: somente contadores. Para demais veiculações: priorizar TAG.

---

## Slide 25 — Nomenclaturas ADP

> Algumas nomenclaturas importantes do ADP Flashtalking.

- HTML: display via TAG | VAST: vídeo via TAG | Pixel: apenas contadores | Native: native via TAG | Áudio: áudio via TAG
- Multi-Tracker: vários contadores para um único placement
- Booked Cost / ThirdParty ID: valor total — **obrigatório**
- Cost Model: modelo de compra | Booked Units: qty de impressões/cliques | Media Cost Rate: custo por unidade

---

## Slide 26 — Specs: Vídeo

> Specs para criativos de vídeo (In Video — máx 15mb).

- Tipos: MOV, MP4, MPEG, MPG, AVI, WMV
- Duração máxima: 900 segundos
- Aspect Ratio: 16:9 ou 4:3
- Codec: H264, MPEG4, WMV
- Bitrate Display HTML (in-banner): 900–2400 kbps | VAST: 15–30 mbps

---

## Slide 27 — Specs: Display

> Specs para criativos Display (deve conter manifest.js).

- O manifest deve conter: file name, width, height, ClickTagCount e dynamic variables (limite 50).
- Tamanho máximo geral: 500 MB | Standard Ad: até 300 KB.

---

## Slide 28 — Specs: Áudio

> Specs para criativos de áudio.

- Tipos: MP3, OGG, M4A, AAC
- Tamanho máximo: 100MB | Bitrate: 192Kbps ou superior
- Sample Rate: mínimo 44.1 kHz | Loudness: -16 LUFS (±1.5); TPL ≤ -2.0 dB
- VAST: 2.0, 4.1

---

## Slide 29 — Double Verify

> Toda nova campanha criada na Flashtalking precisa de uma nova campanha na Double Verify.

- Campaign ID Flashtalking: encontrado no cabeçalho do ADP → inserir na Double Verify.
- Sempre incluir **todos os publishers** que irão veicular na campanha.

---

## Slide 30 — Discrepâncias

> A Flashtalking analisa discrepâncias quando a veiculação é compra direta com o portal.

- Thresholds: acima de 10% (Desktop) e 20% (Mobile) são analisadas.
- Prazo de início: depende da cooperação do portal — normalmente 48h.

---

## Slide 31 — Pontos Importantes

> Alguns pontos críticos da operação Flashtalking.

- Cada campanha: uma thread do ADP — todas as solicitações na respectiva thread.
- TAG: specs Flashtalking | Tracking: specs do Publisher.
- Nada veiculado sem TAG ou CONTADOR sem autorização do cliente.
- Sempre manter **unilever.as@adsmovil.com** em todos os envios.

---

## Slide 32 — Horário Flashtalking

> O time da Flashtalking atende de segunda a sexta-feira, das 10h às 19h.

- Solicitações entre 17h–19h: retorno no mesmo dia ou próximo.
- Urgências: sinalizar com o máximo de antecedência.

---

## Slide 33 — Validação e Upload de Materiais

> O prazo de validação e upload é de 48h em dias úteis (dentro das specs técnicas e de arte).

- Correções retornam à agência e reiniciam o prazo a cada envio.
- Dúvidas técnicas: creative.as@adsmovil.com — resposta em até 4h úteis.
- Prazo para programação de campanha: 2 a 48h (dias úteis) — ADP correto + peças dentro das specs.

---

## Slide 34 — Diárias

> Todas as diárias devem ser sinalizadas no ADP para que a Flashtalking priorize a validação.

- Prazo mínimo: **72h (dias úteis)** de antecedência para que haja tempo hábil de testes e ajustes com o Publisher.

---

## Slide 35 — Validação de Dados

> O time de AdOps mantém três fluxos de validação de dados.

- **Diário:** alertas de novas taxonomias e erros — reportados ao responsável no mesmo dia.
- **Semanal:** extração + cruzamento de bases + identificação de erros (seg–qua) + planilha de Correção (até qua) + conclusão das correções (até sex) + validação das correções na segunda seguinte.
- **Mensal (RROI):** base completa exportada e validada no final do mês. Prazos devem ser cumpridos para garantir dados no dashboard.

---

## Slide 36 — Correção DV360 e YouTube

> Alguns erros específicos de plataforma têm processos de correção particulares.

- **IO com mais de 120 caracteres:** ajuste feito diretamente no banco de dados pela engenharia (limitação da plataforma).
- **Ad Name:** correção dupla — na plataforma e no banco de dados. O mídia informa o time de BI sobre a taxonomia reduzida e envia a correta.

---

## Slide 37 — Regras e Erros Recorrentes

> Aqui estão os erros mais recorrentes que precisamos evitar.

- ⛔ **Taxonomia por plataforma:** cada plataforma tem estrutura própria — nunca misturar.
- ⛔ **Ad Name duplicado:** mesmo asset = Ad Name diferente por Ad Group. Solicitar individualmente.
- ⛔ **Cópia de Ad Group/Ad Name:** nunca duplicar direto na plataforma (sufixos "cópia"/"copy" quebram a taxonomia).
- ⛔ **Caracteres especiais:** proibido acentos, apóstrofo, travessão, underscore e pipe. Usar apenas letras, números e hífen.

---

## Slide 38 — Regras por Plataforma

> Regras específicas por plataforma.

- **Taxonomia Genérica:** exceção para criativo não chegou + implementação em feriado/fora do horário. 24h para ajuste com dados corretos.
- **Campaign Name/Local:** Campaign Local = Campaign Name (salvo aprovação UL Brasil). Nome genérico vale só até o oficial chegar.
- **Google PMax:** sem Ad Group; Format Type Local = "pmax"; Publisher = "google-pmax".
- **Google Search:** Publisher = "google-search". **Demand Gen:** Publisher = "google-ads" (Google) ou "youtube" (YouTube).

---

## Slide 39 — Casos Especiais

> Por fim, alguns casos especiais de plataformas.

- **TikTok Shop:** só Campaign. Stormx entrega 4 taxonomias: Campaign, Ad Group e Ad Name vão na planilha de compra direta; Campaign TikTok Shop vai na plataforma.
- **Twitter Amplify:** sem Ad Name. Publisher na RM = "Twitter-Amplify".
- **YouTube Masthead CPH:** Buying Type = "cph".
- **Flashtalking via API:** Ad Group + Ad Name unificados em Placement Name.

> Isso encerra o treinamento! Alguma dúvida?
