const express = require('express');
const customerController = require('../controllers/customerController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.route('/')
  .get(customerController.getAllCustomers)
  .post(authController.restrictsTo('admin'), customerController.createCustomer);

router.route('/:id')
  .get(authController.restrictsTo('admin'), customerController.getCustomer)
  .patch(authController.restrictsTo('admin'), customerController.updateCustomer)
  .delete(authController.restrictsTo('admin'), customerController.deleteCustomer);

module.exports = router;
