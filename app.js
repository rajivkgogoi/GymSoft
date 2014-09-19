//Main file 
// 
// mongoose setup
require('./data/models/vendor');
 
var express = require( 'express' );
var routes  = require( './routes' );
var http    = require( 'http' );
var path    = require( 'path' );
var app     = express();
var engine  = require( 'ejs-locals' );
var favicon = require('serve-favicon');
var logger = require('morgan')
var bodyParser = require('body-parser')
var cookieparser = require('cookie-parser')
var methodOverride = require('method-override')
var session = require('express-session')
var errorHandler = require('errorhandler')

//all environments
app.set( 'port', process.env.PORT || 3001 );
app.engine( 'ejs', engine );
app.set( 'views', path.join( __dirname, 'views' ));
app.set( 'view engine', 'ejs' );
app.use( favicon('Desert.jpg'));
app.use( logger( 'dev' ));
app.use(bodyParser());
//app.use( express.urlencoded());
app.use( methodOverride());
	//Session maintainence stuffs
app.use(cookieparser('my secret string'));
		app.use(session({
				secret: 'my secret string',
				maxAge: 3600000
		}));
//app.use( app.router );
app.use( express.static( path.join( __dirname, 'public' )));
 
// development only
if ( 'development' == app.get( 'env' )) {
  app.use( errorHandler());
}

// Routes are separeted and kept in a different route folder having the GET/POSTs
require('./routes/index')(app);
require('./routes/users')(app);
require('./routes/session')(app);
require('./routes/vendor')(app);
require('./routes/equipment')(app)
require('./routes/plan')(app)
require('./routes/usermanagment')(app)
http.createServer( app ).listen( app.get( 'port' ), function(){
  console.log( 'Express server listening on port ' + app.get( 'port' ));
} );