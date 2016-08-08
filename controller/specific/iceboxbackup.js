var helper = require('./../controllerhelper.js');

var probability = 1;

var tweets = [
  'Aaaaaand we are back'
]

exports.potentiallyAddTweet = function(tweetsToSendOut) {
  console.log("go");
  addTweet(tweetsToSendOut);
}

function addTweet(tweetsToSendOut) {
  console.log("TWEET:");
  var theTweet = helper.getRandomTweet(tweets)
  console.log(theTweet);

  tweetsToSendOut.push(theTweet);
}
