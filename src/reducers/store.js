import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slice/postsSlice";
import authReducer from "./slice/authSlice";
import commentsReducer from "./slice/commentsSlice";
import logger from "redux-logger";

export default configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    comments: commentsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(logger),
  devTools: true,
});
