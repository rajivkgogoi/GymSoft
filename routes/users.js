var expressValidator = require('express-validator')
var moment = require('moment')
console.log("DEBUG:/GET/USERS:******************MODEL USE STARTS***************************************");
module.exports = function(app) 
{
	 app.get('/users', function(req, res){
		console.log("DEBUG:/GET/USERS:Inside the user List in router This is Suppose to Render Views from /views/user/index");
		
		console.log("DEBUG:/GET/USERS:json Object is " + req.session.user);
		console.log("DEBUG:/GET/USERS:******************MODEL USE STARTS***************************************");
	
		// query db for all todo items
				console.log("DEBUG:/GET/USERS:json Object is " + req.session.user);
				res.render('modules/vendorviews', {title: 'Wellcome ' + req.session.user, session: req.session});
  });
};