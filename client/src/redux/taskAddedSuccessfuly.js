// src/redux/toggleSlice.js
import { createSlice } from "@reduxjs/toolkit";

// A simple slice to toggle the adding for task
export const taskAddedSuccessfuly = createSlice({
  name: "toggleAuthentication",
  initialState: {
    isTaskAdded: false,
  },
  reducers: {
    renderWithTheNewTask: (state) => {
      state.isTaskAdded = !state.isTaskAdded;
    },
  },
});

export const { renderWithTheNewTask } = taskAddedSuccessfuly.actions;
export default taskAddedSuccessfuly.reducer;
