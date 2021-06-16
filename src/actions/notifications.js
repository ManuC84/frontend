import * as API from "../api/index";
import {
  showNotificationContent,
  hasError,
} from "../reducers/slice/postsSlice";

export const getNotificationContent =
  (postId, commentId, commentReplyId, userId) => async (dispatch) => {
    try {
      const { data } = await API.fetchNotification(
        postId,
        commentId,
        commentReplyId,
        userId
      );
      dispatch(showNotificationContent([data]));
    } catch (error) {
      dispatch(hasError(error.response.data));
    }
  };

export const clearAll = (userId, type) => async (dispatch) => {
  try {
    await API.clearAllNotifications(userId, type);
  } catch (error) {
    dispatch(hasError(error.response.data));
  }
};
