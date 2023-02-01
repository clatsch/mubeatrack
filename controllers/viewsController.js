import {catchAsync} from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import Shipment from '../models/shipmentModel.js';
import Customer from '../models/customerModel.js';
import User from '../models/userModel.js';

export const getShipments = catchAsync(async(req, res, next) => {
    const shipments = await Shipment.find();

    res.status(200).render('shipments', {
        title: 'Shipments Overview',
        shipments,
    });
});

export const getShipment = catchAsync(async(req, res, next) => {
    const shipment = await Shipment.findOne({_id: req.params.id});
    const customers = await Customer.find({});

    if (!shipment) {
        return next(new AppError('There is no Shipment with that ID.', 404));
    }

    res.status(200).render('shipment', {
        title: 'Shipment',
        shipment,
        customers,
    });
});

export const getNewShipment = catchAsync(async(req, res) => {
    const customers = await Customer.find({});

    res.status(200).render('newShipment', {
        title: 'Create new shipment',
        customers,
    });
});

export const getLoginForm = (req, res) => {
    res.status(200).render('login', {
        title: 'Log into your account',
    });
};

export const getForgotPasswordForm = (req, res) => {
    res.status(200).render('forgotpassword', {
        title: 'Password Reset',
    });
};

export const getResetPasswordForm = (req, res) => {
    res.status(200).render('resetpassword', {
        title: 'Password Reset',
    });
};

export const getSignupForm = (req, res) => {
    res.status(200).render('signup', {
        title: 'Sign up for a new account',
    });
};

export const getAccount = (req, res) => {
    res.status(200).render('account', {
        title: 'Your account',
    });
};

export const getCustomers = catchAsync(async(req, res, next) => {
    const customers = await Customer.find();

    res.status(200).render('customers', {
        title: 'Customers',
        customers,
    });
});

export const getCustomer = catchAsync(async(req, res, next) => {
    const customer = await Customer.findOne({_id: req.params.id});

    if (!customer) {
        return next(new AppError('There is no Customer with that ID.', 404));
    }

    res.status(200).render('customer', {
        title: 'Customer',
        customer,
    });
});

export const getNewCustomer = (req, res) => {
    res.status(200).render('newCustomer', {
        title: 'Create new customer',
    });
};

export const getUsers = catchAsync(async(req, res, next) => {
    const users = await User
})
