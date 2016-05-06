exports.randomTrueFalse = function(probability) {
  var randomnumber = Math.floor(Math.random() * probability) + 1;
  return randomnumber == 1;
}

exports.getRandomTweet = function(arrayOfTweets) {
  return arrayOfTweets[Math.floor(Math.random() * arrayOfTweets.length)];
}

exports.isMidnight = function() {
  var d = new Date();
  if(d.getHours() == 0 && d.getMinutes() == 0) {
    return true;
  }
  return false;
}

/*
 * Old stuff. maybee needed later
 */
function getWeekNumber(d) {
  // Copy date so don't modify original
  d = new Date(+d);
  d.setHours(0, 0, 0);
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  // Get first day of year
  var yearStart = new Date(d.getFullYear(), 0, 1);
  // Calculate full weeks to nearest Thursday
  var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  // Return array of year and week number
  return [d.getFullYear(), weekNo];
}
