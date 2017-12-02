var mongoose = require('mongoose');

var restaurantTRLSchema = new mongoose.Schema({
    rid: String,
    language: String,
    info: String,
    menu: [{
        name: String,
        info: String,
        desc: String,
        ingredients: [String],
        tags: [String],
        category: [String],
        updatedAt: {type: Date, default: Date.now}
    }],
    updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('RestaurantsTRL', restaurantTRLSchema);