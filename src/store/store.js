import { configureStore } from "@reduxjs/toolkit";
import recomendedSlice from "./slices/general/recomendedSlice";
import authSlice from "./slices/authSlice";
import searchQuerySlice from "./slices/spec/searchQuerySlice";
import sidebarSlice from "./slices/spec/sidebarSlice";
import shortsSlice from "./slices/general/shortsSlice";
import videoByIdSlice from "./slices/spec/videoByIdSlice";
import channelSlice from "./slices/channelSlice";
import commentsSlice from "./slices/spec/commentsSlice";
import interactionsSlice from "./slices/interactionsSlice";

export const store = configureStore({
  reducer: {
    recomendedSlice,
    authSlice,
    searchQuerySlice,
    sidebarSlice,
    shortsSlice,
    videoByIdSlice,
    channelSlice,
    commentsSlice,
    interactionsSlice
  },
});

