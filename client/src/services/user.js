import axios from "axios";
const baseUrl = "/api/users";

const searchUser = async (username) => {
  const response = await axios.get(
    `${baseUrl}/check-username?username=${username}`
  );
  return response.data;
};

const createUser = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export { searchUser, createUser };
