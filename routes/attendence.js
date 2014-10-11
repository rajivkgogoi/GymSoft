var user = require('../data/models/user');
var Vendors = require('../data/models/vendor');
var attendence = require('../data/models/attendence');
var moment = require('moment')

module.exports = function(app) 
{
	//Called by the Create Equipment on the Release details Page
	  app.post('/attendence/save', function(req, res) {
	  console.log("DEBUG:/POST/attendence/save:centername Name " + req.body.centername);
	  console.log("DEBUG:/POST/attendence/save:address "+ req.body.address);
	  console.log("DEBUG:/POST/attendence/save:email "+ req.body.email);
	  console.log("DEBUG:/POST/attendence/save:owner "+ req.body.owner);
	  console.log("DEBUG:/POST/attendence/save:startDate "+ req.body.startDate);
	  var lpost
	  
	console.log("DEBUG:/POST/attendence/save:vendorname "+ req.session.user);
	  Vendors.findOne({ 'vendorname': req.session.user }, 'vendornumber', function (err, vendor) {
	  attendence.findOne({}, {}, { sort: { 'attendencesnumber' : -1 } }, function(err, post) {
	  if(post){
	  	lpost = post.attendencenumber;
	  }
	  console.log( "DEBUG:/attendence/save: last old attendence Number" + post  + lpost)
	  console.log( "DEBUG:/attendence/save: vendor.vendor number " + vendor.vendornumber)
	  if(lpost)	
	  {
	  	lpost = lpost + 1;
	  }else
	  {
	  	lpost=1
	  }
	  console.log( "DEBUG:/attendence/CREATE: last Updated attendence Number "   + lpost)
	
	  if (req.body.attendencename) {
		 var thor = new attendence({
		 usernumber: req.body.usernumber,
		 attendencenumber: lpost,
		 vendornumber: vendor.vendornumber,
		
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
	
	
	app.post('/attendence/create', function(req, res) {
		console.log("DEBUG:/GET/SESSION_USER:Inside session This will Render Views from /views/session/user");
		res.render('modules/registerattendence', {title: "Welcome to Facility Management" ,session: req.session});

	});
	
	
	app.post('/attendence/update', function(req, res) {
		attendence.findOne({attendencenumber: req.body.attendencenumber},function (err,attendence) {
		console.log("DEBUG:/GET/SESSION_USER:Inside Update Call " + require('util').inspect(attendence, {depth:null}));
		res.render('modules/updateattendenceform', {title: "Update attendences" ,session: req.session,attendence:attendence,moment:moment});
	});
	});
	app.post('/attendence/updatesave', function(req, res) {
		console.log("DEBUG:/GET/SESSION_USER:Inside session This will Render Views from /views/session/user");
		attendence.findOne({attendencenumber: req.body.attendencenumber},  function (err,attendence) {
		 if (attendence) {
		 if(req.body.attendencename)
			attendence.attendencename= req.body.attendencename;
		 if(req.body.attendencePrice)
			attendence.attendencePrice= req.body.attendencePrice;
		 if(req.body.manufacturer)
			attendence.manufacturer= req.body.manufacturer;
		 if(req.body.Purchasedate)
		 attendence.Purchasedate= req.body.Purchasedate;
		 if(req.body.Numberofunits)
		 attendence.Numberofunits=req.body.Numberofunits;
		 if(req.body.description)
		 attendence.description= req.body.description;
		 if(req.body.Image)
		 attendence.Image= req.body.Image;
		 attendence.Currentstatus= "Deployed";
		attendence.save(function(err, thor) {
		  if (err) return console.error(err);
			console.dir(attendence);
	    });
			 
		console.log("DEBUG:/GET/SESSION_USER:Inside session This will Render Views from /views/session/user");
		res.render('modules/vendorviews', {title: "Details attendences" ,session:req.session,ListProduct:null,moment:moment});
		}
	});
		
	});
	
	app.post('/attendence/display', function(req, res) {
	Vendors.findOne({ 'vendorname': req.session.user }, 'vendornumber', function (err, vendor) {
	user.find({ $and : [{  status:"Active" },{ vendornumber:vendor.vendornumber}]}).exec( function ( err, users ){
	attendence.find({'vendornumber': vendor.vendornumber}).exec( function ( err, attendees ){
	console.log("DEBUG:/GET/Attendence:");
	res.render('modules/attendenceview', {title: "Details of attendences" ,session:req.session,Listuser:user,
	Listattendence:attendees,moment:moment});
	
	});
	});
	});
	});
	
	app.post('/attendence/findpage', function(req, res) {
		console.log("DEBUG:/GET/SESSION_USER:Inside session This will Render Views from /views/session/user");
		res.render('modules/findattendence', {title: "Search and Modify attendences" ,session: req.session,ListProduct:null,moment:moment});

	});
	app.post('/attendence/findresult', function(req, res) {
		var random = 11111;
		console.log("DEBUG:/SERach Advance serach" +  req.body.Advancedsearch);
		 Vendors.findOne({ 'vendorname': req.session.user }, 'vendornumber', function (err, vendor) {
		if(req.body.attendencename && (req.body.Advancedsearch != 1)){
		 var regex = new RegExp(req.body.attendencename, "i"),
		 query = { $and : [{ attendencename: regex },{ vendornumber:vendor.vendornumber}]};
		}
		//we are at advance search
		else 
		{
			
			if(req.body.attendencePrice) {
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
			if(req.body.Purchasedate)
			{	
				    random= random -10000;
			}
		}
		
		console.log("DEBUG:/SERach Advance search Random" +  random);
		switch(random)
		{
		case 11110:
			query = { $and : [{ attendencePrice: { $gt : req.body.attendencePrice}},{ vendornumber:vendor.vendornumber}]};
			break;
		case 11101:
			query = { $and : [{ attendencePrice: { $lt : req.body.attendencePrice}},{ vendornumber:vendor.vendornumber}]};
			break;
		case 11011:
			query = { $and : [{attendencePrice:  req.body.attendencePrice},{ vendornumber:vendor.vendornumber}]};
			break;			
		case 10111:
			var regex = new RegExp(req.body.manufacturer, "i");
			console.log("DEBUG:/SERach Advance search manufacturer" +  req.body.manufacturer);
			query = { $and : [{manufacturer: regex},{ vendornumber:vendor.vendornumber}]};	
			break;
		case 10110:
			var regex = new RegExp(req.body.manufacturer, "i"),
			query = { $and : [{  manufacturer: regex },{attendencePrice: { $gt : req.body.attendencePrice}},{ vendornumber:vendor.vendornumber}]};
			break;
		case 10101:
			var regex = new RegExp(req.body.manufacturer, "i"),
			query = { $and : [{  manufacturer: regex },{attendencePrice: { $lt : req.body.attendencePrice}},{ vendornumber:vendor.vendornumber}]};
			break;
		case 10011:
			var regex = new RegExp(req.body.manufacturer, "i"),
			query = { $and : [{  manufacturer: regex },{attendencePrice: req.body.attendencePrice},{ vendornumber:vendor.vendornumber}]};
			break;
		case 1111:
			var regex = new RegExp(req.body.manufacturer, "i"),
			query = { $and : [{  manufacturer: regex },{Purchasedate: req.body.Purchasedate},{ vendornumber:vendor.vendornumber}]};
			break;
			
		}
		
		if(query){
		console.log("DEBUG:/SERach Advance search QUERYr" +  require('util').inspect(query, {depth:null}));
		 Vendors.findOne({ 'vendorname': req.session.user }, 'vendornumber', function (err, vendor) {
		attendence.find(query).exec( function ( err, attendences ){
		//attendence.find(query).sort({"updated_at":-1}).sort({"created_at":-1}).limit(20).exec( function ( err, attendences ){
		console.log("DEBUG:/SERach results"+ require('util').inspect(attendences, {depth:null}) );
		res.render('modules/findattendence', {title: "Search Results" ,session: req.session,ListProduct:attendences,moment:moment});
		});
	});
	}
	
	});
	});
};