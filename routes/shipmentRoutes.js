const express = require('express');
const shipmentController = require('../controllers/shipmentController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.param('id', shipmentController.checkID);

router
  .route('/top-5-shipments')
  .get(shipmentController.aliasTopShipments, shipmentController.getAllShipments);

router.route('/shipment-stats')
  .get(shipmentController.getShipmentStats);
router.route('/monthly-plan/:year')
  .get(shipmentController.getMonthlyPlan);

router
  .route('/')
  .get(shipmentController.getAllShipments)
  .post(authController.protect, shipmentController.createShipment);

router
  .route('/:id')
  .get(shipmentController.getShipment)
  .patch(shipmentController.updateShipment)
  .delete(authController.protect, authController.restrictsTo('admin', 'editor'), shipmentController.deleteShipment);

module.exports = router;
