import * as API from "../api/index";
import {
  createComment,
  createCommentReply,
  hasError,
  startLoading,
  fetchComments,
  fetchCommentReplies,
} from "../reducers/slice/postsSlice";

export const getComments = (id) => async (dispatch) => {
  dispatch(startLoading);
  try {
    const { data } = await API.getComments(id);
    if (data.length !== 0) {
      dispatch(fetchComments(data));
    }
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

export const getCommentReplies = (postId, commentId) => async (dispatch) => {
  dispatch(startLoading);
  try {
    const { data } = await API.getCommentReplies(postId, commentId);
    if (data.length !== 0) {
      dispatch(fetchCommentReplies(data));
    }
  } catch (error) {
    dispatch(hasError(error.response.data));
  }
};

export const addCommentReply = (postId, commentId, payload) => async (
  dispatch
) => {
  dispatch(startLoading);
  try {
    const { data } = await API.addCommentReply(postId, commentId, payload);
    dispatch(createCommentReply(data));
  } catch (error) {
    dispatch(hasError(error.response.data));
  }
};
