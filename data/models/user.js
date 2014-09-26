var mongoose = require('mongoose');

//Make a Model with the schemas for doing the CRUD
var userSchema = new mongoose.Schema({
username: String,
usernumber: { type: Number, default: 1 },
vendornumber: { type: Number, default: 0 },
mobilenumber: { type: Number, default: 0 },
plannumber: { type: Number, default: 1 },
startDate: Date,
address: String,
attachment: String,
level: String,
status: String,
});
var P = mongoose.model('user', userSchema);
module.exports = P;
console.log("DEBUG:/MODEL/plan");