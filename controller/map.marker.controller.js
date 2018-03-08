const Marker = require('../model/map.server.model');
const ExceptionController = require('./map.exception.controller');
const DB = require('../db');
const logger = require('../util/logger')
var mongoose = require('mongoose');
var db;
//Connect the db


module.exports.getNameList = function(req,res){
    console.log();
    DB.connect(function(d){
        db = d;
        Marker.find({},function(err,markers){
            if(err){
                DB.disconnect();
                ExceptionController.handleError(err,res); 
            } 
            DB.disconnect();
           // console.log(markers);
            res.send(markers);
        });
    });
    
}

module.exports.getOptions = function(req,res){
    DB.connect(function(d){
        db = d;
        Marker.find({},{Name:1},function(err,markers){
            if(err) {
                DB.disconnect();
                ExceptionController.handleError(err,res);
            }
            DB.disconnect();
           // console.log(markers);
            res.send(markers);
        });
    });
}

module.exports.insertMarkers = function(req,res){

    var marker = new Marker(req.body);
    marker.save(function(err){
        if(err) ExceptionController.handleError(err);
    });
}

module.exports.getMarkers = function(req,res){
    DB.connect(function(db){
        logger.debug("Request :"+req.body);
        var reqData = req.body;
        console.log(req.body);
        var resBody =[];
        reqData.forEach(function(r){
            Marker.findById(r._id,function(err,result){

                if(err) {
                    console.log(err);
                     DB.disconnect();
                    var errMsg= ExceptionController.handleError(err,res);
                    res.send(errMsg);
                }
                console.log(result);
                resBody.push(result);
                if(resBody.length == reqData.length){
                    sendResponse();
                }
            });
        });
        function sendResponse(){
            DB.disconnect();
             res.send(resBody);
        }        
    });
}





/*module.exports.getMarkers = function(req,res){
	console.log('markers called');
	console.log(req.body);
    try{
        var markers = req.body;
        parseXlsx('state_marker.xlsx', function(err, data) {
        if(err) throw err;
        // data is an array of arrays
        var headers = data[0];
        var result =[];
       

        data.forEach(function(temp){
            var i=0;
            cur ={};
           // console.log(temp);
            for (var i = 0; i <= temp.length - 1; i++) {
                    cur[headers[i]] = temp[i];
            }
            result.push(cur);
            
            

            });
        
        console.log(result);
    //console.log(headers);
       res.send(result);
    });
        
        //res.send(req.body);
    }catch(e){
        console.log(e);
    }
    
}*/