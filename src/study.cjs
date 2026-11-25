const data=require('./study/henry.json');
function commentary(reference){
 if(typeof reference!=='string'||!Object.hasOwn(data.entries,reference))return null;
 return {title:data.title,author:data.author,license:data.license,...data.entries[reference]};
}
module.exports={commentary};
