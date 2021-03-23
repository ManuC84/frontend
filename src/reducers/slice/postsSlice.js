import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    isLoading: false,
    hasReceivedData: false,
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
      return {
        ...state,
        posts: action.payload,
        isLoading: false,
      };
    },
    fetchSinglePost: (state, action) => {
      return {
        ...state,
        posts: action.payload,
        hasReceivedData: true,
        loadMorePosts: false,
      };
    },
    fetchInfinite: (state, action) => {
      return {
        ...state,
        posts: state.posts.concat(action.payload),
      };
    },
    create: (state, action) => {
      return {
        ...state,
        posts: action.payload,
        loadMorePosts: false,
        error: false,
      };
    },
    fetchByTag: (state, action) => {
      return {
        ...state,
        posts: action.payload,
        isLoading: false,
        loadMorePosts: false,
      };
    },
    addTags: (state, action) => {
      return {
        ...state,
        error: false,
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
  fetchSinglePost,
} = postsSlice.actions;
export default postsSlice.reducer;
