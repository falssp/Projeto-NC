# Roteiro — Unilever | Operação 2026

**Apresentação:** UL_Operacao_2026  
**Data base:** Out/2026  
**Fonte:** Google Slides — UL | Operação Unilever | 2026.pptx

---

## Slide 01 — Capa

> Bem-vindos ao treinamento de Operação Unilever 2026. Hoje vamos passar pelos principais fluxos operacionais: taxonomias, RM, Jira, SLA e Flashtalking.

---

## Slide 02 — Agenda

Apresentar os tópicos que serão cobertos na ordem: organograma, processo, Jira, ADP, QA, pontos importantes, erros, taxonomia genérica, Campaign Name, influencer, RM, SLA e Flashtalking.

---

## Slide 03 — Organograma

> A liderança da operação é composta por Tiago Domingos (Diretor de AdOps e Projetos), Livia Bousquet (Diretora de Atendimento) e Carolina Dobner (Gerente de Projetos). Para solicitações de acesso ao Jira, o contato é diretamente com a Carol.

---

## Slide 04 — Estrutura do Time

> O time de AdOps está dividido por BU: Marcos Santos cuida de Personal Care; Felipe Lima de Beauty e Wellbeing; e João Braga de Home Care e Nutrition & Ice.

---

## Slide 05 — Processo e Escopo

> O fluxo tem 6 etapas: validação e distribuição via Jira → criação da taxonomia via Galileo/Freetext → solicitação de contadores e tags à Flashtalking → implementação pela agência nas plataformas → QA e validação automática → report diário.
>
> Responsabilidades: StormX cria e distribui as taxonomias; Flashtalking cria os rastreadores.

---

## Slide 06 — Jira: O que é e como solicitar

> Para que a StormX inicie o desenvolvimento das taxonomias, o mídia precisa criar uma tarefa no Jira com todas as informações, incluindo obrigatoriamente o link da RM.
>
> A task pai permanece "Em andamento" até o encerramento da campanha. Toda nova solicitação, alteração, cancelamento ou prorrogação deve ser sinalizada na task pai.
>
> O formulário de solicitação está em: storm-x.atlassian.net/jira/forms/create. São 3 fases: informações iniciais, Galileo e FreeText.

---

## Slide 07 — Jira: Como acessar

> O acesso é feito via StormX, solicitado à Carol Dobner. Cada time tem um e-mail de grupo específico no 1Password.
>
> Passo a passo: consultar a planilha de acesso → acessar o 1Password do seu time → fazer login no Google com as credenciais → no Jira, clicar em "Continuar com o Google".
>
> **Atenção:** confirmar o e-mail correto do seu time antes de abrir qualquer tarefa.

---

## Slide 08 — Atualização do ADP

> O ciclo é semanal: todo Global envia atualização do Galileo para a StormX toda sexta-feira. A StormX inclui as atualizações de Galileo e FreeText e envia o ADP atualizado toda segunda-feira até as 17h.
>
> Pontos de atenção: a validade da taxonomia é de 1 semana; a validade da task é de 30 dias; campos de quantidade e prioridade são preenchidos pela StormX.

---

## Slide 09 — QA e Validação de Dados

> A StormX realiza o QA do rastreador (Flashtalking) e da taxonomia após a implementação.
>
> Se houver divergência: status da RM muda para "Erro", taxonomia fica em vermelho na RM, e a task no Jira é sinalizada para que o mídia faça os ajustes.
>
> Se a linha não for encontrada: status muda para "Linha não encontrada", task atualizada, e é solicitada nova data de implementação.
>
> Alerta diário: o AdOps recebe alertas sobre novas taxonomias e erros, e reporta ao responsável no mesmo dia. Revisão semanal em conjunto com Marília para validar dashboards.

---

## Slide 10 — Pontos Importantes

> **Proibido preencher o ADP**: apenas a StormX está autorizada. ADPs preenchidos serão devolvidos.
>
> **Proibido subir campanha sem taxonomia**: em casos urgentes, comunicar a StormX por e-mail com autorização do cliente. Após implementação, solicitar via Jira e corrigir em até 24h.

---

## Slide 11 — Erros Recorrentes

> **Taxonomia por plataforma:** cada plataforma tem sua própria estrutura — nunca usar a taxonomia de uma em outra.
>
> **Ad Name duplicado:** nunca usar o mesmo Ad Name em mais de um Ad Group. Cada um precisa ser solicitado individualmente.
>
> **Cópia de Ad Group/Ad Name:** não duplicar diretamente na plataforma. Alguns veículos adicionam "cópia/copy" automaticamente, descaracterizando a taxonomia.
>
> **Caracteres especiais:** proibidos acentos, apóstrofo, travessão, underscore e pipe. Usar apenas letras sem acento, números e hífen.

---

## Slide 12 — Taxonomia Genérica

> A taxonomia genérica é aceita somente em dois cenários: fora do expediente (feriado/final de semana), quando o AdOps já está offline; ou campanha urgente sem informações completas.
>
> **Prazo obrigatório:** ajustar para a taxonomia correta em até 24h úteis.

---

## Slide 13 — Campaign Name

> O Campaign Name é definido pelo Global da Unilever. A StormX distribui todo ciclo semanal.
>
> **Campaign Local** deve ser sempre igual ao Campaign Name global. Informações adicionais vão no Campaign Local Extra, solicitado ao mídia para cadastro no ADP.
>
> **Proibido usar Campaign Name genérico** (ex: Always On Non Search) exceto enquanto o oficial não foi aprovado. Após aprovação, todas as taxonomias devem ser ajustadas.

