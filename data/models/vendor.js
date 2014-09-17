var mongoose = require('mongoose');

//Make a Model with the schemas for doing the CRUD
var VendorSchema = new mongoose.Schema({
vendorname: String,
vendornumber: { type: Number, default: 1 },
address: String,
email: String,
password: String,
startDate: Date,
phonenumber: { type: Number, default: 1 },
description: String,

});
var P = mongoose.model('Vendor', VendorSchema);
console.log("DEBUG:/MODEL/vendor");
mongoose.connect( 'mongodb://localhost/GymSoft');
console.log("DEBUG:/MODEL/vendor");
module.exports = P;
console.log("DEBUG:/MODEL/vendor");