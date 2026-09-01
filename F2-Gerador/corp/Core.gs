// ============================================================
// NC Tool | Unilever BR x Grasp -- F2 v4 -- Arquivo 1: CORE
// Ambiente: PESSOAL (Backup)
// ============================================================

var SOURCE_ID      = '17vc4UfMz-o2Oz0unAnJlErhHd_2n34tvlFxFnPgTIok';
var CN_SOURCE_ID   = '144h_vGX9vBnxf1vENnsoseGGqt0pqxITuGuh72XbS-w';
var SPREADSHEET_ID = '1_6SEjmDdYvSkxoLwLLpqORitM-QxX5flBpF8LoSX8Lc';  // planilha principal (Corp)
var LISTAS = 'Dados';
var LOG    = '📋 Log';
var INICIO = '📋 Início';
var NROWS  = 50;

var ADMINS = ['felipe.lima@stormx.com.br','falssp@gmail.com'];

var FS_BLOCKED = ['carrossel','carroussel','carousel','caroussel','imagem','image','estatica','estática','static','staticimage','iab'];

var FORMULA_HEADERS = ['📋 CAMPAIGN NAME','📋 ADGROUP NAME','📋 AD NAME','📋 CN Code','📋 CN Code Ad','📋 Objective-Short','📋 Obj Otim-Short','✅ Status'];

function _isAdmin() {
  try { return ADMINS.indexOf(Session.getActiveUser().getEmail()) >= 0; } catch(e) { return false; }
}

// ============================================================
// PLATFORM CONFIG
// ============================================================
var _OBJ = [
  ['Awareness','Awa'],['Awareness/Consideration','AwaCons'],
  ['Consideration','Cons'],['Conversion','Conv'],
];

var _OBJ_OTIM = [
  ['Ad Recall','recal'],['App Event','apeve'],['Brand Consideration','brcon'],
  ['Call','calls'],['Catalog Sales','casal'],['Clicks','click'],
  ['Conversations','talks'],['Conversion','conve'],['Conversion Manual','macon'],
  ['Conversion Manual Revenue','marev'],['Conversion Search','secon'],
  ['Conversion Smart','smcon'],['Conversion Tik Tok Shop Clicks','ttscl'],
  ['Conversion Tik Tok Shop Checkouts','ttsch'],['Conversion Tik Tok Shop Purchase','ttspu'],
  ['Conversion Tik Tok Shop Revenue','ttsre'],['Conversions','conve'],
  ['Daily Reach','darea'],['Event','event'],['Impressions','impre'],
  ['Install','insta'],['Interaction','inter'],
  ['Interaction with the community Follow','focom'],
  ['Interaction with the community Page Visit','vicom'],
  ['Leads','leads'],['Link Clicks','licli'],['Manual Clicks','macli'],
  ['Manual Leads','malea'],['Manual Trafic','matra'],['Messages','messa'],
  ['Page View','pavie'],['Profile View','prvie'],['Pulse','pulse'],
  ['Reach','reach'],['Reach & Frequence','refre'],
  ['Reach & Frequence Non Skip','rknsk'],['Reach & Frequence Skip','rfski'],
  ['Reach Non Skip','rensk'],['Reach Skip','reski'],['Reminder','remin'],
  ['Revenue','reven'],['Search Clicks','secli'],['Search Trafic','setra'],
  ['Smart Clicks','smcli'],['Smart Leads','smlea'],['Smart Trafic','smtra'],
  ['Views 2 Seg','vi02s'],['Views 6 Seg','vi06s'],['Views 15 Seg','vi15s'],
  ['Views Conclusion','vicon'],['Views Non Skip','vinsk'],['Views Skip','viski'],
];

var _BUY_TYPE_GOOGLE = [
  ['CPA','CPA'],['CPC','CPC'],['CPI','CPI'],['CPL','CPL'],['CPM','CPM'],
  ['CPV','CPV'],['First-Impression','1stImp'],['Flat-Fee/Time-Based','Ffee'],
  ['vCPM','vCPM'],['Zero-cost','ZCost'],
];

function _short(pairs,name){ for(var i=0;i<pairs.length;i++) if(pairs[i][0]===name) return pairs[i][1]; return ''; }
function _names(pairs) { return pairs.map(function(p){return p[0];}); }
function _shorts(pairs){ return pairs.map(function(p){return p[1];}); }

// ============================================================
// MAPA DE COLUNAS DA ABA "Dados"
// ============================================================
var LISTAS_COL = {
  Language:1,Gender:2,AudienceParty:3,BuyModel:4,DeviceType:5,
  KeywordType:6,KeywordMatch:7,Brandlift:8,CollabAds:9,IHAMP:10,
  PlacementType:11,LandingPage:12,TargetStrategy:13,FormatType:14,
  InfPostType:15,AddOn:16,CrExchange:17,FormatGroup:18,TipodeTag:19,
  BuyType:20,BuyTypeShort:21,AudienceType:22,AudienceTypeShort:23,
  Publisher:24,CampaignLocal:25,LocationType:26,Location:27,
  BuyingType:28,BuyingTypeShort:29,Position:30,PositionShort:31,
  Objective:32,ObjectiveName:33,ObjectiveShort:34,
  ObjOtimizacao:35,ObjOtimizacaoName:36,ObjOtimizacaoShort:37,
  CNCode_Name:38,CNCode_ID:39,
  Market:40,Brand:41,Retailer:42,Influencer:43
};

// ============================================================
// SETUP
// ============================================================
var SETUP_STEPS = [
  'step_deleteTabs','step_syncListas',
  'buildAmazonDSP','buildCompraDireta','buildDV360Prog','buildDV360TD',
  'buildDV360YTAuction','buildDV360YTReserva','buildFlashtalking',
  'buildGoogleOthers','buildGoogleSearch','buildGoogleVideo',
  'buildMeta','buildPinterest','buildTikTok','buildTwitter',
  'step_finalize'
];

function setupAll() {
  if(!_isAdmin()){return;}
  var props = PropertiesService.getScriptProperties();
  props.setProperty('SETUP_STEP','0');
  props.setProperty('SETUP_RUNNING','true');
  _deleteContinuationTriggers();
  _atualizarBarraInicio(0,SETUP_STEPS.length,'Iniciando...');
  _continuarSetup();
}

