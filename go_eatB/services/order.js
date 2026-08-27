const orderModel = require("../models/order");
const customerService = require("../services/customer");
const restaurantService = require("../services/restaurant");
const menuItemService = require("../services/menuItems");
const inventoryService = require("../services/inventory");

function validateOrder(
  customer_id,
  restaurant_id,
  items,
  paymentMethod,
  callback,
) {
  // console.log("Validating Customer.....");
  customerService.validateCustomer(customer_id, function (err, customer) {
    if (err) {
      return callback(err);
    }
    //console.log(`Cutomer Validated: ${customer.name}`);
    //console.log("Validating Restaurant.....");
    restaurantService.validateRestaurant(
      restaurant_id,
      function (err, restaurant) {
        if (err) {
          return callback(err);
        }
        //console.log(`Restaurant Validated: ${restaurant.name}`);
        menuItemService.validateMenuItems(items, function (err, item) {
          if (err) {
            return callback(err);
          }
          //console.log(item)
          inventoryService.inventoryValidation(
            items,
            function (err, inventory) {
              if (err) {
                return callback(err);
              }
              //console.log(inventory)
              const orderItems = item.map((menuItem) => {
                const inventoryItem = inventory.find((inv) => {
                  return inv.menuItemId === menuItem.menuItemId;
                });
                return {
                  menuItemId: menuItem.menuItemId,
                  itemName: menuItem.itemName,
                  price: menuItem.price,
                  quantity: inventoryItem.reqQuantity,
                  avlQuantity: inventoryItem.avlQuantity,
                };
              });
              //console.log(orderItems);
              calculateBill(orderItems, function (err, total) {
                if (err) {
                  return callback(err);
                }
                return callback(null, {
                  customer: customer.name,
                  restaurant: restaurant.name,
                  orderItems: orderItems,
                  total: total,
                  paymentMethod: paymentMethod,
                });
              });
            },
          );
        });
      },
    );
  });
}

function calculateBill(orderItems, callback) {
  let total = 0;
  orderItems.forEach((element) => {
    total += element.price * element.quantity;
    //console.log(total);
  });
  return callback(null, total);
}
module.exports = { validateOrder };
