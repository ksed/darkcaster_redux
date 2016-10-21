// First initialize mySecretPhrase to the secret phrase expected by this middlware
var mySecretPhrase = process.env.PASS || require('../config.js').secretPassPhrase;

function mySecretPassPhrase(request, response, next) {
  // initialize a variable to look for a secret in the request header
  var headerSecret = request.headers.secret;

  // Then test whether the headerSecret matches our secret phrase
  if (!headerSecret || headerSecret !== mySecretPhrase) {
    // If headerSecret is not correct, produce this message and stop.
    response.status(403).json({
      msg: "You are not authorized"
    });
  } else {
    // If headerSecret is correct, then proceed to the router
    next();
  }
}

module.exports = mySecretPassPhrase;
