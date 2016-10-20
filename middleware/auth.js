var mySecretPhrase = process.env.PASS || require('../config.js').secretPassPhrase;

function mySecretPassPhrase(request, response, next) {
  var secretPassPhrase = request.headers.secret;
  if (!secretPassPhrase || secretPassPhrase !== mySecretPhrase) {
    response.status(403).json({
      msg: "You are not authorized"
    });
  } else {
    next();
  }
}

module.exports = mySecretPassPhrase;
