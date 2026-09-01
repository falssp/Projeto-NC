// ============================================================
// NC Tool | Unilever BR x Grasp -- F2 v4 -- Arquivo 3: TABS 2
// Google Others, Google Search, Google Video,
// Meta, Pinterest, TikTok, Twitter
// Colunas "2" removidas; IFERROR amigável em todas as fórmulas
// ============================================================

function adNameIHAMP(ihampCol,crCol,fmtCol,landCol,retCol,fsCol,infptCol,infCol,handleCol,posCol,infbCol,infnCol,extraCol,row){
  var base=crCol+row+'&"_"&'+sh(fmtCol,row)+'&"_"&'+landCol+row+'&"_"&'+retCol+row+'&"_"&'+fsCol+row+'&"_"&'+infptCol+row+'&"_"&'+infCol+row+'&"_["&'+handleCol+row+'&"]_"&'+posCol+row+pp(infbCol,row);
  var sem=_s('IF('+crCol+row+'="","",'+base+pp(infnCol,row)+pp(extraCol,row)+')');
  var com=_s('IF('+crCol+row+'="","",'+base+pp(extraCol,row)+')');
  return _s('IFERROR(IF('+crCol+row+'="","",IF('+ihampCol+row+'="com-IHAMP",'+com+','+sem+')),"⚠️ Verificar colunas")');
}

// ---- GOOGLE OTHERS ----
function buildGoogleOthers(){
  var s=buildSheet('Google Others',[
    {h:'Campaign Name',           type:'cn_drop',  level:'camp'},   // A  1
    {h:'📋 CN Code',              type:'cn_result',level:'camp'},   // B  2
    {h:'Language',                type:'drop',list:'Language',      level:'camp'},   // C  3
    {h:'Market',                  type:'drop',list:'Market',        level:'camp'},   // D  4
    {h:'Objective',               type:'drop',list:'Objective',     level:'camp'},   // E  5
    {h:'📋 Objective-Short',      type:'cn_result',level:'camp'},   // F  6
    {h:'Format Type',             type:'drop',list:'FormatType',    level:'camp'},   // G  7
    {h:'Buy Type',                type:'drop',list:'BuyType',       level:'camp'},   // H  8
    {h:'Campaign Local',          type:'drop',list:'CampaignLocal', level:'camp'},   // I  9
    {h:'Brand',                   type:'drop',list:'Brand',         level:'camp'},   // J  10
    {h:'Brandlift',               type:'drop',list:'Brandlift',     level:'camp'},   // K  11
    {h:'Pilar',                   type:'free',                      level:'camp'},   // L  12
    {h:'MidiaCampaignLocal-Extra',type:'free',                      level:'camp'},   // M  13
    {h:'📋 CAMPAIGN NAME',        type:'formula',                   level:'fml'},    // N  14
    {h:'Audience Party',          type:'drop',list:'AudienceParty', level:'ag'},     // O  15
    {h:'Landing Page',            type:'drop',list:'LandingPage',   level:'ag'},     // P  16
    {h:'Retailer',                type:'drop',list:'Retailer',      level:'ag'},     // Q  17
    {h:'Influencer',              type:'drop',list:'Influencer',    level:'ag'},     // R  18
    {h:'Obj Otimização',          type:'drop',list:'ObjOtimizacao', level:'ag'},     // S  19
    {h:'📋 Obj Otim-Short',       type:'cn_result',level:'ag'},                      // T  20
    {h:'Plataforma',              type:'free',                      level:'ag'},     // U  21
    {h:'Publisher',               type:'drop',list:'Publisher',     level:'ag'},     // V  22
    {h:'Buying Type',             type:'drop',list:'BuyType',       level:'ag'},     // W  23
    {h:'Location Type',           type:'drop',list:'LocationType',  level:'ag'},     // X  24
    {h:'Location',                type:'drop',list:'Location',      level:'ag'},     // Y  25
    {h:'Audience Type',           type:'drop',list:'AudienceType',  level:'ag'},     // Z  26
    {h:'Gender',                  type:'drop',list:'Gender',        level:'ag'},     // AA 27
    {h:'Age Lower',               type:'free',                      level:'ag'},     // AB 28
    {h:'Age Upper',               type:'free',                      level:'ag'},     // AC 29
    {h:'MidiaGroup-Extra',        type:'free',                      level:'ag'},     // AD 30
    {h:'📋 ADGROUP NAME',         type:'formula',                   level:'fml'},    // AE 31
    {h:'Creative Name',           type:'free',                      level:'ad'},     // AF 32
    {h:'Position',                type:'drop',list:'Position',      level:'ad'},     // AG 33
    {h:'Influencer Ad',           type:'drop',list:'Influencer',    level:'ad'},     // AH 34
    {h:'Influencer Brand',        type:'free',                      level:'ad'},     // AI 35
    {h:'Influencer Name',         type:'free',                      level:'ad'},     // AJ 36
    {h:'Seconds',                 type:'free',                      level:'ad'},     // AK 37
    {h:'MidiaAdName-Extra',       type:'free',                      level:'ad'},     // AL 38
    {h:'📋 AD NAME',              type:'formula',                   level:'fml'},    // AM 39
    {h:'✅ Status',               type:'formula',                   level:'fml'}     // AN 40
  ]);
  batchCol(s,  2, 3, NROWS, function(r){ return cnFml('A',r); });
  batchCol(s,  6, 3, NROWS, function(r){ return objShortFml('E',r); });
  batchCol(s, 14, 3, NROWS, function(r){ return _s('IFERROR(IF(B'+r+'="","",B'+r+'&"_"&C'+r+'&"_"&D'+r+'&"_"&F'+r+'&"_"&'+sh('G',r)+'&"_"&'+sh('H',r)+'&"_"&I'+r+pp('J',r)+pp('K',r)+pp('L',r)+pp('M',r)+'),"⚠️ Verificar colunas")'); });
  batchCol(s, 20, 3, NROWS, function(r){ return objOtimFml('S',r); });
  batchCol(s, 31, 3, NROWS, function(r){ return _s('IFERROR(IF(O'+r+'="","",O'+r+'&"_"&P'+r+'&"_"&Q'+r+'&"_"&R'+r+pp('S',r)+pp('U',r)+pp('V',r)+pp('W',r)+pp('X',r)+pp('Y',r)+pp('Z',r)+pp('AA',r)+'&IF(AB'+r+'<>"","|"&AB'+r+'&IF(AC'+r+'<>"","-"&AC'+r+',"")","")'+pp('AD',r)+'),"⚠️ Verificar colunas")'); });
  batchCol(s, 39, 3, NROWS, function(r){ return _s('IFERROR(IF(AF'+r+'="","",AF'+r+pp('AG',r)+pp('AH',r)+pp('AI',r)+pp('AJ',r)+pp('AK',r)+pp('AL',r)+'),"⚠️ Verificar colunas")'); });
  batchCol(s, 40, 3, NROWS, function(r){ return _s('IFERROR(IF(AM'+r+'<>"",IF(AND(B'+r+'<>"",B'+r+'<>"CN nao encontrado",O'+r+'<>"",AF'+r+'<>""),"OK","Incompleto"),""),"⚠️ Verificar colunas")'); });
  protectCols(s,[2,6,14,20,31,39,40]);
  log('Google Others OK');
}

