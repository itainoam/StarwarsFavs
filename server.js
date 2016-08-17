var http = require('http');
var express = require('express');
var port = 3000;

var server = express();

server.use(express.static('public'));

server.listen(port, function() {
    console.log('server listening on port ' + port);
});