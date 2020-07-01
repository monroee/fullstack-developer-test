const express = require("express");
const mongoDBRoute = express.Router();

let Mongodb = require("../db/mongo.db");

// Get customers
mongoDBRoute.get('/customers', function(req, res, next) {
    let db = Mongodb.getDatabase();
    db.collection('customers').find({}).toArray(function(err, result){
        if(err) return next(err);
        res.json(result);
    });
});

// Get customer companies
mongoDBRoute.get('/customer-companies', function(req, res, next) {
    let db = Mongodb.getDatabase();
    db.collection('customer_companies').find({}).toArray(function(err, result){
        if(err) return next(err);
        res.json(result);
    });
});

// Get customer with companies
mongoDBRoute.get('/customer-with-companies', function(req, res, next) {
    let db = Mongodb.getDatabase();
    db.collection('customers').aggregate([
        {
            $lookup:
            {
                from: 'customer_companies',
                localField: 'company_id',
                foreignField: 'company_id',
                as: 'customer_company'
            }
        }
    ]).toArray(function(err, result){
        if(err) return next(err);
        res.json(result);
    })
});

module.exports = mongoDBRoute;
