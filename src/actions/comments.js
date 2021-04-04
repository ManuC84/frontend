import * as API from "../api/index";
import {
  createComment,
  hasError,
  startLoading,
  fetchComments,
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

export const getComments = (id) => async (dispatch) => {
  dispatch(startLoading);
  try {
    const { data } = await API.getComments(id);
    if (data !== undefined) {
      dispatch(fetchComments(data));
    }
  } catch (error) {
    dispatch(hasError(error.response.data));
  }
};
