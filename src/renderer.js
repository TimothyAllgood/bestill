const api=window.beStill,stage=document.querySelector('#stage'),progress=document.querySelector('#progress'),back=document.querySelector('#back'),sound=document.querySelector('#sound'),dialog=document.querySelector('#preferences'),form=document.querySelector('#settings-form');
let selectedHymn=null,previewing=false;
let session,config,step=0,timer,transition=0,versePromise,briefingPromise,briefingShown=false,ctx,padGain,oscillators=[],audio,objectUrl,soundOn=false,soundToken=0;
const el=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
function btn(text,fn,cls=''){const b=el('button',cls,text);b.type='button';b.addEventListener('click',fn);return b;}
function actions(...buttons){const a=el('div','actions');a.append(...buttons);return a;}
function external(label,url,cls=''){return btn(label,()=>api.open(url).catch(()=>{}),cls);}
function scene(label,title,sub){const s=el('section','scene');if(label)s.append(el('p','eyebrow',label));if(title)s.append(el('h1','',title));if(sub)s.append(el('p','sub',sub));return s;}
function show(s){stage.replaceChildren(s);stage.focus({preventScroll:true});stage.scrollIntoView({block:'start'});}
function dots(){const d=el('div','dots');d.setAttribute('aria-label','Step '+(step+1)+' of 6');for(let i=0;i<6;i++)d.append(el('span','dot'+(i===step?' active':'')));progress.replaceChildren(d);back.hidden=step===0;}
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
  const r=session.ritual,s=scene('Read a little deeper',r.reference,'Scripture first. Human-written guidance, only when you want it.');
  s.classList.add('study');
  s.append(actions(btn('← Back to Scripture',()=>render(),'quiet'),btn('Continue to prayer',()=>go(2),'primary')));
  const tabs=el('div','study-tabs'),panel=el('div','study-panel');tabs.setAttribute('role','group');tabs.setAttribute('aria-label','Study options');
  let contextPromise;
  const options=[
    ['Context',()=>{const box=el('div','reading');box.append(el('h2','',r.context));const passage=el('p','context-text','Opening the passage…');box.append(passage);contextPromise??=api.scripture(r.context);contextPromise.then(v=>{if(!box.isConnected)return;passage.textContent=v.text||v.notice;box.append(el('p','credit',v.text?v.notice:''),external('Open at ESV.org ↗',v.link,'quiet'));}).catch(()=>{passage.textContent='Context unavailable.';});return box;}],
    ['Explanation',()=>{const box=el('div','reading');box.append(el('h2','','Matthew Henry’s Concise Commentary'));const note=el('p','sub','Opening the included commentary…');box.append(note);api.commentary(r.reference).then(v=>{if(!box.isConnected)return;if(!v){note.textContent='No included commentary for this passage.';return;}note.textContent=v.author+' · Verses '+v.range;const text=el('div','commentary-text');for(const paragraph of v.content.split(/\n\s*\n/))text.append(el('p','',paragraph));box.append(text);const credits=el('details','study-credits');credits.append(el('summary','','About this commentary'),el('p','',v.title+' · '+v.license+'. Historical Protestant devotional interpretation, not Scripture or a modern scholarly consensus. Original wording retained.'),external('View exact source edition ↗',v.source,'quiet'),external('Alternative human commentary: BibleRef ↗',r.study,'quiet'));box.append(credits);}).catch(()=>{note.textContent='Commentary could not be loaded.';});return box;}],
    ['Related verses',()=>{const box=el('div','reading');box.append(el('h2','','Keep reading'),el('p','sub','Expand a related verse without leaving Be Still.'));for(const ref of r.related){const details=el('details','related-verse'),text=el('p','context-text');details.append(el('summary','',ref),text);let loaded=false;details.addEventListener('toggle',()=>{if(!details.open||loaded)return;loaded=true;text.textContent='Opening passage…';api.scripture(ref).then(v=>{text.textContent=v.text||v.notice;if(v.text)details.append(el('p','credit',v.notice));details.append(external('Read at ESV.org ↗',v.link,'quiet'));}).catch(()=>{loaded=false;text.textContent='Passage unavailable.';});});box.append(details);}return box;}],
    ['Reflect',()=>{const box=el('div','reading');box.append(el('h2','','Consider'),el('p','','What does the surrounding passage reveal about its original audience and about God?'),el('p','','What would faithfulness look like in light of this passage today?'));return box;}]
  ];
  function select(i){for(const [j,b] of Array.from(tabs.children).entries())b.setAttribute('aria-pressed',String(i===j));panel.replaceChildren(options[i][1]());}
  options.forEach(([name],i)=>tabs.append(btn(name,()=>select(i),'tab')));s.append(tabs,panel);show(s);select(0);
}
function article(a){const b=external(a.title+' ↗',a.link,'article');b.append(el('span','meta',a.source+' · '+new Date(a.date).toLocaleString(undefined,{dateStyle:'medium',timeStyle:'short'})+(Number.isInteger(a.relevance)?' · '+['Low','Some','Relevant','Highly relevant'][a.relevance]:'')));return b;}
function section(title,items,empty){const d=el('div','section');d.append(el('h2','',title));if(!items.length)d.append(el('p','sub',empty));else for(const item of items)d.append(article(item));return d;}
function renderNews(){
  const s=scene('The world this morning','A little perspective.','A short briefing, not a complete picture of the world.');s.classList.add('news');
  const content=el('div','section','Checking sources and sorting headlines locally. You can skip this whenever you like.');s.append(content,actions(btn('Skip briefing',()=>go(5),'quiet')));show(s);
  briefingPromise??=api.briefing();briefingPromise.then(async data=>{
    if(!s.isConnected)return;content.remove();s.lastElementChild.remove();
    if(data.skipped){briefingShown=true;s.append(el('p','sub','The daily briefing has already been shown or is disabled.'));}
    else if(data.error){s.append(el('p','sub','Briefing unavailable. No conclusions can be drawn from this check.'));}
    else{
      if(data.mode==='ollama'){
        const counts=el('div','brief-counts');
        for(const [label,key,cls] of [['Positive','positive','positive'],['Negative','negative','negative'],['Neutral / unclear','neutral','neutral']]){
          const n=el('div','count '+cls);n.append(el('strong','',String((data.counts?.[key]||0)+(key==='neutral'?(data.counts?.unclear||0):0))),el('span','',label));counts.append(n);
        }
        s.append(counts,el('p','sub','Headline classifications only · '+(data.counts?.unclassified||0)+' candidates unclassified. Counts are not a safety assessment.'));
        const good=section('Good news',data.good,'No relevant positive headlines were selected.');good.classList.add('good-news');s.append(good);
        const bad=section('Concerns worth knowing',data.attention,'No sufficiently relevant negative headlines were selected. This is not a safety assessment.');bad.classList.add('bad-news');s.append(bad);
        if(data.other?.length){const other=el('details','more-news');other.append(el('summary','','Other relevant developments'));for(const item of data.other)other.append(article(item));s.append(other);}
        const all=el('details','more-news');all.append(el('summary','','Browse ranked headlines (optional)'));
        for(const [tone,label] of [['positive','Positive'],['negative','Negative'],['neutral','Neutral'],['unclear','Unclear']]){
          const items=(data.ranked||[]).filter(x=>x.tone===tone);if(items.length)all.append(section(label,items,''));
        }s.append(all);
      }else {s.append(el('p','sub','Ollama was disabled or unavailable. No classification is available.'));const raw=el('details','more-news');raw.append(el('summary','','Show unclassified headlines'));for(const a of data.unclassified||[])raw.append(article(a));s.append(raw);}
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
async function startSound(override=null){
  if(soundOn)return;const token=++soundToken;
  try{
    const settings=override||config,mode=settings.audio,built=mode==='hymns'?(selectedHymn??=BeStillMusic.resolve(mode)):BeStillMusic.resolve(mode);
    if(built){ctx=new AudioContext();await ctx.resume();if(token!==soundToken)return;const local=ctx,buffer=await BeStillMusic.render(built);if(token!==soundToken||ctx!==local)return;const source=ctx.createBufferSource();source.buffer=buffer;source.loop=true;padGain=ctx.createGain();padGain.gain.setValueAtTime(0,ctx.currentTime);padGain.gain.linearRampToValueAtTime(settings.volume/100,ctx.currentTime+1.2);source.connect(padGain).connect(ctx.destination);source.start();oscillators.push(source);const info=BeStillMusic.TRACKS[built];document.querySelector('#audio-credit').textContent=info.title+' · '+info.credit;}
    else if(mode==='file'){const track=await api.track();if(token!==soundToken)return;if(!track)throw Error('No audio file selected.');objectUrl=URL.createObjectURL(new Blob([new Uint8Array(track.bytes)],{type:track.mime}));audio=new Audio(objectUrl);audio.loop=true;audio.volume=settings.volume/100;await audio.play();}
    else{ctx=new AudioContext();await ctx.resume();if(token!==soundToken)return;padGain=ctx.createGain();padGain.gain.setValueAtTime(0,ctx.currentTime);padGain.gain.linearRampToValueAtTime(settings.volume/100*.055,ctx.currentTime+3);padGain.connect(ctx.destination);for(const freq of [130.81,196,261.63,329.63]){const o=ctx.createOscillator();o.type='sine';o.frequency.value=freq;const g=ctx.createGain();g.gain.value=.22;o.connect(g).connect(padGain);o.start();oscillators.push(o);}}
    if(token!==soundToken)return;soundOn=true;sound.textContent='Sound on';sound.setAttribute('aria-pressed','true');
  }catch{if(token===soundToken){stopSound();sound.textContent='Audio unavailable';}}
}
sound.addEventListener('click',()=>soundOn?stopSound():startSound());
back.addEventListener('click',()=>go(Math.max(0,step-1)));
document.querySelector('#settings').addEventListener('click',async()=>{
  cancelTimer();for(const k of ['name','seconds','audio','volume','region'])form.elements[k].value=config[k];for(const k of ['news','ai','fullscreen'])form.elements[k].checked=config[k];
  form.elements.esvKey.value='';document.querySelector('#esv-status').textContent=config.hasEsvKey?'A key is configured. Leave blank to keep it.':'No ESV key configured.';
  const feeds=document.querySelector('#feeds');feeds.replaceChildren();for(const f of session.feeds){const label=el('label','check'),input=el('input');input.type='checkbox';input.value=f.id;input.checked=config.feeds.includes(f.id);input.name='feed';label.append(input,document.createTextNode(f.name));feeds.append(label);}
  const select=form.elements.model;select.replaceChildren(new Option('Automatic (installed model)',''));if(config.model)select.add(new Option(config.model,config.model));select.value=config.model;
  document.querySelector('#track-status').textContent=config.track?'A local audio track is selected.':'No local track selected.';
  document.querySelector('#model-status').textContent='Checking local Ollama…';dialog.showModal();const installed=await api.models().catch(()=>[]);if(!dialog.open)return;for(const m of installed)if(!Array.from(select.options).some(o=>o.value===m))select.add(new Option(m,m));document.querySelector('#model-status').textContent=installed.length?installed.length+' installed local models found.':'Ollama is offline or no local models are installed.';
});
document.querySelector('#close-settings').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>{if(previewing){previewing=false;stopSound();if(config.audio!=='off')startSound();}schedule();});
document.querySelector('#preview-sound').addEventListener('click',()=>{stopSound();previewing=true;const mode=form.elements.audio.value;const credit=document.querySelector('#audio-credit');if(mode==='off'){credit.textContent='Silent.';return;}credit.textContent='Preparing local sound…';startSound({...config,audio:mode,volume:Number(form.elements.volume.value)});});
document.querySelector('#pick-track').addEventListener('click',async()=>{try{if(await api.chooseTrack()){config.track=true;document.querySelector('#track-status').textContent='Local track selected.';form.elements.audio.value='file';}}catch(e){document.querySelector('#track-status').textContent='Unable to select audio file.';}});
form.addEventListener('submit',async e=>{e.preventDefault();const f=form.elements,next={...config};for(const k of ['name','seconds','audio','volume','region','model'])next[k]=f[k].value;for(const k of ['news','ai','fullscreen'])next[k]=f[k].checked;next.feeds=Array.from(form.querySelectorAll('[name=feed]:checked')).map(i=>i.value);
  try{if(f.esvKey.value.trim()){await api.saveEsvKey(f.esvKey.value);next.hasEsvKey=true;versePromise=api.scripture(session.ritual.reference);f.esvKey.value='';}await api.save(next);config=next;briefingPromise=null;previewing=false;stopSound();if(config.audio!=='off')await startSound();dialog.close();render();}
  catch{document.querySelector('#settings-error').textContent='Preferences could not be saved.';}
});
document.querySelector('#quit').addEventListener('click',()=>{stopSound();api.finish();});
document.querySelector('#fullscreen').addEventListener('click',()=>api.fullscreen());
document.querySelector('#get-esv').addEventListener('click',()=>api.open('https://api.esv.org/'));
async function init(){try{session=await api.session();config=session.config;briefingShown=config.lastBriefing===session.today;versePromise=api.scripture(session.ritual.reference);render();api.smokeReady().catch(()=>{});if(config.audio!=='off')startSound();}catch{show(scene('','Be Still could not start.','Close the application and try again.'));}}
init();
