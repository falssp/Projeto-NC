// ============================================================
// NC Tool | Unilever BR x Grasp -- F2 v4 -- Arquivo 2: TABS 1
// Amazon DSP, Compra Direta, DV360-Prog, DV360-TradeDesk,
// DV360-YT Auction, DV360-YT Reserva, Flashtalking
// Colunas "2" removidas; Format Size vs Seconds via Tipo de Tag
// ============================================================

// _s(): converte separadores , -> ; fora de strings entre aspas
function _s(f){
  var r=[],q=false;
  for(var i=0;i<f.length;i++){
    var c=f[i];
    if(c==='"'){q=!q;r.push(c);}
    else if(c===','&&!q){r.push(';');}
    else{r.push(c);}
  }
  return r.join('');
}

// ---- AMAZON DSP ----
function buildAmazonDSP(){
  var s=buildSheet('Amazon DSP',[
    {h:'Campaign Name',         type:'cn_drop',  level:'camp'},   // A  1
    {h:'📋 CN Code',            type:'cn_result',level:'camp'},   // B  2
    {h:'Market',                type:'drop',list:'Market',        level:'camp'},   // C  3
    {h:'Brand',                 type:'drop',list:'Brand',         level:'camp'},   // D  4
    {h:'Format Type',           type:'drop',list:'FormatType',    level:'camp'},   // E  5
    {h:'Objective',             type:'drop',list:'Objective',     level:'camp'},   // F  6
    {h:'📋 Objective-Short',    type:'cn_result',level:'camp'},   // G  7
    {h:'Campaign Local',        type:'drop',list:'CampaignLocal', level:'camp'},   // H  8
    {h:'Brandlift',             type:'drop',list:'Brandlift',     level:'camp'},   // I  9
    {h:'Publisher',             type:'drop',list:'Publisher',     level:'camp'},   // J  10
    {h:'Location Type',         type:'drop',list:'LocationType',  level:'camp'},   // K  11
    {h:'Location',              type:'drop',list:'Location',      level:'camp'},   // L  12
    {h:'Pilar',                 type:'free',                      level:'camp'},   // M  13
    {h:'MidiaIO-Extra',         type:'free',                      level:'camp'},   // N  14
    {h:'📋 CAMPAIGN NAME',      type:'formula',                   level:'fml'},    // O  15
    {h:'Buy Model',             type:'drop',list:'BuyModel',      level:'ag'},     // P  16
    {h:'Targeting Strategy',    type:'drop',list:'TargetStrategy',level:'ag'},     // Q  17
    {h:'Audience Party',        type:'drop',list:'AudienceParty', level:'ag'},     // R  18
    {h:'Audience Name',         type:'free',                      level:'ag'},     // S  19
    {h:'Gender',                type:'drop',list:'Gender',        level:'ag'},     // T  20
    {h:'Age Lower',             type:'free',                      level:'ag'},     // U  21
    {h:'Age Upper',             type:'free',                      level:'ag'},     // V  22
    {h:'Device Type',           type:'drop',list:'DeviceType',    level:'ag'},     // W  23
    {h:'Obj Otimização',        type:'drop',list:'ObjOtimizacao', level:'ag'},     // X  24
    {h:'📋 Obj Otim-Short',     type:'cn_result',level:'ag'},                      // Y  25
    {h:'Audience Type',         type:'drop',list:'AudienceType',  level:'ag'},     // Z  26
    {h:'Buying Type',           type:'drop',list:'BuyType',       level:'ag'},     // AA 27
    {h:'MidiaAdgroup-Extra',    type:'free',                      level:'ag'},     // AB 28
    {h:'📋 ADGROUP NAME',       type:'formula',                   level:'fml'},    // AC 29
    {h:'Placement Type',        type:'drop',list:'PlacementType', level:'ad'},     // AD 30
    {h:'Format Type Ad',        type:'drop',list:'FormatType',    level:'ad'},     // AE 31
    {h:'Format Size',           type:'free',                      level:'ad'},     // AF 32
    {h:'Creative Name',         type:'free',                      level:'ad'},     // AG 33
    {h:'Landing Page',          type:'drop',list:'LandingPage',   level:'ad'},     // AH 34
    {h:'Retailer',              type:'drop',list:'Retailer',      level:'ad'},     // AI 35
    {h:'Influencer',            type:'drop',list:'Influencer',    level:'ad'},     // AJ 36
    {h:'Product Format',        type:'free',                      level:'ad'},     // AK 37
    {h:'Format Group',          type:'drop',list:'FormatGroup',   level:'ad'},     // AL 38
    {h:'Position',              type:'drop',list:'Position',      level:'ad'},     // AM 39
    {h:'Influencer Brand',      type:'free',                      level:'ad'},     // AN 40
    {h:'Influencer Name',       type:'free',                      level:'ad'},     // AO 41
    {h:'Seconds',               type:'free',                      level:'ad'},     // AP 42
    {h:'Tipo de Tag',           type:'drop',list:'TipodeTag',     level:'ad'},     // AQ 43
    {h:'MidiaAdName-Extra',     type:'free',                      level:'ad'},     // AR 44
    {h:'📋 AD NAME',            type:'formula',                   level:'fml'},    // AS 45
    {h:'✅ Status',             type:'formula',                   level:'fml'}     // AT 46
  ]);
  batchCol(s,  2, 3, NROWS, function(r){ return cnFml('A',r); });
  batchCol(s,  7, 3, NROWS, function(r){ return objShortFml('F',r); });
  batchCol(s, 15, 3, NROWS, function(r){ return _s('IFERROR(IF(B'+r+'="","",IF(B'+r+'="CN nao encontrado","CN invalido",B'+r+'&"_"&C'+r+'&"_"&D'+r+'&"_"&'+sh('E',r)+'&"_"&G'+r+'&"_"&H'+r+pp('I',r)+pp('J',r)+pp('K',r)+pp('L',r)+pp('M',r)+pp('N',r)+')),"⚠️ Verificar colunas")'); });
  batchCol(s, 25, 3, NROWS, function(r){ return objOtimFml('X',r); });
  batchCol(s, 29, 3, NROWS, function(r){ return _s('IFERROR(IF(P'+r+'="","",P'+r+'&"_"&Q'+r+'&"_"&R'+r+'&"_"&S'+r+'&"_"&T'+r+'&"_"&'+age('U','V',r)+'&"_"&W'+r+pp('X',r)+pp('Z',r)+pp('AA',r)+pp('AB',r)+'),"⚠️ Verificar colunas")'); });
  batchCol(s, 45, 3, NROWS, function(r){ return _s('IFERROR(IF(AD'+r+'="","",AD'+r+'&"_"&AE'+r+'&"_"&AG'+r+'&"_"&AH'+r+'&"_"&AI'+r+uu('AJ',r)+uu('AK',r)+uu('AL',r)+pp('AM',r)+pp('AN',r)+pp('AO',r)+'&'+fsVsSeconds('AF','AP','AQ',r)+pp('AR',r)+'),"⚠️ Verificar colunas")'); });
  batchCol(s, 46, 3, NROWS, function(r){ return _s('IFERROR(IF(AS'+r+'<>"",IF(AND(B'+r+'<>"",B'+r+'<>"CN nao encontrado",P'+r+'<>"",AD'+r+'<>""),"OK","Incompleto"),""),"⚠️ Verificar colunas")'); });
  protectCols(s,[2,7,15,25,29,45,46]);
  log('Amazon DSP OK');
}

