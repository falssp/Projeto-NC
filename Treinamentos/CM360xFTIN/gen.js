#!/usr/bin/env node
// StormX – CM360xFT-IN Training Deck — 25 slides
// Dark theme matching HTML: #0D0D14 bg, teal/blue/violet/yellow/red/green accents

const pptxgen = require('pptxgenjs');
const { applyTheme } = require('/root/.claude/skills/synced/3a4d2f51-5c81-4d0e-81d7-9f12ac9f437c_5075b268-172f-418b-8522-01c276930bdf/pptx/scripts/apply_theme.js');
const path = require('path');

const OUT = path.join(__dirname, 'StormX_-_CM360xFTIN_v01.pptx');

// ─── Colors (hex, no #) ───────────────────────────────────────────────────────
const C = {
  bg:      '0D0D14',
  bg2:     '12121C',
  bg3:     '1A1A28',
  surface: '1E1E2E',
  border:  '2A2A3E',
  teal:    '4FE0C8',
  blue:    '3FB6FF',
  violet:  'A35CFF',
  yellow:  'EBFF24',
  red:     'FF5758',
  green:   '4ADE80',
  white:   'F7F7F4',
  muted:   'CFCBE0',
  dim:     '7A7898',
};

const THEME = {
  name: 'StormXDark',
  headFontFace: 'Calibri',
  bodyFontFace: 'Calibri',
  colors: {
    dk1: C.white,   lt1: C.bg,
    dk2: C.muted,   lt2: C.bg2,
    accent1: C.teal,  accent2: C.blue,  accent3: C.violet,
    accent4: C.yellow, accent5: C.red,  accent6: C.green,
    hlink: C.blue,  folHlink: C.violet,
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';  // 10" × 5.625"
pres.author  = 'StormX Data & Tech';
pres.company = 'StormX Data &amp; Tech';
pres.subject = 'CM360 x Floodlight – Treinamento Interno';
pres.title   = 'StormX – CM360xFT-IN v01';

const W = 10, H = 5.625;

// ─── Layout definitions ───────────────────────────────────────────────────────
// LAYOUT 1: Cover
pres.defineSlideMaster({
  title: 'COVER',
  background: { color: C.bg },
  objects: [
    // footer brand
    { text: { text: 'StormX', options: { x:0.4, y:5.3, w:1.2, h:0.2, fontSize:9, color:C.teal, bold:true, fontFace:'Calibri', isTextBox:true } } },
  ],
});

// LAYOUT 2: Section divider
pres.defineSlideMaster({
  title: 'DIVIDER',
  background: { color: C.bg },
  objects: [
    { text: { text: 'StormX', options: { x:0.4, y:5.3, w:1.2, h:0.2, fontSize:9, color:C.teal, bold:true, fontFace:'Calibri', isTextBox:true } } },
  ],
});

// LAYOUT 3: Content (title top-left + body area)
pres.defineSlideMaster({
  title: 'CONTENT',
  background: { color: C.bg },
  objects: [
    { text: { text: 'StormX', options: { x:0.4, y:5.3, w:1.2, h:0.2, fontSize:9, color:C.teal, bold:true, fontFace:'Calibri', isTextBox:true } } },
  ],
  slideNumber: { x:9.3, y:5.28, color:C.dim, fontSize:9, fontFace:'Calibri' },
});

// ─── Utility: add slide with background ──────────────────────────────────────
function addSlide(masterName, secTitle) {
  return pres.addSlide({ masterName, sectionTitle: secTitle });
}

// filled rect helper
function rect(sl, x, y, w, h, fill, opts={}) {
  sl.addShape(pres.ShapeType.rect, { x, y, w, h, fill:{ color:fill }, line:{ color:fill }, ...opts });
}

// text helper
function txt(sl, text, x, y, w, h, opts={}) {
  sl.addText(text, { x, y, w, h, isTextBox:true, fontFace:'Calibri', ...opts });
}

// rounded rect card
function card(sl, x, y, w, h, fill=C.surface) {
  sl.addShape(pres.ShapeType.roundRect, { x, y, w, h, fill:{color:fill}, line:{color:C.border,pt:1}, rectRadius:0.08 });
}

// pill/badge
function pill(sl, label, x, y, color, w=1.4) {
  sl.addShape(pres.ShapeType.roundRect, { x, y, w, h:0.34, fill:{color:'1A1A28'}, line:{color:color,pt:1.5}, rectRadius:0.17 });
  txt(sl, label, x, y, w, 0.34, { color:color, fontSize:11, bold:true, align:'center', valign:'middle' });
}

// footer text (slide N / 26)
function footer(sl, leftLabel, slideNum) {
  txt(sl, leftLabel, 2.0, 5.28, 5, 0.2, { color:C.dim, fontSize:9 });
  txt(sl, `${slideNum} / 26`, 8.6, 5.28, 1.0, 0.2, { color:C.dim, fontSize:9, align:'right' });
}

// section divider slide builder
function sectionDivider(secTitle, num, titleText, subtitleText, slideNum) {
  pres.addSection({ title: secTitle });
  const sl = addSlide('DIVIDER', secTitle);
  // big number
  txt(sl, num, 0.5, 1.2, 1.5, 1.8, { color:'2A4A44', fontSize:120, bold:true, valign:'top' });
  // section label
  txt(sl, 'Seção', 0.5, 1.1, 2, 0.3, { color:C.dim, fontSize:11, bold:false });
  // main title
  txt(sl, titleText, 2.2, 1.6, 7.3, 1.2, { color:C.white, fontSize:38, bold:true });
  if (subtitleText) txt(sl, subtitleText, 2.2, 2.8, 7.0, 0.4, { color:C.muted, fontSize:14 });
  footer(sl, titleText, slideNum);
  return sl;
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 01 — CAPA
// ─────────────────────────────────────────────────────────────────────────────
pres.addSection({ title: 'Capa' });
{
  const sl = addSlide('COVER', 'Capa');

  // Left panel
  txt(sl, 'TREINAMENTO INTERNO', 0.5, 0.5, 5.5, 0.3, { color:C.dim, fontSize:9, bold:true, charSpacing:3 });
  txt(sl, 'CM360', 0.5, 0.85, 5.5, 1.0, { color:C.teal, fontSize:52, bold:true });
  txt(sl, 'x Floodlight', 0.5, 1.75, 5.5, 0.6, { color:C.white, fontSize:34, bold:true });
  txt(sl, 'Como o ad server do Google unifica dados,\ndeduplicação e conecta o ecossistema GMP.', 0.5, 2.45, 5.0, 0.7, { color:C.muted, fontSize:13 });

  // Pills row
  pill(sl, 'CM360', 0.5, 3.75, C.teal, 1.2);
  pill(sl, 'GMP / DV360 / SA360', 1.85, 3.75, C.blue, 1.75);
  pill(sl, 'vs Flashtalking / Innovid', 3.75, 3.75, C.violet, 1.85);  // 1.4*2+0.1 offset

  // Right panel: agenda card
  card(sl, 5.8, 0.4, 3.9, 2.4, C.surface);
  txt(sl, 'O que você vai aprender', 6.0, 0.55, 3.5, 0.3, { color:C.teal, fontSize:10, bold:true });
  const agenda = [
    '01  Contexto de mercado',
    '02  O que é o CM360',
    '03  CM360 vs Flashtalking/Innovid',
    '04  O ecossistema GMP',
    '05  Stacks e perfis de operação',
    '06  Como a StormX implementa',
  ];
  txt(sl, agenda.join('\n'), 6.0, 0.9, 3.5, 1.7, { color:C.muted, fontSize:10, lineSpacingMultiple:1.4 });

  // Right panel: público card
  card(sl, 5.8, 2.95, 3.9, 1.8, C.surface);
  txt(sl, 'Público-alvo', 6.0, 3.1, 3.5, 0.3, { color:C.blue, fontSize:10, bold:true });
  txt(sl, 'Equipe comercial, gestores de conta\ne profissionais de mídia interessados\nem ad tech e GMP.', 6.0, 3.45, 3.5, 1.1, { color:C.muted, fontSize:10, lineSpacingMultiple:1.4 });

  footer(sl, 'Capa', 1);
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 02 — AGENDA
// ─────────────────────────────────────────────────────────────────────────────
{
  const sl = addSlide('CONTENT', 'Capa');
  txt(sl, 'AGENDA', 0.5, 0.35, 9, 0.3, { color:C.dim, fontSize:9, bold:true, charSpacing:3 });
  txt(sl, 'O que vamos cobrir hoje', 0.5, 0.65, 9, 0.5, { color:C.white, fontSize:26, bold:true });

  const items = [
    { num:'01', label:'Contexto de mercado',          color:C.teal },
    { num:'02', label:'O que é o CM360',              color:C.blue },
    { num:'03', label:'CM360 vs FT / Innovid',        color:C.violet },
    { num:'04', label:'O ecossistema GMP',            color:C.yellow },
    { num:'05', label:'Stacks e perfis de operação',  color:C.teal },
    { num:'06', label:'Como a StormX implementa',     color:C.green },
  ];

  const cols = 3, rows = 2;
  const cw = 2.9, ch = 1.5, gx = 0.2, gy = 0.2;
  const startX = 0.5, startY = 1.4;

  items.forEach((item, i) => {
    const col = i % cols, row = Math.floor(i / cols);
    const x = startX + col*(cw+gx), y = startY + row*(ch+gy);
    card(sl, x, y, cw, ch, C.surface);
    txt(sl, item.num, x+0.15, y+0.15, 0.5, 0.4, { color:item.color, fontSize:18, bold:true });
    txt(sl, item.label, x+0.15, y+0.6, cw-0.3, 0.6, { color:C.white, fontSize:12, bold:true, lineSpacingMultiple:1.3 });
  });

  footer(sl, 'Agenda', 2);
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 03 — SEÇÃO 01 DIVIDER
// ─────────────────────────────────────────────────────────────────────────────
sectionDivider('Contexto', '01', 'Contexto de mercado',
  'Por que o ad server importa mais do que nunca', 3);

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 04 — A PERGUNTA QUE NINGUÉM FAZ
// ─────────────────────────────────────────────────────────────────────────────
{
  const sl = addSlide('CONTENT', 'Contexto');
  txt(sl, 'Contexto de mercado', 0.5, 0.35, 9, 0.25, { color:C.dim, fontSize:9 });
  txt(sl, 'A pergunta que ninguém faz', 0.5, 0.65, 9, 0.5, { color:C.white, fontSize:24, bold:true });
  txt(sl, 'Seus relatórios mostram resultados. Mas o que eles escondem?', 0.5, 1.1, 9, 0.3, { color:C.muted, fontSize:12 });

  const cards = [
    { icon:'▐', title:'Relatórios que não conversam', body:'Display, Search e Social cada um com seu próprio número — sem cruzamento entre canais.' },
    { icon:'◈', title:'Pagando 3x pela mesma conversão', body:'Cada plataforma reivindica o crédito. Você paga o custo de três e conta um resultado.' },
    { icon:'◉', title:'Dados que não são seus', body:'Sem ad server próprio, o histórico fica na plataforma. Troca de agência = zero de continuidade.' },
  ];

  const cw = 2.8, ch = 2.8, gx = 0.25, startX = 0.5, startY = 1.5;
  cards.forEach((c, i) => {
    const x = startX + i*(cw+gx);
    // red top accent
    sl.addShape(pres.ShapeType.roundRect, { x, y:startY, w:cw, h:ch, fill:{color:C.surface}, line:{color:C.border,pt:1}, rectRadius:0.08 });
    rect(sl, x, startY, cw, 0.08, C.red);
    txt(sl, c.icon, x+0.15, startY+0.2, 0.5, 0.4, { fontSize:20, color:C.red });
    txt(sl, c.title, x+0.15, startY+0.65, cw-0.3, 0.5, { color:C.white, fontSize:12, bold:true, lineSpacingMultiple:1.3 });
    txt(sl, c.body, x+0.15, startY+1.2, cw-0.3, 1.4, { color:C.muted, fontSize:10, lineSpacingMultiple:1.4 });
  });

  footer(sl, 'A Pergunta que Ninguém Faz', 4);
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 05 — DEDUPLICAÇÃO NA PRÁTICA
// ─────────────────────────────────────────────────────────────────────────────
{
  const sl = addSlide('CONTENT', 'Contexto');
  txt(sl, 'Deduplicação na Prática', 0.5, 0.35, 9, 0.25, { color:C.dim, fontSize:9 });
  txt(sl, 'O mesmo cliente, contado três vezes', 0.5, 0.65, 9, 0.45, { color:C.white, fontSize:24, bold:true });
  txt(sl, 'Cada canal usa sua própria lógica de atribuição. Sem um ad server central, os números somam — mas as conversões não.', 0.5, 1.1, 9, 0.3, { color:C.muted, fontSize:11 });

  // Channel cards (3 sources)
  const channels = [
    { label:'Display', conv:'300', cpa:'R$83', color:C.blue },
    { label:'Search',  conv:'280', cpa:'R$71', color:C.violet },
    { label:'Social',  conv:'150', cpa:'R$133', color:C.yellow },
  ];
  const cw=2.1, ch=1.6, startX=0.4, y=1.6;
  channels.forEach((ch2, i) => {
    const x = startX + i*(cw+0.15);
    card(sl, x, y, cw, ch, C.surface);
    txt(sl, ch2.label, x+0.1, y+0.1, cw-0.2, 0.25, { color:ch2.color, fontSize:11, bold:true });
    txt(sl, ch2.conv, x+0.1, y+0.4, cw-0.2, 0.55, { color:C.white, fontSize:32, bold:true });
    txt(sl, 'conversões reivindicadas', x+0.1, y+0.95, cw-0.2, 0.25, { color:C.dim, fontSize:8 });
    txt(sl, `CPA ${ch2.cpa}`, x+0.1, y+1.25, cw-0.2, 0.25, { color:C.muted, fontSize:9 });
  });

  // Arrow
  txt(sl, '→', 6.95, 2.1, 0.5, 0.5, { color:C.dim, fontSize:22, bold:true });

  // CM360 real card
  card(sl, 7.5, y, 2.1, ch, C.bg3);
  sl.addShape(pres.ShapeType.roundRect, { x:7.5, y:y, w:2.1, h:ch, fill:{color:'0D0D14'}, line:{color:C.teal,pt:2}, rectRadius:0.08 });
  txt(sl, 'CM360 Real', 7.6, y+0.1, 1.9, 0.25, { color:C.teal, fontSize:11, bold:true });
  txt(sl, '310', 7.6, y+0.4, 1.9, 0.55, { color:C.white, fontSize:32, bold:true });
  txt(sl, 'conversões únicas reais', 7.6, y+0.95, 1.9, 0.25, { color:C.dim, fontSize:8 });
  txt(sl, 'CPA R$161', 7.6, y+1.25, 1.9, 0.25, { color:C.muted, fontSize:9 });

  // Insight cards
  const inY = 3.45;
  // Sem deduplicação (red)
  card(sl, 0.4, inY, 4.5, 1.0, C.surface);
  rect(sl, 0.4, inY, 4.5, 0.06, C.red);
  txt(sl, '⚠  Sem deduplicação', 0.55, inY+0.1, 4.0, 0.28, { color:C.red, fontSize:11, bold:true });
  txt(sl, '730 conversões "somadas"  ·  CPA R$85 aparente (errado)', 0.55, inY+0.4, 4.1, 0.45, { color:C.muted, fontSize:10 });

  // Com CM360 (teal)
  card(sl, 5.1, inY, 4.5, 1.0, C.surface);
  rect(sl, 5.1, inY, 4.5, 0.06, C.teal);
  txt(sl, '✓  Com CM360', 5.25, inY+0.1, 4.0, 0.28, { color:C.teal, fontSize:11, bold:true });
  txt(sl, '310 conversões reais  ·  CPA R$161 confiável (decisão correta)', 5.25, inY+0.4, 4.1, 0.45, { color:C.muted, fontSize:10 });

  footer(sl, 'Deduplicação na Prática', 5);
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 06 — O QUE É O CM360
// ─────────────────────────────────────────────────────────────────────────────
{
  const sl = addSlide('CONTENT', 'Contexto');
  txt(sl, 'Contexto de mercado', 0.5, 0.35, 9, 0.25, { color:C.dim, fontSize:9 });
  txt(sl, 'O que é o CM360', 0.5, 0.65, 9, 0.45, { color:C.white, fontSize:24, bold:true });

  // Left col: list
  const leftW = 4.2;
  txt(sl, 'O que registra', 0.5, 1.25, leftW, 0.3, { color:C.teal, fontSize:11, bold:true });
  const items = [
    'Impressões e cliques de cada canal',
    'Conversões deduplicadas (Floodlight)',
    'View-through e click-through',
    'Cross-device e cross-channel paths',
    'Dados de frequência e alcance unificado',
  ];
  items.forEach((item, i) => {
    txt(sl, `• ${item}`, 0.5, 1.6+i*0.42, leftW, 0.38, { color:C.muted, fontSize:11, lineSpacingMultiple:1.3 });
  });

  // Right col: 3 cards
  const rcards = [
    { icon:'◆', title:'Floodlight', body:'Tag própria que captura conversões em qualquer canal, sem depender da plataforma.', color:C.teal },
    { icon:'▣', title:'Relatório unificado', body:'Um único painel com Display, Search e Social — sem planilhas coladas.', color:C.blue },
    { icon:'▤', title:'Dados do anunciante', body:'A conta é do anunciante. Troca de agência não perde histórico.', color:C.violet },
  ];
  const rx=5.0, rcw=4.6, rch=1.1, rgy=0.18;
  rcards.forEach((c, i) => {
    const ry=1.2+i*(rch+rgy);
    card(sl, rx, ry, rcw, rch, C.surface);
    txt(sl, c.icon, rx+0.15, ry+0.1, 0.4, 0.4, { fontSize:16, color:c.color });
    txt(sl, c.title, rx+0.65, ry+0.1, rcw-0.8, 0.28, { color:c.color, fontSize:11, bold:true });
    txt(sl, c.body, rx+0.65, ry+0.42, rcw-0.8, 0.55, { color:C.muted, fontSize:9.5, lineSpacingMultiple:1.3 });
  });

  footer(sl, 'O que é o CM360', 6);
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 07 — SEÇÃO 02 DIVIDER
// ─────────────────────────────────────────────────────────────────────────────
sectionDivider('CM360 vs FT/Innovid', '02', 'CM360 vs Flashtalking / Innovid',
  'Quando usar cada um — e o que você perde sem CM360', 7);

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 08 — FT/INNOVID CONTEXTO
// ─────────────────────────────────────────────────────────────────────────────
{
  const sl = addSlide('CONTENT', 'CM360 vs FT/Innovid');
  txt(sl, 'CM360 vs Flashtalking / Innovid', 0.5, 0.35, 9, 0.25, { color:C.dim, fontSize:9 });
  txt(sl, 'Flashtalking e Innovid: onde estão e o que bloqueiam', 0.5, 0.65, 9, 0.45, { color:C.white, fontSize:22, bold:true });

  // Left: 2 info cards
  const cards2 = [
    { title:'Mesma empresa', body:'Em 2023 Publicis adquiriu a Flashtalking. Innovid permanece independente mas com foco em CTV/streaming.' },
    { title:'Forte em CTV / DOOH', body:'Ambas cresceram em connected TV e mídia digital-out-of-home — território onde o CM360 ainda é secundário.' },
  ];
  const lw=4.2, lch=1.35, lgy=0.2;
  cards2.forEach((c, i) => {
    const ly=1.25+i*(lch+lgy);
    card(sl, 0.5, ly, lw, lch, C.surface);
    txt(sl, c.title, 0.65, ly+0.12, lw-0.3, 0.28, { color:C.blue, fontSize:11, bold:true });
    txt(sl, c.body, 0.65, ly+0.45, lw-0.3, 0.75, { color:C.muted, fontSize:9.5, lineSpacingMultiple:1.4 });
  });

  // Right: 3 warning cards
  const warnings = [
    { icon:'✗', label:'X (Twitter) bloqueado', body:'FT e Innovid não rastreiam X. Se você roda X Ads, perde deduplicação.' },
    { icon:'✗', label:'Pinterest bloqueado', body:'Pinterest não abre o pixel de FT. Conversões ficam isoladas.' },
    { icon:'✗', label:'Sem Floodlight nativo', body:'Sem a tag CM360, DV360 e SA360 perdem os sinais de bidding mais ricos.' },
  ];
  const rw=4.6, rch=1.0, rgy=0.2, rx=5.0;
  warnings.forEach((w, i) => {
    const ry=1.25+i*(rch+rgy);
    card(sl, rx, ry, rw, rch, C.surface);
    rect(sl, rx, ry, rw, 0.06, C.red);
    txt(sl, w.icon+' '+w.label, rx+0.15, ry+0.12, rw-0.3, 0.28, { color:C.red, fontSize:10, bold:true });
    txt(sl, w.body, rx+0.15, ry+0.45, rw-0.3, 0.45, { color:C.muted, fontSize:9, lineSpacingMultiple:1.3 });
  });

  footer(sl, 'Flashtalking e Innovid: Contexto', 8);
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 09 — CASO REAL: KWAI × FT/INNOVID
// ─────────────────────────────────────────────────────────────────────────────
{
  const sl = addSlide('CONTENT', 'CM360 vs FT/Innovid');
  txt(sl, 'CM360 vs Flashtalking / Innovid', 0.5, 0.35, 9, 0.25, { color:C.dim, fontSize:9 });
  txt(sl, 'Caso real: Kwai × FT/Innovid — discrepância de dados', 0.5, 0.65, 9, 0.45, { color:C.white, fontSize:22, bold:true });

  // ── Contexto (top banner) ────────────────────────────────────────────────
  card(sl, 0.5, 1.2, 9.0, 0.72, C.surface);
  rect(sl, 0.5, 1.2, 9.0, 0.06, C.violet);
  txt(sl, 'Campanha ativa no Kwai (formato EyeMax-Flow, in-feed video 10s) com contadores Innovid/FT implementados pela equipe de mídia.', 0.65, 1.3, 8.7, 0.5, { color:C.muted, fontSize:9.5, lineSpacingMultiple:1.4 });

  // ── Numbers row ──────────────────────────────────────────────────────────
  const numCards = [
    { label:'FT · Ads Requested', val:'17.387.809', sub:'soma 3 placements', color:C.red },
    { label:'Kwai · Impressões', val:'14.573.933', sub:'plataforma de mídia', color:C.teal },
    { label:'Discrepância', val:'+19,3%', sub:'FT acima do Kwai', color:C.yellow },
    { label:'FT · Cliques', val:'830.483', sub:'igual ao Kwai — campo correto', color:C.blue },
  ];
  const nw=2.1, nh=1.1, ngx=0.17, nStartX=0.5, nStartY=2.1;
  numCards.forEach((n, i) => {
    const nx=nStartX+i*(nw+ngx);
    card(sl, nx, nStartY, nw, nh, C.surface);
    rect(sl, nx, nStartY, nw, 0.06, n.color);
    txt(sl, n.val, nx+0.1, nStartY+0.12, nw-0.2, 0.42, { color:n.color, fontSize:19, bold:true });
    txt(sl, n.label, nx+0.1, nStartY+0.56, nw-0.2, 0.25, { color:C.white, fontSize:8.5, bold:true });
    txt(sl, n.sub, nx+0.1, nStartY+0.8, nw-0.2, 0.22, { color:C.muted, fontSize:8 });
  });

  // ── Diagnóstico (2 cards bottom) ─────────────────────────────────────────
  const diags = [
    {
      icon:'◉',
      title:'Por que a FT conta mais',
      body:'FT/Innovid registra a impressão no momento do ad request (servidor). O Kwai só conta após renderização no app. Em scroll rápido e conexões lentas, parte dos ads nunca aparece na tela — mas a FT já contabilizou.',
      color:C.red,
    },
    {
      icon:'◈',
      title:'O que o CM360 resolve',
      body:'Com Floodlight como counter, o dado vem de uma única fonte agnóstica — independente de o ad server ser Kwai, Meta ou qualquer DSP. Sem dupla contagem, sem reconciliação manual, sem dúvida sobre qual número é o certo.',
      color:C.teal,
    },
  ];
  const dw=4.4, dh=1.3, dgx=0.2, dStartX=0.5, dStartY=3.4;
  diags.forEach((d, i) => {
    const dx=dStartX+i*(dw+dgx);
    card(sl, dx, dStartY, dw, dh, C.surface);
    rect(sl, dx, dStartY, dw, 0.06, d.color);
    txt(sl, d.icon+' '+d.title, dx+0.15, dStartY+0.12, dw-0.3, 0.28, { color:d.color, fontSize:10.5, bold:true });
    txt(sl, d.body, dx+0.15, dStartY+0.46, dw-0.3, 0.75, { color:C.muted, fontSize:9, lineSpacingMultiple:1.35 });
  });

  footer(sl, 'Caso Real: Kwai × FT/Innovid', 9);
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 10 — COMPARATIVO TABLE
// ─────────────────────────────────────────────────────────────────────────────
{
  const sl = addSlide('CONTENT', 'CM360 vs FT/Innovid');
  txt(sl, 'CM360 vs Flashtalking / Innovid', 0.5, 0.35, 9, 0.25, { color:C.dim, fontSize:9 });
  txt(sl, 'Comparativo de capacidades', 0.5, 0.65, 9, 0.45, { color:C.white, fontSize:22, bold:true });

  const rows = [
    ['Critério',           'CM360',       'Flashtalking',   'Innovid'],
    ['X (Twitter)',        '✓',           '✗',              '✗'],
    ['Pinterest',          '✓',           '✗',              'parcial'],
    ['DV360 / SA360',      'nativo',      'limitado',       'limitado'],
    ['Floodlight',         'nativo',      '✗',              '✗'],
    ['Remarketing listas', '✓',           '✗',              '✗'],
    ['Bidding signals',    '✓',           '✗',              '✗'],
    ['Deduplicação',       '✓',           'parcial',        'parcial'],
    ['Presença BR',        'forte',       'média',          'baixa'],
    ['Conta do anunciante','✓',           '✗',              '✗'],
  ];

  const colW = [2.6, 2.1, 2.1, 2.1];
  const rowH = 0.38;
  const startX = 0.4, startY = 1.3;

  rows.forEach((row, ri) => {
    const y = startY + ri*rowH;
    const isHeader = ri === 0;
    const bgColor = isHeader ? C.bg3 : (ri%2===0 ? C.bg2 : C.bg);

    let x = startX;
    row.forEach((cell, ci) => {
      sl.addShape(pres.ShapeType.rect, { x, y, w:colW[ci], h:rowH, fill:{color:bgColor}, line:{color:C.border,pt:0.5} });
      let color = C.muted;
      if (isHeader) color = C.white;
      else if (ci===0) color = C.muted;
      else if (cell==='✓' || cell==='nativo' || cell==='forte') color = C.green;
      else if (cell==='✗') color = C.red;
      else if (cell==='parcial' || cell==='limitado' || cell==='média') color = C.yellow;
      else if (cell==='baixa') color = C.red;
      txt(sl, cell, x+0.08, y, colW[ci]-0.16, rowH, { color, fontSize:isHeader?10:9, bold:isHeader, valign:'middle' });
      x += colW[ci];
    });
  });

  footer(sl, 'Comparativo CM360 vs FT / Innovid', 10);
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 10 — REGRA PRÁTICA
// ─────────────────────────────────────────────────────────────────────────────
{
  const sl = addSlide('CONTENT', 'CM360 vs FT/Innovid');
  txt(sl, 'CM360 vs Flashtalking / Innovid', 0.5, 0.35, 9, 0.25, { color:C.dim, fontSize:9 });
  txt(sl, 'A regra prática para o mercado brasileiro', 0.5, 0.65, 9, 0.45, { color:C.white, fontSize:22, bold:true });

  txt(sl, 'Se a operação roda X, Pinterest ou depende de DV360/SA360 — CM360 é insubstituível.', 0.5, 1.2, 9, 0.4, { color:C.muted, fontSize:12 });

  const rcards = [
    { title:'Cobertura', body:'X e Pinterest só convertem com CM360. FT bloqueia ambos.', color:C.teal },
    { title:'Integração nativa', body:'DV360 e SA360 leem Floodlight direto — sem CM360, perde o sinal de bid.', color:C.blue },
    { title:'Dados do anunciante', body:'Com CM360, o histórico fica com você — não com a agência.', color:C.violet },
  ];
  const cw=2.9, ch=2.5, gx=0.25, startX=0.5, startY=1.8;
  rcards.forEach((c, i) => {
    const x=startX+i*(cw+gx);
    card(sl, x, startY, cw, ch, C.surface);
    txt(sl, c.title, x+0.2, startY+0.2, cw-0.4, 0.35, { color:c.color, fontSize:14, bold:true });
    txt(sl, c.body, x+0.2, startY+0.65, cw-0.4, 1.6, { color:C.muted, fontSize:11, lineSpacingMultiple:1.4 });
  });

  footer(sl, 'Regra Prática', 11);
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 12 — SEÇÃO 03 DIVIDER
// ─────────────────────────────────────────────────────────────────────────────
sectionDivider('Ecossistema GMP', '03', 'O ecossistema GMP',
  'Como CM360, DV360, SA360 e GA4 se conectam', 12);

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 12 — DV360
// ─────────────────────────────────────────────────────────────────────────────
{
  const sl = addSlide('CONTENT', 'Ecossistema GMP');
  txt(sl, 'O ecossistema GMP', 0.5, 0.35, 9, 0.25, { color:C.dim, fontSize:9 });
  txt(sl, 'DV360 — Display & Video 360', 0.5, 0.65, 9, 0.45, { color:C.white, fontSize:24, bold:true });

  txt(sl, 'O que acessa via CM360', 0.5, 1.25, 4.0, 0.3, { color:C.blue, fontSize:11, bold:true });
  const items = [
    'Inventário premium (YouTube, Gmail, Display)',
    'Audiências de remarketing Floodlight',
    'Bidding otimizado por conversão real',
    'Relatório unificado com Search',
    'Brand safety e viewability integrados',
  ];
  items.forEach((item, i) => {
    txt(sl, `• ${item}`, 0.5, 1.6+i*0.42, 4.2, 0.38, { color:C.muted, fontSize:11, lineSpacingMultiple:1.3 });
  });

  const rcards = [
    { title:'Inventário premium', body:'YouTube, Gmail, parceiros Google e DSPs de terceiros — tudo em um único lugar.', color:C.blue },
    { title:'Bidding inteligente', body:'Floodlight alimenta os algoritmos de DV360 com sinal de conversão real.', color:C.teal },
    { title:'Audiências', body:'Listas de remarketing criadas no CM360 e aplicadas diretamente no DV360.', color:C.violet },
  ];
  const rw=4.6, rch=1.1, rgy=0.18, rx=5.0;
  rcards.forEach((c, i) => {
    const ry=1.2+i*(rch+rgy);
    card(sl, rx, ry, rw, rch, C.surface);
    txt(sl, c.title, rx+0.15, ry+0.1, rw-0.3, 0.28, { color:c.color, fontSize:11, bold:true });
    txt(sl, c.body, rx+0.15, ry+0.42, rw-0.3, 0.55, { color:C.muted, fontSize:9.5, lineSpacingMultiple:1.3 });
  });

  footer(sl, 'DV360', 13);
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 13 — SA360
// ─────────────────────────────────────────────────────────────────────────────
{
  const sl = addSlide('CONTENT', 'Ecossistema GMP');
  txt(sl, 'O ecossistema GMP', 0.5, 0.35, 9, 0.25, { color:C.dim, fontSize:9 });
  txt(sl, 'SA360 — Search Ads 360', 0.5, 0.65, 9, 0.45, { color:C.white, fontSize:24, bold:true });

  txt(sl, 'O que conecta ao CM360', 0.5, 1.25, 4.0, 0.3, { color:C.violet, fontSize:11, bold:true });
  const items = [
    'Google Ads + Microsoft Ads em um painel',
    'Floodlight como sinal de conversão cross-canal',
    'Bidding unificado por ROAS ou CPA real',
    'Relatórios cruzados com Display (via CM360)',
    'Atribuição data-driven com sinal Floodlight',
  ];
  items.forEach((item, i) => {
    txt(sl, `• ${item}`, 0.5, 1.6+i*0.42, 4.2, 0.38, { color:C.muted, fontSize:11, lineSpacingMultiple:1.3 });
  });

  const rcards = [
    { title:'Google + Microsoft', body:'SA360 gerencia buscas em ambas as plataformas com um único workflow.', color:C.violet },
    { title:'Floodlight cross-canal', body:'O mesmo Floodlight alimenta DV360 e SA360 — sinal unificado.', color:C.teal },
    { title:'Eficiência', body:'Bidding por CPA real, não por conversões duplicadas de cada canal.', color:C.blue },
  ];
  const rw=4.6, rch=1.1, rgy=0.18, rx=5.0;
  rcards.forEach((c, i) => {
    const ry=1.2+i*(rch+rgy);
    card(sl, rx, ry, rw, rch, C.surface);
    txt(sl, c.title, rx+0.15, ry+0.1, rw-0.3, 0.28, { color:c.color, fontSize:11, bold:true });
    txt(sl, c.body, rx+0.15, ry+0.42, rw-0.3, 0.55, { color:C.muted, fontSize:9.5, lineSpacingMultiple:1.3 });
  });

  footer(sl, 'SA360', 14);
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 14 — FLOODLIGHT ELO CENTRAL
// ─────────────────────────────────────────────────────────────────────────────
{
  const sl = addSlide('CONTENT', 'Ecossistema GMP');
  txt(sl, 'O ecossistema GMP', 0.5, 0.35, 9, 0.25, { color:C.dim, fontSize:9 });
  txt(sl, 'Floodlight — o elo central do GMP', 0.5, 0.65, 9, 0.45, { color:C.white, fontSize:24, bold:true });

  const hubs = [
    { title:'CM360', body:'Registra e deduplica todas as conversões. Fonte de verdade.', color:C.teal, x:0.5 },
    { title:'DV360', body:'Recebe audiências e sinais de bid do Floodlight.', color:C.blue, x:3.65 },
    { title:'SA360', body:'Usa Floodlight para bid e atribuição em Search.', color:C.violet, x:6.8 },
  ];
  const cw=2.8, ch=1.5, y=1.3;
  hubs.forEach(h => {
    card(sl, h.x, y, cw, ch, C.surface);
    txt(sl, h.title, h.x+0.15, y+0.12, cw-0.3, 0.32, { color:h.color, fontSize:14, bold:true });
    txt(sl, h.body, h.x+0.15, y+0.5, cw-0.3, 0.8, { color:C.muted, fontSize:10, lineSpacingMultiple:1.4 });
  });

  // Connecting arrows
  txt(sl, '→', 3.35, 1.85, 0.4, 0.4, { color:C.dim, fontSize:16, bold:true });
  txt(sl, '→', 6.5, 1.85, 0.4, 0.4, { color:C.dim, fontSize:16, bold:true });

  // Yellow insight card
  card(sl, 0.5, 3.1, 9.0, 1.1, C.surface);
  rect(sl, 0.5, 3.1, 9.0, 0.06, C.yellow);
  txt(sl, '» Insight-chave', 0.7, 3.2, 3, 0.3, { color:C.yellow, fontSize:11, bold:true });
  txt(sl, 'Sem Floodlight (CM360), DV360 e SA360 otimizam com base em conversões de plataforma — que podem ser duplicadas. Com Floodlight, o algoritmo recebe o sinal limpo e a performance real sobe.', 0.7, 3.5, 8.5, 0.6, { color:C.muted, fontSize:10, lineSpacingMultiple:1.4 });

  footer(sl, 'Floodlight — Elo Central', 15);
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 16 — SEÇÃO 04 DIVIDER
// ─────────────────────────────────────────────────────────────────────────────
sectionDivider('Stacks e Perfis', '04', 'Stacks e perfis de operação',
  'Qual combinação faz sentido para cada anunciante', 16);

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 16 — TRÊS NÍVEIS DE STACK
// ─────────────────────────────────────────────────────────────────────────────
{
  const sl = addSlide('CONTENT', 'Stacks e Perfis');
  txt(sl, 'Stacks e perfis de operação', 0.5, 0.35, 9, 0.25, { color:C.dim, fontSize:9 });
  txt(sl, 'Três níveis de stack GMP', 0.5, 0.65, 9, 0.45, { color:C.white, fontSize:24, bold:true });

  const stacks = [
    { level:'Nível 1', label:'CM360 Solo', desc:'Tracking unificado, Floodlight e relatórios cross-canal. Ponto de partida.', tools:'CM360', color:C.teal, badge:null },
    { level:'Nível 2', label:'CM360 + DV360', desc:'Soma o inventário premium e bidding inteligente por Display e Video.', tools:'CM360 + DV360', color:C.blue, badge:'Mais adotado' },
    { level:'Nível 3', label:'Stack Completa', desc:'CM360 + DV360 + SA360: controle total de Display, Video e Search em um ecossistema.', tools:'CM360 + DV360 + SA360', color:C.violet, badge:null },
  ];

  const cw=2.8, ch=3.2, gx=0.25, startX=0.5, startY=1.2;
  stacks.forEach((s, i) => {
    const x=startX+i*(cw+gx);
    card(sl, x, startY, cw, ch, C.surface);
    // Top accent bar
    rect(sl, x, startY, cw, 0.08, s.color);
    txt(sl, s.level, x+0.15, startY+0.18, cw-0.3, 0.28, { color:s.color, fontSize:11, bold:true });
    txt(sl, s.label, x+0.15, startY+0.5, cw-0.3, 0.38, { color:C.white, fontSize:14, bold:true });
    txt(sl, s.tools, x+0.15, startY+0.95, cw-0.3, 0.3, { color:s.color, fontSize:10 });
    txt(sl, s.desc, x+0.15, startY+1.35, cw-0.3, 1.5, { color:C.muted, fontSize:10, lineSpacingMultiple:1.4 });
    if (s.badge) {
      sl.addShape(pres.ShapeType.roundRect, { x:x+0.1, y:startY+2.75, w:cw-0.2, h:0.28, fill:{color:s.color}, line:{color:s.color,pt:1}, rectRadius:0.1 });
      txt(sl, s.badge, x+0.1, startY+2.75, cw-0.2, 0.28, { color:s.color, fontSize:9, bold:true, align:'center', valign:'middle' });
    }
  });

  footer(sl, 'Três Níveis de Stack', 17);
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 17 — MODELO DE CONTA
// ─────────────────────────────────────────────────────────────────────────────
{
  const sl = addSlide('CONTENT', 'Stacks e Perfis');
  txt(sl, 'Stacks e perfis de operação', 0.5, 0.35, 9, 0.25, { color:C.dim, fontSize:9 });
  txt(sl, 'Modelo de conta: a decisão mais importante', 0.5, 0.65, 9, 0.45, { color:C.white, fontSize:22, bold:true });
  txt(sl, 'Como a conta é estruturada define quem fica com os dados quando o contrato termina.', 0.5, 1.15, 9, 0.3, { color:C.muted, fontSize:11 });

  const models = [
    {
      title:'✅  Conta patrocinada',
      sub:'(Recomendado)',
      items:['Conta no CNPJ do anunciante','Dados históricos ficam com o anunciante','Troca de agência sem perda de dados','Auditoria e controle independente'],
      color:C.green, x:0.5,
    },
    {
      title:'⚠   Conta independente da agência',
      sub:'(Risco)',
      items:['Dados ficam com a agência','Troca de agência = histórico zerado','Sem acesso direto ao anunciante','Sem possibilidade de auditoria'],
      color:C.red, x:5.1,
    },
  ];

  models.forEach(m => {
    const ch=3.2;
    card(sl, m.x, 1.6, 4.4, ch, C.surface);
    rect(sl, m.x, 1.6, 4.4, 0.08, m.color);
    txt(sl, m.title, m.x+0.2, 1.75, 4.1, 0.32, { color:m.color, fontSize:12, bold:true });
    txt(sl, m.sub, m.x+0.2, 2.1, 4.1, 0.25, { color:C.dim, fontSize:9 });
    m.items.forEach((item, i) => {
      txt(sl, `• ${item}`, m.x+0.2, 2.4+i*0.42, 4.0, 0.38, { color:C.muted, fontSize:10, lineSpacingMultiple:1.3 });
    });
  });

  footer(sl, 'Modelo de Conta', 18);
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 18 — PERFIS DE OPERAÇÃO
// ─────────────────────────────────────────────────────────────────────────────
{
  const sl = addSlide('CONTENT', 'Stacks e Perfis');
  txt(sl, 'Stacks e perfis de operação', 0.5, 0.35, 9, 0.25, { color:C.dim, fontSize:9 });
  txt(sl, 'Perfis de operação — quem usa CM360 e por quê', 0.5, 0.65, 9, 0.45, { color:C.white, fontSize:22, bold:true });

  const perfis = [
    { title:'Anunciante com múltiplas agências', body:'CM360 centraliza tracking e elimina sobreposição de dados entre as agências. Relatório consolidado único.', color:C.teal },
    { title:'Agência buscando diferenciação', body:'Oferecer CM360 como serviço posiciona a agência como parceira estratégica, não só executora de mídia.', color:C.blue },
    { title:'Operação migrando in-house', body:'CM360 garante portabilidade dos dados — histórico, audiências e relatórios ficam com o anunciante.', color:C.violet },
  ];

  const cw=2.8, ch=2.8, gx=0.25, startX=0.5, startY=1.3;
  perfis.forEach((p, i) => {
    const x=startX+i*(cw+gx);
    card(sl, x, startY, cw, ch, C.surface);
    txt(sl, p.title, x+0.15, startY+0.2, cw-0.3, 0.55, { color:p.color, fontSize:11, bold:true, lineSpacingMultiple:1.3 });
    txt(sl, p.body, x+0.15, startY+0.85, cw-0.3, 1.7, { color:C.muted, fontSize:10, lineSpacingMultiple:1.4 });
  });

  footer(sl, 'Perfis de Operação', 19);
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 19 — POSICIONAMENTO STORMX
// ─────────────────────────────────────────────────────────────────────────────
{
  const sl = addSlide('CONTENT', 'Stacks e Perfis');
  txt(sl, 'Stacks e perfis de operação', 0.5, 0.35, 9, 0.25, { color:C.dim, fontSize:9 });
  txt(sl, 'Posicionamento StormX no GMP', 0.5, 0.65, 9, 0.45, { color:C.white, fontSize:24, bold:true });

  const leftCards = [
    { title:'Especialização GMP', body:'Foco total no ecossistema Google Marketing Platform — CM360, DV360, SA360 e GA4.' },
    { title:'Setup correto', body:'Configuração de Floodlight, hierarquia de conta e integrações desde o início.' },
    { title:'Operação e estratégia', body:'Gestão do dia a dia com visão de negócio — não só execução técnica.' },
  ];
  const rightCards = [
    { title:'Dados como ativo', body:'Estruturamos dados para que fiquem com o anunciante — não presos na ferramenta.' },
    { title:'Auditoria e migração', body:'Diagnóstico de contas existentes e migração sem perda de histórico.' },
    { title:'Capacitação', body:'Treinamentos internos para equipes de marketing e comercial.' },
  ];

  const cw=4.2, ch=1.1, gx=0.3, gy=0.18;
  const startY=1.3;
  leftCards.forEach((c, i) => {
    card(sl, 0.5, startY+i*(ch+gy), cw, ch, C.surface);
    txt(sl, c.title, 0.65, startY+i*(ch+gy)+0.1, cw-0.3, 0.28, { color:C.teal, fontSize:11, bold:true });
    txt(sl, c.body, 0.65, startY+i*(ch+gy)+0.42, cw-0.3, 0.55, { color:C.muted, fontSize:9.5, lineSpacingMultiple:1.3 });
  });
  rightCards.forEach((c, i) => {
    card(sl, 5.0, startY+i*(ch+gy), cw, ch, C.surface);
    txt(sl, c.title, 5.15, startY+i*(ch+gy)+0.1, cw-0.3, 0.28, { color:C.blue, fontSize:11, bold:true });
    txt(sl, c.body, 5.15, startY+i*(ch+gy)+0.42, cw-0.3, 0.55, { color:C.muted, fontSize:9.5, lineSpacingMultiple:1.3 });
  });

  footer(sl, 'Posicionamento StormX', 20);
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 21 — SEÇÃO 05 DIVIDER
// ─────────────────────────────────────────────────────────────────────────────
sectionDivider('Objeções Executivas', '05', 'Objeções executivas',
  'As dúvidas mais comuns — com resposta', 21);

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 22 — OBJEÇÕES: CUSTO & CONTRATO GLOBAL
// ─────────────────────────────────────────────────────────────────────────────
{
  const sl = addSlide('CONTENT', 'Objeções Executivas');
  txt(sl, 'Objeções executivas', 0.5, 0.35, 9, 0.25, { color:C.dim, fontSize:9 });
  txt(sl, 'As objeções mais difíceis — e como endereçá-las', 0.5, 0.65, 9, 0.45, { color:C.white, fontSize:22, bold:true });

  // Objeção 1: Custo / TCO
  card(sl, 0.5, 1.25, 9.0, 1.55, C.surface);
  rect(sl, 0.5, 1.25, 9.0, 0.06, C.yellow);
  txt(sl, 'Q: "O CM360 é mais caro — FT/Innovid já está pago no pacote."', 0.65, 1.37, 8.5, 0.32, { color:C.yellow, fontSize:11, bold:true });
  txt(sl, 'O CPM de ad serving isolado não conta a história completa. FT/IN cobra por impressão em cada plataforma; com DV360 e Google Ads — que vocês já operam — o CM360 vem no bundle GMP, diluindo o custo marginal. Some o custo de reconciliação manual de dados entre plataformas (horas de analista), o risco de dupla contagem de conversões e a ausência de um único ponto de verdade: o TCO real costuma favorecer o CM360.', 0.65, 1.74, 8.5, 0.95, { color:C.muted, fontSize:9.5, lineSpacingMultiple:1.4 });

  // Objeção 2: Contrato global
  card(sl, 0.5, 3.0, 9.0, 1.55, C.surface);
  rect(sl, 0.5, 3.0, 9.0, 0.06, C.violet);
  txt(sl, 'Q: "Temos contrato global com FT/Innovid — a decisão não é local."', 0.65, 3.12, 8.5, 0.32, { color:C.violet, fontSize:11, bold:true });
  txt(sl, 'Esta é a objeção mais estrutural, e honestidade é o melhor caminho: a decisão final não está na mesa do time local. O que podemos fazer agora é plantar a semente — documentar o caso técnico e financeiro, mapear os ganhos reais (caso Kwai é um exemplo concreto) e posicionar a discussão para o próximo ciclo de revisão de contratos. Uma vitória local bem documentada vira argumento global.', 0.65, 3.49, 8.5, 0.95, { color:C.muted, fontSize:9.5, lineSpacingMultiple:1.4 });

  footer(sl, 'Objeções: Custo & Contrato Global', 22);
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 23 — OBJEÇÃO: DIRETOR SEM PERFIL TÉCNICO
// ─────────────────────────────────────────────────────────────────────────────
{
  const sl = addSlide('CONTENT', 'Objeções Executivas');
  txt(sl, 'Objeções executivas', 0.5, 0.35, 9, 0.25, { color:C.dim, fontSize:9 });
  txt(sl, 'Convencer quem decide sem saber o que é ad server', 0.5, 0.65, 9, 0.45, { color:C.white, fontSize:22, bold:true });

  // Contexto
  card(sl, 0.5, 1.2, 9.0, 0.72, C.surface);
  rect(sl, 0.5, 1.2, 9.0, 0.06, C.red);
  txt(sl, 'O decisor tem visão de negócio, não de tecnologia. Slides técnicos não vendem — slides que mostram risco e controle, sim.', 0.65, 1.3, 8.5, 0.5, { color:C.muted, fontSize:9.5, lineSpacingMultiple:1.4 });

  // 2 cards de abordagem
  const abordagens = [
    {
      icon:'◎',
      title:'O argumento certo para esse perfil',
      body:'Evite falar de tags, impressões ou CPM. Fale em: "hoje dependemos do número que o fornecedor nos dá — sem forma de auditar". Depois mostre o caso Kwai: 19% de discrepância, R$ pagos por ads que nunca apareceram na tela. Risco financeiro é uma linguagem que qualquer diretor entende.',
      color:C.teal,
    },
    {
      icon:'◈',
      title:'Dois slides que ele consegue reproduzir',
      body:'Prepare um one-pager para ele usar internamente: (1) "Problema: pagamos por impressões que não são entregues" com o número do caso real; (2) "Solução: fonte única de dados independente do fornecedor". Ele não precisa saber o que é CM360 — precisa conseguir explicar o problema.',
      color:C.blue,
    },
  ];
  const dw=4.4, dh=1.85, dgx=0.2, dStartX=0.5, dStartY=2.1;
  abordagens.forEach((d, i) => {
    const dx=dStartX+i*(dw+dgx);
    card(sl, dx, dStartY, dw, dh, C.surface);
    rect(sl, dx, dStartY, dw, 0.06, d.color);
    txt(sl, d.icon+' '+d.title, dx+0.15, dStartY+0.12, dw-0.3, 0.3, { color:d.color, fontSize:10.5, bold:true });
    txt(sl, d.body, dx+0.15, dStartY+0.5, dw-0.3, 1.25, { color:C.muted, fontSize:9, lineSpacingMultiple:1.35 });
  });

  footer(sl, 'Objeção: Decisor Não-Técnico', 23);
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 24 — SEÇÃO 06 DIVIDER
// ─────────────────────────────────────────────────────────────────────────────
sectionDivider('Como a StormX Implementa', '06', 'Como a StormX implementa',
  'Do diagnóstico ao go-live em 30 dias', 24);

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 25 — TIMELINE
// ─────────────────────────────────────────────────────────────────────────────
{
  const sl = addSlide('CONTENT', 'Como a StormX Implementa');
  txt(sl, 'Como a StormX implementa', 0.5, 0.35, 9, 0.25, { color:C.dim, fontSize:9 });
  txt(sl, 'Timeline de implementação — 30 dias', 0.5, 0.65, 9, 0.45, { color:C.white, fontSize:22, bold:true });

  const steps = [
    { week:'Semanas 1–2', label:'Auditoria', desc:'Diagnóstico de contas existentes, levantamento de Floodlights e mapeamento de integrações.', color:C.teal },
    { week:'Semana 3',    label:'Floodlights', desc:'Implementação das tags CM360 em produção. Validação com parceiro de verificação.', color:C.blue },
    { week:'Semana 4',    label:'Capacitação', desc:'Treinamento da equipe interna. Configuração de relatórios e dashboards.', color:C.violet },
    { week:'Go-live',     label:'Operação',    desc:'Primeira campanha rodando com CM360. Suporte StormX nas primeiras semanas.', color:C.green },
  ];

  const cw=2.1, ch=2.2, gx=0.2, startX=0.5, startY=1.25;
  steps.forEach((s, i) => {
    const x=startX+i*(cw+gx);
    card(sl, x, startY, cw, ch, C.surface);
    rect(sl, x, startY, cw, 0.08, s.color);
    // Number circle
    sl.addShape(pres.ShapeType.ellipse, { x:x+cw/2-0.25, y:startY+0.18, w:0.5, h:0.5, fill:{color:s.color}, line:{color:s.color,pt:1} });
    txt(sl, String(i+1), x+cw/2-0.25, startY+0.18, 0.5, 0.5, { color:s.color, fontSize:14, bold:true, align:'center', valign:'middle' });
    txt(sl, s.week, x+0.1, startY+0.78, cw-0.2, 0.25, { color:s.color, fontSize:9, bold:true });
    txt(sl, s.label, x+0.1, startY+1.05, cw-0.2, 0.3, { color:C.white, fontSize:12, bold:true });
    txt(sl, s.desc, x+0.1, startY+1.4, cw-0.2, 0.7, { color:C.muted, fontSize:9, lineSpacingMultiple:1.3 });
  });

  // Prereqs card
  card(sl, 0.5, 3.6, 9.0, 0.85, C.surface);
  txt(sl, '■  Pré-requisitos', 0.7, 3.72, 2, 0.28, { color:C.teal, fontSize:10, bold:true });
  txt(sl, 'Acesso ao Google Marketing Platform · Contrato de licença CM360 · Equipe técnica do anunciante ou agência parceira StormX', 0.7, 4.0, 8.5, 0.35, { color:C.muted, fontSize:9.5, lineSpacingMultiple:1.3 });

  footer(sl, 'Timeline de Implementação', 25);
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 25 — FECHAMENTO
// ─────────────────────────────────────────────────────────────────────────────
{
  const sl = addSlide('COVER', 'Como a StormX Implementa');
  txt(sl, 'Próximos passos', 0.5, 0.4, 5.0, 0.3, { color:C.teal, fontSize:12, bold:true });
  txt(sl, 'Vamos começar?', 0.5, 0.75, 5.0, 0.6, { color:C.white, fontSize:28, bold:true });
  txt(sl, 'Quatro passos para sair do zero com CM360', 0.5, 1.4, 5.0, 0.3, { color:C.muted, fontSize:11 });

  const steps = [
    { n:'01', label:'Auditoria gratuita', desc:'30 min de diagnóstico da sua operação atual — sem compromisso.' },
    { n:'02', label:'Proposta técnica', desc:'Mapeamento de Floodlights e integrações necessárias para o seu perfil.' },
    { n:'03', label:'Kick-off', desc:'Setup de conta, hierarquia e primeiros Floodlights em produção.' },
    { n:'04', label:'Go-live', desc:'Primeira campanha com CM360 rodando — relatório unificado no ar.' },
  ];
  steps.forEach((s, i) => {
    txt(sl, `${s.n}  ${s.label}`, 0.5, 1.9+i*0.72, 4.8, 0.28, { color:C.white, fontSize:11, bold:true });
    txt(sl, s.desc, 0.75, 2.2+i*0.72, 4.5, 0.25, { color:C.muted, fontSize:9.5 });
  });

  // Right panel: contact
  card(sl, 5.7, 0.4, 3.9, 2.8, C.surface);
  txt(sl, 'StormX Data & Tech', 5.9, 0.6, 3.5, 0.3, { color:C.teal, fontSize:12, bold:true });
  txt(sl, 'Especialistas GMP no Brasil', 5.9, 0.95, 3.5, 0.25, { color:C.muted, fontSize:10 });
  txt(sl, 'felipe.lima@stormx.com.br', 5.9, 1.4, 3.5, 0.25, { color:C.blue, fontSize:10 });
  txt(sl, 'stormx.com.br', 5.9, 1.7, 3.5, 0.25, { color:C.blue, fontSize:10 });
  txt(sl, 'LinkedIn: StormX Data & Tech', 5.9, 2.0, 3.5, 0.25, { color:C.muted, fontSize:9.5 });

  // Auditoria card
  card(sl, 5.7, 3.4, 3.9, 1.5, C.bg3);
  sl.addShape(pres.ShapeType.roundRect, { x:5.7, y:3.4, w:3.9, h:1.5, fill:{color:'0D0D14'}, line:{color:C.teal,pt:2}, rectRadius:0.08 });
  txt(sl, '◎  Auditoria gratuita', 5.9, 3.55, 3.5, 0.3, { color:C.teal, fontSize:11, bold:true });
  txt(sl, 'Solicite sua auditoria de ad tech sem custo.\nDiagnóstico em até 48h.', 5.9, 3.9, 3.5, 0.75, { color:C.muted, fontSize:9.5, lineSpacingMultiple:1.4 });

  footer(sl, 'Fechamento', 26);
}

// ─────────────────────────────────────────────────────────────────────────────
// WRITE + APPLY THEME
// ─────────────────────────────────────────────────────────────────────────────
(async () => {
  await pres.writeFile({ fileName: OUT });
  console.log('PPTX written to', OUT);
  await applyTheme(OUT, THEME);
  console.log('Theme applied');
})();
