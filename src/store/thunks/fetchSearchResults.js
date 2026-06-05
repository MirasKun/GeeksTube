import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSearchResults } from "../../api/search";

export const fetchSearchResultsTC = createAsyncThunk(
  "search/fetchResults",
  async (query, { rejectWithValue }) => {
    const trimmed = (typeof query === "string" ? query : query?.query ?? "").trim();

    if (!trimmed) {
      return { items: [], nextPageToken: "", query: "" };
    }

    try {
      const res = await getSearchResults(trimmed);
      return {
        ...res.data,
        query: trimmed,
      };
    } catch (error) {
      return rejectWithValue((error, "Ошибка поиска"));
    }
  },
);
