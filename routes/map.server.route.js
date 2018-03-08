var express = require('express');
var router = express.Router();

var controller = require('../controller/map.marker.controller');

router.get('/options',controller.getOptions);
router.post('/markers',controller.getMarkers);

module.exports = router;