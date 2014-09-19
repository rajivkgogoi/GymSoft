var user = require('../data/models/user');
var Vendors = require('../data/models/vendor');
var plan = require('../data/models/plan');
var moment = require('moment')




module.exports = function(app) 
{
	//Called by the Create user on the Release details Page
	  app.post('/user/save', function(req, res) {
	  console.log("DEBUG:/POST/user/save:username Name " + req.body.username);
	  console.log("DEBUG:/POST/user/save:address "+ req.body.address);
	  console.log("DEBUG:/POST/user/save:mobilenumber "+ req.body.mobilenumber);
	  console.log("DEBUG:/POST/user/save:owner "+ req.body.owner);
	  console.log("DEBUG:/POST/user/save:startDate "+ req.body.startDate);
	  var lpost
	  
	console.log("DEBUG:/POST/user/save:vendorname "+ req.session.user);
	  Vendors.findOne({ 'vendorname': req.session.user }, 'vendornumber', function (err, vendor) {
	  user.findOne({}, {}, { sort: { 'usersnumber' : -1 } }, function(err, post) {
	  plan.findOne({}, {}, {  'plannumber' : req.body.planname}, function(err, plans) {
	  if(post){
	  	lpost = post.usernumber;
	  }
	  console.log( "DEBUG:/user/save: last old user Number" + post  + lpost)
	  console.log( "DEBUG:/user/save: vendor.vendor number " + vendor.vendornumber)
	  if(lpost)	
	  {
	  	lpost = lpost + 1;
	  }else
	  {
	  	lpost=1
	  }
	  console.log( "DEBUG:/user/CREATE: last Updated user Number "   + lpost)
	  
	  if (req.body.username) {
		 var thor = new user({
		 username: req.body.username,
		 usernumber: lpost,
		 vendornumber: vendor.vendornumber,
		 plannumber: plans.plannumber,
		 address: req.body.address,
		 Image: req.body.Image,
		 level: req.body.level,
		 startDate:req.body.startDate,
		});

		thor.save(function(err, thor) {
		  if (err) return console.error(err);
			console.dir(thor);
	    });
	  }
	  res.render('modules/vendorviews', {title: 'Wellcome ' + req.session.user, session: req.session});
	  });
	   });
	    });
	});
	
	
	app.post('/user/create', function(req, res) {
		console.log("DEBUG:/GET/SESSION_USER:Inside session This will Render Views from /views/session/user");
		res.render('modules/useraddForm', {title: "Welcome to User Management" ,session: req.session});

	});
	
	
	app.post('/user/update', function(req, res) {
		user.findOne({usernumber: req.body.usernumber},function (err,user) {
		console.log("DEBUG:/GET/SESSION_USER:Inside Update Call " + require('util').inspect(user, {depth:null}));
		res.render('modules/updateuserform', {title: "Update users" ,session: req.session,user:user,moment:moment});
	});
	});
	app.post('/user/updatesave', function(req, res) {
		console.log("DEBUG:/GET/SESSION_USER:Inside session This will Render Views from /views/session/user");
		user.findOne({usernumber: req.body.usernumber},  function (err,user) {
		plan.findOne({}, {}, {  'plannumber' : req.body.planname}, function(err, plans) {
		 if (user) {
		 if(req.body.username)
			user.username= req.body.username;
		 if(req.body.plannumber)
			user.plannumber= plans.plannumber;
		 if(req.body.startDate)
			user.startDate= req.body.startDate;
		 if(req.body.address)
		 user.address= req.body.address;
		 if(req.body.Image)
		 user.Image= req.body.Image;
		  if(req.body.level)
		 user.level= req.body.level;
		user.save(function(err, thor) {
		  if (err) return console.error(err);
			console.dir(user);
	    });
			 
		console.log("DEBUG:/GET/SESSION_USER:Inside session This will Render Views from /views/session/user");
		res.render('modules/vendorviews', {title: "Details users" ,session:req.session,ListProduct:null,moment:moment});
		}
	});
	});
		
	});
	
	app.post('/user/details', function(req, res) {
	user.findOne({usernumber: req.body.usernumber } , function (err,user) {
		 if (user) {
		console.log("DEBUG:/GET/SESSION_USER:Inside session This will Render Views from /views/session/user");
		res.render('modules/detailsuser', {title: "Details users" ,session: req.session,ListProduct:null,moment:moment});
		}
	});
	});
	
	app.post('/user/findpage', function(req, res) {
		console.log("DEBUG:/GET/SESSION_USER:Inside session This will Render Views from /views/session/user");
		res.render('modules/finduser', {title: "Search and Modify users" ,session: req.session,users:null,moment:moment});

	});
	app.post('/user/findresult', function(req, res) {
		var random = 11111;
		console.log("DEBUG:/SERach Advance serach" +  req.body.Advancedsearch);
		 Vendors.findOne({ 'vendorname': req.session.user }, 'vendornumber', function (err, vendor) {
		if(req.body.username && (req.body.Advancedsearch != 1)){
		 var regex = new RegExp(req.body.username, "i"),
		 query = { $and : [{ username: regex },{ vendornumber:vendor.vendornumber}]};
		}
		//we are at advance search
		else 
		{
			
			if(req.body.plannumber) {
				if(req.body.type == "Greater than")
					random= random -1;
				else if(req.body.type == "Less than")
					random= random -10;
				else
					random= random -100;
			}
			if(req.body.manufacturer)
			{
					random= random -1000;
			}
			if(req.body.startDate)
			{	
				    random= random -10000;
			}
		}
		
		console.log("DEBUG:/SERach Advance search Random" +  random);
		switch(random)
		{
		case 11110:
			query = { $and : [{ plannumber: { $gt : req.body.plannumber}},{ vendornumber:vendor.vendornumber}]};
			break;
		case 11101:
			query = { $and : [{ plannumber: { $lt : req.body.plannumber}},{ vendornumber:vendor.vendornumber}]};
			break;
		case 11011:
			query = { $and : [{plannumber:  req.body.plannumber},{ vendornumber:vendor.vendornumber}]};
			break;			
		case 10111:
			var regex = new RegExp(req.body.manufacturer, "i");
			console.log("DEBUG:/SERach Advance search manufacturer" +  req.body.manufacturer);
			query = { $and : [{manufacturer: regex},{ vendornumber:vendor.vendornumber}]};	
			break;
		case 10110:
			var regex = new RegExp(req.body.manufacturer, "i"),
			query = { $and : [{  manufacturer: regex },{plannumber: { $gt : req.body.plannumber}},{ vendornumber:vendor.vendornumber}]};
			break;
		case 10101:
			var regex = new RegExp(req.body.manufacturer, "i"),
			query = { $and : [{  manufacturer: regex },{plannumber: { $lt : req.body.plannumber}},{ vendornumber:vendor.vendornumber}]};
			break;
		case 10011:
			var regex = new RegExp(req.body.manufacturer, "i"),
			query = { $and : [{  manufacturer: regex },{plannumber: req.body.plannumber},{ vendornumber:vendor.vendornumber}]};
			break;
		case 1111:
			var regex = new RegExp(req.body.manufacturer, "i"),
			query = { $and : [{  manufacturer: regex },{startDate: req.body.startDate},{ vendornumber:vendor.vendornumber}]};
			break;
			
		}
		
		if(query){
		console.log("DEBUG:/SERach Advance search QUERYr" +  require('util').inspect(query, {depth:null}));
		 Vendors.findOne({ 'vendorname': req.session.user }, 'vendornumber', function (err, vendor) {
		user.find(query).exec( function ( err, users ){
		//user.find(query).sort({"updated_at":-1}).sort({"created_at":-1}).limit(20).exec( function ( err, users ){
		console.log("DEBUG:/SERach results"+ require('util').inspect(users, {depth:null}) );
		res.render('modules/finduser', {title: "Search Results" ,session: req.session,users:users,moment:moment});
		});
		
		
	});
	}
	
	});
	});
};