// ---- GOOGLE SEARCH ----
function buildGoogleSearch(){
  var s=buildSheet('Google Search',[
    {h:'Campaign Name',           type:'cn_drop',  level:'camp'},   // A  1
    {h:'📋 CN Code',              type:'cn_result',level:'camp'},   // B  2
    {h:'Language',                type:'drop',list:'Language',      level:'camp'},   // C  3
    {h:'Market',                  type:'drop',list:'Market',        level:'camp'},   // D  4
    {h:'Objective',               type:'drop',list:'Objective',     level:'camp'},   // E  5
    {h:'📋 Objective-Short',      type:'cn_result',level:'camp'},   // F  6
    {h:'Format Type',             type:'drop',list:'FormatType',    level:'camp'},   // G  7
    {h:'Buy Type',                type:'drop',list:'BuyType',       level:'camp'},   // H  8
    {h:'Keyword Type',            type:'drop',list:'KeywordType',   level:'camp'},   // I  9
    {h:'Keyword Match',           type:'drop',list:'KeywordMatch',  level:'camp'},   // J  10
    {h:'Campaign Local',          type:'drop',list:'CampaignLocal', level:'camp'},   // K  11
    {h:'Brand',                   type:'drop',list:'Brand',         level:'camp'},   // L  12
    {h:'Brandlift',               type:'drop',list:'Brandlift',     level:'camp'},   // M  13
    {h:'Pilar',                   type:'free',                      level:'camp'},   // N  14
    {h:'MidiaCampaignLocal-Extra',type:'free',                      level:'camp'},   // O  15
    {h:'📋 CAMPAIGN NAME',        type:'formula',                   level:'fml'},    // P  16
    {h:'Landing Page',            type:'drop',list:'LandingPage',   level:'ag'},     // Q  17
    {h:'Retailer',                type:'drop',list:'Retailer',      level:'ag'},     // R  18
    {h:'Obj Otimização',          type:'drop',list:'ObjOtimizacao', level:'ag'},     // S  19
    {h:'📋 Obj Otim-Short',       type:'cn_result',level:'ag'},                      // T  20
    {h:'Plataforma',              type:'free',                      level:'ag'},     // U  21
    {h:'Publisher',               type:'drop',list:'Publisher',     level:'ag'},     // V  22
    {h:'Buying Type',             type:'drop',list:'BuyType',       level:'ag'},     // W  23
    {h:'Location Type',           type:'drop',list:'LocationType',  level:'ag'},     // X  24
    {h:'Location',                type:'drop',list:'Location',      level:'ag'},     // Y  25
    {h:'Audience Type',           type:'drop',list:'AudienceType',  level:'ag'},     // Z  26
    {h:'Gender',                  type:'drop',list:'Gender',        level:'ag'},     // AA 27
    {h:'Age Lower',               type:'free',                      level:'ag'},     // AB 28
    {h:'Age Upper',               type:'free',                      level:'ag'},     // AC 29
    {h:'MidiaGroup-Extra',        type:'free',                      level:'ag'},     // AD 30
    {h:'📋 ADGROUP NAME',         type:'formula',                   level:'fml'},    // AE 31
    {h:'Ad Name',                 type:'free',                      level:'ad'},     // AF 32
    {h:'✅ Status',               type:'formula',                   level:'fml'}     // AG 33
  ]);
  batchCol(s,  2, 3, NROWS, function(r){ return cnFml('A',r); });
  batchCol(s,  6, 3, NROWS, function(r){ return objShortFml('E',r); });
  batchCol(s, 16, 3, NROWS, function(r){ return _s('IFERROR(IF(B'+r+'="","",B'+r+'&"_"&C'+r+'&"_"&D'+r+'&"_"&F'+r+'&"_"&'+sh('G',r)+'&"_"&'+sh('H',r)+'&"_"&I'+r+'&"_"&J'+r+'&"_"&K'+r+pp('L',r)+pp('M',r)+pp('N',r)+pp('O',r)+'),"⚠️ Verificar colunas")'); });
  batchCol(s, 20, 3, NROWS, function(r){ return objOtimFml('S',r); });
  batchCol(s, 31, 3, NROWS, function(r){ return _s('IFERROR(IF(Q'+r+'="","",Q'+r+'&"_"&R'+r+pp('S',r)+pp('U',r)+pp('V',r)+pp('W',r)+pp('X',r)+pp('Y',r)+pp('Z',r)+pp('AA',r)+'&IF(AB'+r+'<>"","|"&AB'+r+'&IF(AC'+r+'<>"","-"&AC'+r+',"")","")'+pp('AD',r)+'),"⚠️ Verificar colunas")'); });
  batchCol(s, 33, 3, NROWS, function(r){ return _s('IFERROR(IF(AG'+r+'<>"",IF(AND(B'+r+'<>"",B'+r+'<>"CN nao encontrado",Q'+r+'<>""),"OK","Incompleto"),""),"⚠️ Verificar colunas")'); });
  protectCols(s,[2,6,16,20,31,33]);
  log('Google Search OK');
}

