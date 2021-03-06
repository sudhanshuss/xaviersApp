var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var db = require('./db.js');
var bcrypt = require('bcryptjs');
var middleware = require('./middleware.js')(db);


var app = express();
var PORT = process.env.PORT || 3000;
var http = require('http').Server(app);
var todos = [];
var todoNextId = 1;

app.use(express.static(__dirname + '/public',{index: 'html/login.html'}));

app.use(bodyParser.json());

/*app.get('/', function(req, res) {
	console.log("came here!");
	res.send('Todo API Root');
});*/




app.post('/users', function(req, res) {
	var body = _.pick(req.body, 'email', 'password');

	db.user.create(body).then(function(user) {
		res.json(user.toPublicJSON());
	}, function(e) {
		res.status(400).json(e);
	});
});

// POST /users/login
app.post('/users/login', function(req, res) {
	var body = _.pick(req.body, 'email', 'password');
	var userInstance;

	db.user.authenticate(body).then(function(user) {
		var token = user.generateToken('authentication');
		userInstance = user;

		return db.token.create({
			token: token
		});
	}).then(function(tokenInstance) {
		res.header('Auth', tokenInstance.get('token')).json(userInstance.toPublicJSON());
	}).catch(function() {
		res.status(401).send();
	});
});

// DELETE /users/login
app.delete('/users/login', middleware.requireAuthentication, function(req, res) {
	req.token.destroy().then(function() {
		res.status(204).send();
	}).catch(function() {
		res.status(500).send();
	});
});

// POST student/register
app.post('/student/register',middleware.requireAuthentication, function(req, res) {
	debugger;
	var body = _.pick(req.body, 'firstName', 'middlename', 'lastName', 'dob', 'dateOfAdmission', 'classOfAdmission',
		'communicationAddress', 'fatherName', 'motherName', 'fatherOccupation', 'motherOccupation', 'mobile',
		'telephone', 'permanentaddress', 'previousSchoolName', 'previousSchoolclass', 'transferCertificate',
		'previousSchooltelephone', 'previousSchoolAddress');

	db.student.create(body).then(function(student) {
		res.json(student.toJSON());
	}, function(e) {
		res.status(400).json(e);
	});
});

db.sequelize.sync({
}).then(function() {
	http.listen(PORT, function() {
		console.log('Express listening on port ' + PORT + '!');
	});
});