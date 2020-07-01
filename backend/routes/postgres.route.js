const express = require("express");
const postgresDBRoute = express.Router();

let PostgresDB = require("../db/postgres.db");

// Get orders
postgresDBRoute.get("/orders", function (req, res, next) {
  let pool = PostgresDB.getPool();
  let query = "SELECT * FROM orders";

  pool.connect((err) => {
    if (err) return next(err);

    pool.query(query, (error, result) => {
      if (error) return next(error);
      res.json(result.rows);
      pool.end();
    });
  });
});

// Get order items
postgresDBRoute.get("/order-items", function (req, res, next) {
  let pool = PostgresDB.getPool();
  let query = "SELECT * FROM order_items";

  pool.connect((err) => {
    if (err) return next(err);

    pool.query(query, (error, result) => {
      if (error) return next(error);
      res.json(result.rows);
      pool.end();
    });
  });
});

// Get deliveries
postgresDBRoute.get("/deliveries", function (req, res, next) {
  let pool = PostgresDB.getPool();
  let query = "SELECT * FROM deliveries";

  pool.connect((err) => {
    if (err) return next(err);

    pool.query(query, (error, result) => {
      if (error) return next(error);
      res.json(result.rows);
      pool.end();
    });
  });
});

// Get orders with items
postgresDBRoute.get("/orders-with-details", function (req, res, next) {
  let pool = PostgresDB.getPool();
  let query = `SELECT * FROM orders as o
                LEFT JOIN order_items as oi ON o.id::varchar = oi.order_id
                `;

  pool.connect((err) => {
    if (err) return next(err);

    pool.query(query, (error, result) => {
      if (error) return next(error);
      res.json(result.rows);
      pool.end();
    });
  });
});

// Get delivery details
postgresDBRoute.get("/delivery-details", function (req, res, next) {
  let pool = PostgresDB.getPool();
  let query = `SELECT * FROM deliveries as d
              LEFT JOIN order_items as oi ON d.order_item_id = oi.id::varchar
              `;

  pool.connect((err) => {
    if (err) return next(err);

    pool.query(query, (error, result) => {
      if (error) return next(error);
      res.json(result.rows);
      pool.end();
    });
  });
});

module.exports = postgresDBRoute;
