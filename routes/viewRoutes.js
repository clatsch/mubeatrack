const express = require('express');
const viewsController = require('../controllers/viewsController')

const router = express.Router();

// app.get('/', function(req, res) {
//   res.status(200).render('pages/index');
// });


router.get('/', viewsController.getOverview );
router.get('/shipment', viewsController.getShipment);
router.get('/login', viewsController.getLoginForm)

module.exports = router;
