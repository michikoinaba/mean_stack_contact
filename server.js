// Load required packages
//"body-parser": "^1.4.3",
//    "express": "^4.13.4",
 //   "method-override": "^2.1.3",
 //   "mongoose": "^4.4.12",
 //   "morgan":
var express = require('express');
var methodOverride = require('method-override');////Handles put requests
var mongoose = require('mongoose');
var bodyParser = require('body-parser');////Handles post requests
var morgan = require('morgan');
var database = require('./config/database'); 	
var port = process.env.PORT || 3000; 

//mongo db connect
mongoose.connect(database.localUrl); 

//configurations
//Express
var app = express();
//app.use(express.static('./public'));//	// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));



//The extended argument allows to choose between parsing the urlencoded data 
//with the querystring library (when false) or the qs library (when true). The "extended" syntax allows for rich objects and arrays to be 
//encoded into the urlencoded format, allowing for a JSON-like experience with urlencoded.
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
//app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
//app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

//routes ======================================================================
app.use('/api', require('./routes/api'));



// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);