// ---- COMPRA DIRETA ----
function buildCompraDireta(){
  var s=buildSheet('Compra Direta',[
    {h:'Campaign Name',         type:'cn_drop',  level:'camp'},   // A  1
    {h:'📋 CN Code',            type:'cn_result',level:'camp'},   // B  2
    {h:'Brand',                 type:'drop',list:'Brand',         level:'camp'},   // C  3
    {h:'Market',                type:'drop',list:'Market',        level:'camp'},   // D  4
    {h:'Objective',             type:'drop',list:'Objective',     level:'camp'},   // E  5
    {h:'📋 Objective-Short',    type:'cn_result',level:'camp'},   // F  6
    {h:'Campaign Local',        type:'drop',list:'CampaignLocal', level:'camp'},   // G  7
    {h:'Brandlift',             type:'drop',list:'Brandlift',     level:'camp'},   // H  8
    {h:'Pilar',                 type:'free',                      level:'camp'},   // I  9
    {h:'MidiaCampaignLocal-Extra',type:'free',                    level:'camp'},   // J  10
    {h:'📋 CAMPAIGN NAME',      type:'formula',                   level:'fml'},    // K  11
    {h:'Placement Type',        type:'drop',list:'PlacementType', level:'ag'},     // L  12
    {h:'Creative Name',         type:'free',                      level:'ag'},     // M  13
    {h:'Landing Page',          type:'drop',list:'LandingPage',   level:'ag'},     // N  14
    {h:'Retailer',              type:'drop',list:'Retailer',      level:'ag'},     // O  15
    {h:'Influencer',            type:'drop',list:'Influencer',    level:'ag'},     // P  16
    {h:'Obj Otimização',        type:'drop',list:'ObjOtimizacao', level:'ag'},     // Q  17
    {h:'📋 Obj Otim-Short',     type:'cn_result',level:'ag'},                      // R  18
    {h:'Publisher',             type:'drop',list:'Publisher',     level:'ag'},     // S  19
    {h:'Buying Type',           type:'drop',list:'BuyType',       level:'ag'},     // T  20
    {h:'Location Type',         type:'drop',list:'LocationType',  level:'ag'},     // U  21
    {h:'Location',              type:'drop',list:'Location',      level:'ag'},     // V  22
    {h:'Audience Type',         type:'drop',list:'AudienceType',  level:'ag'},     // W  23
    {h:'MidiaGroup-Extra',      type:'free',                      level:'ag'},     // X  24
    {h:'📋 ADGROUP NAME',       type:'formula',                   level:'fml'},    // Y  25
    {h:'Creative Name Ad',      type:'free',                      level:'ad'},     // Z  26
    {h:'Format Type',           type:'free',                      level:'ad'},     // AA 27
    {h:'Position',              type:'drop',list:'Position',      level:'ad'},     // AB 28
    {h:'Influencer Brand',      type:'free',                      level:'ad'},     // AC 29
    {h:'Influencer Name',       type:'free',                      level:'ad'},     // AD 30
    {h:'Seconds',               type:'free',                      level:'ad'},     // AE 31
    {h:'MidiaAdName-Extra',     type:'free',                      level:'ad'},     // AF 32
    {h:'📋 AD NAME',            type:'formula',                   level:'fml'},    // AG 33
    {h:'✅ Status',             type:'formula',                   level:'fml'}     // AH 34
  ]);
  batchCol(s,  2, 3, NROWS, function(r){ return cnFml('A',r); });
  batchCol(s,  6, 3, NROWS, function(r){ return objShortFml('E',r); });
  batchCol(s, 11, 3, NROWS, function(r){ return _s('IFERROR(IF(B'+r+'="","",B'+r+'&"_"&C'+r+'&"_"&D'+r+'&"_"&F'+r+'&"_"&G'+r+pp('H',r)+pp('I',r)+pp('J',r)+'),"⚠️ Verificar colunas")'); });
  batchCol(s, 18, 3, NROWS, function(r){ return objOtimFml('Q',r); });
  batchCol(s, 25, 3, NROWS, function(r){ return _s('IFERROR(IF(L'+r+'="","",L'+r+'&"_"&M'+r+'&"_"&N'+r+'&"_"&O'+r+'&"_"&P'+r+pp('Q',r)+pp('S',r)+pp('T',r)+pp('U',r)+pp('V',r)+pp('W',r)+pp('X',r)+'),"⚠️ Verificar colunas")'); });
  batchCol(s, 33, 3, NROWS, function(r){ return _s('IFERROR(IF(Z'+r+'="","",Z'+r+'&"_"&AA'+r+pp('AB',r)+pp('AC',r)+pp('AD',r)+pp('AE',r)+pp('AF',r)+'),"⚠️ Verificar colunas")'); });
  batchCol(s, 34, 3, NROWS, function(r){ return _s('IFERROR(IF(AG'+r+'<>"",IF(AND(B'+r+'<>"",B'+r+'<>"CN nao encontrado",L'+r+'<>"",Z'+r+'<>""),"OK","Incompleto"),""),"⚠️ Verificar colunas")'); });
  protectCols(s,[2,6,11,18,25,33,34]);
  log('Compra Direta OK');
}

