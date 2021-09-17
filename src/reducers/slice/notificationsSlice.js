import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../api/index';

export const fetchNotificationsTest = createAsyncThunk(
  'notifications/fetchNotifications',
  async (userId) => {
    const { data } = await API.get(`notifications/${userId}`);
    return data;
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
  },
});

export const { addNewNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;
