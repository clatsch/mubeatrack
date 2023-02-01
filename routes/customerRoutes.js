import express from 'express';
import customerController from '../controllers/customerController.js';
import authController from '../controllers/authController.js';

const router = express.Router();

router.use(authController.protect);

router
    .route('/')
    .get(customerController.getAllCustomers)
    .post(authController.restrictsTo('admin'), customerController.createCustomer);

router
    .route('/:id')
    .get(authController.restrictsTo('admin'), customerController.getCustomer)
    .patch(authController.restrictsTo('admin'), customerController.updateCustomer)
    .delete(authController.restrictsTo('admin'), customerController.deleteCustomer);

export default router;
