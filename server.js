const express = require('express');
const morgan = require('morgan')
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const session = require("express-session");
const methodOverride = require("method-override");
//definign port
const port = process.env.PORT ? process.env.PORT : "3000";
//Controllers
const authController = require("./controllers/auth.js");


//Middleware 


app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.get('/',(req,res)=>{

    res.render('index.ejs')
})


// app.use(passUserToView)
app.use('/',authController);











app.listen(port, () => {
    console.log(`The express app is ready on port ${port}!`);
  });