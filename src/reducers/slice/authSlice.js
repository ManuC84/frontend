import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authReducer",
  initialState: { authData: null, error: false, authAlert: false },

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
    setAuthAlert: (state, action) => {
      state.authAlert = action.payload;
    },
  },
});

export const {
  auth,
  logout,
  hasAuthError,
  clearError,
  clearNotifications,
  setAuthAlert,
} = authSlice.actions;

export const toggleAuthAlert = (bool) => async (dispatch) => {
  dispatch(setAuthAlert(bool));
};

export default authSlice.reducer;
