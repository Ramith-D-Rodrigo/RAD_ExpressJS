var express = require('express');
var app = express();

var second_file = require('./second_file.js');

app.use('/second_file', second_file);
app.listen(3000);