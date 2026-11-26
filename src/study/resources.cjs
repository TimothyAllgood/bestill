// Curated official BibleProject video pages. No video bytes or transcripts stored.
const base='https://bibleproject.com/videos/';
const books={
 Psalm:['Psalms','psalms'],Proverbs:['Proverbs','proverbs'],Matthew:['Matthew 1–13','matthew-1-13'],Philippians:['Philippians','philippians'],Isaiah:['Isaiah 40–66','isaiah-40-66'],'1 Peter':['1 Peter','1-peter'],James:['James','james'],John:['John 13–21','john-13-21'],Romans:['Romans 5–16','romans-5-16'],Colossians:['Colossians','colossians'],'2 Timothy':['2 Timothy','2-timothy'],Lamentations:['Lamentations','lamentations'],Hebrews:['Hebrews','hebrews'],'1 Thessalonians':['1 Thessalonians','1-thessalonians']
};
const special={'Matthew 6:34':['Wealth and Worry','wealth-and-worry','Passage study · Matthew 6:19–34']};
function resources(reference){
 const book=typeof reference==='string'?reference.replace(/ \d+:.*$/,''):'';
 const v=Object.hasOwn(special,reference)?special[reference]:Object.hasOwn(books,book)?books[book]:null;
 return {video:v?{title:v[0],url:base+v[1]+'/',scope:v[2]||'Book overview · broader context'}:null,
 net:'https://netbible.org/',tgc:'https://www.thegospelcoalition.org/commentary/',bibleProject:'https://bibleproject.com/'};
}
module.exports={resources};
