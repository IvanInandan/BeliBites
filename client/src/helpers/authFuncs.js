import { login } from "../services/auth";
import { searchUser, searchEmail } from "../services/user";

const handleLogin = async (username, password) => {
  try {
    const user = await login({ username, password });
    console.log(user);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const checkUsernameUnique = async (username) => {
  const { unique } = await searchUser(username);

  if (unique === "true") return true;
  else return false;
};

const checkEmailUnique = async (email) => {
  const { unique } = await searchEmail(email);

  if (unique === "true") return true;
  else return false;
};

export { handleLogin, checkUsernameUnique, checkEmailUnique };
