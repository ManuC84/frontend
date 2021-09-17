import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../api/index';

export const fetchNotificationsTest = createAsyncThunk(
  'notifications/fetchNotifications',
  async (userId) => {
    const { data } = await API.get(`notifications/${userId}`);
    return data;
  },
);

export const readNotification = createAsyncThunk(
  'notifications/readNotification',
  async (id) => {
    const { data } = await API.post(`notifications/readNotification/${id}`);
    return data;
  },
);

export const readAllNotifications = createAsyncThunk(
  'notifications/readAllNotifications',
  async (userId) => {
    await API.put(`notifications/readAllNotifications/${userId}`);
  },
);

export const clearAllNotifications = createAsyncThunk(
  'notifications/clearAllNotifications',
  async (userId) => {
    await API.delete(`notifications/clearAllNotifications/${userId}`);
  },
);

export const notificationsSlice = createSlice({
  name: 'notificationsReducer',
  initialState: { notifications: [] },

  reducers: {
    addNewNotification: (state, action) => {
      state.notifications.unshift(action.payload);
    },
  },
  extraReducers: {
    //FETCH NOTIFICATIONS
    [fetchNotificationsTest.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchNotificationsTest.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.notifications = action.payload;
    },
    [fetchNotificationsTest.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    //READ NOTIFICATION
    [readNotification.pending]: (state) => {
      state.status = 'loading';
    },
    [readNotification.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.notifications = state.notifications.map((notification) =>
        notification._id === action.payload._id ? action.payload : notification,
      );
    },
    [readNotification.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    //READ ALL NOTIFICATIONS
    [readAllNotifications.pending]: (state) => {
      state.status = 'loading';
    },
    [readAllNotifications.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.notifications = state.notifications.map((notification) => {
        return { ...notification, read: true };
      });
    },
    [readAllNotifications.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    //CLEAR ALL NOTIFICATIONS
    [clearAllNotifications.pending]: (state) => {
      state.status = 'loading';
    },
    [clearAllNotifications.fulfilled]: (state) => {
      state.status = 'succeeded';
      state.notifications = [];
    },
    [clearAllNotifications.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const { addNewNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;
