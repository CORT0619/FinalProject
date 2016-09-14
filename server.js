// required modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var crypto = require('crypto');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var fs = require('fs');

var formidable = require('formidable');

// make connection to mongodb
var uri = process.env.MONGODB_URI;
	//var uri = 'mongodb://localhost/StarLink';
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
	accType	: String,
	phone	: String,
	uploads : []
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

			if(!user) return done(null, false/*, req.flash('message', 'Incorrect login name or password')*/);

			var encryptIt = encryptPass(password);
			//var encryptIt = crypto.createHmac('sha512', password).update(hash).digest('hex');

			if(user.pass != encryptIt){

			 	return done(null, false/*, req.flash('message', 'Incorrect login name or password')*/);
			}

			req.session.user = user.username;
			req.session.id = user._id.toString();

			return done(null, user);
		});
		
	}
));


//configure passport
passport.serializeUser(function(user, done){
	var sessUser = {_id: user._id, name: user.name, username: user.username, email: user.email, school: user.school, role: user.accType, phone: user.phone};

	done(null, sessUser);
});

passport.deserializeUser(function(sessUser, done){

	User.findOne({username: sessUser.username}, function(err, user){
		if(err) return done(err);

		done(null, sessUser);
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
				 cookie: {maxAge: 300000}}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());




// protect secure pages
var auth = function(req, res/*, next*/){
	if(!req.isAuthenticated()){
		res.send(401);
	} else {
		//next();

		console.log("req.user ", req.user);
		res.send(200, req.user);
	}
}

// encrypt password
function encryptPass(password){
	return crypto.createHmac('sha512', password).update(hash).digest('hex');
}



// expressjs routes

	app.post('/', function(req, res){

	});

	app.get('/loggedin', function(req, res){
		res.send(req.isAuthenticated() ? req.user : '0');
	});

	app.get('/dash', auth);/*, function(req, res){*/

		// if(!req.isAuthenticated()){

		// 	res.json({url: '/'});
		// } 

	//});

	app.get('/register', function(req, res){
		res.sendFile(__dirname + '/views/register.html');
	});

	app.post('/register', function(req, res){

		//make sure password and confirm password are the same

		var updatedPass = crypto.createHmac('sha512', req.body.pass).update(hash).digest('hex');

		var newUser = new User({name: req.body.name, username: req.body.user, pass: updatedPass, email: req.body.email, school: req.body.school, accType: req.body.accType, phone: req.body.phone});

		newUser.save(function(err, newUser){
			if (err) return console.error(err);
		});

		res.send({});
	});

	app.get('/app/uploads/:file', function(req, res){

		var fileName = req.params.file;
		//console.log("request info ", req);
		console.log("file name ", file);
		var file = 'app/uploads' + fileName;;

		//res.send({});
		res.download(file);

	});


	app.post('/login', passport.authenticate('local', { /*successRedirect: '/dash', failureRedirect: '/login',*/ failureFlash: 'Incorrect login name or password'}), function(req, res){

		//console.log("blah ", req.flash('message')[0]);

		console.log("authenticated ", req.isAuthenticated());

		if(req.isAuthenticated()){

			//res.json({url: '/dash'});
			//res.json({req.session});
			//res.send(200);
			res.send(req.session);
		} else {
			res.send(401);
		}

	});


	// route for uploads
	app.post('/uploads', function(req, res){

		var username = req.user.username; 

		var dateTime = new Date().getTime();
 		
		console.log("posted");

		var form = new formidable.IncomingForm();

		form.parse(req);

		form.on('fileBegin', function(name, file){
			//file.path = __dirname + '/uploads/' + new Date().getTime() + " - " + file.name;
			file.path = __dirname + '/uploads/' + dateTime + " - " + file.name;  
		});

		form.on('file', function(name, file){

			console.log('Uploaded ' + file.name);

			var item = {
				name: dateTime + " - " + file.name,
				size: file.size,
				path: __dirname + '/uploads/' + dateTime + " - " + file.name
				//path: __dirname + '/uploads/' + new Date().getTime() + " - " + file.name
			}

			console.log('username ', username);
			//User.findOneAndUpdate({'username': username}, {$push: {'uploads': item}}, {safe: true, upsert: true}
			User.findOne({'username': username}).exec(function(err, user){
				if(err) return err;

				user.uploads.push(item);
				user.save(function(){
					res.send(user)
				});
			})
		});


		//res.status(200).send(file);
		// res.send("ok");

	});

	// route for viewing students
	app.get('/students', function(req, res){

		User.find({'accType': 'stud'}, '_id name username email school accType phone uploads', function(err, user){
			if(err) return err;

			res.send(user);
		});
	});

	// update user info
	app.post('/profile', function(req, res){

		var password = encryptPass(req.body.password);
		User.findOneAndUpdate({username: req.body.username}, {pass: password}, function(err, user){
		
				if(err) return err;

				res.send("Profile updated successfully!");
		});
	});

	app.get('/logout', function(req, res){
		req.logout();
		req.session.destroy(function(err){
			if(err) return err;
		})
		res.redirect('/');

		console.log("am i authenticated ", req.isAuthenticated());
	});


// app listener
app.listen(PORT, function(){
	console.log('Listening on PORT', PORT);
});