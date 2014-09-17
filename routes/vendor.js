var Vendors = require('../data/models/vendor');
var moment = require('moment')
fs = require('fs');
var nodemailer = require("nodemailer");
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
		 description: req.body.description,
		 startDate:req.body.startDate,
		});

		thor.save(function(err, thor) {
		  if (err) return console.error(err);
			console.dir(thor);
	    });
		
		var smtpTransport = nodemailer.createTransport("SMTP",{
				service: "Gmail",  // sets automatically host, port and connection security settings
				auth: {
					user: "lookpuk123@gmail.com",
					pass: "sanraj12"
				}
			});

		smtpTransport.sendMail({  //email options
		from: "lookpuk@gmail.com", // sender address.  Must be the same as authenticated user if using Gmail.
		to: req.body.email, // receiver
		subject: "Mail from GYMSOFT Login and Password", // subject
		html: "<b>You have successfully registered </b><p> UserName : " + req.body.centername +"</p><p>Password :"+req.body.password + "</p>"
		 // body
		}, function(error, response){  //callback
		if(error){
			console.log(error);
		}else{
			console.log("Message sent: " + response.message);
		}
		
		
		
		smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
			});
		
		
		}
	  
	  
	  res.redirect('/session/user')
	  });
	});
};