var helper = require('./../controllerhelper.js');

var probability = 10;

var tweets = [
  'Ah, <name>. Sehr geil. Dorsch ist auch sehr geil. #dorsch',
  'Wer kauft denn bitte <name>?',
  '<name> --;',
  'Wer säuft denn schon dieses <name>? Komische Menschen sind das im #Nbsp.',
  'Schon gehört? Jemand hat <name> vernascht.',
  'Nicht nur deine Mudda trinkt <name>, auch im #Nbsp ist diese zu haben!',
  'Jemand hat <name> getrunken. Das war doch bestimmt wieder @DasIstDasBein.',
  'Wenn die Sonne scheint, ist die richtige Zeit für <name>!',
  'Marmor, Stein und Eisen bricht, aber hoffentlich die Flasche <name> nicht!',
  'Kommt in den #Nbsp! Dort gibts <name>!',
  'Es wird getrunken: <name> oder Lack.\n- Im #Nbsp #LackOperatingCenter',
  'Wir haben auch Chips! Jemand isst: <name>!',
  'Wenn dein Telefon heute klingelt: Gieße es mit <name>!',
  '<name> in die 🍼 - das Nuckelt!',
  'Leute die <name> mochten mochten auch: 🥛 🍺 🍻 🍷 🥂 🥃 🍸 🍹 🍾 🍶.',
  'Da versucht doch wer, mit <name> ein neues Getränk zu mischen?',
  'Von den <name>, die es weniger gibt gibt es jetzt eins mehr! Der Schwund ist quasi im Kommen.',
  'Wird tatsächlich <name> getrunken, oder handelt es sich um ein geschicktes Alibi?',
  'Innehalten und nachschmecken - was ist eigentlich die Essenz von <name>?',
  '<name> schmeckt wie Physik durch Wollen.',
  'Schonmal ein Getränk aufgekocht und als Suppe genossen? Eine <name> ist jetzt die Gelegenheit!',
  'Discuss <name>: Top oder Flop?',
  '1 Lebewesen im #Nbsp besteht demnächst zu einem höheren Anteil aus <name>.'
]

exports.potentiallyAddTweet = function(tweetsToSendOut, consumptionData) {
  addTweetIfNewDrink(tweetsToSendOut, consumptionData);
}

exports.checkForTweet = function(counter) {
  return true;
}

function addTweetIfNewDrink(tweetsToSendOut, consumptionData) {
  console.log("new drink?")
  drink = consumptionData[0];

  if(drink == undefined) {
    return;
  }

  var then = new Date(drink.consumetime);
  var now = new Date();

  console.log(now.getTime()/1000 - then.getTime()/1000);
  if (now.getTime()/1000 - then.getTime()/1000 <= 30 && helper.randomTrueFalse(probability)) {
    console.log(then);
    console.log(now);

    console.log(now.getTime()/1000 - then.getTime()/1000);
    console.log("add tweet...");
    addTweet(tweetsToSendOut, drink);
  }
}

function addTweet(tweetsToSendOut, drink) {
  console.log("TWEET:");
  var niceDrink = helper.getRandomTweet(tweets)
  console.log(niceDrink);
  var name = drink.name;

  name = name.replace(' (0.5l)', '');
  name = name.replace(' (0.3l)', '');

  tweetsToSendOut.push(niceDrink.replace('<name>', name));
}