// ---- DV360 - PROGRAMÁTICA ----
function buildDV360Prog(){
  var s=buildSheet('DV360 - Programática',[
    {h:'Campaign Name',         type:'cn_drop',  level:'camp'},   // A  1
    {h:'📋 CN Code',            type:'cn_result',level:'camp'},   // B  2
    {h:'Market',                type:'drop',list:'Market',        level:'camp'},   // C  3
    {h:'Brand',                 type:'drop',list:'Brand',         level:'camp'},   // D  4
    {h:'Objective',             type:'drop',list:'Objective',     level:'camp'},   // E  5
    {h:'📋 Objective-Short',    type:'cn_result',level:'camp'},   // F  6
    {h:'Campaign Local',        type:'drop',list:'CampaignLocal', level:'camp'},   // G  7
    {h:'Brandlift',             type:'drop',list:'Brandlift',     level:'camp'},   // H  8
    {h:'Publisher',             type:'drop',list:'Publisher',     level:'camp'},   // I  9
    {h:'Location Type',         type:'drop',list:'LocationType',  level:'camp'},   // J  10
    {h:'Location',              type:'drop',list:'Location',      level:'camp'},   // K  11
    {h:'Pilar',                 type:'free',                      level:'camp'},   // L  12
    {h:'MidiaIO-Extra',         type:'free',                      level:'camp'},   // M  13
    {h:'📋 CAMPAIGN NAME',      type:'formula',                   level:'fml'},    // N  14
    {h:'Buy Model',             type:'drop',list:'BuyModel',      level:'ag'},     // O  15
    {h:'Targeting Strategy',    type:'drop',list:'TargetStrategy',level:'ag'},     // P  16
    {h:'Audience Party',        type:'drop',list:'AudienceParty', level:'ag'},     // Q  17
    {h:'Audience Name',         type:'free',                      level:'ag'},     // R  18
    {h:'Gender',                type:'drop',list:'Gender',        level:'ag'},     // S  19
    {h:'Age Lower',             type:'free',                      level:'ag'},     // T  20
    {h:'Age Upper',             type:'free',                      level:'ag'},     // U  21
    {h:'Device Type',           type:'drop',list:'DeviceType',    level:'ag'},     // V  22
    {h:'Obj Otimização',        type:'drop',list:'ObjOtimizacao', level:'ag'},     // W  23
    {h:'📋 Obj Otim-Short',     type:'cn_result',level:'ag'},                      // X  24
    {h:'Audience Type',         type:'drop',list:'AudienceType',  level:'ag'},     // Y  25
    {h:'Buying Type',           type:'drop',list:'BuyType',       level:'ag'},     // Z  26
    {h:'MidiaLineitem-Extra',   type:'free',                      level:'ag'},     // AA 27
    {h:'📋 ADGROUP NAME',       type:'formula',                   level:'fml'},    // AB 28
    {h:'Placement Type',        type:'drop',list:'PlacementType', level:'ad'},     // AC 29
    {h:'Creative Name',         type:'free',                      level:'ad'},     // AD 30
    {h:'Landing Page',          type:'drop',list:'LandingPage',   level:'ad'},     // AE 31
    {h:'Retailer',              type:'drop',list:'Retailer',      level:'ad'},     // AF 32
    {h:'Influencer',            type:'drop',list:'Influencer',    level:'ad'},     // AG 33
    {h:'Format Group',          type:'drop',list:'FormatGroup',   level:'ad'},     // AH 34
    {h:'Position',              type:'drop',list:'Position',      level:'ad'},     // AI 35
    {h:'Influencer Brand',      type:'free',                      level:'ad'},     // AJ 36
    {h:'Influencer Name',       type:'free',                      level:'ad'},     // AK 37
    {h:'Seconds',               type:'free',                      level:'ad'},     // AL 38
    {h:'Tipo de Tag',           type:'drop',list:'TipodeTag',     level:'ad'},     // AM 39
    {h:'MidiaAdName-Extra',     type:'free',                      level:'ad'},     // AN 40
    {h:'📋 AD NAME',            type:'formula',                   level:'fml'},    // AO 41
    {h:'✅ Status',             type:'formula',                   level:'fml'}     // AP 42
  ]);
  batchCol(s,  2, 3, NROWS, function(r){ return cnFml('A',r); });
  batchCol(s,  6, 3, NROWS, function(r){ return objShortFml('E',r); });
  batchCol(s, 14, 3, NROWS, function(r){ return _s('IFERROR(IF(B'+r+'="","",B'+r+'&"_"&C'+r+'&"_"&D'+r+'&"_"&F'+r+'&"_"&G'+r+pp('H',r)+pp('I',r)+pp('J',r)+pp('K',r)+pp('L',r)+pp('M',r)+'),"⚠️ Verificar colunas")'); });
  batchCol(s, 24, 3, NROWS, function(r){ return objOtimFml('W',r); });
  batchCol(s, 28, 3, NROWS, function(r){ return _s('IFERROR(IF(O'+r+'="","",O'+r+'&"_"&P'+r+'&"_"&Q'+r+'&"_"&R'+r+'&"_"&S'+r+'&"_"&'+age('T','U',r)+'&"_"&V'+r+pp('W',r)+pp('Y',r)+pp('Z',r)+pp('AA',r)+'),"⚠️ Verificar colunas")'); });
  batchCol(s, 41, 3, NROWS, function(r){ return _s('IFERROR(IF(AC'+r+'="","",AC'+r+'&"_"&AD'+r+'&"_"&AE'+r+'&"_"&AF'+r+'&"_"&AG'+r+uu('AH',r)+pp('AI',r)+pp('AJ',r)+pp('AK',r)+pp('AL',r)+pp('AM',r)+pp('AN',r)+'),"⚠️ Verificar colunas")'); });
  batchCol(s, 42, 3, NROWS, function(r){ return _s('IFERROR(IF(AO'+r+'<>"",IF(AND(B'+r+'<>"",B'+r+'<>"CN nao encontrado",O'+r+'<>"",AC'+r+'<>""),"OK","Incompleto"),""),"⚠️ Verificar colunas")'); });
  protectCols(s,[2,6,14,24,28,41,42]);
  log('DV360 - Programática OK');
}

