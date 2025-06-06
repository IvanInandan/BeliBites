import { login } from "../services/auth";
import { setUser, clearUser } from "../reducers/userReducer";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();

  const handleLogin = async (username, password) => {
    try {
      const user = await login({ username, password });
      dispatch(setUser(user));

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      dispatch(clearUser());
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return { handleLogin, handleLogout };
};
