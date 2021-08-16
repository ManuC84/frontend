import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../api/index";

//FETCH ALL COMMENTS
export const fetchComments = createAsyncThunk(
  "posts/fetchComments",
  async (parentPostId) => {
    const { data } = await API.get(`posts/${parentPostId}/comments`);

    return data;
  }
);

export const commentsSlice = createSlice({
  name: "commentsReducer",
  initialState: { comments: [], error: null, status: "idle" },

  reducers: {},
  extraReducers: {
    //FETCH ALL COMMENTS
    [fetchComments.pending]: (state) => {
      state.status = "loading";
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.status = "succeeded";
  
    //   state.comments = state.comments.concat(action.payload);
    action.payload.forEach(comment=> {
        const idx = state.comments.findIndex(stateComment => stateComment._id === comment._id)
        idx === -1 && state.comments.push(comment)
    })
   
    },
    [fetchComments.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const selectAllComments = (state) => state.comments;

export default commentsSlice.reducer;