// ---- GOOGLE VIDEO ----
function buildGoogleVideo(){
  var s=buildSheet('Google Video',[
    {h:'Campaign Name',           type:'cn_drop',  level:'camp'},   // A  1
    {h:'📋 CN Code',              type:'cn_result',level:'camp'},   // B  2
    {h:'Language',                type:'drop',list:'Language',      level:'camp'},   // C  3
    {h:'Market',                  type:'drop',list:'Market',        level:'camp'},   // D  4
    {h:'Objective',               type:'drop',list:'Objective',     level:'camp'},   // E  5
    {h:'📋 Objective-Short',      type:'cn_result',level:'camp'},   // F  6
    {h:'Format Type',             type:'drop',list:'FormatType',    level:'camp'},   // G  7
    {h:'Buy Type',                type:'drop',list:'BuyType',       level:'camp'},   // H  8
    {h:'Placement Type',          type:'drop',list:'PlacementType', level:'camp'},   // I  9
    {h:'Campaign Local',          type:'drop',list:'CampaignLocal', level:'camp'},   // J  10
    {h:'Brand',                   type:'drop',list:'Brand',         level:'camp'},   // K  11
    {h:'Brandlift',               type:'drop',list:'Brandlift',     level:'camp'},   // L  12
    {h:'Pilar',                   type:'free',                      level:'camp'},   // M  13
    {h:'MidiaCampaignLocal-Extra',type:'free',                      level:'camp'},   // N  14
    {h:'📋 CAMPAIGN NAME',        type:'formula',                   level:'fml'},    // O  15
    {h:'Audience Party',          type:'drop',list:'AudienceParty', level:'ag'},     // P  16
    {h:'Landing Page',            type:'drop',list:'LandingPage',   level:'ag'},     // Q  17
    {h:'Retailer',                type:'drop',list:'Retailer',      level:'ag'},     // R  18
    {h:'Influencer',              type:'drop',list:'Influencer',    level:'ag'},     // S  19
    {h:'Obj Otimização',          type:'drop',list:'ObjOtimizacao', level:'ag'},     // T  20
    {h:'📋 Obj Otim-Short',       type:'cn_result',level:'ag'},                      // U  21
    {h:'Plataforma',              type:'free',                      level:'ag'},     // V  22
    {h:'Publisher',               type:'drop',list:'Publisher',     level:'ag'},     // W  23
    {h:'Buying Type',             type:'drop',list:'BuyType',       level:'ag'},     // X  24
    {h:'Location Type',           type:'drop',list:'LocationType',  level:'ag'},     // Y  25
    {h:'Location',                type:'drop',list:'Location',      level:'ag'},     // Z  26
    {h:'Audience Type',           type:'drop',list:'AudienceType',  level:'ag'},     // AA 27
    {h:'Gender',                  type:'drop',list:'Gender',        level:'ag'},     // AB 28
    {h:'Age Lower',               type:'free',                      level:'ag'},     // AC 29
    {h:'Age Upper',               type:'free',                      level:'ag'},     // AD 30
    {h:'MidiaGroup-Extra',        type:'free',                      level:'ag'},     // AE 31
    {h:'📋 ADGROUP NAME',         type:'formula',                   level:'fml'},    // AF 32
    {h:'Creative Name',           type:'free',                      level:'ad'},     // AG 33
    {h:'Position',                type:'drop',list:'Position',      level:'ad'},     // AH 34
    {h:'Influencer Ad',           type:'drop',list:'Influencer',    level:'ad'},     // AI 35
    {h:'Influencer Brand',        type:'free',                      level:'ad'},     // AJ 36
    {h:'Influencer Name',         type:'free',                      level:'ad'},     // AK 37
    {h:'Seconds',                 type:'free',                      level:'ad'},     // AL 38
    {h:'MidiaAdName-Extra',       type:'free',                      level:'ad'},     // AM 39
    {h:'📋 AD NAME',              type:'formula',                   level:'fml'},    // AN 40
    {h:'✅ Status',               type:'formula',                   level:'fml'}     // AO 41
  ]);
  batchCol(s,  2, 3, NROWS, function(r){ return cnFml('A',r); });
  batchCol(s,  6, 3, NROWS, function(r){ return objShortFml('E',r); });
  batchCol(s, 15, 3, NROWS, function(r){ return _s('IFERROR(IF(B'+r+'="","",B'+r+'&"_"&C'+r+'&"_"&D'+r+'&"_"&F'+r+'&"_"&'+sh('G',r)+'&"_"&'+sh('H',r)+'&"_"&I'+r+'&"_"&J'+r+pp('K',r)+pp('L',r)+pp('M',r)+pp('N',r)+'),"⚠️ Verificar colunas")'); });
  batchCol(s, 21, 3, NROWS, function(r){ return objOtimFml('T',r); });
  batchCol(s, 32, 3, NROWS, function(r){ return _s('IFERROR(IF(P'+r+'="","",P'+r+'&"_"&Q'+r+'&"_"&R'+r+'&"_"&S'+r+pp('T',r)+pp('V',r)+pp('W',r)+pp('X',r)+pp('Y',r)+pp('Z',r)+pp('AA',r)+pp('AB',r)+'&IF(AC'+r+'<>"","|"&AC'+r+'&IF(AD'+r+'<>"","-"&AD'+r+',"")","")'+pp('AE',r)+'),"⚠️ Verificar colunas")'); });
  batchCol(s, 40, 3, NROWS, function(r){ return _s('IFERROR(IF(AG'+r+'="","",AG'+r+pp('AH',r)+pp('AI',r)+pp('AJ',r)+pp('AK',r)+pp('AL',r)+pp('AM',r)+'),"⚠️ Verificar colunas")'); });
  batchCol(s, 41, 3, NROWS, function(r){ return _s('IFERROR(IF(AN'+r+'<>"",IF(AND(B'+r+'<>"",B'+r+'<>"CN nao encontrado",P'+r+'<>"",AG'+r+'<>""),"OK","Incompleto"),""),"⚠️ Verificar colunas")'); });
  protectCols(s,[2,6,15,21,32,40,41]);
  log('Google Video OK');
}

