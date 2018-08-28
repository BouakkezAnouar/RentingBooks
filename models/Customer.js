const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 10, max: 120, required: true }
});

const Customer = mongoose.model("Customer", CustomerSchema);

async function createCustomer(name, age) {
  let customer = new Customer({
    name,
    age
  });
  customer = await customer.save();
  console.log(customer);
}

exports.CustomerSchema = CustomerSchema;
exports.Customer = Customer;
exports.createCustomer = createCustomer;
