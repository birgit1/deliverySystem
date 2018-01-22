var mongoose = require('mongoose');

var restaurantSchema = new mongoose.Schema({
    name: String,
    address: {street: String, postalCode: String, city:String},
    info: {en: String, fr:String},
    phone: Number,
    email: String,
    foodCategory: [mongoose.Schema.Types.ObjectId],

    openingHours: [{
        weekday: Number,
        start: Number,
        end: Number
    }],
    images: [String],
    logo: String,
    updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Restaurants', restaurantSchema);