import { apiClient } from "./apiClient";
const baseUrl = "/users";

const searchUser = async (username) => {
  const response = await apiClient.get(
    `${baseUrl}/check-username?username=${username}`
  );
  return response.data;
};

const searchEmail = async (email) => {
  const response = await apiClient.get(`${baseUrl}/check-email?email=${email}`);
  return response.data;
};

const createUser = async (credentials) => {
  const response = await apiClient.post(baseUrl, credentials);
  return response.data;
};

export { searchUser, searchEmail, createUser };
