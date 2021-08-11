import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slice/postsSlice";
import authReducer from "./slice/authSlice";
import logger from "redux-logger";

export default configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(logger),
  devTools: true,
});
