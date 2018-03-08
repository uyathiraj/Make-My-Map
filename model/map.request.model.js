var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var requestSchema = new Schema({
	State:{
		type:String,
		required:true
	},
	Text:{
		type:String,
		required:true
	}
	Value:{
		type:String
	}
	}
});