function _continuarSetup() {
  _deleteContinuationTriggers();
  var props = PropertiesService.getScriptProperties();
  if (props.getProperty('SETUP_RUNNING')!=='true') return;
  var stepIdx = parseInt(props.getProperty('SETUP_STEP')||'0');
  if (stepIdx >= SETUP_STEPS.length) {
    props.deleteProperty('SETUP_RUNNING'); props.deleteProperty('SETUP_STEP');
    logInfo('Setup completo!');
    _atualizarBarraInicio(SETUP_STEPS.length,SETUP_STEPS.length,'done');
    return;
  }
  var stepName = SETUP_STEPS[stepIdx];
  _atualizarBarraInicio(stepIdx+1,SETUP_STEPS.length,stepName);
  try {
    if      (stepName==='step_syncListas') { _syncCNCodeSafe(); syncListas(true); }
    else if (stepName==='step_deleteTabs') { deleteOldTabs(); setupListasSheet(); }
    else if (stepName==='step_finalize')   { setupTriggers(); setupLogSheet(); setupIndiceSheet(); setupIndiceLinks(); hideAndProtectSystemSheets(); orderTabs(); }
    else {
      var fns={buildAmazonDSP:buildAmazonDSP,buildCompraDireta:buildCompraDireta,
        buildDV360Prog:buildDV360Prog,buildDV360TD:buildDV360TD,
        buildDV360YTAuction:buildDV360YTAuction,buildDV360YTReserva:buildDV360YTReserva,
        buildFlashtalking:buildFlashtalking,buildGoogleOthers:buildGoogleOthers,
        buildGoogleSearch:buildGoogleSearch,buildGoogleVideo:buildGoogleVideo,
        buildMeta:buildMeta,buildPinterest:buildPinterest,
        buildTikTok:buildTikTok,buildTwitter:buildTwitter};
      if(fns[stepName]) fns[stepName]();
      else throw new Error('Funcao nao encontrada: '+stepName);
    }
    logOk('OK: '+stepName);
    props.setProperty('SETUP_STEP',String(stepIdx+1));
  } catch(e) {
    props.deleteProperty('SETUP_RUNNING');
    logErro('ERRO em '+stepName+': '+e);
    _atualizarBarraInicio(stepIdx,SETUP_STEPS.length,'erro:'+e.message);
    return;
  }
  if (stepIdx+1<SETUP_STEPS.length) {
    ScriptApp.newTrigger('_continuarSetup').timeBased().after(4000).create();
  } else { _continuarSetup(); }
}

function _deleteContinuationTriggers() {
  ScriptApp.getProjectTriggers().forEach(function(t){
    if(t.getHandlerFunction()==='_continuarSetup') ScriptApp.deleteTrigger(t);
  });
}

function _syncCNCodeSafe() {
  try { syncCNCode(true); }
  catch(e) { logAviso('CN Code indisponivel durante setup: '+e+'. Continuando.'); }
}

function cancelarSetup() {
  if(!_isAdmin()){return;}
  PropertiesService.getScriptProperties().deleteProperty('SETUP_RUNNING');
  _deleteContinuationTriggers();
  SpreadsheetApp.openById(SPREADSHEET_ID).toast('Setup cancelado.','NC Tool',4);
}

// ============================================================
// BARRA DE PROGRESSO
// ============================================================
var _STEP_LABELS = {
  'step_syncListas':'Sincronizando listas','step_deleteTabs':'Limpando abas antigas',
  'buildAmazonDSP':'Criando: Amazon DSP','buildCompraDireta':'Criando: Compra Direta',
  'buildDV360Prog':'Criando: DV360 Programática','buildDV360TD':'Criando: DV360 TradeDesk',
  'buildDV360YTAuction':'Criando: DV360 YT Auction','buildDV360YTReserva':'Criando: DV360 YT Reserva',
  'buildFlashtalking':'Criando: Flashtalking','buildGoogleOthers':'Criando: Google Others',
  'buildGoogleSearch':'Criando: Google Search','buildGoogleVideo':'Criando: Google Video',
  'buildMeta':'Criando: Meta','buildPinterest':'Criando: Pinterest',
  'buildTikTok':'Criando: TikTok','buildTwitter':'Criando: Twitter',
  'step_finalize':'Finalizando','Iniciando...':'Iniciando',
  'done':'✅ Concluído!',
};

function _atualizarBarraInicio(current,total,stepName) {
  var s=SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(INICIO); if(!s) return;
  var isDone=stepName==='done';
  var isErro=stepName&&stepName.toString().indexOf('erro:')===0;
  var pct=total>0?Math.round((current/total)*100):0;
  var label=_STEP_LABELS[stepName]||stepName;
  var bars=Math.round(pct/5);
  var barra='█'.repeat(bars)+'░'.repeat(20-bars);
  var icon=isDone?'✅':isErro?'⚠️':'⚙️';
  var msg=isDone?label:(icon+'  '+label+'  ['+barra+']  '+pct+'%  ('+current+'/'+total+')');
  var bg=isDone?'#e8f5e9':isErro?'#fbe9e7':'#e3f2fd';
  var fg=isDone?'#1b5e20':isErro?'#b71c1c':'#0d47a1';
  s.getRange(22,1,1,6).merge().setValue(msg)
    .setFontFamily('Arial').setFontSize(10).setFontWeight('bold')
    .setFontColor(fg).setBackground(bg)
    .setHorizontalAlignment('center').setVerticalAlignment('middle');
}

// ============================================================
// MENU -- so aparece para admins
// ============================================================
function onOpen() {
  if(!_isAdmin()) return;
  SpreadsheetApp.getUi()
    .createMenu('Naming Tool')
    .addItem('Configurar Ferramenta','setupAll')
    .addItem('Cancelar Configuração','cancelarSetup')
    .addSeparator()
    .addItem('Sincronizar Listas','syncListasInteractive')
    .addItem('Sincronizar CN Code','syncCNCodeInteractive')
    .addSeparator()
    .addItem('Ver Log','showLog')
    .addSubMenu(SpreadsheetApp.getUi().createMenu('Recriar Aba Individual')
      .addItem('Amazon DSP','rebuildAmazonDSP')
      .addItem('Compra Direta','rebuildCompraDireta')
      .addItem('DV360 - Programática','rebuildDV360Prog')
      .addItem('DV360 - TradeDesk','rebuildDV360TD')
      .addItem('DV360 - YT Auction','rebuildDV360YTAuction')
      .addItem('DV360 - YT Reserva','rebuildDV360YTReserva')
      .addItem('Flashtalking','rebuildFlashtalking')
      .addItem('Google Others','rebuildGoogleOthers')
      .addItem('Google Search','rebuildGoogleSearch')
      .addItem('Google Video','rebuildGoogleVideo')
      .addItem('Meta','rebuildMeta')
      .addItem('Pinterest','rebuildPinterest')
      .addItem('TikTok','rebuildTikTok')
      .addItem('Twitter','rebuildTwitter'))
    .addToUi();
}

