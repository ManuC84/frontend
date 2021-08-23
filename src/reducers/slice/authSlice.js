import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authReducer",
  initialState: { authData: null, error: false, AuthAlert: false },

  reducers: {
    auth: (state, action) => {
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      return { authData: action.payload };
    },
    logout: () => {
      localStorage.clear();
      return { authData: null };
    },
    hasAuthError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = false;
    },
    showAuthAlert: (state, action) => {
      state.AuthAlert = action.payload;
    },
  },
});

export const {
  auth,
  logout,
  hasAuthError,
  clearError,
  clearNotifications,
  showAuthAlert,
} = authSlice.actions;
export default authSlice.reducer;
