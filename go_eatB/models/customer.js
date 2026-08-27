const db = require("../config/db");

function findByCustomerId(customerId, callback) {
  //console.log("db", customerId);
  const query = `select * from customers where customer_id = ?`;

  db.query(query, [customerId], function (err, result) {
    if (err) {
      return callback(err);
    }
    callback(null, result[0]);
  });
}
module.exports = { findByCustomerId };
