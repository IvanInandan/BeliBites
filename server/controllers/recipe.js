const User = require("../models/user");
const Recipe = require("../models/recipe");
const recipeRouter = require("express").Router();
const { tokenDecoder } = require("../utils/middleware");
const { request } = require("express");

//NOTE: tokenDecoder middleware runs before all functions that contain it, and sets request.user for all routes

recipeRouter.get("/", async (request, response, next) => {
  try {
    const recipes = await Recipe.find({}).populate("user", {
      username: 1,
    });
    response.json({ recipes });
  } catch (error) {
    next(error);
  }
});

recipeRouter.post("/", tokenDecoder, async (request, response, next) => {
  try {
    const body = request.body;
    const decodedToken = request.user;
    const user = await User.findById(decodedToken.id);

    const newRecipe = new Recipe({ ...body, user: decodedToken.id });
    const savedRecipe = await newRecipe.save();

    user.recipes = user.recipes.concat(savedRecipe._id); // Concat recipe database ID into user's recipe array
    await user.save(); // Save user to finalize change to transaction array

    return response.status(201).json(savedRecipe, user);
  } catch (error) {
    next(error);
  }
});

recipeRouter.delete("/:id", tokenDecoder, async (request, response, next) => {
  try {
    const recipe = await Recipe.findById(request.params.id);

    if (!recipe) {
      return response
        .status(404)
        .json({ error: `Recipe with ID ${request.params.id} was not found` });
    }

    const recipeUserId = request.user.id.toString();
    const tokenUserId = request.user.id;

    if (recipeUserId !== tokenUserId) {
      return response.status(401).json({
        error: "Auth Error: token user does not match transaction user",
      });
    }

    const deletedRecipe = await Recipe.findByIdAndDelete(request.params.id);

    response.status(201).json(deletedRecipe);

    // Find user of transaction in database, update user's 'recipes' to remove recipe ID from array
    await User.findByIdAndUpdate(recipeUserId, {
      $pull: { recipes: request.params.id },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = recipeRouter;
