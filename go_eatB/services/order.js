const orderModel = require("../models/order");
const customerService = require("../services/customer");
const restaurantService = require("../services/restaurant");
const menuItemService = require("../services/menuItems");

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
          return callback(null, {
            customer: customer.name,
            restaurant: restaurant.name,
            items: item,
            paymentMethod: paymentMethod,
          });
        });
      },
    );
  });
}

module.exports = { validateOrder };
