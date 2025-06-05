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

export { handleLogin };
