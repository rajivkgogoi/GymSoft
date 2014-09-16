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
	  
	console.log("DEBUG:/POST/Equipment/save:vendorname "+ req.session.user);
	  Vendors.findOne({ 'vendorname': req.session.user }, 'vendornumber', function (err, vendor) {
	  Equipment.findOne({}, {}, { sort: { 'Equipmentsnumber' : -1 } }, function(err, post) {
	  if(post){
	  	lpost = post.Equipmentnumber;
	  }
	  console.log( "DEBUG:/Equipment/save: last old Equipment Number" + post  + lpost)
	  console.log( "DEBUG:/Equipment/save: vendor.vendor number " + vendor.vendornumber)
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
		var random = 11111;
		console.log("DEBUG:/SERach Advance serach" +  req.body.Advancedsearch);
		if(req.body.Equipmentname && (req.body.Advancedsearch != 1)){
		 var regex = new RegExp(req.body.Equipmentname, "i"),
		 query = { Equipmentname: regex };
		}
		//we are at advance search
		else 
		{
			
			if(req.body.EquipmentPrice) {
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
			query = { EquipmentPrice: { $gt : req.body.EquipmentPrice}};
			break;
		case 11101:
			query = { EquipmentPrice: { $lt : req.body.EquipmentPrice}};
			break;
		case 11011:
			query = { EquipmentPrice:  req.body.EquipmentPrice};
			break;			
		case 10111:
			var regex = new RegExp(req.body.manufacturer, "i");
			console.log("DEBUG:/SERach Advance search manufacturer" +  req.body.manufacturer);
			query = { manufacturer: regex};	
			break;
		case 10110:
			var regex = new RegExp(req.body.manufacturer, "i"),
			query = { $and : [{  manufacturer: regex },{EquipmentPrice: { $gt : req.body.EquipmentPrice}}]};
			break;
		case 10101:
			var regex = new RegExp(req.body.manufacturer, "i"),
			query = { $and : [{  manufacturer: regex },{EquipmentPrice: { $lt : req.body.EquipmentPrice}}]};
			break;
		case 10011:
			var regex = new RegExp(req.body.manufacturer, "i"),
			query = { $and : [{  manufacturer: regex },{EquipmentPrice: req.body.EquipmentPrice}]};
			break;
		case 1111:
			var regex = new RegExp(req.body.manufacturer, "i"),
			query = { $and : [{  manufacturer: regex },{Purchasedate: req.body.Purchasedate}]};
			break;
			
		}
		
		if(query){
		console.log("DEBUG:/SERach Advance search QUERYr" +  require('util').inspect(query, {depth:null}));
		Equipment.find(query).exec( function ( err, equipments ){
		//Equipment.find(query).sort({"updated_at":-1}).sort({"created_at":-1}).limit(20).exec( function ( err, equipments ){
		console.log("DEBUG:/SERach results"+ require('util').inspect(equipments, {depth:null}) );
		res.render('modules/equipsearchview', {title: "Search results" ,session: req.session,ListProduct:equipments});
		});
		}

	
	});
};