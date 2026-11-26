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
  'Let today be a day of faithfulness, not fear.',
  "Today does not need to be extraordinary to be worthwhile.",
  "There is room for both uncertainty and hope.",
  "Begin with the life God has given you, not the life you fear losing.",
  "You can be present without having a plan for every possibility.",
  "There is no need to rush this moment.",
  "Give yourself a little quiet before the noise of the day.",
  "There are people to love and things to enjoy today.",
  "Make space for what is lasting.",
  "You are not required to solve the whole world this morning.",
  "Set aside the hurry for a moment.",
  "There is time to notice what is good.",
  "Meet the day with an open heart."
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
  'Where do you need courage to do the next right thing?',
  "Where do you need help being patient with someone today?",
  "What would you like to entrust to God before you begin work?",
  "Who is carrying a burden you could help lighten?",
  "What decision could you bring before God rather than rush?",
  "Where could you ask for a generous heart?",
  "What joy can you thank God for today?",
  "Where do you need humility to listen well?",
  "What would you like to bring before God for your family?",
  "Who is difficult to love right now?",
  "What good thing are you afraid of losing?",
  "Where can you ask for strength to be faithful?",
  "What could you let go of today?"
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
  'What is something you can enjoy without needing to achieve anything?',
  "What small moment with someone you love stands out?",
  "What is something beautiful you can see or hear today?",
  "Who has taught you something worth carrying forward?",
  "What is a good memory you can enjoy for a moment?",
  "What everyday task are you thankful you can do?",
  "What meal or place reminds you of home?",
  "What has grown easier with time?",
  "Where have you seen kindness recently?",
  "What part of your work gives you satisfaction?",
  "What can you learn or make simply because you enjoy it?",
  "What do you appreciate about the people closest to you?",
  "What is one good thing that requires no purchase?"
];
const endings = [
  'Love the people in front of you. Do the work before you.',
  'Be faithful in the small things today.',
  'Carry gratitude with you. Leave room for joy.',
  'You can take the next step without knowing the whole road.',
  'Go in peace. Make time for what matters.',
  "Be present with the people you love.",
  "Let your work be one part of a meaningful day.",
  "Make something good. Notice something beautiful.",
  "Carry what matters. Set down what you cannot control.",
  "Take the day as it comes, with faith and kindness.",
  "Make time for ordinary joys.",
  "Choose patience when the day feels hurried."
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
,
  ["Psalm 23:1-3","Psalm 23","https://www.bibleref.com/Psalms/23/Psalm-23-1.html",["John 10:11","Psalm 121:2"]],
  ["Psalm 34:8","Psalm 34:1-10","https://www.bibleref.com/Psalms/34/Psalm-34-8.html",["Psalm 119:103","1 Peter 2:3"]],
  ["Psalm 46:1","Psalm 46","https://www.bibleref.com/Psalms/46/Psalm-46-1.html",["Psalm 62:8","Psalm 121:2"]],
  ["Proverbs 3:5-6","Proverbs 3:1-12","https://www.bibleref.com/Proverbs/3/Proverbs-3-5.html",["James 1:5","Psalm 37:5"]],
  ["Matthew 11:28-30","Matthew 11:25-30","https://www.bibleref.com/Matthew/11/Matthew-11-28.html",["John 14:27","Hebrews 4:16"]],
  ["Philippians 4:7","Philippians 4:4-9","https://www.bibleref.com/Philippians/4/Philippians-4-7.html",["John 14:27","Colossians 3:15"]],
  ["John 14:1","John 14:1-7","https://www.bibleref.com/John/14/John-14-1.html",["John 16:33","Psalm 56:3"]],
  ["James 1:19","James 1:19-27","https://www.bibleref.com/James/1/James-1-19.html",["Proverbs 15:1","Ephesians 4:29"]],
  ["Romans 12:18","Romans 12:9-21","https://www.bibleref.com/Romans/12/Romans-12-18.html",["Matthew 5:9","Hebrews 12:14"]],
  ["Colossians 3:12","Colossians 3:12-17","https://www.bibleref.com/Colossians/3/Colossians-3-12.html",["Ephesians 4:32","Galatians 5:22-23"]],
  ["Hebrews 12:1-2","Hebrews 12:1-3","https://www.bibleref.com/Hebrews/12/Hebrews-12-1.html",["Philippians 3:13-14","2 Timothy 4:7"]],
  ["1 Thessalonians 5:16-18","1 Thessalonians 5:12-24","https://www.bibleref.com/1-Thessalonians/5/1-Thessalonians-5-16.html",["Philippians 4:4-7","Colossians 3:17"]]
];
function choose(items,random) { return items[Math.floor(random()*items.length)]; }
const reflections={
 'Psalm 46:10':'What does the whole psalm say about God’s presence amid trouble?',
 'Matthew 6:34':'How does Jesus connect worry about tomorrow with trust in the Father?',
 'Psalm 23:1-3':'What images does the psalm use to describe the Lord’s care?',
 'Proverbs 3:5-6':'How does this passage distinguish trust in God from confidence in your own understanding?',
 'Matthew 11:28-30':'What does Jesus invite the weary to learn from him?',
 'Philippians 4:7':'How does the surrounding passage connect prayer, thanksgiving and peace?',
 'James 1:19':'What might being quick to listen and slow to speak look like today?',
 'Romans 12:18':'What is within your responsibility when seeking peace with someone?',
 'Colossians 3:12':'Which of the qualities Paul describes is most challenging to practice?',
 'Hebrews 12:1-2':'What does the image of running a race suggest about endurance and attention?',
 '1 Thessalonians 5:16-18':'How do rejoicing, prayer and thanksgiving fit together in this passage?',
 'Lamentations 3:22-23':'How does the surrounding lament shape the expression of hope in these verses?',
 'Isaiah 41:10':'Who is being addressed in the surrounding passage, and what does God promise them?',
 '2 Timothy 1:7':'How does the surrounding letter connect courage with faithfulness?'
};
function makeRitual(random=Math.random) {
  const [reference,context,study,related]=choose(passages,random);
  return {arrival:choose(arrivals,random),prayer:choose(prayers,random),gratitude:choose(gratitude,random),ending:choose(endings,random),reference,context,study,related,reflection:reflections[reference]||'What does this passage reveal about God in its surrounding context?'};
}
module.exports={makeRitual,passages};
