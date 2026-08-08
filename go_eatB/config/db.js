const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "vasuT@55",
  database: "go_eat",
});

connection.connect(function (err) {
  if (err) {
    console.log("Database Connection Failed");
    console.log(err);
    return;
  }
  console.log("MySql Connected Successfully");
});

module.exports = connection;

//https://github.com/Vasu-Thalluri/go_eat
