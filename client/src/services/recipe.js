import axios from "axios";
const baseUrl = "/api/recipes";

const createRecipe = async (recipe) => {
  try {
    console.log("Creating: ", recipe);
    return;
  } catch (error) {
    console.log(error);
    return;
  }
};

export { createRecipe };
