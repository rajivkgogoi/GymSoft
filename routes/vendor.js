var users = require('../data/user');
var Vendors = require('../data/models/vendor');
var moment = require('moment')
fs = require('fs');
module.exports = function(app) 
{
	//Called by the Button create Link at release Page 
/*
	app.post('/feature/create', function(req, res){
	  console.log("DEBUG:/POST/Feature/create:Release Number "+ req.body.releasenumber);
	  // query db for all Feature List items  for Display  
	  Feature.find().exec( function ( err, features ){
	  
	    if( err ) return next( err );
		// The releasenumber is sent to mapped with Feature
	    res.render('releases/createfeature', {title: 'Create a New Feature '
	      + req.session.user, Listfeatures: features,Releasenumber :req.body.releasenumber
	    });
	  });
	});
	
	// Called by the Upload Button in the Feature details page 
	app.post('/feature/upload', function(req, res) {
	  var body = '';
	  var header = '';
	  var content_type = req.headers['content-type'];
	  var path = req.files;
	  var boundary = content_type.split('; ')[1].split('=')[1];
	  var content_length = parseInt(req.headers['content-length']);
	  var tmp_path = req.files.test['path'];
	  var origfilename = req.files.test['originalFilename'];
	  
	  console.log('DEBUG:/POST/Feature/upload File content-type: ' + content_type);
	  console.log('DEBUG:/POST/Feature/upload File boundary: ' + boundary);
	  console.log('DEBUG:/POST/Feature/upload File content-length: ' + content_length);
	  console.log("DEBUG:/POST/Feature/upload File Temporary req.files path " + req.files.test['path']);
	  console.log('DEBUG:/POST/Feature/upload  Original Fiel Name : ' + origfilename);
	  console.log('DEBUG:/POST/Feature/upload Feature number : ' + req.featurenumber)
      // get the temporary location of the file this is Automatically saved by Node in Windows Location
	  // Then move the File to the Target file path and Update the Filename in the DB
	  var target_path = './routes/feature/' + origfilename;
	
	  if (origfilename) {
	    var lpost
	    attach.findOne({}, {}, { sort: { 'attachmentnumber' : -1 } }, function(err, post) {
	      if(post){
	        lpost = post.attachmentnumber;
		  }
	      console.log( "DEBUG:/POST/Feature/upload: last old attachmentnumber"  + lpost)
		  // increment the Attachment Number by 1
		  if(lpost){
		  	lpost = lpost + 1;
		  }else{
		  	lpost=1
		  }	
		  var thor = new attach({
		    filename: origfilename,
		    attachmentnumber: lpost,
		    featurenumber: req.body.featurenumber,
		    description: req.body.description,
		  });
		  //Commit hthis creation to the DB 
		  thor.save(function(err, thor) {
		    if (err) return console.error(err);
		  	console.dir(thor);
		  });
		  		
		  // move the file from the temporary location to the intended location
		  fs.rename(tmp_path, target_path, function(err) {
            if (err) throw err;
            // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted //files
            fs.unlink(tmp_path, function() {
              if (err) throw err;
              //res.redirect('/users')
			  Feature.findOne({ featurenumber : req.body.featurenumber }).exec( function ( err,features ){
			attach.find().exec( function ( err, attachments ){
		    if( err ) return next( err );
		    console.log("DEBUG:/POST/feature/info: Feature Number "+ req.body.featurenumber);
		    res.render('releases/feature_details', {title:  'Details of feature:s' + features.featurename, featureNumber: req.body.featurenumber,FeatureList : features,Listattachments:attachments} );
	      });
			});
            });
		  });
        });
      }
    });	
	
		
	//Called by the view button at release Page
	app.post('/feature/info', function(req, res) {
		console.log("DEBUG:POST/feature/info:Inside session This will Render Views from /feature/info");
		Feature.findOne({ featurenumber : req.body.featurenumber }).exec( function ( err,features ){
		  attach.find().exec( function ( err, attachments ){
		    if( err ) return next( err );
		    console.log("DEBUG:/POST/feature/info: Feature Number "+ req.body.featurenumber);
		    res.render('releases/feature_details', {title:  'Details of feature:' + features.featurename, featureNumber: req.body.featurenumber,FeatureList : features,Listattachments:attachments} );
	      });
		});
	});
	*/
	//Called by the Create Feature on the Release details Page
	app.post('/vendor/create', function(req, res) {
	  console.log("DEBUG:/POST/feature:centername Name " + req.body.centername);
	  console.log("DEBUG:/POST/feature:address "+ req.body.address);
	  console.log("DEBUG:/POST/feature:email "+ req.body.email);
	  console.log("DEBUG:/POST/feature:owner "+ req.body.owner);
	  console.log("DEBUG:/POST/feature:startDate "+ req.body.startDate);
	  var lpost
	Vendors.findOne({}, {}, { sort: { 'Vendorsnumber' : -1 } }, function(err, post) {
	if(post){
		lpost = post.centername;
	}
	console.log( "DEBUG:/PRODUCT/CREATE: last old Product Number" + post  + lpost)
	if(lpost)	
	{
		lpost = lpost + 1;
	}else
	{
		lpost=1
	}
			
	console.log( "DEBUG:/PRODUCT/CREATE: last Updated Product Number "   + lpost)
	
		if (req.body.centername) {
			
		var thor = new Product({
			  
			  vendorname: req.body.centername,
			  vendornumber: req.body.,
			  address: req.body.address,
			  email: req.body.email,
			  phonenumber: req.body.mobilenumber,
			  description: req.description
			
			});

		thor.save(function(err, thor) {
		if (err) return console.error(err);
			console.dir(thor);
			});
		
		
		
		}
		res.redirect('/session/new')
		
		});
	});
	
	// Download of File in Feature details /files/* is accessed via req.params[0] but here we name it :file
	app.get('/:file(*)', function(req, res, next){
      var file = '/' + req.params.file;
      var  path = __dirname   + file;
      console.log("DEBUG:GET/file in the file dowload file "  + file);
      console.log("DEBUG:GET/file in the file download "+ path	);
	  res.download(path);
	});

    // error handling middleware. Because it's below our routes, you will be able to
    // "intercept" errors, otherwise Connect will respond with 500 "Internal Server Error".
	app.use(function(err, req, res, next){
      // special-case 404s,remember you could render a 404 template here
  
      if (404 == err.status) {
	    res.statusCode = 404;
	    res.send('Cant find that file, sorry!');
	  }
	  else {
	    console.log("File Download is fine");
	    next(err);
      }
	});	

	// Called from the delete Button on the feature details page and Delets features and its attachments 
	app.post('/feature/delete', function(req, res){
	  console.log("DEBUG:/feature/delete: features and its attachments featurenum " + req.body.featurenumber);
		Feature.find({ featurenumber: req.body.featurenumber}).remove().exec( 
		  attach.find({featurenumber: req.body.featurenumber}).remove().exec( function ( err, features ){
		  	  if( err ) return next( err );
		  	  res.redirect('/users')
		  	})
		 );
	});
	
	// Called from the delete Button on the feature details page and Deletes features and its attachments 
	app.post('/feature/attachdelete', function(req, res){
	  console.log("DEBUG:/feature/attachdelete: xxxxxxxx its attachments featurenum " + req.body.attachmentid);
		 attach.find({attachmentnumber: req.body.attachmentid}).remove().exec( function ( err, features ){
		  	  if( err ) return next( err );
			   console.log("DEBUG:feature/attachdelete:Inside  This is " + features);
			  var path= 'C:\\Users\\SANCHEZ\\Documents\\GitHub\\Node_code\\Realease_project\\routes\\feature\\'+req.body.filename;
			  /*fs.unlink(path, function (err) {
			    if (err) throw err;
				console.log('successfully deleted '+ path);
			 });*/
		  	 // res.redirect('/users')
			 Feature.findOne({ featurenumber : req.body.featurenumber }).exec( function ( err,features ){
		  attach.find().exec( function ( err, attachments ){
		    if( err ) return next( err );
		    console.log("DEBUG:/POST/feature/info: Feature Number "+ req.body.featurenumber);
		    res.render('releases/feature_details', {title:  'Details of feature:' + features.featurename, featureNumber: req.body.featurenumber,FeatureList : features,Listattachments:attachments} );
	      });
		});
		  	})
		});
	};