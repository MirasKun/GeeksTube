import { createAsyncThunk } from "@reduxjs/toolkit";
import { getVideosByCategory } from "../../../api/data/videos";
import { VIDEO_CATEGORIES_BY_KEY } from "../../../constants/videoCategories";

export const fetchCategoryVideosTC = createAsyncThunk(
  "categoryVideos/fetchVideos",
  async ({ categoryKey, pageToken = "" }, { rejectWithValue }) => {
    const category = VIDEO_CATEGORIES_BY_KEY[categoryKey];

    if (!category?.youtubeCategoryId) {
      return rejectWithValue("Категория видео не найдена");
    }

    try {
      const res = await getVideosByCategory(category.youtubeCategoryId, pageToken);

      return {
        ...res.data,
        categoryKey,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error?.message ||
          error.message ||
          "Ошибка загрузки видео по категории",
      );
    }
  },
);
