var express = require('express');
var router = express.Router();
var authorize = require('../middleware/auth.js');
var axios = require('axios');
var apiKey = process.env.APIKEY || require('../config.js').apiKey;

// The following call tests whether auth.js will allow the rest of the forecast router to be called.
router.use(authorize);

// a max timeout parameter to limit how long axios waits for the promise
var timeoutConfig = {
  timeout: 2000
};

// If auth.js permits this, this handles the get request for a forecast
router.get('/forecast/:latitude,:longitude', function(request, response) {
  var url = buildForecastURL(request.params.latitude, request.params.longitude);

  // uses axios to ask for the darksky url for a limited time, and then serve the forecast data
  axios.get(url, timeoutConfig)
       .then(function(forecast) {
         response.send(forecast.data);
       })
       .catch(function(error) { // or not...
         response.send(error);
       });
});

// a helper function that builds the url for darksky while obscuring our private apiKey
function buildForecastURL(latitude, longitude) {
  return "https://api.darksky.net/forecast/" + apiKey + "/" + latitude + "," + longitude;
}

module.exports = router;