function setupTriggers() {
  ScriptApp.getProjectTriggers().forEach(function(t){
    if(t.getHandlerFunction()!=='onOpen') ScriptApp.deleteTrigger(t);
  });
  var ss=SpreadsheetApp.openById(SPREADSHEET_ID);
  var ex=ScriptApp.getProjectTriggers().map(function(t){return t.getHandlerFunction();});
  if(ex.indexOf('onEdit')<0) ScriptApp.newTrigger('onEdit').forSpreadsheet(ss).onEdit().create();
  if(ex.indexOf('weeklySyncAll')<0) ScriptApp.newTrigger('weeklySyncAll').timeBased().onWeekDay(ScriptApp.WeekDay.SUNDAY).atHour(8).create();
}

function hideAndProtectSystemSheets() {
  var ss=SpreadsheetApp.openById(SPREADSHEET_ID);
  [LOG,LISTAS].forEach(function(name){
    var s=ss.getSheetByName(name); if(!s) return;
    s.hideSheet();
    s.getProtections(SpreadsheetApp.ProtectionType.SHEET).forEach(function(p){p.remove();});
    var p=s.protect();
    p.setDescription(name+' -- nao editar'); p.setWarningOnly(false);
    try{var e=p.getEditors();if(e.length)p.removeEditors(e);}catch(ex){}
    try{p.setDomainEdit(false);}catch(ex){}
  });
}

function weeklySyncAll()         { syncListas(false); syncCNCode(false); }
function syncListasInteractive() {
  if(!_isAdmin())return;
  _barraSync('⚙️  Sincronizando Listas...','#e3f2fd','#0d47a1');
  syncListas(false);
  _barraSync('✅ Listas sincronizadas!','#e8f5e9','#1b5e20');
}
function syncCNCodeInteractive() {
  if(!_isAdmin())return;
  _barraSync('⚙️  Sincronizando CN Code...','#e3f2fd','#0d47a1');
  syncCNCode(false);
  _barraSync('✅ CN Code sincronizado!','#e8f5e9','#1b5e20');
}
function _barraSync(msg,bg,fg) {
  var s=SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(INICIO); if(!s) return;
  try{
    s.getRange(22,1,1,6).merge().setValue(msg)
      .setFontFamily('Arial').setFontSize(10).setFontWeight('bold')
      .setFontColor(fg).setBackground(bg)
      .setHorizontalAlignment('center').setVerticalAlignment('middle');
    SpreadsheetApp.flush();
  }catch(e){}
}
function showLog() {
  if(!_isAdmin())return;
  var ss=SpreadsheetApp.openById(SPREADSHEET_ID);
  var s=ss.getSheetByName(LOG);
  if(s){s.showSheet();ss.setActiveSheet(s);}
}

function syncListas(silent) {
  var changed=0;
  try {
    var ls=getOrCreate(LISTAS);
    if(ls.getName()!==LISTAS) throw new Error('Aba errada retornada por getOrCreate: '+ls.getName());
    writeListRaw(ls,'Objective',_names(_OBJ));
    writeListRaw(ls,'ObjectiveName',_names(_OBJ));
    writeListRaw(ls,'ObjectiveShort',_shorts(_OBJ));
    var otimNames=_names(_OBJ_OTIM).slice().sort(function(a,b){return a.localeCompare(b,'pt-BR',{sensitivity:'base'});});
    var otimShorts=otimNames.map(function(n){return _short(_OBJ_OTIM,n);});
    writeListRaw(ls,'ObjOtimizacao',otimNames);
    writeListRaw(ls,'ObjOtimizacaoName',otimNames);
    writeListRaw(ls,'ObjOtimizacaoShort',otimShorts);
    writeListRaw(ls,'BuyType',_names(_BUY_TYPE_GOOGLE));
    writeListRaw(ls,'BuyTypeShort',_shorts(_BUY_TYPE_GOOGLE));
    var aud=[['Behavioural','behav'],['CombinedAudiences','combaud'],
      ['Collected in-platform','collpform'],['CRM','crm'],['Custom','cust'],
      ['Demographic','demog'],['DMP','dmp'],['In-Market','inmark'],
      ['In-Market & Lifestyle','inmlst'],['Interest/Affinity','intaff'],
      ['Lifestyle/Life Events','lstyle'],['Lookalike','llike']];
    writeListRaw(ls,'AudienceType',_names(aud));
    writeListRaw(ls,'AudienceTypeShort',_shorts(aud));
    var bt=[['CPA','cpa'],['CPC','cpc'],['CPD','cpd'],['CPI','cpi'],['CPL','cpl'],
      ['CPM','cpm'],['CPV','cpv'],['First-Impression','ftimp'],
      ['Flat-Fee/Time-Based','flf-tb'],['vCPM','vcpm'],['Zero-cost','zcost']];
    writeListRaw(ls,'BuyingType',_names(bt));
    writeListRaw(ls,'BuyingTypeShort',_shorts(bt));
    changed+=8; logInfo('Listas embutidas OK');
    try {
      var src=SpreadsheetApp.openById(SOURCE_ID);
      var mainData=src.getSheets()[0].getDataRange().getValues().slice(8);
      function uq(ci){var seen={},v=[];mainData.forEach(function(r){var x=(r[ci]||'').toString().trim();if(x&&!seen[x]){seen[x]=true;v.push(x);}});return v.sort(function(a,b){return a.localeCompare(b,'pt-BR',{sensitivity:'base'});});}
      var pub=uq(53);if(pub.length){writeListRaw(ls,'Publisher',pub);changed++;logInfo('Publisher: '+pub.length);}
      var cl=uq(49); if(cl.length){writeListRaw(ls,'CampaignLocal',cl);changed++;logInfo('CampaignLocal: '+cl.length);}
      var lt=uq(63); if(lt.length){writeListRaw(ls,'LocationType',lt);changed++;logInfo('LocationType: '+lt.length);}
      var lo=uq(64); if(lo.length){writeListRaw(ls,'Location',lo);changed++;logInfo('Location: '+lo.length);}
    } catch(de){ logAviso('Dicionário inacessível — Publisher/CampaignLocal/Location mantidos.'); }
    logInfo(changed+' listas sincronizadas.');
    if(!silent) SpreadsheetApp.openById(SPREADSHEET_ID).toast(changed+' listas atualizadas','Listas',4);
  } catch(e){
    logErro('syncListas: '+e);
    if(!silent) SpreadsheetApp.getUi().alert('Erro syncListas: '+e);
  }
}

