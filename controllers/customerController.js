const Customer = require('../models/customerModel')
const factory = require('./handlerFactory');

exports.getAllCustomers = factory.getAll(Customer);
exports.getCustomer = factory.getOne(Customer, { path: 'user'} );
exports.createCustomer = factory.createOne(Customer);
exports.updateCustomer = factory.updateOne(Customer);
exports.deleteCustomer = factory.deleteOne(Customer);
