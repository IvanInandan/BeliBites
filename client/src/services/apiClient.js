import axios from "axios";

let token = null;

// Use the env variable, fallback to "/api" (in case env var is missing)
const baseURL = import.meta.env.VITE_API_BASE_URL || "/api";

const apiClient = axios.create({
  baseURL,
});

apiClient.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = token;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export { apiClient, setToken, token };
