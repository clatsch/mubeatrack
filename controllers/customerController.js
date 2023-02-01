import Customer from '../models/customerModel.js';
import * as factory from './handlerFactory.js';

export const getAllCustomers = factory.getAll(Customer);
export const getCustomer = factory.getOne(Customer, { path: 'user' });
export const createCustomer = factory.createOne(Customer);
export const updateCustomer = factory.updateOne(Customer);
export const deleteCustomer = factory.deleteOne(Customer);