function syncCNCode(silent) {
  try {
    var pairs={}, seen={};
    function extractFromSheet(sheet) {
      if(!sheet) return;
      var lr=sheet.getLastRow(), lc=sheet.getLastColumn();
      if(lr<1||lc<1) return;
      var data=sheet.getRange(1,1,lr,lc).getValues();
      var nameC=-1, idC=-1;
      var headerRow=Math.min(10,lr);
      for(var hr=0;hr<headerRow;hr++){
        for(var c=0;c<data[hr].length;c++){
          var v=(data[hr][c]||'').toString().trim().toLowerCase();
          if(v==='campaign name') nameC=c;
          if(v==='campaign id')   idC=c;
        }
        if(nameC>=0&&idC>=0){headerRow=hr;break;}
        nameC=idC=-1;
      }
      if(nameC<0||idC<0) return;
      var startRow=(nameC>=0&&idC>=0)?headerRow+1:1;
      for(var r=startRow;r<data.length;r++){
        var id=(data[r][idC]||'').toString().trim();
        var nm=(data[r][nameC]||'').toString().trim();
        if(id&&/^[Cc][Nn]\d+$/.test(id)&&nm&&!seen[id]){
          seen[id]=true;
          pairs[nm]=id.toUpperCase();
        }
      }
    }
    try {
      var src1=SpreadsheetApp.openById(CN_SOURCE_ID);
      src1.getSheets().forEach(function(sh){extractFromSheet(sh);});
      logInfo('CN Code fonte 1 OK: '+Object.keys(pairs).length+' até agora.');
    } catch(e1){logAviso('CN Code fonte 1 inacessível: '+e1);}
    try {
      var src2=SpreadsheetApp.openById(SOURCE_ID);
      var dicSheets=src2.getSheets();
      var found=false;
      for(var i=0;i<dicSheets.length;i++){
        if(dicSheets[i].getSheetId()===1909520238){extractFromSheet(dicSheets[i]);found=true;break;}
      }
      if(!found) dicSheets.forEach(function(sh){extractFromSheet(sh);});
      logInfo('CN Code fonte 2 OK: '+Object.keys(pairs).length+' total.');
    } catch(e2){logAviso('CN Code fonte 2 inacessível: '+e2);}
    var names=Object.keys(pairs).sort(function(a,b){return a.localeCompare(b,'pt-BR',{sensitivity:'base'});});
    var ids=names.map(function(n){return pairs[n];});
    var ls=getOrCreate(LISTAS);
    writeList(ls,'CNCode_Name',names);
    writeList(ls,'CNCode_ID',ids);
    if(!silent){
      logInfo('CN Code: '+names.length+' entradas (merge de 2 fontes).');
      SpreadsheetApp.openById(SPREADSHEET_ID).toast('CN Code: '+names.length+' entradas','CN',4);
    }
  } catch(e){
    logAviso('syncCNCode: '+e);
    if(!silent) SpreadsheetApp.getUi().alert('Erro CN Code: '+e);
  }
}

function _nukeDados() {
  var ss=SpreadsheetApp.openById(SPREADSHEET_ID);
  var names=['Dados','__LISTAS__','__LISTAS__migrar__','__dados_old__','__dados_tmp__'];
  var hasAny=names.some(function(n){return !!ss.getSheetByName(n);});
  if(!hasAny) return;
  var tmp=ss.insertSheet('__nuke_tmp__');
  SpreadsheetApp.flush();
  names.forEach(function(n){
    var s=ss.getSheetByName(n);
    if(s){try{ss.deleteSheet(s);}catch(e){logAviso('_nukeDados: nao conseguiu deletar "'+n+'": '+e);}}
  });
  try{ss.deleteSheet(tmp);}catch(e){}
  SpreadsheetApp.flush();
}

function setupListasSheet() {
  var ss=SpreadsheetApp.openById(SPREADSHEET_ID);
  var _ini=ss.getSheetByName(INICIO); if(_ini) try{ss.setActiveSheet(_ini);}catch(e){}
  _nukeDados();
  var existing=ss.getSheetByName(LISTAS);
  var s;
  if(existing){
    try{
      existing.setName('__dados_old__');
      s=ss.insertSheet(LISTAS);
      SpreadsheetApp.flush();
      ss.deleteSheet(existing);
    }catch(ex){
      try{existing.setName(LISTAS);}catch(e2){}
      s=ss.getSheetByName(LISTAS)||existing;
      try{s.getRange(1,1,s.getMaxRows(),s.getMaxColumns()).clearDataValidations();}catch(e){}
      s.clearContents();s.clearFormats();
    }
  } else {
    s=ss.insertSheet(LISTAS);
  }
  s.hideSheet();
  var totalCols=43;
  var curCols=s.getMaxColumns();
  if(curCols<totalCols) try{s.insertColumnsAfter(curCols,totalCols-curCols);}catch(e){}
  if(curCols>totalCols) try{s.deleteColumns(totalCols+1,curCols-totalCols);}catch(e){}
  var headers=new Array(totalCols+1);
  Object.keys(LISTAS_COL).forEach(function(k){headers[LISTAS_COL[k]]=k;});
  var headerRow=[];
  for(var ci=1;ci<=totalCols;ci++) headerRow.push(headers[ci]||'');
  s.getRange(1,1,1,totalCols).setValues([headerRow]);
  SpreadsheetApp.flush();
  var staticLists=[
    ['Language',['br','en','es','pt']],
    ['Gender',['Adults','Female','Male']],
    ['AudienceParty',['1pd (DAD)','1pd (DID)','1pd (DID+DAD)','No 1PD']],
    ['BuyModel',['Auction','OMP','OMP & PMP','Preferred Deal','PMP','Programmatic Guaranteed','Reach&Frequency','Reservation Buy','TrueView Instant Reserve']],
    ['DeviceType',['All','Connected TV','Desktop','Mobile','Tablet']],
    ['KeywordType',['Brand','Brand Generic','Brand Product','Competitor','Dynamic Search Ads','Generic','Generic Product']],
    ['KeywordMatch',['Broad Match','Exact Match','Phrase Match']],
    ['Brandlift',['brdlft-n','brdlft-y']],
    ['CollabAds',['Brand | Non shoppable','Brand | Shoppable']],
    ['IHAMP',['com-IHAMP','sem-IHAMP']],
    ['PlacementType',['InApp','Instream','Native','Outstream','Rewarded','Search','Shopping','Social']],
    ['LandingPage',['App','Brand','Brand-Shoppable','Extended-Text','Product','Product-Feed','Responsive']],
    ['TargetStrategy',['Behavioural','Contextual','Lookalike','Retargeting']],
    ['FormatType',['Audio','Carousel','Collection','Display','Dynamic','Instant Experience','Lead','Masthead','NativeDisplay','NativeVideo','Rich Mix','Shopping','Slideshow','Video']],
    ['InfPostType',['Dark Post','Organic','Paid','Spark Ads','Whitelist']],
    ['AddOn',['n/a','Spark Ads','TikTok Pulse','TopView']],
    ['CrExchange',['n/a','TCE']],
    ['FormatGroup',['Audio','Carrossel','Display','DOOH-Display','DOOH-Video','Video','Widget-Count']],
    ['TipodeTag',['audio','audio-pixel','html','multi-tracker','na','native','pixel','vast','video-pixel','vpaid']],
    ['Market',['BR']],
    ['Brand',['AXE',"Ben & Jerry's",'Closeup','Comfort','Dove',"Hellmann's",'Knorr','Lifebuoy','Lux','Mãe Terra','Maizena','Omo',"Pond's",'Rexona','Sim','Skip','Sorriso','Sunsilk','TRESemmé','Unilever']],
    ['Retailer',['Americanas','Carrefour','Casas Bahia','Extra','Magazine Luiza','Mercado Livre','Pão de Açúcar','Rappi',"Sam's Club",'Shopee','Submarino','Walmart','n/a']],
    ['Influencer',['n/a','sim']],
  ];
  staticLists.forEach(function(pair){writeList(s,pair[0],pair[1]);});
}

