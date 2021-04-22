const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {type: String, required: true},
    phone: String,
    isGold: {type: Boolean, default: false}

}));

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        phone: Joi.string()
    });
    return schema.validate(customer);

}

module.exports.Customer =Customer;
module.exports.validate=validateCustomer;