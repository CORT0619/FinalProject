// required modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var crypto = require('crypto');
var session = require('express-session');


// make connection to mongodb
var uri = 'mongodb://localhost/StarLink';
mongoose.connect(uri);

var db = mongoose.connection;
db.on('err', console.error.bind(console, 'connection err:'));
db.once('open', function(){
	console.log('Connected.');
});

//define a model
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var userSchema = new Schema({
	//userId	: ObjectId,
	name    : String,
	username: String,
	pass	: {},
	email	: String,
	school	: String,
	accType	: String
});

var User = mongoose.model
('User', userSchema);

// set passport local strategy
passport.use(new LocalStrategy({
	usernameField: 'user',
	passwordField: 'pass'
},
	function(username, password, done){
		console.log("here");
		User.findOne({username: username}, function(err, user){
			console.log(username);
			console.log("here2");
			if(err) return done(err);

			if(!user) return done(null, false, {message: 'Incorrect login name or password'});

			// if(user.password != password){
			// 	return done(null, false, {message: 'Incorrect login name or password.'});
			// }

			console.log("user ", user);

			return done(null, user);
		});
		
	}
));


//configure passport
passport.serializeUser(function(user, done){
	done(null, user.username);
});

passport.deserializeUser(function(username, done){
	User.findOne({username: user}, function(err, user){
		if(err) return done(err);

		done(null, user);
	})
})


var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use(express.static(process.cwd() + '/public'));
app.use(session({secret: 'cookies pretty',
				 resave: false,
				 saveUninitialized: false,
				 cookie: {secure: true, maxAge: 55000}}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());




//crypto
const hash = "Hash that password683";


// expressjs routes

	app.get('/', function(req, res){
		res.sendFile(__dirname + '/views/index.html');
	});

	app.get('/register', function(req, res){
		res.sendFile(__dirname + '/views/register.html');
	});

	app.post('/register', function(req, res){

		//make sure password and confirm password are the same

		var updatedPass = crypto.createHmac('sha512', req.body.pass).update(hash).digest('hex');

		var newUser = new User({name: req.body.name, username: req.body.user, pass: updatedPass, email: req.body.email, school: req.body.school, accType: req.body.accType});

		newUser.save(function(err, newUser){
			if (err) return console.error(err);
		});

		res.send({});
	});

	app.post('/login', passport.authenticate('local', { /*successRedirect: '/dash', failureRedirect: '/login', */failureFlash: true}), function(req, res){
		res.redirect('/dash');
	});

	app.get('/dash', function(req, res){
		res.sendFile(__dirname + '/views/dashboard.html');
	})

	// route for uploads
	app.get('/uploads', function(req, res){
		res.sendFile(__dirname + '/views/uploads.html');
	})

	// route for profile
	app.get('/profile/:user', function(req, res){
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