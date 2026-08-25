const express = require("express");
const router = express.Router();
const menuItemController = require("../controllers/menuItems");

router.get("/id", menuItemController.getMenuItems);

module.exports = router;