// ---- DV360 - TRADEDESK ----
function buildDV360TD(){
  var s=buildSheet('DV360 - TradeDesk',[
    {h:'Campaign Name',         type:'cn_drop',  level:'camp'},   // A  1
    {h:'📋 CN Code',            type:'cn_result',level:'camp'},   // B  2
    {h:'Market',                type:'drop',list:'Market',        level:'camp'},   // C  3
    {h:'Brand',                 type:'drop',list:'Brand',         level:'camp'},   // D  4
    {h:'Campaign Type',         type:'free',                      level:'camp'},   // E  5
    {h:'Format Type',           type:'drop',list:'FormatType',    level:'camp'},   // F  6
    {h:'Objective',             type:'drop',list:'Objective',     level:'camp'},   // G  7
    {h:'📋 Objective-Short',    type:'cn_result',level:'camp'},   // H  8
    {h:'Mes/Ano',               type:'free',                      level:'camp'},   // I  9
    {h:'Campaign Local',        type:'drop',list:'CampaignLocal', level:'camp'},   // J  10
    {h:'Brandlift',             type:'drop',list:'Brandlift',     level:'camp'},   // K  11
    {h:'Costfree',              type:'free',                      level:'camp'},   // L  12
    {h:'Plataforma',            type:'free',                      level:'camp'},   // M  13
    {h:'Publisher',             type:'drop',list:'Publisher',     level:'camp'},   // N  14
    {h:'Location Type',         type:'drop',list:'LocationType',  level:'camp'},   // O  15
    {h:'Location',              type:'drop',list:'Location',      level:'camp'},   // P  16
    {h:'MidiaIO-Extra',         type:'free',                      level:'camp'},   // Q  17
    {h:'📋 CAMPAIGN NAME',      type:'formula',                   level:'fml'},    // R  18
    {h:'Buy Model',             type:'drop',list:'BuyModel',      level:'ag'},     // S  19
    {h:'Targeting Strategy',    type:'drop',list:'TargetStrategy',level:'ag'},     // T  20
    {h:'Placement Type',        type:'drop',list:'PlacementType', level:'ag'},     // U  21
    {h:'Audience Party',        type:'drop',list:'AudienceParty', level:'ag'},     // V  22
    {h:'Audience Type',         type:'drop',list:'AudienceType',  level:'ag'},     // W  23
    {h:'Audience Name',         type:'free',                      level:'ag'},     // X  24
    {h:'Gender',                type:'drop',list:'Gender',        level:'ag'},     // Y  25
    {h:'Age Lower',             type:'free',                      level:'ag'},     // Z  26
    {h:'Age Upper',             type:'free',                      level:'ag'},     // AA 27
    {h:'Device Type',           type:'drop',list:'DeviceType',    level:'ag'},     // AB 28
    {h:'Publisher Name',        type:'free',                      level:'ag'},     // AC 29
    {h:'Mes/Ano 2',             type:'free',                      level:'ag'},     // AD 30
    {h:'Tipo Audiencia',        type:'free',                      level:'ag'},     // AE 31
    {h:'Spec Audiencia',        type:'free',                      level:'ag'},     // AF 32
    {h:'Audience Details',      type:'free',                      level:'ag'},     // AG 33
    {h:'Buying Type',           type:'drop',list:'BuyType',       level:'ag'},     // AH 34
    {h:'MidiaAdgroup-Extra',    type:'free',                      level:'ag'},     // AI 35
    {h:'📋 ADGROUP NAME',       type:'formula',                   level:'fml'},    // AJ 36
    {h:'Campaign Name Ad',      type:'cn_drop',  level:'ad'},     // AK 37
    {h:'📋 CN Code Ad',         type:'cn_result',level:'ad'},     // AL 38
    {h:'Placement Type Ad',     type:'drop',list:'PlacementType', level:'ad'},     // AM 39
    {h:'Format Type Ad',        type:'drop',list:'FormatType',    level:'ad'},     // AN 40
    {h:'Format Size',           type:'free',                      level:'ad'},     // AO 41
    {h:'Creative Name',         type:'free',                      level:'ad'},     // AP 42
    {h:'Landing Page',          type:'drop',list:'LandingPage',   level:'ad'},     // AQ 43
    {h:'Retailer',              type:'drop',list:'Retailer',      level:'ad'},     // AR 44
    {h:'Publisher Name Ad',     type:'free',                      level:'ad'},     // AS 45
    {h:'Influencer',            type:'drop',list:'Influencer',    level:'ad'},     // AT 46
    {h:'Format Group',          type:'drop',list:'FormatGroup',   level:'ad'},     // AU 47
    {h:'Position',              type:'drop',list:'Position',      level:'ad'},     // AV 48
    {h:'Influencer Brand',      type:'free',                      level:'ad'},     // AW 49
    {h:'Influencer Name',       type:'free',                      level:'ad'},     // AX 50
    {h:'Seconds',               type:'free',                      level:'ad'},     // AY 51
    {h:'Tipo de Tag',           type:'drop',list:'TipodeTag',     level:'ad'},     // AZ 52
    {h:'MidiaAdName-Extra',     type:'free',                      level:'ad'},     // BA 53
    {h:'📋 AD NAME',            type:'formula',                   level:'fml'},    // BB 54
    {h:'✅ Status',             type:'formula',                   level:'fml'}     // BC 55
  ]);
  batchCol(s,  2, 3, NROWS, function(r){ return cnFml('A',r); });
  batchCol(s,  8, 3, NROWS, function(r){ return objShortFml('G',r); });
  batchCol(s, 18, 3, NROWS, function(r){ return _s('IFERROR(IF(B'+r+'="","",C'+r+'&"_"&D'+r+'&"_"&B'+r+'&"_"&E'+r+'&"_"&'+sh('F',r)+'&"_"&H'+r+'&"_"&I'+r+pp('J',r)+pp('K',r)+pp('L',r)+pp('M',r)+pp('N',r)+pp('O',r)+pp('P',r)+pp('Q',r)+'),"⚠️ Verificar colunas")'); });
  batchCol(s, 36, 3, NROWS, function(r){ return _s('IFERROR(IF(S'+r+'="","",S'+r+'&"_"&T'+r+'&"_"&U'+r+'&"_"&V'+r+'&"_"&W'+r+'&"_"&X'+r+'&"_"&Y'+r+'&"_"&'+age('Z','AA',r)+'&"_"&AB'+r+'&"_"&AC'+r+pp('AD',r)+pp('AE',r)+pp('AF',r)+pp('AG',r)+pp('AH',r)+pp('AI',r)+'),"⚠️ Verificar colunas")'); });
  batchCol(s, 38, 3, NROWS, function(r){ return cnFml('AK',r); });
  // AD NAME: Format Size (AO) vs Seconds (AY) via Tipo de Tag (AZ); TipodeTag entra no naming
  batchCol(s, 54, 3, NROWS, function(r){ return _s('IFERROR(IF(AL'+r+'="","",AL'+r+'&"_"&AM'+r+'&"_"&'+sh('AN',r)+'&"_"&AP'+r+'&"_"&AQ'+r+'&"_"&AR'+r+'&"_"&AS'+r+uu('AT',r)+uu('AU',r)+uu('AV',r)+'&'+fsVsSeconds('AO','AY','AZ',r)+pp('AW',r)+pp('AX',r)+pp('AY',r)+pp('AZ',r)+pp('BA',r)+'),"⚠️ Verificar colunas")'); });
  batchCol(s, 55, 3, NROWS, function(r){ return _s('IFERROR(IF(BB'+r+'<>"",IF(AND(B'+r+'<>"",B'+r+'<>"CN nao encontrado",S'+r+'<>"",AL'+r+'<>""),"OK","Incompleto"),""),"⚠️ Verificar colunas")'); });
  protectCols(s,[2,8,18,36,38,54,55]);
  log('DV360 - TradeDesk OK');
}

