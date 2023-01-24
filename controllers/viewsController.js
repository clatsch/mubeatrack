const Shipment = require('../models/shipmentModel');
const Client = require('../models/clientModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getShipments = catchAsync(async(req, res, next) => {
  // 1) Get shipments data from collection
  const shipments = await Shipment.find();
  // 2) Build template

  // 3) Render that template using data from 1)
  res.status(200)
    .render('shipments', {
      title: 'Shipments Overview',
      shipments,
    });
});

exports.getShipment = catchAsync(async(req, res, next) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  const shipment = await Shipment.findOne({ slug: req.params.id });

  if (!shipment) {
    return next(new AppError('There is no Shipment with that ID.', 404));
  }

  res.status(200)
    .render('shipment', {
      title: 'Shipment',
      shipment,
    });
});

exports.getNewShipment = catchAsync(async (req, res) => {
  const clients = await Client.find({});
  res.status(200)
    .render('newShipment', {
      title: 'Create new shipment',
      clients,
    });
});

exports.getLoginForm = (req, res) => {
  res.status(200)
    .render('login', {
      title: 'Log into your account',
    });
};

exports.getAccount = (req, res) => {
  res.status(200)
    .render('account', {
      title: 'Your account',
    });
};

exports.getClients = catchAsync(async(req, res, next) => {
  const clients = await Client.find();
  res.status(200)
    .render('clients', {
      title: 'Clients',
      clients,
    });
});

exports.getClient = (req, res) => {
  res.status(200)
    .render('client', {
      title: 'This is a client',
    });
};

exports.getNewClient = (req, res) => {
  res.status(200)
    .render('newClient', {
      title: 'Create new client',
    });
};