// ---- META ----
function buildMeta(){
  var s=buildSheet('Meta',[
    {h:'Campaign Name',           type:'cn_drop',  level:'camp'},   // A  1
    {h:'📋 CN Code',              type:'cn_result',level:'camp'},   // B  2
    {h:'Market',                  type:'drop',list:'Market',        level:'camp'},   // C  3
    {h:'Brand',                   type:'drop',list:'Brand',         level:'camp'},   // D  4
    {h:'Buy Model',               type:'drop',list:'BuyModel',      level:'camp'},   // E  5
    {h:'Collaborative Ad',        type:'drop',list:'CollabAds',     level:'camp'},   // F  6
    {h:'Objective',               type:'drop',list:'Objective',     level:'camp'},   // G  7
    {h:'📋 Objective-Short',      type:'cn_result',level:'camp'},   // H  8
    {h:'Campaign Local',          type:'drop',list:'CampaignLocal', level:'camp'},   // I  9
    {h:'Brandlift',               type:'drop',list:'Brandlift',     level:'camp'},   // J  10
    {h:'Pilar',                   type:'free',                      level:'camp'},   // K  11
    {h:'MidiaCampaignLocal-Extra',type:'free',                      level:'camp'},   // L  12
    {h:'📋 CAMPAIGN NAME',        type:'formula',                   level:'fml'},    // M  13
    {h:'Audience Party',          type:'drop',list:'AudienceParty', level:'ag'},     // N  14
    {h:'Audience Name',           type:'free',                      level:'ag'},     // O  15
    {h:'Gender',                  type:'drop',list:'Gender',        level:'ag'},     // P  16
    {h:'Age Lower',               type:'free',                      level:'ag'},     // Q  17
    {h:'Age Upper',               type:'free',                      level:'ag'},     // R  18
    {h:'Obj Otimização',          type:'drop',list:'ObjOtimizacao', level:'ag'},     // S  19
    {h:'📋 Obj Otim-Short',       type:'cn_result',level:'ag'},                      // T  20
    {h:'Publisher',               type:'drop',list:'Publisher',     level:'ag'},     // U  21
    {h:'Buying Type',             type:'drop',list:'BuyType',       level:'ag'},     // V  22
    {h:'Location Type',           type:'drop',list:'LocationType',  level:'ag'},     // W  23
    {h:'Location',                type:'drop',list:'Location',      level:'ag'},     // X  24
    {h:'Audience Type',           type:'drop',list:'AudienceType',  level:'ag'},     // Y  25
    {h:'MidiaGroup-Extra',        type:'free',                      level:'ag'},     // Z  26
    {h:'📋 ADGROUP NAME',         type:'formula',                   level:'fml'},    // AA 27
    {h:'IHAMP',                   type:'drop',list:'IHAMP',         level:'ad'},     // AB 28
    {h:'Creative Name',           type:'free',                      level:'ad'},     // AC 29
    {h:'Format Type',             type:'drop',list:'FormatType',    level:'ad'},     // AD 30
    {h:'Landing Page',            type:'drop',list:'LandingPage',   level:'ad'},     // AE 31
    {h:'Retailer',                type:'drop',list:'Retailer',      level:'ad'},     // AF 32
    {h:'Format Size',             type:'free',                      level:'ad'},     // AG 33
    {h:'Influencer Post Type',    type:'drop',list:'InfPostType',   level:'ad'},     // AH 34
    {h:'Influencer',              type:'drop',list:'Influencer',    level:'ad'},     // AI 35
    {h:'@doInfluencer',           type:'free',                      level:'ad'},     // AJ 36
    {h:'Position',                type:'drop',list:'Position',      level:'ad'},     // AK 37
    {h:'Influencer Brand',        type:'free',                      level:'ad'},     // AL 38
    {h:'Influencer Name',         type:'free',                      level:'ad'},     // AM 39
    {h:'MidiaAdName-Extra',       type:'free',                      level:'ad'},     // AN 40
    {h:'📋 AD NAME',              type:'formula',                   level:'fml'},    // AO 41
    {h:'✅ Status',               type:'formula',                   level:'fml'}     // AP 42
  ]);
  batchCol(s,  2, 3, NROWS, function(r){ return cnFml('A',r); });
  batchCol(s,  8, 3, NROWS, function(r){ return objShortFml('G',r); });
  batchCol(s, 13, 3, NROWS, function(r){ return _s('IFERROR(IF(B'+r+'="","",B'+r+'&"_"&C'+r+'&"_"&D'+r+'&"_"&E'+r+'&"_"&F'+r+'&"_"&H'+r+'&"_"&I'+r+pp('J',r)+pp('K',r)+pp('L',r)+'),"⚠️ Verificar colunas")'); });
  batchCol(s, 20, 3, NROWS, function(r){ return objOtimFml('S',r); });
  batchCol(s, 27, 3, NROWS, function(r){ return _s('IFERROR(IF(N'+r+'="","",N'+r+'&"_"&O'+r+'&"_"&P'+r+'&"_"&'+age('Q','R',r)+pp('S',r)+pp('U',r)+pp('V',r)+pp('W',r)+pp('X',r)+pp('Y',r)+pp('Z',r)+'),"⚠️ Verificar colunas")'); });
  batchCol(s, 41, 3, NROWS, function(r){ return adNameIHAMP('AB','AC','AD','AE','AF','AG','AH','AI','AJ','AK','AL','AM','AN',r); });
  batchCol(s, 42, 3, NROWS, function(r){ return _s('IFERROR(IF(AO'+r+'<>"",IF(AND(B'+r+'<>"",B'+r+'<>"CN nao encontrado",N'+r+'<>"",AC'+r+'<>""),"OK","Incompleto"),""),"⚠️ Verificar colunas")'); });
  protectCols(s,[2,8,13,20,27,41,42]);
  log('Meta OK');
}

