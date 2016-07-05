var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var connect = require('connect');

var db = require('./db.js');
var bcrypt = require('bcryptjs');
var middleware = require('./middleware.js')(db);

var oneDay = 60000;
var app = express();
var app1= connect();
var PORT = process.env.PORT || 3000;
var http = require('http').Server(app);
var todos = [];
var todoNextId = 1;

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.get('/html', function(req, res) {
	res.send('Todo API Root');
});



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

db.sequelize.sync({
	//force: true
}).then(function() {
	http.listen(PORT, function() {
		console.log('Express listening on port ' + PORT + '!');
	});
});