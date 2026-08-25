const db = require("../config/db");

function MenuItems(menuItem, callback) {
  const query = `select * from menu_items where menu_item_id = ?`;
  db.query(query, [menuItem], function (err, result) {
    //console.log(result[0]);
    if (err) {
      return callback(err);
    }
    return callback(null, result[0]);
  });
}
module.exports = { MenuItems };
