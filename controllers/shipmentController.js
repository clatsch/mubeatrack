const Shipment = require('../models/shipmentModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

exports.aliasTopShipments = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllShipments = catchAsync(async(req, res, next) => {
  const features = new APIFeatures(Shipment.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const shipments = await features.query;

  // SEND RESPONSE
  res.status(200)
    .json({
      status: 'success',
      results: shipments.length,
      data: {
        shipments: shipments,
      },
    });
});

exports.getShipment = catchAsync(async(req, res, next) => {
  const shipment = await Shipment.findById(req.params.id).populate('client').populate('user');

  if (!shipment) {
    return next(new AppError('No shipment found with that ID', 404));
  }

  res.status(200)
    .json({
      status: 'success',
      data: {
        shipment,
      },
    });
});

exports.createShipment = factory.createOne(Shipment);
exports.updateShipment = factory.updateOne(Shipment);
exports.deleteShipment = factory.deleteOne(Shipment);

exports.getShipmentStats = catchAsync(async(req, res, next) => {
  const stats = await Shipment.aggregate([
    // {
    //   $match: { ratingsAverage: { $gte: 4.0 } },
    //   $match: { },
    // },
    {
      $group: {
        // _id: null,
        _id: { $toUpper: '$difficulty' },
        //_id: '$difficulty',
        // _id: '$ratingsAverage',
        numShipments: { $sum: 1 },
        averageTons: { $avg: '$amount' },
        // avgPrice: { $avg: '$price' },
        // minPrice: { $min: '$price' },
        // maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
  ]);

  res.status(200)
    .json({
      status: 'success',
      data: {
        stats,
      },
    });
});

exports.getMonthlyPlan = catchAsync(async(req, res, next) => {
  const year = req.params.year * 1;

  const plan = await Shipment.aggregate([
    {
      $unwind: '$shipmentDate',
    },
    {
      $match: {
        shipmentDate: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $isoWeek: '$shipmentDate' },
        numShipmentStarts: { $sum: 1 },
        shipments: { $push: '$shipmentDate' },
        tonsPerWeek: { $sum: '$amount' },
      },
    },
    {
      $addFields: { isoWeek: '$_id' },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: { isoWeek: 1 },
    },
  ]);

  res.status(200)
    .json({
      status: 'success',
      data: {
        plan,
      },
    });
});
