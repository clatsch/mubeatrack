const express = require('express');
const clientController = require('../controllers/clientController')
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/')
  .get(clientController.getAllClients)
  .post(authController.protect, authController.restrictsTo('admin'), clientController.createClient)

module.exports = router;
