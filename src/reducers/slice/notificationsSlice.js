import { createSlice } from '@reduxjs/toolkit';

export const notificationsSlice = createSlice({
  name: 'notificationsReducer',
  initialState: { notifications: [] },

  reducers: {},
});

export const {} = notificationsSlice.actions;

export default notificationsSlice.reducer;
