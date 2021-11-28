import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../api/index";

//FETCH ALL COMMENT REPLIES
export const fetchCommentReplies = createAsyncThunk(
  "commentReplies/fetchCommentReplies",
  async (obj) => {
    const { postId, commentId } = obj;
    const { data } = await API.get(`posts/${postId}/comments/${commentId}/commentReplies`);

    return data;
  }
);

//FETCH SINGLE COMMENT REPLY
export const fetchSingleCommentReply = createAsyncThunk(
  "commentReplies/fetchSingleCommentReply",
  async (obj) => {
    const { postId, commentId, commentReplyId } = obj;
    const { data } = await API.get(
      `posts/${postId}/comments/${commentId}/commentReplies/${commentReplyId}`
    );
    return data;
  }
);

//CREATE COMMENT REPLY
export const createCommentReply = createAsyncThunk(
  "commentsReplies/createCommentReply",
  async (obj) => {
    const { postId, commentId, commentReply, creator, replyCreatorId } = obj;
    const { data } = await API.post(`posts/${postId}/comments/${commentId}`, {
      commentReply,
      creator,
      replyCreatorId,
    });
    return data;
  }
);

//LIKE COMMENT REPLY
export const likeCommentReply = createAsyncThunk("commentReplies/likeCommentReply", async (obj) => {
  const { postId, commentId, commentReplyId, userId } = obj;
  const { data } = await API.post(
    `posts/${postId}/comments/${commentId}/commentReplies/${commentReplyId}/likes`,
    { userId }
  );
  return data;
});

//DISLIKE COMMENT REPLY
export const dislikeCommentReply = createAsyncThunk(
  "commentReplies/dislikeCommentReply",
  async (obj) => {
    const { postId, commentId, commentReplyId, userId } = obj;
    const { data } = await API.post(
      `posts/${postId}/comments/${commentId}/commentReplies/${commentReplyId}/dislikes`,
      { userId }
    );

    return data;
  }
);

//EDIT COMMENT REPLY
export const editCommentReply = createAsyncThunk("commentReplies/editCommentReply", async (obj) => {
  const { postId, commentId, commentReplyId, commentReplyText } = obj;
  const { data } = await API.put(
    `posts/${postId}/comments/${commentId}/commentReplies/${commentReplyId}/edit`,
    {
      commentReplyText,
    }
  );

  return data;
});

//DELETE COMMENT REPLY
export const deleteCommentReply = createAsyncThunk(
  "commentReply/deleteCommentReply",
  async (obj) => {
    const { postId, commentId, commentReplyId } = obj;
    const { data } = await API.delete(
      `posts/${postId}/comments/${commentId}/commentReplies/${commentReplyId}/delete`
    );

    return data;
  }
);

export const commentRepliesSlice = createSlice({
  name: "commentRepliesReducer",
  initialState: {
    commentReplies: [],
    error: null,
    status: "idle",
    showAllReplies: true,
  },

  reducers: {
    filterNotificationReply: (state, action) => {
      state.commentReplies = state.commentReplies.filter(
        (commentReply) => commentReply._id === action.payload
      );
    },
  },
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
      state.showAllReplies = false;
    },
    [fetchCommentReplies.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    //FETCH SINGLE COMMENT REPLY
    [fetchSingleCommentReply.pending]: (state) => {
      state.status = "loading";
    },
    [fetchSingleCommentReply.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.commentReplies = action.payload;
      state.showAllReplies = true;
    },
    [fetchSingleCommentReply.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    //CREATE COMMENT REPLY
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
    //LIKE COMMENT REPLY
    [likeCommentReply.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.commentReplies = state.commentReplies.map((commentReply) =>
        commentReply._id === action.payload._id ? action.payload : commentReply
      );
    },
    [likeCommentReply.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    //DISLIKE COMMENT REPLY
    [dislikeCommentReply.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.commentReplies = state.commentReplies.map((commentReply) =>
        commentReply._id === action.payload._id ? action.payload : commentReply
      );
    },
    [dislikeCommentReply.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    //EDIT COMMENT REPLY
    [editCommentReply.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.commentReplies = state.commentReplies.map((commentReply) =>
        commentReply._id === action.payload._id ? action.payload : commentReply
      );
    },
    [editCommentReply.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    //DELETE COMMENT REPLY
    [deleteCommentReply.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.commentReplies = state.commentReplies.filter(
        (commentReply) => commentReply._id !== action.payload._id
      );
    },
    [deleteCommentReply.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { filterNotificationReply } = commentRepliesSlice.actions;

export default commentRepliesSlice.reducer;
