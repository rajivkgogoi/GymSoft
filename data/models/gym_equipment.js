var mongoose = require('mongoose');

//Make a Model with the schemas for doing the CRUD
var EquipmentSchema = new mongoose.Schema({
Equipmentname: String,
Equipmenttype: String,
manufacturer: String,
vendornumber: { type: Number, default: 0 },
EquipmentPrice: { type: Number, default: 0 },
Equipmentnumber: { type: Number, default: 1 },
Purchasedate: Date,
Numberofunits: { type: Number, default: 1 },
description: String,
Image: String,
Currentstatus: String,
});
var P = mongoose.model('Equipment', EquipmentSchema);
module.exports = P;
console.log("DEBUG:/MODEL/Equipment");