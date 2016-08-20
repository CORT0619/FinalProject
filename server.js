var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use(express.static(process.cwd() + '/public'));


app.get('/', function(req, res){
	res.sendFile(__dirname + '/views/index.html');
});


app.listen(PORT, function(){
	console.log('Listening on PORT', PORT);
});