const mongoose = require("mongoose");

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

module.exports.AuthorSchema = AuthorSchema;
module.exports.Author = Author;
module.exports.createAuthor = createAuthor;
