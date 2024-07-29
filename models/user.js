const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Running", "Walking", "Swimming", "Cycling"],
  },
  Distance: Number,
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
  Workouts: [WorkoutSchema],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
