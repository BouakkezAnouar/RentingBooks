const mongoose = require("mongoose");
const { Book } = require("./Book");
const { Customer } = require("./Customer");

const RentalSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Book" },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Customer"
  }
});

const Rental = mongoose.model("Rental", RentalSchema);

async function createRental(bookId, customerId) {
  let book = await Book.findById(bookId);
  if (!book) {
    console.log("book id not found");
    return;
  }
  if (book.number <= 0) {
    console.log("book is out of stock !");
    return;
  }
  if (!moongoose.Types.ObjectId.isValid(requestAnimationFrame.body.customerId))
    return res.status(400).send("Invalid customer");

  let customer = await Customer.findById(customerId);
  if (!customer) {
    console.log("customer id not found !");
    return;
  }

  book.number--;
  book = await book.save();

  let rental = new Rental({
    book: bookId,
    customer: customerId
  });
  rental = await rental.save();
  // console.log(rental);
}

async function getRental() {
  const rental = await Rental.find().populate("customer book");
  console.log(rental);
}

exports.RentalSchema = RentalSchema;
exports.Rental = Rental;
exports.createRental = createRental;
exports.getRental = getRental;
