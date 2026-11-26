const data=require('./study/henry.json');
const chapters=require('./study/chapters.json');
const {resources}=require('./study/resources.cjs');
function commentary(reference){
 if(typeof reference!=='string')return null;
 const meta={title:data.title,author:data.author,license:data.license};
 if(Object.hasOwn(data.entries,reference))return {...meta,...data.entries[reference]};
 const match=/^(.+ \d+)(?::(\d+)(?:-(\d+))?)?$/.exec(reference);
 if(!match||!Object.hasOwn(chapters,match[1]))return null;
 const chapter=chapters[match[1]],first=match[2]?Number(match[2]):chapter.sections[0].start,last=match[2]?Number(match[3]||match[2]):chapter.sections.at(-1).end;
 if(last<first||last-first>200)return null;
 const sections=chapter.sections.filter(s=>s.start<=last&&s.end>=first);
 if(!sections.length||Array.from({length:last-first+1},(_,i)=>first+i).some(v=>!sections.some(s=>v>=s.start&&v<=s.end)))return null;
 return {...meta,source:chapter.source,sourceBlob:chapter.sourceBlob,range:sections[0].start+'–'+sections.at(-1).end,content:sections.map(s=>s.content).join('\n\n')};
}
module.exports={commentary,resources};
