const express = require("express");
const router = express.Router();

const inventoryController = require("../controllers/inventory");

router.get("/check", inventoryController.getCheckInventory);

module.exports = router;