---

## Slide 14 — Regras por Plataforma

> **Google PMax:** preencher "pmax" no Campaign Local Extra. Terá quebra extra de freetext (Format Type Local = pmax).
>
> **Google Search:** Publisher = google-search.
>
> **Demand Gen:** Google → google-ads; YouTube → youtube.
>
> **Twitter Amplify:** não é possível incluir Ad Name — preencher "amplify" no Ad Group Extra.
>
> **TikTok Branded Mission/Buzz:** solicitar 2 taxonomias com o mesmo ID (uma para TikTok, outra para Compra Direta).
>
> **YouTube Masthead CPH:** taxonomia exclusiva de Compra Direta com Buying Type = cph.
>
> **Kinesso — Campo Extra:** a única alteração permitida. Comunicar a StormX em até 24h após qualquer mudança.

---

## Slide 15 — Limite de Caracteres

> Nunca reduzir a taxonomia por conta própria. Sempre comunicar a StormX ao identificar restrições técnicas de novos veículos.
>
> Limites: YouTube Deals: IO = 120 chars. Mercado Livre Programática: Ad Name = 50. Mercado Livre CD: Campaign/Ad Group/Ad Name = 30. Kwai CD: Campaign e Ad Name = 100.

---

## Slide 16 — Classificação de Influenciadores

> Ao preencher a RM, classificar corretamente:
> - **BRD:** sem influenciador (Brand Say)
> - **INF:** com influenciador (Brand Handle + Influencer Handle)
> - **UGC:** com influenciador (Influencer Handle)
>
> Se BRD: não deve ter link de influenciador. Se INF/UGC: obrigatório informar o link correspondente.
>
> Post Types: na (sem influenciador), dark (Dark Post), bstd (Boosted).
>
> Influencer or Brand (GL): brd = conteúdo da marca; inf = conteúdo do influenciador impulsionado pela marca; ugc = collab/conteúdo patrocinado no perfil do influenciador.

---

## Slide 17 — RM: O que é?

> A RM é o documento online que contém o briefing e o plano de mídia. Funciona também como controle de status das solicitações. O plano de mídia é exportado do Camphouse e colado na aba "Plano - Camphouse".
>
> Legenda de cores: roxo = dropdown obrigatório; amarelo = preenchimento manual (sem caracteres especiais); azul claro = automático (não editar); cinza = StormX.

---

## Slide 18 — RM: Plano e Preenchimento

> Para inserir o plano: exportar do Camphouse usando "Exportar Stormx" → copiar todos os dados → colar na aba "Plano - Camphouse" a partir da célula C3 usando Colar Especial → Valores.
>
> Após colar: acessar a aba do veículo e informar o número da linha. A RM precisa estar completamente preenchida antes de solicitar ao AdOps.
>
> Para novas linhas: exportar novamente, copiar só as novas e colar abaixo da última linha já preenchida.

---

## Slide 19 — RM: Status, Versionamento e Boas Práticas

> Status:
> - Novo pedido → "Solicitado para Stormx" + criar task no Jira com link da RM
> - Alteração → "Alterar" (células em amarelo) + sinalizar no Jira
> - Cancelamento → "Cancelar" + informar no Jira
> - Prorrogação → "Prorrogado" (data em amarelo) + sinalizar no Jira
>
> Versionamento: cada campanha = uma RM ativa. Não criar RMs adicionais. Para migrar de versão, desativar a anterior.
>
> Boas práticas: conferir campos obrigatórios, atualizar antes de sinalizar no Jira, manter histórico de alterações.

---

## Slide 20 — SLA

> Atendimento: 9h30 às 18h30, seg a sex.
>
> SLA de criação: até 10 inserções = 1h; até 40 = 2h; até 100 = 5h; acima de 100 = 16h.
> Alteração: 30min / 1h / 3h / 10h.
> Pausas: 10–20min.
> QA: 8 / 15 / 15 / 20 dias.
>
> Regras gerais: até 16h → mesmo dia; após 16h → dia seguinte; urgentes até 12h do dia; War Room com 3 dias úteis de antecedência.

---

## Slide 21 — Flashtalking: Operação e Fluxo

> O ADP é enviado à Flashtalking por e-mail em thread dedicada. O fluxo é: StormX envia ADP + peças → Flashtalking valida ADP e peças → cria campanha e envia previews → StormX valida previews → Flashtalking libera Tags.
>
> Pontos importantes: cada campanha tem uma thread do ADP; entrega por Tag = specs Flashtalking; entrega por Tracking = specs do Publisher; Social: apenas contadores; nada veiculado sem autorização do cliente.
>
> E-mail padrão: unilever.as@adsmovil.com.
> Horário FT: 10h às 19h, seg a sex.

---

## Slide 22 — Flashtalking: Specs dos Criativos

> Vídeo: MOV/MP4/AVI/WMV, máx 900s, bitrate VAST 15–30 mbps, codec H264.
>
> Display: obrigatório manifest.js com nome, dimensões, clickTagCount e variáveis dinâmicas. Máx 500 MB / 300 KB Standard Ad.
>
> Áudio: MP3/OGG/M4A/AAC, mín 1s, máx 100 MB, bitrate ≥ 192 Kbps, loudness -16 LUFS (±1.5), VAST 2.0 e 4.1.
>
> Prazo de validação: 48h úteis. Diárias: peças com 72h de antecedência.

---

## Slide 23 — Encerramento

> "Think. Think. Think. And then automate."
>
> Agradecer a presença e abrir para perguntas.
