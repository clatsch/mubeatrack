const express = require('express');
const viewsController = require('../controllers/viewsController')
const authController = require('../controllers/authController');

const router = express.Router();

// isLoggedIn in unprotected routes, if globally, query of isLoggedIn and protect would both run
router.get('/', authController.isLoggedIn, viewsController.getLoginForm)
router.get('/overview', authController.protect, viewsController.getOverview );
router.get('/shipment', authController.protect, viewsController.getShipment);
router.get('/me', authController.protect, viewsController.getAccount);

module.exports = router;
