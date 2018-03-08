var express = require('express');
var path = require('path');
var router = express.Router();
var emailServiceRoute = require('./map.server.route');

router.use('/',emailServiceRoute);

/*router.get('*',function(req,res){
	res.sendFile('../public/home.html');
});*/

module.exports = router;