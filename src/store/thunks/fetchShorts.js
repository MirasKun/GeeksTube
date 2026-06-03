import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../api/instance";

export const fetchShortsTC = createAsyncThunk(
  "shorts/fetchShorts",
  async ({ pageToken = "", query = "shorts" } = {}, { rejectWithValue }) => {
    try {
      const res = await instance.get("/search", {
        params: {
          part: "snippet",
          type: "video",
          videoDuration: "short",
          q: query,
          regionCode: "RU",
          relevanceLanguage: "ru",
          maxResults: 12,
          pageToken,
        },
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
