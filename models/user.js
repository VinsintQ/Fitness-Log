const mongoose = require("mongoose");

const Workout = new mongoose.Schema({
  Type: {
    type: String,
    enum: ["Running", "Walking", "Swiming", "Cycling"],
  },
  Time: Number,
  Calories: Number,
  Date: Date,
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  gender: String,
  age: Number,
  weight: Number,
  height: Number,
  Workouts: [Workout],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
