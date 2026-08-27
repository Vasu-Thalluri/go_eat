const restaurantModel = require("../models/restaurant");

function validateRestaurant(restaurantId, callback) {
  //console.log(restaurantId);
  restaurantModel.restaurantById(restaurantId, function (err, restaurant) {
    // console.log(err);
    if (err) {
      return callback(err);
    }
    if (!restaurant) {
      return callback(new Error("Restaurant is not found"));
    }
    if (!restaurant.is_open) {
      return callback(new Error("Restaurant is closed"));
    }
    callback(null, restaurant);
  });
}

module.exports = { validateRestaurant };
