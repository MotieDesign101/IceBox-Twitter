var consumerKey = 'yourConsumerKey';
var consumerSecret = 'yourSecretKey';

var accessTokenKey = 'yourAccessTokenKey';
var accessTokenSecret = 'yourAccessTokenSecret';

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
