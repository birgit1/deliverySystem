var mongoose = require('mongoose');

var menuSchema = new mongoose.Schema({
    name: String,
    info: String,
    ingredients: [String],
    tags: [String],
    restaurant: String,
    updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Menu', menuSchema);