const express = require('express');
const shipmentController = require('../controllers/shipmentController');

const router = express.Router();

// router.param('id', shipmentController.checkID);

router
  .route('/top-5-shipments')
  .get(shipmentController.aliasTopShipments, shipmentController.getAllShipments);

router.route('/shipment-stats').get(shipmentController.getShipmentStats);
router.route('/monthly-plan/:year').get(shipmentController.getMonthlyPlan);

router
  .route('/')
  .get(shipmentController.getAllShipments)
  .post(shipmentController.createShipment);

router
  .route('/:id')
  .get(shipmentController.getShipment)
  .patch(shipmentController.updateShipment)
  .delete(shipmentController.deleteShipment);

module.exports = router;
