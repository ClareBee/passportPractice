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

app.get('/', function(req, res){
  res.render("home");
});
//secret page route to test authentication
app.get('/secret', function(req, res){
  res.render("secret");
});

app.listen("3000", function(){
  console.log("server started");
});
