var consumerKey = null;
var consumerSecret = null;

var accessTokenKey = null;
var accessTokenSecret = null;

exports.getConsumerSecret = function() {
  return consumerSecret ;
};

exports.getConsumerKey = function() {
  return consumerKey;
};

exports.getTokenKey = function() {
  return accessTokenKey;
};

exports.getTokenSecret = function() {
  return accessTokenSecret;
};
