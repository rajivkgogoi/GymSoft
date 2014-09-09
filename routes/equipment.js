var Equipment = require('../data/models/Equipment');
var moment = require('moment')

module.exports = function(app) 
{
	
	//Called by the Create Equipment on the Release details Page
	app.post('/equipment/create', function(req, res) {
	  console.log("DEBUG:/POST/Equipment:centername Name " + req.body.centername);
	  console.log("DEBUG:/POST/Equipment:address "+ req.body.address);
	  console.log("DEBUG:/POST/Equipment:email "+ req.body.email);
	  console.log("DEBUG:/POST/Equipment:owner "+ req.body.owner);
	  console.log("DEBUG:/POST/Equipment:startDate "+ req.body.startDate);
	  var lpost
	  Equipments.findOne({}, {}, { sort: { 'Equipmentsnumber' : -1 } }, function(err, post) {
	  if(post){
	  	lpost = post.centername;
	  }
	  console.log( "DEBUG:/Equipment/CREATE: last old Equipment Number" + post  + lpost)
	  if(lpost)	
	  {
	  	lpost = lpost + 1;
	  }else
	  {
	  	lpost=1
	  }
	  console.log( "DEBUG:/PRODUCT/CREATE: last Updated Equipment Number "   + lpost)
	
	  if (req.body.centername) {
			
		var thor = new Equipments({
			  
		 Equipmentname: req.body.centername,
		 Equipmentnumber: lpost,
		 vendornumber: String,
		 EquipmentPrice: req.body.EquipmentPrice,
		 manufacturer: req.body.manufacturer,
		 Purchasedate: req.body.Purchasedate,
		 Numberofunits:req.body.Numberofunits,
		 description: req.body.description
		 Image: String,
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
};