const {makeRitual,passages}=require('./content.cjs');
const FEEDS=[
  {id:'bbc-business',name:'BBC Business',url:'https://feeds.bbci.co.uk/news/business/rss.xml'},
  {id:'bbc-tech',name:'BBC Technology',url:'https://feeds.bbci.co.uk/news/technology/rss.xml'},
  {id:'bbc-science',name:'BBC Science & Environment',url:'https://feeds.bbci.co.uk/news/science_and_environment/rss.xml'},
  {id:'bbc-world',name:'BBC World',url:'https://feeds.bbci.co.uk/news/world/rss.xml'},
  {id:'npr',name:'NPR News',url:'https://feeds.npr.org/1001/rss.xml'},
  {id:'bls',name:'Bureau of Labor Statistics',url:'https://www.bls.gov/feed/bls_latest.rss'},
  {id:'nasa',name:'NASA',url:'https://www.nasa.gov/news-release/feed/'},
  {id:'nih',name:'National Institutes of Health',url:'https://www.nih.gov/news-releases/feed.xml'}
];
const DEFAULTS={name:'',seconds:30,audio:'off',volume:20,model:'',news:true,ai:true,region:'',feeds:FEEDS.map(f=>f.id),lastBriefing:'',track:''};
function localDate(d=new Date()){return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');}
function safeUrl(value){try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password?u.href:null;}catch{return null;}}
function clean(value,max=500){return typeof value==='string'?value.replace(/[\u0000-\u001f\u007f]/g,' ').trim().slice(0,max):'';}
function settings(input={},old=DEFAULTS){
  return {...old,name:clean(input.name,60),seconds:[15,30,45,60].includes(Number(input.seconds))?Number(input.seconds):30,
    audio:['off','ambient','file'].includes(input.audio)?input.audio:'off',volume:Math.max(0,Math.min(100,Number(input.volume)||0)),
    model:clean(input.model,200),news:input.news===true,ai:input.ai===true,
    region:/^[A-Z]{2}[CZ]\d{3}$/.test(input.region||'')?input.region:'',
    feeds:Array.isArray(input.feeds)?FEEDS.filter(f=>input.feeds.includes(f.id)).map(f=>f.id):DEFAULTS.feeds};
}
function normalizeItems(feed,items,now=Date.now()){
  return items.flatMap(item=>{
    const title=clean(item.title),link=safeUrl(item.link),date=Date.parse(item.isoDate||item.pubDate||'');
    if(!title||!link||!Number.isFinite(date)||date>now+300000||date<now-72*3600000)return [];
    return [{title,link,date:new Date(date).toISOString(),source:feed.name,sourceId:feed.id}];
  }).slice(0,14);
}
function combineItems(groups){
  const seen=new Set(),out=[];
  // Round robin preserves source diversity when a publisher has a large feed.
  for(let i=0;i<14;i++)for(const group of groups){const a=group[i];if(!a)continue;
    const key=a.title.toLowerCase().replace(/[^a-z0-9]/g,'');
    if(seen.has(key))continue;seen.add(key);out.push({...a,id:'n'+out.length});}
  return out.slice(0,64);
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
function fallback(items){
  // No AI means no claim of positive sentiment or threat assessment.
  return {good:[],attention:[],unclassified:items.slice(0,6)};
}
function alertItems(features){
  return features.flatMap(f=>{const p=f.properties||{};if(p.status!=='Actual')return [];
    return [{title:clean(p.event),headline:clean(p.headline,700),instruction:clean(p.instruction,2500),severity:clean(p.severity),link:'https://www.weather.gov/'}];
  });
}
function esvLink(ref){return 'https://www.esv.org/'+encodeURIComponent(ref.replace(/ /g,'+')).replace(/%2B/g,'+')+'/';}
function allowedPassage(ref){return passages.some(p=>p[0]===ref||p[1]===ref||p[3].includes(ref));}
module.exports={FEEDS,DEFAULTS,localDate,safeUrl,clean,settings,normalizeItems,combineItems,applySelection,fallback,alertItems,esvLink,allowedPassage,makeRitual};
