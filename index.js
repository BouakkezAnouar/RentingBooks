const mongoose = require("mongoose");
const express = require("express");
const app = express();
const customerRoute = require("./routes/customer");
const bookRoute = require("./routes/book");
const rentalRoute = require("./routes/rental");
const authorRoute = require("./routes/author");
const { createBook, listBooks } = require("./models/Book");
const { createAuthor } = require("./models/Author");
const { createCustomer } = require("./models/Customer");
const { createRental, getRental } = require("./models/Rental");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("connecting mongo db ...."))
  .catch(err => console.log(err.message));

createCustomer("seif", 28);

//createAuthor("anouar", 23);

//listBooks();

// createBook(
//   "anouar",
//   5,
//   ["thruller", "horror"],
//   ["5b8513f601170d1e3cbf95aa", "5b851a9f9d053f3bd05d974c"]
// );

//createRental("5b852da3c8d50925b4043465", "5b852725bc623f419828ab80");

//getRental();
