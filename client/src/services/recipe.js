import { apiClient } from "./apiClient";
const baseUrl = "/recipes";

const getAllRecipes = async () => {
  const response = await apiClient.get(baseUrl);
  return response.data;
};

const createRecipe = async (recipe) => {
  const response = await apiClient.post(baseUrl, recipe);
  return response.data;
};

const updateRecipe = async (recipe, id) => {
  //const response = await apiClient.put(baseUrl, recipe);
  //return response.data
};

const deleteRecipe = async (id) => {
  //const response = await apiClient.post(`${baseUrl}/:${id}`)
  //return response.data
};

export default { getAllRecipes, createRecipe, updateRecipe, deleteRecipe };
