var mongoose = require('mongoose');

//Make a Model with the schemas for doing the CRUD
var VendorSchema = new mongoose.Schema({
vendorname: String,
vendornumber: { type: Number, default: 1 },
address: String,
email: String,
phonenumber: { type: Number, default: 1 },
description: String,

});
var P = mongoose.model('Vendor', VendorSchema);
console.log("DEBUG:/MODEL/vendor");
mongoose.connect( 'mongodb://localhost/Vendor' );
module.exports = P;