import authService from "../services/auth";

const handleLogin = async (username, password) => {
  try {
    const user = await authService.login({ username, password });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const checkUsernameUnique = async (username) => {
  return false;
};

const checkEmailUnique = async (email) => {
  return false;
};

export { handleLogin, checkUsernameUnique, checkEmailUnique };
