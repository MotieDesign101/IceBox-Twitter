var helper = require('./../controllerhelper.js');

exports.potentiallyAddTweet = function(tweetsToSendOut, consumptionData) {
  if(helper.isMidnight()) {
    addTweet(tweetsToSendOut, consumptionData);
  }
}

exports.checkForTweet = function(counter) {
  return true;
}

function addTweet(tweetsToSendOut, consumptionData) {
  getAmountOfDrinks(tweetsToSendOut, consumptionData);
  getMostConsumedDrink(tweetsToSendOut, consumptionData);
  getAmountOfCaffeein(tweetsToSendOut, consumptionData);
}

function getAmountOfDrinks(tweetsToSendOut, consumptionData) {
  var tweetText = "Mitternachtsstatistik: Am vergangenen Tag wurden insgesammt ";
  var howManyDrinks = consumptionData.length;
  tweetText = tweetText + howManyDrinks;
  tweetText = tweetText + " Getränke gekauft."

  tweetsToSendOut.push(tweetText);
}

function getMostConsumedDrink(tweetsToSendOut, consumptionData) {

}

function getAmountOfCaffeein(tweetsToSendOut, consumptionData) {

}
