
// Dependencies
var express = require('express');
var router = express.Router();

//CONTACT API methods
var Contact = require('../models/contact');//get the contact database schema. this Contact is used in angular controller
Contact.methods(['get', 'put', 'post', 'delete']);//node-restful creates get, put, post, delete automatically.
Contact.register(router, '/contacts');//this is the url like /api/contacts for get,put,post,delete for api

// Return router
module.exports = router;