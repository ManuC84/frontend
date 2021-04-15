import * as API from "../api/index";
import {
  createComment,
  createCommentReply,
  hasError,
  startLoading,
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
