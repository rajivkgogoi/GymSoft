var utils = require('util');
module.exports = function(app) 
{
	app.get('/session/user', function(req, res) {
		console.log("DEBUG:/GET/SESSION_USER:Inside session This will Render Views from /views/session/user");
		res.render('session/index', {title: "Welcome to Gym Management" ,session: req.session});

	});

	app.get('/session/register', function(req, res) {
		console.log("DEBUG:/GET/SESSION_USER:Inside session This will Render Views from /views/session/user");
		res.render('modules/registervendor', {title: "Welcome to Gym Management" ,session: req.session});

	});
	
	app.get('/session/new', function(req, res) {
		console.log("DEBUG:/GET/SESSION_NEW:Inside session This will Render Views from /views/session/new");
		res.render('session/new', {title: "Log in" ,session: req.session});

	});
	
};