import { configureStore } from "@reduxjs/toolkit";
import recomendedSlice from "./slices/recomendedSlice";
import authSlice from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    recomendedSlice,
    authSlice,
  },
});
