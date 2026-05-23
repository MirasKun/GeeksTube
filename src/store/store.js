import { configureStore } from "@reduxjs/toolkit";
import recomendedSlice from "./slices/recomendedSlice";
import authSlice from "./slices/authSlice";
import searchQuerySlice from "./slices/searchQuerySlice";
import sidebarSlice from "./slices/sidebarSlice";

export const store = configureStore({
  reducer: {
    recomendedSlice,
    authSlice,
    searchQuerySlice,
    sidebarSlice
  },
});
