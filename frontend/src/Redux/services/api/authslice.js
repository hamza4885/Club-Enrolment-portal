import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Stores user info after login
  token: null, // JWT token for authentication
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user; // Stores user data
      state.token = action.payload.token; // Stores JWT token
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
