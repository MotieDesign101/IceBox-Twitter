var randomtweet = require('./specific/randomtweet.js');
var midnighttweet = require('./specific/midnighttweet.js');
var commentdrink = require('./specific/commentDrink.js');
var retweet = require('./specific/retweet.js');
var iceboxdowntweets = require('./specific/iceboxdown.js')

var request = require("request");
var counter = 0;
var iceboxdown = false;
var iceboxdownbefore = false;

exports.generateNewTweets = function(tweetsToSendOut) {
  getConsumptionData(function(consumptionData) {
    generateTweets(tweetsToSendOut, consumptionData);
  })
}

function generateTweets(tweetsToSendOut, consumptionData) {
  counter++;
  try{
    if(randomtweet.checkForTweet(counter)) {
      randomtweet.potentiallyAddTweet(tweetsToSendOut, consumptionData);
    }
  } catch(err) {
    console.log("ERROR: "+err);
  }

  try{
    if(midnighttweet.checkForTweet(counter)) {
      midnighttweet.potentiallyAddTweet(tweetsToSendOut, consumptionData);
    }
  } catch(err) {
    console.log("ERROR: "+err);
  }

  try{
    if(commentdrink.checkForTweet(counter)) {
      commentdrink.potentiallyAddTweet(tweetsToSendOut, consumptionData);
    }
  } catch(err) {
    console.log("ERROR: "+err);
  }

  try{
    if(retweet.checkForTweet(counter)) {
      retweet.potentiallyAddTweet(tweetsToSendOut, consumptionData);
    }
  } catch(err) {
    console.log("ERROR: "+err);
  }

  try{
    if(!iceboxdownbefore && iceboxdown) {
      iceboxdowntweets.potentiallyAddTweet(tweetsToSendOut, consumptionData);
    }
  } catch(err) {
    console.log("ERROR: "+err);
  }
}

function getConsumptionData(callback) {
  console.log("get consumption data");
  var url = "http://icebox.nobreakspace.org:8081/consumptions/1";
  //url = "http://localhost:8081/consumptions/1";
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
    if (!error && (response.statusCode === 200 || response.statusCode === 201)) {
      iceboxdown = false;
      console.log(response.statusCode);
      callback(body);
    } else {
      if(!iceboxdown) {
        iceboxdown = true;
      }
      iceboxdown
    }
  });
}
