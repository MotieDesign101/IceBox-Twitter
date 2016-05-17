var constants = require('./../../constants.js');
var helper = require('./../controllerhelper.js');
var Twitter = require('twitter');

var probability = 1;

var client = new Twitter({
  consumer_key: constants.getConsumerKey() || process.env.ICEBOX_TWITTER_CONSUMER_KEY,
  consumer_secret: constants.getConsumerSecret() || process.env.ICEBOX_TWITTER_CONSUMER_SECRET,
  access_token_key: constants.getTokenKey() || process.env.ICEBOX_TWITTER_TOKEN_KEY ,
  access_token_secret: constants.getTokenSecret() || process.env.ICEBOX_TWITTER_TOKEN_SECRET
});

var idOfLastTweet = 0;

exports.potentiallyAddTweet = function(tweetsToSendOut, consumptionData) {
  getTweets();
}

function getTweets() {
  client.get('search/tweets', {q: '#nbspgefluester'}, function(error, tweets, response){
    //var jtweets = JSON.parse(tweets);
    var potentialtweet;
    if(tweets.statuses != undefined) {
      //console.log(JSON.stringify(tweets));
      //console.log(tweets.statuses[0]);
      potentialtweet = tweets.statuses[0];
    }
    console.log("ID of last tweet "+idOfLastTweet);
    if(potentialtweet == undefined) {
      return;
    }
    console.log(JSON.stringify(potentialtweet));
    console.log("ID of potential tweet "+potentialtweet.id);
    if(idOfLastTweet == 0 || idOfLastTweet == potentialtweet.id) {
      idOfLastTweet = potentialtweet.id;
      //do nothing, you decided on this tweet the last time
    } else {
      console.log("WE SHALL RETWEEEEEEEET");
      idOfLastTweet = potentialtweet.id;
      if(helper.randomTrueFalse (probability)) {
        client.post('statuses/retweet/' + potentialtweet.id_str, function(error, tweet, response){
          if (!error) {
            console.log(tweet);
          } else {
            console.log(error);
          }
        });
      }
    }
  });
}
