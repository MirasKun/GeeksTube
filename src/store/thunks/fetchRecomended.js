import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRecomendedVideos } from "../../api/videos";

export const fetchRecomendedVideosTC = createAsyncThunk(
  "thunk/fetchRecomendedVideos",
  async (pageToken = "") => {
    try {
      const res = await getRecomendedVideos(pageToken);
      return res.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
);
