const express = require('express');
const viewsController = require('../controllers/viewsController')
const authController = require('../controllers/authController');

const router = express.Router();

// isLoggedIn in unprotected routes, if globally, query of isLoggedIn and protect would both run
router.get('/', authController.isLoggedIn, viewsController.getLoginForm)
router.get('/shipments', authController.protect, viewsController.getShipments );
router.get('/shipment/:id', authController.protect, viewsController.getShipment);
router.get('/newShipment', authController.protect, viewsController.getNewShipment);
router.get('/customers', authController.protect, viewsController.getCustomers)
router.get('/customer/:id', authController.protect, viewsController.getCustomer);
router.get('/newCustomer', authController.protect, viewsController.getNewCustomer)
router.get('/me', authController.protect, viewsController.getAccount);


module.exports = router;
