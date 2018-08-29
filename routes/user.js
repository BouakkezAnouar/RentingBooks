const { User, validateUser, createUser } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });

  if (user) return res.status(400).send("user already registred !");

  user = await createUser(req.body.name, req.body.email, req.body.password);
  res.send(user);
});

module.exports = router;
