import { configureStore } from "@reduxjs/toolkit";
import toggleAuthSlice from "./toggleAuthSlice";
import toggleLoginSignSlice from "./toggleLoginSignSlice";
import saveUserDataSlice from "./saveUserDataSlice";
import taskAddedSuccessfuly from "./taskAddedSuccessfuly";

const store = configureStore({
  reducer: {
    toggleAuthentication: toggleAuthSlice,
    toggleLoginSign: toggleLoginSignSlice,
    saveUserData: saveUserDataSlice,
    taskAddedSuccessfuly: taskAddedSuccessfuly,
  },
});

export default store;
