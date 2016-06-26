var helper = require('./../controllerhelper.js');

var probability = 1;

var tweets = [
  'Aktuell antwortet icebox nicht... evtl down?',
  'Begründeter verdacht, dass Icebox aktuell nicht verfügbar ist.'
]

exports.potentiallyAddTweet = function(tweetsToSendOut) {
  addTweet(tweetsToSendOut);
}

function addTweet(tweetsToSendOut) {
  console.log("TWEET:");
  var theTweet = helper.getRandomTweet(tweets)
  console.log(niceDrink);

  tweetsToSendOut.push(theTweet);
}
