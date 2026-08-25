const menuItemService = require("../services/menuItems");
function getMenuItems(req, res) {
  const menuItem = req.body;
  const ItemId = menuItem.items;
  //console.log(ItemId);
  menuItemService.validateMenuItems(ItemId, function (err, item) {
    //console.log(item);
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    return res.status(200).json({ success: true, data: item });
  });
}
module.exports = { getMenuItems };
