// Adapted from OpenBible.info, CC BY (2016-02-01 dataset). Ranked by source votes; not an interpretation.
const data=require('./crossrefs.json');
function crossrefs(ref){return Object.hasOwn(data,ref)?data[ref]:[];}
module.exports={crossrefs,source:'https://www.openbible.info/labs/cross-references/'};
