// Official BibleProject book overview collections; combined books share an overview.
const {books,bookFor}=require('../bible.cjs');
const base='https://bibleproject.com/videos/';
const combined={kings:'1 & 2 Kings',chronicles:'1 & 2 Chronicles','ezra-nehemiah':'Ezra–Nehemiah','1-3-john':'1–3 John','song-songs':'Song of Songs',psalms:'Psalms'};
function resources(reference){
 const b=bookFor(reference);let videos=[];
 if(b){const [name,count,slugs,split]=b;const chapter=Number(reference.slice(name.length+1).split(':')[0]);
 videos=slugs.split('|').map((slug,i)=>({title:combined[slug]||(split?name+' '+(i?split+1:1)+'–'+(i?count:split):name==='Psalm'?'Psalms':name),url:base+slug+'/',scope:'Book overview',recommended:!split||(i===0?chapter<=split:chapter>split)})).sort((a,b)=>Number(b.recommended)-Number(a.recommended));}
 const passageVideo=reference==='Matthew 6:34'?{title:'Wealth and Worry',url:base+'wealth-and-worry/',scope:'Passage study · Matthew 6:19–34'}:null;
 return {video:videos[0]||null,videos,passageVideo,net:'https://netbible.org/',tgc:'https://www.thegospelcoalition.org/commentary/',bibleProject:'https://bibleproject.com/',collection:'https://bibleproject.com/videos/collections/'+(b&&books.indexOf(b)>=39?'new':'old')+'-testament/'};
}
module.exports={resources};
