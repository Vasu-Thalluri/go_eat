const db = require("../config/db");

function restaurantById(restaurantId, callback) {
  const query = `select * from restaurants where restaurant_id = ?`;
  db.query(query, [restaurantId], function (err, result) {
    if (err) {
      return callback(err, null);
    }
    callback(null, result[0]);
  });
}

module.exports = { restaurantById };
