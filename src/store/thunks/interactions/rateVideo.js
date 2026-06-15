import { createAsyncThunk } from "@reduxjs/toolkit";
import { youtubePrivateInstance } from "../../../api/instances/youtubePrivateInstance";

export const rateVideoTC = createAsyncThunk(
  "interactions/rateVideo",
  async ({ videoId, rating }, { rejectWithValue }) => {
    try {
      await youtubePrivateInstance.post("/videos/rate", null, {
        params: { id: videoId, rating },
      });
      return rating;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);
