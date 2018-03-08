var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/mapdb";

//var read_excel = require('./read_excel.js');

var dataBase;

//insertExcelData();
connect();
function insertDoc(db,data){
	console.log(data);
	var d = data[0];
	db.collection("markers").insertMany(data, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
}

function insertExcelData(){
	console.log('main started')
	connect(function(db){
		console.log("connected")
		//getStateListFromExcel(function(data){
		//	insertDoc(db,data);
		//});
	});
}




function connect(cb){
	MongoClient.connect(url, function(err, db) {
  	if (err) throw err;
  var myDb = 	db.db("mapdb");
  	var data = `[{
		"State": "Andaman And Nicobar ",
		"Lat": "11.66702557",
		"Lng": "92.735982620000001"
	},
	{
		"State": "Andhra Pradesh",
		"Lat": "14.7504291",
		"Lng": "78.57002559"
	}]`;
	myDb.collection("markers").findOne({}, function(er,y){
		console.log(er);
        console.log(y);
	});
  	// db.collection("markers").insertMany(data, function(err, res) {
   //  if (err) throw err;
   //  console.log("1 document inserted");
   //  db.close();
  // });
  	// cb(db);
});
}

//-------------------fdfd--------------
var fs = require("fs");
var parseXlsx = require('excel');

function getStateListFromExcel(cb){
    console.log("Parsing excel")
    /*parseXlsx('state_marker.xlsx', function(err, data) {
        if(err) throw err;
        // data is an array of arrays
        var headers = data[0];
        var res =[];
        
        for (var i = 1; i <= data.length - 1; i++) {
            var temp = data[i];
            var i=0;
            cur ={};
           // console.log(temp);
            for (var i = 0; i <= temp.length - 1; i++) {
                    cur[headers[i]] = temp[i];
            }
            res.push(cur);
        }

        /*data.forEach(function(temp){
            var i=0;
            cur ={};
           // console.log(temp);
            for (var i = 0; i <= temp.length - 1; i++) {
                    cur[headers[i]] = temp[i];
            }
            res.push(cur);
            
            

            });*/
        var content = fs.readFileSync("state_marker.json");
        //console.log(content);
        var jsonContent = JSON.parse(content);
    //console.log(headers);
      cb(jsonContent);
    }



