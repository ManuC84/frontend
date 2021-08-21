import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../api/index";

//FETCH ALL COMMENT REPLIES
export const fetchCommentReplies = createAsyncThunk(
  "commentReplies/fetchCommentReplies",
  async (obj) => {
    const { postId, commentId } = obj;
    const { data } = await API.get(
      `posts/${postId}/comments/${commentId}/commentReplies`
    );

    return data;
  }
);

//CREATE COMMENT REPLY
export const createCommentReply = createAsyncThunk(
  "commentsReplies/createCommentReply",
  async (obj) => {
    const { postId, commentId, commentReply, creator } = obj;
    const { data } = await API.post(`posts/${postId}/comments/${commentId}`, {
      commentReply,
      creator,
    });
    return data;
  }
);

// //LIKE COMMENT
// export const likeComment = createAsyncThunk(
//   "comments/likeComment",
//   async (obj) => {
//     const { postId, commentId, userId } = obj;
//     const { data } = await API.post(
//       `posts/${postId}/comments/${commentId}/likes`,
//       { userId }
//     );
//     return data;
//   }
// );
// //DISLIKE COMMENT
// export const dislikeComment = createAsyncThunk(
//   "comments/dislikeComment",
//   async (obj) => {
//     const { postId, commentId, userId } = obj;
//     const { data } = await API.post(
//       `posts/${postId}/comments/${commentId}/dislikes`,
//       { userId }
//     );

//     return data;
//   }
// );
// //EDIT COMMENT
// export const editComment = createAsyncThunk(
//   "comments/editComment",
//   async (obj) => {
//     const { postId, commentId, commentText } = obj;
//     const { data } = await API.put(
//       `posts/${postId}/comments/${commentId}/edit`,
//       {
//         commentText,
//       }
//     );

//     return data;
//   }
// );
// //DELETE COMMENT
// export const deleteComment = createAsyncThunk(
//   "comments/deleteComment",
//   async (obj) => {
//     const { postId, commentId } = obj;
//     const { data } = await API.delete(
//       `posts/${postId}/comments/${commentId}/delete`
//     );

//     return data;
//   }
// );

export const commentRepliesSlice = createSlice({
  name: "commentRepliesReducer",
  initialState: { commentReplies: [], error: null, status: "idle" },

  reducers: {},
  extraReducers: {
    // //FETCH ALL COMMENT REPLIES
    [fetchCommentReplies.pending]: (state) => {
      state.status = "loading";
    },
    [fetchCommentReplies.fulfilled]: (state, action) => {
      state.status = "succeeded";
      action.payload.forEach((commentReply) => {
        const idx = state.commentReplies.findIndex(
          (stateCommentReply) => stateCommentReply._id === commentReply._id
        );
        idx === -1 && state.commentReplies.push(commentReply);
      });
    },
    [fetchCommentReplies.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    //CREATE COMMENT
    [createCommentReply.pending]: (state) => {
      state.status = "loading";
    },
    [createCommentReply.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.commentReplies.push(action.payload);
    },
    [createCommentReply.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    // //LIKE COMMENT
    // [likeComment.fulfilled]: (state, action) => {
    //   state.status = "succeeded";
    //   state.comments = state.comments.map((comment) =>
    //     comment._id === action.payload._id ? action.payload : comment
    //   );
    // },
    // [likeComment.rejected]: (state, action) => {
    //   state.status = "failed";
    //   state.error = action.error.message;
    // },
    // //DISLIKE COMMENT
    // [dislikeComment.fulfilled]: (state, action) => {
    //   state.status = "succeeded";
    //   state.comments = state.comments.map((comment) =>
    //     comment._id === action.payload._id ? action.payload : comment
    //   );
    // },
    // [dislikeComment.rejected]: (state, action) => {
    //   state.status = "failed";
    //   state.error = action.error.message;
    // },
    // //EDIT COMMENT
    // [editComment.fulfilled]: (state, action) => {
    //   state.status = "succeeded";
    //   state.comments = state.comments.map((comment) =>
    //     comment._id === action.payload._id ? action.payload : comment
    //   );
    // },
    // [editComment.rejected]: (state, action) => {
    //   state.status = "failed";
    //   state.error = action.error.message;
    // },
    // //DELETE COMMENT
    // [deleteComment.fulfilled]: (state, action) => {
    //   state.status = "succeeded";
    //   state.comments = state.comments.filter(
    //     (comment) => comment._id !== action.payload._id
    //   );
    // },
    // [deleteComment.rejected]: (state, action) => {
    //   state.status = "failed";
    //   state.error = action.error.message;
    // },
  },
});

export default commentRepliesSlice.reducer;