// ---- DV360 - YT AUCTION ----
function buildDV360YTAuction(){
  var s=buildSheet('DV360 - YT Auction',[
    {h:'Campaign Name',         type:'cn_drop',  level:'camp'},   // A  1
    {h:'📋 CN Code',            type:'cn_result',level:'camp'},   // B  2
    {h:'Market',                type:'drop',list:'Market',        level:'camp'},   // C  3
    {h:'Brand',                 type:'drop',list:'Brand',         level:'camp'},   // D  4
    {h:'Buy Model',             type:'drop',list:'BuyModel',      level:'camp'},   // E  5
    {h:'Objective',             type:'drop',list:'Objective',     level:'camp'},   // F  6
    {h:'📋 Objective-Short',    type:'cn_result',level:'camp'},   // G  7
    {h:'Campaign Local',        type:'drop',list:'CampaignLocal', level:'camp'},   // H  8
    {h:'Brandlift',             type:'drop',list:'Brandlift',     level:'camp'},   // I  9
    {h:'Publisher',             type:'drop',list:'Publisher',     level:'camp'},   // J  10
    {h:'Location Type',         type:'drop',list:'LocationType',  level:'camp'},   // K  11
    {h:'Location',              type:'drop',list:'Location',      level:'camp'},   // L  12
    {h:'Pilar',                 type:'free',                      level:'camp'},   // M  13
    {h:'MidiaIO-Extra',         type:'free',                      level:'camp'},   // N  14
    {h:'📋 CAMPAIGN NAME',      type:'formula',                   level:'fml'},    // O  15
    {h:'⚠️ Line-Item (não entra no banco)',type:'note',noteText:'Line-Item NAO entra no banco de dados.',level:'note'}, // P 16
    {h:'Audience Party',        type:'drop',list:'AudienceParty', level:'ag'},     // Q  17
    {h:'Audience Name',         type:'free',                      level:'ag'},     // R  18
    {h:'Gender',                type:'drop',list:'Gender',        level:'ag'},     // S  19
    {h:'Age Lower',             type:'free',                      level:'ag'},     // T  20
    {h:'Age Upper',             type:'free',                      level:'ag'},     // U  21
    {h:'Buy Model 2',           type:'drop',list:'BuyModel',      level:'ag'},     // V  22
    {h:'Obj Otimização',        type:'drop',list:'ObjOtimizacao', level:'ag'},     // W  23
    {h:'📋 Obj Otim-Short',     type:'cn_result',level:'ag'},                      // X  24
    {h:'Audience Type',         type:'drop',list:'AudienceType',  level:'ag'},     // Y  25
    {h:'Buying Type',           type:'drop',list:'BuyType',       level:'ag'},     // Z  26
    {h:'Midiaadgroup-Extra',    type:'free',                      level:'ag'},     // AA 27
    {h:'📋 ADGROUP NAME',       type:'formula',                   level:'fml'},    // AB 28
    {h:'Creative Name',         type:'free',                      level:'ad'},     // AC 29
    {h:'Landing Page',          type:'drop',list:'LandingPage',   level:'ad'},     // AD 30
    {h:'Retailer',              type:'drop',list:'Retailer',      level:'ad'},     // AE 31
    {h:'Influencer',            type:'drop',list:'Influencer',    level:'ad'},     // AF 32
    {h:'Format Group',          type:'drop',list:'FormatGroup',   level:'ad'},     // AG 33
    {h:'Position',              type:'drop',list:'Position',      level:'ad'},     // AH 34
    {h:'Influencer Brand',      type:'free',                      level:'ad'},     // AI 35
    {h:'Influencer Name',       type:'free',                      level:'ad'},     // AJ 36
    {h:'Seconds',               type:'free',                      level:'ad'},     // AK 37
    {h:'MidiaAdName-Extra',     type:'free',                      level:'ad'},     // AL 38
    {h:'📋 AD NAME',            type:'formula',                   level:'fml'},    // AM 39
    {h:'✅ Status',             type:'formula',                   level:'fml'}     // AN 40
  ]);
  batchCol(s,  2, 3, NROWS, function(r){ return cnFml('A',r); });
  batchCol(s,  7, 3, NROWS, function(r){ return objShortFml('F',r); });
  batchCol(s, 15, 3, NROWS, function(r){ return _s('IFERROR(IF(B'+r+'="","",B'+r+'&"_"&C'+r+'&"_"&D'+r+'&"_"&E'+r+'&"_"&G'+r+'&"_"&H'+r+pp('I',r)+pp('J',r)+pp('K',r)+pp('L',r)+pp('M',r)+pp('N',r)+'),"⚠️ Verificar colunas")'); });
  batchCol(s, 24, 3, NROWS, function(r){ return objOtimFml('W',r); });
  batchCol(s, 28, 3, NROWS, function(r){ return _s('IFERROR(IF(Q'+r+'="","",Q'+r+'&"_"&R'+r+'&"_"&S'+r+'&"_"&'+age('T','U',r)+'&"_"&V'+r+pp('W',r)+pp('Y',r)+pp('Z',r)+pp('AA',r)+'),"⚠️ Verificar colunas")'); });
  batchCol(s, 39, 3, NROWS, function(r){ return _s('IFERROR(IF(AC'+r+'="","",AC'+r+'&"_"&AD'+r+'&"_"&AE'+r+uu('AF',r)+uu('AG',r)+pp('AH',r)+pp('AI',r)+pp('AJ',r)+pp('AK',r)+pp('AL',r)+'),"⚠️ Verificar colunas")'); });
  batchCol(s, 40, 3, NROWS, function(r){ return _s('IFERROR(IF(AM'+r+'<>"",IF(AND(B'+r+'<>"",B'+r+'<>"CN nao encontrado",Q'+r+'<>"",AC'+r+'<>""),"OK","Incompleto"),""),"⚠️ Verificar colunas")'); });
  protectCols(s,[2,7,15,24,28,39,40]);
  log('DV360 - YT Auction OK');
}

