const Client = require('../models/clientModel')
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');



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

exports.createClient = factory.createOne(Client);
exports.updateClient = factory.updateOne(Client);
exports.deleteClient = factory.deleteOne(Client);
