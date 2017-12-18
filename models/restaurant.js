var mongoose = require('mongoose');

var restaurantSchema = new mongoose.Schema({
    name: String,
    address: {street: String, postalCode: String, city:String},
    info: {en: String, fr:String},
    category: {en: [String], fr:[String]},

    openingHours: [{
        weekday: Number,
        start: Number,
        end: Number
    }],
    images: [String],
    updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Restaurants', restaurantSchema);