// ---- PINTEREST ----
function buildPinterest(){
  var s=buildSheet('Pinterest',[
    {h:'Campaign Name',           type:'cn_drop',  level:'camp'},   // A  1
    {h:'📋 CN Code',              type:'cn_result',level:'camp'},   // B  2
    {h:'Market',                  type:'drop',list:'Market',        level:'camp'},   // C  3
    {h:'Brand',                   type:'drop',list:'Brand',         level:'camp'},   // D  4
    {h:'Buy Model',               type:'drop',list:'BuyModel',      level:'camp'},   // E  5
    {h:'Objective',               type:'drop',list:'Objective',     level:'camp'},   // F  6
    {h:'📋 Objective-Short',      type:'cn_result',level:'camp'},   // G  7
    {h:'Campaign Local',          type:'drop',list:'CampaignLocal', level:'camp'},   // H  8
    {h:'Brandlift',               type:'drop',list:'Brandlift',     level:'camp'},   // I  9
    {h:'Pilar',                   type:'free',                      level:'camp'},   // J  10
    {h:'MidiaCampaignLocal-Extra',type:'free',                      level:'camp'},   // K  11
    {h:'📋 CAMPAIGN NAME',        type:'formula',                   level:'fml'},    // L  12
    {h:'Audience Party',          type:'drop',list:'AudienceParty', level:'ag'},     // M  13
    {h:'Audience Name',           type:'free',                      level:'ag'},     // N  14
    {h:'Gender',                  type:'drop',list:'Gender',        level:'ag'},     // O  15
    {h:'Age Lower',               type:'free',                      level:'ag'},     // P  16
    {h:'Age Upper',               type:'free',                      level:'ag'},     // Q  17
    {h:'Placement Type',          type:'drop',list:'PlacementType', level:'ag'},     // R  18
    {h:'Obj Otimização',          type:'drop',list:'ObjOtimizacao', level:'ag'},     // S  19
    {h:'📋 Obj Otim-Short',       type:'cn_result',level:'ag'},                      // T  20
    {h:'Publisher',               type:'drop',list:'Publisher',     level:'ag'},     // U  21
    {h:'Buying Type',             type:'drop',list:'BuyType',       level:'ag'},     // V  22
    {h:'Location Type',           type:'drop',list:'LocationType',  level:'ag'},     // W  23
    {h:'Location',                type:'drop',list:'Location',      level:'ag'},     // X  24
    {h:'Audience Type',           type:'drop',list:'AudienceType',  level:'ag'},     // Y  25
    {h:'MidiaGroup-Extra',        type:'free',                      level:'ag'},     // Z  26
    {h:'📋 ADGROUP NAME',         type:'formula',                   level:'fml'},    // AA 27
    {h:'IHAMP',                   type:'drop',list:'IHAMP',         level:'ad'},     // AB 28
    {h:'Creative Name',           type:'free',                      level:'ad'},     // AC 29
    {h:'Format Type',             type:'drop',list:'FormatType',    level:'ad'},     // AD 30
    {h:'Landing Page',            type:'drop',list:'LandingPage',   level:'ad'},     // AE 31
    {h:'Retailer',                type:'drop',list:'Retailer',      level:'ad'},     // AF 32
    {h:'Format Size',             type:'free',                      level:'ad'},     // AG 33
    {h:'Influencer Post Type',    type:'drop',list:'InfPostType',   level:'ad'},     // AH 34
    {h:'Influencer',              type:'drop',list:'Influencer',    level:'ad'},     // AI 35
    {h:'@doInfluencer',           type:'free',                      level:'ad'},     // AJ 36
    {h:'Position',                type:'drop',list:'Position',      level:'ad'},     // AK 37
    {h:'Influencer Brand',        type:'free',                      level:'ad'},     // AL 38
    {h:'Influencer Name',         type:'free',                      level:'ad'},     // AM 39
    {h:'MidiaAdName-Extra',       type:'free',                      level:'ad'},     // AN 40
    {h:'📋 AD NAME',              type:'formula',                   level:'fml'},    // AO 41
    {h:'✅ Status',               type:'formula',                   level:'fml'}     // AP 42
  ]);
  batchCol(s,  2, 3, NROWS, function(r){ return cnFml('A',r); });
  batchCol(s,  7, 3, NROWS, function(r){ return objShortFml('F',r); });
  batchCol(s, 12, 3, NROWS, function(r){ return _s('IFERROR(IF(B'+r+'="","",B'+r+'&"_"&C'+r+'&"_"&D'+r+'&"_"&E'+r+'&"_"&G'+r+'&"_"&H'+r+pp('I',r)+pp('J',r)+pp('K',r)+'),"⚠️ Verificar colunas")'); });
  batchCol(s, 20, 3, NROWS, function(r){ return objOtimFml('S',r); });
  batchCol(s, 27, 3, NROWS, function(r){ return _s('IFERROR(IF(M'+r+'="","",M'+r+'&"_"&N'+r+'&"_"&O'+r+'&"_"&'+age('P','Q',r)+'&"_"&R'+r+pp('S',r)+pp('U',r)+pp('V',r)+pp('W',r)+pp('X',r)+pp('Y',r)+pp('Z',r)+'),"⚠️ Verificar colunas")'); });
  batchCol(s, 41, 3, NROWS, function(r){ return adNameIHAMP('AB','AC','AD','AE','AF','AG','AH','AI','AJ','AK','AL','AM','AN',r); });
  batchCol(s, 42, 3, NROWS, function(r){ return _s('IFERROR(IF(AO'+r+'<>"",IF(AND(B'+r+'<>"",B'+r+'<>"CN nao encontrado",M'+r+'<>"",AC'+r+'<>""),"OK","Incompleto"),""),"⚠️ Verificar colunas")'); });
  protectCols(s,[2,7,12,20,27,41,42]);
  log('Pinterest OK');
}

