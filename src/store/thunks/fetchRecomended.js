import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../api/instance";

export const fetchRecomendedVideosTC = createAsyncThunk(
  "thunk/fetchRecomendedVideos",
  async (pageToken = "", { rejectWithValue }) => {
    try {
      const res = await instance.get("/videos", {
        params: {
          part: "snippet,contentDetails,statistics",
          chart: "mostPopular",
          regionCode: "RU",
          maxResults: 50,
          pageToken,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
