const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
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
  location: {
    // GeoJSON
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
    },
    coordinates: [Number],
  },
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
