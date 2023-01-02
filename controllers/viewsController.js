const Shipment = require('../models/shipmentModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async(req, res, next) => {
  // 1) Get shipments data from collection
  const shipments = await Shipment.find();
  // 2) Build template

  // 3) Render that template using data from 1)
  res.status(200)
    .set(
      'Content-Security-Policy',
      // eslint-disable-next-line quotes
      'connect-src \'self\' https://cdnjs.cloudflare.com')
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
    .set(
      'Content-Security-Policy',
      // eslint-disable-next-line quotes
      'connect-src \'self\' https://cdnjs.cloudflare.com')
    .render('login', {
      title: 'Log into your account',
    });
};

exports.getAccount = (req, res) => {
  res.status(200)
    .set(
      'Content-Security-Policy',
      // eslint-disable-next-line quotes
      'connect-src \'self\' https://cdnjs.cloudflare.com')
    .render('account', {
      title: 'Your account',
    });
}


