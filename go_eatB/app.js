const express = require("express");
const customer = require("./routes/customer");
const restaurant = require("./routes/restaurant");
const placeOrder = require("./routes/order");

const app = express();

require("./config/db");

app.use(express.json());
app.use("/customer", customer);
app.use("/restaurant", restaurant);
app.use("/place", placeOrder);

app.listen(3000, function () {
  console.log("Server Running on Port 3000");
});
