var Vendors = require('../data/models/vendor');
var moment = require('moment')
fs = require('fs');
module.exports = function(app) 
{
	
	//Called by the Create vendor on the Release details Page
	app.post('/vendor/create', function(req, res) {
	  console.log("DEBUG:/POST/vendor:centername Name " + req.body.centername);
	  console.log("DEBUG:/POST/vendor:address "+ req.body.address);
	  console.log("DEBUG:/POST/vendor:email "+ req.body.email);
	  console.log("DEBUG:/POST/vendor:owner "+ req.body.owner);
	  console.log("DEBUG:/POST/vendor:startDate "+ req.body.startDate);
	  var lpost
	  Vendors.findOne({}, {}, { sort: { 'vendornumber' : -1 } }, function(err, post) {
	  if(post){
	  	lpost = post.vendornumber;
	  }
	  console.log( "DEBUG:/VENDOR/CREATE: last old Vendor Number" + post  + lpost)
	  if(lpost)	
	  {
	  	lpost = lpost + 1;
	  }else
	  {
	  	lpost=1
	  }
	  console.log( "DEBUG:/PRODUCT/CREATE: last Updated Vendor Number "   + lpost)
	
	  if (req.body.centername) {
			
		var thor = new Vendors({
			  
		 vendorname: req.body.centername,
		 vendornumber: lpost,
		 address: req.body.address,
		 email: req.body.email,
		 password: req.body.password,
		 phonenumber: req.body.mobilenumber,
		 description: req.description
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