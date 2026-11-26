/* Only user-selected music and restrained nature qualify for the default rotation. */
(function(root){
 const nature=['rain','creek','ocean','wind'];
 const hymns=['amazing-grace','doxology','abide'];
 const recordedNature=['recorded-stream','recorded-long-creek','recorded-birdsong','recorded-dawn'];
 const piano=['recorded-satie','recorded-nocturne','recorded-nocturne55'];
 const organ=['recorded-organ','recorded-eventide'];
 const modes=['random','random-nature','random-music','random-hymns','local-library','hymns'];
 const known=[...nature,'woodland','thunder','brown-noise','ambient','morning-light','quiet-waters','soft-piano','soft-strings',...hymns,...recordedNature,...piano,...organ,'recorded-rain'];
 function pool(mode,installed=[],localCount=0,excluded=[]){
  const available=new Set(installed),blocked=new Set(excluded),allowed=ids=>ids.filter(x=>!blocked.has(x)),downloaded=ids=>allowed(ids.filter(x=>available.has(x)));
  const realNature=downloaded(recordedNature),realMusic=downloaded(piano),realHymns=downloaded(organ);
  const local=Array.from({length:Math.min(100,Math.max(0,localCount|0))},(_,i)=>'local:'+i);
  if(mode==='random-nature')return realNature.length?realNature:allowed(nature);
  if(mode==='random-music')return local.length?local:realMusic;
  if(mode==='random-hymns')return realHymns;
  if(mode==='local-library')return local;
  if(mode==='hymns')return allowed(hymns);
  return local.length?local:[...realMusic,...(realNature.length?realNature:allowed(nature))];
 }
 function choose(mode,installed=[],localCount=0,previous=null,random=Math.random,excluded=[]){
  if(!modes.includes(mode))return mode;
  const all=pool(mode,installed,localCount,excluded),eligible=all.length>1?all.filter(x=>x!==previous):all;
  return eligible.length?eligible[Math.min(eligible.length-1,Math.max(0,Math.floor(random()*eligible.length)))]:null;
 }
 const api={modes,known,pool,choose};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.BeStillAudioChoice=api;
})(typeof window!=='undefined'?window:globalThis);
