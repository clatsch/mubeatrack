const express = require('express');
const clientController = require('../controllers/clientController')
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/')
  .get(clientController.getAllClients)
  .post(authController.protect, authController.restrictsTo('admin'), clientController.createClient)

router.route('/:id')
  .delete(authController.protect, authController.restrictsTo('admin'), clientController.deleteClient)

module.exports = router;
