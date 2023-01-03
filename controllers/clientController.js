const Client = require('../models/clientModel')
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Shipment = require('../models/shipmentModel');


exports.getAllClients = catchAsync(async(req, res, next) => {
  const features = new APIFeatures(Client.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const clients = await features.query;

  // SEND RESPONSE
  res.status(200)
    .json({
      status: 'success',
      results: clients.length,
      data: {
        clients,
      },
    });
});

exports.createClient = catchAsync(async(req, res, next) => {
  const newClient = await Client.create(req.body);

  res.status(201)
    .json({
      status: 'success',
      data: {
        client: newClient,
      },
    });
});
