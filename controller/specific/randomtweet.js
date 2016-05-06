var helper = require('./../controllerhelper.js');

var probability = 200000;

var tweets = [
  'bülülülülp',
  'Hey, @Der_Derwish was geht?',
  'Und was macht @TVLukesCoffee heute so.',
  'Sing along kids: https://www.youtube.com/watch?v=WHalAUHOrKc',
  'I know the feels. https://twitter.com/medjars/status/674193248257110016',
  'test. test. is this real life?',
  'Freundliche Grüße an @faab_esCoffee und alle meine IoT-Homies. #ThugLife',
  '@Allibert91 & @Dr_Ewes84 lost #theGame.'
]

exports.potentiallyAddTweet = function(tweetsToSendOut, consumptionData) {
  if(helper.randomTrueFalse (probability)) {
    console.log("Randomtweet: yes.")
    addTweet(tweetsToSendOut, consumptionData);
  } else {
    console.log("Randomtweet: no.")
  }
}

function addTweet(tweetsToSendOut, consumptionData) {
  tweetsToSendOut.push(helper.getRandomTweet(tweets));
}
