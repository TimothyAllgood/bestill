// Protestant 66-book canon used by the ESV. Chapter counts are metadata, not Bible text.
const books=[
 [
  "Genesis",
  50,
  "genesis-1-11|genesis-12-50",
  11,
  "1:26-27,2:15,12:1-3,50:20"
 ],
 [
  "Exodus",
  40,
  "exodus-1-18|exodus-19-40",
  18,
  "14:13-14,20:8-11,33:14,34:6-7"
 ],
 [
  "Leviticus",
  27,
  "leviticus",
  0,
  "19:9-10,19:18"
 ],
 [
  "Numbers",
  36,
  "numbers",
  0,
  "6:24-26,23:19"
 ],
 [
  "Deuteronomy",
  34,
  "deuteronomy",
  0,
  "6:4-7,8:17-18,10:12-13,31:8"
 ],
 [
  "Joshua",
  24,
  "joshua",
  0,
  "1:8-9,24:15"
 ],
 [
  "Judges",
  21,
  "judges",
  0,
  "6:12-16,7:2"
 ],
 [
  "Ruth",
  4,
  "ruth",
  0,
  "1:16-17,2:12"
 ],
 [
  "1 Samuel",
  31,
  "1-samuel",
  0,
  "2:1-2,16:7"
 ],
 [
  "2 Samuel",
  24,
  "2-samuel",
  0,
  "7:22,22:31"
 ],
 [
  "1 Kings",
  22,
  "kings",
  0,
  "3:9,19:11-13"
 ],
 [
  "2 Kings",
  25,
  "kings",
  0,
  "5:13-14,6:16-17"
 ],
 [
  "1 Chronicles",
  29,
  "chronicles",
  0,
  "16:8-11,29:11-13"
 ],
 [
  "2 Chronicles",
  36,
  "chronicles",
  0,
  "15:7,20:12"
 ],
 [
  "Ezra",
  10,
  "ezra-nehemiah",
  0,
  "3:11,7:10"
 ],
 [
  "Nehemiah",
  13,
  "ezra-nehemiah",
  0,
  "4:14,8:10"
 ],
 [
  "Esther",
  10,
  "esther",
  0,
  "4:14-16,9:22"
 ],
 [
  "Job",
  42,
  "job",
  0,
  "1:20-21,19:25-27,42:2-3"
 ],
 [
  "Psalm",
  150,
  "psalms",
  0,
  "1:1-3,8:3-4,16:11,19:1,27:1,37:3-5,51:10,62:5-8,90:12,100:1-5,103:1-5,127:1-2,139:23-24,145:8-9"
 ],
 [
  "Proverbs",
  31,
  "proverbs",
  0,
  "4:23,11:25,15:1,16:3,17:17,19:17,27:17"
 ],
 [
  "Ecclesiastes",
  12,
  "ecclesiastes",
  0,
  "3:1-8,4:9-10,5:18-19,12:13"
 ],
 [
  "Song of Solomon",
  8,
  "song-songs",
  0,
  "2:10-12,8:6-7"
 ],
 [
  "Isaiah",
  66,
  "isaiah-1-39|isaiah-40-66",
  39,
  "12:2,26:3-4,40:28-31,43:1-2,55:8-9,58:10-11"
 ],
 [
  "Jeremiah",
  52,
  "jeremiah",
  0,
  "9:23-24,17:7-8,29:7,31:3"
 ],
 [
  "Lamentations",
  5,
  "lamentations",
  0,
  "3:25-26,3:40-41"
 ],
 [
  "Ezekiel",
  48,
  "ezekiel-1-33|ezekiel-34-48",
  33,
  "18:31-32,36:26-27"
 ],
 [
  "Daniel",
  12,
  "daniel",
  0,
  "2:20-22,6:10"
 ],
 [
  "Hosea",
  14,
  "hosea",
  0,
  "6:6,14:4"
 ],
 [
  "Joel",
  3,
  "joel",
  0,
  "2:12-13,2:28-29"
 ],
 [
  "Amos",
  9,
  "amos",
  0,
  "5:14-15,5:24"
 ],
 [
  "Obadiah",
  1,
  "obadiah",
  0,
  "1:3-4,1:15"
 ],
 [
  "Jonah",
  4,
  "jonah",
  0,
  "2:2,4:10-11"
 ],
 [
  "Micah",
  7,
  "micah",
  0,
  "6:8,7:18-19"
 ],
 [
  "Nahum",
  3,
  "nahum",
  0,
  "1:7,1:15"
 ],
 [
  "Habakkuk",
  3,
  "habakkuk",
  0,
  "2:4,3:17-19"
 ],
 [
  "Zephaniah",
  3,
  "zephaniah",
  0,
  "2:3,3:17"
 ],
 [
  "Haggai",
  2,
  "haggai",
  0,
  "1:7,2:4-5"
 ],
 [
  "Zechariah",
  14,
  "zechariah",
  0,
  "4:6,7:9-10"
 ],
 [
  "Malachi",
  4,
  "malachi",
  0,
  "3:16-17,4:2"
 ],
 [
  "Matthew",
  28,
  "matthew-1-13|matthew-14-28",
  13,
  "5:3-10,5:14-16,5:44-45,6:9-13,7:12,22:37-39,28:19-20"
 ],
 [
  "Mark",
  16,
  "mark",
  0,
  "6:31,9:35,10:45,12:30-31"
 ],
 [
  "Luke",
  24,
  "luke-1-9|luke-10-24",
  9,
  "1:46-49,6:31,10:41-42,12:15,15:20,17:15-19"
 ],
 [
  "John",
  21,
  "john-1-12|john-13-21",
  12,
  "1:1-5,10:11,13:34-35,15:4-5,16:33,20:29"
 ],
 [
  "Acts",
  28,
  "acts-1-12|acts-13-28",
  12,
  "2:42-47,4:32,17:24-28,20:35"
 ],
 [
  "Romans",
  16,
  "romans-1-4|romans-5-16",
  4,
  "5:1-5,8:28,8:38-39,12:1-2,15:13"
 ],
 [
  "1 Corinthians",
  16,
  "1-corinthians",
  0,
  "10:31,13:4-7,15:58"
 ],
 [
  "2 Corinthians",
  13,
  "2-corinthians",
  0,
  "1:3-4,4:16-18,9:6-8,12:9"
 ],
 [
  "Galatians",
  6,
  "galatians",
  0,
  "5:13-14,5:22-23,6:9-10"
 ],
 [
  "Ephesians",
  6,
  "ephesians",
  0,
  "2:8-10,3:16-19,4:29-32,5:15-16,6:10-11"
 ],
 [
  "Philippians",
  4,
  "philippians",
  0,
  "1:6,2:3-4,3:13-14,4:8,4:11-13"
 ],
 [
  "Colossians",
  4,
  "colossians",
  0,
  "1:15-17,3:15-16,3:23-24"
 ],
 [
  "1 Thessalonians",
  5,
  "1-thessalonians",
  0,
  "4:11-12,5:11"
 ],
 [
  "2 Thessalonians",
  3,
  "2-thessalonians",
  0,
  "2:16-17,3:13,3:16"
 ],
 [
  "1 Timothy",
  6,
  "1-timothy",
  0,
  "4:12,6:6-8,6:17-19"
 ],
 [
  "2 Timothy",
  4,
  "2-timothy",
  0,
  "2:15,3:16-17,4:7"
 ],
 [
  "Titus",
  3,
  "titus",
  0,
  "2:11-14,3:4-7"
 ],
 [
  "Philemon",
  1,
  "philemon",
  0,
  "1:4-7,1:15-16"
 ],
 [
  "Hebrews",
  13,
  "hebrews",
  0,
  "4:14-16,10:24-25,11:1,13:5-6,13:16"
 ],
 [
  "James",
  5,
  "james",
  0,
  "1:2-4,1:22,2:14-17,3:17-18,4:13-15,5:16"
 ],
 [
  "1 Peter",
  5,
  "1-peter",
  0,
  "1:3-5,2:9,3:8-9,4:8-10"
 ],
 [
  "2 Peter",
  3,
  "2-peter",
  0,
  "1:5-8,3:9"
 ],
 [
  "1 John",
  5,
  "1-3-john",
  0,
  "1:9,3:18,4:7-12,4:18-19"
 ],
 [
  "2 John",
  1,
  "1-3-john",
  0,
  "1:5-6,1:8"
 ],
 [
  "3 John",
  1,
  "1-3-john",
  0,
  "1:4,1:11"
 ],
 [
  "Jude",
  1,
  "jude",
  0,
  "1:20-21,1:24-25"
 ],
 [
  "Revelation",
  22,
  "revelation-1-11|revelation-12-22",
  11,
  "1:8,3:20,21:3-5,22:1-5"
 ]
];
const chapters=books.flatMap(([book,count])=>Array.from({length:count},(_,i)=>book+' '+(i+1)));
const additional={
  "Genesis": "1:31,2:2-3,9:12-16,18:14,24:27,28:15,39:2-3",
  "Exodus": "3:11-12,15:2,16:4,23:12,35:21",
  "Leviticus": "19:32-34,25:35-37",
  "Numbers": "11:16-17,14:18",
  "Deuteronomy": "4:29,15:7-8,30:19-20,33:27",
  "Joshua": "21:45,23:14",
  "Judges": "5:31,13:24-25",
  "Ruth": "2:20,4:14-15",
  "1 Samuel": "3:9-10,12:24,17:45-47",
  "2 Samuel": "9:7,22:2-4",
  "1 Kings": "8:56-58,17:14-16",
  "2 Kings": "4:42-44,20:5",
  "1 Chronicles": "16:23-24,28:20",
  "2 Chronicles": "7:14,16:9",
  "Ezra": "8:22-23",
  "Nehemiah": "1:5-6,9:17",
  "Esther": "4:16",
  "Job": "12:7-10,28:28,37:14",
  "Psalm": "4:8,9:9-10,18:1-2,24:1-2,28:7,31:14-15,33:4-5,34:18,40:1-3,42:11,63:1-4,65:9-13,73:25-26,84:10-12,86:5,92:1-2,95:1-3,96:11-12,104:24,107:1,112:7,116:12-14,119:105,126:5-6,130:5-6,133:1,136:1,143:8,147:3,150:6",
  "Proverbs": "3:7-8,10:12,12:25,14:29,16:9,18:10,20:22,21:3,22:6,24:16,25:11,31:25-26",
  "Ecclesiastes": "2:24-25,3:11,7:8-9,9:7-9,11:6",
  "Song of Solomon": "2:16,4:7",
  "Isaiah": "30:15,32:17,35:3-4,44:22,46:4,49:15-16,52:7,54:10,61:1-3",
  "Jeremiah": "6:16,10:23,31:25,32:17",
  "Lamentations": "3:31-33,3:57",
  "Ezekiel": "11:19-20,34:15-16",
  "Daniel": "3:17-18,9:18",
  "Hosea": "10:12,11:4",
  "Joel": "2:21-23",
  "Amos": "4:13",
  "Obadiah": "1:17",
  "Jonah": "2:9",
  "Micah": "4:3-4",
  "Nahum": "1:3",
  "Habakkuk": "2:14",
  "Zephaniah": "3:14-15",
  "Haggai": "2:9",
  "Zechariah": "8:16-17,9:9",
  "Malachi": "3:10,4:6",
  "Matthew": "4:4,5:9,5:16,6:21,6:26,7:24-25,9:36,10:29-31,12:20,18:20,20:26-28,25:35-36",
  "Mark": "4:39-40,5:36,8:34-35,9:24,10:14-16",
  "Luke": "2:10-14,5:16,6:36,8:15,11:9-10,12:32,18:16-17,24:30-32",
  "John": "3:16-17,4:14,6:35,8:12,10:27-28,11:25-26,14:6,15:9-12,17:20-23",
  "Acts": "3:19-20,9:31,10:34-35,16:25,28:30-31",
  "Romans": "3:23-24,6:4,8:1,8:26,12:9-10,12:15,14:17-19",
  "1 Corinthians": "1:9,3:6-7,10:13,12:12-13,13:13,16:13-14",
  "2 Corinthians": "3:17-18,5:7,5:17,8:9,13:11",
  "Galatians": "2:20,3:28,5:1,6:2",
  "Ephesians": "1:3,2:14,4:1-3,4:15,5:1-2,6:18",
  "Philippians": "1:9-11,2:14-15,4:19",
  "Colossians": "1:9-12,2:6-7,3:2-3,4:5-6",
  "1 Thessalonians": "1:2-3,3:12-13,5:8,5:23-24",
  "2 Thessalonians": "1:11-12,3:5",
  "1 Timothy": "1:15-16,2:1-2,4:7-8,6:11-12",
  "2 Timothy": "1:9,2:22,3:14-15",
  "Titus": "1:2,3:8",
  "Philemon": "1:20-21",
  "Hebrews": "1:1-3,2:18,6:19,10:23,12:14,13:1-2",
  "James": "1:17,2:8,3:13,4:8,5:13",
  "1 Peter": "1:22,2:24,3:15,5:10",
  "2 Peter": "1:3-4,3:18",
  "1 John": "2:1-2,3:1,4:16,5:14-15",
  "2 John": "1:3",
  "3 John": "1:2",
  "Jude": "1:22-23",
  "Revelation": "3:8,5:13,7:16-17,14:13,22:20"
};
const shortReadings=[...new Set(books.flatMap(([book,,,,refs])=>[refs,additional[book]].filter(Boolean).join(',').split(',').map(ref=>book+' '+ref)))];
function bookFor(ref){return typeof ref==='string'?books.find(b=>ref===b[0]||ref.startsWith(b[0]+' ')):undefined;}
function chapterFor(ref){const book=bookFor(ref);if(!book)return null;const n=Number(ref.slice(book[0].length+1).split(':')[0]);return Number.isInteger(n)&&n>=1&&n<=book[1]?book[0]+' '+n:null;}
function chapterReading(ref){return [ref,ref,null,[]];}
function shortReading(ref){return [ref,chapterFor(ref),null,[]];}
module.exports={books,chapters,shortReadings,bookFor,chapterFor,chapterReading,shortReading};
