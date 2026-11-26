/* Local audio only. Conservative peak/RMS leveling for generated buffers.
 * Do not analyze or process third-party streaming services. */
(function(root){
 const finite=(n,fallback)=>Number.isFinite(n)?n:fallback;
 function gainFor(channels){
  let peak=0,sum=0,count=0;
  for(const channel of channels)for(let i=0;i<channel.length;i+=8){const x=finite(channel[i],0);peak=Math.max(peak,Math.abs(x));sum+=x*x;count++;}
  const rms=Math.sqrt(sum/Math.max(1,count));
  if(rms<.0001)return 1;
  return Math.min(2.5,.045/rms,.65/Math.max(peak,.0001));
 }
 function bufferGain(buffer){return gainFor(Array.from({length:buffer.numberOfChannels},(_,i)=>buffer.getChannelData(i)));}
 function volume(value){return Math.max(0,Math.min(1,finite(Number(value),0)/100));}
 function output(ctx,source,level,fade=1.8,adjustment=1){
  const trim=ctx.createGain(),compressor=ctx.createDynamicsCompressor(),gain=ctx.createGain();
  trim.gain.value=adjustment;
  compressor.threshold.value=-20;compressor.knee.value=20;compressor.ratio.value=3;compressor.attack.value=.025;compressor.release.value=.3;
  gain.gain.setValueAtTime(0,ctx.currentTime);gain.gain.linearRampToValueAtTime(volume(level),ctx.currentTime+fade);
  source.connect(trim).connect(compressor).connect(gain).connect(ctx.destination);return gain;
 }
 function fadeOut(ctx,gain,seconds=.35){
  if(!ctx||!gain||ctx.state!=='running')return false;
  try{const param=gain.gain,now=ctx.currentTime;if(typeof param.cancelAndHoldAtTime==='function')param.cancelAndHoldAtTime(now);else{const current=param.value;param.cancelScheduledValues(now);param.setValueAtTime(current,now);}param.linearRampToValueAtTime(0,now+seconds);return true;}catch{return false;}
 }
 const api={gainFor,bufferGain,volume,output,fadeOut};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.BeStillAudioLevel=api;
})(typeof window!=='undefined'?window:globalThis);
