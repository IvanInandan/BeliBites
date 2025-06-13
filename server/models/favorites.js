const mongoose = require("mongoose");

const favoritesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

favoritesSchema.index({ user: 1, recipe: 1 }, { unique: true });

const Favorites = mongoose.model("Favorites", favoritesSchema);

module.exports = Recipe;
