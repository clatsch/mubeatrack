import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    companyName: {
        type: String,
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
});

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
