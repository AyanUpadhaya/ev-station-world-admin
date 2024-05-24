import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import navSlice from "../features/nav/navSlice";


export const store = configureStore({
  reducer: {
    auth:authSlice,
    nav:navSlice
  },
});
