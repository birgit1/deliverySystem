var mongoose = require('mongoose');

var restaurantSchema = new mongoose.Schema({
    name: String,
    address: {street: String, postalCode: String, city:String},
    en: {info: String},
    fr: {info: String},
    openingHours: [ {day: Number , hours:{from: Date, to: Date}}],
    menu: [{
        number: String,
        image: Buffer,
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
    images: [Buffer],
    updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Restaurants', restaurantSchema);