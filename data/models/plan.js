var mongoose = require('mongoose');

//Make a Model with the schemas for doing the CRUD
var planSchema = new mongoose.Schema({
planname: String,
plantype: String,
duration: String,
vendornumber: { type: Number, default: 0 },
planPrice: { type: Number, default: 0 },
plannumber: { type: Number, default: 1 },
startDate: Date,
MaxEnrolls: { type: Number, default: 1 },
description: String,
Currentstatus: String,
timings:String,
});
var P = mongoose.model('plan', planSchema);
module.exports = P;
console.log("DEBUG:/MODEL/plan");