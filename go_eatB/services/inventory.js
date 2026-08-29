const inventoryModel = require("../models/inventory");
//const menuItemService = require("../services/menuItems");

function inventoryValidation(items, callback) {
  //const items = menuItemId.items;
  const validatedInventory = [];
  let completedCount = 0;
  items.forEach((item, index) => {
    inventoryModel.checkInventory(item.menuItemId, function (err, inventory) {
      //console.log("Inventory.....", inventory);
      if (err) {
        return callback(err);
      }
      if (!inventory) {
        return callback(new Error("Inventory not found"));
      }
      const reqQuantity = JSON.parse(item.quantity);
      const inventoryQuantity = inventory.quantity;
      if (reqQuantity > inventoryQuantity) {
        return callback(new Error("Insufficient inventory for selected item"));
      }
      validatedInventory[index] = {
        menuItemId: inventory.menu_item_id,
        reqQuantity: JSON.parse(item.quantity),
        avlQuantity: inventory.quantity,
      };
      //console.log(validatedInventory);
      completedCount++;
      if (completedCount === items.length) {
        return callback(null, validatedInventory);
      }
    });
  });
}

module.exports = { inventoryValidation };
