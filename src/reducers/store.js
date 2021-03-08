import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slice/postsSlice";

export default configureStore({
  reducer: {
    posts: postsReducer,
  },
  devTools: true,
});
