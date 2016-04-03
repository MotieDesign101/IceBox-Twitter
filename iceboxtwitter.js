var Twitter = require('twitter');
var constants = require('./constants.js');

var client = new Twitter({
  consumer_key: constants.getConsumerKey(),
  consumer_secret: constants.getConsumerSecret(),
  access_token_key: constants.getTokenKey(),
  access_token_secret: constants.getTokenSecret()
});

var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    console.log(tweets);
  }
});

client.post('statuses/update', {status: 'Test. Test.'},  function(error, tweet, response){
  if(error) {
    console.log(JSON.stringify(error));
    throw error;
  }
  console.log(tweet);  // Tweet body.
  console.log(response);  // Raw response object.
});
