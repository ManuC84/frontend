import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {},
  reducers: {
    fetchAll: (state, action) => (state = action.payload),
    create: (action) => {
      if (action.payload.message === "Existing Post") {
        return action.payload.response;
      } else if (action.payload.errorMessage) {
        return action.payload.errorMessage;
      } else {
        return [action.payload];
      }
    },
    fetchByTag: (action) => action.payload,
    addTags: (state, action) => {
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    },
  },
});

export const { create, fetchAll, fetchByTag, addTags } = postsSlice.actions;
export default postsSlice.reducer;
