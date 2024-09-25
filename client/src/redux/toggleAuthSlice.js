// src/redux/toggleSlice.js
import { createSlice } from "@reduxjs/toolkit";

// A simple slice to toggle component visibility
export const toggleAuthSlice = createSlice({
  name: "toggleAuthentication",
  initialState: {
    isAuthComponentVisible: false,
  },
  reducers: {
    toggleRenderAuthComponent: (state) => {
      state.isAuthComponentVisible = !state.isAuthComponentVisible;
    },
  },
});

export const { toggleRenderAuthComponent } = toggleAuthSlice.actions;
export default toggleAuthSlice.reducer;
