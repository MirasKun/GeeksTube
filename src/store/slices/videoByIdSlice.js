import { createSlice } from "@reduxjs/toolkit";
import { fetchVideoByIdTC } from "../thunks/fetchVideoById";


const initialState = {
    video: null,
    loading: false,
    error: null
}

const videoByIdSlice = createSlice({
    name: "videoById",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchVideoByIdTC.pending, (state) => {
        state.currentVideo.loading = true;
        state.currentVideo.error = null;
      })
      builder.addCase(fetchVideoByIdTC.fulfilled, (state, action) => {
        state.currentVideo.loading = false;
        state.currentVideo.item = action.payload.items[0]; // одно видео
      })
      builder.addCase(fetchVideoByIdTC.rejected, (state, action) => {
        state.currentVideo.loading = false;
        state.currentVideo.error = action.error.message;
      });
    }
})