import { configureStore } from "@reduxjs/toolkit";
import recomendedSlice from "./slices/recomendedSlice";
import authSlice from "./slices/authSlice";
import searchQuerySlice from "./slices/searchQuerySlice";
import sidebarSlice from "./slices/sidebarSlice";
import shortsSlice from "./slices/shortsSlice";
import videoByIdSlice from "./slices/videoByIdSlice";

export const store = configureStore({
  reducer: {
    recomendedSlice,
    authSlice,
    searchQuerySlice,
    sidebarSlice,
    shortsSlice,
    videoByIdSlice,
  },
});
