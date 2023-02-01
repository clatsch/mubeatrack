import express from 'express';
import shipmentController from '../controllers/shipmentController.js';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.use(authController.protect);

router
    .route('/shipment-stats')
    .get(shipmentController.getShipmentStats);

router
    .route('/monthly-plan/:year')
    .get(shipmentController.getMonthlyPlan);

router
    .route('/')
    .get(shipmentController.getAllShipments)
    .post(authController.restrictsTo('admin', 'user'), shipmentController.createShipment);

router
    .route('/:id')
    .get(shipmentController.getShipment)
    .patch(authController.restrictsTo('admin', 'user'), shipmentController.updateShipment)
    .delete(authController.restrictsTo('admin', 'user'), shipmentController.deleteShipment);

export default router;
