const mongoose = require("mongoose");
const express = require("express");
const app = express();
const customerRoute = require("./routes/customer");
const { router: bookRoute } = require("./routes/book");
const rentalRoute = require("./routes/rental");
const authorRoute = require("./routes/author");
const userRoute = require("./routes/user");
const { createBook, listBooks } = require("./models/Book");
const auth = require("./routes/auth");
const { createAuthor } = require("./models/Author");
const { createCustomer } = require("./models/Customer");
const { createRental, getRental } = require("./models/Rental");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use("/api/customer", customerRoute);
app.use("/api/book", bookRoute);
// app.use("/api/author", authorRoute);
// app.use("/api/rental", rentalRoute);
app.use("/api/user", userRoute);
app.use("/api/auth", auth);

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("connecting mongo db ...."))
  .catch(err => console.log(err.message));

app.listen(5000, function() {
  console.log(" listening on port 5000!");
});

//createCustomer("seif", 28);

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
