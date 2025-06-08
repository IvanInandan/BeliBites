const User = require("../models/user");
const Recipe = require("../models/recipe");
const recipeRouter = require("express").Router();
const { tokenDecoder } = require("../utils/middleware");

//NOTE: tokenDecoder middleware runs before all functions that contain it, and sets request.user for all routes

recipeRouter.post("/", tokenDecoder, async (request, response, next) => {
  try {
    const body = request.body;
    const decodedToken = request.user;
    const user = await User.findById(decodedToken.id);

    const newRecipe = new Recipe({ ...body, authorId: decodedToken.id });
    const savedRecipe = await newRecipe.save();

    user.recipes = user.recipes.concat(savedRecipe._id); // Concat recipe database ID into user's recipe array
    await user.save(); // Save user to finalize change to transaction array

    return response.status(201).json(savedRecipe, user);
  } catch (error) {
    next(error);
  }
});

module.exports = recipeRouter;
