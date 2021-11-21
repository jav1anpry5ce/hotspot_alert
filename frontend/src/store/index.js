import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postSlice";
import authReducer from "./authSlice";
import navReducer from "./navSlice";
import wantedReducer from "./wantedSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    navbar: navReducer,
    wanted: wantedReducer,
  },
  devTools: true,
});
