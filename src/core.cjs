const {makeRitual,passages}=require('./content.cjs');
const {chapters}=require('./bible.cjs');
const chapterSet=new Set(chapters);
const FEEDS=[
  {id:'bbc-business',name:'BBC Business',url:'https://feeds.bbci.co.uk/news/business/rss.xml'},
  {id:'bbc-tech',name:'BBC Technology',url:'https://feeds.bbci.co.uk/news/technology/rss.xml'},
  {id:'bbc-science',name:'BBC Science & Environment',url:'https://feeds.bbci.co.uk/news/science_and_environment/rss.xml'},
  {id:'bbc-world',name:'BBC World',url:'https://feeds.bbci.co.uk/news/world/rss.xml'},
  {id:'npr',name:'NPR News',url:'https://feeds.npr.org/1001/rss.xml'},
  {id:'bls',name:'Bureau of Labor Statistics',url:'https://www.bls.gov/feed/bls_latest.rss'},
  {id:'nasa',name:'NASA',url:'https://www.nasa.gov/news-release/feed/'},
  {id:'nih',name:'National Institutes of Health',url:'https://www.nih.gov/news-releases/feed.xml'},
  {id:'pbs',name:'PBS News',url:'https://www.pbs.org/newshour/feeds/rss/headlines'},
  {id:'dol',name:'US Department of Labor',url:'https://www.dol.gov/rss/releases.xml'},
  {id:'fed',name:'Federal Reserve',url:'https://www.federalreserve.gov/feeds/press_all.xml'},
  {id:'ars',name:'Ars Technica',url:'https://feeds.arstechnica.com/arstechnica/index'},
  {id:'gnn',name:'Good News Network',url:'https://www.goodnewsnetwork.org/custom-feeds/news-images.php'},
  {id:'guard-science',name:'Guardian Science',url:'https://www.theguardian.com/science/rss'},
  {id:'guard-world',name:'Guardian World',url:'https://www.theguardian.com/world/rss'},
  {id:'bbc-us',name:'BBC US & Canada',url:'https://feeds.bbci.co.uk/news/world/us_and_canada/rss.xml'},
  {id:'axios',name:'Axios National',url:'https://api.axios.com/feed/audience/national'},
  {id:'axios-nola',name:'Axios New Orleans',url:'https://api.axios.com/feed/audience/new-orleans'},
  {id:'la-illuminator',name:'Louisiana Illuminator',url:'https://lailluminator.com/feed/'},
  {id:'register',name:'The Register',url:'https://www.theregister.com/headlines.atom'},
  {id:'techcrunch-ai',name:'TechCrunch AI',url:'https://techcrunch.com/category/artificial-intelligence/feed/'},
  {id:'mit-tech',name:'MIT Technology Review',url:'https://www.technologyreview.com/feed/'},
  {id:'hf-blog',name:'Hugging Face (company updates)',url:'https://huggingface.co/blog/feed.xml'},
  {id:'github-blog',name:'GitHub Blog (company updates)',url:'https://github.blog/feed/'},
  {id:'science-news',name:'Science News',url:'https://www.sciencenews.org/feed'},
  {id:'npr-economy',name:'NPR Economy',url:'https://feeds.npr.org/1017/rss.xml'}
];
const DEFAULTS={sourceVersion:3,showCommentary:true,readingMode:'short',visualMode:'rotate',ritualMode:'morning',literature:'mixed',showWonder:true,showAction:true,readingSize:'normal',offlineBible:false,avoidRecent:false,recentReadings:[],recentLiterature:[],fullscreen:true,name:'',seconds:30,audio:'random',volume:15,model:'',news:true,ai:true,region:'',feeds:FEEDS.map(f=>f.id),lastBriefing:'',track:'',library:[],audioExcluded:[]};
function localDate(d=new Date()){return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');}
function safeUrl(value){try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password?u.href:null;}catch{return null;}}
function clean(value,max=500){return typeof value==='string'?value.replace(/[\u0000-\u001f\u007f]/g,' ').trim().slice(0,max):'';}
function settings(input={},old=DEFAULTS){
  return {...old,sourceVersion:3,showCommentary:input.showCommentary!==false,readingMode:input.readingMode==='chapter'?'chapter':'short',visualMode:['still','seasonal'].includes(input.visualMode)?input.visualMode:'rotate',ritualMode:['morning','auto','difficult','grateful','quiet','evening'].includes(input.ritualMode)?input.ritualMode:'morning',literature:['mixed','christian','poetry'].includes(input.literature)?input.literature:'mixed',showWonder:input.showWonder!==false,showAction:input.showAction!==false,readingSize:['small','normal','large'].includes(input.readingSize)?input.readingSize:'normal',offlineBible:input.offlineBible===true,avoidRecent:input.avoidRecent===true,fullscreen:input.fullscreen!==false,name:clean(input.name,60),seconds:[15,30,45,60].includes(Number(input.seconds))?Number(input.seconds):30,
    audio:['random','random-nature','random-music','random-hymns','local-library','off','ambient','file','hymns','amazing-grace','doxology','abide','morning-light','quiet-waters','soft-piano','soft-strings','rain','creek','ocean','woodland','wind','thunder','brown-noise','recorded-stream','recorded-rain','recorded-organ','recorded-long-creek','recorded-eventide','recorded-birdsong','recorded-dawn','recorded-satie','recorded-nocturne','recorded-nocturne55','recorded-light-rain','recorded-steady-rain','recorded-whispers'].includes(input.audio)?input.audio:'random',volume:Math.max(0,Math.min(100,Number(input.volume)||0)),
    model:clean(input.model,200),news:input.news===true,ai:input.ai===true,
    region:/^[A-Z]{2}[CZ]\d{3}$/.test(input.region||'')?input.region:'',
    feeds:Array.isArray(input.feeds)?FEEDS.filter(f=>input.feeds.includes(f.id)).map(f=>f.id):DEFAULTS.feeds};
}
const V2_IDS=['bbc-business','bbc-tech','bbc-science','bbc-world','npr','bls','nasa','nih','pbs','dol','fed','ars','gnn','guard-science','guard-world','bbc-us'];
function migrateFeeds(raw){
 if(!Array.isArray(raw.feeds))return DEFAULTS.feeds;
 if(raw.sourceVersion===3)return raw.feeds;
 const oldIds=raw.sourceVersion===2?V2_IDS:V2_IDS.slice(0,8);
 return FEEDS.filter(f=>raw.feeds.includes(f.id)||!oldIds.includes(f.id)).map(f=>f.id);
}
function newsDecision(enabled,last,today,force=false){return !enabled?'disabled':!force&&last===today?'already-shown':'fetch';}
function canComplete(result){return Boolean(result&&!result.pending&&!result.error&&!result.skipped&&result.candidateCount>0);}
function normalizeItems(feed,items,now=Date.now()){
  return items.flatMap(item=>{
    const title=clean(item.title),link=safeUrl(item.link),date=Date.parse(item.isoDate||item.pubDate||'');
    if(!title||!link||!Number.isFinite(date)||date>now+300000||date<now-72*3600000)return [];
    const excerpt=clean(typeof item.contentSnippet==='string'?item.contentSnippet.replace(/<[^>]*>/g,' '):'',280);return [{title,link,date:new Date(date).toISOString(),source:feed.name,sourceId:feed.id,excerpt:excerpt===title?'':excerpt}];
  }).sort((a,b)=>Date.parse(b.date)-Date.parse(a.date)).slice(0,14);
}
function topicPriority(item){
 const title=item.title.toLowerCase();
 const terms=/\b(ai|artificial intelligence|software|developer|programming|engineer(?:s|ing)?|open.source|open.weight|jobs?|employment|layoffs?|hiring|wages?|inflation|housing|affordability|louisiana|new orleans|st\. tammany|medical|health|breakthrough|research)\b/;
 return (terms.test(title)?2:0)+(/^(axios|axios-nola|la-illuminator|register|techcrunch-ai|hf-blog|github-blog|npr-economy|bls|dol)$/.test(item.sourceId)?1:0);
}
function sourceFamily(id){return id.startsWith('bbc-')?'bbc':id.startsWith('guard-')?'guardian':id.startsWith('axios')?'axios':id.startsWith('npr')?'npr':id;}
function combineItems(groups){
 const seen=new Map(),out=[];
 for(let i=0;i<14;i++)for(const group of groups){const a=group[i];if(!a)continue;
  const key=a.title.toLowerCase().replace(/[^a-z0-9]/g,'');
  if(seen.has(key)){const prior=seen.get(key);if(sourceFamily(prior.sourceId)!==sourceFamily(a.sourceId)&&!prior.alsoReported.some(x=>x.link===a.link)&&prior.alsoReported.length<3)prior.alsoReported.push({source:a.source,link:a.link});continue;}
  const item={...a,id:'n'+out.length,alsoReported:[]};seen.set(key,item);out.push(item);}
 return diverseCandidates(out,96);
}
function topic(item){
 const t=item.title.toLowerCase();
 if(/louisiana|new orleans|st\. tammany|baton rouge/.test(t)||/axios-nola|la-illuminator/.test(item.sourceId))return 'local';
 if(/\b(jobs?|employment|layoffs?|hiring|wages?|inflation|housing|affordability|economy|unemployment)\b/.test(t)||/^(bls|dol|fed|npr-economy)$/.test(item.sourceId))return 'work';
 if(/\b(ai|artificial intelligence|software|developer|programming|engineer|open.source|open.weight)\b/.test(t)||/^(bbc-tech|ars|register|techcrunch-ai|mit-tech|hf-blog|github-blog)$/.test(item.sourceId))return 'technology';
 if(/\b(health|medical|research|science|space|wildlife|breakthrough|conservation)\b/.test(t)||/^(nasa|nih|bbc-science|guard-science|science-news|gnn)$/.test(item.sourceId))return 'discovery';
 return 'general';
}
function diverseCandidates(items,limit=48){
 const order=['local','work','technology','discovery','general'],buckets=new Map(order.map(x=>[x,[]]));
 for(const item of [...items].sort((a,b)=>topicPriority(b)-topicPriority(a)||Date.parse(b.date)-Date.parse(a.date)))buckets.get(topic(item)).push(item);
 const out=[],families=new Map();while(out.length<limit&&order.some(k=>buckets.get(k).length)){for(const k of order){const pool=buckets.get(k);if(!pool.length||out.length===limit)continue;let i=pool.findIndex(x=>(families.get(sourceFamily(x.sourceId))||0)<Math.max(2,Math.ceil(out.length/6)));if(i<0)i=0;const [x]=pool.splice(i,1);const family=sourceFamily(x.sourceId);families.set(family,(families.get(family)||0)+1);out.push(x);}}
 return out;
}
function applySelection(items,selection){
  const ids=new Map(items.map(a=>[a.id,a])),used=new Set();
  function pick(list,max){return (Array.isArray(list)?list:[]).flatMap(id=>{
    if(typeof id!=='string'||!ids.has(id)||used.has(id))return [];
    used.add(id);return [ids.get(id)];
  }).slice(0,max);}
  const attention=pick(selection?.attention,3),good=pick(selection?.good,5);
  return {good,attention};
}
const evidenceKinds=['reported-event','measured-data','forecast','opinion','promotion','unclear'];
function evidenceKind(item,row){const t=item.title.toLowerCase();if(/\b(opinion|editorial|commentary|op-ed)\b/.test(t))return 'opinion';if(/\b(predicts?|forecasts?|could|might|may|expects?|projections?|will replace)\b/.test(t))return 'forecast';return evidenceKinds.includes(row?.kind)?row.kind:'unclear';}
function rankScored(items,rows){
  const byId=new Map(items.map(i=>[i.id,i])),seen=new Set(),ranked=[];
  for(const row of Array.isArray(rows)?rows:[]){
    if(!row||!byId.has(row.id)||seen.has(row.id)||!['positive','negative','neutral','unclear'].includes(row.tone))continue;
    if(![row.relevance,row.impact].every(x=>Number.isInteger(x)&&x>=0&&x<=3))continue;
    const item=byId.get(row.id),kind=evidenceKind(item,row),uncertain=['forecast','opinion','promotion','unclear'].includes(kind);seen.add(row.id);ranked.push({...item,kind,tone:row.tone,relevance:row.relevance,impact:row.impact,score:row.relevance*2+row.impact-(uncertain?2:0)});
  }
  ranked.sort((a,b)=>b.score-a.score||Date.parse(b.date)-Date.parse(a.date)||a.id.localeCompare(b.id));
  const concrete=x=>['reported-event','measured-data'].includes(x.kind);const good=ranked.filter(x=>x.tone==='positive'&&x.relevance>=1&&concrete(x)),bad=ranked.filter(x=>x.tone==='negative'),attention=bad.filter(x=>x.relevance>=2&&x.impact>=2&&concrete(x)),other=ranked.filter(x=>x.relevance>=2&&(x.tone==='neutral'||!concrete(x)));
  function diverse(list,max){const sources=new Map(),out=[];for(const item of list){const family=item.sourceId.startsWith('bbc-')?'bbc':item.sourceId.startsWith('guard-')?'guardian':item.sourceId.startsWith('axios')?'axios':item.sourceId.startsWith('npr')?'npr':item.sourceId;const n=sources.get(family)||0;if(n>=2)continue;sources.set(family,n+1);out.push(item);if(out.length===max)break;}return out;}
  return {good:diverse(good,5),attention:diverse(attention,3),other:diverse(other,3),ranked,counts:{positive:ranked.filter(x=>x.tone==='positive').length,negative:bad.length,neutral:ranked.filter(x=>x.tone==='neutral').length,unclear:ranked.filter(x=>x.tone==='unclear').length,unclassified:items.length-ranked.length}};
}
function fallback(items){
  // No AI means no claim of positive sentiment or threat assessment.
  return {good:[],attention:[],unclassified:items.slice(0,12)};
}
function alertItems(features){
  return features.flatMap(f=>{const p=f.properties||{};if(p.status!=='Actual')return [];
    return [{title:clean(p.event),headline:clean(p.headline,700),instruction:clean(p.instruction,2500),severity:clean(p.severity),link:'https://www.weather.gov/'}];
  });
}
function esvLink(ref){return 'https://www.esv.org/'+encodeURIComponent(ref.replace(/ /g,'+')).replace(/%2B/g,'+')+'/';}
const externalRefs=new Set(Object.values(require('./study/crossrefs.json')).flat());
function allowedPassage(ref){return externalRefs.has(ref)||chapterSet.has(ref)||passages.some(p=>p[0]===ref||p[1]===ref||p[3].includes(ref));}
module.exports={FEEDS,DEFAULTS,migrateFeeds,newsDecision,canComplete,topicPriority,diverseCandidates,localDate,safeUrl,clean,settings,normalizeItems,combineItems,applySelection,rankScored,fallback,alertItems,esvLink,allowedPassage,makeRitual};
