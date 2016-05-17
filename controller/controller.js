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
  try{
    randomtweet.potentiallyAddTweet(tweetsToSendOut, consumptionData);
  } catch(err) {
    console.log("ERROR: "+err);
  }

  try{
    midnighttweet.potentiallyAddTweet(tweetsToSendOut, consumptionData);
  } catch(err) {
    console.log("ERROR: "+err);
  }

  try{
    commentdrink.potentiallyAddTweet(tweetsToSendOut, consumptionData);
  } catch(err) {
    console.log("ERROR: "+err);
  }

  try{
    retweet.potentiallyAddTweet(tweetsToSendOut, consumptionData);
  } catch(err) {
    console.log("ERROR: "err);
  }
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
