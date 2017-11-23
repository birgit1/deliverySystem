var mongoose = require('mongoose');

var restaurantSchema = new mongoose.Schema({
    name: String,
    address: {street: String, PC: String, City:String},
    info: String,
    openingHours: [ {day: Number , hours:[{From: Date, To: Date}]}],
    updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Restaurants', restaurantSchema);