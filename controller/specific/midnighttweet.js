var helper = require('./../controllerhelper.js');
var request = require("request");

var probability = 10;

var caffeinTweets = [
   'Das sind summa-sumarum <mg> mg Koffein.',
   'Insgesammt wurden <mg> mg Koffein Konsumiert.',
   '<mg> mg Koffein ist dabei in Leute gekommen.',
   '<mg> mg Koffein ist dabei unter die Leute gekommen. 🍹.'
];

var sugarTweets = [
    'Das entspricht <mg> g Zucker.',
    'Zucker... Zucker ist gut. Heute waren es <mg> g Zucker.',
    'Zuckerkonsum: Heute entspricht dieser <wuerfel> Würfelzucker. Wie viele Saarland sind das?',
    'Heute wurden <mg> g Zucker konsumiert. Das sind <mg2> g Ost-Zucker <mg3> g Ost-Zucker auf dem Schwarzmarkt.'
];

var kallorienTweet = [
    'Zählt jemand Kallorien? Das waren <kcal> kcal heute.',
    'Oder auch <kcal> kcal.',
    'Das sind insgesammt <kcal> kcal. Guten Appetit.',
    'Heute sind daher <kcal> kcal Energie in Leute übergegangen.'
];

var popularDrink = [
    'Der beliebteste Drink war heute <name>.',
    'Besonders beliebt war <name>.',
]

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
  getAmountOfSugar(tweetsToSendOut, consumptionData);
}

function getAmountOfDrinks(tweetsToSendOut, consumptionData) {
  var tweetText = "Mitternachtsstatistik: Am vergangenen Tag wurden insgesamt ";
  var howManyDrinks = consumptionData.length;
  tweetText = tweetText + howManyDrinks;
  tweetText = tweetText + " Getränke gekauft."

  tweetsToSendOut.push(tweetText);
}

function getMostConsumedDrink(tweetsToSendOut, consumptionData) {
  var howManyDrinks = consumptionData.length;
  var allDrinks = [];
  if(howManyDrinks > 15 && helper.randomTrueFalse (probability)) {
    for( var i in consumptionData) {
      allDrinks.push(consumptionData[i]['name'])
    }
    console.log(allDrinks);
    var name = getMostCommonFromArray(allDrinks);
    console.log(name);
    var popDrinkTweet = helper.getRandomTweet(popularDrink);
    popDrinkTweet = popDrinkTweet.replace('<name>', name);
    tweetsToSendOut.push(popDrinkTweet);
  }
}

function getMostCommonFromArray(array)
{
    if(array.length == 0){
      return null;
    }
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
      var el = array[i];
      if(modeMap[el] == null) {
        modeMap[el] = 1;
      } else {
        modeMap[el]++;
      }
      if(modeMap[el] > maxCount)
      {
        maxEl = el;
        maxCount = modeMap[el];
      }
    }
    return maxEl;
}

function getAmountOfCaffeein(tweetsToSendOut, consumptionData) {
  console.log("bla");
  if(helper.randomTrueFalse (probability)) {
    var cafSum = 0.0;
    getIngredientData( function(ingredientData) {
      for( var i in consumptionData) {
        var consumption = consumptionData[i];
        var barcode = consumption['barcode'];
        var specificIngredient = ingredientData[barcode];
        var specificCaffein = specificIngredient['caffeine'];
        var specificAmount = specificIngredient['amount'];
        cafSum = cafSum + ((specificCaffein/100.0)*specificAmount);
      }
      var caffeinTweet = helper.getRandomTweet(caffeinTweets);
      caffeinTweet = caffeinTweet.replace('<mg>', cafSum.toFixed(2));
      console.log(caffeinTweet);
      tweetsToSendOut.push(caffeinTweet);
    });
  }
}

function getAmountOfSugar(tweetsToSendOut, consumptionData) {
  console.log("bla Sugar");
  if(helper.randomTrueFalse (probability)) {
    var cafSum = 0.0;
    getIngredientData( function(ingredientData) {
      for( var i in consumptionData) {
        var consumption = consumptionData[i];
        var barcode = consumption['barcode'];
        var specificIngredient = ingredientData[barcode];
        var specificCaffein = specificIngredient['sugar'];
        var specificAmount = specificIngredient['amount'];
        cafSum = cafSum + ((specificCaffein/100.0)*specificAmount);
      }
      var sugarTweet = helper.getRandomTweet(sugarTweets);
      sugarTweet = sugarTweet.replace('<mg>', cafSum.toFixed(2));
      sugarTweet = sugarTweet.replace('<mg2>', (cafSum*2).toFixed(2));
      sugarTweet = sugarTweet.replace('<mg3>', (cafSum*4).toFixed(2));
      sugarTweet = sugarTweet.replace('<wuerfel>', (cafSum/3).toFixed(2));
      console.log(sugarTweet);
      tweetsToSendOut.push(sugarTweet);
    });
  }
}

function getIngredientData(callback) {
  console.log("get ingredient data");
  var url = "http://icebox.nobreakspace.org:8087/ingred";
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
      console.log(response.statusCode);
      callback(body);
    } else {
        console.log("adding iceboxdown...");
        callback();
      }
  });
}
