import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSearchResults } from "../../api/search";
export const fetchSearchResultsTC = createAsyncThunk(
  "thunk/fetchSearchResults",
  async (searchQuery = "") => {
    try {
      const res = await getSearchResults(searchQuery);
      return res.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
);
