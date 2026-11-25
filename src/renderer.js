const api=window.beStill,stage=document.querySelector('#stage'),progress=document.querySelector('#progress'),back=document.querySelector('#back'),sound=document.querySelector('#sound'),dialog=document.querySelector('#preferences'),form=document.querySelector('#settings-form');
let session,config,step=0,timer,transition=0,versePromise,briefingPromise,briefingShown=false,ctx,padGain,oscillators=[],audio,objectUrl,soundOn=false,soundToken=0;
const el=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
function btn(text,fn,cls=''){const b=el('button',cls,text);b.type='button';b.addEventListener('click',fn);return b;}
function actions(...buttons){const a=el('div','actions');a.append(...buttons);return a;}
function external(label,url,cls=''){return btn(label,()=>api.open(url).catch(()=>{}),cls);}
function scene(label,title,sub){const s=el('section','scene');if(label)s.append(el('p','eyebrow',label));if(title)s.append(el('h1','',title));if(sub)s.append(el('p','sub',sub));return s;}
function show(s){stage.replaceChildren(s);stage.focus({preventScroll:true});stage.scrollIntoView({block:'start'});}
function dots(){const d=el('div','dots');d.setAttribute('aria-label','Step '+(step+1)+' of 6');for(let i=0;i<6;i++)d.append(el('span','dot'+(i===step?' active':'')));progress.replaceChildren(d);back.hidden=step===0||step===4;}
function cancelTimer(){clearTimeout(timer);}
function schedule(){cancelTimer();if(step===0&&!dialog.open)timer=setTimeout(()=>go(1),config.seconds*1000);}
function go(next){cancelTimer();const token=++transition;const current=stage.firstElementChild;if(current)current.classList.add('leaving');setTimeout(()=>{if(token!==transition)return;step=next;render();},window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:650);}
function greeting(){const h=new Date().getHours();return (h<12?'Good morning':h<18?'Good afternoon':'Good evening')+(config.name?', '+config.name: '')+'.';}
function render(){
  dots();const r=session.ritual;
  if(step===0){const s=scene('',r.arrival,'Breathe gently, at your own pace.');s.prepend(el('p','greeting',greeting()));const circle=el('div','breath');circle.setAttribute('aria-hidden','true');s.append(circle,actions(btn('Continue when ready',()=>go(1),'quiet')));show(s);schedule();}
  if(step===1){const s=scene('Scripture',r.reference,'');const text=el('div','verse','Opening the passage…'),credit=el('p','credit');s.append(text,credit);const a=actions(btn('Study this passage',()=>study()),btn('Continue',()=>go(2),'primary'));s.append(a);show(s);versePromise.then(v=>{if(!s.isConnected)return;text.textContent=v.text||'Read today’s passage in the ESV.';credit.textContent=v.notice;a.prepend(external('Read on ESV.org',v.link));}).catch(()=>{text.textContent='Scripture is currently unavailable.';});}
  if(step===2){const s=scene('A moment with God',r.prayer,'Bring it before God in your own words. Take as much time as you need.');s.append(actions(btn('Continue when ready',()=>go(3),'primary')));show(s);}
  if(step===3){const s=scene('Gratitude',r.gratitude,'Stay here for a moment. There is nothing to write or submit.');s.append(actions(btn('Continue when ready',()=>go(config.news&&!briefingShown?4:5),'primary')));show(s);}
  if(step===4)renderNews();
  if(step===5){const s=scene('','Go live today.',r.ending);s.append(actions(btn('Begin my day',()=>{stopSound();api.finish();},'primary')));show(s);}
}
function study(){
  const r=session.ritual,s=scene('Optional study',r.reference,'Read in context, with human-written resources.');s.classList.add('study');const context=el('div','section');context.append(el('h2','','Surrounding passage'),el('p','sub',r.context));const target=el('p','','Opening context…');context.append(target);api.scripture(r.context).then(v=>{if(!s.isConnected)return;target.textContent=v.text||v.notice;context.append(el('p','credit',v.text?v.notice:''),external('Read the full context at ESV.org',v.link));}).catch(()=>{target.textContent='Context unavailable.';});s.append(context);
  const commentary=el('div','section');commentary.append(el('h2','','Human commentary'),el('p','sub','BibleRef (Got Questions Ministries) provides verse explanations and surrounding context from human writers and editors. Read the original commentary rather than an AI reconstruction.'),external('Open BibleRef commentary',r.study));s.append(commentary);
  const related=el('div','section');related.append(el('h2','','Related reading'));for(const ref of r.related)related.append(external(ref,'https://www.esv.org/'+encodeURIComponent(ref.replace(/ /g,'+')).replace(/%2B/g,'+')+'/','article'));s.append(related);
  const reflection=el('div','section');reflection.append(el('h2','','Consider'),el('p','','What does the surrounding passage reveal about its original audience and about God?'),el('p','','What would faithfulness look like in light of this passage today?'));s.append(reflection,actions(btn('Return to Scripture',()=>render(),'primary')));show(s);
}
function article(a){const b=external(a.title,a.link,'article');b.append(el('span','meta',a.source+' · '+new Date(a.date).toLocaleString(undefined,{dateStyle:'medium',timeStyle:'short'})));return b;}
function section(title,items,empty){const d=el('div','section');d.append(el('h2','',title));if(!items.length)d.append(el('p','sub',empty));else for(const item of items)d.append(article(item));return d;}
function renderNews(){
  const s=scene('The world this morning','A little perspective.','A short briefing, not a complete picture of the world.');s.classList.add('news');
  const content=el('div','section','Checking the selected sources…');s.append(content,actions(btn('Skip briefing',()=>go(5),'quiet')));show(s);
  briefingPromise??=api.briefing();briefingPromise.then(async data=>{
    if(!s.isConnected)return;content.remove();s.lastElementChild.remove();
    if(data.skipped){briefingShown=true;s.append(el('p','sub','The daily briefing has already been shown or is disabled.'));}
    else if(data.error){s.append(el('p','sub','Briefing unavailable. No conclusions can be drawn from this check.'));}
    else{
      if(data.mode==='ollama'){
        s.append(section('Constructive developments',data.good,'No suitable constructive headlines were selected.'),section('Worth knowing',data.attention,'No headlines were selected for this section. This is not a safety assessment.'));
      }else s.append(section('Recent headlines · unclassified',data.unclassified,'No recent headlines could be retrieved.'),el('p','sub','Ollama was disabled or unavailable. Headlines were not assessed for relevance or sentiment.'));
      const weather=el('div','section');weather.append(el('h2','','Official weather alerts'));
      if(data.alerts.status!=='checked')weather.append(el('p','sub','NWS check '+data.alerts.status+'. Do not rely on this briefing for emergency notifications.'));
      else if(!data.alerts.items.length)weather.append(el('p','sub','No active alerts returned for the configured zone at the time of this check.'));
      else for(const a of data.alerts.items){const n=el('div','alert');n.append(el('h3','',a.title+' · '+a.severity),el('p','',a.headline),el('p','',a.instruction),external('National Weather Service',a.link));weather.append(n);}s.append(weather);
      const coverage=el('details');coverage.append(el('summary','','Source coverage & limitations'));for(const f of data.coverage)coverage.append(el('p','',f.name+': '+(f.ok?f.count+' recent headlines':'unavailable')));coverage.append(el('p','','Checked '+new Date(data.checkedAt).toLocaleString()+'. Headlines from the last 72 hours. '+(data.model?'Local selection by '+data.model+'. ':'')+'Not exhaustive; read the source for context. No publisher is guaranteed unbiased.'));s.append(coverage);
      if(data.coverage.some(f=>f.ok)||data.alerts.status==='checked'){briefingShown=true;api.seen().catch(()=>{s.append(el('p','sub','Could not save the daily completion date.'));});}
    }
    s.append(actions(btn('Continue',()=>go(5),'primary')));
  }).catch(()=>{if(s.isConnected)content.textContent='Briefing unavailable. You can skip it.';});
}
function stopSound(){soundToken++;soundOn=false;if(audio){audio.pause();audio=null;}if(objectUrl){URL.revokeObjectURL(objectUrl);objectUrl=null;}for(const o of oscillators)try{o.stop();}catch{}oscillators=[];if(ctx){ctx.close().catch(()=>{});ctx=null;}padGain=null;sound.textContent='Sound off';sound.setAttribute('aria-pressed','false');}
async function startSound(){
  if(soundOn)return;const token=++soundToken;
  try{
    if(config.audio==='file'){const track=await api.track();if(token!==soundToken)return;if(!track)throw Error('No audio file selected.');objectUrl=URL.createObjectURL(new Blob([new Uint8Array(track.bytes)],{type:track.mime}));audio=new Audio(objectUrl);audio.loop=true;audio.volume=config.volume/100;await audio.play();}
    else{ctx=new AudioContext();await ctx.resume();if(token!==soundToken)return;padGain=ctx.createGain();padGain.gain.setValueAtTime(0,ctx.currentTime);padGain.gain.linearRampToValueAtTime(config.volume/100*.055,ctx.currentTime+3);padGain.connect(ctx.destination);for(const freq of [130.81,196,261.63,329.63]){const o=ctx.createOscillator();o.type='sine';o.frequency.value=freq;const g=ctx.createGain();g.gain.value=.22;o.connect(g).connect(padGain);o.start();oscillators.push(o);}}
    if(token!==soundToken)return;soundOn=true;sound.textContent='Sound on';sound.setAttribute('aria-pressed','true');
  }catch{if(token===soundToken){stopSound();sound.textContent='Audio unavailable';}}
}
sound.addEventListener('click',()=>soundOn?stopSound():startSound());
back.addEventListener('click',()=>go(Math.max(0,step-1)));
document.querySelector('#settings').addEventListener('click',async()=>{
  cancelTimer();for(const k of ['name','seconds','audio','volume','region'])form.elements[k].value=config[k];for(const k of ['news','ai'])form.elements[k].checked=config[k];
  const feeds=document.querySelector('#feeds');feeds.replaceChildren();for(const f of session.feeds){const label=el('label','check'),input=el('input');input.type='checkbox';input.value=f.id;input.checked=config.feeds.includes(f.id);input.name='feed';label.append(input,document.createTextNode(f.name));feeds.append(label);}
  const select=form.elements.model;select.replaceChildren(new Option('Automatic (installed model)',''));if(config.model)select.add(new Option(config.model,config.model));select.value=config.model;
  document.querySelector('#track-status').textContent=config.track?'A local audio track is selected.':'No local track selected.';
  document.querySelector('#model-status').textContent='Checking local Ollama…';dialog.showModal();const installed=await api.models().catch(()=>[]);if(!dialog.open)return;for(const m of installed)if(!Array.from(select.options).some(o=>o.value===m))select.add(new Option(m,m));document.querySelector('#model-status').textContent=installed.length?installed.length+' installed local models found.':'Ollama is offline or no local models are installed.';
});
document.querySelector('#close-settings').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>schedule());
document.querySelector('#pick-track').addEventListener('click',async()=>{try{if(await api.chooseTrack()){config.track=true;document.querySelector('#track-status').textContent='Local track selected.';form.elements.audio.value='file';}}catch(e){document.querySelector('#track-status').textContent='Unable to select audio file.';}});
form.addEventListener('submit',async e=>{e.preventDefault();const f=form.elements,next={...config};for(const k of ['name','seconds','audio','volume','region','model'])next[k]=f[k].value;for(const k of ['news','ai'])next[k]=f[k].checked;next.feeds=Array.from(form.querySelectorAll('[name=feed]:checked')).map(i=>i.value);
  try{await api.save(next);config=next;stopSound();if(config.audio!=='off')await startSound();dialog.close();if(step===0)render();}
  catch{document.querySelector('#settings-error').textContent='Preferences could not be saved.';}
});
async function init(){try{session=await api.session();config=session.config;briefingShown=config.lastBriefing===session.today;versePromise=api.scripture(session.ritual.reference);render();if(config.audio!=='off')startSound();}catch{show(scene('','Be Still could not start.','Close the application and try again.'));}}
init();
