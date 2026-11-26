// Original Be Still prompts (AI-assisted editorial copy, not quotations).
const modes=['auto','morning','difficult','grateful','quiet','evening'];
const labels={morning:'An ordinary morning',difficult:'A difficult day',grateful:'A grateful day',quiet:'A quiet moment',evening:'Evening'};
const themes={
 difficult:{refs:['Psalm 34:18','Psalm 42:11','Psalm 46:1','Psalm 56:3','Psalm 62:5-8','Psalm 130:5-6','Lamentations 3:22-23','Matthew 11:28-30','John 14:27','Romans 8:26','2 Corinthians 1:3-4','Hebrews 4:14-16','1 Peter 5:7'],arrival:['You don’t have to pretend everything is fine.','You can be here even when today is hard.','There is no rush. Sit for a while.','You can tell God exactly what is troubling you.'],prayer:['Tell God what hurts, without trying to find the right words.','Is there someone you can ask to sit with you through this? Bring that to God.','Pray about the thing you keep turning over in your mind.','Ask God for enough strength for the next thing you need to do.'],gratitude:['Was there one kind thing someone did for you recently?','What is one small comfort you can enjoy today?','If gratitude is difficult today, simply sit quietly.'],ending:['Take care of yourself and the people close to you.','You can ask for help today.','Go gently. You have time.']},
 grateful:{refs:['Genesis 1:31','Psalm 8:3-4','Psalm 19:1','Psalm 65:9-13','Psalm 100:1-5','Psalm 103:1-5','Psalm 104:24','Psalm 118:24','Psalm 136:1','Ecclesiastes 3:11','James 1:17','Philippians 4:8','1 Thessalonians 5:16-18'],arrival:['There is plenty to notice today.','Think of something you are glad exists.','Let yourself enjoy the quiet.'],prayer:['Thank God for a joy you have been given recently.','Tell God about someone you love.','Thank God for something you would miss if it were gone.'],gratitude:['What are you looking forward to today?','What made you laugh recently?','What do you love about this time of year?','Who has made your life better in ways they may not know?'],ending:['Enjoy the good things in front of you.','Share a little of your joy with someone else.']},
 quiet:{refs:['Psalm 46:10','Psalm 62:5-8','Psalm 23:1-3','Matthew 11:28-30','Mark 6:31','John 14:27','Isaiah 30:15'],arrival:['Be still.','A little silence.','Stay here awhile.'],prayer:['Spend a few moments with God in silence.','Pray in your own words, or sit quietly.'],gratitude:['Name one thing you are thankful for.','Take a moment to give thanks.'],ending:['Go in peace.','Have a good day.']},
 evening:{refs:['Psalm 4:8','Psalm 23:1-3','Psalm 62:5-8','Psalm 121:2','Psalm 127:1-2','Psalm 130:5-6','Matthew 11:28-30','John 14:27','Philippians 4:6','1 Peter 5:7'],arrival:['The day is almost over. You can stop for a while.','Set aside what is unfinished.','Sit with the quiet of the evening.','You have done enough for tonight.'],prayer:['Talk to God about the day as it actually was.','Is there something you need to ask forgiveness for before you sleep?','Thank God for the people you spent time with today.','Bring tomorrow’s worries before God, then leave them there for tonight.','Pray for someone who had a hard day.','What would you like to do differently tomorrow? Bring it before God.'],gratitude:['What was good about today?','When did you feel most at home today?','What small kindness did you witness today?','What is something you are glad you got to do today?','What moment from today would you like to remember?'],ending:['Rest well. Tomorrow can wait.','Good night.','Let the day be done.','May you have a peaceful night.']}
};
const actions=[
 'Tell someone at home one specific thing you appreciate about them.',
 'Take a short walk without looking at your phone.',
 'Read a few pages of a book just because you enjoy it.',
 'Call a friend you have been meaning to catch up with.',
 'Make something with your hands, even if it is only a sandwich.',
 'Sit outside for a few minutes and listen.',
 'Ask someone how their day is going, and listen to the answer.',
 'Put your phone away for one meal.',
 'Let someone go ahead of you in line.',
 'Write a thank-you note to someone who helped you.',
 'Play a game with someone you love.',
 'Give someone a compliment about something other than their appearance.',
 'Leave work on time if you can.',
 'Do a small kindness without announcing it.',
 'Look at the sky before you go inside.',
 'Make a cup of coffee or tea for someone else.',
 'Learn a little about something unrelated to work.',
 'Put on a favorite song and listen to it all the way through.',
 'Ask a family member to tell you a story you have not heard.',
 'Give your attention to one ordinary thing you usually rush through.'
];
actions.push(...require('./expanded-prompts.cjs').actions);
const wonders=[
 {title:'The familiar face of the Moon',text:'The Moon turns on its axis in the same time it takes to orbit Earth. That is why nearly the same side always faces us.',source:'https://science.nasa.gov/moon/facts/',publisher:'NASA'},
 {title:'A ring made of ice',text:'Saturn’s rings are mostly water ice. The individual pieces range from tiny grains to chunks much larger than a person.',source:'https://science.nasa.gov/resource/saturns-rings-2/',publisher:'NASA'},
 {title:'Water never stands still for long',text:'Water moves between oceans, air, soil, rivers, plants and underground reservoirs. Rain is one part of a continuous cycle.',source:'https://www.usgs.gov/special-topics/water-science-school/water-cycle',publisher:'US Geological Survey'},
 {title:'A forest of giants begins with tiny seeds',text:'Giant sequoias can release their small seeds when the heat of a fire opens their cones. Suitable fire can also expose soil where seedlings establish.',source:'https://www.nps.gov/seki/learn/gslc.htm',publisher:'National Park Service'},
 {title:'Six dots',text:'The basic braille cell contains six positions. Different combinations of raised dots represent letters, numbers and other symbols.',source:'https://www.loc.gov/nls/services-and-resources/informational-publications/about-braille/',publisher:'Library of Congress'},
 {title:'An ocean full of voices',text:'Whales, dolphins and porpoises use a variety of sounds to communicate and gather information underwater.',source:'https://www.fisheries.noaa.gov/national/science-data/ocean-noise',publisher:'NOAA'},
 {title:'The far side has daylight too',text:'There is no permanently dark side of the Moon. At new moon, the far side is lit by the Sun while the side we see is in darkness.',source:'https://science.nasa.gov/moon/facts/',publisher:'NASA'},
 {title:'Rivers fed from below',text:'Groundwater supplies a substantial part of the flow of many streams. The water you see in a river can have arrived through the ground.',source:'https://www.usgs.gov/water-science-school/science/groundwater-flow-and-water-cycle',publisher:'US Geological Survey'}
];
function resolveMode(mode='morning',date=new Date()){if(mode==='auto')return date.getHours()>=18||date.getHours()<4?'evening':'morning';return modes.includes(mode)?mode:'morning';}
function includesNews(mode){return mode==='morning'||mode==='grateful';}
module.exports={modes,labels,themes,actions,wonders,resolveMode,includesNews};
