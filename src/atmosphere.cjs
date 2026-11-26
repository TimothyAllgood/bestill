// Session-only aesthetic choice. No personal data or network access.
const atmospheres=['woodland','dawn','rain','ember','night'];
function atmosphere(random=Math.random,mode='rotate'){return mode==='still'?'woodland':atmospheres[Math.min(atmospheres.length-1,Math.max(0,Math.floor(random()*atmospheres.length)))];}
module.exports={atmospheres,atmosphere};
