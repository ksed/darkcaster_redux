var express = require('express');
var router = express.Router();
var authorize = require('../middleware/auth.js');

router.use(authorize);

router.get('/forecast/:latitude,:longitude', function(request, response) {

});

module.exports = router;
