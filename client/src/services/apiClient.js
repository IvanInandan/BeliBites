import axios from "axios";

let token = null;

const apiClient = axios.create({
  baseURL: "/api",
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
