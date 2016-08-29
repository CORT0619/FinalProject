// required modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var crypto = require('crypto');
var session = require('express-session');
var cookieParser = require('cookie-parser');


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

//crypto
const hash = "Hash that password683";

// set passport local strategy
passport.use(new LocalStrategy({
	usernameField: 'user',
	passwordField: 'pass',
	passReqToCallback: true
},
	function(req, username, password, done){
		User.findOne({username: username}, function(err, user){
			if(err) return done(err);

			if(!user) return done(null, false, /*{message: 'Incorrect login name or password'}*/req.flash('message', 'Incorrect login name or password'));

			var encryptIt = crypto.createHmac('sha512', password).update(hash).digest('hex');

			if(user.pass != encryptIt){

			 	return done(null, false, req.flash('message', 'Incorrect login name or password')/*{message: 'Incorrect login name or password.'}*/);
			}

			console.log("user ", user);

			req.session.user = user.username;
			req.session.id = user._id.toString();

			console.log("id ", req.session.id);




			return done(null, user);
		});
		
	}
));


//configure passport
passport.serializeUser(function(user, done){
	done(null, user.username);
});

passport.deserializeUser(function(username, done){

	User.findOne({username: username}, function(err, user){
		if(err) return done(err);

		done(null, user);
	});
});


var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(cookieParser());

app.use(express.static(process.cwd() + '/public'));
app.use(session({secret: 'cookies pretty',
				 saveUninitialized: false,
				 resave: false,
				 cookie: {maxAge: 180000}}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());











// expressjs routes

	app.get('/', function(req, res){

		if(req.isAuthenticated()){

			console.log("authenticated");
		}
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

	app.post('/login', passport.authenticate('local', { /*successRedirect: '/dash', failureRedirect: '/login',*/ failureFlash: true}), function(req, res){

		/*console.log("req.session ", req.session);
		console.log("req.session.user ", req.session.user);*/

		if(req.isAuthenticated()){

			//res.redirect('/dash');
			res.json({url: '/dash'});
		} 

	});

	app.get('/dash', function(req, res){


		console.log("req.session ", req.session);

		console.log("res.isAuthenticated() ", req.isAuthenticated());

		if(req.isAuthenticated()){

		//	console.log(req.session);
			//res.redirect('/dash');
			res.sendFile(__dirname + '/views/dashboard.html');
			//res.json({url: '/dash'});

		} else {
			//res.redirect ('/');
			res.sendFile(__dirname + '/views/index.html');
		}


	});

	// route for uploads
	app.get('/uploads', function(req, res){

		if(req.isAuthenticated()){
			console.log(req.session);
			res.sendFile(__dirname + '/views/uploads.html');

		} else {
			res.sendFile(__dirname + '/views/index.html');
		}

	})

	// route for profile
	app.get('/profile/:user', function(req, res){

		if(req.isAuthenticated()){
			console.log(req.session);
			res.sendFile(__dirname + '/views/profile.html');

		} else {
			res.sendFile(__dirname + '/views/index.html');
		}
	});

	// route for viewing studdents
	app.get('/students', function(req, res){
		if(res.isAuthenticated()){
			res.sendFile(__dirname + '/views/students.html');
		} else {
			res.sendFile(__dirname + '/views/index.html');
		}
		
	});

	app.get('/logout', function(req, res){
		req.logout();
		req.session.destroy(function(err){
			if(err) return err;
		})
		res.redirect('/');

		console.log("am i authenticated ", req.isAuthenticated());
	});

	// default route
	app.use('/', function(req, res){
		res.sendFile(__dirname + '/views/index.html');
	});


// app listener
app.listen(PORT, function(){
	console.log('Listening on PORT', PORT);
});