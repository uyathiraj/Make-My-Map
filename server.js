const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const map_controler = require('./controller/map.marker.controller');
const excep_controller = require('./controller/map.exception.controller');

app.use(express.static('public'));

app.use(bodyParser.json());
const routes = require('./routes/');
app.use('/',routes);

app.listen(3000,function(){
	console.log('Server is listening on port 3000');
});