// ---- TIKTOK ----
function buildTikTok(){
  var s=buildSheet('TikTok',[
    {h:'Campaign Name',           type:'cn_drop',  level:'camp'},   // A  1
    {h:'📋 CN Code',              type:'cn_result',level:'camp'},   // B  2
    {h:'Market',                  type:'drop',list:'Market',        level:'camp'},   // C  3
    {h:'Brand',                   type:'drop',list:'Brand',         level:'camp'},   // D  4
    {h:'Buy Model',               type:'drop',list:'BuyModel',      level:'camp'},   // E  5
    {h:'Objective',               type:'drop',list:'Objective',     level:'camp'},   // F  6
    {h:'📋 Objective-Short',      type:'cn_result',level:'camp'},   // G  7
    {h:'Campaign Local',          type:'drop',list:'CampaignLocal', level:'camp'},   // H  8
    {h:'Brandlift',               type:'drop',list:'Brandlift',     level:'camp'},   // I  9
    {h:'Pilar',                   type:'free',                      level:'camp'},   // J  10
    {h:'MidiaCampaignLocal-Extra',type:'free',                      level:'camp'},   // K  11
    {h:'📋 CAMPAIGN NAME',        type:'formula',                   level:'fml'},    // L  12
    {h:'Audience Party',          type:'drop',list:'AudienceParty', level:'ag'},     // M  13
    {h:'Audience Name',           type:'free',                      level:'ag'},     // N  14
    {h:'Gender',                  type:'drop',list:'Gender',        level:'ag'},     // O  15
    {h:'Age Lower',               type:'free',                      level:'ag'},     // P  16
    {h:'Age Upper',               type:'free',                      level:'ag'},     // Q  17
    {h:'Placement Type',          type:'drop',list:'PlacementType', level:'ag'},     // R  18
    {h:'Obj Otimização',          type:'drop',list:'ObjOtimizacao', level:'ag'},     // S  19
    {h:'📋 Obj Otim-Short',       type:'cn_result',level:'ag'},                      // T  20
    {h:'Publisher',               type:'drop',list:'Publisher',     level:'ag'},     // U  21
    {h:'Buying Type',             type:'drop',list:'BuyType',       level:'ag'},     // V  22
    {h:'Location Type',           type:'drop',list:'LocationType',  level:'ag'},     // W  23
    {h:'Location',                type:'drop',list:'Location',      level:'ag'},     // X  24
    {h:'Audience Type',           type:'drop',list:'AudienceType',  level:'ag'},     // Y  25
    {h:'MidiaGroup-Extra',        type:'free',                      level:'ag'},     // Z  26
    {h:'📋 ADGROUP NAME',         type:'formula',                   level:'fml'},    // AA 27
    {h:'IHAMP',                   type:'drop',list:'IHAMP',         level:'ad'},     // AB 28
    {h:'Creative Name',           type:'free',                      level:'ad'},     // AC 29
    {h:'Format Type',             type:'drop',list:'FormatType',    level:'ad'},     // AD 30
    {h:'Landing Page',            type:'drop',list:'LandingPage',   level:'ad'},     // AE 31
    {h:'Retailer',                type:'drop',list:'Retailer',      level:'ad'},     // AF 32
    {h:'Format Size',             type:'free',                      level:'ad'},     // AG 33
    {h:'Add-On',                  type:'drop',list:'AddOn',         level:'ad'},     // AH 34
    {h:'Influencer Post Type',    type:'drop',list:'InfPostType',   level:'ad'},     // AI 35
    {h:'Influencer',              type:'drop',list:'Influencer',    level:'ad'},     // AJ 36
    {h:'@doInfluencer',           type:'free',                      level:'ad'},     // AK 37
    {h:'Creative Exchange',       type:'drop',list:'CrExchange',    level:'ad'},     // AL 38
    {h:'Position',                type:'drop',list:'Position',      level:'ad'},     // AM 39
    {h:'Influencer Brand',        type:'free',                      level:'ad'},     // AN 40
    {h:'Influencer Name',         type:'free',                      level:'ad'},     // AO 41
    {h:'MidiaAdName-Extra',       type:'free',                      level:'ad'},     // AP 42
    {h:'📋 AD NAME',              type:'formula',                   level:'fml'},    // AQ 43
    {h:'✅ Status',               type:'formula',                   level:'fml'}     // AR 44
  ]);
  batchCol(s,  2, 3, NROWS, function(r){ return cnFml('A',r); });
  batchCol(s,  7, 3, NROWS, function(r){ return objShortFml('F',r); });
  batchCol(s, 12, 3, NROWS, function(r){ return _s('IFERROR(IF(B'+r+'="","",B'+r+'&"_"&C'+r+'&"_"&D'+r+'&"_"&E'+r+'&"_"&G'+r+'&"_"&H'+r+pp('I',r)+pp('J',r)+pp('K',r)+'),"⚠️ Verificar colunas")'); });
  batchCol(s, 20, 3, NROWS, function(r){ return objOtimFml('S',r); });
  batchCol(s, 27, 3, NROWS, function(r){ return _s('IFERROR(IF(M'+r+'="","",M'+r+'&"_"&N'+r+'&"_"&O'+r+'&"_"&'+age('P','Q',r)+'&"_"&R'+r+pp('S',r)+pp('U',r)+pp('V',r)+pp('W',r)+pp('X',r)+pp('Y',r)+pp('Z',r)+'),"⚠️ Verificar colunas")'); });
  batchCol(s, 43, 3, NROWS, function(r){
    var base=_s('AC'+r+'&"_"&'+sh('AD',r)+'&"_"&AE'+r+'&"_"&AF'+r+'&"_"&AG'+r+'&"_"&AH'+r+'&"_"&AI'+r+'&"_"&AJ'+r+'&"_["&AK'+r+'&"]_"&AL'+r+'&"_"&AM'+r+pp('AN',r));
    return _s('IFERROR(IF(AC'+r+'="","",IF(AB'+r+'="com-IHAMP",'+base+pp('AP',r)+','+base+pp('AO',r)+pp('AP',r)+')),"⚠️ Verificar colunas")');
  });
  batchCol(s, 44, 3, NROWS, function(r){ return _s('IFERROR(IF(AQ'+r+'<>"",IF(AND(B'+r+'<>"",B'+r+'<>"CN nao encontrado",M'+r+'<>"",AC'+r+'<>""),"OK","Incompleto"),""),"⚠️ Verificar colunas")'); });
  protectCols(s,[2,7,12,20,27,43,44]);
  log('TikTok OK');
}

