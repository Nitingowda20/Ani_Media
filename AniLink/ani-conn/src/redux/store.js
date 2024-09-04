
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
// import postReducer from "./features/postSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    // posts: postReducer,
  },
});