// ---- DV360 - YT RESERVA ----
function buildDV360YTReserva(){
  var s=buildSheet('DV360 - YT Reserva',[
    {h:'Campaign Name',         type:'cn_drop',  level:'camp'},   // A  1
    {h:'📋 CN Code',            type:'cn_result',level:'camp'},   // B  2
    {h:'Market',                type:'drop',list:'Market',        level:'camp'},   // C  3
    {h:'Brand',                 type:'drop',list:'Brand',         level:'camp'},   // D  4
    {h:'Buy Model',             type:'drop',list:'BuyModel',      level:'camp'},   // E  5
    {h:'Objective',             type:'drop',list:'Objective',     level:'camp'},   // F  6
    {h:'📋 Objective-Short',    type:'cn_result',level:'camp'},   // G  7
    {h:'Campaign Local',        type:'drop',list:'CampaignLocal', level:'camp'},   // H  8
    {h:'Brandlift',             type:'drop',list:'Brandlift',     level:'camp'},   // I  9
    {h:'Publisher',             type:'drop',list:'Publisher',     level:'camp'},   // J  10
    {h:'Location Type',         type:'drop',list:'LocationType',  level:'camp'},   // K  11
    {h:'Location',              type:'drop',list:'Location',      level:'camp'},   // L  12
    {h:'Pilar',                 type:'free',                      level:'camp'},   // M  13
    {h:'MidiaIO-Extra',         type:'free',                      level:'camp'},   // N  14
    {h:'📋 CAMPAIGN NAME',      type:'formula',                   level:'fml'},    // O  15
    {h:'⚠️ Line-Item (não entra no banco)',type:'note',noteText:'Line-Item NAO entra no banco de dados.',level:'note'}, // P 16
    {h:'Placement Type',        type:'drop',list:'PlacementType', level:'ag'},     // Q  17
    {h:'Audience Party',        type:'drop',list:'AudienceParty', level:'ag'},     // R  18
    {h:'Audience Name',         type:'free',                      level:'ag'},     // S  19
    {h:'Gender',                type:'drop',list:'Gender',        level:'ag'},     // T  20
    {h:'Age Lower',             type:'free',                      level:'ag'},     // U  21
    {h:'Age Upper',             type:'free',                      level:'ag'},     // V  22
    {h:'Buy Model 2',           type:'drop',list:'BuyModel',      level:'ag'},     // W  23
    {h:'Obj Otimização',        type:'drop',list:'ObjOtimizacao', level:'ag'},     // X  24
    {h:'📋 Obj Otim-Short',     type:'cn_result',level:'ag'},                      // Y  25
    {h:'Audience Type',         type:'drop',list:'AudienceType',  level:'ag'},     // Z  26
    {h:'Buying Type',           type:'drop',list:'BuyType',       level:'ag'},     // AA 27
    {h:'Midiaadgroup-Extra',    type:'free',                      level:'ag'},     // AB 28
    {h:'📋 ADGROUP NAME',       type:'formula',                   level:'fml'},    // AC 29
    {h:'Creative Name',         type:'free',                      level:'ad'},     // AD 30
    {h:'Landing Page',          type:'drop',list:'LandingPage',   level:'ad'},     // AE 31
    {h:'Retailer',              type:'drop',list:'Retailer',      level:'ad'},     // AF 32
    {h:'Format Size',           type:'free',                      level:'ad'},     // AG 33
    {h:'Influencer',            type:'drop',list:'Influencer',    level:'ad'},     // AH 34
    {h:'Format Group',          type:'drop',list:'FormatGroup',   level:'ad'},     // AI 35
    {h:'Position',              type:'drop',list:'Position',      level:'ad'},     // AJ 36
    {h:'Influencer Brand',      type:'free',                      level:'ad'},     // AK 37
    {h:'Influencer Name',       type:'free',                      level:'ad'},     // AL 38
    {h:'Seconds',               type:'free',                      level:'ad'},     // AM 39
    {h:'MidiaAdName-Extra',     type:'free',                      level:'ad'},     // AN 40
    {h:'📋 AD NAME',            type:'formula',                   level:'fml'},    // AO 41
    {h:'✅ Status',             type:'formula',                   level:'fml'}     // AP 42
  ]);
  batchCol(s,  2, 3, NROWS, function(r){ return cnFml('A',r); });
  batchCol(s,  7, 3, NROWS, function(r){ return objShortFml('F',r); });
  batchCol(s, 15, 3, NROWS, function(r){ return _s('IFERROR(IF(B'+r+'="","",B'+r+'&"_"&C'+r+'&"_"&D'+r+'&"_"&E'+r+'&"_"&G'+r+'&"_"&H'+r+pp('I',r)+pp('J',r)+pp('K',r)+pp('L',r)+pp('M',r)+pp('N',r)+'),"⚠️ Verificar colunas")'); });
  batchCol(s, 25, 3, NROWS, function(r){ return objOtimFml('X',r); });
  batchCol(s, 29, 3, NROWS, function(r){ return _s('IFERROR(IF(R'+r+'="","",Q'+r+'&"_"&R'+r+'&"_"&S'+r+'&"_"&T'+r+'&"_"&'+age('U','V',r)+'&"_"&W'+r+pp('X',r)+pp('Z',r)+pp('AA',r)+pp('AB',r)+'),"⚠️ Verificar colunas")'); });
  batchCol(s, 41, 3, NROWS, function(r){ return _s('IFERROR(IF(AD'+r+'="","",AD'+r+'&"_"&AE'+r+'&"_"&AF'+r+'&"_"&AG'+r+uu('AH',r)+uu('AI',r)+uu('AJ',r)+pp('AK',r)+pp('AL',r)+pp('AM',r)+pp('AN',r)+'),"⚠️ Verificar colunas")'); });
  batchCol(s, 42, 3, NROWS, function(r){ return _s('IFERROR(IF(AO'+r+'<>"",IF(AND(B'+r+'<>"",B'+r+'<>"CN nao encontrado",R'+r+'<>"",AD'+r+'<>""),"OK","Incompleto"),""),"⚠️ Verificar colunas")'); });
  protectCols(s,[2,7,15,25,29,41,42]);
  log('DV360 - YT Reserva OK');
}

