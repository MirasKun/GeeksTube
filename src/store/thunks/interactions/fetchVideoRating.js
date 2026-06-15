import { createAsyncThunk } from "@reduxjs/toolkit";
import { youtubePrivateInstance } from "../../../api/instances/youtubePrivateInstance";

export const fetchVideoRatingTC = createAsyncThunk(
  "interactions/fetchVideoRating",
  async (videoId, { rejectWithValue }) => {
    try {
      const response = await youtubePrivateInstance.get("/videos/getRating", {
        params: { id: videoId },
      });
      return response.data.items?.[0]?.rating || "none";
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);
