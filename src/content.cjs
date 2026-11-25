// Original reflection prompts; Scripture is fetched from Crossway, never generated.
const arrivals = [
  'You do not have to carry tomorrow today.',
  'There is time to be still before the day begins.',
  'You are here. Let this moment be enough.',
  'Begin with gratitude, not with the things you cannot control.',
  'The world can wait for a moment.',
  'You do not have to have every answer this morning.',
  'Let the first moments of today belong to God.',
  'There is more to life than what you accomplish today.',
  'Make room for peace before making room for plans.',
  'You can meet this day one moment at a time.',
  'Before you look outward, take a moment to look toward God.',
  'Let today be a day of faithfulness, not fear.'
];
const prayers = [
  'What uncertainty are you trying to carry alone?',
  'Who in your life could use your prayers today?',
  'Where do you need wisdom rather than certainty?',
  'What is one fear you can bring honestly before God?',
  'Where could you show patience and kindness today?',
  'What responsibility would you like to approach with faith?',
  'What do you need to ask forgiveness for?',
  'What would it mean to trust God with the things outside your control?',
  'Who could you serve without expecting anything in return?',
  'Where do you need courage to do the next right thing?'
];
const gratitude = [
  'What do you have today that you once hoped for?',
  'Who makes your life richer just by being in it?',
  'What ordinary comfort might you be overlooking?',
  'What is one ability you are grateful to have?',
  'What small joy from yesterday deserves remembering?',
  'What part of creation brings you delight?',
  'What has someone done for you that you could thank them for?',
  'What opportunity do you have to love someone today?',
  'What is good in your life even while other things remain uncertain?',
  'What is something you can enjoy without needing to achieve anything?'
];
const endings = [
  'Love the people in front of you. Do the work before you.',
  'Be faithful in the small things today.',
  'Carry gratitude with you. Leave room for joy.',
  'You can take the next step without knowing the whole road.',
  'Go in peace. Make time for what matters.'
];
// Reference, surrounding passage, human-written study URL, suggested related readings.
// Related readings are editorial suggestions, not an exhaustive cross-reference system.
const passages = [
  ['Psalm 46:10','Psalm 46','https://www.bibleref.com/Psalms/46/Psalm-46-10.html',['Psalm 46:1','Exodus 14:14']],
  ['Psalm 56:3','Psalm 56','https://www.bibleref.com/Psalms/56/Psalm-56-3.html',['Psalm 27:1','Psalm 56:4']],
  ['Matthew 6:34','Matthew 6:25-34','https://www.bibleref.com/Matthew/6/Matthew-6-34.html',['Matthew 6:33','Philippians 4:6-7']],
  ['Philippians 4:6','Philippians 4:4-9','https://www.bibleref.com/Philippians/4/Philippians-4-6.html',['Philippians 4:7','1 Thessalonians 5:16-18']],
  ['Isaiah 41:10','Isaiah 41:8-13','https://www.bibleref.com/Isaiah/41/Isaiah-41-10.html',['Isaiah 43:1-2','Deuteronomy 31:8']],
  ['1 Peter 5:7','1 Peter 5:6-11','https://www.bibleref.com/1-Peter/5/1-Peter-5-7.html',['Psalm 55:22','1 Peter 5:6']],
  ['James 1:5','James 1:2-8','https://www.bibleref.com/James/1/James-1-5.html',['Proverbs 2:6','James 3:17']],
  ['John 14:27','John 14:25-31','https://www.bibleref.com/John/14/John-14-27.html',['John 16:33','Romans 5:1']],
  ['Psalm 118:24','Psalm 118:19-29','https://www.bibleref.com/Psalms/118/Psalm-118-24.html',['Psalm 100:4','1 Thessalonians 5:18']],
  ['Romans 12:12','Romans 12:9-21','https://www.bibleref.com/Romans/12/Romans-12-12.html',['Romans 5:3-5','Colossians 4:2']],
  ['Psalm 121:2','Psalm 121','https://www.bibleref.com/Psalms/121/Psalm-121-2.html',['Psalm 124:8','Psalm 46:1']],
  ['Colossians 3:17','Colossians 3:12-17','https://www.bibleref.com/Colossians/3/Colossians-3-17.html',['Colossians 3:23','1 Corinthians 10:31']],
  ['2 Timothy 1:7','2 Timothy 1:6-14','https://www.bibleref.com/2-Timothy/1/2-Timothy-1-7.html',['Romans 8:15','Galatians 5:22-23']],
  ['Lamentations 3:22-23','Lamentations 3:19-26','https://www.bibleref.com/Lamentations/3/Lamentations-3-22.html',['Psalm 103:8','Psalm 30:5']]
];
function choose(items,random) { return items[Math.floor(random()*items.length)]; }
function makeRitual(random=Math.random) {
  const [reference,context,study,related]=choose(passages,random);
  return {arrival:choose(arrivals,random),prayer:choose(prayers,random),gratitude:choose(gratitude,random),ending:choose(endings,random),reference,context,study,related};
}
module.exports={makeRitual,passages};