// ---- FLASHTALKING ----
// Campaign Local 2 removida. AD NAME segue taxonomia do dicionário:
// G_H_I_J_K_L_N_D + pp(O=MidiaCampLocal-Extra) + pp(Q=ObjOtim-Short) + pp(R=Publisher)
// + pp(S=BuyType) + pp(T=LocType) + pp(U=Location) + pp(V=AudType) + pp(W=MidiaGroup)
// + pp(X=FmtType) + pp(Y=Position) + pp(Z=InfBrand) + pp(AA=InfName)
// + pp(AB=Brandlift) + pp(AC=Seconds) + pp(AD=Pilar) + pp(AE=MidiaName-Extra)
function buildFlashtalking(){
  var s=buildSheet('Flashtalking',[
    {h:'Campaign Name',           type:'cn_drop',  level:'camp'},   // A  1
    {h:'📋 CN Code',              type:'cn_result',level:'camp'},   // B  2
    {h:'Brand',                   type:'drop',list:'Brand',         level:'camp'},   // C  3
    {h:'Campaign Local',          type:'drop',list:'CampaignLocal', level:'camp'},   // D  4
    {h:'📋 CAMPAIGN NAME',        type:'formula',                   level:'fml'},    // E  5
    {h:'Campaign Name Ad',        type:'cn_drop',  level:'ad'},     // F  6
    {h:'📋 CN Code Ad',           type:'cn_result',level:'ad'},     // G  7
    {h:'Market',                  type:'drop',list:'Market',        level:'ad'},     // H  8
    {h:'Placement Type',          type:'drop',list:'PlacementType', level:'ad'},     // I  9
    {h:'Creative Name',           type:'free',                      level:'ad'},     // J  10
    {h:'Landing Page',            type:'drop',list:'LandingPage',   level:'ad'},     // K  11
    {h:'Retailer',                type:'drop',list:'Retailer',      level:'ad'},     // L  12
    {h:'Objective',               type:'drop',list:'Objective',     level:'ad'},     // M  13
    {h:'📋 Objective-Short',      type:'cn_result',level:'ad'},     // N  14
    {h:'MidiaCampaignLocal-Extra',type:'free',                      level:'ad'},     // O  15  <- era Campaign Local 2, agora MidiaCampLocal-Extra
    {h:'Obj Otimização',          type:'drop',list:'ObjOtimizacao', level:'ad'},     // P  16
    {h:'📋 Obj Otim-Short',       type:'cn_result',level:'ad'},     // Q  17
    {h:'Publisher',               type:'drop',list:'Publisher',     level:'ad'},     // R  18
    {h:'Buying Type',             type:'drop',list:'BuyType',       level:'ad'},     // S  19
    {h:'Location Type',           type:'drop',list:'LocationType',  level:'ad'},     // T  20
    {h:'Location',                type:'drop',list:'Location',      level:'ad'},     // U  21
    {h:'Audience Type',           type:'drop',list:'AudienceType',  level:'ad'},     // V  22
    {h:'MidiaGroup-Extra',        type:'free',                      level:'ad'},     // W  23
    {h:'Format Type',             type:'drop',list:'FormatType',    level:'ad'},     // X  24
    {h:'Position',                type:'drop',list:'Position',      level:'ad'},     // Y  25
    {h:'Influencer Brand',        type:'free',                      level:'ad'},     // Z  26
    {h:'Influencer Name',         type:'free',                      level:'ad'},     // AA 27
    {h:'Brandlift',               type:'drop',list:'Brandlift',     level:'ad'},     // AB 28
    {h:'Seconds',                 type:'free',                      level:'ad'},     // AC 29
    {h:'Pilar',                   type:'free',                      level:'ad'},     // AD 30
    {h:'MidiaName-Extra',         type:'free',                      level:'ad'},     // AE 31
    {h:'📋 AD NAME',              type:'formula',                   level:'fml'},    // AF 32
    {h:'✅ Status',               type:'formula',                   level:'fml'}     // AG 33
  ]);
  batchCol(s,  2, 3, NROWS, function(r){ return cnFml('A',r); });
  batchCol(s,  5, 3, NROWS, function(r){ return _s('IFERROR(IF(B'+r+'="","",B'+r+'&"_"&C'+r+'&"_na_na_"&D'+r+'&"|na|na|na"),"⚠️ Verificar colunas")'); });
  batchCol(s,  7, 3, NROWS, function(r){ return cnFml('F',r); });
  batchCol(s, 14, 3, NROWS, function(r){ return objShortFml('M',r); });
  batchCol(s, 17, 3, NROWS, function(r){ return objOtimFml('P',r); });
  // AD NAME: G_H_I_J_K_L_N_D + opcionais conforme taxonomia
  batchCol(s, 32, 3, NROWS, function(r){ return _s('IFERROR(IF(G'+r+'="","",G'+r+'&"_"&H'+r+'&"_"&I'+r+'&"_"&J'+r+'&"_"&K'+r+'&"_"&L'+r+'&"_"&N'+r+'&"_"&D'+r+pp('O',r)+pp('Q',r)+pp('R',r)+pp('S',r)+pp('T',r)+pp('U',r)+pp('V',r)+pp('W',r)+pp('X',r)+pp('Y',r)+pp('Z',r)+pp('AA',r)+pp('AB',r)+pp('AC',r)+pp('AD',r)+pp('AE',r)+'),"⚠️ Verificar colunas")'); });
  batchCol(s, 33, 3, NROWS, function(r){ return _s('IFERROR(IF(AF'+r+'<>"",IF(AND(B'+r+'<>"",B'+r+'<>"CN nao encontrado",G'+r+'<>""),"OK","Incompleto"),""),"⚠️ Verificar colunas")'); });
  protectCols(s,[2,5,7,14,17,32,33]);
  log('Flashtalking OK');
}