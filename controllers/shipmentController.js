import Shipment from '../models/shipmentModel.js';
import catchAsync from '../utils/catchAsync.js';
import * as factory from './handlerFactory.js';

// ToCheck - Nested routes
export const setShipmentUserIds = (req, res, next) => {
    if (!req.body.shipment) req.body.shipment = req.params.shipmentId;
    if (!req.body.user) req.body.user = req.user._id;
    next();
};

export const aliasTopShipments = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
};

export const getAllShipments = factory.getAll(Shipment);
export const getShipment = factory.getOne(Shipment);
export const createShipment = factory.createOne(Shipment);
export const updateShipment = factory.updateOne(Shipment);
export const deleteShipment = factory.deleteOne(Shipment);

export const getShipmentStats = catchAsync(async(req, res, next) => {
    const stats = await Shipment.aggregate([
        {
            $group: {
                _id: {$toUpper: '$difficulty'},
                numShipments: {$sum: 1},
                averageTons: {$avg: '$amount'},
            },
        },
        {
            $sort: {avgPrice: 1},
        },
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            stats,
        },
    });
});

export const getMonthlyPlan = catchAsync(async(req, res, next) => {
    const year = req.params.year * 1;

    const plan = await Shipment.aggregate([
        {
            $unwind: '$shipmentDate',
        },
        {
            $match: {
                shipmentDate: {
                    $gte: new Date(`${year}-01 - 01`),
                    $lte: new Date(`${year}-12 - 31`),
                },
            },
        },
        {
            $group: {
                _id: {$isoWeek: '$shipmentDate'},
                numShipmentStarts: {$sum: 1},
                shipments: {$push: '$shipmentDate'},
                tonsPerWeek: {$sum: '$amount'},
            },
        },
        {
            $addFields: {isoWeek: '$_id'},
        },
        {
            $project: {
                _id: 0,
            },
        },
        {
            $sort: {isoWeek: 1},
        },
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            plan,
        },
    });
});
