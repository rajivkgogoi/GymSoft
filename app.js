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

