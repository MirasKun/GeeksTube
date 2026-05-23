import { configureStore } from "@reduxjs/toolkit";
import recomendedSlice from "./slices/recomendedSlice"

export const store = configureStore({
  reducer: {
    recomendedSlice
  },
});
