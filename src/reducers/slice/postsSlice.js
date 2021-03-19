import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    isLoading: false,
    error: false,
    loadMorePosts: true,
  },
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    hasError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    hasMore: (state, action) => {
      state.loadMorePosts = action.payload;
    },
    fetchAll: (state, action) => {
      // We need to return a new state object
      return {
        // that has all the existing state data
        ...state,
        // but has a new array for the `posts` field
        posts:
          // and the new posts object
          action.payload,
        isLoading: false,
      };
    },
    fetchInfinite: (state, action) => {
      return {
        ...state,
        posts: state.posts.concat(action.payload),
      };
    },
    create: (state, action) => {
      if (action.payload.message === "Existing Post") {
        return { ...state, posts: action.payload.response };
      } else {
        return { ...state, posts: [action.payload, ...state.posts] };
      }
    },
    fetchByTag: (state, action) => {
      return {
        ...state,
        posts: action.payload,
        isLoading: false,
      };
    },
    addTags: (state, action) => {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    },
  },
});

export const {
  create,
  fetchAll,
  fetchByTag,
  addTags,
  startLoading,
  hasError,
  fetchInfinite,
  hasMore,
} = postsSlice.actions;
export default postsSlice.reducer;
