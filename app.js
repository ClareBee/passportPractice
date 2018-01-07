var   express = require("express"),
      mongoose = require("mongoose"),
      passport = require("passport"),
      bodyParser = require("body-parser"),
      User = require("./models/user"),
      localStrategy = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost/authdemoapp");

var app = express();
app.set('view engine', 'ejs');

app.use(require("express-session")({
  secret: 'Open sesame',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//reading the data from the session - encoding and decoding (thanks to passport local mongoose)
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//===========================================
// ROUTES

app.get('/', function(req, res){
  res.render("home");
});
//secret page route to test authentication
app.get('/secret', function(req, res){
  res.render("secret");
});
// +++++++++++++++++++++++++++++++++++++++++++++
// AUTH ROUTES
//show sign-up form
app.get("/register", function(req, res){
  res.render("register");
});
app.listen("3000", function(){
  console.log("server started");
});
