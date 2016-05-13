var Twitter = require('twitter');
var constants = require('./constants.js');
var controller = require('./controller/controller.js');

var client = new Twitter({
  consumer_key: constants.getConsumerKey() || process.env.ICEBOX_TWITTER_CONSUMER_KEY,
  consumer_secret: constants.getConsumerSecret() || process.env.ICEBOX_TWITTER_CONSUMER_SECRET,
  access_token_key: constants.getTokenKey() || process.env.ICEBOX_TWITTER_TOKEN_KEY ,
  access_token_secret: constants.getTokenSecret() || process.env.ICEBOX_TWITTER_TOKEN_SECRET
});

var rotationTime = 30000;
var tweetsToSendOut = [];

main();

function main() {
  repeat();
  setTimeout(function() {
    main();
  }, rotationTime);
}

function repeat() {
  tweetIfPossible();
  console.log(".");
  controller.generateNewTweets(tweetsToSendOut);
}

function tweetIfPossible() {
  if(tweetsToSendOut.length > 0) {
    var tweetText = tweetsToSendOut[0];
    tweet(tweetText);
    tweetsToSendOut.shift();
  }
}

function tweet(text) {
  console.log("tweet: "+ text);

  client.post('statuses/update', {
    status: text
  }, function(error, tweet, response) {
    if (error) {
      console.log(JSON.stringify(error));
      throw error;
    }
    console.log(tweet); // Tweet body.
    console.log(response); // Raw response object.
  });

}

//=====OLD===


function commentOnADrink(body) {
  console.log("comment on a drink?")
  drink = body[0];

  var then = new Date(drink.consumetime);
  var now = new Date();
  console.log(then);
  console.log(now);

  console.log(now.getTime()/1000 - then.getTime()/1000);

  if (now.getTime() - then.getTime() <= rotationTime) {
    console.log("somebody did buy something...")
    if (random(500)) {
      console.log("..");
      niceDrinkYouHaveThere(drink);
    }
  }
}



function trendingmate(body) {
  var total = body.length;

  if (total > 10) {
    var allthesame = true;
    var drinkname = body[0].name;
    for (var i = 0; i < 10; i++) {
      var co = body[i];
      //console.log(co);
      if (drinkname != co.name) {
        allthesame = false;
      }
    }
  }

  //console.log("all the same " + allthesame);
  if (allthesame) {
    console.log("WE HAVE A TREND ITS: " + drinkname);
  }
}



/*
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    console.log(tweets);
  }
});
*/

//infinite loop
/*
client.stream('statuses/filter', {track: '#nbspgefluester'}, function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet.text);
  });

  stream.on('error', function(error) {
    throw error;
  });
});
*/

/*
client.get('search/tweets', {q: '#nbspgefluester'}, function(error, tweets, response){
    //var jtweets = JSON.parse(tweets);
   console.log(tweets.statuses[0]);
   //check if its a new tweet
   //randomize some number, and sometimes, retweet stuff
   //if the source is chaotikum_ev make it more likely
   //if the source is @der_derwisch, only do it, if it has at least 5 retweets and 5 likes
});
*/

function niceDrinkYouHaveThere(drink) {
  console.log("TWEET:");
  var niceDrink = tweets.getNiceDrinkTweet();
  console.log(niceDrink);
  var name = drink.name;
  name = name.replace('(0.5l)', '');
  name = name.replace('(0.3l)', '');
  tweet(niceDrink.replace('<name>', drink.name));
}
