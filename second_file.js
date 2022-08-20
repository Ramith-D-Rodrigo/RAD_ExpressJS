var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.send('GET route on second_file');
});

router.post('/', function(req, res){
    res.send('POST route on second_file');
});

module.exports = router;