function getOrCreate(name){
  var ss=SpreadsheetApp.openById(SPREADSHEET_ID);
  return ss.getSheetByName(name)||ss.insertSheet(name);
}
function readList(sheet,name){
  var lc=Math.max(1,sheet.getLastColumn());
  var hh=sheet.getRange(1,1,1,lc).getValues()[0];
  var col=-1;
  for(var i=0;i<hh.length;i++) if((hh[i]||'').toString().trim()===name){col=i+1;break;}
  if(col<0) return [];
  var lr=sheet.getLastRow(); if(lr<2) return [];
  return sheet.getRange(2,col,lr-1,1).getValues().map(function(r){return (r[0]||'').toString().trim();}).filter(Boolean);
}
function writeList(sheet,name,vals){
  writeListRaw(sheet,name,vals.slice().sort(function(a,b){return a.localeCompare(b,'pt-BR',{sensitivity:'base'});}));
}
function writeListRaw(sheet,name,vals){
  var lc=Math.max(1,sheet.getLastColumn());
  var hh=sheet.getRange(1,1,1,lc).getValues()[0];
  var col=-1;
  for(var i=0;i<hh.length;i++) if((hh[i]||'').toString().trim()===name){col=i+1;break;}
  if(col<0){col=(sheet.getLastColumn()||0)+1;sheet.getRange(1,col).setValue(name);}
  var lr=sheet.getLastRow();
  if(lr>1){
    var cr=sheet.getRange(2,col,lr-1,1);
    try{cr.clearDataValidations();}catch(e){}
    cr.clearContent();
  }
  if(!vals||!vals.length) return;
  var wr=sheet.getRange(2,col,vals.length,1);
  try{wr.clearDataValidations();}catch(e){}
  wr.setValues(vals.map(function(v){return [v];}));
}
function listColIndex(name){
  if(LISTAS_COL[name]) return LISTAS_COL[name];
  var s=SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(LISTAS); if(!s) return -1;
  var hh=s.getRange(1,1,1,Math.max(1,s.getLastColumn())).getValues()[0];
  for(var i=0;i<hh.length;i++) if((hh[i]||'').toString().trim()===name) return i+1;
  return -1;
}

