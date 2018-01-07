var express = require("express");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/authdemoapp");
var app = express();

app.set('view engine', 'ejs');

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
