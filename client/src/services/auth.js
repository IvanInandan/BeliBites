import { apiClient } from "./apiClient";
const baseUrl = "/login";

const login = async (credentials) => {
  const response = await apiClient.post(baseUrl, credentials);
  return response.data;
};

export { login };
