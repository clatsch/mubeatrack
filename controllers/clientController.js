const Client = require('../models/clientModel')
const factory = require('./handlerFactory');

exports.getAllClients = factory.getAll(Client);
exports.getClient = factory.getOne(Client, { path: 'user'} );
exports.createClient = factory.createOne(Client);
exports.updateClient = factory.updateOne(Client);
exports.deleteClient = factory.deleteOne(Client);
