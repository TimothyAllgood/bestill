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
  },
  "recorded-eventide": {
    "title": "Abide with Me · solo organ",
    "file": "Eventide.ogg",
    "author": "The Uninvited Co., Inc.",
    "license": "CC BY-SA 2.5",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.5/",
    "sha1": "45ab70939b07579384a1ab72274bc73d3a05eb4b",
    "bytes": 972515
  },
  "recorded-birdsong": {
    "title": "Morning birdsong · 7 minutes",
    "file": "Birdsong_morning_01.ogg",
    "author": "Martin Thurnherr",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "sha1": "2de25a648adb37560eb45c4a86c7ba8a65e509a0",
    "bytes": 4544824
  },
  "recorded-dawn": {
    "title": "Dorset dawn chorus · 50 minutes",
    "file": "Dawnchorus-uk.ogg",
    "author": "Silas S. Brown",
    "license": "Public domain (creator dedication)",
    "licenseUrl": "https://commons.wikimedia.org/wiki/File:Dawnchorus-uk.ogg",
    "sha1": "07b58fc469c4faee4a27eb7d9770d75c9bed8d1c",
    "bytes": 19394381
  },
  "recorded-satie": {
    "title": "Gymnopédie No. 1 · acoustic piano",
    "file": "Erik_Satie_-_gymnopedies_-_la_1_ere._lent_et_douloureux.ogg",
    "author": "Robin Alciatore / Musopen",
    "license": "Public domain (creator dedication)",
    "licenseUrl": "https://commons.wikimedia.org/wiki/File:Erik_Satie_-_gymnopedies_-_la_1_ere._lent_et_douloureux.ogg",
    "sha1": "96b2343c81047abd9723488d8540b5a2af688233",
    "bytes": 3696351
  },
  "recorded-nocturne": {
    "title": "Chopin · Nocturne Op. 9 No. 2",
    "file": "Chopin_Nocturne_No._2_in_E_Flat_Major,_Op._9.ogg",
    "author": "Peter Johnston / Musopen",
    "license": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "sha1": "2c27d9180690551cb8c4e05a5b69a92026f6fff9",
    "bytes": 2193822
  },
  "recorded-nocturne55": {
    "title": "Chopin · Nocturne Op. 55 No. 1",
    "file": "Chopin_-_Nocturne-op-55-no-1.ogg",
    "author": "Luke Faulkner / Musopen",
    "license": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "sha1": "0ad99063b4d2cc36982d7b945a78740ccabd4335",
    "bytes": 3648933
  }
};
function getRecording(id){if(!Object.hasOwn(catalog,id))return null;const x=catalog[id],h=createHash('md5').update(x.file).digest('hex');return {...x,id,source:'https://commons.wikimedia.org/wiki/File:'+x.file,url:'https://upload.wikimedia.org/wikipedia/commons/'+h[0]+'/'+h.slice(0,2)+'/'+encodeURIComponent(x.file)};}
function validRecording(id,bytes){const x=getRecording(id);return !!x&&Buffer.isBuffer(bytes)&&bytes.length===x.bytes&&bytes.subarray(0,4).toString()==='OggS'&&createHash('sha1').update(bytes).digest('hex')===x.sha1;}
module.exports={catalog,getRecording,validRecording};
