var   express = require("express"),
      mongoose = require("mongoose"),
      passport = require("passport"),
      bodyParser = require("body-parser"),
      User = require("./models/user"),
      LocalStrategy = require("passport-local"),
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

//creates new "local" strategy using authenticate method from passport local mongoose
passport.use(new LocalStrategy(User.authenticate()))
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
// ++++++++++++++++++++++++++++++++++++++++++++++++
// LOGIN ROUTES
//render log in form
app.get("/login", function(req, res){
  res.render("login");
});
//log in logic - uses authenticate as middleware (runs before the final callback - ie in the middle of the route)
app.post("/login", passport.authenticate("local",{
  successRedirect: "/secret",
  failureRedirect: "/login"
}), function(req, res){

});

// =================================================
app.listen("3000", function(){
  console.log("server started");
});
