import * as API from "../api/index";
import {
  createComment,
  createCommentReply,
  hasError,
  startLoading,
  addCommentLike,
  addCommentDislike,
} from "../reducers/slice/postsSlice";

export const addComment = (id, payload) => async (dispatch) => {
  dispatch(startLoading);
  try {
    const { data } = await API.addComments(id, payload);
    dispatch(createComment(data));
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

export const likeComment = (postId, commentId, userId) => async (dispatch) => {
  try {
    const { data } = await API.addCommentLikes(postId, commentId, userId);
    dispatch(addCommentLike(data));
  } catch (error) {
    dispatch(hasError(error.response.data));
  }
};
export const dislikeComment = (postId, commentId, userId) => async (
  dispatch
) => {
  try {
    const { data } = await API.addCommentDislikes(postId, commentId, userId);
    dispatch(addCommentDislike(data));
  } catch (error) {
    dispatch(hasError(error.response.data));
  }
};
