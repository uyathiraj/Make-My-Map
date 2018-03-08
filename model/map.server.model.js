var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var markerSchema = new Schema({
	Name:{
		type:String,
		required:true
	},
	Lat:{
		type: String,
		required:true
	},
	Lng:{
		type:String,
		required:true
	}
});


/*var options = {
	  	useMongoClient: true,
	  	autoIndex: true, // Don't build indexes
	  	reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
	  	reconnectInterval: 500, // Reconnect every 500ms
	  	poolSize: 10, // Maintain up to 10 socket connections
	  	// If not connected, return errors immediately rather than waiting for reconnect
	  	bufferMaxEntries: 0
	};*/


var Marker = mongoose.model('Marker',markerSchema,'markers');
	//console.log(Marker);
module.exports = Marker;

/*var Marker;
var connection = mongoose.connect('mongodb://localhost/mapdb',options,function(err){
	if(err){
		console.log("Unable to connect");
		console.log(err);
	} 
	console.log("Connected");
	var db = mongoose.connection.db.db('mapdb');
	//console.log(db);
	db.listCollections().toArray(function(err, names) {
	    if (err) {
	        console.log(err);
	    }
	    else {
	        names.forEach(function(e,i,a) {
	           // mongoose.connection.db.dropCollection(e.name);
	            console.log("--->>", e.name);
	        });
	    }
	  db.close(); 
	});

	//mongoose.connection.db.collectionNames(function (err, names) {
    //console.log(names); // [{ name: 'dbname.myCollection' }]
    //module.exports.Collection = names;
//});
	Marker = mongoose.model('Marker',markerSchema);
	//console.log(Marker);

	module.exports = Marker;
	db.close();
});
*/
/*connection.then(function(db){
	//console.log(db);
	var Marker = connection.model('Marker', markerSchema);
console.log("model Connected");*/





/*function connect(){
	mongoose.connect(MONGO_DB);

	mongoose.connection.on('open', function(){
  	mongoose.connection.db.collectionNames(function(error, names) {
    if (error) {
      throw new Error(error);
    } else {
      names.map(function(name) {
        console.log('found collection %s', name);
      });
    }
  });
});

mongoose.connection.on('error', function(error){
  throw new Error(error);
});

}*/
