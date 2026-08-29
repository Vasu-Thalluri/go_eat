const db = require("../config/db");

function placeOrder(customerId, restaurantId, total, callback) {
  const query = `insert into orders(customer_id, restaurant_id, total_amount) values( ?,?,?)`;
  db.query(query, [customerId, restaurantId, total], function (err, result) {
    //console.log(result);
    if (err) {
      return callback(err);
    }
    return callback(null, result);
  });
}

function createOrderItems(orderId, item, callback) {
  const { menuItemId, quantity, price } = item;
  const query = `insert into order_items(order_id, menu_item_id, quantity, price) values(?,?,?,?)`;
  db.query(
    query,
    [orderId, menuItemId, quantity, price],
    function (err, result) {
      // console.log(result);
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    },
  );
}

function payments(orderId, paymentMethod, callback) {
  const query = `insert into payments(order_id, payment_method) values(?,?)`;
  db.query(query, [orderId, paymentMethod], function (err, result) {
    // console.log(result);
    if (err) {
      return callback(err);
    }
    return callback(null, result);
  });
}

module.exports = { placeOrder, createOrderItems, payments };
