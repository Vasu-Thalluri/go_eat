const express = require("express");

const app = express();

require("./config/db");

app.use(express.json());

app.listen(3000, function () {
  console.log("Server Running on Port 3000");
});
