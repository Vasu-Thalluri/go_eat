const customerService = require("../services/customer");
const restaurantService = require("../services/restaurant");
const menuItemService = require("../services/menuItems");
const inventoryService = require("../services/inventory");
const orderModel = require("../models/order");
const orderItemsModel = require("../models/order");
const paymentModel = require("../models/order");

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
                //console.log(orderItems);
                return {
                  menuItemId: menuItem.menuItemId,
                  itemName: menuItem.itemName,
                  price: menuItem.price,
                  quantity: inventoryItem.reqQuantity,
                  avlQuantity: inventoryItem.avlQuantity,
                };
              });
              calculateBill(orderItems, function (err, total) {
                if (err) {
                  return callback(err);
                }
                // console.log("total price of placed items", total)
                orderModel.placeOrder(
                  customer.customer_id,
                  restaurant.restaurant_id,
                  total,
                  function (err, order) {
                    //console.log("Error while inserting order", err);
                    if (err) {
                      return callback(err);
                    }
                    //console.log("orderCreated.....", order);
                    let completedCount = 0;
                    const orderItemIDs = [];
                    orderItems.forEach((item, index) => {
                      orderItemsModel.createOrderItems(
                        order.insertId,
                        item,
                        function (err, orderItem) {
                          // console.log("Error while inserting orderItem", err)
                          if (err) {
                            return callback(err);
                          }
                          //console.log("orderItemCreated.....", orderItem);
                          orderItemIDs[index] = {
                            orderItemId: orderItem.insertId,
                          };
                          //console.log("insertedOrderItemIDs.....", orderItemIDs);
                          completedCount++;
                          if (completedCount === orderItems.length) {
                            paymentModel.payments(
                              order.insertId,
                              paymentMethod,
                              function (err, payment) {
                                // console.log("Error while inserting orderItem", err)
                                if (err) {
                                  return callback(err);
                                }
                                //console.log("paymentCreated.....", payment);
                                return callback(null, {
                                  customer: customer.name,
                                  restaurant: restaurant.name,
                                  orderItems: orderItems,
                                  total: total,
                                  paymentMethod: paymentMethod,
                                  orderId: order.insertId,
                                  orderItemId: orderItemIDs,
                                  paymentId: payment.insertId,
                                });
                              },
                            );
                          }
                        },
                      );
                    });
                  },
                );
              });
            },
          );
        });
      },
    );
  });
}

function calculateBill(orderItems, callback) {
  // console.log("orderItems...", orderItems);
  let total = 0;
  orderItems.forEach((element) => {
    total += element.price * element.quantity;
    //console.log(total);
  });
  return callback(null, total);
}
module.exports = { validateOrder };
