var mongoose = require('mongoose');

var restaurantSchema = new mongoose.Schema({
    name: String,
    address: {street: String, postalCode: String, city:String},
    en: {info: String},
    fr: {info: String},
    openingHours: [{
        weekday: String,
        start: Number,
        end: Number
    }],
    menu: [{
        number: String,
        image: String,
        updatedAt: {type: Date, default: Date.now},
        en:{
            name: String,
            info: String,
            desc: String,
            ingredients: [String],
            tags: [String],
            category: [String]},
        fr:{
            name: String,
            info: String,
            desc: String,
            ingredients: [String],
            tags: [String],
            category: [String]}
    }],
    images: [String],
    updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Restaurants', restaurantSchema);