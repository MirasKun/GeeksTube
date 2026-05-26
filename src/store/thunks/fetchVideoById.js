import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchVideoByIdTC = createAsyncThunk(
  "thunk/fetchVideosById",
  async (videoId) => {
    try {
      const res = await instance.get("/videos", {
        params: {
          part: "snippet,contentDetails,statistics",
          id: videoId,
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
);
