/* Original procedural soundscapes. No recordings, samples, or network access. */
(function(root){
'use strict';
const SCAPES={
 'rain':{title:'Rain on the window',kind:'rain'},
 'creek':{title:'A woodland creek',kind:'creek'},
 'ocean':{title:'Gentle ocean waves',kind:'ocean'},
 'woodland':{title:'Early woodland',kind:'woodland'},
 'wind':{title:'Wind through leaves',kind:'wind'},
 'thunder':{title:'Rain with distant thunder',kind:'thunder'},
 'brown-noise':{title:'Soft brown noise',kind:'brown'}
};
const TAU=2*Math.PI;
function rng(seed){let x=seed>>>0;return ()=>{x=(Math.imul(1664525,x)+1013904223)>>>0;return x/4294967296;};}
function samples(id,rate=22050,seconds=32,seed=2026){
 const kind=SCAPES[id]?.kind;if(!kind)throw new Error('Unknown soundscape');
 if(!Number.isInteger(rate)||rate<8000||rate>48000||!Number.isFinite(seconds)||seconds<2||seconds>60)throw new Error('Invalid audio length');
 const length=Math.round(rate*seconds),channels=[new Float32Array(length),new Float32Array(length)];
 for(let ch=0;ch<2;ch++){
  const random=rng(seed+ch*997),a=channels[ch];let slow=0,mid=0,fast=0,drop=0,birdPhase=0;
  const pulse=(t,center,width)=>Math.exp(-Math.pow((t-center)/width,2));
  for(let i=0;i<length;i++){
   const t=i/rate,n=random()*2-1;
   slow+=.002*(n-slow);mid+=.035*(n-mid);fast+=.22*(n-fast);
   if(random()<.0008)drop+=(random()-.5)*.35;drop*=.993;
   const breeze=.7+.2*Math.sin(TAU*t/11+ch*.22)+.1*Math.sin(TAU*t/5.7),wave=.32+.68*Math.pow(.5+.5*Math.sin(TAU*t/7.8+ch*.1),2);
   let y=0;
   if(kind==='rain'||kind==='thunder'){y=(fast*.22+mid*.35+drop*.12)*breeze;if(kind==='thunder')y+=slow*1.3*(pulse(t,10,2.5)+pulse(t,24,3));}
   else if(kind==='creek'){y=(mid*.46+(fast-mid)*.19+drop*.22)*(.8+.17*Math.sin(TAU*t/3.2+ch));}
   else if(kind==='ocean'){y=(slow*1.3+mid*.42+fast*.1)*wave;}
   else if(kind==='wind'){y=(slow*1.45+mid*.2)*breeze;}
   else if(kind==='brown'){y=slow*2.2+mid*.07;}
   else if(kind==='woodland'){y=(mid*.25+slow*.65)*breeze;
    const chirp=pulse(t,5.2+ch*.45,.12)+pulse(t,5.65+ch*.45,.1)+pulse(t,16.1-ch*.3,.18)+pulse(t,24.8+ch*.2,.12);
    birdPhase+=TAU*(1900+450*Math.sin(TAU*t*3))/rate;y+=.023*chirp*Math.sin(birdPhase);}
   a[i]=Math.tanh(y)*.72;
  }
  // Crossfade the tail into the beginning, then play the overlapped loop.
  const overlap=Math.min(Math.round(rate*.9),Math.floor(length/5));
  for(let i=0;i<overlap;i++){const k=i/(overlap-1);a[i]=a[length-overlap+i]*(1-k)+a[i]*k;}
  channels[ch]=a.slice(0,length-overlap);
 }
 return channels;
}
function render(ctx,id,seed=2026){const data=samples(id,Math.min(22050,ctx.sampleRate),32,seed),buffer=ctx.createBuffer(2,data[0].length,Math.min(22050,ctx.sampleRate));for(let i=0;i<2;i++)buffer.copyToChannel(data[i],i);return buffer;}
const api={SCAPES,samples,render};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.BeStillSoundscapes=api;
})(typeof window!=='undefined'?window:globalThis);
