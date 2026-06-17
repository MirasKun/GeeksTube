import { configureStore } from "@reduxjs/toolkit";
import recomendedSlice from "./slices/general/recomendedSlice";
import authSlice from "./slices/authSlice";
import searchQuerySlice from "./slices/spec/searchQuerySlice";
import sidebarSlice from "./slices/spec/sidebarSlice";
import shortsSlice from "./slices/general/shortsSlice";
import categoryVideosSlice from "./slices/general/categoryVideosSlice";
import videoByIdSlice from "./slices/spec/videoByIdSlice";
import channelSlice from "./slices/channelSlice";
import commentsSlice from "./slices/spec/commentsSlice";
import interactionsSlice from "./slices/interactionsSlice";
import watchLaterReducer from './slices/spec/watchLaterSlice';

export const store = configureStore({
  reducer: {
    recomendedSlice,
    authSlice,
    searchQuerySlice,
    sidebarSlice,
    shortsSlice,
    categoryVideosSlice,
    videoByIdSlice,
    channelSlice,
    commentsSlice,
    interactionsSlice,
    watchLater: 
    watchLaterReducer,
  },
});
