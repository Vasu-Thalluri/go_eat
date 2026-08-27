const inventoryService = require("../services/inventory");

function getCheckInventory(req, res) {
  const menuItemId = req.body;
  //console.log("menuItems", menuItemId);
  const items = menuItemId.items;
  inventoryService.inventoryValidation(items, function (err, inventory) {
    //console.log("Inventory.....", inventory);
    //console.log(err);
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    return res.status(200).json({ success: true, data: inventory });
  });
}

module.exports = { getCheckInventory };
