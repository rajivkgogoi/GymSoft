var Equipment = require('../data/models/gym_equipment');
var Vendors = require('../data/models/vendor');
var moment = require('moment')

module.exports = function(app) 
{
	//Called by the Create Equipment on the Release details Page
	  app.post('/equipment/save', function(req, res) {
	  console.log("DEBUG:/POST/Equipment/save:centername Name " + req.body.centername);
	  console.log("DEBUG:/POST/Equipment/save:address "+ req.body.address);
	  console.log("DEBUG:/POST/Equipment/save:email "+ req.body.email);
	  console.log("DEBUG:/POST/Equipment/save:owner "+ req.body.owner);
	  console.log("DEBUG:/POST/Equipment/save:startDate "+ req.body.startDate);
	  var lpost
	  

	  Vendors.findOne({ 'vendorname': req.session.user }, 'vendornumber', function (err, vendor) {
	  Equipment.findOne({}, {}, { sort: { 'Equipmentsnumber' : -1 } }, function(err, post) {
	  if(post){
	  	lpost = post.centername;
	  }
	  console.log( "DEBUG:/Equipment/save: last old Equipment Number" + post  + lpost)
	  console.log( "DEBUG:/Equipment/save: vendor.vendornumber " + vendor.vendornumber)
	  if(lpost)	
	  {
	  	lpost = lpost + 1;
	  }else
	  {
	  	lpost=1
	  }
	  console.log( "DEBUG:/Equipment/CREATE: last Updated Equipment Number "   + lpost)
	
	  if (req.body.Equipmentname) {
		 var thor = new Equipment({
		 Equipmentname: req.body.Equipmentname,
		 Equipmentnumber: lpost,
		 vendornumber: vendor.vendornumber,
		 EquipmentPrice: req.body.EquipmentPrice,
		 manufacturer: req.body.manufacturer,
		 Purchasedate: req.body.Purchasedate,
		 Numberofunits:req.body.Numberofunits,
		 description: req.body.description,
		 Image: req.body.Image,
		 Currentstatus: "Deployed",
		});

		thor.save(function(err, thor) {
		  if (err) return console.error(err);
			console.dir(thor);
	    });
	  }
	  res.redirect('/session/user')
	  });
	    });
	});
	
	
	app.post('/equipment/create', function(req, res) {
		console.log("DEBUG:/GET/SESSION_USER:Inside session This will Render Views from /views/session/user");
		res.render('modules/registerequipment', {title: "Welcome to Facility Management" ,session: req.session});

	});
	
	
	app.post('/equipment/findpage', function(req, res) {
		console.log("DEBUG:/GET/SESSION_USER:Inside session This will Render Views from /views/session/user");
		res.render('modules/findequipment', {title: "Search and MOdify Equipments" ,session: req.session});

	});
	
	app.post('/equipment/findresult', function(req, res) {
		console.log("DEBUG:/GET/SESSION_USER:Inside session This will Render Views from /views/session/user");
		res.render('modules/findequipment', {title: "Search results" ,session: req.session});

	});
	
};