var mongoose = require('mongoose');

//Make a Model with the schemas for doing the CRUD
var attendenceSchema = new mongoose.Schema({
attendence: String,
vendornumber: { type: Number, default: 0 },
usernumber: { type: Number, default: 0 },
Date: Date,
});
var P = mongoose.model('attendence', attendenceSchema);
module.exports = P;
console.log("DEBUG:/MODEL/attendence");