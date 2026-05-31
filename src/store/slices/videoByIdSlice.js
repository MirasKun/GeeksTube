import { createSlice } from "@reduxjs/toolkit";
import { fetchVideoByIdTC } from "../thunks/fetchVideoById";

const initialState = {
  video: null,
  loading: false,
  error: null,
};

const videoByIdSlice = createSlice({
  name: "videoById",
  initialState,
  extraReducers: (builder) => {
<<<<<<< HEAD
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

=======
    builder.addCase(fetchVideoByIdTC.pending, (state) => {
      state.currentVideo.loading = true;
      state.currentVideo.error = null;
    });
    builder.addCase(fetchVideoByIdTC.fulfilled, (state, action) => {
      state.currentVideo.loading = false;
      state.currentVideo.item = action.payload.items[0]; // одно видео
    });
    builder.addCase(fetchVideoByIdTC.rejected, (state, action) => {
      state.currentVideo.loading = false;
      state.currentVideo.error = action.error.message;
    });
  },
});
>>>>>>> b5bb8c2b989dd5d70e3c2be28397ae18fdd08d01
export default videoByIdSlice.reducer;
