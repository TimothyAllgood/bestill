// Official BibleProject book overview collections; combined books share an overview.
const {books,bookFor}=require('../bible.cjs');
const base='https://bibleproject.com/videos/';
const combined={kings:'1 & 2 Kings',chronicles:'1 & 2 Chronicles','ezra-nehemiah':'Ezra–Nehemiah','1-3-john':'1–3 John','song-songs':'Song of Songs',psalms:'Psalms'};
function resources(reference){
 const b=bookFor(reference);let videos=[];
 if(b){const [name,count,slugs,split]=b;const chapter=Number(reference.slice(name.length+1).split(':')[0]);
 videos=slugs.split('|').map((slug,i)=>({title:combined[slug]||(split?name+' '+(i?split+1:1)+'–'+(i?count:split):name==='Psalm'?'Psalms':name),url:base+slug+'/',scope:'Book overview',recommended:!split||(i===0?chapter<=split:chapter>split)})).sort((a,b)=>Number(b.recommended)-Number(a.recommended));}
 const more=[{title:'Original languages',description:'STEP Bible · Hebrew and Greek vocabulary, translation comparison and cross-references.',url:'https://www.stepbible.org/'},{title:'Biblical geography',description:'OpenBible.info atlas · possible locations and map evidence.',url:'https://www.openbible.info/geo/'},{title:'Historical and cultural context',description:'Bible Odyssey · scholarly articles, people and places.',url:'https://www.bibleodyssey.org/'},{title:'Biblical timelines',description:'Bible Maps · explore chronology; dates and identifications may be debated.',url:'https://biblemaps.app/'},{title:'Historical Christian art',description:'The Metropolitan Museum of Art · historical interpretations, not documentary depictions.',url:'https://www.metmuseum.org/art/collection/search?q='+encodeURIComponent(b?.[0]||'Bible')},{title:'Cross-reference library',description:'OpenBible.info · verse-to-verse references drawn from historical and community data.',url:'https://www.openbible.info/labs/cross-references/'}];
 const passageVideo=reference==='Matthew 6:34'?{title:'Wealth and Worry',url:base+'wealth-and-worry/',scope:'Passage study · Matthew 6:19–34'}:null;
 return {more,video:videos[0]||null,videos,passageVideo,net:'https://netbible.org/',tgc:'https://www.thegospelcoalition.org/commentary/',bibleProject:'https://bibleproject.com/',collection:'https://bibleproject.com/videos/collections/'+(b&&books.indexOf(b)>=39?'new':'old')+'-testament/'};
}
module.exports={resources};
