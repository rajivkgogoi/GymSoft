var utils = require('util');
module.exports = function(app) 
{
	app.get('/', function(req, res){
		console.log("Inside the first Route Index ");
		 //res.render('index', { title: 'Express' , session : req.session})
		 res.redirect('/session/user')
	});
};

