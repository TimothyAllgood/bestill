// Explicit publisher families, not a general-purpose browser. HTTPS only.
const publishers=['bibleproject.com','thebibleproject.com','esv.org','bibleref.com','netbible.org','thegospelcoalition.org','gutenberg.org','poetryfoundation.org','nasa.gov','usgs.gov','nps.gov','loc.gov','noaa.gov','bbc.com','bbc.co.uk','npr.org','bls.gov','nih.gov','pbs.org','dol.gov','federalreserve.gov','arstechnica.com','goodnewsnetwork.org','theguardian.com','axios.com','lailluminator.com','theregister.com','techcrunch.com','technologyreview.com','huggingface.co','github.blog','sciencenews.org','weather.gov','stepbible.org','openbible.info','bibleodyssey.org','biblemaps.app','metmuseum.org','ebible.org'];
const videoAssets=['bibleproject.com','thebibleproject.com','youtube.com','youtube-nocookie.com','googlevideo.com','ytimg.com','gstatic.com','googleapis.com','vimeo.com','vimeocdn.com','wistia.com','wistia.net'];
function parsed(url){try{const x=new URL(url);return x.protocol==='https:'&&!x.username&&!x.password&&!x.port?x:null;}catch{return null;}}
const belongs=(host,domain)=>host===domain||host.endsWith('.'+domain);
function publisher(url){const x=parsed(url);return x?publishers.find(d=>belongs(x.hostname,d))||null:null;}
function canOpen(url,approved){return typeof url==='string'&&approved.has(url)&&!!publisher(url);}
function allowRequest(initial,url,type){
 const family=publisher(initial),target=parsed(url);if(!family||!target)return false;
 if(type==='mainFrame')return publisher(url)===family;
 if(belongs(target.hostname,family))return true;
 return ['bibleproject.com','thebibleproject.com'].includes(family)&&videoAssets.some(d=>belongs(target.hostname,d));
}
module.exports={publisher,canOpen,allowRequest};
