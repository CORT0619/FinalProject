// required modules
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

// make connection to mongodb
var uri = 'mongodb://localhost/StarLink';
mongoose.connect(uri);

var db = mongoose.connection;
db.on('err', console.error.bind(console, 'connection err:'));
db.once('open', function(){
	console.log('Connected.');
});


// expressjs routes

	app.get('/', function(req, res){
		res.sendFile(__dirname + '/views/index.html');
	});

	app.get('/register', function(req, res){
		res.sendFile(__dirname + '/views/register.html');
	});

	app.post('/register', function(req, res){
		console.log("name is ", req.body.name);
		console.log("username ", req.body.user);

		console.log("name2 is ", req.body.name);
		console.log("username2 ", req.body.user);
	});

	app.get('/dash', function(req, res){
		res.sendFile(__dirname + '/views/dashboard.html');
	})

	// route for uploads
	app.get('/uploads', function(req, res){
		res.sendFile(__dirname + '/views/uploads.html');
	})

	// route for profile
	app.get('/profile/:id', function(req, res){
		res.sendFile(__dirname + '/views/profile.html');
	});

	// route for viewing studdents
	app.get('/students', function(req, res){
		res.sendFile(__dirname + '/views/students.html');
	});

	// default route
	app.use('/', function(req, res){
		res.sendFile(__dirname + '/views/index.html');
	})


// app listener
app.listen(PORT, function(){
	console.log('Listening on PORT', PORT);
});