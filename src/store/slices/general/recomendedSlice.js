import { createSlice } from "@reduxjs/toolkit";
import { fetchRecomendedVideosTC } from "../../thunks/general/fetchRecomended";

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

        const newVideos = action.payload.items || [];

        const existingIds = new Set(state.videos.map((video) => video.id));

        const uniqueVideos = newVideos.filter((video) => {
          return !existingIds.has(video.id);
        });

        state.videos = [...state.videos, ...uniqueVideos];
        state.nextPageToken = action.payload.nextPageToken || "";
      }),
      builder.addCase(fetchRecomendedVideosTC.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }));
  },
});

export default recomendedSlice.reducer;
