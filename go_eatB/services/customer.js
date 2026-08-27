const customerModel = require("../models/customer");

function validateCustomer(customerId, callback) {
  //console.log("service", customerId);
  customerModel.findByCustomerId(customerId, function (err, customer) {
    //console.log(customer);
    if (err) {
      return callback(err);
    }
    if (!customer) {
      return callback(new Error("Customer not found"));
    }
    if (customer.status !== "ACTIVE") {
      return callback(new Error("Customer is not in active"));
    }
    callback(null, customer);
  });
}
module.exports = { validateCustomer };
