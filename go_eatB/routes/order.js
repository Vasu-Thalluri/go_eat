const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");

router.post("/order", orderController.placeOrderReq);

module.exports = router;
