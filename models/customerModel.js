const mongoose = require('mongoose');
//const validator = require('validator');

const customerSchema = new mongoose.Schema({
        companyName: {
            type: String,
            required: [true, 'A shipment must have a company assigned to it'],

        },
        customerNumber: {
            type: Number,
        },
        zip: {
            type: Number,
        },
        city: {
            type: String,
        },
        country: {
            type: String,
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        website: {
            type: String,
        },
        address: {
            type: String,
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
    },
);

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
