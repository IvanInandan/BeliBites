import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import userRecipes from "./reducers/userRecipesReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
