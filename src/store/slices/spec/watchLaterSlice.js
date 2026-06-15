import { createSlice } from "@reduxjs/toolkit";

const savedVideos = JSON.parse(
  localStorage.getItem("watchLater") || "[]"
);

const watchLaterSlice = createSlice({
  name: "watchLater",
  initialState: {
    videos: savedVideos,
  },
  reducers: {
    addToWatchLater: (state, action) => {
      const video = action.payload;

      const exists = state.videos.find(
        (v) => v.id === video.id
      );

      if (!exists) {
        state.videos.unshift(video);

        localStorage.setItem(
          "watchLater",
          JSON.stringify(state.videos)
        );
      }
    },
  },
});

export const { addToWatchLater } = watchLaterSlice.actions;
export default watchLaterSlice.reducer;