import { Schema } from 'mongoose';

var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    customer: {firstName: String, lastName: String, phone: Number, email:String},
    deliveryAddress: {street: String, postalCode: String, city:String},
    delieryInstruction: String,
    deliveryTime: {day:Number, time: Number},
    completed: Boolean,
    restaurant: Schema.Types.ObjectId,
    items: [{id: Schema.Types.ObjectId, basePrice: Number, amount: Number, addons: [{name: String, price: Number}], selection: [String], totalPrice: Number}],
    totalPrice: Number,
    tax: Number,
    updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Customer', customerSchema);