const mongoose = require('mongoose');
//const validator = require('validator');

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
    // location: {
    //   // GeoJSON
    //   type: {
    //     type: String,
    //     default: 'Point',
    //     enum: ['Point'],
    //   },
    //   coordinates: [Number],
    // },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    //required: [true, 'Customer must belong to a user'],
  },
// });
//
// customerSchema.pre(/^find/, function(next) {
//   this.populate({
//     path: 'user',
//     select: 'name employeeNumber',
//   })
//   next();
  },
);

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
