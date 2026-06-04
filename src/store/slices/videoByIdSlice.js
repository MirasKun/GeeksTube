import { createSlice } from "@reduxjs/toolkit";
import { fetchVideoByIdTC } from "../thunks/fetchVideoById";

const initialState = {
  video: [],
  loading: false,
  error: null,
};

const videoByIdSlice = createSlice({
  name: "videoById",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideoByIdTC.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideoByIdTC.fulfilled, (state, action) => {
        state.loading = false;
        state.video = action.payload?.items?.[0] ?? null;
      })
      .addCase(fetchVideoByIdTC.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default videoByIdSlice.reducer;
