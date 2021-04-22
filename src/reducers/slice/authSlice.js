import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authReducer",
  initialState: { authData: null, error: false },

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
  },
});

export const { auth, logout, hasAuthError, clearError } = authSlice.actions;
export default authSlice.reducer;
