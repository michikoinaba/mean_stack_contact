

//Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

//Schema
var schema = new mongoose.Schema({
	 name: {type: String,
	     required: true},
  phone: {type: String,
	      required: true,
	      unique: true}
});

//Return model
module.exports = restful.model('Contact', schema);