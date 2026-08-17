const restaurantService = require("../services/restaurant");

function getRestauarant(req, res) {
  const restaurantId = req.params.id;
  restaurantService.validateRestaurant(
    restaurantId,
    function (err, restaurant) {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      return res.status(200).json({ success: true, data: restaurant });
    },
  );
}

module.exports = { getRestauarant };
