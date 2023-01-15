const Shipment = require('../models/shipmentModel');
const Client = require('../models/clientModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async(req, res, next) => {
  // 1) Get shipments data from collection
  const shipments = await Shipment.find();
  // 2) Build template

  // 3) Render that template using data from 1)
  res.status(200)
    .render('overview', {
      title: 'Shipments Overview',
      shipments,
    });
});

exports.getShipment = (req, res) => {
  res.status(200)
    .render('shipment', {
      title: 'Example Shipment',
    });
};

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

exports.getNewClient = (req, res) => {
  res.status(200)
    .render('newClient', {
      title: 'Create new client',
    });
};


