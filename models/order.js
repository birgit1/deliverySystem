var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    customer: String,
    completed: Boolean,
    items: [{id: Schema.Types.ObjectId, restaurant: Schema.Types.ObjectId}],
    updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Customer', customerSchema);