function onEdit(e){
  if(!e||!e.range) return;
  var s=e.range.getSheet(),col=e.range.getColumn(),row=e.range.getRow();
  if(row>=3){
    try{
      s.autoResizeColumn(col);
      var numCols=s.getLastColumn();
      var hdrs2=s.getRange(2,1,1,numCols).getValues()[0];
      for(var i=0;i<hdrs2.length;i++){
        var hh=(hdrs2[i]||'').toString().trim();
        if(FORMULA_HEADERS.indexOf(hh)>=0){
          s.autoResizeColumn(i+1);
          var minFml=(hh.indexOf('CAMPAIGN')>=0||hh.indexOf('ADGROUP')>=0||hh.indexOf('AD NAME')>=0)?400:120;
          if(s.getColumnWidth(i+1)<minFml) s.setColumnWidth(i+1,minFml);
        }
      }
    }catch(ex){}
  }
  if(row<3) return;
  var hdr=(s.getRange(2,col).getValue()||'').toString().trim();
  var val=(e.value||'').toString(); if(!val) return;
  if(hdr==='Format Size'){validateFS(e.range,val);return;}
  var freeH=['Audience Name','MidiaCampaignLocal-Extra','MidiaIO-Extra','MidiaLineitem-Extra',
    'Midiaadgroup-Extra','MidiaAdName-Extra','MidiaName-Extra','MidiaGroup-Extra','@doInfluencer',
    'Creative Name','Creative Name Ad','Pilar','Campaign Type','Plataforma',
    'Costfree','Costfree 2','Mes/Ano','Mes/Ano 2','Seconds',
    'Product Format','Influencer Brand','Influencer Name','Tipo Audiencia','Spec Audiencia',
    'Publisher Name','Publisher Name Ad','Ad Name'];
  if(freeH.indexOf(hdr)>=0) validateFree(e.range,val,hdr);
}
function validateFree(range,val,hdr){
  if(/[\s@#$%&*()+={}\[\]\\/;'"<>?!~^`,]/.test(val)){
    range.setBackground('#ffcccc');
    SpreadsheetApp.openById(SPREADSHEET_ID).toast('AVISO "'+hdr+'": sem espacos ou caracteres especiais.','Erro',5);
  } else { range.setBackground(null); }
}
function validateFS(range,val){
  var l=val.toLowerCase().replace(/\s/g,'');
  for(var i=0;i<FS_BLOCKED.length;i++){
    if(l.indexOf(FS_BLOCKED[i])>=0){
      range.setBackground('#ffcccc');
      SpreadsheetApp.openById(SPREADSHEET_ID).toast('AVISO "'+FS_BLOCKED[i]+'" nao permitido em Format-Size.','Erro',6);
      return;
    }
  }
  range.setBackground(null);
}

var _LOG_COLS={
  ERRO: {bg:'#fce4e4',fg:'#c62828',icon:'🔴'},
  AVISO:{bg:'#fff8e1',fg:'#e65100',icon:'🟡'},
  OK:   {bg:'#e8f5e9',fg:'#2e7d32',icon:'🟢'},
  INFO: {bg:'#f3f4f6',fg:'#374151',icon:'⚪'},
};
function setupLogSheet(){
  var ss=SpreadsheetApp.openById(SPREADSHEET_ID);
  var s=ss.getSheetByName(LOG)||ss.insertSheet(LOG);
  var maxC=s.getMaxColumns();
  if(maxC<4) try{s.insertColumnsAfter(maxC,4-maxC);}catch(e){}
  if(maxC>4) try{s.deleteColumns(5,maxC-4);}catch(e){}
  if(s.getLastRow()<1){
    s.getRange(1,1,1,4).setValues([['','Data/Hora','Tipo','Mensagem']])
      .setFontWeight('bold').setFontSize(10).setFontFamily('Arial')
      .setBackground('#0d2137').setFontColor('#e94560').setHorizontalAlignment('center');
  }
  s.setColumnWidth(1,28);s.setColumnWidth(2,160);
  s.setColumnWidth(3,70);s.setColumnWidth(4,800);
  s.setFrozenRows(1);s.hideSheet();
}
function _appendLog(tipo,msg){
  try{
    var ss=SpreadsheetApp.openById(SPREADSHEET_ID);
    var s=ss.getSheetByName(LOG);
    if(!s){
      s=ss.insertSheet(LOG);
      s.getRange(1,1,1,4).setValues([['','Data/Hora','Tipo','Mensagem']])
        .setFontWeight('bold').setFontFamily('Arial')
        .setBackground('#0d2137').setFontColor('#e94560').setHorizontalAlignment('center');
      s.setColumnWidth(1,28);s.setColumnWidth(2,160);s.setColumnWidth(3,70);s.setColumnWidth(4,800);
      s.setFrozenRows(1);
    }
    s.showSheet();
    s.insertRowAfter(1);
    var c=_LOG_COLS[tipo]||_LOG_COLS.INFO;
    var ts=Utilities.formatDate(new Date(),Session.getScriptTimeZone(),'dd/MM/yyyy HH:mm:ss');
    s.getRange(2,1).setValue(c.icon).setBackground(c.bg).setFontSize(11).setHorizontalAlignment('center');
    s.getRange(2,2).setValue(ts).setBackground(c.bg).setFontSize(9).setFontFamily('Arial').setHorizontalAlignment('center');
    s.getRange(2,3).setValue(tipo).setBackground(c.bg).setFontColor(c.fg)
      .setFontWeight('bold').setFontSize(9).setFontFamily('Arial').setHorizontalAlignment('center');
    s.getRange(2,4).setValue(msg).setBackground(c.bg).setFontSize(9).setFontFamily('Arial');
    s.setRowHeight(2,22);s.hideSheet();
  }catch(ex){}
}
function logOk(msg)    {_appendLog('OK',msg);}
function logErro(msg)  {_appendLog('ERRO',msg);}
function logAviso(msg) {_appendLog('AVISO',msg);}
function logInfo(msg)  {_appendLog('INFO',msg);}
function log(msg){
  var m=msg.toLowerCase();
  if(m.indexOf('erro')>=0||m.indexOf('error')>=0) logErro(msg);
  else if(m.indexOf('aviso')>=0||m.indexOf('warn')>=0) logAviso(msg);
  else if(m.indexOf('ok')===0) logOk(msg);
  else logInfo(msg);
}

function colLetter(col){
  var l='';
  while(col>0){var r=(col-1)%26;l=String.fromCharCode(65+r)+l;col=Math.floor((col-1)/26);}
  return l;
}
function sh(col,row){
  var c=col+row;
  return 'IF(ISERROR(FIND(":";TO_TEXT('+c+')));TO_TEXT('+c+');MID(TO_TEXT('+c+');FIND(":";TO_TEXT('+c+'))+1;100))';
}
function pp(col,row){var c=col+row;return '&IF(TO_TEXT('+c+')<>"";"\ | \"&TO_TEXT('+c+');\"\")';}
function uu(col,row){var c=col+row;return '&IF(TO_TEXT('+c+')<>"";"\_\"&TO_TEXT('+c+');\"\")';}
function age(lc,uc,row){
  var l=lc+row,u=uc+row;
  return 'IF(TO_TEXT('+l+')<>"";IF(TO_TEXT('+u+')<>"";TO_TEXT('+l+')&\"-\"&TO_TEXT('+u+');TO_TEXT('+l+'));\"\")';}
function fsVsSeconds(fsCol,secCol,tagCol,row){
  var fs=fsCol+row,sec=secCol+row,tag=tagCol+row;
  return 'IF(OR(LOWER(TO_TEXT('+tag+'))=\"vast\";LOWER(TO_TEXT('+tag+'))=\"vpaid\");'+
    'IF(TO_TEXT('+sec+')<>\"\";\"_\"&TO_TEXT('+sec+');\"\")'+ 
    ';IF(TO_TEXT('+fs+')<>\"\";\"_\"&TO_TEXT('+fs+');\"\")'+')';}
var ERR_MSG = '\"⚠️ Verificar colunas\"';
function iferrNaming(formula){return 'IFERROR('+formula+';'+ERR_MSG+')';}

function _dadosRef(colName){
  var L=colLetter(LISTAS_COL[colName]);
  return 'INDIRECT("\'''Dados\'\''!$'+L+'$2:$'+L+'$9999")';
}
function cnFml(inputCol,row){
  var cell=inputCol+row;
  var nR=_dadosRef('CNCode_Name'),iR=_dadosRef('CNCode_ID');
  return 'IFERROR(IF(TO_TEXT('+cell+')=\"\";\"\";IFERROR(INDEX('+iR+';MATCH(TO_TEXT('+cell+');'+nR+';0));\"CN nao encontrado\"));'+ERR_MSG+')';
}
function objShortFml(inputCol,row){
  var cell=inputCol+row;
  var nR=_dadosRef('ObjectiveName'),sR=_dadosRef('ObjectiveShort');
  return 'IFERROR(IF(TO_TEXT('+cell+')=\"\";\"\";IFERROR(INDEX('+sR+';MATCH(TO_TEXT('+cell+');'+nR+';0));\"\"));'+ERR_MSG+')';
}
function objOtimFml(inputCol,row){
  var cell=inputCol+row;
  var nR=_dadosRef('ObjOtimizacaoName'),sR=_dadosRef('ObjOtimizacaoShort');
  return 'IFERROR(IF(TO_TEXT('+cell+')=\"\";\"\";IFERROR(INDEX('+sR+';MATCH(TO_TEXT('+cell+');'+nR+';0));\"\"));'+ERR_MSG+')';
}
function batchCol(sheet,col,startRow,numRows,fn){
  var formulas=[];
  for(var r=startRow;r<startRow+numRows;r++) formulas.push(['='+fn(r)]);
  sheet.getRange(startRow,col,numRows,1).setFormulas(formulas);
}

var LVL={
  camp:{bg:'#1a1a2e',fg:'#ffffff',label:'Campaign / Insertion Order'},
  ag:  {bg:'#16213e',fg:'#e2e2e2',label:'AdGroup / Line Item'},
  ad:  {bg:'#0d2137',fg:'#c0c0c0',label:'Ad / Creative'},
  fml: {bg:'#0f3460',fg:'#e94560',label:''},
  note:{bg:'#3d3d00',fg:'#ffff66',label:''}
};

function _sheetHasData(sheet){
  if(sheet.getLastRow()<3) return false;
  var vals=sheet.getRange(3,1,Math.min(5,sheet.getLastRow()-2),1).getValues();
  return vals.some(function(r){return (r[0]||'').toString().trim()!=='';});
}
function _sheetHeadersMatch(sheet,cols){
  var lc=sheet.getLastColumn();
  if(lc!==cols.length) return false;
  var hdrs=sheet.getRange(2,1,1,lc).getValues()[0];
  for(var i=0;i<cols.length;i++){
    if((hdrs[i]||'').toString().trim()!==(cols[i].h||'').toString().trim()) return false;
  }
  return true;
}
function buildSheet(name,cols){
  var ss=SpreadsheetApp.openById(SPREADSHEET_ID);
  var s=ss.getSheetByName(name)||ss.insertSheet(name);
  var hasData=_sheetHasData(s);
  var headersMatch=_sheetHeadersMatch(s,cols);
  if(hasData&&headersMatch){_refreshFormulasOnly(s,cols);return s;}
  s.getProtections(SpreadsheetApp.ProtectionType.RANGE).forEach(function(p){p.remove();});
  s.getProtections(SpreadsheetApp.ProtectionType.SHEET).forEach(function(p){p.remove();});
  s.clearContents();s.clearFormats();
  try{s.getRange(1,1,s.getMaxRows(),s.getMaxColumns()).clearDataValidations();}catch(e){}
  var neededRows=NROWS+2,curRows=s.getMaxRows();
  if(curRows>neededRows+1) try{s.deleteRows(neededRows+1,curRows-neededRows);}catch(e){}
  else if(curRows<neededRows) try{s.insertRowsAfter(curRows,neededRows-curRows);}catch(e){}
  _buildHeaders(s,cols);
  _buildValidations(s,cols);
  s.setFrozenRows(2);s.setFrozenColumns(1);
  s.setRowHeight(1,24);s.setRowHeight(2,52);
  _autoResizeCols(s,cols);
  return s;
}
function _refreshFormulasOnly(s,cols){
  _buildHeaders(s,cols);_buildValidations(s,cols);
}
function _buildHeaders(s,cols){
  var n=cols.length; if(!n) return;
  var row1vals=[],row1bgs=[],row1fgs=[];
  cols.forEach(function(col,i){
    var lv=col.level||'camp',c=LVL[lv]||LVL.camp;
    var showLabel=(i===0||(cols[i-1]&&(cols[i-1].level||'camp')!==lv));
    row1vals.push(showLabel?c.label:'');row1bgs.push(c.bg);row1fgs.push(c.fg);
  });
  s.getRange(1,1,1,n).setValues([row1vals]).setBackgrounds([row1bgs]).setFontColors([row1fgs])
    .setFontSize(9).setFontWeight('bold').setHorizontalAlignment('center');
  var row2vals=[],row2bgs=[],row2fgs=[];
  cols.forEach(function(col){
    var lv=col.level||'camp',c=LVL[lv]||LVL.camp;
    var isFml=col.type==='formula'||col.type==='cn_result';
    row2vals.push(col.h);
    row2bgs.push(isFml?LVL.fml.bg:(col.type==='note'?LVL.note.bg:c.bg));
    row2fgs.push(isFml?LVL.fml.fg:(col.type==='note'?LVL.note.fg:c.fg));
  });
  s.getRange(2,1,1,n).setValues([row2vals]).setBackgrounds([row2bgs]).setFontColors([row2fgs])
    .setFontWeight('bold').setHorizontalAlignment('center').setWrap(true);
}
function _buildValidations(s,cols){
  var ss=SpreadsheetApp.openById(SPREADSHEET_ID);
  var ls=ss.getSheetByName(LISTAS);
  var cnIdx=-1;
  if(ls){cnIdx=listColIndex('CNCode_Name');}
  var listCache={};
  function getList(name){
    if(!listCache[name]) listCache[name]=ls?readList(ls,name):[];
    return listCache[name];
  }
  cols.forEach(function(col,i){
    var colIdx=i+1;
    var dr=s.getRange(3,colIdx,NROWS,1);
    var rule=null;
    if(col.type==='cn_drop'){
      if(ls&&cnIdx>0){
        var cnVals=getList('CNCode_Name');
        if(cnVals.length>0){
          rule=SpreadsheetApp.newDataValidation()
            .requireValueInRange(ls.getRange(2,cnIdx,cnVals.length,1),true)
            .setAllowInvalid(true).build();
        }
      }
    } else if(col.type==='drop'&&col.list){
      if(!ls)return;
      var vals=getList(col.list);
      if(vals.length){
        rule=SpreadsheetApp.newDataValidation()
          .requireValueInList(vals.length>500?vals.slice(0,500):vals,true).setAllowInvalid(false).build();
      }
    } else if(col.type==='free'){
      if(col.h==='Age Lower'){
        rule=SpreadsheetApp.newDataValidation()
          .requireValueInList(AGE_LOWER_VALS,true).setAllowInvalid(false).build();
      } else if(col.h==='Age Upper'){
        rule=SpreadsheetApp.newDataValidation()
          .requireValueInList(AGE_UPPER_VALS,true).setAllowInvalid(false).build();
      }
    }
    if(rule) dr.setDataValidation(rule);
  });
}
function _autoResizeCols(s,cols){
  if(!cols.length) return;
  s.autoResizeColumns(1,cols.length);
  for(var ci=1;ci<=cols.length;ci++){
    var w=s.getColumnWidth(ci),ct=cols[ci-1].type,h=cols[ci-1].h||'';
    var minW;
    if(ct==='formula'){minW=(h.indexOf('CAMPAIGN')>=0||h.indexOf('ADGROUP')>=0||h.indexOf('AD NAME')>=0)?400:120;}
    else if(ct==='cn_drop') {minW=230;}
    else if(ct==='cn_result'){minW=90;}
    else if(ct==='free')    {minW=130;}
    else                    {minW=110;}
    if(w<minW) s.setColumnWidth(ci,minW);
  }
}
function protectCols(sheet,colIndexes){
  sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE).forEach(function(p){p.remove();});
  colIndexes.forEach(function(ci){
    var p=sheet.getRange(3,ci,NROWS,1).protect();
    p.setDescription('Formula -- nao editar');p.setWarningOnly(false);
    try{p.setDomainEdit(false);}catch(ex){}
    try{var e=p.getEditors();if(e&&e.length)p.removeEditors(e);}catch(ex){}
  });
}

