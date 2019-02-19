var express = require('express');
var appExpress = express();
var path = require("path");
var fs = require("fs");
var inspect = require('object-inspect');

var http = require('http').Server(appExpress);

const bodyParser = require('body-parser');

const middlewares = [
    express.static(path.join('client_public')),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true })
];

appExpress.use(middlewares);

appExpress.get('/', function(req, res){
    res.sendFile(path.resolve(__dirname + './../client/views/index.html'));
});

delete(appExpress.cache);

//https://stackoverflow.com/questions/15693192/heroku-node-js-error-web-process-failed-to-bind-to-port-within-60-seconds-of
//Heroku dynamically assigns your app a port, so you can't set the port to a fixed number. Heroku adds the port to the env
http.listen( process.env.PORT || 5000, function() {
    let port= process.env.PORT || 5000;
});

exports.webapp = appExpress;
