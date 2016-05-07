var randomtweet = require('./specific/randomtweet.js');
var midnighttweet = require('./specific/midnighttweet.js');
var commentdrink = require('./specific/commentDrink.js');
var retweet = require('./specific/retweet.js');

var request = require("request");

exports.generateNewTweets = function(tweetsToSendOut) {
  getConsumptionData(function(consumptionData) {
    generateTweets(tweetsToSendOut, consumptionData);
  })
}

function generateTweets(tweetsToSendOut, consumptionData) {
  randomtweet.potentiallyAddTweet(tweetsToSendOut, consumptionData);
  midnighttweet.potentiallyAddTweet(tweetsToSendOut, consumptionData);
  commentdrink.potentiallyAddTweet(tweetsToSendOut, consumptionData);
  retweet.potentiallyAddTweet(tweetsToSendOut, consumptionData)
}

function getConsumptionData(callback) {
  console.log("get consumption data");
  var url = "http://icebox.nobreakspace.org:8081/consumptions/1";
  //var url = "http://localhost:8081/consumptions/1";
  webrequest(url, function(body) {
    callback(body);
  });
}

function webrequest(requestUrl, callback) {
  console.log("web request");
  request({
    url: requestUrl,
    json: true
  }, function(error, response, body) {
    console.log(response.statusCode);
    if (!error && (response.statusCode === 200 || response.statusCode === 201)) {
      callback(body);
    }
  });
}
