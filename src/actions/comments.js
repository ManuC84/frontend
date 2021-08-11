import * as API from "../api/index";
import {
  fetchComments,
  fetchCommentReplies,
  createComment,
  createCommentReply,
  hasError,
  startLoading,
  addCommentLike,
  addCommentDislike,
  addCommentReplyLike,
  addCommentReplyDislike,
  editComment,
  editCommentReply,
  deleteComment,
  deleteCommentReply,
} from "../reducers/slice/postsSlice";

export const getComments = (parentPostId) => async (dispatch) => {
  dispatch(startLoading);
  try {
    const response = await API.fetchComments(parentPostId);
    if (response.data.length > 0) dispatch(fetchComments(response.data));
  } catch (error) {
    dispatch(hasError(error.response.data));
  }
};

export const addComment = (id, payload) => async (dispatch) => {
  dispatch(startLoading);
  try {
    const { data } = await API.addComments(id, payload);
    dispatch(createComment(data));
  } catch (error) {
    dispatch(hasError(error.response.data));
  }
};

export const getCommentReplies =
  (parentPostId, parentCommentId) => async (dispatch) => {
    dispatch(startLoading);
    try {
      const { data } = await API.fetchCommentReplies(
        parentPostId,
        parentCommentId
      );
      dispatch(fetchCommentReplies(data));
    } catch (error) {
      dispatch(hasError(error.response.data));
    }
  };

export const addCommentReply =
  (postId, commentId, payload) => async (dispatch) => {
    dispatch(startLoading);
    try {
      const { data } = await API.addCommentReply(postId, commentId, payload);
      dispatch(createCommentReply(data));
    } catch (error) {
      dispatch(hasError(error.response.data));
    }
  };

export const likeComment = (postId, commentId, userId) => async (dispatch) => {
  try {
    const { data } = await API.addCommentLikes(postId, commentId, userId);
    dispatch(addCommentLike(data));
  } catch (error) {
    dispatch(hasError(error.response.data));
  }
};

export const dislikeComment =
  (postId, commentId, userId) => async (dispatch) => {
    try {
      const { data } = await API.addCommentDislikes(postId, commentId, userId);
      dispatch(addCommentDislike(data));
    } catch (error) {
      dispatch(hasError(error.response.data));
    }
  };

export const likeCommentReply =
  (postId, commentId, commentReplyId, userId) => async (dispatch) => {
    try {
      const { data } = await API.addCommentReplyLikes(
        postId,
        commentId,
        commentReplyId,
        userId
      );
      dispatch(addCommentReplyLike(data));
    } catch (error) {
      dispatch(hasError(error.response.data));
    }
  };

export const dislikeCommentReply =
  (postId, commentId, commentReplyId, userId) => async (dispatch) => {
    try {
      const { data } = await API.addCommentReplyDislikes(
        postId,
        commentId,
        commentReplyId,
        userId
      );
      dispatch(addCommentReplyDislike(data));
    } catch (error) {
      dispatch(hasError(error.response.data));
    }
  };

export const updateComment =
  (postId, commentId, commentText) => async (dispatch) => {
    try {
      const { data } = await API.editComment(postId, commentId, commentText);
      dispatch(editComment(data));
    } catch (error) {
      dispatch(hasError(error.response.data));
    }
  };
export const updateCommentReply =
  (postId, commentId, commentReplyId, commentReplyText) => async (dispatch) => {
    try {
      const { data } = await API.editCommentReply(
        postId,
        commentId,
        commentReplyId,
        commentReplyText
      );
      dispatch(editCommentReply(data));
    } catch (error) {
      dispatch(hasError(error.response.data));
    }
  };

export const removeComment = (postId, commentId) => async (dispatch) => {
  try {
    const { data } = await API.deleteComment(postId, commentId);
    dispatch(deleteComment(data));
  } catch (error) {
    dispatch(hasError(error.response.data));
  }
};

export const removeCommentReply =
  (postId, commentId, commentReplyId) => async (dispatch) => {
    try {
      const { data } = await API.deleteCommentReply(
        postId,
        commentId,
        commentReplyId
      );
      dispatch(deleteCommentReply(data));
    } catch (error) {
      dispatch(hasError(error.response.data));
    }
  };
