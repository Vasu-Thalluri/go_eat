const customerService = require("../services/customer");

function getCustomer(req, res) {
  const customerId = req.params.id;
  console.log(customerId);
  customerService.validateCustomer(customerId, function (err, customer) {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    res.status(200).json({ success: true, data: customer });
  });
}
module.exports = { getCustomer };
