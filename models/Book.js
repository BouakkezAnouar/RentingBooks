const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  number: { type: Number, required: true, min: 0, max: 10000 },
  categories: { type: [String], required: true },
  authors: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Author", required: true }
  ]
});

const Book = mongoose.model("Book", BookSchema);

async function createBook(name, number, categories, authorsIds) {
  const book = new Book({
    name,
    categories,
    authors: authorsIds,
    number
  });
  console.log(await book.save());
  return book;
}

async function listBooks() {
  const books = await Book.find().populate("authors");
  return books;
}

module.exports.BookSchema = BookSchema;
module.exports.Book = Book;
module.exports.createBook = createBook;
module.exports.listBooks = listBooks;
