// Initialize all variables for server, middleware, and routers
var express = require('express');
var server = express();
var cors = require('cors');
var logger = require('./middleware/logger.js');
var authorize = require('./middleware/auth.js');
var forecastRouter = require('./routers/forecast.router.js');
var indexRouter = require('./routers/index.router.js');

// First set the port for both Heroku and localhost:8080
var port = process.env.PORT || 8080;

// Enable access to our index folder, and run the logger and cors middleware
server.use(express.static(__dirname + "/public"));
server.use(logger);
server.use(cors());

// Enable our index router and forecast router
server.use(indexRouter);
server.use(forecastRouter);

// Tell server to log what port is open.
server.listen(port, function(){
  console.log("Now listening on port: "+port);
});
