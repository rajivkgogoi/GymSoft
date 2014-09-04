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


//all environments
app.set( 'port', process.env.PORT || 3001 );
app.engine( 'ejs', engine );
app.set( 'views', path.join( __dirname, 'views' ));
app.set( 'view engine', 'ejs' );
app.use( express.favicon());
app.use( express.logger( 'dev' ));
app.use( express.bodyParser());
app.use( express.json());
app.use( express.urlencoded());
app.use( express.methodOverride());
	//Session maintainence stuffs
		app.use(express.cookieParser('my secret string'));
		app.use(express.session({
				secret: 'my secret string',
				maxAge: 3600000
		}));
app.use( app.router );
app.use( express.static( path.join( __dirname, 'public' )));
 
// development only
if ( 'development' == app.get( 'env' )) {
  app.use( express.errorHandler());
}

// Routes are separeted and kept in a different route folder having the GET/POSTs
//app.get('/', routes.index);
require('./routes/index')(app);
require('./routes/session')(app);

http.createServer( app ).listen( app.get( 'port' ), function(){
  console.log( 'Express server listening on port ' + app.get( 'port' ));
} );