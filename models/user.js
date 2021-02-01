const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    maxlength: 20,
    minlength: 5,
  },

  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", schema); //collection name : users

module.exports = User;
