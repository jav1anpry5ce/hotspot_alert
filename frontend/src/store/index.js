import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postSlice";
import authReducer from "./authSlice";
import navReducer from "./navSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    navbar: navReducer,
  },
  devTools: true,
});
