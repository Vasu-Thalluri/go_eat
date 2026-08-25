const orderService = require("../services/order");

function placeOrderReq(req, res) {
  //console.log(req.body);
  const { customer_id, restaurant_id, items, paymentMethod } = req.body;
  // console.log(
  //   `c is ${customer_id} and r is ${restaurant_id} and i are m is ${items[0].menuItemId} & Q is ${items[0].quantity} and p is ${paymentMethod}`,
  // );
  orderService.validateOrder(
    customer_id,
    restaurant_id,
    items,
    paymentMethod,
    function (err, result) {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      res.status(201).json({
        success: true,
        message: "Order process completed",
        data: result,
      });
    },
  );
}

module.exports = { placeOrderReq };
