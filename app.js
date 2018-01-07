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
//we need this line every time we set up a form
app.use(bodyParser.urlencoded({extended: true}));
//sets up passport session
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
//convention to call this the same as the GET route
app.post("/register", function(req, res){
  req.body.username
  req.body.password
  //don't pass in the password into the database but pass it as a second argument to .register() which hashes it
  User.register(new User({username: req.body.username}), req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render("register");
    }
      //log the user in and store the info/runs serialize methods - "local" is the name of the strategy - could be "twitter" etc
    passport.authenticate("local")(req, res, function(){
        res.redirect("/secret");
      });
  });

});
app.listen("3000", function(){
  console.log("server started");
});
