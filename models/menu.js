var mongoose = require('mongoose');

var menuSchema = new mongoose.Schema({
    restaurantId: mongoose.Schema.Types.ObjectId,
    number: String,
    price: Number,
    image: String,
    updatedAt: {type: Date, default: Date.now},

    name: {en: String, fr: String},
    desc: {en: String, fr: String},
    info: {en: String, fr: String},
    ingredients: {en: [String], fr: [String]},
    tags: {en: [String], fr: [String]},
    category: {en: [String], fr: [String]}

});

module.exports = mongoose.model('Menu', menuSchema);