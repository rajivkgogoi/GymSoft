var plan = require('../data/models/plan');
var Vendors = require('../data/models/vendor');
var moment = require('moment')

module.exports = function(app) 
{

	//Called by the Create plan on the Release details Page
	  app.post('/plan/save', function(req, res) {
	  console.log("DEBUG:/POST/plan/save:planname Name " + req.body.planname);
	  console.log("DEBUG:/POST/plan/save:plantype "+ req.body.plantype);
	  console.log("DEBUG:/POST/plan/save:duration "+ req.body.duration);
	  console.log("DEBUG:/POST/plan/save:timings "+ req.body.timings);
	  console.log("DEBUG:/POST/plan/save:startDate "+ req.body.startDate);
	  var lpost
	  
	console.log("DEBUG:/POST/plan/save:vendorname "+ req.session.user);
	  Vendors.findOne({ 'vendorname': req.session.user }, 'vendornumber', function (err, vendor) {
	  plan.findOne({}, {}, { sort: { 'plannumber' : -1 } }, function(err, post) {
	  if(post){
	  	lpost = post.plannumber;
	  }
	  console.log( "DEBUG:/plan/save: last old plan Number" + post  + lpost)
	  console.log( "DEBUG:/plan/save: vendor.vendor number " + vendor.vendornumber)
	  if(lpost)	
	  {
	  	lpost = lpost + 1;
	  }else
	  {
	  	lpost=1
	  }
	  console.log( "DEBUG:/plan/CREATE: last Updated plan Number "   + lpost)
	
	  if (req.body.planname) {
		 var thor = new plan({
		 planname: req.body.planname,
		 plannumber: lpost,
		 vendornumber: vendor.vendornumber,
		 planPrice: req.body.planPrice,
		 timings: req.body.timings,
		 startDate: req.body.startDate,
		 MaxEnrolls:req.body.MaxEnrolls,
		 description: req.body.description,
		 Duration: req.body.Duration,
		 Currentstatus: req.body.Currentstatus,
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
	
	
	app.post('/plan/create', function(req, res) {
		console.log("DEBUG:/GET/SESSION_USER:Inside session This will Render Views from /views/session/user");
		res.render('modules/PlanaddForm', {title: "Create a new Plan" ,session: req.session});

	});
	
	
	app.post('/plan/update', function(req, res) {
		plan.findOne({plannumber: req.body.plannumber},function (err,plan) {
		console.log("DEBUG:/GET/SESSION_USER:Inside Update Call " + require('util').inspect(plan, {depth:null}));
		res.render('modules/updateplanform', {title: "Update plans" ,session: req.session,plan:plan,moment:moment});
	});
	});
	app.post('/plan/updatesave', function(req, res) {
		console.log("DEBUG:/GET/SESSION_USER:Inside session This will Render Views from /views/session/user");
		plan.findOne({plannumber: req.body.plannumber},  function (err,plan) {
		 if (plan) {
		 if(req.body.planname)
			plan.planname= req.body.planname;
		 if(req.body.planPrice)
			plan.planPrice= req.body.planPrice;
		 if(req.body.timings)
			plan.timings= req.body.timings;
		 if(req.body.startDate)
		 plan.startDate= req.body.startDate;
		 if(req.body.MaxEnrolls)
		 plan.MaxEnrolls=req.body.MaxEnrolls;
		 if(req.body.description)
		 plan.description= req.body.description;
		 if(req.body.Duration)
		 plan.Duration= req.body.Duration;
		 plan.Currentstatus= req.body.Currentstatus;
		plan.save(function(err, thor) {
		  if (err) return console.error(err);
			console.dir(plan);
	    });
			 
		console.log("DEBUG:/GET/SESSION_USER:Inside session This will Render Views from /views/session/user");
		res.render('modules/vendorviews', {title: "Details plans" ,session:req.session,ListProduct:null,moment:moment});
		}
	});
		
	});
	
	app.post('/plan/details', function(req, res) {
	plan.findOne({plannumber: req.body.plannumber }, 'password', function (err,plan) {
		 if (plan) {
		console.log("DEBUG:/GET/SESSION_USER:Inside session This will Render Views from /views/session/user");
		res.render('modules/detailsplan', {title: "Details plans" ,session: req.session,ListProduct:null,moment:moment});
		}
	});
	});
	
	app.post('/plan/findpage', function(req, res) {
		console.log("DEBUG:/GET/SESSION_USER:Inside session This will Render Views from /views/session/user");
		res.render('modules/planfindresults', {title: "Search and Modify plans" ,session: req.session,ListProduct:null,moment:moment});

	});
	app.post('/plan/findresult', function(req, res) {
		var random = 11111;
		console.log("DEBUG:/SERach Advance serach" +  req.body.Advancedsearch);
		 Vendors.findOne({ 'vendorname': req.session.user }, 'vendornumber', function (err, vendor) {
		if(req.body.planname && (req.body.Advancedsearch != 1)){
		 var regex = new RegExp(req.body.planname, "i"),
		 query = { $and : [{ planname: regex },{ vendornumber:vendor.vendornumber}]};
		}
		//we are at advance search
		else 
		{
			
			if(req.body.planPrice) {
				if(req.body.type == "Greater than")
					random= random -1;
				else if(req.body.type == "Less than")
					random= random -10;
				else
					random= random -100;
			}
			if(req.body.timings)
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
			query = { $and : [{ planPrice: { $gt : req.body.planPrice}},{ vendornumber:vendor.vendornumber}]};
			break;
		case 11101:
			query = { $and : [{ planPrice: { $lt : req.body.planPrice}},{ vendornumber:vendor.vendornumber}]};
			break;
		case 11011:
			query = { $and : [{planPrice:  req.body.planPrice},{ vendornumber:vendor.vendornumber}]};
			break;			
		case 10111:
			var regex = new RegExp(req.body.timings, "i");
			console.log("DEBUG:/SERach Advance search timings" +  req.body.timings);
			query = { $and : [{timings: regex},{ vendornumber:vendor.vendornumber}]};	
			break;
		case 10110:
			var regex = new RegExp(req.body.timings, "i"),
			query = { $and : [{  timings: regex },{planPrice: { $gt : req.body.planPrice}},{ vendornumber:vendor.vendornumber}]};
			break;
		case 10101:
			var regex = new RegExp(req.body.timings, "i"),
			query = { $and : [{  timings: regex },{planPrice: { $lt : req.body.planPrice}},{ vendornumber:vendor.vendornumber}]};
			break;
		case 10011:
			var regex = new RegExp(req.body.timings, "i"),
			query = { $and : [{  timings: regex },{planPrice: req.body.planPrice},{ vendornumber:vendor.vendornumber}]};
			break;
		case 1111:
			var regex = new RegExp(req.body.timings, "i"),
			query = { $and : [{  timings: regex },{startDate: req.body.startDate},{ vendornumber:vendor.vendornumber}]};
			break;
			
		}
		
		if(query){
		console.log("DEBUG:/SERach Advance search QUERYr" +  require('util').inspect(query, {depth:null}));
		 Vendors.findOne({ 'vendorname': req.session.user }, 'vendornumber', function (err, vendor) {
		plan.find(query).exec( function ( err, plans ){
		//plan.find(query).sort({"updated_at":-1}).sort({"created_at":-1}).limit(20).exec( function ( err, plans ){
		console.log("DEBUG:/SERach results"+ require('util').inspect(plans, {depth:null}) );
		res.render('modules/planfindresults', {title: "Search Results" ,session: req.session,ListProduct:plans,moment:moment});
		});
		
		
	});
	}
	
	});
	});
};