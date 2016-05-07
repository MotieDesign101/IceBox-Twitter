var helper = require('./../controllerhelper.js');
var Twitter = require('twitter');

var probability = 50;

var client = new Twitter({
  consumer_key: process.env.ICEBOX_TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.ICEBOX_TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.ICEBOX_TWITTER_TOKEN_KEY,
  access_token_secret: process.env.ICEBOX_TWITTER_TOKEN_SECRET
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
    console.log("ID of potential tweet "+potentialtweet.id);
    if(idOfLastTweet == 0 || idOfLastTweet == potentialtweet.id) {
      idOfLastTweet = potentialtweet.id;
      //do nothing, you decided on this tweet the last time
    } else {
      console.log("WE SHALL RETWEEEEEEEET");
      idOfLastTweet = potentialtweet.id;
      if(helper.randomTrueFalse (probability)) {
        client.post('statuses/retweet/' + potentialtweet.id, function(error, tweet, response){
          if (!error) {
            console.log(tweet);
          }
        });
      }
    }
  });
}
