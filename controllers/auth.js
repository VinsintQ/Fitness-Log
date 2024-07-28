const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
// const bcrypt = require('bcrypt');

router.get("/auth/sign-in", (req, res) => {
  res.render("auth/sign-in.ejs");
});

router.get("/auth/register", (req, res) => {
  res.render("auth/register.ejs");
});
router.post("/auth/register", async (req, res) => {
  try {
    // Check if the username is already taken
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.send("Username already taken.");
    }

    // Username is not taken already!
    // Check if the password and confirm password match
    if (req.body.password !== req.body.confirmPassword) {
      return res.send("Password and Confirm Password must match");
    }

    // Must hash the password before sending to the database
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;

    // All ready to create the new user!
    await User.create(req.body);

    res.redirect("/auth/sign-in");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

module.exports = router;
