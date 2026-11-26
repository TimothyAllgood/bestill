const data=require('./study/henry.json');
const {resources}=require('./study/resources.cjs');
function commentary(reference){
 if(typeof reference!=='string'||!Object.hasOwn(data.entries,reference))return null;
 return {title:data.title,author:data.author,license:data.license,...data.entries[reference]};
}
module.exports={commentary,resources};
