const mongoose = require('mongoose');
//const slugify = require('slugify');
//const validator = require('validator');

const shipmentSchema = new mongoose.Schema({
  shipmentDate: {
    type: Date,
    required: [true, 'A shipment must have a date'],
    default: Date.now(),
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  amount: {
    type: Number,
    required: [true, 'A shipment must have an amount in tons assigned'],
  },
  inStock: {
    type: Boolean,
    default: false,
  },
  deliveryNote: {
    type: Boolean,
    default: false,
  },
  rk: {
    type: Boolean,
    default: false,
  },
  comment: {
    type: String,
    trim: true,
  },
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: 'Customer',
    required: [true, 'Shipment must belong to a customer'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Shipment must belong to a user'],
  },
});

shipmentSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'customer',
    select: 'companyName',
  }).populate({
    path: 'user',
    select: 'name employeeNumber',
  })
  next();
})


shipmentSchema.pre(/^find/, function(next) {
  this.find({ secretShipment: { $ne: true } });

  this.start = Date.now();
  next();
});

// Example of post query middleware
shipmentSchema.post(/^find/, function(docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds`);
  next();
});

// AGGREGATION MIDDLEWARE
shipmentSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { secretShipment: { $ne: true } } });
  next();
});

const Shipment = mongoose.model('Shipment', shipmentSchema);

module.exports = Shipment;
