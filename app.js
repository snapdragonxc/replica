var express = require('express'),
path = require('path'),
app = express(); 
var config = require('./config.js');
//
//set the port
app.set('port', config.port); 
//tell express that we want to use the www folder
//for our static assets
app.use(express.static(path.join(__dirname, './www')));
// Listen for requests
var server = app.listen(app.get('port'), function () {
  console.log('The server is running on http://localhost:' + app.get('port'));
});