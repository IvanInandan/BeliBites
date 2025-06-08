const User = require("../models/user");
const Recipe = require("../models/recipe");
const recipeRouter = require("express").Router();
const { tokenDecoder } = require("../utils/middleware");

//NOTE: tokenDecoder middleware runs before all functions that contain it, and sets request.user for all routes

recipeRouter.post("/", tokenDecoder, async (request, response, next) => {
  try {
    const body = request.body;
    const decodedToken = request.user;
    console.log("From token: ", decodedToken);

    const newRecipe = new Recipe({ ...body });
    const savedRecipe = await newRecipe.save();

    console.log(savedRecipe);

    return response.status(201).json(savedRecipe);
  } catch (error) {
    next(error);
  }
});

module.exports = recipeRouter;
