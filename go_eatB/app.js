const express = require("express");
const customer = require("./routes/customer");

const app = express();

require("./config/db");

app.use(express.json());
app.use("/customer", customer);

app.listen(3000, function () {
  console.log("Server Running on Port 3000");
});
