// Fixed, explicitly opted-in recordings. Original bytes, no alterations.
const {createHash}=require('node:crypto');
const catalog={
  "recorded-stream": {
    "title": "Forest creek · field recording",
    "file": "Swale.ogg",
    "author": "Siddharth Patil (Ksd5)",
    "license": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "sha1": "4f97748c715d90fda6357073f14a12e68f294d73",
    "bytes": 1092440
  },
  "recorded-rain": {
    "title": "Rain and thunder · field recording",
    "file": "Rain_and_thunder.ogg",
    "author": "Caesar",
    "license": "Public domain (creator dedication)",
    "licenseUrl": "https://commons.wikimedia.org/wiki/File:Rain_and_thunder.ogg",
    "sha1": "5cee3290a09118a6d2fcdcbaa17f451f9ec09499",
    "bytes": 226945
  },
  "recorded-organ": {
    "title": "Amazing Grace · solo organ recording",
    "file": "Amazing_Grace-organ.ogg",
    "author": "The Uninvited Co., Inc.",
    "license": "CC BY-SA 2.5",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.5/",
    "sha1": "d4a279ec53ba3cc4b66fad0fb1046a6f39b2a7e3",
    "bytes": 671309
  },
  "recorded-long-creek": {
    "title": "Forest Lawn Creek · 7-minute recording",
    "file": "Forest_lawn_creek.ogg",
    "author": "Dsw4",
    "license": "Public domain (creator dedication)",
    "licenseUrl": "https://commons.wikimedia.org/wiki/File:Forest_lawn_creek.ogg",
    "sha1": "1fe5871f63cd7737d992d1afaee348f9504facba",
    "bytes": 19189608
  }
};
function getRecording(id){if(!Object.hasOwn(catalog,id))return null;const x=catalog[id],h=createHash('md5').update(x.file).digest('hex');return {...x,id,source:'https://commons.wikimedia.org/wiki/File:'+x.file,url:'https://upload.wikimedia.org/wikipedia/commons/'+h[0]+'/'+h.slice(0,2)+'/'+encodeURIComponent(x.file)};}
function validRecording(id,bytes){const x=getRecording(id);return !!x&&Buffer.isBuffer(bytes)&&bytes.length===x.bytes&&bytes.subarray(0,4).toString()==='OggS'&&createHash('sha1').update(bytes).digest('hex')===x.sha1;}
module.exports={catalog,getRecording,validRecording};
