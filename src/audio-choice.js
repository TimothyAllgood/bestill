/* Session-only audio selection; downloaded recordings and personal files are eligible only when available. */
(function(root){
 const music=['morning-light','quiet-waters','soft-piano','soft-strings'];
 const nature=['rain','creek','ocean','woodland','wind'];
 const hymns=['amazing-grace','doxology','abide'];
 const recordedNature=['recorded-stream','recorded-long-creek','recorded-birdsong','recorded-dawn'];
 const recordedMusic=['recorded-organ','recorded-eventide','recorded-satie'];
 const modes=['random','random-nature','random-music','random-hymns','local-library','hymns'];
 function pool(mode,installed=[],localCount=0){
  const available=new Set(installed),realNature=recordedNature.filter(x=>available.has(x)),realMusic=recordedMusic.filter(x=>available.has(x)),realHymns=realMusic.filter(x=>x!=='recorded-satie'),local=Array.from({length:Math.min(100,Math.max(0,localCount|0))},(_,i)=>'local:'+i);
  if(mode==='random-nature')return realNature.length?realNature:nature;
  if(mode==='random-music')return realMusic.length?[...realMusic,...local]:[...music,...local];
  if(mode==='random-hymns')return realHymns.length?realHymns:hymns;
  if(mode==='local-library')return local;
  if(mode==='hymns')return hymns;
  return [...(realNature.length?realNature:nature),...(realMusic.length?realMusic:music),...local];
 }
 function choose(mode,installed=[],localCount=0,previous=null,random=Math.random){
  if(!modes.includes(mode))return mode;
  const all=pool(mode,installed,localCount),eligible=all.length>1?all.filter(x=>x!==previous):all;
  return eligible.length?eligible[Math.min(eligible.length-1,Math.max(0,Math.floor(random()*eligible.length)))]:null;
 }
 const api={modes,pool,choose};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.BeStillAudioChoice=api;
})(typeof window!=='undefined'?window:globalThis);
