const mongoose = require("mongoose");
const Joi = require("joi");
const _ = require("lodash");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255
  },
  password: { type: String, required: true, minlength: 5, maxlength: 1024 }
});

const User = mongoose.model("User", userSchema);

async function createUser(name, email, password) {
  user = new User({
    name,
    email,
    password
  });
  try {
    await user.save();
    //pick name and email only
    return _.pick(user, ["_id", "name", "email"]);
  } catch (err) {
    console.log(err.message);
  }
}

async function listUsers() {
  const users = await User.find();
  return users;
}

function validateUser(User) {
  const Schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };
  return Joi.validate(User, Schema);
}

module.exports.userSchema = userSchema;
module.exports.User = User;
module.exports.createUser = createUser;
module.exports.listUsers = listUsers;
module.exports.validateUser = validateUser;
