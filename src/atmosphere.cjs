// Session-only aesthetic choice. No personal data or network access.
const atmospheres=['woodland','dawn','rain','ember','night'];
function seasonalPalette(date){const month=date.getMonth();return month===11||month<2?['night','rain','woodland']:month<5?['woodland','rain','dawn']:month<8?['woodland','dawn','rain']:['ember','dawn','woodland'];}
function atmosphere(random=Math.random,mode='rotate',date=new Date()){if(mode==='still')return 'woodland';const pool=mode==='seasonal'?seasonalPalette(date):atmospheres;return pool[Math.min(pool.length-1,Math.max(0,Math.floor(random()*pool.length)))];}
module.exports={atmospheres,atmosphere,seasonalPalette};
