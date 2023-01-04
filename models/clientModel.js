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
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Client must belong to a user'],
  },
});

clientSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name employeeNumber',
  })
  next();
})

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
