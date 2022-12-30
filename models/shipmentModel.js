const mongoose = require('mongoose');
//const slugify = require('slugify');
//const validator = require('validator');

const shipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    minlength: [10, 'A shipment name must have more or equal then 10 characters'],
  },
  shipmentDate: {
    type: Date,
    required: [true, 'A shipment must have a date'],
    default: Date.now(),
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  client: {
    type: String,
    required: [true, 'A shipment must have a client assigned'],
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
});

shipmentSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

/*
// DOCUMENT MIDDLEWARE: runs before .save() and .create()
shipmentSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
 */

// QUERY MIDDLEWARE
// Regular expression /^find/ instead of 'find'
// because like this, it finds everything that starts with find,
// hence also findOne which is findById in the background
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
