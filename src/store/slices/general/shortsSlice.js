import { createSlice } from "@reduxjs/toolkit";
import { fetchShortsTC } from "../../thunks/general/fetchShorts";

const initialState = {
  shorts: [],
  nextPageToken: "",
  loading: false,
  error: null,
};

const shortsSlice = createSlice({
  name: "shorts",
  initialState,
  reducers: {
    resetShorts(state) {
      state.shorts = [];
      state.nextPageToken = "";
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShortsTC.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShortsTC.fulfilled, (state, action) => {
        state.loading = false;

        const newShorts = action.payload?.items ?? [];
        const existingIds = new Set(
          state.shorts.map((video) => video.id?.videoId ?? video.id),
        );

        const uniqueShorts = newShorts.filter((video) => {
          const id = video.id?.videoId ?? video.id;
          return id && !existingIds.has(id);
        });

        state.shorts = [...state.shorts, ...uniqueShorts];
        state.nextPageToken = action.payload?.nextPageToken || "";
      })
      .addCase(fetchShortsTC.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetShorts } = shortsSlice.actions;
export default shortsSlice.reducer;
