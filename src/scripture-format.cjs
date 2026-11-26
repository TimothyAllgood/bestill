// Crossway plain-text endpoint: bracketed verse numbers and terminal short copyright.
function passageParams(ref,numbered=false){
 return {q:ref,'include-passage-references':'false','include-verse-numbers':String(numbered===true),'include-first-verse-numbers':String(numbered===true),'include-footnotes':'false','include-footnote-body':'false','include-headings':'false','include-short-copyright':'true','include-copyright':'false'};
}
function formatPassage(passages,numbered=false){
 const raw=Array.isArray(passages)?passages.filter(x=>typeof x==='string').join('\n\n').trim():'';
 if(!raw)return {text:'',attribution:'',parts:[]};
 const suffix=/\s*\(ESV\)\s*$/.exec(raw);
 // Preserve the short notice as separate visible metadata, not Scripture body text.
 const text=suffix?raw.slice(0,suffix.index).trimEnd():raw;
 const parts=[];
 if(numbered){
  let end=0;
  for(const match of text.matchAll(/\[(\d{1,3})\]/g)){
   if(match.index>end)parts.push({text:text.slice(end,match.index)});
   parts.push({verse:match[1]});end=match.index+match[0].length;
  }
  if(end<text.length)parts.push({text:text.slice(end)});
 }
 return {text,attribution:suffix?'(ESV)':'ESV',parts};
}
module.exports={passageParams,formatPassage};
