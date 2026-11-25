/* Public-domain melodies; original synthesis and accompaniment. No recorded samples. */
(function(root){
'use strict';
const n=(pitch,beats=1)=>[pitch,beats];
const line=pitches=>pitches.map((pitch,i)=>n(pitch,i===pitches.length-1?2:1));
const TRACKS={
'amazing-grace':{title:'Amazing Grace',credit:'NEW BRITAIN · traditional American tune, 19th century',tempo:62,root:55,notes:[n(62),n(67,2),n(71,.5),n(67,.5),n(71,2),n(69),n(67,2),n(64),n(62,2),n(62),n(67,2),n(71,.5),n(67,.5),n(71,2),n(69),n(74,5),n(71),n(74,2),n(71,.5),n(67,.5),n(71,2),n(69),n(67,2),n(64),n(62,2),n(62),n(67,2),n(71,.5),n(67,.5),n(71,2),n(69),n(67,4)]},
'doxology':{title:'Doxology',credit:'OLD HUNDREDTH · Genevan Psalter, 1551; attributed to Louis Bourgeois',tempo:64,root:55,notes:[...line([67,67,66,64,62,67,69,71]),...line([71,71,71,69,67,72,71,69]),...line([67,69,71,69,67,64,66,67]),...line([74,71,67,69,72,71,69,67])]},
'abide':{title:'Abide with Me',credit:'EVENTIDE · William Henry Monk, 1861',tempo:63,root:51,notes:[n(67,2),n(67),n(65),n(63,2),n(70,2),n(72),n(70),n(70),n(68),n(67,4),n(67,2),n(68),n(70),n(72,2),n(70,2),n(68),n(65),n(67),n(69),n(70,4),n(67,2),n(67),n(65),n(63,2),n(70,2),n(70),n(68),n(68),n(67),n(65,4),n(65,2),n(67),n(68),n(67),n(65),n(63),n(68),n(67,2),n(65,2),n(63,4)]},
'morning-light':{title:'Morning Light',credit:'Original Be Still ambient arrangement',tempo:55,root:48,notes:[n(67,4),n(72,4),n(76,5),n(74,3),n(69,4),n(65,4),n(67,6),n(72,6)],chords:[[48,55,64],[45,52,60],[41,48,57],[43,50,59],[48,55,64],[45,52,60],[41,48,57],[48,55,64]]},
'quiet-waters':{title:'Quiet Waters',credit:'Original Be Still ambient arrangement',tempo:48,root:50,notes:[n(66,5),n(69,5),n(74,6),n(69,4),n(64,5),n(66,5),n(69,6),n(62,6)],chords:[[50,57,66],[47,54,62],[43,50,62],[45,52,61],[50,57,66],[47,54,62],[43,50,59],[50,57,66]]}
};
const hymns=['amazing-grace','doxology','abide'],lead=1.5,tail=3.5;
function resolve(mode,random=Math.random){return mode==='hymns'?hymns[Math.min(hymns.length-1,Math.floor(random()*hymns.length))]:Object.hasOwn(TRACKS,mode)?mode:null;}
function duration(t){return t.notes.reduce((s,n)=>s+n[1]*60/t.tempo,lead)+tail;}
const hz=p=>440*Math.pow(2,(p-69)/12);
function voice(ctx,out,pitch,start,length,volume,pad=false){
 const attack=pad?Math.min(.9,length*.25):.035,release=pad?1.1:Math.min(.6,length*.35),end=start+length+release;
 const envelope=ctx.createGain();envelope.gain.setValueAtTime(0,start);envelope.gain.linearRampToValueAtTime(volume,start+attack);envelope.gain.exponentialRampToValueAtTime(Math.max(.00001,volume*(pad?.75:.35)),start+length*.75);envelope.gain.linearRampToValueAtTime(0,end);envelope.connect(out);
 for(const [multiple,amp] of (pad?[[1,.9],[2,.08]]:[[1,.82],[2,.12],[3,.035]])){const osc=ctx.createOscillator(),gain=ctx.createGain();osc.type='sine';osc.frequency.value=hz(pitch)*multiple;gain.gain.value=amp;osc.connect(gain).connect(envelope);osc.start(start);osc.stop(end+.02);}
}
async function render(id){
 const track=TRACKS[id];if(!track)throw new Error('Unknown sound');const rate=22050,ctx=new OfflineAudioContext(1,Math.ceil(duration(track)*rate),rate),out=ctx.createGain();out.gain.value=.62;out.connect(ctx.destination);const beat=60/track.tempo;let t=lead;
 track.notes.forEach(([pitch,beats],i)=>{const len=beats*beat;voice(ctx,out,pitch,t,len*.88,.09,Boolean(track.chords));if(track.chords){for(const note of track.chords[i])voice(ctx,out,note,t,len*.97,.025,true);}else if(i%4===0){voice(ctx,out,track.root,t,Math.min(beat*3,len+beat),.028,true);voice(ctx,out,track.root+7,t,Math.min(beat*3,len+beat),.014,true);}t+=len;});return ctx.startRendering();
}
const library={TRACKS,resolve,duration,render};
if(typeof module!=='undefined'&&module.exports)module.exports=library;else root.BeStillMusic=library;
})(typeof window!=='undefined'?window:globalThis);
