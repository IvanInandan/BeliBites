const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: {
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
    enum: ["easy", "medium", "hard", "zeff"],
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
    type: [
      {
        step: Number,
        description: String,
      },
    ],
    required: true,
  },
  imageUrl: String,
  tags: [String],
  visibility: {
    type: String,
    enum: ["public", "private"],
    required: true,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
});

recipeSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = document._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