var TABS=[
  'Amazon DSP','Compra Direta','DV360 - Programática','DV360 - TradeDesk',
  'DV360 - YT Auction','DV360 - YT Reserva','Flashtalking',
  'Google Others','Google Search','Google Video','Meta','Pinterest','TikTok','Twitter'
];
var TAB_COLORS={
  'Amazon DSP':'#FF9900','Compra Direta':'#607D8B',
  'DV360 - Programática':'#1E8E3E','DV360 - TradeDesk':'#1A73E8',
  'DV360 - YT Auction':'#FF0000','DV360 - YT Reserva':'#FF0000',
  'Flashtalking':'#E8461E','Google Others':'#34A853',
  'Google Search':'#4285F4','Google Video':'#FF0000',
  'Meta':'#0866FF','Pinterest':'#E60023','TikTok':'#010101','Twitter':'#1D9BF0'
};
var AGE_LOWER_VALS=['13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60','61','62','63','64','65','66','67','68','69','70','71','72','73','74','75','76','77','78','79','80','81','82','83','84','85','86','87','88','89','90','91','92','93','94','95','96','97','98','99'];
var AGE_UPPER_VALS=['13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60','61','62','63','64','65','66','67','68','69','70','71','72','73','74','75','76','77','78','79','80','81','82','83','84','85','86','87','88','89','90','91','92','93','94','95','96','97','98','99','+'];

