var express = require('express');
var router = express.Router();
var authorize = require('../middleware/auth.js');
var axios = require('axios');
var apiKey = process.env.APIKEY || require('../config.js').apiKey;

router.use(authorize);

var timeoutConfig = {
  timeout: 2000
};

router.get('/forecast/:latitude,:longitude', function(request, response) {
  var url = buildForecastURL(request.params.latitude, request.params.longitude);

  axios.get(url, timeoutConfig)
       .then(function(forecast) {
         response.send(forecast.data);
       })
       .catch(function(error) {
         response.send(error);
       });
});

function buildForecastURL(latitude, longitude) {
  return "https://api.darksky.net/forecast/" + apiKey + "/" + latitude + "," + longitude;
}

module.exports = router;
