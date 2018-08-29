const express = require("express");
const Joi = require("joi");
const router = express.Router();
const { Book, createBook, listBooks } = require("../models/Book");

router.get("/", async (req, res) => {
  const books = await listBooks();
  res.send(books);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const book = await createBook(
    req.body.name,
    req.body.number,
    req.body.categories,
    req.body.authorsIds
  );
  res.send(book);
});

validate = book => {
  const Schema = {
    name: Joi.string()
      .required()
      .min(3)
      .max(50),
    number: Joi.number()
      .min(0)
      .max(10000),
    categories: Joi.array().items(Joi.string()),
    authorsIds: Joi.array()
      .items(Joi.objectId())
      .required()
  };
  return Joi.validate(book, Schema);
};

module.exports.router = router;
module.exports.validate = validate;
