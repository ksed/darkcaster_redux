var express = require('express');
var router = express.Router();
var path = require('path');

// This router handles the get request to our server root, /
router.get('/', function(request, response) {
  response.sendFile('public/html/index.html', {root: path.resolve('.')});
});

module.exports = router;
