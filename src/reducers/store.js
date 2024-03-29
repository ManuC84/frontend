import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slice/postsSlice';
import authReducer from './slice/authSlice';
import commentsReducer from './slice/commentsSlice';
import commentRepliesReducer from './slice/commentRepliesSlice';
import notificationsReducer from './slice/notificationsSlice';

export default configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    comments: commentsReducer,
    commentReplies: commentRepliesReducer,
    notifications: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  devTools: true,
});
