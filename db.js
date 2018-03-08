var mongoose = require('mongoose');

var db;
var options = {
      useMongoClient: true,
      autoIndex: true, // Don't build indexes
      reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
      reconnectInterval: 500, // Reconnect every 500ms
      poolSize: 10, // Maintain up to 10 socket connections
      // If not connected, return errors immediately rather than waiting for reconnect
      bufferMaxEntries: 0
  };

module.exports.connect = function(cb){
	mongoose.Promise = global.Promise;
	var connection = mongoose.connect('mongodb://localhost/mapdb',options,function(err){
  	if(err){
    	console.log("Unable to connect");
    	console.log(err);
  	} 
  	console.log("Connected");
  	db = mongoose.connection.db.db('mapdb');
  	cb(db)
	});
}

module.exports.get = function(){
	return db;
}

module.exports.disconnect = function(){
	if(db) 
		db.close();
}

//Module.exports = methods;