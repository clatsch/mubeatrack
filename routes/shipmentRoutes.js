const express = require('express');
const shipmentController = require('../controllers/shipmentController');
const authController = require('../controllers/authController');

const router = express.Router();

// router
//   .route('/top-5-shipments')
//   .get(shipmentController.aliasTopShipments, shipmentController.getAllShipments);

// This will protect all the routes that come after this point
router.use(authController.protect);

router.route('/shipment-stats')
  .get(shipmentController.getShipmentStats);

router.route('/monthly-plan/:year')
  .get(shipmentController.getMonthlyPlan);

router.route('/')
  .get(shipmentController.getAllShipments)
  .post(authController.restrictsTo('admin', 'editor'), shipmentController.createShipment);

router.route('/:id')
  .get(shipmentController.getShipment)
  .patch(authController.restrictsTo('admin', 'editor'), shipmentController.updateShipment)
  .delete(authController.restrictsTo('admin', 'editor'), shipmentController.deleteShipment);

module.exports = router;
