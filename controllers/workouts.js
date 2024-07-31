const express = require("express");
const router = express.Router();

const User = require("../models/user");
const { render } = require("ejs");

router.get("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    res.render("workouts/index.ejs", {
      workouts: currentUser.Workouts,
      weight :currentUser.weight,
      height :currentUser.height,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/new", async (req, res) => {
  res.render("workouts/new.ejs");
});

router.post("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    req.body.Date = new Date(req.body.Date);

    currentUser.Workouts.push(req.body);
    // Save changes to the user
    await currentUser.save();

    res.redirect(`/users/${currentUser._id}/workouts`);
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect("/");
  }
});

router.get("/:workoutId", async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Find the application by the applicationId supplied from req.params
    const workout = currentUser.Workouts.id(req.params.workoutId);
    // Render the show view, passing the application data in the context object
    res.render("workouts/show.ejs", {
      workout,
    });
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect("/");
  }
});
router.delete("/:workoutId", async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Use the Mongoose .deleteOne() method to delete
    // an application using the id supplied from req.params
    currentUser.Workouts.id(req.params.workoutId).deleteOne();
    // Save changes to the user
    await currentUser.save();
    // Redirect back to the applications index view
    res.redirect(`/users/${currentUser._id}/workouts`);
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect("/");
  }
});

router.get("/:workoutId/edit", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const workout = currentUser.Workouts.id(req.params.workoutId);

    res.render("workouts/edit.ejs", {
      workout: workout,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.put("/:workoutId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const workout = currentUser.Workouts.id(req.params.workoutId);
    id = req.params.workoutId;
    workout.set(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/workouts/${id}`);
  } catch (err) {
    console.log(err);
    res.redirect(`/`);
  }
});

module.exports = router;
