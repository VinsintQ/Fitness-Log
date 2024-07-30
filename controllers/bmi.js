const express = require("express");
const router = express.Router();

const User = require("../models/user");
const { render } = require("ejs");

router.get("/", async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
  
      res.render("bmi/index.ejs", {
    
        weight :currentUser.weight,
        height :currentUser.height,
      });
    } catch (error) {
      console.log(error);
      res.redirect("/");
    }
  });

router.get("/edit",async (req,res)=>{

    const currentUser = await User.findById(req.session.user._id);

    res.render("bmi/edit.ejs", {
        weight :currentUser.weight,
        height :currentUser.height,
      });
})

router.put("/",async (req,res)=>{

    const currentUser = await User.findByIdAndUpdate(req.session.user._id,req.body);

    res.redirect(`/users/${currentUser._id}/bmi`)
})

module.exports = router;