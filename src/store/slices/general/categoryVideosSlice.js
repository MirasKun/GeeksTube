import { createSlice } from "@reduxjs/toolkit";
import { VIDEO_CATEGORY_KEYS } from "../../../constants/videoCategories";
import { fetchCategoryVideosTC } from "../../thunks/general/fetchCategoryVideos";

const initialState = {
  activeCategory: VIDEO_CATEGORY_KEYS.ALL,
  videos: [],
  nextPageToken: "",
  loading: false,
  error: null,
};

const categoryVideosSlice = createSlice({
  name: "categoryVideos",
  initialState,
  reducers: {
    setActiveCategory(state, action) {
      const nextCategory = action.payload;

      if (state.activeCategory === nextCategory) {
        return;
      }

      state.activeCategory = nextCategory;
      state.videos = [];
      state.nextPageToken = "";
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryVideosTC.pending, (state, action) => {
        const pageToken = action.meta.arg?.pageToken;

        state.loading = true;
        state.error = null;

        if (!pageToken) {
          state.videos = [];
          state.nextPageToken = "";
        }
      })
      .addCase(fetchCategoryVideosTC.fulfilled, (state, action) => {
        if (state.activeCategory !== action.payload.categoryKey) {
          return;
        }

        state.loading = false;

        const newVideos = action.payload.items || [];
        const existingIds = new Set(state.videos.map((video) => video.id));
        const uniqueVideos = newVideos.filter((video) => !existingIds.has(video.id));

        state.videos = [...state.videos, ...uniqueVideos];
        state.nextPageToken = action.payload.nextPageToken || "";
      })
      .addCase(fetchCategoryVideosTC.rejected, (state, action) => {
        if (state.activeCategory !== action.meta.arg?.categoryKey) {
          return;
        }

        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setActiveCategory } = categoryVideosSlice.actions;
export default categoryVideosSlice.reducer;
