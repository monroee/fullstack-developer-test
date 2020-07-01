const express = require("express");
const router = express.Router();

let Mongodb = require("../db/mongo.db");
let PostgresDB = require("../db/postgres.db");

// Get all data needed for frontend
router.get("/all", async function (req, res, next) {

  try {

    let orders = await getOrders();
    let order_items = await getOrderItems();
    let customers = await getCustomers();

    var all_data = orders.map((order) => {
      let order_item = order_items.find(oi => oi.order_id == order.id);
      let customer = customers.find(c => c.user_id == order.customer_id);

      if (order_item) {
        order.order_items = [order_item];
      }

      if(customer) {
          order.customer = customer;
      }

      return order;
    });

    res.json(all_data);

  } catch (e) {
    return next(e);
  };
});

async function getOrders() {
  let pool = PostgresDB.getPool();
  let query = `SELECT 
    o.id
    , o.order_name
    , o.customer_id
    , o.created_at
    , SUM(d.delivered_quantity::int * CASE WHEN oi.price_per_unit = '' THEN 0 ELSE oi.price_per_unit::float END) as delivered_amount
    , SUM(CASE WHEN oi.price_per_unit = '' THEN 0 ELSE oi.price_per_unit::float END * oi.quantity::int)  as total_amount
    FROM orders as o
    LEFT JOIN order_items as oi on o.id::varchar = oi.order_id
    LEFT JOIN deliveries as d on oi.id::varchar = d.order_item_id
    GROUP BY o.id
    ORDER BY o.id
    `;

  const client = await pool.connect();
  let res;
  try {
    await client.query("BEGIN");
    try {
      res = await client.query(query);
      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    }
  } finally {
    client.release();
  }
  return res.rows;
}

async function getOrderItems() {
  let pool = PostgresDB.getPool();
  let query = `SELECT * FROM order_items`;

  const client = await pool.connect();
  let res;
  try {
    await client.query("BEGIN");
    try {
      res = await client.query(query);
      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    }
  } finally {
    client.release();
  }
  return res.rows;
}

async function getCustomers() {
  let db = Mongodb.getDatabase();

  let result = await db
    .collection("customers")
    .aggregate([
      {
        $lookup: {
          from: "customer_companies",
          localField: "company_id",
          foreignField: "company_id",
          as: "customer_company",
        },
      },
    ])
    .toArray();

    return result;
}

module.exports = router;
