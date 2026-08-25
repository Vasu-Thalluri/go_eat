const menuItemModel = require("../models/menuItems");

function validateMenuItems(menuItem, callback) {
  const validatedItems = [];
  function validateItemsIndex(index) {
    if (index >= menuItem.length) {
      return callback(null, validatedItems);
    }
    const item = menuItem[index];
    //console.log(item);
    menuItemModel.MenuItems(item.menuItemId, function (err, item) {
      if (err) {
        return callback(err);
      }
      if (!item) {
        return callback(new Error("Menu item is not found"));
      }
      if (!item.is_available) {
        return callback(new Error("The choosen item is not available"));
      }
      validatedItems.push({
        menuItemId: item.menu_item_id,
        itemName: item.item_name,
        price: item.price,
      });
      validateItemsIndex(index + 1);
    });
  }
  validateItemsIndex(0);
  //console.log(validatedItems);

  // menuItemModel.MenuItems(menuItem, function (err, item) {
  //   if (err) {
  //     return callback(new Error("Error from DB, Menu items not found"));
  //   }
  //   if (!item.is_available) {
  //     return callback(new Error("The choosen item is not available"));
  //   }
  //   return callback(null, item);
  // });
}
module.exports = { validateMenuItems };
