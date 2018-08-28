const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
  number: { type: Number, required: true, min: 0, max: 10000 },
  categories: { type: [String], required: true },
  authors: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Author", required: true }
  ]
});

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

module.exports.BookSchema = BookSchema;
module.exports.Book = Book;
module.exports.createBook = createBook;
module.exports.listBooks = listBooks;
