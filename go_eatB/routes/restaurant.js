const express = require("express");
const restaurantController = require("../controllers/restaurant");

const router = express.Router();
router.get("/:id", restaurantController.getRestauarant);

module.exports = router;
