/* Từ điển tên gọi dùng chung cho các chất.
   Mỗi mã chất (trùng khoá trong KB ở kb.js) có các cách gọi: vi (Việt), en (Anh), cs (Séc), forms (dạng muối, tên thương mại).
   Tìm kiếm không phân biệt hoa thường và dấu, nên gõ "horcik", "hořčík" hay "Magnesium" đều ra đúng chất.
   Chỉ liệt kê tên đã chắc chắn. Thêm tên mới: nối vào mảng tương ứng, không cần sửa code. */
window.TU_DIEN={
  mg:{vi:['magie'],en:['magnesium','mg'],cs:['hořčík','hořečnatý'],forms:['mg bisglycinate','magnesium bisglycinate','magnesium citrate','magnesium oxide','magnesium malate','magnesium glycinate','magnesium threonate','magnesium taurate','citrát hořečnatý','oxid hořečnatý','bisglycinát hořečnatý','malát hořečnatý','laktát hořečnatý','chlorid hořečnatý','epsom']},
  ca:{vi:['canxi'],en:['calcium','ca'],cs:['vápník','vápenatý'],forms:['calcium carbonate','calcium citrate','calcium lactate','calcium gluconate','uhličitan vápenatý','citrát vápenatý','laktát vápenatý','glukonát vápenatý','mchc']},
  zn:{vi:['kẽm'],en:['zinc','zn'],cs:['zinek','zinečnatý'],forms:['zinc citrate','zinc picolinate','zinc bisglycinate','zinc gluconate','zinc sulfate','citrát zinečnatý','glukonát zinečnatý']},
  fe:{vi:['sắt'],en:['iron','fe'],cs:['železo','železnatý'],forms:['ferrous fumarate','ferrous bisglycinate','ferrous sulfate','iron bisglycinate','fumarát železnatý','síran železnatý']},
  se:{vi:['selen'],en:['selenium'],cs:['selen'],forms:['selenomethionine','sodium selenite','selenit sodný']},
  io:{vi:['i-ốt','iốt','iot'],en:['iodine','iodide'],cs:['jód','jodid'],forms:['potassium iodide','jodid draselný','kelp']},
  cu:{vi:['đồng'],en:['copper'],cs:['měď','měďnatý'],forms:['copper gluconate','copper bisglycinate']},
  mn:{vi:['mangan'],en:['manganese'],cs:['mangan'],forms:[]},
  boron:{vi:['bo'],en:['boron'],cs:['bor'],forms:['boric acid','calcium fructoborate','borate']},
  vitA:{vi:['vitamin a'],en:['vitamin a','retinol'],cs:['vitamin a','retinol'],forms:['retinyl palmitate','retinyl acetate','beta-carotene','betakaroten']},
  b1:{vi:['vitamin b1'],en:['vitamin b1','thiamin','thiamine'],cs:['vitamin b1','thiamin'],forms:['benfotiamine','thiamine hydrochloride','thiamin hydrochlorid']},
  b2:{vi:['vitamin b2'],en:['vitamin b2','riboflavin'],cs:['vitamin b2','riboflavin'],forms:['riboflavin 5-phosphate','riboflavin-5-fosfát']},
  niacin:{vi:['niacin','vitamin b3'],en:['niacin','vitamin b3','nicotinic acid','nicotinamide','niacinamide'],cs:['niacin','vitamin b3','kyselina nikotinová','nikotinamid'],forms:['inositol hexanicotinate']},
  b5:{vi:['vitamin b5','axit pantothenic'],en:['vitamin b5','pantothenic acid','pantethine'],cs:['vitamin b5','kyselina pantotenová'],forms:['calcium pantothenate','d-panthenol','pantotenát vápenatý']},
  b6:{vi:['vitamin b6'],en:['vitamin b6','pyridoxine'],cs:['vitamin b6','pyridoxin'],forms:['pyridoxal 5-phosphate','p5p','plp','pyridoxine hydrochloride','pyridoxin hydrochlorid']},
  biotin:{vi:['biotin','vitamin b7'],en:['biotin','vitamin b7','vitamin h'],cs:['biotin','vitamin b7'],forms:['d-biotin']},
  folic:{vi:['axit folic','folate','vitamin b9'],en:['folic acid','folate','vitamin b9'],cs:['kyselina listová','folát','vitamin b9'],forms:['5-mthf','methylfolate','quatrefolic','metafolin']},
  b12:{vi:['vitamin b12'],en:['vitamin b12','cobalamin'],cs:['vitamin b12','kobalamin'],forms:['methylcobalamin','cyanocobalamin','adenosylcobalamin','hydroxocobalamin','metylkobalamin','kyanokobalamin']},
  bcomplex:{vi:['vitamin b-complex','vitamin nhóm b'],en:['b-complex','b complex'],cs:['vitamin b komplex','b komplex'],forms:[]},
  vitC:{vi:['vitamin c'],en:['vitamin c','ascorbic acid'],cs:['vitamin c','kyselina askorbová'],forms:['sodium ascorbate','calcium ascorbate','ascorbát sodný','ascorbát vápenatý','liposomal vitamin c']},
  vitD:{vi:['vitamin d'],en:['vitamin d','vitamin d3','cholecalciferol'],cs:['vitamin d','vitamin d3','cholekalciferol'],forms:['d3','d2','ergocalciferol']},
  vitE:{vi:['vitamin e'],en:['vitamin e','tocopherol','tocotrienol'],cs:['vitamin e','tokoferol'],forms:['d-alpha-tocopherol','dl-alpha-tocopherol','tokotrienol']},
  vitK:{vi:['vitamin k'],en:['vitamin k','vitamin k2','vitamin k1','phylloquinone','menaquinone'],cs:['vitamin k','vitamin k2','fylochinon','menachinon'],forms:['mk-7','mk-4','menaquinone-7','menachinon-7']},
  om3:{vi:['omega-3','omega 3','dầu cá'],en:['omega-3','omega 3','fish oil','epa','dha'],cs:['omega-3','omega 3','rybí olej'],forms:['krill oil','dầu nhuyễn thể','cod liver oil','olej z tresčích jater','algal oil']},
  creatine:{vi:['creatine'],en:['creatine','creatin'],cs:['kreatin'],forms:['creatine monohydrate','kreatin monohydrát','creapure']},
  coq10:{vi:['coq10'],en:['coq10','coenzyme q10','ubiquinone','ubiquinol'],cs:['koenzym q10','q10'],forms:['ubichinon','ubichinol','kaneka']},
  collagen:{vi:['collagen'],en:['collagen'],cs:['kolagen'],forms:['collagen peptides','hydrolyzed collagen','uc-ii','kolagenní peptidy']},
  gluco:{vi:['glucosamin','chondroitin'],en:['glucosamine','chondroitin'],cs:['glukosamin','chondroitin'],forms:['glucosamine sulfate','glukosamin sulfát','chondroitin sulfate']},
  protein:{vi:['đạm','protein'],en:['protein','whey'],cs:['bílkoviny','bílkovina','protein'],forms:['whey protein','syrovátkový protein']},
  probiotic:{vi:['men vi sinh'],en:['probiotic','probiotics','lactobacillus','bifidobacterium'],cs:['probiotika','probiotikum','laktobacily'],forms:['saccharomyces boulardii','lactobacillus rhamnosus gg']},
  curc:{vi:['nghệ','curcumin'],en:['curcumin','turmeric','curcuminoid'],cs:['kurkumin','kurkuma'],forms:['piperine','piperin']},
  ginger:{vi:['gừng'],en:['ginger'],cs:['zázvor'],forms:['zingiber officinale']},
  greentea:{vi:['trà xanh'],en:['green tea','egcg','catechin'],cs:['zelený čaj'],forms:['camellia sinensis']},
  ginseng:{vi:['nhân sâm','sâm'],en:['ginseng','panax ginseng'],cs:['ženšen'],forms:['korean ginseng','sâm hàn quốc']},
  ginkgo:{vi:['bạch quả'],en:['ginkgo','ginkgo biloba'],cs:['ginkgo','jinan dvoulaločný'],forms:[]},
  stjohn:{vi:['cỏ st. john','ban'],en:["st john's wort",'hypericum'],cs:['třezalka','třezalka tečkovaná'],forms:['hypericum perforatum']},
  ashwagandha:{vi:['ashwagandha','sâm ấn độ'],en:['ashwagandha','withania'],cs:['ašvagandha'],forms:['withania somnifera','ksm-66','sensoril']},
  echinacea:{vi:['echinacea','cúc nhím'],en:['echinacea'],cs:['třapatka','echinacea'],forms:['echinacea purpurea','třapatka nachová']},
  valerian:{vi:['nữ lang'],en:['valerian'],cs:['kozlík','kozlík lékařský'],forms:['valeriana officinalis']},
  honey:{vi:['mật ong'],en:['honey'],cs:['med'],forms:[]},
  algae:{vi:['tảo'],en:['algae','spirulina','chlorella'],cs:['řasy','spirulina','chlorella'],forms:[]},
  blackgarlic:{vi:['tỏi đen'],en:['black garlic','aged garlic'],cs:['černý česnek','česnek'],forms:['s-allyl cysteine','sac']},
  boswellia:{vi:['nhũ hương'],en:['boswellia','akba'],cs:['kadidlovník','boswellia'],forms:['boswellia serrata']},
  astaxanthin:{vi:['astaxanthin'],en:['astaxanthin'],cs:['astaxantin'],forms:['haematococcus pluvialis']},
  lutein:{vi:['lutein','zeaxanthin'],en:['lutein','zeaxanthin'],cs:['lutein','zeaxantin'],forms:['marigold','areds2']},
  lycopene:{vi:['lycopene'],en:['lycopene'],cs:['lykopen'],forms:[]},
  choline:{vi:['cholin','choline'],en:['choline'],cs:['cholin'],forms:['phosphatidylcholine','choline bitartrate','alpha-gpc','fosfatidylcholin']},
  inositol:{vi:['inositol'],en:['inositol','myo-inositol'],cs:['inositol'],forms:['myo-inositol']},
  ala:{vi:['axit alpha-lipoic'],en:['alpha-lipoic acid','lipoic acid','ala'],cs:['kyselina alfa-lipoová','kyselina lipoová'],forms:['r-ala']},
  gsh:{vi:['glutathione'],en:['glutathione','gsh'],cs:['glutathion'],forms:[]},
  quercetin:{vi:['quercetin'],en:['quercetin'],cs:['kvercetin'],forms:[]},
  nmn:{vi:['nmn'],en:['nmn','nicotinamide mononucleotide'],cs:['nmn'],forms:[]},
  pqq:{vi:['pqq'],en:['pqq','pyrroloquinoline quinone'],cs:['pqq'],forms:[]}
};
/* Chuẩn hoá để so khớp: chữ thường, bỏ dấu (đ thành d), gom khoảng trắng. */
window.tdNorm=s=>String(s||'').toLowerCase().replace(/đ/g,'d').normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/\s+/g,' ').trim();
/* Trả về tập mã chất khớp với từ khoá q.
   Từ khoá từ 3 chữ trở lên khớp nếu nằm trong một tên gọi; từ khoá ngắn hơn (vd. "mg", "ca") phải trùng nguyên một tên gọi. */
window.tdKeys=q=>{
  const n=window.tdNorm(q),out=new Set();if(!n)return out;
  if(!window._tdIdx)window._tdIdx=Object.entries(window.TU_DIEN).map(([k,v])=>[k,[...v.vi,...v.en,...v.cs,...v.forms].map(window.tdNorm)]);
  for(const[k,terms]of window._tdIdx)if(terms.some(t=>n.length>=3?t.includes(n):t===n))out.add(k);
  return out};
