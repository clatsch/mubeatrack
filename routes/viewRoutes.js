const express = require('express');
const viewsController = require('../controllers/viewsController')
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/', viewsController.getLoginForm)
router.get('/overview', viewsController.getOverview );
router.get('/shipment', viewsController.getShipment);

module.exports = router;
