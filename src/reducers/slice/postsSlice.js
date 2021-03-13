import { createSlice } from "@reduxjs/toolkit";

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
    fetchByTag: (state, action) => (state = action.payload),
  },
});

export const { create, fetchAll, fetchByTag } = postsSlice.actions;
export default postsSlice.reducer;
