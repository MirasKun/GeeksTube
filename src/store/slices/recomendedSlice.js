import { createSlice } from "@reduxjs/toolkit";
import { fetchRecomendedVideosTC } from "../thunks/fetchRecomended";

const initialState = {
  videos: [],
  nextPageToken: "",
  loading: false,
  error: null,
};

const recomendedSlice = createSlice({
  name: "recomendedVideos",
  initialState,
  extraReducers: (builder) => {
    (builder.addCase(fetchRecomendedVideosTC.pending, (state) => {
      ((state.loading = true), (state.error = null));
    }),
      builder.addCase(fetchRecomendedVideosTC.fulfilled, (state, action) => {
        state.loading = false;
        // state.items = [...state.items, ...action.payload.items];
        state.videos = action.payload.items
        state.nextPageToken = action.payload.nextPageToken || "";
      }),
      builder.addCase(fetchRecomendedVideosTC.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }));
  },
});

export default recomendedSlice.reducer;
