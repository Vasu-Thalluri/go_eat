const express = require("express");
const customer = require("./routes/customer");
const restaurant = require("./routes/restaurant");
const menuItems = require("./routes/menuItems");
const placeOrder = require("./routes/order");
const inventory = require("./routes/inventory");

const app = express();

require("./config/db");

app.use(express.json());
app.use("/customer", customer);
app.use("/restaurant", restaurant);
app.use("/menuItem", menuItems);
app.use("/inventory", inventory);
app.use("/place", placeOrder);

app.listen(3000, function () {
  console.log("Server Running on Port 3000");
});
