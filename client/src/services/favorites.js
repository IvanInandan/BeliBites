import { apiClient } from "./apiClient";
const baseUrl = "/favorites";

const getFavoritesByUser = async (userId) => {
  const response = await apiClient.get(`${baseUrl}`, {
    user: userId,
  });
  return response.data;
};

const checkIfFavorited = async (userId, recipeId) => {
  const response = await apiClient.get(`${baseUrl}/check`, {
    params: { user: userId, recipe: recipeId },
  });
  return response.data;
};

const getFavoriteCount = async (recipeId) => {
  const response = await apiClient.get(`${baseUrl}/count`, {
    params: { recipe: recipeId },
  });
  return response.data;
};

const addFavorite = async ({ userId, recipeId }) => {
  const response = await apiClient.post(baseUrl, {
    params: {
      user: userId,
      recipe: recipeId,
    },
  });
  return response.data;
};

const removeFavorite = async (favoriteId) => {
  const response = await apiClient.delete(`${baseUrl}/${favoriteId}`);
  return response.data;
};

export default {
  getFavoritesByUser,
  checkIfFavorited,
  getFavoriteCount,
  addFavorite,
  removeFavorite,
};
