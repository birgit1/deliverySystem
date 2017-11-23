var mongoose = require('mongoose');

var customerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: number,
    address: {street: String, PC: String, City:String},
    updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Customer', customerSchema);