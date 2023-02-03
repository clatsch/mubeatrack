const Shipment = require('../models/shipmentModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

// ToCheck - Nested routes
exports.setShipmentUserIds = (req, res, next) => {
  if (!req.body.shipment) req.body.shipment = req.params.shipmentId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
}

exports.getAllShipments = factory.getAll(Shipment);
exports.getShipment = factory.getOne(Shipment);
exports.createShipment = factory.createOne(Shipment);
exports.updateShipment = factory.updateOne(Shipment);
exports.deleteShipment = factory.deleteOne(Shipment);

exports.getShipmentStats = catchAsync(async(req, res, next) => {
  const stats = await Shipment.aggregate([

    {
      $group: {
        _id: { $toUpper: '$averageOverAll' },
        numShipments: { $sum: 1 },
        averageTons: { $avg: '$amount' },
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

exports.getWeeklyShipments = catchAsync(async(req, res, next) => {
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