// ---- TWITTER ----
function buildTwitter(){
  var s=buildSheet('Twitter',[
    {h:'Campaign Name',           type:'cn_drop',  level:'camp'},   // A  1
    {h:'📋 CN Code',              type:'cn_result',level:'camp'},   // B  2
    {h:'Market',                  type:'drop',list:'Market',        level:'camp'},   // C  3
    {h:'Brand',                   type:'drop',list:'Brand',         level:'camp'},   // D  4
    {h:'Buy Model',               type:'drop',list:'BuyModel',      level:'camp'},   // E  5
    {h:'Objective',               type:'drop',list:'Objective',     level:'camp'},   // F  6
    {h:'📋 Objective-Short',      type:'cn_result',level:'camp'},   // G  7
    {h:'Campaign Local',          type:'drop',list:'CampaignLocal', level:'camp'},   // H  8
    {h:'Brandlift',               type:'drop',list:'Brandlift',     level:'camp'},   // I  9
    {h:'Pilar',                   type:'free',                      level:'camp'},   // J  10
    {h:'MidiaCampaignLocal-Extra',type:'free',                      level:'camp'},   // K  11
    {h:'📋 CAMPAIGN NAME',        type:'formula',                   level:'fml'},    // L  12
    {h:'Audience Party',          type:'drop',list:'AudienceParty', level:'ag'},     // M  13
    {h:'Audience Name',           type:'free',                      level:'ag'},     // N  14
    {h:'Gender',                  type:'drop',list:'Gender',        level:'ag'},     // O  15
    {h:'Age Lower',               type:'free',                      level:'ag'},     // P  16
    {h:'Age Upper',               type:'free',                      level:'ag'},     // Q  17
    {h:'Placement Type',          type:'drop',list:'PlacementType', level:'ag'},     // R  18
    {h:'Device Type',             type:'drop',list:'DeviceType',    level:'ag'},     // S  19
    {h:'Obj Otimização',          type:'drop',list:'ObjOtimizacao', level:'ag'},     // T  20
    {h:'📋 Obj Otim-Short',       type:'cn_result',level:'ag'},                      // U  21
    {h:'Publisher',               type:'drop',list:'Publisher',     level:'ag'},     // V  22
    {h:'Buying Type',             type:'drop',list:'BuyType',       level:'ag'},     // W  23
    {h:'Location Type',           type:'drop',list:'LocationType',  level:'ag'},     // X  24
    {h:'Location',                type:'drop',list:'Location',      level:'ag'},     // Y  25
    {h:'Audience Type',           type:'drop',list:'AudienceType',  level:'ag'},     // Z  26
    {h:'MidiaGroup-Extra',        type:'free',                      level:'ag'},     // AA 27
    {h:'📋 ADGROUP NAME',         type:'formula',                   level:'fml'},    // AB 28
    {h:'IHAMP',                   type:'drop',list:'IHAMP',         level:'ad'},     // AC 29
    {h:'Creative Name',           type:'free',                      level:'ad'},     // AD 30
    {h:'Format Type',             type:'drop',list:'FormatType',    level:'ad'},     // AE 31
    {h:'Landing Page',            type:'drop',list:'LandingPage',   level:'ad'},     // AF 32
    {h:'Retailer',                type:'drop',list:'Retailer',      level:'ad'},     // AG 33
    {h:'Format Size',             type:'free',                      level:'ad'},     // AH 34
    {h:'Influencer Post Type',    type:'drop',list:'InfPostType',   level:'ad'},     // AI 35
    {h:'Influencer',              type:'drop',list:'Influencer',    level:'ad'},     // AJ 36
    {h:'@doInfluencer',           type:'free',                      level:'ad'},     // AK 37
    {h:'Position',                type:'drop',list:'Position',      level:'ad'},     // AL 38
    {h:'Influencer Brand',        type:'free',                      level:'ad'},     // AM 39
    {h:'Influencer Name',         type:'free',                      level:'ad'},     // AN 40
    {h:'MidiaAdName-Extra',       type:'free',                      level:'ad'},     // AO 41
    {h:'📋 AD NAME',              type:'formula',                   level:'fml'},    // AP 42
    {h:'✅ Status',               type:'formula',                   level:'fml'}     // AQ 43
  ]);
  batchCol(s,  2, 3, NROWS, function(r){ return cnFml('A',r); });
  batchCol(s,  7, 3, NROWS, function(r){ return objShortFml('F',r); });
  batchCol(s, 12, 3, NROWS, function(r){ return _s('IFERROR(IF(B'+r+'="","",B'+r+'&"_"&C'+r+'&"_"&D'+r+'&"_"&E'+r+'&"_"&G'+r+'&"_"&H'+r+pp('I',r)+pp('J',r)+pp('K',r)+'),"⚠️ Verificar colunas")'); });
  batchCol(s, 21, 3, NROWS, function(r){ return objOtimFml('T',r); });
  batchCol(s, 28, 3, NROWS, function(r){ return _s('IFERROR(IF(M'+r+'="","",M'+r+'&"_"&N'+r+'&"_"&O'+r+'&"_"&'+age('P','Q',r)+'&"_"&R'+r+'&"_"&S'+r+'&"_"&T'+r+pp('U',r)+pp('V',r)+pp('W',r)+pp('X',r)+pp('Y',r)+pp('Z',r)+pp('AA',r)+'),"⚠️ Verificar colunas")'); });
  batchCol(s, 42, 3, NROWS, function(r){ return adNameIHAMP('AC','AD','AE','AF','AG','AH','AI','AJ','AK','AL','AM','AN','AO',r); });
  batchCol(s, 43, 3, NROWS, function(r){ return _s('IFERROR(IF(AP'+r+'<>"",IF(AND(B'+r+'<>"",B'+r+'<>"CN nao encontrado",M'+r+'<>"",AD'+r+'<>""),"OK","Incompleto"),""),"⚠️ Verificar colunas")'); });
  protectCols(s,[2,7,12,21,28,42,43]);
  log('Twitter OK');
}