const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("connecting mongo db ...."))
  .catch(err => console.log(err.message));

const BookSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
  number: { type: Number, required: true, min: 0, max: 10000 },
  categories: { type: [String], required: true },
  authors: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Author", required: true }
  ]
});

const AuthorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 10, max: 120, required: true }
});

const Author = mongoose.model("Author", AuthorSchema);

async function createAuthor(name, age) {
  let author = new Author({
    name,
    age
  });
  author = await author.save();
  console.log(author);
}

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

//createCustomer("seif", 28);

//createAuthor("anouar", 23);

const Book = mongoose.model("Book", BookSchema);

async function createBook(name, number, categories, authorsIds) {
  let book = new Book({
    name,
    categories,
    authors: authorsIds,
    number
  });
  book = await book.save();
  console.log(book);
}

async function listBooks() {
  const books = await Book.find().populate("authors");
  console.log(books[0]);
}

// async function addAuthor(bookId , authorId){
//     const book = await Book.findById(bookId);
//     if(!book) {console.log("book id not found")
// return ;}

// }
//listBooks();

// createBook(
//   "anouar",
//   5,
//   ["thruller", "horror"],
//   ["5b8513f601170d1e3cbf95aa", "5b851a9f9d053f3bd05d974c"]
// );

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

createRental("5b852da3c8d50925b4043465", "5b852725bc623f419828ab80");

getRental();
