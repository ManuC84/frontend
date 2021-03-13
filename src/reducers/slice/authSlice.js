import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authReducer",
  initialState: { authData: null },
  reducers: {
    auth: (state, action) => {
      localStorage.setItem(
        "profile",
        JSON.stringify({ ...action.payload?.data })
      );
      return { authData: action.payload?.data };
    },
    logout: () => {
      localStorage.clear();
      return { authData: null };
    },
  },
});

export const { auth, logout } = authSlice.actions;
export default authSlice.reducer;
