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
          pageToken: pageToken || undefined,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error?.message ||
          error.message ||
          "Ошибка загрузки видео",
      );
    }
  },
);
