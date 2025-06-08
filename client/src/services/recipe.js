import { apiClient } from "./apiClient";
const baseUrl = "/recipes";

const createRecipe = async (recipe) => {
  const response = await apiClient.post(baseUrl, recipe);
  return response.data;
};

export { createRecipe };
