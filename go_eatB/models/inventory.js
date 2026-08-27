const db = require("../config/db");

function checkInventory(menuItemId, callback) {
  const query = `select * from inventory where menu_item_id = ?`;
  db.query(query, [menuItemId], function (err, result) {
    //console.log("result.....", result);
    if (err) {
      return callback(err);
    }
    if (result.length === 0) {
      return callback(null, null);
    }
    return callback(null, result[0]);
  });
}

module.exports = { checkInventory };
