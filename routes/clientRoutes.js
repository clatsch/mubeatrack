const express = require('express');
const clientController = require('../controllers/clientController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.route('/')
  .get(clientController.getAllClients)
  .post(authController.restrictsTo('admin'), clientController.createClient);

router.route('/:id')
  .get(authController.restrictsTo('admin'), clientController.getClient)
  .patch(authController.restrictsTo('admin'), clientController.updateClient)
  .delete(authController.restrictsTo('admin'), clientController.deleteClient);

module.exports = router;
