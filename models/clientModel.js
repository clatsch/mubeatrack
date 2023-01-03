const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  companyName: {
    type: String,
  },
  customerNumber: {
    type: Number,
  },
  address: {
    type: String,
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
})

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
