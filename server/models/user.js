const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minLength: 3,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  passwordHash: String,
  /*
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
  */
});

const User = mongoose.model("User", userSchema);

module.exports = User;
