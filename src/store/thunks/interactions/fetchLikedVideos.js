import { createAsyncThunk } from "@reduxjs/toolkit";
import { youtubePrivateInstance } from "../../../api/instances/youtubePrivateInstance";
export const fetchLikedVideosTC = createAsyncThunk(
  "interactions/fetchLikedVideos",
  async (pageToken = "", { rejectWithValue }) => {
    try {
      const response = await youtubePrivateInstance.get("/videos", {
        params: {
          part: "snippet,statistics,contentDetails",
          myRating: "like",
          maxResults: 50,
          pageToken: pageToken || undefined,
        },
      });
      return {
        items: response.data.items || [],
        nextPageToken: response.data.nextPageToken || null,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);