function deleteOldTabs(){
  var ss=SpreadsheetApp.openById(SPREADSHEET_ID);
  var keep=TABS.concat([LISTAS,'__LISTAS__',LOG,INICIO]);
  var tmp=ss.getSheetByName('__tmp__')||ss.insertSheet('__tmp__');
  SpreadsheetApp.flush();
  ss.getSheets().forEach(function(s){
    if(s.getName()==='__tmp__') return;
    if(keep.indexOf(s.getName())<0) try{ss.deleteSheet(s);}catch(e){}
  });
  if(ss.getSheets().length>1) try{ss.deleteSheet(tmp);}catch(e){}
}

function setupIndiceSheet(){
  var ss=SpreadsheetApp.openById(SPREADSHEET_ID);
  var s=ss.getSheetByName(INICIO)||ss.insertSheet(INICIO);
  s.clearContents();s.clearFormats();s.setTabColor('#0f3460');
  s.getRange(2,1,1,6).merge().setValue('NC Tool  |  Unilever BR x Grasp')
    .setFontFamily('Arial').setFontSize(22).setFontWeight('bold')
    .setFontColor('#ffffff').setBackground('#0a0f1e')
    .setHorizontalAlignment('center').setVerticalAlignment('middle');
  s.getRange(3,1,1,6).merge().setValue('F2  —  Naming Convention Generator  [Pessoal]')
    .setFontFamily('Arial').setFontSize(11).setFontStyle('italic')
    .setFontColor('#e94560').setBackground('#0a0f1e')
    .setHorizontalAlignment('center').setVerticalAlignment('middle');
}
function setupIndiceLinks(){
  var ss=SpreadsheetApp.openById(SPREADSHEET_ID);
  var s=ss.getSheetByName(INICIO);
  if(!s){setupIndiceSheet();s=ss.getSheetByName(INICIO);}
  TABS.forEach(function(name,i){
    var tab=ss.getSheetByName(name);if(!tab)return;
    var url='https://docs.google.com/spreadsheets/d/'+ss.getId()+'/edit#gid='+tab.getSheetId();
    s.getRange(7+i,2).setRichTextValue(SpreadsheetApp.newRichTextValue().setText(name).setLinkUrl(url).build())
      .setFontColor('#1565c0').setFontWeight('bold').setFontSize(10);
  });
}
function orderTabs(){
  var ss=SpreadsheetApp.openById(SPREADSHEET_ID);
  var order=[INICIO].concat(TABS).concat([LISTAS,LOG]);
  order.forEach(function(name,idx){
    var s=ss.getSheetByName(name);if(!s)return;
    ss.setActiveSheet(s);ss.moveActiveSheet(idx+1);
    if(TAB_COLORS[name]) try{s.setTabColor(TAB_COLORS[name]);}catch(e){}
  });
  var inicio=ss.getSheetByName(INICIO);
  if(inicio) ss.setActiveSheet(inicio);
}
function _rebuild(nome,buildFn){
  if(!_isAdmin()) return;
  _barraSync('⚙️  Recriando: '+nome+'...','#e3f2fd','#0d47a1');
  buildFn();setupIndiceLinks();logOk('Recriado: '+nome);
  _barraSync('✅ '+nome+' recriado!','#e8f5e9','#1b5e20');
}
function rebuildAmazonDSP()     {_rebuild('Amazon DSP',      buildAmazonDSP);}
function rebuildCompraDireta()  {_rebuild('Compra Direta',   buildCompraDireta);}
function rebuildDV360Prog()     {_rebuild('DV360 Prog',      buildDV360Prog);}
function rebuildDV360TD()       {_rebuild('DV360 TradeDesk', buildDV360TD);}
function rebuildDV360YTAuction(){_rebuild('DV360 YT Auction',buildDV360YTAuction);}
function rebuildDV360YTReserva(){_rebuild('DV360 YT Reserva',buildDV360YTReserva);}
function rebuildFlashtalking()  {_rebuild('Flashtalking',    buildFlashtalking);}
function rebuildGoogleOthers()  {_rebuild('Google Others',   buildGoogleOthers);}
function rebuildGoogleSearch()  {_rebuild('Google Search',   buildGoogleSearch);}
function rebuildGoogleVideo()   {_rebuild('Google Video',    buildGoogleVideo);}
function rebuildMeta()          {_rebuild('Meta',            buildMeta);}
function rebuildPinterest()     {_rebuild('Pinterest',       buildPinterest);}
function rebuildTikTok()        {_rebuild('TikTok',          buildTikTok);}
function rebuildTwitter()       {_rebuild('Twitter',         buildTwitter);}
