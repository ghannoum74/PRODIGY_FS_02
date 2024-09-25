// src/redux/toggleSlice.js
import { createSlice } from "@reduxjs/toolkit";

// A simple slice to toggle component visibility
export const toggleLoginSignSlice = createSlice({
  name: "toggleLoginSignin",
  initialState: {
    isLoginComponentVisible: false,
  },
  reducers: {
    toggleLoginsignin: (state) => {
      state.isLoginComponentVisible = !state.isLoginComponentVisible;
    },
  },
});

export const { toggleComponent, toggleLoginsignin } =
  toggleLoginSignSlice.actions;
export default toggleLoginSignSlice.reducer;
