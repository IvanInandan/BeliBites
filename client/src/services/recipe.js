import axios from "axios";
const baseUrl = "/api/recipes";

const createRecipe = async (recipe) => {
  const response = axios.post(baseUrl, recipe);
  return response.data;
};

export { createRecipe };
