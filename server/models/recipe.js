const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  serving: {
    type: Number,
    required: true,
  },
  prepTime: {
    type: Number,
    required: true,
  },
  cookTime: {
    type: Number,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard", "Zeff"],
    required: true,
  },
  materials: {
    type: [String],
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  steps: {
    type: {
      step: Number,
      description: String,
    },
    required: true,
  },
  imageUrl: String,
  tags: [String],
  public: {
    type: String,
    enum: ["public", "private"],
    required: true,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
