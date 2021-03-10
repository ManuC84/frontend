import { createSlice } from "@reduxjs/toolkit";
import * as API from "../../api/index";

export const postsSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    fetchAll: (state, action) => (state = action.payload),
    create: (state, action) => {
      if (action.payload.message === "Existing Post") {
        return action.payload.response;
      } else {
        return [action.payload];
      }
    },
  },
});

export const { create, fetchAll } = postsSlice.actions;

// Async actions
export const submitSearch = (url) => async (dispatch) => {
  try {
    const { data } = await API.createPost(url);
    dispatch(create(data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchPosts = () => async (dispatch) => {
  try {
    const { data } = await API.getPosts();
    dispatch(fetchAll(data));
  } catch (error) {}
};

export default postsSlice.reducer;
