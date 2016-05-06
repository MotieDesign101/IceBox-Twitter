var helper = require('./../controllerhelper.js');

var probability = 10;

var tweets = [
  'Ah, <name>. Sehr geil. Dorsch ist auch sehr geil. #dorsch',
  'Wer kauft den bitte <name>?',
  '<name> --;'
]

exports.potentiallyAddTweet = function(tweetsToSendOut, consumptionData) {
  addTweetIfNewDrink(tweetsToSendOut, consumptionData);
}

function addTweetIfNewDrink(tweetsToSendOut, consumptionData) {
  drink = consumptionData[0];

  var then = new Date(drink.consumetime);
  var now = new Date();

  if (now.getTime()/1000 - then.getTime()/1000 <= 30 && helper.randomTrueFalse(probability)) {
    console.log(then);
    console.log(now);

    console.log(now.getTime()/1000 - then.getTime()/1000);
    console.log("add tweet...");
    addTweet(tweetsToSendOut, drink);
  }
}

function addTweet(tweetsToSendOut, drink) {
  console.log("TWEET:");
  var niceDrink = helper.getRandomTweet(tweets)
  console.log(niceDrink);
  var name = drink.name;

  name = name.replace('(0.5l)', '');
  name = name.replace('(0.3l)', '');

  tweetsToSendOut.push(niceDrink.replace('<name>', name));
}
