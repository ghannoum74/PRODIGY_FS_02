// src/redux/toggleSlice.js
import { createSlice } from "@reduxjs/toolkit";

// A simple slice to toggle component visibility
export const saveUserDataSlice = createSlice({
  name: "fullUserData",
  initialState: {
    data: {
      firstName: "",
      lastName: "",
      birthday: "",
      email: "",
      password: "",
    },
  },
  reducers: {
    saveUserData: (state, action) => {
      const { key, value } = action.payload;
      state.data[key] = value;
    },
  },
});

export const { saveUserData } = saveUserDataSlice.actions;
export default saveUserDataSlice.reducer;
