import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../api/index";

//FETCH ALL COMMENTS
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (parentPostId) => {
    const { data } = await API.get(`posts/${parentPostId}/comments`);

    return data;
  }
);

//CREATE COMMENT
export const createComment = createAsyncThunk(
  "comments/createComment",
  async (obj) => {
    const { postId, comment, creator } = obj;
    const { data } = await API.post(`posts/${postId}/comments`, {
      comment,
      creator,
    });

    return data;
  }
);

//LIKE COMMENT
export const likeComment = createAsyncThunk(
  "comments/likeComment",
  async (obj) => {
    const { postId, commentId, userId } = obj;
    const { data } = await API.post(
      `posts/${postId}/comments/${commentId}/likes`,
      { userId }
    );
    return data;
  }
);
//DISLIKE COMMENT
export const dislikeComment = createAsyncThunk(
  "comments/dislikeComment",
  async (obj) => {
    const { postId, commentId, userId } = obj;
    const { data } = await API.post(
      `posts/${postId}/comments/${commentId}/dislikes`,
      { userId }
    );
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
      action.payload.forEach((comment) => {
        const idx = state.comments.findIndex(
          (stateComment) => stateComment._id === comment._id
        );
        idx === -1 && state.comments.push(comment);
      });
    },
    [fetchComments.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    //CREATE COMMENT
    [createComment.pending]: (state) => {
      state.status = "loading";
    },
    [createComment.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.comments.push(action.payload);
    },
    [createComment.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    //LIKE COMMENT
    [likeComment.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.comments = state.comments.map((comment) =>
        comment._id === action.payload._id ? action.payload : comment
      );
    },
    [likeComment.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    //DISLIKE COMMENT
    [dislikeComment.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.comments = state.comments.map((comment) =>
        comment._id === action.payload._id ? action.payload : comment
      );
    },
    [dislikeComment.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const selectAllComments = (state) => state.comments;

export default commentsSlice.reducer;
