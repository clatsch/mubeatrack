const express = require('express');
const tourController = require('../controllers/shipmentController');

const router = express.Router();

// router.param('id', tourController.checkID);

router
  .route('/top-5-shipments')
  .get(tourController.aliasTopShipments, tourController.getAllShipments);

router.route('/shipment-stats').get(tourController.getShipmentStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(tourController.getAllShipments)
  .post(tourController.createShipment);

router
  .route('/:id')
  .get(tourController.getShipment)
  .patch(tourController.updateShipment)
  .delete(tourController.deleteShipment);

module.exports = router;
