import { login } from "../services/auth";
import { searchUser } from "../services/user";

const handleLogin = async (username, password) => {
  try {
    const user = await login({ username, password });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const checkUsernameUnique = async (username) => {
  const { unique } = await searchUser(username);

  if (unique === "true") {
    console.log("unique");
    return true;
  } else {
    console.log("not unique");
    return false;
  }
};

const checkEmailUnique = async (email) => {
  return false;
};

export { handleLogin, checkUsernameUnique, checkEmailUnique };
