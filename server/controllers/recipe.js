const User = require("../models/user");
const Recipe = require("../models/recipe");
const recipeRouter = require("express").Router();

recipeRouter.post("/", async (request, response, next) => {
  console.log("Request: ", request.headers);
  try {
    const body = request.body;
    const newRecipe = new Recipe({ ...body });
    const savedRecipe = await newRecipe.save();

    console.log(savedRecipe);

    return response.status(201).json(savedRecipe);
  } catch (error) {
    next(error);
  }
});

module.exports = recipeRouter;
