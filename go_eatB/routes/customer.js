const express = require("express");

const router = express.Router();

const customerController = require("../controllers/customer");
router.get("/:id", customerController.getCustomer);

module.exports = router;
