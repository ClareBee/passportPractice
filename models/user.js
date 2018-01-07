var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
  username: String,
  password: String
});

//adds methods to user schema tanks to PLM libraru
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
